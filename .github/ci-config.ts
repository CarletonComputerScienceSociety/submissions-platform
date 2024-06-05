import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "sqlite",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
} as Config;
