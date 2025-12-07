import { WebSocket } from "ws";

export const clientSubscriptions = new Map<WebSocket,
  { type: "all" | "device"; deviceId?: string }
>();

export function handleSubscriptionMessage(ws: WebSocket, msg: any) {
  // Subscribe to all devices
  if (msg.type === "subscribe_all") {
    clientSubscriptions.set(ws, { type: "all" });
    ws.send(JSON.stringify({ message: "Subscribed to ALL devices" }));
    return;
  }

  // Subscribe to specific device
  if (msg.type === "subscribe_device" && typeof msg.device_id === "string") {
    clientSubscriptions.set(ws, {
      type: "device",
      deviceId: msg.device_id,
    });
    ws.send(
      JSON.stringify({
        message: `Subscribed to device ${msg.device_id}`,
      })
    );
    return;
  }

  ws.send(JSON.stringify({ error: "Unknown message type" }));
}
