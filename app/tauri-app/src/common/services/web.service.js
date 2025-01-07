import {restaurantEnum} from "root/shared/enums/restaurant.enum.js";
import {scrollOntoItem} from "@/common/helpers/webUtils.helper.js";

export const WebService = {
    getOnLoad(enumValue) {
        switch (enumValue) {
            case restaurantEnum.CINKY_LINKY:
                return (iframe) => {
                    if (!iframe?.contentDocument) {
                        return;
                    }

                    // Click on menu
                    const marker = iframe.contentDocument.querySelector('.elementor-button-link');
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
            case restaurantEnum.CINKY_LINKY:
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
