import {api} from '@/axios';

export const MenuApi = {
    getMenu(restaurantId) {
        return api.get(`/`, {params: {id: restaurantId}});
    }
}
