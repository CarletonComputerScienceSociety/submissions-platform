import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const challenges = sqliteTable("challenges", {
  id: integer("id").primaryKey(),
  title: text("title"),
  body: text("body"),
  points: integer("points"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});
