import {MenuService} from "./menus/menu.types";
import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {CinkyLinkyMenuService} from "./menus/cinkyLinky.menu.service";
import {KlikaMenuService} from "./menus/klika.menu.service";
import {BarRedHookMenuService} from "./menus/barRedHook.menu.service";
import {PalatinoMenuService} from "./menus/palatino.menu.service";
import {SalandaMenuService} from "./menus/salanda.menu.service";
import {VozovnaPankracMenuService} from "./menus/vozovnaPankrac.menu.service";

export const MenuProviderService = {
    getMenuService(env: any, enumValue: number, fetcher?: Fetcher): MenuService {
        switch (enumValue) {
            case restaurantEnum.CINKY_LINKY:
                return new CinkyLinkyMenuService(env) as MenuService;
            case restaurantEnum.KLIKA:
                return new KlikaMenuService(fetcher) as MenuService;
            case restaurantEnum.BAR_RED_HOOK:
                return new BarRedHookMenuService(fetcher) as MenuService;
            case restaurantEnum.PALATINO:
                return new PalatinoMenuService(fetcher) as MenuService;
            case restaurantEnum.SALANDA:
                return new SalandaMenuService(fetcher) as MenuService;
            case restaurantEnum.VOZOVNA_PANKRAC:
                return new VozovnaPankracMenuService(fetcher) as MenuService;
            default:
                throw new Error('Invalid restaurant enum value');
        }

    }
}
