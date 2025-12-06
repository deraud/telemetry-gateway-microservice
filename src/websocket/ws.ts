import { WebSocketServer } from "ws";
import { Server } from "http";

export function createWebSocketServer(httpServer: Server) {
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  wss.on("connection", (ws, request) => {
    const url = new URL(request.url!, `http://${request.headers.host}`);
    const apiKey = url.searchParams.get("api_key");
    console.log(url.toString());
    if (apiKey !== process.env.API_KEY) {
      console.log("WebSocket authentication failed");

      ws.send(JSON.stringify({ message: "WebSocket authentication failed" }));

      ws.close();
      return;
    }

    console.log("WebSocket authentication successful");

    ws.send(JSON.stringify({ message: "Authenticated WebSocket client" }));

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });

  return wss;
}
