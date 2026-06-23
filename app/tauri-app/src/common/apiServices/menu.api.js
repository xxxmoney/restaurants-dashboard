import {api} from '@/axios';

export const MenuApi = {
    getMenus(restaurantId) {
        return api.get(`/menus/${restaurantId}`);
    },
    getFavoriteMenuItems(restaurantId, dateFrom, dateTo) {
      return api.get(`/menus/${restaurantId}/favorites`, {
        params: {
          dateFrom,
          dateTo
        }
      });
    }
}
