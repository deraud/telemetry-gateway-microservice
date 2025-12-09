import express, { Request, Response } from "express";
import { listDevices } from "../db/devicesRepo";
import { getTelemetryForDevice } from "../db/telemetryQuery";
import { logger } from "../utils/logger";

export function createHttpServer() {
  const app = express();

  app.use(express.json());

  // GET /health
  app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // GET /devices
  app.get("/devices", async (req: Request, res: Response) => {
    try {
      const devices = await listDevices();
      res.json(devices);
    } catch (err) {
      logger.error("Error fetching devices:", err);
      res.status(500).json({ error: "Failed to fetch devices" });
    }
  });

  // GET /devices/:id/telemetry?limit=50
  app.get("/devices/:id/telemetry", async (req: Request, res: Response) => {
    try {
      const deviceId = req.params.id;
      const limit = parseInt(req.query.limit as string) || 50;

      const telemetry = await getTelemetryForDevice(deviceId!, limit);
      res.json(telemetry);
    } catch (err) {
      logger.error("Error fetching telemetry:", err);
      res.status(500).json({ error: "Failed to fetch telemetry" });
    }
  });

  return app;
}
