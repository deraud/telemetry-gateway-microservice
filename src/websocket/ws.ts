import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";



const clientSubscriptions = new Map< WebSocket,
  { type: "all" | "device"; deviceId?: string }
>();

export function createWebSocketServer(httpServer: Server) {

  const wss = new WebSocketServer({
    server: httpServer,
    path: "/ws",
  });

  wss.on("connection", (ws, request) => {
    const url = new URL(request.url!, `http://${request.headers.host}`);
    const apiKey = url.searchParams.get("api_key");

    // Authentication
    if (apiKey !== process.env.API_KEY) {
      ws.send(JSON.stringify({ message: "WebSocket authentication failed" }));
      ws.close();
      return;
    }

    ws.send(JSON.stringify({ message: "Authenticated WebSocket client" }));

    // Handling subscription messages
    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());

        // Subscribe to all devices
        if (message.type === "subscribe_all") {
          clientSubscriptions.set(ws, { type: "all" });
          ws.send(JSON.stringify({ message: "Subscribed to all devices" }));
          return;
        }

        // Subscribe to specific device
        if (message.type === "subscribe_device") {
          clientSubscriptions.set(ws, {
            type: "device",
            deviceId: message.device_id,
          });
          ws.send(
            JSON.stringify({
              message: `Subscribed to device ${message.device_id}`,
            })
          );
          return;
        }

        ws.send(JSON.stringify({ error: "Error Message Type" }));
      } catch (err) {
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