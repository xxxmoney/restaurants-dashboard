import {restaurantEnum} from "root/shared/enums/restaurant.enum.js";
import {RESTAURANTS} from "root/shared/constants/restaurant.constants.js";

const MENUS = [
    {
        id: restaurantEnum.U_SISKU,
        name: RESTAURANTS[restaurantEnum.U_SISKU].name,
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

export {
    MENUS,
}
