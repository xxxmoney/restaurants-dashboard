import {MenuService} from "./menu.types";
import {Menu} from "../../dto/menu";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {IS_DEBUG} from "../../../../../shared/constants/common.constants";
import {DateTime} from "luxon";
import {inline} from "../../helpers/stringUtils.helper";
import {CURRENCY_CZK} from "../../constants/menu.constants";

export class GiardinoMenuService implements MenuService {
    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.IL_GIARDINO);

        //
        // This restaurant has menus in divs with classes, which very much so simplifies getting the information
        //
        // Each menu item has class "dz-content", its name is in element with class "header-text", price in element with class "header-price"
        // Date is mentioned in site, but we can assume that the menu is for current day (as its the daily menu)
        //

        const menu: Menu = {
            date: DateTime.now().startOf('day'),
            items: []
        };

        const items = $('.dz-content').toArray();
        this.logDebug(`Got items count: ${items.length}`);

        for (const item of items) {
            const $item = $(item);
            this.logDebug(`Processing item: ${inline($item.html())}`);
            const name = $item.find('.header-text').text().trim();
            const priceText = $item.find('.header-price').text().trim();

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

    private logDebug(message: string) {
        if (IS_DEBUG) {
            console.info('MiniGolfMenuService', message);
        }
    }
}
