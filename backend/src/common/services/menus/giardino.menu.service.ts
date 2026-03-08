import {MenuService} from "./menu.types";
import {Menu} from "../../dto/menu";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";
import {IS_DEBUG} from "../../../../../shared/constants/common.constants";
import {DateTime} from "luxon";
import {inline} from "../../helpers/stringUtils.helper";
import {CURRENCY_CZK} from "../../constants/menu.constants";
import {getAllMatches} from "../../helpers/regex.helper";

export class GiardinoMenuService implements MenuService {
    private static readonly DATE_REGEX: RegExp = /\d+/g;
    private static readonly DATE_PARTS_COUNT = 5; // Should have 2 numbers for start date (day, month), 2 numbers for end date (day, month), and 1 number for year

    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.IL_GIARDINO);

        //
        // This restaurant has menus in divs with classes, which very much so simplifies getting the information
        //
        // Container is ".category-denni-menu"
        // Each menu is "section" element - first section element contains info about start and end date of the week - in format "Týden od 2.3-6.3.2026"
        // Each dish is in ".elementor-price-list-text" - name is ",elementor-price-list-header", description is ".elementor-price-list-description" and price is ".elementor-price-list-price"
        //

        const menus: Menu[] = [];

        const sections = $('.category-denni-menu section').toArray();
        this.logDebug(`Got sections count: ${sections.length}`);

        const $weekSection = $(sections.shift()); // First section contains information about the week
        this.logDebug(`First section is week description (shift from section array): ${inline($weekSection.html())}`);
        const startDate = this.parseStartDate($weekSection.text());
        this.logDebug(`Got start date: ${startDate}`);

        let dayIndex = 0; // Current day - start with 0 - monday
        for (const section of sections) {
            const $section = $(section);
            this.logDebug(`Processing section: ${inline($section.html())}`);

            const menu: Menu = {
                date: startDate.plus({day: dayIndex}),
                items: []
            };

            const texts = $section.find('.elementor-price-list-text').toArray();
            this.logDebug(`Got texts count: ${texts.length}`);
            for (const text of texts) {
                const $text = $(text);
                this.logDebug(`Processing text: ${inline($text.html())}`);
                const description = $text.find('.elementor-price-list-description').text().trim();
                const priceText = $text.find('.elementor-price-list-price').text().trim();

                if (description && priceText) {
                    const item = {
                        name: description,
                        price: this.parseDishPrice(priceText)
                    };
                    this.logDebug(`New item added: ${JSON.stringify(item)}`);
                    menu.items.push(item);
                } else {
                    this.logDebug('Skipping item due to missing description or price');
                }
            }

            dayIndex++;
        }

        return menus;
    }

    private parseDishPrice(priceText: string): number {
        return parseInt(priceText.replace(CURRENCY_CZK, '').trim());
    }

    private parseStartDate(dateText: string): DateTime {
        const matches = getAllMatches(GiardinoMenuService.DATE_REGEX, dateText);

        if (matches.length !== GiardinoMenuService.DATE_PARTS_COUNT) {
            this.logDebug(`Date does not contain expected number of parts, will use current date instead: ${dateText}`);
            return DateTime.now().startOf('week');
        }

        return DateTime.fromObject({
            day: parseInt(matches[0]),
            month: parseInt(matches[1]),
            year: parseInt(matches[4])
        });
    }

    private logDebug(message: string) {
        if (IS_DEBUG) {
            console.info('GiardinoMenuService', message);
        }
    }
}
