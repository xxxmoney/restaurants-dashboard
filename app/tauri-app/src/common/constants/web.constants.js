import {restaurantEnum} from 'root/shared/enums/restaurant.enum.js';
import {RESTAURANTS} from "root/shared/constants/restaurant.constants.js";

const WEBS = [
    {
        id: restaurantEnum.NOVODVORKA,
        name: RESTAURANTS[restaurantEnum.NOVODVORKA].name,
        url: RESTAURANTS[restaurantEnum.NOVODVORKA].url,
        zoom: 1,
    },
    {
        id: restaurantEnum.MINI_GOLF,
        name: RESTAURANTS[restaurantEnum.MINI_GOLF].name,
        url: RESTAURANTS[restaurantEnum.MINI_GOLF].url,
        zoom: 1,
    },
    {
        id: restaurantEnum.IL_GIARDINO,
        name: RESTAURANTS[restaurantEnum.IL_GIARDINO].name,
        url: RESTAURANTS[restaurantEnum.IL_GIARDINO].url,
        zoom: 1,
    },
];

export {
    WEBS,
}
