import {Menu} from "../../dto/menu";

export interface MenuService {
    getMenus(): Promise<Menu[]>;
}
