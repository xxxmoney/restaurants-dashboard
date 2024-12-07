const PROXY_URL = 'https://proxy-worker.xxxmoney111.workers.dev';

const getHtmlDocFromUrl = async (url, charset = null, useProxy = true) => {
    const searchParamsObject = {
        url: url
    };
    if (charset) {
        searchParamsObject.charset = charset;
    }
    const searchParams = new URLSearchParams(searchParamsObject);
    const response = await fetch(useProxy ? `${PROXY_URL}?${searchParams}` : url);
    const html = await response.text();

    // Handle relative references in html
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

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


    return doc;
}

export {getHtmlDocFromUrl}
