import {restaurantEnum} from 'root/shared/enums/restaurant.enum.js';
import {RESTAURANTS} from "root/shared/constants/restaurant.constants.js";

const WEBS = [
    {
        id: restaurantEnum.CINKY_LINKY,
        name: RESTAURANTS[restaurantEnum.CINKY_LINKY].name,
        url: RESTAURANTS[restaurantEnum.CINKY_LINKY].url,
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
