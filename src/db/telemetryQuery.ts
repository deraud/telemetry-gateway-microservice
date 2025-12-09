import { pool } from "./db";

export async function getTelemetryForDevice(deviceId: string, limit: number) {
  const result = await pool.query(
    `SELECT temp, battery, timestamp
     FROM telemetry
     WHERE device_id = $1
     ORDER BY timestamp DESC
     LIMIT $2`,
    [deviceId, limit]
  );

  return result.rows;
}
