import {restaurantEnum} from "root/shared/enums/restaurant.enum.js";
import {RESTAURANTS} from "root/shared/constants/restaurant.constants.js";

export const MENUS = [
    {
        id: restaurantEnum.NOVODVORKA,
        name: RESTAURANTS[restaurantEnum.NOVODVORKA].name,
    },
    {
        id: restaurantEnum.MINI_GOLF,
        name: RESTAURANTS[restaurantEnum.MINI_GOLF].name,
    },
];

export const MENUS_PER_ROW = 4;