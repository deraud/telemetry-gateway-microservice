telemetry-gateway-microservice is a TypeScript microservice that ingests sensor telemetry via MQTT and exposes real-time data to dashboards via WebSocket, REST APIs, Docker, and PostgreSQL/TimescaleDB

The microservice obtains telemetry data (temperature and bettery) from devices and stores them in a database. Additionally, alert conditions are evaluated automatically.

Features:
Subscribes to specific device/ all devices via WebSocket (with API key):
```
{
    "type": "subscribe_all"
}
```
or
```
{
    "type": "subscribe_device",
    "device_id": "device1"
}
```
Any payload received towards subscribed devices will be received by WebSocket.
To send test payload:
```
  docker exec -it mqtt_broker sh
```
then
```
  mosquitto_pub -t devices/:id/telemetry -m '{"temp": 55,"battery": 90}'
```
replace ```id``` with existing device id (e.g., 123)
Payload and Alerts are validated with Zod.

RESTAPIs features
```
  GET /health
  GET /devices
  GET /devices/:id/telemetry?limit=50
```
Database and seeding by Docker initialization with TimescaleDB feature
```
  docker compose up --build
```
Unit and mock testings are done with JEST
ADDITIONAL: Some TimescaleDB to analyze seedings:
```
SELECT
  time_bucket('1 minute', received_at) AS bucket,
  device_id,
  avg(temp) AS avg_temp
FROM telemetry
GROUP BY bucket, device_id
ORDER BY bucket DESC;

SELECT
  time_bucket('1 minute', received_at) AS bucket,
  count(*) AS messages
FROM telemetry
GROUP BY bucket
ORDER BY bucket DESC;

SELECT
  device_id,
  time_bucket('5 minutes', received_at) AS bucket,
  avg(battery) AS avg_battery
FROM telemetry
GROUP BY bucket, device_id
ORDER BY bucket DESC;
```

