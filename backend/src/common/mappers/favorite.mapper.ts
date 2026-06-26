import {Favorite} from "../../db/favorites.schema";
import {FavoriteDto} from "../dto/favorite";
import {DateTime} from "luxon";

export function mapToFavoriteDto(favorite: Favorite): FavoriteDto {
  return {
    id: favorite.id,
    date: DateTime.fromJSDate(favorite.date),
    restaurantId: favorite.restaurantId,
    text: favorite.text,
    userId: favorite.userId
  };
}

export function mapToFavorite(favorite: FavoriteDto) {
  return {
    id: favorite.id,
    date: favorite.date.toJSDate(),
    restaurantId: favorite.restaurantId,
    text: favorite.text,
    userId: favorite.userId
  }
}
