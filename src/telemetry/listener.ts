import { subscribe } from "../events/bus";
import { saveTelemetry } from "../db/telemetry";

export function startTelemetryListener() {
  subscribe("telemetry", async ({ deviceId, data }) => {
    await saveTelemetry(deviceId, data);
  });
}
