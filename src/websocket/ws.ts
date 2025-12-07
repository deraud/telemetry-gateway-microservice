import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";

import { authenticateClient } from "./auth";
import { handleSubscriptionMessage } from "./subscription";

const clientSubscriptions = new Map<WebSocket,
  { type: "all" | "device"; deviceId?: string }
>();

export function createWebSocketServer(httpServer: Server) {

  const wss = new WebSocketServer({
    server: httpServer,
    path: "/ws",
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

export { clientSubscriptions };