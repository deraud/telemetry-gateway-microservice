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

export async function checkDeviceExists(deviceId: string): Promise<boolean> {
  const result = await pool.query(
    'SELECT 1 FROM devices WHERE id = $1 LIMIT 1',
    [deviceId]
  );
  return result.rows.length > 0;
}
