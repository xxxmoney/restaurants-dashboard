import {CategorizedMenu, Menu} from "../dto/menu";
import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {DateTime} from "luxon";
import {MenuCategorizer} from "./menuCategorizer.service";
import {MenuService} from "./menus/menu.types";
import {CinkyLinkyMenuService} from "./menus/cinkyLinky.menu.service";
import {KlikaMenuService} from "./menus/klika.menu.service";
import {BarRedHookMenuService} from "./menus/barRedHook.menu.service";
import {PalatinoMenuService} from "./menus/palatino.menu.service";
import {SalandaMenuService} from "./menus/salanda.menu.service";
import {VozovnaPankracMenuService} from "./menus/vozovnaPankrac.menu.service";

export const MenuProcessor = {
    async getProcessedMenu(enumValue: number, env: any, fetcher?: Fetcher): Promise<CategorizedMenu[]> {
        let menuService: MenuService;

        switch (enumValue) {
            case restaurantEnum.CINKY_LINKY:
                menuService = new CinkyLinkyMenuService(env) as MenuService;
                break;
            case restaurantEnum.KLIKA:
                menuService = new KlikaMenuService(fetcher) as MenuService;
                break;
            case restaurantEnum.BAR_RED_HOOK:
                menuService = new BarRedHookMenuService(fetcher) as MenuService;
                break;
            case restaurantEnum.PALATINO:
                menuService = new PalatinoMenuService(fetcher) as MenuService;
                break;
            case restaurantEnum.SALANDA:
                menuService = new SalandaMenuService(fetcher) as MenuService;
                break;
            case restaurantEnum.VOZOVNA_PANKRAC:
                menuService = new VozovnaPankracMenuService(fetcher) as MenuService;
                break;
            default:
                throw new Error('Invalid restaurant enum value');
        }

        const menus = await menuService.getMenu();

        // Hotfix - set year of all menus to current year
        menus.forEach(menu => {
            menu.date = menu.date.set({year: DateTime.now().year});
        });
        // Order menus by date descending
        menus.sort((a, b) => a.date.toMillis() - b.date.toMillis());

        // Apply menu categorization
        const {categorizedMenus} = await MenuCategorizer.categorizeMenus({menus: menus}, env);
        return categorizedMenus;
    }
}
