import {DateTime} from "luxon";

export interface MenuItem {
    name: string;
    price: number;
}

export interface Menu {
    date: DateTime;
    items: MenuItem[];
}


