import {MenuService} from "./menu.types";
import {Menu} from "../../dto/menu";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {useCheerio} from "../../composables/cheerio.comp";
import {parseDate, parsePrice} from "../../helpers/menuUtils.helper";

export class PalatinoMenuService implements MenuService {
    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.PALATINO);

        const contents = [$('#pondeli').first(), $('#utery').first(), $('#streda').first(), $('#ctvrtek').first(), $('#patek').first()];

        const menus: Menu[] = [];

        contents.forEach(($content) => {
            const $title = $content.find('.fr-tab-den').first();
            const titleText = $title.text();

            if (!titleText || titleText === '') {
                throw new Error(`Title text for date empty`);
            }

            const date = parseDate(titleText);

            const items = $content.find('.frl-table tr').toArray();

            const menuItems = items.map(item => {
                const $item = $(item);
                const name = $item.find('td').first().contents().first().text().trim();
                const priceText = $item.find('td').last().text().trim();
                const price = parsePrice(priceText);

                return {name, price};
            });

            menus.push({date, items: menuItems});
        });

        return menus;
    }
}
