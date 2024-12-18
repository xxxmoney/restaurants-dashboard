import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {getHtmlDocFromUrl} from "../helpers/domParser.helper";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";

export const MenuService = {
    async getMenu(enumValue: number) {
        // @ts-ignore
        if (!Object.values(restaurantEnum).includes(enumValue)) {
            throw new Error('Invalid restaurant enum value');
        }

        // @ts-ignore
        const $ = await getHtmlDocFromUrl(RESTAURANTS[enumValue].url)

        switch (enumValue) {
            case restaurantEnum.U_SISKU:

                break;
            case restaurantEnum.KLIKA:

                break;

            case restaurantEnum.BAR_RED_HOOK:
                
                break;
            case restaurantEnum.PALATINO:

                break;
        }

    }
}
