import {useRestaurantsStore} from "@/stores/restaurants.js";

export const useRestaurantHandling = () => {
    const store = useRestaurantsStore();

    async function onRestaurantLoaded(restaurant, container) {
        const frame = container.querySelector('iframe');

        if (restaurant.onLoad) {
            await restaurant.onLoad(frame);
        }
    }

    async function onRestaurantShow(restaurant, container) {
        const frame = container.querySelector('iframe');

        if (restaurant.onShow) {
            return await restaurant.onShow(frame);
        }

        return null;
    }

    async function loadRestaurant(restaurant, container) {
        if (restaurant.handler) {
            restaurant.content = null;
            restaurant.content = await restaurant.handler(restaurant.url);
        } else {
            const frame = container.querySelector('iframe');

            // Refresh iframe
            frame.src = '';
            frame.src = restaurant.url;
        }
    }

    async function loadRestaurants(containers) {
        for (const restaurant of store.restaurants) {
            await loadRestaurant(restaurant, containers[store.getRestaurantIndex(restaurant)]);
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
        onRestaurantLoaded,
        onRestaurantShow,
        loadRestaurant,
        loadRestaurants,
        addItemToScrollQueue,
        getItemFromScrollQueue
    }
}
