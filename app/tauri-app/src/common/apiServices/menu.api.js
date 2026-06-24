import {api} from '@/axios';

export const MenuApi = {
    getMenus(restaurantId) {
        return api.get(`/menus/${restaurantId}`);
    },
    getFavoriteMenuItems(restaurantId, dateFromFormatted, dateToFormatted) {
      return api.get(`/menus/${restaurantId}/favorites`, {
        params: {
          dateFrom: dateFromFormatted,
          dateTo: dateToFormatted
        }
      });
    },
    addFavoriteMenuItem(restaurantId, dateFromFormatted, text) {

    }
}
