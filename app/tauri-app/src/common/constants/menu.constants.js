import {allowedRestaurants} from "root/shared/enums/restaurant.enum.js";
import {RESTAURANTS} from "root/shared/constants/restaurant.constants.js";

export const MENUS = allowedRestaurants.map(restaurantId => ({
    id: restaurantId,
    name: RESTAURANTS[restaurantId].name,
}));

export const MENUS_PER_ROW = 4;
