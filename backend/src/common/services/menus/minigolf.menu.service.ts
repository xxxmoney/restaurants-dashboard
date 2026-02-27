import {MenuService} from "./menu.types";
import {Menu} from "../../dto/menu";
import {DateTime} from "luxon";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {CURRENCY_CZK} from "../../constants/menu.constants";
import {IS_DEBUG} from "../../../../../shared/constants/common.constants";
import {inline} from "../../helpers/stringUtils.helper";
import {getAllMatches} from "../../helpers/regex.helper";

export class MinigolfMenuService implements MenuService {
    private static readonly DATE_REGEX: RegExp = /\d+/g;

    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.MINI_GOLF);

        //
        // This restaurant has menus in divs with classes, which very much so simplifies getting the information
        //
        // Each menu item has class "menu-item", its name is in element with class "menu-item-name", price in element with class "menu-item-price"
        // Date is in element with class "current-day"
        // Important note is that this restaurant only has menu for current day
        //

        const currentDateText = $('.current-day').first().text().trim();
        const currentDate = this.parseDate(currentDateText);
        this.logDebug(`Current date: ${currentDate}`);
        const menu: Menu = {
            date: DateTime.now(),
            items: []
        };

        const items = $('.menu-item').toArray();
        this.logDebug(`Got items count: ${items.length}`);

        for (const item of items) {
            const $item = $(item);
            this.logDebug(`Processing item: ${inline($item.html())}`);
            const name = $item.find('.menu-item-name').text().trim();
            const priceText = $item.find('.menu-item-price').text().trim();

            if (name && priceText) {
                menu.items.push({
                    name: name,
                    price: this.parseDishPrice(priceText)
                });

                this.logDebug(`New item added: ${JSON.stringify(menu.items[menu.items.length - 1])}`)
            } else {
                this.logDebug('Skipping item due to missing name or price');
            }
        }

        return [menu];
    }

    private parseDishPrice(priceText: string): number {
        return parseInt(priceText.replace(CURRENCY_CZK, '').trim());
    }

    private parseDate(dateText: string): DateTime {
        // Date is in format "Pátek 27.2" - we can only extract the day and month from it with regex
        const matches = getAllMatches(MinigolfMenuService.DATE_REGEX, dateText);

        this.logDebug(`Got matches for date: ${JSON.stringify(matches)}`);

        const day = parseInt(matches[0]);
        const month = parseInt(matches[1]);
        const year = DateTime.now().year;

        return DateTime.fromObject({day, month, year});
    }

    private logDebug(message: string) {
        if (IS_DEBUG) {
            console.info('MiniGolfMenuService', message);
        }
    }
}
