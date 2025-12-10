import { WebSocket } from "ws";
import { AppError } from "../error/appError";
import { handleError } from "../error/errorHandler";
import { logger } from "../utils/logger";

export const clientSubscriptions = new Map<
  WebSocket,
  { type: "all" | "device"; deviceId?: string }
>();

export function handleSubscriptionMessage(ws: WebSocket, msg: any) {
  try {

    if (typeof msg !== "object" || msg === null) {
      throw new AppError(
        400,
        "INVALID_MESSAGE",
        "Subscription message must be a JSON format",
        { msg }
      );
    }

    if (msg.type === "subscribe_all") {
      clientSubscriptions.set(ws, { type: "all" });

      ws.send(
        JSON.stringify({
          status: "ok",
          message: "Subscribed to ALL devices",
        })
      );

      logger.info("Client subscribed to ALL devices");
      return;
    }

    if (msg.type === "subscribe_device") {
      if (typeof msg.device_id !== "string") {
        throw new AppError(
          400,
          "INVALID_DEVICE_ID",
          "device_id must be a string",
          { msg }
        );
      }

      clientSubscriptions.set(ws, {
        type: "device",
        deviceId: msg.device_id,
      });

      ws.send(
        JSON.stringify({
          status: "ok",
          message: "Subscribed to device ${msg.device_id}",
        })
      );

      logger.info("Client subscribed to device", { deviceId: msg.device_id });
      return;
    }

    throw new AppError(
      400,
      "UNKNOWN_SUBSCRIPTION_TYPE",
      "Unknown subscription message type",
      { msg }
    );

  } catch (err: any) {
    handleError(err, { source: "ws" });

    ws.send(
      JSON.stringify({
        status: "error",
        error: err.message || "Invalid subscription message",
      })
    );
  }
}