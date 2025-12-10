import mqtt from "mqtt";
import { logger } from "../utils/logger";
import { handleMqttMessage } from "./message";
import { AppError } from "../error/appError";
import { handleError } from "../error/errorHandler";

export let client: mqtt.MqttClient;

export function startMqttClient() {
  const brokerUrl = process.env.MQTT_URL || "mqtt://localhost:1883";

  logger.info("Connecting to MQTT broker", { brokerUrl });

  client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    logger.info("MQTT connected");

    client.subscribe("devices/+/telemetry", (err) => {
      if (err) {
        handleError(
          new AppError(
            500,
            "MQTT_SUBSCRIBE_FAILED",
            "Failed to subscribe to telemetry",
            { err }
          ),
          { source: "mqtt" }
        );
      } else {
        logger.info("Subscribed to devices/+/telemetry");
      }
    });
  });

  client.on("message", handleMqttMessage);

  client.on("error", (err) => {
    handleError(
      new AppError(
        500,
        "MQTT_CLIENT_ERROR",
        "MQTT client encountered an error",
        { err }
      ),
      { source: "mqtt" }
    );
  });

  client.on("close", () => {
    logger.warn("MQTT connection closed unexpectedly");
  });

  client.on("reconnect", () => {
    logger.warn("MQTT client attempting reconnection…");
  });

  client.on("offline", () => {
    logger.warn("MQTT client is offline");
  });

  return client;
}