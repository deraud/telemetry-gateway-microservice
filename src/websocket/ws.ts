import { WebSocketServer } from "ws";
import { Server } from "http";

export function createWebSocketServer(httpServer: Server) {
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  wss.on("connection", (ws) => {
    console.log("New WebSocket client connected");

    ws.send(JSON.stringify({ message: "Connected to telemetry gateway WS" }));

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });

  return wss;
}
