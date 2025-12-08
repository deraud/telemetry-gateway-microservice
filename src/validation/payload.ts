import { z } from "zod";

export const telemetrySchema = z.object({
  temp: z.number(),
  battery: z.number(),
});

export type TelemetryData = z.infer<typeof telemetrySchema>;
