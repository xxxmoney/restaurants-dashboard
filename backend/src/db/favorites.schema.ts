import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { users } from "./auth.schema";

export const favorites = sqliteTable(
  "favorites",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    date: integer("date", { mode: "timestamp" }).notNull(),
    text: text("text").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
  },
  (table) => [index("favorites_userId_idx").on(table.userId)],
);

export const favoritesRelations = relations(favorites, ({ one }) => ({
  users: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
}));
