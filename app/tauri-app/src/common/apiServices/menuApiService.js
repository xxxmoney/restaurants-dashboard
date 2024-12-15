import {api} from '@/axios';

export const MenuApiService = {
    getMenu(restaurantId) {
        return api.get(`/`, {params: {id: restaurantId}});
    }
}
