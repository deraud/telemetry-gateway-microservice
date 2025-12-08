import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";

import { authenticateClient } from "./auth";
import { handleSubscriptionMessage, clientSubscriptions } from "./subscription";
import { subscribe } from "../events/bus";
import { broadcastTelemetry } from "./broadcast";

export function createWebSocketServer(httpServer: Server) {

  const wss = new WebSocketServer({
    server: httpServer,
    path: "/ws",
  });

  subscribe("telemetry", ({ deviceId, data }) => {
    broadcastTelemetry(deviceId, data);
  });

  wss.on("connection", (ws, request) => {
    if (!authenticateClient(request)) {
      ws.send(JSON.stringify({ message: "WebSocket authentication failed" }));
      ws.close();
      return;
    }

    ws.send(JSON.stringify({ message: "Authenticated WebSocket client" }));

    ws.on("message", (data) => {
      try {
        const msg = JSON.parse(data.toString());
        handleSubscriptionMessage(ws, msg);
      } catch {
        ws.send(JSON.stringify({ error: "Invalid JSON format" }));
      }
    });




    ws.on("close", () => {
      clientSubscriptions.delete(ws);
    });
  });

  return wss;
}
