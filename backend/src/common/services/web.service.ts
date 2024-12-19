import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {getHtmlDocFromUrl} from "../helpers/domParser.helper";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";
import {CheerioAPI} from "cheerio";

export const WebService = {
    async getWebHtml(enumValue: number, fetcher: Fetcher) {
        // @ts-ignore
        const $ = await getHtmlDocFromUrl(fetcher, RESTAURANTS[enumValue].url);

        // Additional special handling
        if (enumValue === restaurantEnum.U_SISKU) {
            // @ts-ignore
            const innerFrame = $('iframe').first();
            const innerFrameSrc = innerFrame.attr('src');

            if (innerFrameSrc) {
                const $inner = await getHtmlDocFromUrl(fetcher, innerFrameSrc, 'windows-1250');
                innerFrame.attr('srcdoc', $inner.html());
            }

            // Set background color so its visible
            $('body').css('background-color', 'white');
        }

        return $.html();
    }
}
