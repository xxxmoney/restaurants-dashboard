import {MenuService} from "./menu.types";
import {Menu, MenuItem} from "../../dto/menu";
import {DateTime} from "luxon";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {parsePrice} from "../../helpers/menuUtils.helpers";

export class SalandaMenuService implements MenuService {
    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenu(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.SALANDA);

        const selectorPrefix = '#poledni-menu #priceTable #collapse';
        const blacklistWord = 'TÝDENNÍ STÁLICE';
        const getItem = (dayNumber: number) => $(`${selectorPrefix}${dayNumber}`).first();
        const contents = [getItem(1), getItem(2), getItem(3), getItem(4), getItem(5)];

        const menus: Menu[] = [];

        const weekStartDate = DateTime.now().startOf('week');
        contents.forEach(($content, index) => {
            const date = weekStartDate.plus({days: index});

            const items = $content.find('table > tbody > tr').toArray();

            const menuItems = items.map(item => {
                const $item = $(item);

                const name = $item.find('td > strong').first().text().trim();
                const priceText = $item.find('td > strong').last().text().trim();

                if (!name || !priceText) {
                    return null;
                }

                const price = parsePrice(priceText);

                return {name, price};
            }).filter(item => item && !item.name.includes(blacklistWord)) as MenuItem[];

            menus.push({date: date, items: menuItems});
        });

        return menus;
    }
}
