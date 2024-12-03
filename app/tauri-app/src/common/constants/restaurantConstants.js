import {getHtmlDocFromUrl} from "@/helpers/webScraperHelper.js";
import {scrollOntoItem} from "@/helpers/webUtilsHelper.js";

const restaurants = [
    {
        name: 'U Šišků',
        url: 'https://www.restaurace-u-sisku.cz',
        zoom: 0.5,
        handler: async (url) => {
            const doc = await getHtmlDocFromUrl(url);
            return doc.documentElement.outerHTML;
        },
        onLoad: (iframe) => {
            if (!iframe?.contentDocument) {
                return;
            }

            // Click on menu
            const marker = iframe.contentDocument.querySelector('.marker');
            marker.click();
        },
        onShow(iframe) {
            if (!iframe?.contentDocument) {
                return;
            }

            // TODO: scroll onto bottom of image
            const img = iframe.contentDocument.querySelector('img');

            return {};
        },
    },
    {
        name: 'Klika',
        url: 'https://www.restauraceklika.cz',
        zoom: 1,
        handler: async (url) => {
            const doc = await getHtmlDocFromUrl(url);
            return doc.documentElement.outerHTML;
        },
        onShow: (iframe) => {
            // Focus on menu - second content element
            const menu = iframe.contentDocument.querySelector('.content table');

            if (menu) {
                return {scrollInQueue: menu};
            }

            return {};
        },
    },
    {
        name: 'Bar Red Hook',
        url: 'http://www.restaurantbarredhook.cz/?Polední_menu',
        zoom: 1,
        handler: async (url) => {
            const doc = await getHtmlDocFromUrl(url);

            // Set inner frame
            const innerFrame = doc.querySelector('iframe');
            const innerDoc = await getHtmlDocFromUrl(innerFrame.src, 'windows-1250');
            innerFrame.srcdoc = innerDoc.documentElement.outerHTML;

            // Set body background color as white
            doc.body.style.backgroundColor = 'white';

            return doc.documentElement.outerHTML;
        },
        onShow: async (iframe) => {
            // Timeout
            await new Promise(resolve => setTimeout(resolve, 500));

            const innerFrame = iframe.contentDocument.querySelector('iframe');

            // Focus on menu - second content element
            const dayTitles = Array.from(innerFrame.contentDocument.querySelectorAll('.content h2'));
            const currentDayString = new Date().toLocaleDateString('cs-CZ', {weekday: 'long'});
            const currentDayTitle = dayTitles.find(title => title.textContent.trim().toLocaleLowerCase().startsWith(currentDayString.toLowerCase()));

            if (currentDayTitle) {
                return {scrollInQueue: currentDayTitle};
            }

            return {};
        },
    },
    {
        name: 'Palatino (Dole)',
        url: 'https://nominanza.com/index-pankrac.html#mu-reservation',
        zoom: 0.75,
        handler: async (url) => {
            const doc = await getHtmlDocFromUrl(url);
            return doc.documentElement.outerHTML;
        },
        onShow: async (iframe) => {
            // Timeout
            await new Promise(resolve => setTimeout(resolve, 500));

            // Focus on menu
            const menu = iframe.contentDocument.getElementById('mu-reservation');
            scrollOntoItem(menu);

            // Select current day
            const dayLinks = iframe.contentDocument.querySelectorAll('.fr-tyden-menu li a');
            const currentDayString = new Date().toLocaleDateString('cs-CZ', {weekday: 'long'});
            const currentDayLink = Array.from(dayLinks).find(link => link.textContent.trim().toLocaleLowerCase() === currentDayString.toLowerCase());
            if (currentDayLink) {
                currentDayLink.click();
            }

            return {};
        }
    },
];

// Set Ids
restaurants.forEach((restaurant, index) => {
    restaurant.id = index + 1;
});

export {
    restaurants,
}
