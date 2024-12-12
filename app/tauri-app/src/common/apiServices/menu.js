import { api } from '@/axios';

export const MenuService = {
    getMenu(restaurantId) {
        return api.get(`/:id`, { params: { restaurantId } });
    }
}
