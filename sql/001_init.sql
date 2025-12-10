CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  last_seen_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS telemetry (
  id SERIAL PRIMARY KEY,
  device_id TEXT REFERENCES devices(id),
  temp NUMERIC,
  battery NUMERIC,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  device_id TEXT REFERENCES devices(id),
  type TEXT,
  value NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);