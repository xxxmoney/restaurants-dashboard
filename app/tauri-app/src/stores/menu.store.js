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
    const favoriteMenuItems = ref([]);

    function getMenus(restaurantId) {
        return menusByRestaurant.value[restaurantId];
    }

    async function loadMenus(restaurantId) {
        menusByRestaurant.value[restaurantId] = null;
        try {
            const favoritesPromise = MenuApi.getFavoriteMenuItems(restaurantId, '2026-06-22', '2026-06-26'); // TODO: use correct dateFrom and dateTo
            const response = await MenuApi.getMenus(restaurantId);

            // Generate id for each menu item
            for (const menu of response.data) {
              for (const item of menu.categorizedItems.flatMap(category => category.items)) {
                  item.id = `${restaurantId}_${menu.date}_${item.name}`;
              }
            }

            menusByRestaurant.value[restaurantId] = response.data

            const { data: favorites } = await favoritesPromise;
            favoriteMenuItems.value = favorites;
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

    function toggleFavoriteMenuItem(menuItemId) {
        const index = favoriteMenuItems.value.findIndex(item => item === menuItemId);
        if (index === -1) {
            favoriteMenuItems.value.push(menuItemId); // Not yet favorite, add
        } else {
            favoriteMenuItems.value.splice(index, 1); // Already favorite, remove
        }
    }

    function hasFavoriteMenuItem(menuItemId) {
        return favoriteMenuItems.value.includes(menuItemId);
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
