import {defineStore} from "pinia";
import {ref} from "vue";
import {MenuApi} from "@/common/apiServices/menu.api.js";
import {DateTime} from "luxon";
import {parseDate} from "@/common/helpers/date.helper.js";
import {DATE_FORMAT} from "root/shared/constants/common.constants.js";
import {restaurantEnum} from "root/shared/enums/restaurant.enum.js";
import {useLocalStorage} from "@vueuse/core";
import {SHOWN_MENUS_KEY} from "@/common/constants/storage.constants.js";

export const useMenuStore = defineStore('menus', () => {
    const restaurantIds = Object.values(restaurantEnum);

    // Object with keys as restaurant id and value of menu array
    const menusByRestaurant = ref(Object.fromEntries(restaurantIds.map(id => [id, null])));
    // Which restaurants to show
    const selectedIds = useLocalStorage(SHOWN_MENUS_KEY, restaurantIds);

    function getMenus(restaurantId) {
        return menusByRestaurant.value[restaurantId];
    }

    async function loadMenus(restaurantId) {
        menusByRestaurant.value[restaurantId] = null;
        try {
            const response = await MenuApi.getMenus(restaurantId);
            menusByRestaurant.value[restaurantId] = response.data
        } catch (e) {
            menusByRestaurant.value[restaurantId] = undefined;
            throw e;
        }
    }

    async function loadAllMenus() {
        const promises = restaurantIds.map(id => loadMenus(id));
        await Promise.all(promises);
    }

    function getCurrentDayMenu(restaurantId) {
        const today = DateTime.now().toFormat(DATE_FORMAT);
        return menusByRestaurant.value[restaurantId]?.find(menu => parseDate(menu.date).toFormat(DATE_FORMAT) === today);
    }

    return {
        selectedIds,

        getMenus,
        loadMenus,
        loadAllMenus,
        getCurrentDayMenu
    }
})