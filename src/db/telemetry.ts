import { pool } from "./db";

export async function saveTelemetry(deviceId: string, data: any) {
  await pool.query(
    `INSERT INTO devices(id, last_seen_at)
     VALUES ($1, NOW())
     ON CONFLICT (id)
     DO UPDATE SET last_seen_at = NOW()`,
    [deviceId]
  );
  await pool.query(
    `INSERT INTO telemetry (device_id, temp, battery)
     VALUES ($1, $2, $3)`,
    [deviceId, data.temp, data.battery]
  );


}
