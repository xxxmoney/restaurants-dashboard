import {CheerioAPI} from "cheerio";

export function useCheerio(fetcher: Fetcher | undefined, enumValue: number): { $: CheerioAPI } {
    // @ts-ignore
    const $ = RESTAURANTS[enumValue].alternateUrl ?
        // @ts-ignore
        await getHtmlDocFromUrl(RESTAURANTS[enumValue].alternateUrl, RESTAURANTS[enumValue].alternateUrlCharset, fetcher) :
        // @ts-ignore
        await getHtmlDocFromUrl(RESTAURANTS[enumValue].url, RESTAURANTS[enumValue].urlCharset, fetcher);

    return {$};
}
