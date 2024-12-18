import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {getHtmlDocFromUrl} from "../helpers/domParser.helper";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";
import {Menu} from "../dto/menu";
import {DateTime} from "luxon";

function parseDate(text: string) {
    const date = text.match(/\d{1,2}\.\d{1,2}\.\d{4}/g)![0];
    return DateTime.fromFormat(date, 'd.M.yyyy');
}

function parsePrice(text: string) {
    return parseInt(text.match(/\d+/g)![0]);
}

export const MenuService = {
    async getMenu(enumValue: number): Promise<Menu[]> {
        // @ts-ignore
        if (!Object.values(restaurantEnum).includes(enumValue)) {
            throw new Error('Invalid restaurant enum value');
        }

        const menus: Menu[] = [];

        const $ =
            // @ts-ignore
            RESTAURANTS[enumValue].alternateUrl ?
                // @ts-ignore
                await getHtmlDocFromUrl(RESTAURANTS[enumValue].alternateUrl, RESTAURANTS[enumValue].alternateUrlCharset) :
                // @ts-ignore
                await getHtmlDocFromUrl(RESTAURANTS[enumValue].url, RESTAURANTS[enumValue].urlCharset);

        if (enumValue === restaurantEnum.U_SISKU) {
            // TODO
        } else if (enumValue === restaurantEnum.KLIKA) {
            const $content = $('.content').first();
            const $title = $content.find('strong').first();

            const date = parseDate($title.text());

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

            menus.push({date, items: menuItems});
        } else if (enumValue === restaurantEnum.BAR_RED_HOOK) {
            const contents = $('.content').toArray();

            contents.forEach((content) => {
                const $content = $(content);
                const $title = $content.find('h2').first();

                const date = parseDate($title.text());

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
            })


        } else if (enumValue === restaurantEnum.PALATINO) {
            const contents = [$('#pondeli').first(), $('#utery').first(), $('#streda').first(), $('#ctvrtek').first(), $('#patek').first()];

            contents.forEach(($content) => {
                const $title = $content.find('.fr-tab-den').first();

                const date = parseDate($title.text());

                const items = $content.find('.frl-table tr').toArray();

                const menuItems = items.map(item => {
                    const $item = $(item);
                    const name = $item.find('td').first().contents().first().text().trim();
                    const priceText = $item.find('td').last().text().trim();
                    const price = parsePrice(priceText);

                    return {name, price};
                });

                menus.push({date, items: menuItems});
            })
        }

        return menus;
    }
}
