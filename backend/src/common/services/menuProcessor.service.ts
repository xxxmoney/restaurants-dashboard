import {CategorizedMenu, Menu} from "../dto/menu";
import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {DateTime} from "luxon";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";
import {getHtmlDocFromUrl} from "../helpers/domParser.helper";
import {MenuService} from "./menu.service";
import {MenuCategorizer} from "./menuCategorizer.service";

export const MenuProcessor = {
    async getProcessedMenu(enumValue: number, env: any, fetcher?: Fetcher): Promise<CategorizedMenu[]> {
        // @ts-ignore
        if (!Object.values(restaurantEnum).includes(enumValue)) {
            throw new Error('Invalid restaurant enum value');
        }

        let menus: Menu[];

        const $ = await this.getCheerioApi(enumValue, fetcher);

        if (enumValue === restaurantEnum.CINKY_LINKY) {
            menus = await MenuService.getCinkyLinkyMenu(env);
        } else if (enumValue === restaurantEnum.KLIKA) {
            menus = MenuService.getKlikaMenu($);
        } else if (enumValue === restaurantEnum.BAR_RED_HOOK) {
            menus = MenuService.getBarRedHookMenu($);
        } else if (enumValue === restaurantEnum.PALATINO) {
            menus = MenuService.getPalatinoMenu($);
        } else if (enumValue === restaurantEnum.SALANDA) {
            menus = MenuService.getSalandaMenu($);
        } else if (enumValue === restaurantEnum.VOZOVNA_PANKRAC) {
            menus = await MenuService.getVozovnaPankracMenu($);
        } else {
            throw new Error('Restaurant not supported');
        }

        // Hotfix - set year of all menus to current year
        menus.forEach(menu => {
            menu.date = menu.date.set({year: DateTime.now().year});
        });

        // Order menus by date descending
        menus.sort((a, b) => a.date.toMillis() - b.date.toMillis());

        // Apply menu categorization
        const {categorizedMenus} = await MenuCategorizer.categorizeMenus({menus: menus}, env);
        return categorizedMenus;
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
