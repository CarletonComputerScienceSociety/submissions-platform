import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import dotenv from "dotenv";

import * as schema from "./schema";

dotenv.config();

const sqlite = new Database(process.env.DATABASE_URL);

export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
  schema,
});
