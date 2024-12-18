import {api} from '@/axios';

export const MenuApi = {
    getMenu(restaurantId) {
        return api.get(`/menus/${restaurantId}`);
    }
}
