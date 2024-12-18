import {api} from '@/axios';

export const WebApi = {
    getWeb(restaurantId) {
        return api.get(`/webs/${restaurantId}`);
    }
}
