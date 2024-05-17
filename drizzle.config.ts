import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "sqlite",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./db/dev.db",
  },
  verbose: true,
  strict: true,
} as Config;
