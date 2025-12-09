import { Server } from "http";
import { WebSocketServer } from "ws";
import { Pool } from "pg";
import mqtt from "mqtt";

export function setupGracefulShutdown(
  httpServer: Server,
  wss: WebSocketServer,
  mqttClient: mqtt.MqttClient,
  pool: Pool
) {
  async function shutdown() {
    console.log("Shutting down gracefully...");

    // Close HTTP 
    await new Promise<void>((resolve) => {
      httpServer.close(() => {
        console.log("HTTP server closed.");
        resolve();
      });
    });

    // Close WebSocket 
    await new Promise<void>((resolve) => {
      wss.clients.forEach((client) => client.close());
      wss.close(() => {
        console.log("WebSocket server closed.");
        resolve();
      });
    });

    // Close MQTT
    await new Promise<void>((resolve) => {
      mqttClient.end(true, () => {
        console.log("MQTT client disconnected.");
        resolve();
      });
    });

    // Close PostgreSQL pool
    await pool.end();
    console.log("PostgreSQL pool closed.");

    console.log("Shutdown complete.");
    process.exit(0);
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
