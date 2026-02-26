import {MenuService} from "./menu.types";
import {Menu} from "../../dto/menu";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {DateTime} from "luxon";
import {parsePrice} from "../../helpers/menuUtils.helper";
import {menuRoute} from "../../../routes/menu.route";

export class NovodvorkaMenuService implements MenuService {
    private static readonly ROWS_IN_DAY: number = 8;
    private static readonly DISH_NAME_ON_ROW_INDEX: number = 3;
    private static readonly DISH_PRICE_ON_ROW_INDEX: number = 4;
    private static readonly DISH_PRICE_REGEX: RegExp = /\d+/;
    private static readonly LAST_ROW_TEXT: string = 'Ceny pokrmů jsou uvedeny včetně příloh';

    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {


        const {$} = await useCheerio(this.fetcher, restaurantEnum.SALANDA);
        const startOfWeek = DateTime.now().startOf('week');

        const container = $(".elementor-text-editor")[2];

        // This restaurant has menus in table - order seems to be same
        //
        // Skip first three rows, then each day contains 8 rows
        // First row first column contains day name, redundant, can get that from index
        // First two rows contain soup
        // Then one rows contains main dish
        // Then three rows contain another main dish (specialties)
        // Then there is an empty row
        // Then the next row is side dishes
        // Next row is empty - delimiter for next day
        //
        // Regarding columns, dishes are specified on column 4, its price on column 5
        //

        const table = $(container).find("table");
        const rows = table.find("tr").toArray();

        rows.splice(0, 3); // Skip first three rows

        const menus: Menu[] = [];
        let currentMenu: Menu | null = null;
        let currentDayIndex = 0;
        let currentRowInDayIndex = 0;
        for (const row of rows) {
            const $row = $(row);

            if ($row.text().trim() === NovodvorkaMenuService.LAST_ROW_TEXT) {
                break; // End of menu, can break the loop
            }

            // First row of day, initialize new current menu (minus one due to indexed)
            if (currentRowInDayIndex % (NovodvorkaMenuService.ROWS_IN_DAY - 1) === 0) {
                if (currentMenu) {
                    menus.push(currentMenu);
                }

                const date = startOfWeek.plus({days: currentDayIndex}).startOf('day');
                currentMenu = {date, items: []};

                currentDayIndex++;

                continue; // SKip the empty row
            }

            // Get dish from current row
            const dishName = $row.find("td").eq(NovodvorkaMenuService.DISH_NAME_ON_ROW_INDEX).text().trim();
            const priceText = $row.find("td").eq(NovodvorkaMenuService.DISH_PRICE_ON_ROW_INDEX).text().trim();

            if (!currentMenu) {
                throw new Error("Current menu should be initialized");
            }
            currentMenu.items.push({ name: dishName, price: parsePrice(priceText)});

            currentRowInDayIndex++;
        }

        // TODO: use menu contents when getting from html is ready
        return menus;
    }

    private parsePrice(priceText: string): number {
        const matches = [ ...NovodvorkaMenuService.DISH_PRICE_REGEX[Symbol.matchAll](priceText).map(item => item[0]) ];
        const lastMatch = matches[matches.length - 1];

        return parseInt(lastMatch);
    }
}
