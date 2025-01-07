import {restaurantEnum} from "root/shared/enums/restaurant.enum.js";
import {scrollOntoItem} from "@/common/helpers/webUtils.helper.js";

export const WebService = {
    getOnLoad(enumValue) {
        switch (enumValue) {
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

                    // Timeout
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Click on menu
                    const links = Array.from(iframe.contentDocument.querySelectorAll('.elementor-button-link'));
                    console.log(links)
                    const marker = links[1];
                    marker.click();

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
