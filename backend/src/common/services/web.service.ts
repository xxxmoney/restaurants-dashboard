import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {getHtmlDocFromUrl} from "../helpers/domParser.helper";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";

export const WebService = {
    getWebHtml(enumValue: Number) {
        switch (enumValue) {
            case restaurantEnum.U_SISKU:
                return async () => {
                    // @ts-ignore
                    const dom = await getHtmlDocFromUrl(RESTAURANTS[restaurantEnum.U_SISKU].url);
                    return dom.serialize();
                }
            case restaurantEnum.KLIKA:
                return async () => {
                    // @ts-ignore
                    const dom = await getHtmlDocFromUrl(RESTAURANTS[restaurantEnum.KLIKA].url);
                    return dom.serialize();
                }
            case restaurantEnum.BAR_RED_HOOK:
                return async () => {
                    // @ts-ignore
                    const dom = await getHtmlDocFromUrl(RESTAURANTS[restaurantEnum.BAR_RED_HOOK].url);

                    // Set inner frame
                    const doc = dom.window.document;
                    const innerFrame = doc.querySelector('iframe')!;
                    const innerDom = await getHtmlDocFromUrl(innerFrame.src, 'windows-1250');
                    const innerDoc = innerDom.window.document;
                    innerFrame.srcdoc = innerDoc.documentElement.outerHTML;

                    // Set body background color as white
                    doc.body.style.backgroundColor = 'white';

                    return dom.serialize();
                }
            case restaurantEnum.PALATINO:
                return async () => {
                    // @ts-ignore
                    const dom = await getHtmlDocFromUrl(RESTAURANTS[restaurantEnum.PALATINO].url);
                    return dom.serialize();
                }
            default:
                throw new Error(`Restaurant with key ${enumValue} is not implemented`);
        }
    }
}
