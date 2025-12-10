INSERT INTO devices (id, last_seen_at)
VALUES 
  ('123', NOW()),
  ('234', NOW()),
  ('345', NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO telemetry (device_id, temp, battery, received_at)
VALUES
  ('123', 45, 90, NOW()),
  ('234', 75, 10, NOW() - INTERVAL '47 minutes'),
  ('234', 32, 87, NOW() - INTERVAL '12 minutes'),
  ('234', 48, 56, NOW() - INTERVAL '55 minutes'),
  ('234', 35, 92, NOW() - INTERVAL '8 minutes'),
  ('234', 41, 73, NOW() - INTERVAL '41 minutes'),
  ('234', 30, 68, NOW() - INTERVAL '19 minutes'),
  ('234', 47, 95, NOW() - INTERVAL '33 minutes'),
  ('234', 38, 61, NOW() - INTERVAL '52 minutes'),
  ('234', 44, 88, NOW() - INTERVAL '5 minutes'),
  ('234', 33, 54, NOW() - INTERVAL '28 minutes'),
  ('234', 49, 78, NOW() - INTERVAL '44 minutes'),
  ('234', 36, 99, NOW() - INTERVAL '15 minutes'),
  ('234', 42, 65, NOW() - INTERVAL '58 minutes'),
  ('234', 31, 82, NOW() - INTERVAL '3 minutes'),
  ('234', 46, 71, NOW() - INTERVAL '37 minutes'),
  ('234', 39, 58, NOW() - INTERVAL '21 minutes'),
  ('234', 43, 94, NOW() - INTERVAL '49 minutes'),
  ('234', 34, 67, NOW() - INTERVAL '11 minutes'),
  ('234', 50, 85, NOW() - INTERVAL '26 minutes'),
  ('234', 37, 53, NOW() - INTERVAL '59 minutes'),
  ('234', 45, 76, NOW() - INTERVAL '7 minutes'),
  ('234', 32, 91, NOW() - INTERVAL '42 minutes'),
  ('234', 48, 62, NOW() - INTERVAL '18 minutes'),
  ('234', 35, 89, NOW() - INTERVAL '35 minutes'),
  ('234', 41, 55, NOW() - INTERVAL '53 minutes'),
  ('234', 30, 79, NOW() - INTERVAL '1 minutes'),
  ('234', 47, 96, NOW() - INTERVAL '30 minutes'),
  ('234', 38, 64, NOW() - INTERVAL '46 minutes'),
  ('234', 44, 83, NOW() - INTERVAL '14 minutes'),
  ('234', 33, 57, NOW() - INTERVAL '39 minutes'),
  ('234', 49, 98, NOW() - INTERVAL '56 minutes'),
  ('234', 36, 69, NOW() - INTERVAL '9 minutes'),
  ('234', 42, 81, NOW() - INTERVAL '24 minutes'),
  ('234', 31, 52, NOW() - INTERVAL '50 minutes'),
  ('234', 46, 75, NOW() - INTERVAL '6 minutes'),
  ('234', 39, 93, NOW() - INTERVAL '32 minutes'),
  ('234', 43, 66, NOW() - INTERVAL '45 minutes'),
  ('234', 34, 84, NOW() - INTERVAL '17 minutes'),
  ('234', 50, 59, NOW() - INTERVAL '38 minutes'),
  ('234', 37, 77, NOW() - INTERVAL '54 minutes'),
  ('234', 45, 100, NOW() - INTERVAL '2 minutes'),
  ('234', 32, 63, NOW() - INTERVAL '27 minutes'),
  ('234', 48, 86, NOW() - INTERVAL '43 minutes'),
  ('234', 35, 51, NOW() - INTERVAL '13 minutes'),
  ('234', 41, 72, NOW() - INTERVAL '36 minutes'),
  ('234', 30, 97, NOW() - INTERVAL '60 minutes'),
  ('234', 47, 60, NOW() - INTERVAL '10 minutes'),
  ('234', 38, 80, NOW() - INTERVAL '25 minutes'),
  ('234', 44, 54, NOW() - INTERVAL '48 minutes'),
  ('234', 33, 74, NOW() - INTERVAL '4 minutes'),
  ('234', 49, 90, NOW() - INTERVAL '31 minutes'),
  ('234', 36, 58, NOW() - INTERVAL '51 minutes'),
  ('234', 42, 87, NOW() - INTERVAL '16 minutes'),
  ('234', 31, 65, NOW() - INTERVAL '40 minutes'),
  ('234', 46, 99, NOW() - INTERVAL '57 minutes'),
  ('234', 39, 70, NOW() - INTERVAL '20 minutes'),
  ('234', 43, 55, NOW() - INTERVAL '34 minutes'),
  ('234', 34, 88, NOW() - INTERVAL '22 minutes'),
  ('234', 50, 62, NOW() - INTERVAL '29 minutes');

INSERT INTO alerts (device_id, type, value)
VALUES
  ('234', 'high_temperature', 75),
  ('234', 'low_battery', 10);


  