import {DateTime} from "luxon";

export interface FavoriteMenuItem {
  id: string;
  date: DateTime;
  restaurantId: string;
  text: string;
  userId: string;
}

export interface FavoriteMenuItemCreate {
  date: DateTime;
  text: string;
}

export interface FavoriteMenuItemUpdate {
  date: DateTime;
  text: string;
}
