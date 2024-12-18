import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {getHtmlDocFromUrl} from "../helpers/domParser.helper";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";
import {Menu} from "../dto/menu";

export const MenuService = {
    async getMenu(enumValue: number): Promise<Menu[]> {
        // @ts-ignore
        if (!Object.values(restaurantEnum).includes(enumValue)) {
            throw new Error('Invalid restaurant enum value');
        }

        const menus: Menu[] = [];

        // @ts-ignore
        const $ = await getHtmlDocFromUrl(RESTAURANTS[enumValue].url)

        if (enumValue === restaurantEnum.U_SISKU) {
            // TODO
        } else if (enumValue === restaurantEnum.KLIKA) {
            const $content = $('.content').first();

            const $title = $content.find('strong').first();

            // Get date of current menu
            const dateText = $title.text().replace('Menu', '').trim();
            const date = new Date(dateText);

            // Get menu items
            const items = $content.find('table tr').has('td').toArray();

            // Select menu items to correct format
            const menuItems = items.map((item) => {
                const $item = $(item);
                const name = $item.find('td').first().text().trim();
                const priceText = $item.find('td').last().text().trim();
                // Get number from price using regex
                const price = parseInt(priceText.match(/\d+/g)![0]);

                return {name, price};
            });

            console.log(date)
            console.log(menuItems)

            menus.push({date, items: menuItems});
        } else if (enumValue === restaurantEnum.BAR_RED_HOOK) {
            // TODO
        } else if (enumValue === restaurantEnum.PALATINO) {
            // TODO
        }

        return menus;
    }
}
