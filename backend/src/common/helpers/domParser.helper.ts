import {ProxyService} from "../services/proxy.service";
import {JSDOM} from 'jsdom';

const getHtmlDocFromUrl = async (url: string, charset: string | undefined = undefined): Promise<JSDOM> => {
    const html = await ProxyService.getHtml(url, charset);

    // Handle relative references in html
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Get all link from head
    const links = doc.head.querySelectorAll('link');
    const anchors = doc.body.querySelectorAll('a');

    // Replace all link and anchors with absolute url
    [...links, ...anchors].forEach(link => {
        const href = link.getAttribute('href');

        if (href && !href.startsWith('http')) {
            link.setAttribute('href', new URL(href, url).href);
        }
    });

    // Replace each image src with absolute url
    const images = doc.body.querySelectorAll('img');
    images.forEach(image => {
        const src = image.getAttribute('src');
        if (src && !src.startsWith('http')) {
            image.setAttribute('src', new URL(src, url).href);
        }
    });

    // Replace each script src with absolute url
    const scripts = doc.body.querySelectorAll('script');
    scripts.forEach(script => {
        const src = script.getAttribute('src');
        if (src && !src.startsWith('http')) {
            script.setAttribute('src', new URL(src, url).href);
        }
    });


    return dom;
}

export {getHtmlDocFromUrl}
