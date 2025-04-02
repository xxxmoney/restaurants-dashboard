import {MenuService} from "./menu.types";
import {Menu} from "../../dto/menu";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {parseDate, parsePrice} from "../../helpers/menuUtils.helper";

export class BarRedHookMenuService implements MenuService {
    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.BAR_RED_HOOK);

        const contents = $('.content').toArray();

        const menus: Menu[] = [];

        contents.forEach((content) => {
            const $content = $(content);
            const $title = $content.find('h2').first();
            const titleText = $title.text();

            if (!titleText || titleText === '') {
                throw new Error(`Title text for date empty`);
            }

            const date = parseDate(titleText);

            const foodItems = $content.find('.food').toArray();
            const priceItems = $content.find('.prize').toArray();

            if (foodItems.length !== priceItems.length) {
                throw new Error('Food and price items count does not match');
            }

            const count = foodItems.length;
            // If count is 1, then there is no menu for that day
            if (count === 1) {
                return;
            }

            const menuItems = foodItems.map((foodItem, index) => {
                const $foodItem = $(foodItem);
                const $priceItem = $(priceItems[index]);

                const name = $foodItem.text().trim();
                const price = parsePrice($priceItem.text());

                return {name, price};
            });

            menus.push({date, items: menuItems});
        });

        return menus;
    }
}
