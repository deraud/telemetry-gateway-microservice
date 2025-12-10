INSERT INTO devices (id, last_seen_at)
VALUES 
  ('device123', NOW()),
  ('device234', NOW()),
  ('device345', NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO telemetry (device_id, temp, battery, received_at)
VALUES
  ('device123', 45, 90, NOW()),
  ('device234', 75, 10, NOW() - INTERVAL '47 minutes'),
  ('device234', 32, 87, NOW() - INTERVAL '12 minutes'),
  ('device234', 48, 56, NOW() - INTERVAL '55 minutes'),
  ('device234', 35, 92, NOW() - INTERVAL '8 minutes'),
  ('device234', 41, 73, NOW() - INTERVAL '41 minutes'),
  ('device234', 30, 68, NOW() - INTERVAL '19 minutes'),
  ('device234', 47, 95, NOW() - INTERVAL '33 minutes'),
  ('device234', 38, 61, NOW() - INTERVAL '52 minutes'),
  ('device234', 44, 88, NOW() - INTERVAL '5 minutes'),
  ('device234', 33, 54, NOW() - INTERVAL '28 minutes'),
  ('device234', 49, 78, NOW() - INTERVAL '44 minutes'),
  ('device234', 36, 99, NOW() - INTERVAL '15 minutes'),
  ('device234', 42, 65, NOW() - INTERVAL '58 minutes'),
  ('device234', 31, 82, NOW() - INTERVAL '3 minutes'),
  ('device234', 46, 71, NOW() - INTERVAL '37 minutes'),
  ('device234', 39, 58, NOW() - INTERVAL '21 minutes'),
  ('device234', 43, 94, NOW() - INTERVAL '49 minutes'),
  ('device234', 34, 67, NOW() - INTERVAL '11 minutes'),
  ('device234', 50, 85, NOW() - INTERVAL '26 minutes'),
  ('device234', 37, 53, NOW() - INTERVAL '59 minutes'),
  ('device234', 45, 76, NOW() - INTERVAL '7 minutes'),
  ('device234', 32, 91, NOW() - INTERVAL '42 minutes'),
  ('device234', 48, 62, NOW() - INTERVAL '18 minutes'),
  ('device234', 35, 89, NOW() - INTERVAL '35 minutes'),
  ('device234', 41, 55, NOW() - INTERVAL '53 minutes'),
  ('device234', 30, 79, NOW() - INTERVAL '1 minutes'),
  ('device234', 47, 96, NOW() - INTERVAL '30 minutes'),
  ('device234', 38, 64, NOW() - INTERVAL '46 minutes'),
  ('device234', 44, 83, NOW() - INTERVAL '14 minutes'),
  ('device234', 33, 57, NOW() - INTERVAL '39 minutes'),
  ('device234', 49, 98, NOW() - INTERVAL '56 minutes'),
  ('device234', 36, 69, NOW() - INTERVAL '9 minutes'),
  ('device234', 42, 81, NOW() - INTERVAL '24 minutes'),
  ('device234', 31, 52, NOW() - INTERVAL '50 minutes'),
  ('device234', 46, 75, NOW() - INTERVAL '6 minutes'),
  ('device234', 39, 93, NOW() - INTERVAL '32 minutes'),
  ('device234', 43, 66, NOW() - INTERVAL '45 minutes'),
  ('device234', 34, 84, NOW() - INTERVAL '17 minutes'),
  ('device234', 50, 59, NOW() - INTERVAL '38 minutes'),
  ('device234', 37, 77, NOW() - INTERVAL '54 minutes'),
  ('device234', 45, 100, NOW() - INTERVAL '2 minutes'),
  ('device234', 32, 63, NOW() - INTERVAL '27 minutes'),
  ('device234', 48, 86, NOW() - INTERVAL '43 minutes'),
  ('device234', 35, 51, NOW() - INTERVAL '13 minutes'),
  ('device234', 41, 72, NOW() - INTERVAL '36 minutes'),
  ('device234', 30, 97, NOW() - INTERVAL '60 minutes'),
  ('device234', 47, 60, NOW() - INTERVAL '10 minutes'),
  ('device234', 38, 80, NOW() - INTERVAL '25 minutes'),
  ('device234', 44, 54, NOW() - INTERVAL '48 minutes'),
  ('device234', 33, 74, NOW() - INTERVAL '4 minutes'),
  ('device234', 49, 90, NOW() - INTERVAL '31 minutes'),
  ('device234', 36, 58, NOW() - INTERVAL '51 minutes'),
  ('device234', 42, 87, NOW() - INTERVAL '16 minutes'),
  ('device234', 31, 65, NOW() - INTERVAL '40 minutes'),
  ('device234', 46, 99, NOW() - INTERVAL '57 minutes'),
  ('device234', 39, 70, NOW() - INTERVAL '20 minutes'),
  ('device234', 43, 55, NOW() - INTERVAL '34 minutes'),
  ('device234', 34, 88, NOW() - INTERVAL '22 minutes'),
  ('device234', 50, 62, NOW() - INTERVAL '29 minutes');

INSERT INTO alerts (device_id, type, value)
VALUES
  ('device234', 'high_temperature', 75),
  ('device234', 'low_battery', 10);


  