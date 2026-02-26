import {MenuService} from "./menu.types";
import {Menu} from "../../dto/menu";
import {useCheerio} from "../../composables/cheerio.comp";
import {restaurantEnum} from "../../../../../shared/enums/restaurant.enum";

export class NovodvorkaMenuService implements MenuService {
    private readonly fetcher?: Fetcher;

    constructor(fetcher?: Fetcher) {
        this.fetcher = fetcher;
    }

    async getMenus(): Promise<Menu[]> {
        const {$} = await useCheerio(this.fetcher, restaurantEnum.SALANDA);

        // TODO: get menus from html

        // TODO: use menu contents when getting from html is ready
        return []
    }
}
