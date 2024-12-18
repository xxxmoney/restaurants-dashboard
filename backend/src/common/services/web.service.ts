import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {getHtmlDocFromUrl} from "../helpers/domParser.helper";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";

export const WebService = {
    getWebHtmlHandler(enumValue: Number) {
        switch (enumValue) {
            case restaurantEnum.U_SISKU:
                return async () => {
                    // @ts-ignore
                    const $ = await getHtmlDocFromUrl(RESTAURANTS[restaurantEnum.U_SISKU].url);
                    return $.html();
                }
            case restaurantEnum.KLIKA:
                return async () => {
                    // @ts-ignore
                    const $ = await getHtmlDocFromUrl(RESTAURANTS[restaurantEnum.KLIKA].url);
                    return $.html();
                }
            case restaurantEnum.BAR_RED_HOOK:
                return async () => {
                    // @ts-ignore
                    const $ = await getHtmlDocFromUrl(RESTAURANTS[restaurantEnum.BAR_RED_HOOK].url);

                    const innerFrame = $('iframe').first();
                    const innerFrameSrc = innerFrame.attr('src');

                    if (innerFrameSrc) {
                        const $inner = await getHtmlDocFromUrl(innerFrameSrc, 'windows-1250');
                        innerFrame.attr('srcdoc', $inner.html());
                    }

                    // Set background color so its visible
                    $('body').css('background-color', 'white');

                    return $.html();
                }
            case restaurantEnum.PALATINO:
                return async () => {
                    // @ts-ignore
                    const $ = await getHtmlDocFromUrl(RESTAURANTS[restaurantEnum.PALATINO].url);
                    return $.html();
                }
            default:
                throw new Error(`Restaurant with key ${enumValue} is not implemented`);
        }
    }
}
