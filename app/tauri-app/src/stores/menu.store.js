import {defineStore} from "pinia";
import {ref} from "vue";
import {MenuApi} from "@/common/apiServices/menu.api.js";

export const useMenuStore = defineStore('menus', () => {
    const menus = ref([]);
    const restaurantId = ref(null);

    async function loadMenus() {
        // In case of unselect
        if (!restaurantId) {
            menus.value = [];
        } else {
            menus.value = [];
            const response = await MenuApi.getMenus(restaurantId.value);
            menus.value = response.data
        }
    }

    return {
        menus,
        restaurantId,

        loadMenus
    }
})