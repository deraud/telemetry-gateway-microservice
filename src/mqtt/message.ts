import { parseDeviceId } from "./parser";
import { validateTelemetry } from "./payload";
import { publish } from "../events/bus";
import { logger } from "../utils/logger";
import { AppError } from "../error/appError";
import { handleError } from "../error/errorHandler";

export function handleMqttMessage(topic: string, payload: Buffer) {
  try {
    const raw = payload.toString();

    let deviceId: string;
    let json: any;
    let validated: any;

    try {
      deviceId = parseDeviceId(topic);
    } catch (err: any) {
      throw new AppError(
        400,
        "INVALID",
        "Expected devices/<id>/telemetry",
        { topic, raw, err }
      );
    }

    try {
      json = JSON.parse(raw);
    } catch (err: any) {
      throw new AppError(
        400,
        "INVALID_JSON",
        "Payload is not valid JSON format",
        { topic, raw, err }
      );
    }

    try {
      validated = validateTelemetry(json);
    } catch (err: any) {
      throw new AppError(
        400,
        "INVALID_TELEMETRY_SCHEMA",
        "Telemetry payload failed validation",
        { topic, raw, json, err }
      );
    }

    publish("telemetry", {
      deviceId,
      data: validated,
      receivedAt: new Date(),
    });

    logger.info("Telemetry received", { deviceId, validated });
  } catch (err: any) {
    handleError(
      err instanceof AppError
        ? err
        : new AppError(
            500,
            "MQTT_HANDLER_ERROR",
            "Error while handling MQTT",
            { topic, payload: payload.toString(), err }
          ),
      { source: "mqtt" }
    );
  }
}
