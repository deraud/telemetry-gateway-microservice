import { parseDeviceId } from "./parser";
import { validateTelemetry } from "./payload";
import { publish } from "../events/bus";
import { logger } from "../utils/logger";

export function handleMqttMessage(topic: string, payload: Buffer) {
  try {
    const deviceId = parseDeviceId(topic);
    const json = JSON.parse(payload.toString());
    const validated = validateTelemetry(json);

    publish("telemetry", {
      deviceId,
      data: validated,
      receivedAt: new Date(),
    });

    logger.info("Telemetry received:", validated);
  } catch (err: any) {
    logger.error("MQTT Message Error:", err.message);
  }
}
