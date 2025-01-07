import {restaurantEnum} from "root/shared/enums/restaurant.enum.js";
import {RESTAURANTS} from "root/shared/constants/restaurant.constants.js";

export const MENUS = [
    {
        id: restaurantEnum.CINKY_LINKY,
        name: RESTAURANTS[restaurantEnum.CINKY_LINKY].name,
    },
    {
        id: restaurantEnum.KLIKA,
        name: RESTAURANTS[restaurantEnum.KLIKA].name,
    },
    {
        id: restaurantEnum.BAR_RED_HOOK,
        name: RESTAURANTS[restaurantEnum.BAR_RED_HOOK].name,
    },
    {
        id: restaurantEnum.PALATINO,
        name: RESTAURANTS[restaurantEnum.PALATINO].name,
    },
];

export const MENUS_PER_ROW = 4;