import {DateTime} from "luxon";

export interface FavoriteDto {
  id: string;
  date: DateTime;
  restaurantId: string;
  text: string;
  userId: string;
}

export interface FavoriteUpdateDto {
  date: DateTime;
  text: string;
}
