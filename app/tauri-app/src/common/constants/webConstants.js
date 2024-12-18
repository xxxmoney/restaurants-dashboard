import {restaurantEnum} from 'root/shared/enums/restaurantEnum.js';
import {RESTAURANTS} from "root/shared/constants/restaurantConstants.js";

const WEBS = [
    {
        id: restaurantEnum.U_SISKU,
        name: RESTAURANTS[restaurantEnum.U_SISKU].name,
        url: RESTAURANTS[restaurantEnum.U_SISKU].url,
        zoom: 0.5,
    },
    {
        id: restaurantEnum.KLIKA,
        name: RESTAURANTS[restaurantEnum.KLIKA].name,
        url: RESTAURANTS[restaurantEnum.KLIKA].url,
        zoom: 1,
    },
    {
        id: restaurantEnum.BAR_RED_HOOK,
        name: RESTAURANTS[restaurantEnum.BAR_RED_HOOK].name,
        url: RESTAURANTS[restaurantEnum.BAR_RED_HOOK].url,
        zoom: 1,
    },
    {
        id: restaurantEnum.PALATINO,
        name: RESTAURANTS[restaurantEnum.PALATINO].name,
        url: RESTAURANTS[restaurantEnum.PALATINO].url,
        zoom: 0.75,
    },
];

export {
    WEBS,
}
