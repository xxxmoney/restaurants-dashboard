import {defineStore} from "pinia";
import {ref} from "vue";
import {MenuApi} from "@/common/apiServices/menu.api.js";
import {DateTime} from "luxon";
import {parseDate} from "@/common/helpers/date.helper.js";
import {DATE_FORMAT} from "root/shared/constants/common.constants.js";

export const useMenuStore = defineStore('menus', () => {
    const menus = ref([]);
    const restaurantId = ref(null);

    async function loadMenus() {
        menus.value = null;
        const response = await MenuApi.getMenus(restaurantId.value);
        menus.value = response.data
    }

    function getCurrentDayMenu() {
        const today = DateTime.now().toFormat(DATE_FORMAT);
        return menus.value.find(menu => parseDate(menu.date).toFormat(DATE_FORMAT) === today);
    }

    return {
        menus,
        restaurantId,

        loadMenus,

        getCurrentDayMenu
    }
})