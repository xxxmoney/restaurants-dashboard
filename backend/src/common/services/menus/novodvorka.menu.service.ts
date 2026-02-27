import {MenuService} from "./menu.types";
import {Menu} from "../../dto/menu";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {DateTime} from "luxon";
import {IS_DEBUG} from "../../../../../shared/constants/common.constants";
import {inline} from "../../helpers/stringUtils.helper";
import {getALlMatches} from "../../helpers/regex.helper";

export class NovodvorkaMenuService implements MenuService {
    private static readonly ROWS_IN_DAY: number = 9;
    private static readonly SKIP_ROWS_START: number = 3;
    private static readonly DISH_NAME_ON_ROW_INDEX: number = 3;
    private static readonly DISH_PRICE_ON_ROW_INDEX: number = 4;
    private static readonly DISH_PRICE_REGEX: RegExp = /\d+/;

    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.NOVODVORKA);

        const startOfWeek = DateTime.now().startOf('week');
        this.logDebug(`Start of week: ${startOfWeek}`);

        //
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

        const table = $('table');
        this.logDebug(`Got table: ${inline(table.html())}`);
        const rows = table.find('tr').toArray();

        this.logDebug(`Got total rows count: ${rows.length}`);

        rows.splice(0, NovodvorkaMenuService.SKIP_ROWS_START); // Skip start empty rows

        this.logDebug(`Reduced rows count: ${rows.length}`);

        const menus: Menu[] = [];
        let currentMenu: Menu | null = null;
        let currentDayIndex = 0;
        let currentRowInDayIndex = 0;
        for (const row of rows) {
            const $row = $(row);

            // First row of day, initialize new current menu (minus one due to indexed)
            if ((currentRowInDayIndex % NovodvorkaMenuService.ROWS_IN_DAY) === 0) {
                if (currentMenu) {
                    this.logDebug(`Pushing last current menu: ${JSON.stringify(currentMenu)}`);
                    menus.push(currentMenu);
                }

                this.logDebug(`Processing row: ${inline($row.text().trim())}`);
                this.logDebug('Is first row of day');

                this.logDebug('Initializing new menu');
                const date = startOfWeek.plus({days: currentDayIndex}).startOf('day');
                currentMenu = {date, items: []};

                currentDayIndex++;
            }

            this.logDebug('Getting dish name and price text');

            // Get dish from current row
            const dishName = $row.find('td').eq(NovodvorkaMenuService.DISH_NAME_ON_ROW_INDEX).text().trim();
            const priceText = $row.find('td').eq(NovodvorkaMenuService.DISH_PRICE_ON_ROW_INDEX).text().trim();

            if (!currentMenu) {
                throw new Error("Current menu should be initialized");
            }

            if (dishName && priceText) {
                this.logDebug('Pushing new item');
                currentMenu.items.push({ name: this.parseDishName(dishName), price: this.parseDishPrice(priceText)});
                this.logDebug(`New item: ${JSON.stringify(currentMenu.items[currentMenu.items.length - 1])}`);
            } else {
                this.logDebug('No dish name or price text, skipping');
            }

            currentRowInDayIndex++;
        }

        this.logDebug(`Got all menus ${menus.length}`);

        return menus;
    }

    private parseDishName(name: string) {
        // TODO: maybe trim leading numbers, like '1,3,7,9'
        return name.trim();
    }

    private parseDishPrice(priceText: string): number {
        const matches = getALlMatches(NovodvorkaMenuService.DISH_PRICE_REGEX, priceText);
        const lastMatch = matches[matches.length - 1];

        return parseInt(lastMatch);
    }

    private logDebug(message: string) {
        if (IS_DEBUG) {
            console.info('NovodvorkaMenuService', message);
        }
    }
}
