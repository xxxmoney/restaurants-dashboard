import {MenuService} from "./menu.types";
import {Menu} from "../../dto/menu";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {DateTime} from "luxon";
import {IS_DEBUG} from "../../../../../shared/constants/common.constants";
import {inline} from "../../helpers/stringUtils.helper";
import {getAllMatches} from "../../helpers/regex.helper";

export class NovodvorkaMenuService implements MenuService {
    private static readonly DISH_TD_INDEX_NAME = 1;
    private static readonly DISH_TD_INDEX_PRICE = 2;
    private static readonly DISH_PRICE_TRAILING_SIGN = ',-';

    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.NOVODVORKA);

        const now = DateTime.now();

        //
        // This restaurant has menus in table
        //
        // There are no classes, etc for easier querying
        // So instead, we only focus on rows that have values in all three td (size, name, price)
        //

        const menu: Menu = {
            date: now,
            items: []
        };

        const table = $('table');
        this.logDebug(`Got table: ${inline(table.html())}`);
        const rows = table.find('tr').toArray();
        this.logDebug(`Got total rows count: ${rows.length}`);

        for (const row of rows) {
            const $row = $(row);
            this.logDebug(`Processing row: ${inline($row.html())}`);
            const tds = $row.find('td').toArray();
            this.logDebug(`Got tds count: ${tds.length}`);

            if (tds.some(td => !$(td).text().trim())) {
                this.logDebug('Skipping row, because it has empty td');
                continue;
            }

            const $tdName = $(tds[NovodvorkaMenuService.DISH_TD_INDEX_NAME]);
            this.logDebug(`Got td name: ${inline($tdName.html())}`);
            const $tdPrice = $(tds[NovodvorkaMenuService.DISH_TD_INDEX_PRICE]);
            this.logDebug(`Got td price: ${inline($tdPrice.html())}`);

            const name = $tdName.text().trim();
            const priceText = $tdPrice.text().trim();

            if (!name || !priceText) {
                this.logDebug('Skipping row, because name or price text is empty');
                continue;
            }

            const item = {
                name: this.parseDishName(name),
                price: this.parseDishPrice(priceText)
            };
            this.logDebug(`New item added: ${JSON.stringify(item)}`);
            menu.items.push(item);
        }

        return [menu];
    }

    private parseDishName(name: string) {
        // TODO: maybe trim leading numbers, like '1,3,7,9'
        return name.trim();
    }

    private parseDishPrice(priceText: string): number {
        return parseInt(priceText.replace(NovodvorkaMenuService.DISH_PRICE_TRAILING_SIGN, '').trim());
    }

    private logDebug(message: string) {
        if (IS_DEBUG) {
            console.info('NovodvorkaMenuService', message);
        }
    }
}
