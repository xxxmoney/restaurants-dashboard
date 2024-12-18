import {restaurantEnum} from "../enums/restaurant.enum.js";

const RESTAURANTS = {};

// Handle every enum case
for (const value of Object.values(restaurantEnum)) {
    switch (value) {
        case restaurantEnum.U_SISKU:
            RESTAURANTS[value] = {
                name: 'U Šišků',
                url: 'https://www.restaurace-u-sisku.cz'
            };
            break;
        case restaurantEnum.KLIKA:
            RESTAURANTS[value] = {
                name: 'Klika',
                url: 'https://www.restauraceklika.cz'
            };
            break;
        case restaurantEnum.BAR_RED_HOOK:
            RESTAURANTS[value] = {
                name: 'Bar Red Hook',
                url: 'http://www.restaurantbarredhook.cz/?Polední_menu'
            };
            break;
        case restaurantEnum.PALATINO:
            RESTAURANTS[value] = {
                name: 'Palatino',
                url: 'https://nominanza.com/index-pankrac.html'
            };
            break;
        default:
            // Throw exception, every restaurant should be implemented
            throw new Error(`Restaurant with key ${value} is not implemented`);

    }
}

export {RESTAURANTS}

