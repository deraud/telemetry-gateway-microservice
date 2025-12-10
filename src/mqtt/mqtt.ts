import mqtt from "mqtt";
import { logger } from "../utils/logger";
import { handleMqttMessage } from "./message";

export let client: mqtt.MqttClient;

export function startMqttClient() {
  const brokerUrl = process.env.MQTT_URL || "mqtt://localhost:1883";

  logger.info("Connecting to MQTT broker:", brokerUrl);
  client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    logger.info("MQTT connected");

    client.subscribe("devices/+/telemetry", (err) => {
      if (err) logger.error("Subscribe failed:", err);
      else logger.info("Subscribed to devices/+/telemetry");
    });
  });

  client.on("message", handleMqttMessage);

  client.on("error", (err) => {
    logger.error("MQTT Error:", err);
  });

  return client
}
