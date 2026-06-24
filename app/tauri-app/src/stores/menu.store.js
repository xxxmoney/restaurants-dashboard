import {defineStore} from "pinia";
import {ref} from "vue";
import {MenuApi} from "@/common/apiServices/menu.api.js";
import {DateTime} from "luxon";
import {parseDate} from "@/common/helpers/date.helper.js";
import {DATE_FORMAT} from "root/shared/constants/common.constants.js";
import {useLocalStorage} from "@vueuse/core";
import {SHOWN_MENUS_KEY} from "@/common/constants/storage.constants.js";
import {MENUS} from "@/common/constants/menu.constants.js";

export const useMenuStore = defineStore('menus', () => {
    const restaurantIds = MENUS.map(menu => menu.id); // Allowed restaurants are defined in MENUS

    // Object with keys as restaurant id and value of menu array
    const menusByRestaurant = ref(Object.fromEntries(restaurantIds.map(id => [id, null])));
    // Which restaurants to show
    const selectedIds = useLocalStorage(SHOWN_MENUS_KEY, restaurantIds);
    const favoriteMenuItemsByRestaurant = ref(Object.fromEntries(restaurantIds.map(id => [id, null])));

    function getMenus(restaurantId) {
        return menusByRestaurant.value[restaurantId];
    }

    async function loadMenus(restaurantId) {
        menusByRestaurant.value[restaurantId] = null;
        try {
            const response = await MenuApi.getMenus(restaurantId);

            // Generate id for each menu item
            for (const menu of response.data) {
              for (const item of menu.categorizedItems.flatMap(category => category.items)) {
                  item.id = `${restaurantId}_${menu.date}_${item.name}`;
              }
            }

            menusByRestaurant.value[restaurantId] = response.data;

            const timestamps = response.data.map(item => DateTime.fromFormat(item.date, DATE_FORMAT).toMillis());
            const minDate = DateTime.fromMillis(Math.min(...timestamps));
            const maxDate = DateTime.fromMillis(Math.max(...timestamps));
            const { data: favorites } = await MenuApi.getFavoriteMenuItems(restaurantId, minDate.toFormat(DATE_FORMAT), maxDate.toFormat(DATE_FORMAT));
            favoriteMenuItemsByRestaurant.value[restaurantId] = favorites;
        } catch (e) {
            menusByRestaurant.value[restaurantId] = undefined;
            throw e;
        }
    }

    async function loadAllMenus() {
        const promises = selectedIds.value.map(id => loadMenus(id));
        await Promise.all(promises);
    }

    function getCurrentDayMenu(restaurantId) {
        const today = DateTime.now().toFormat(DATE_FORMAT);
        return menusByRestaurant.value[restaurantId]?.find(menu => parseDate(menu.date).toFormat(DATE_FORMAT) === today);
    }

    // TODO: change this api call
    function toggleFavoriteMenuItem(restaurantId, date, text) {
        const favorite = favoriteMenuItemsByRestaurant.value[restaurantId].find(item => item.date === date && item.text === text);
        // TODO: handling of remove/add
    }

    function hasFavoriteMenuItem(restaurantId, date, text) {
        return favoriteMenuItemsByRestaurant.value[restaurantId].some(item => item.date === date && item.text === text);
    }

    return {
        selectedIds,
        menusByRestaurant,

        getMenus,
        loadMenus,
        loadAllMenus,
        getCurrentDayMenu,
        toggleFavoriteMenuItem,
        hasFavoriteMenuItem
    }
})
