CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  last_seen_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS telemetry (
  id SERIAL,
  device_id TEXT REFERENCES devices(id),
  temp INT,
  battery INT,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  device_id TEXT REFERENCES devices(id),
  type TEXT,
  value INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

SELECT create_hypertable('telemetry', 'received_at', if_not_exists => TRUE);