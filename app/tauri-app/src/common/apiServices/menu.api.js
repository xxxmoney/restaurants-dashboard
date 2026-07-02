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
    addFavoriteMenuItem(restaurantId, dateFormatted, text) {
      return api.post(`/menus/${restaurantId}/favorites`, {
        date: dateFormatted,
        text: text
      });
    },
    deleteFavoriteMenuItem(restaurantId, dateFormatted, text) {
      return api.delete(`/menus/${restaurantId}/favorites}`, {
        data: {
          date: dateFormatted,
          text: text
        }
      });
    }
}
