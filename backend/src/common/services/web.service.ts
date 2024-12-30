import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {getHtmlDocFromUrl} from "../helpers/domParser.helper";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";
import {CheerioAPI} from "cheerio";

export const WebService = {
    async getWebHtml(enumValue: number, fetcher?: Fetcher) {
        // @ts-ignore
        const $ = await getHtmlDocFromUrl(fetcher, RESTAURANTS[enumValue].url);
        // Set background color so its visible
        $('body').attr('style', 'background-color: white;');

        // Additional special handling
        if (enumValue === restaurantEnum.U_SISKU) {
            // @ts-ignore
            const innerFrame = $('iframe').first();
            const innerFrameSrc = innerFrame.attr('src');

            if (innerFrameSrc) {
                const $inner = await getHtmlDocFromUrl(innerFrameSrc, 'windows-1250', fetcher);
                // Set background color so its visible
                $inner('body').attr('style', 'background-color: white;');

                innerFrame.attr('srcdoc', $inner.html());
            }
        }

        return $.html();
    }
}
