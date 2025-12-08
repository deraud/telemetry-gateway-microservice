import { WebSocket } from "ws";
import { clientSubscriptions } from "./subscription";

export function broadcastTelemetry(deviceId: string, data: any) {
  for (const [ws, sub] of clientSubscriptions.entries()) {

    if (ws.readyState !== WebSocket.OPEN) continue;

    if (sub.type === "all") {
      ws.send(JSON.stringify({ type: "telemetry", deviceId, data }));
      continue;
    }

    if (sub.type === "device" && sub.deviceId === deviceId) {
      ws.send(JSON.stringify({ type: "telemetry", deviceId, data }));
    }
  }
}
