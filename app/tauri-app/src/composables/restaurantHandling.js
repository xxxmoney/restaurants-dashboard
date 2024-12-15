import {useWebStore} from "@/stores/webs.js";
import {WebService} from "@/common/services/webService.js";

export const useRestaurantHandling = () => {
    const store = useWebStore();

    async function onWebLoaded(restaurant, container) {
        const frame = container.querySelector('iframe');

        await WebService.getOnLoad(restaurant.id)(frame);
    }

    async function onRestaurantShow(restaurant, container) {
        const frame = container.querySelector('iframe');

        return await WebService.getOnShow(restaurant.id)(frame);
    }

    async function loadWeb(restaurant, container) {
        if (restaurant.handler) {
            restaurant.content = null;
            restaurant.content = await WebService.getHandler(restaurant.id)(restaurant.url);
        } else {
            const frame = container.querySelector('iframe');

            // Refresh iframe
            frame.src = '';
            frame.src = restaurant.url;
        }
    }

    function addItemToScrollQueue(item, restaurant) {
        const value = {
            item,
            index: store.getRestaurantIndex(restaurant)
        };

        store.scrollingQueue.push(value);
    }

    function getItemFromScrollQueue() {
        // No item to scroll
        if (store.scrollingQueue.length === 0) {
            return null;
        }

        const {item, index} = store.scrollingQueue.shift();
        // Not current page, should no be scrolled onto
        if (store.isIndexVisible(index)) {
            return item;
        }

        return null;
    }

    return {
        onRestaurantLoaded: onWebLoaded,
        onRestaurantShow,
        loadRestaurant: loadWeb,
        addItemToScrollQueue,
        getItemFromScrollQueue
    }
}
