import { pool } from "./db";

export async function saveAlert(deviceId: string, alert: any) {
  await pool.query(
    `INSERT INTO alerts (device_id, type, value)
     VALUES ($1, $2, $3)`,
    [deviceId, alert.type, alert.value]
  );
}
