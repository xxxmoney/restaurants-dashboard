import {DateTime} from "luxon";

export interface MenuItem {
    name: string;
    price: number;
}

export interface Menu {
    date: DateTime;
    items: MenuItem[];
}

export interface Menus {
    menus: Menu[];
}

export interface CategorizedMenuItem {
    category: string;
    items: MenuItem[];
}

export interface CategorizedMenu {
    date: DateTime;
    categorizedItems: CategorizedMenuItem[];
}

export interface CategorizedMenus {
    categorizedMenus: CategorizedMenu[];
}

export interface CachedMenus {
    processedMenus: CategorizedMenu[];
    menus: Menu[];
}
