import {Menu, Menus} from "../dto/menu";
import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {DateTime} from "luxon";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";
import {getHtmlDocFromUrl} from "../helpers/domParser.helper";
import {MenuService} from "./menu.service";

export const MenuProcessor = {
    async getProcessedMenu(enumValue: number, env: any, fetcher?: Fetcher): Promise<Menu[]> {
        // @ts-ignore
        if (!Object.values(restaurantEnum).includes(enumValue)) {
            throw new Error('Invalid restaurant enum value');
        }

        const menus: Menu[] = [];

        const $ = await this.getCheerioApi(enumValue, fetcher);

        if (enumValue === restaurantEnum.CINKY_LINKY) {
            await MenuService.getCinkyLinkyMenu(menus, env);
        } else if (enumValue === restaurantEnum.KLIKA) {
            MenuService.getKlikaMenu($, menus);
        } else if (enumValue === restaurantEnum.BAR_RED_HOOK) {
            MenuService.getBarRedHookMenu($, menus);
        } else if (enumValue === restaurantEnum.PALATINO) {
            MenuService.getPalatinoMenu($, menus);
        }

        // Hotfix - set year of all menus to current year
        menus.forEach(menu => {
            menu.date = menu.date.set({year: DateTime.now().year});
        });

        // Order menus by date descending
        menus.sort((a, b) => a.date.toMillis() - b.date.toMillis());

        return menus;
    },

    async getCheerioApi(enumValue: number, fetcher: Fetcher<undefined, never> | undefined) {
        // @ts-ignore
        return RESTAURANTS[enumValue].alternateUrl ?
            // @ts-ignore
            await getHtmlDocFromUrl(RESTAURANTS[enumValue].alternateUrl, RESTAURANTS[enumValue].alternateUrlCharset, fetcher) :
            // @ts-ignore
            await getHtmlDocFromUrl(RESTAURANTS[enumValue].url, RESTAURANTS[enumValue].urlCharset, fetcher);
    },
}
