import {MenuService} from "./menu.types";
import {Menu} from "../../dto/menu";
import {DateTime} from "luxon";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {CURRENCY_CZK} from "../../constants/menu.constants";
import {IS_DEBUG} from "../../../../../shared/constants/common.constants";
import {inline} from "../../helpers/stringUtils.helper";

export class MinigolfMenuService implements MenuService {
    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.NOVODVORKA);

        const menu: Menu = {
            date: DateTime.now(),
            items: []
        };

        // TODO: maybe parse to make sure current day is used?
        //const currentDay = $('.current-day');

        const items = $('.menu-item').toArray();
        this.logDebug(`Got items count: ${items.length}`);

        for (const item of items) {
            const $item = $(item);
            this.logDebug(`Processing item: ${inline($item.html())}`);
            const name = $item.find('.menu-item-name').text().trim();
            const priceText = $item.find('.menu-item-price').text().trim();

            menu.items.push({
                name: name,
                price: this.parseDishPrice(priceText)
            });

            this.logDebug(`New item added: ${JSON.stringify(menu.items[menu.items.length - 1])}`)
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
