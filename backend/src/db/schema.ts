import * as authSchema from "./auth.schema";
import * as favoritesSchema from "./favorites.schema";

export const schema = {
  ...authSchema,
  ...favoritesSchema
} as const;

