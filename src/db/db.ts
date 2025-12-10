import { Pool } from "pg";
import { logger } from "../utils/logger";
import { AppError } from "../error/appError";
import { handleError } from "../error/errorHandler";

logger.info("Initializing PostgreSQL connection pool...");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,                
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
  keepAlive: true,
});

let connectedOnce = false;

pool.on("connect", () => {
  if (!connectedOnce) {
    connectedOnce = true;
    logger.info("PostgreSQL connection established");
  }
});

pool.on("error", (err) => {
  handleError(
    new AppError(500, "DATABASE_ERROR", "PostgreSQL Database error", err),
    { source: "db" }
  );
});
