import { Pool } from "pg";
import { logger } from "../utils/logger";

console.log("Initializing PostgreSQL connection pool...");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
  keepAlive: true,
});

pool.on("connect", () => {
  logger.info("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  logger.info("PostgreSQL error:", err);
});
