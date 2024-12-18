import {restaurantEnum} from "root/shared/enums/restaurant.enum.js";
import {getHtmlDocFromUrl} from "@/helpers/webScraper.helper.js";
import {scrollOntoItem} from "@/helpers/webUtils.helper.js";

export const WebService = {
    getHandler(enumValue) {
        switch (enumValue) {
            case restaurantEnum.U_SISKU:
                return async (url) => {
                    const doc = await getHtmlDocFromUrl(url);
                    return doc.documentElement.outerHTML;
                }
            case restaurantEnum.KLIKA:
                return async (url) => {
                    const doc = await getHtmlDocFromUrl(url);
                    return doc.documentElement.outerHTML;
                }
            case restaurantEnum.BAR_RED_HOOK:
                return async (url) => {
                    const doc = await getHtmlDocFromUrl(url);

                    // Set inner frame
                    const innerFrame = doc.querySelector('iframe');
                    const innerDoc = await getHtmlDocFromUrl(innerFrame.src, 'windows-1250');
                    innerFrame.srcdoc = innerDoc.documentElement.outerHTML;

                    // Set body background color as white
                    doc.body.style.backgroundColor = 'white';

                    return doc.documentElement.outerHTML;
                }
            case restaurantEnum.PALATINO:
                return async (url) => {
                    const doc = await getHtmlDocFromUrl(url);
                    return doc.documentElement.outerHTML;
                }
            default:
                throw new Error(`Restaurant with key ${enumValue} is not implemented`);
        }
    },

    getOnLoad(enumValue) {
        switch (enumValue) {
            case restaurantEnum.U_SISKU:
                return (iframe) => {
                    if (!iframe?.contentDocument) {
                        return;
                    }

                    // Click on menu
                    const marker = iframe.contentDocument.querySelector('.marker');
                    marker.click();
                }
            // Not required, default is empty function
            default:
                return () => {
                };
        }
    },

    getOnShow(enumValue) {
        switch (enumValue) {
            case restaurantEnum.U_SISKU:
                return async (iframe) => {
                    if (!iframe?.contentDocument) {
                        return;
                    }

                    // TODO: scroll onto bottom of image
                    const img = iframe.contentDocument.querySelector('img');

                    return {};
                }
            case restaurantEnum.KLIKA:
                return (iframe) => {
                    // Focus on menu - second content element
                    const menu = iframe.contentDocument.querySelector('.content table');

                    if (menu) {
                        return {scrollInQueue: menu};
                    }

                    return {};
                }
            case restaurantEnum.BAR_RED_HOOK:
                return async (iframe) => {
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
                }
            case restaurantEnum.PALATINO:
                return async (iframe) => {
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
            default:
                // Not required, default is empty function
                return () => {
                };
        }

    }
}
