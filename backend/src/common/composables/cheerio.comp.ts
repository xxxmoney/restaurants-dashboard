import {CheerioAPI} from "cheerio";
import {RESTAURANTS} from "../../../../shared/constants/restaurant.constants";
import {getHtmlDocFromUrl} from "../helpers/domParser.helper";

export async function useCheerio(fetcher: Fetcher | undefined, enumValue: number): Promise<{ $: CheerioAPI }> {
    // @ts-ignore
    const $ = RESTAURANTS[enumValue].alternateUrl ?
        // @ts-ignore
        await getHtmlDocFromUrl(RESTAURANTS[enumValue].alternateUrl, RESTAURANTS[enumValue].alternateUrlCharset, fetcher) :
        // @ts-ignore
        await getHtmlDocFromUrl(RESTAURANTS[enumValue].url, RESTAURANTS[enumValue].urlCharset, fetcher);

    return {$};
}
