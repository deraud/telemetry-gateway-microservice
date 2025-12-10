import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";

import { authenticateClient } from "./auth";
import { handleSubscriptionMessage, clientSubscriptions } from "./subscription";
import { subscribe } from "../events/bus";
import { broadcastTelemetry } from "./broadcast";
import { broadcastAlert } from "./alert";

import { AppError } from "../error/appError";
import { handleError } from "../error/errorHandler";
import { logger } from "../utils/logger";

export let wss: WebSocketServer;

export function createWebSocketServer(httpServer: Server) {
  logger.info("Initializing WebSocket server...");

  wss = new WebSocketServer({
    server: httpServer,
    path: "/ws",
  });

  subscribe("telemetry", ({ deviceId, data }) => {
    try {
      broadcastTelemetry(deviceId, data);
    } catch (err) {
      handleError(err, { source: "ws" });
    }
  });

  subscribe("alert", ({ deviceId, alert }) => {
    try {
      broadcastAlert(deviceId, alert);
    } catch (err) {
      handleError(err, { source: "ws" });
    }
  });

  // 🔌 New WebSocket connection
  wss.on("connection", (ws: WebSocket, req) => {
    try {
      // 🎫 Authenticate WS client
      if (!authenticateClient(req)) {
        const error = new AppError(401, "WS_AUTH_FAILED", "Invalid WebSocket API Key");
        ws.send(JSON.stringify({ status: "error", error: error.message }));
        ws.close();
        return;
      }

      logger.info("WebSocket client connected", {
        client: req.socket.remoteAddress,
      });

      ws.send(JSON.stringify({ status: "ok", message: "Authenticated WebSocket client" }));

      // 📩 Handle WebSocket messages
      ws.on("message", (raw) => {
        try {
          let msg: any;

          try {
            msg = JSON.parse(raw.toString());
          } catch {
            throw new AppError(400, "INVALID_JSON", "Message must be valid JSON");
          }

          handleSubscriptionMessage(ws, msg);
        } catch (err) {
          handleError(err, { source: "ws" });

          ws.send(
            JSON.stringify({
              status: "error",
              error: "ws",
            })
          );
        }
      });

      ws.on("close", () => {
        clientSubscriptions.delete(ws);
        logger.info("WebSocket client disconnected");
      });

      ws.on("error", (err) => {
        handleError(err, { source: "ws" });
      });

    } catch (err) {
      handleError(err, { source: "ws" });
    }
  });

  logger.info("WebSocket server initialized");

  return wss;
}