import { telemetrySchema } from "../validation/payload";

export function validateTelemetry(json: any) {
  return telemetrySchema.parse(json);
}
