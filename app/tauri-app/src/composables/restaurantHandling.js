import {useRestaurantsStore} from "@/stores/restaurants.js";

export const useRestaurantHandling = () => {
    const store = useRestaurantsStore();

    async function onRestaurantLoaded(restaurant, container, isVisble) {
        const frame = container.querySelector('iframe');

        if (restaurant.onLoad) {
            await restaurant.onLoad(frame);
        }

        if (isVisble && restaurant.onShow) {
            await restaurant.onShow(frame)
        }
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

    return {
        onRestaurantLoaded,
        loadRestaurant,
        loadRestaurants
    }
}
