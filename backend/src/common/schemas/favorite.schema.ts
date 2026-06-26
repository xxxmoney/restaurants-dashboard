import * as yup from "yup";
import {luxonDateTimeSchema} from "./luxon.schema";

export const favoriteMenuItemSchema = yup.object({
  id: yup.string().required(),
  date: luxonDateTimeSchema.required(),
  restaurantId: yup.string().required(),
  text: yup.string().required(),
  userId: yup.string().required()
});

export const favoriteMenuItemUpdateSchema = yup.object({
  date: luxonDateTimeSchema.required(),
  text: yup.string().required()
});

