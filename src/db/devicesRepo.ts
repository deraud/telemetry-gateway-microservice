import { pool } from "./db";

export async function listDevices() {
  const result = await pool.query(
    "SELECT id, last_seen_at FROM devices ORDER BY last_seen_at DESC"
  );

  return result.rows; 
}
