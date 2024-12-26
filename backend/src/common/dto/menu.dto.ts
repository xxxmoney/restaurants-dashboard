import {DateTime} from "luxon";

export interface MenuItem {
    name: string;
    price: number;
}

export interface MenuDto {
    date: DateTime;
    items: MenuItem[];
}

export interface Menus {
    menus: MenuDto[];
}

