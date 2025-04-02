import {MenuService} from "./menu.types";
import {CheerioAPI} from "cheerio";
import {Menu} from "../../dto/menu";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {parseDate, parsePrice} from "../../helpers/menuUtils.helper";

export class KlikaMenuService implements MenuService {
    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.KLIKA);

        const $content = $('.content').first();
        const $title = $content.find('strong').first();

        const menuDate = parseDate($title.text());

        // Get menu items
        const items = $content.find('table').first().find('tr').has('td').toArray();

        // Select menu items to correct format
        const menuItems = items.map(item => {
            const $item = $(item);
            const name = $item.find('td').first().text().trim();
            const priceText = $item.find('td').last().text().trim();
            // Get number from price using regex
            const price = parsePrice(priceText);

            return {name, price};
        });

        const menus: Menu[] = [];

        // Include all days of work week
        const weekStartDate = menuDate.startOf('week');
        for (let i = 0; i < 5; i++) {
            const date = weekStartDate.plus({days: i});

            menus.push({
                date: date,
                // Only fot menu items for one day, so if date is not same as menu date, items are empty
                items: date.equals(menuDate) ? menuItems : []
            });
        }

        return menus;
    }
}
