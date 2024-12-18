import {api} from '@/axios';

export const MenuApi = {
    getMenus(restaurantId) {
        return api.get(`/menus/${restaurantId}`);
    }
}
