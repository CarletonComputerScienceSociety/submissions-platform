import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const challenges = sqliteTable("challenges", {
  id: integer("id").primaryKey(),
  uuid: text("uuid").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  points: integer("points").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});
