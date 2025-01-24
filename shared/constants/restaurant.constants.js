import {restaurantEnum} from "../enums/restaurant.enum.js";

const RESTAURANTS = {};

// Handle every enum case
for (const value of Object.values(restaurantEnum)) {
    switch (value) {
        case restaurantEnum.CINKY_LINKY:
            RESTAURANTS[value] = {
                name: 'Cinky Linky',
                url: 'https://cinkylinky.cz'
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
                url: 'http://www.restaurantbarredhook.cz/?Polední_menu',
                alternateUrl: 'https://www.menicka.cz/api/iframe/?id=4486',
                alternateUrlCharset: 'windows-1250'
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

