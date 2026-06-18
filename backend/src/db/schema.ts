import * as authSchema from "./auth.schema";
import * as favoritesSchema from "./favorites.schema";

export const schema = {
  ...authSchema,
  ...favoritesSchema
  // ... other application schemas
} as const;

