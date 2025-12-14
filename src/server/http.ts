import express, { Request, Response, NextFunction } from "express";
import { listDevices } from "../db/devicesRepo";
import { getTelemetryForDevice } from "../db/telemetryQuery";
import { AppError } from "../error/appError";
import { handleError } from "../error/errorHandler";
import { checkDeviceExists } from "../db/telemetry";

export function createHttpServer() {
  const app = express();

  app.use(express.json());

  app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.get("/devices", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const devices = await listDevices();
      res.json(devices);
    } catch (err) {
      next(err);
    }
  });

app.get("/devices/:id/telemetry", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deviceId = req.params.id;
    const limit = parseInt(req.query.limit as string) || 50;

    const deviceExists = await checkDeviceExists(deviceId);
    if (!deviceExists) {
      throw new AppError(
        404,
        "DEVICE_NOT_FOUND",
        `Device ${deviceId} not found`,
        { deviceId }
      );
    }

    const telemetry = await getTelemetryForDevice(deviceId, limit);
    res.json(telemetry);
  } catch (err) {
    next(err);
  }
});

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    handleError(err, {
      source: "http",
      meta: { method: req.method, path: req.path }
    });

    if (err instanceof AppError) {
      return res.status(err.status).json({
        error: err.code,
        message: err.message,
        details: err.details ?? null
      });
    }

    return res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong"
    });
  });

  return app;
}