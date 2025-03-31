import {Menu} from "../../dto/menu";

export interface MenuService {
    getMenu(): Promise<Menu[]>;
}
