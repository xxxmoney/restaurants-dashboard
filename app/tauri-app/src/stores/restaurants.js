import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {getHtmlDocFromUrl} from "@/helpers/webScraperHelper.js";
import {scrollOntoItem} from "@/helpers/webUtilsHelper.js";

export const useRestaurantsStore = defineStore('restaurants', () => {
    const restaurants = ref([
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
            isLoaded: false
        },
        {
            name: 'Klika',
            url: 'https://www.restauraceklika.cz',
            zoom: 1,
            handler: async (url) => {
                const doc = await getHtmlDocFromUrl(url);
                return doc.documentElement.outerHTML;
            },
            onShow: async (iframe) => {
                // Focus on menu - second content element
                const menu = iframe.contentDocument.querySelector('.content table');
                scrollOntoItem(menu);
            },
            isLoaded: false
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
                    scrollOntoItem(currentDayTitle);
                }
            },
            isLoaded: false
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
                await new Promise(resolve => setTimeout(resolve, 1000));

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
            },
            isLoaded: false
        },
    ]);
    const currentPage = ref(0);
    const visibleCount = ref(0);
    const visibleCounts = computed(() => [1, restaurants.value.length]);

    function setMobileVisibleCount() {
        visibleCount.value = 1;
    }

    function setDesktopVisibleCount() {
        visibleCount.value = restaurants.value.length;
    }

    function getRestaurantIndex(restaurant) {
        return restaurants.value.findIndex(r => r.name === restaurant.name);
    }

    function isIndexVisible(index) {
        return index >= currentPage.value && index < currentPage.value + visibleCount.value;
    }

    return {
        restaurants,
        currentPage,
        visibleCount,
        visibleCounts,
        getRestaurantIndex,
        isIndexVisible,
        setMobileVisibleCount,
        setDesktopVisibleCount
    }
})