import {ProxyService} from "../services/proxy.service";
import * as cheerio from 'cheerio';
import {CheerioAPI} from "cheerio";

const getHtmlDocFromUrl = async (fetcher: Fetcher, url: string, charset: string | undefined = undefined): Promise<CheerioAPI> => {
    const html = await ProxyService.getHtml(fetcher, url, charset);

    // Load HTML into Cheerio
    const $ = cheerio.load(html as string);

    // Replace all link and anchor hrefs with absolute URLs
    $('link, a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && !href.startsWith('http')) {
            $(el).attr('href', new URL(href, url).href);
        }
    });

    // Replace each image src with absolute URL
    $('img').each((i, el) => {
        const src = $(el).attr('src');
        if (src && !src.startsWith('http')) {
            $(el).attr('src', new URL(src, url).href);
        }
    });

    // Replace each script src with absolute URL
    $('script').each((i, el) => {
        const src = $(el).attr('src');
        if (src && !src.startsWith('http')) {
            $(el).attr('src', new URL(src, url).href);
        }
    });

    // Return the cheerio object
    return $;
};

export {getHtmlDocFromUrl};