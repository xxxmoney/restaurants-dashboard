import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { users } from "./auth.schema";
import {allowedRestaurants} from "../../../shared/enums/restaurant.enum";

export const favorites = sqliteTable(
  "favorites",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    date: integer("date", { mode: "timestamp" }).notNull(),
    restaurantId: text("restaurant_id", { enum: allowedRestaurants.map(v => v.toString()) as [string, ...string[]] }).notNull(),
    text: text("text").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
  },
  (table) => [index("favorites_userId_idx").on(table.userId)],
);

export type Favorite = typeof favorites.$inferSelect

export const favoritesRelations = relations(favorites, ({ one }) => ({
  users: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
}));
