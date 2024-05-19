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

export const participants = sqliteTable("participants", {
  id: integer("id").primaryKey(),
  uuid: text("uuid").notNull(),
  email: text("email").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const submissions = sqliteTable("submissions", {
  id: integer("id").primaryKey(),
  uuid: text("uuid").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey(),
  uuid: text("uuid").notNull(),
  status: text("status").notNull(),
  submissionId: integer("submission_id")
    .notNull()
    .references(() => submissions.id),
  body: text("body").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});
