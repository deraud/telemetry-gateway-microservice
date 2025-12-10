INSERT INTO devices (id, last_seen_at)
VALUES 
  ('device123', NOW()),
  ('device234', NOW()),
  ('device345', NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO telemetry (device_id, temp, battery)
VALUES
  ('device123', 45, 90),
  ('device234', 75, 10);

INSERT INTO alerts (device_id, type, value)
VALUES
  ('device234', 'high_temperature', 75),
  ('device234', 'low_battery', 10);