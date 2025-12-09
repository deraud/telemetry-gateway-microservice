import { Server } from "http";
import { WebSocketServer } from "ws";
import { Pool } from "pg";
import { logger } from "./utils/logger";
import mqtt from "mqtt";

export function setupGracefulShutdown(
  httpServer: Server,
  wss: WebSocketServer,
  mqttClient: mqtt.MqttClient,
  pool: Pool
) {
  async function shutdown() {
    logger.info("Shutting down gracefully...");

    // Close HTTP 
    await new Promise<void>((resolve) => {
      httpServer.close(() => {
        logger.info("HTTP server closed.");
        resolve();
      });
    });

    // Close WebSocket 
    await new Promise<void>((resolve) => {
      wss.clients.forEach((client) => client.close());
      wss.close(() => {
        logger.info("WebSocket server closed.");
        resolve();
      });
    });

    // Close MQTT
    await new Promise<void>((resolve) => {
      mqttClient.end(true, () => {
        logger.warn("MQTT client disconnected.");
        resolve();
      });
    });

    // Close PostgreSQL pool
    await pool.end();
    logger.info("PostgreSQL pool closed.");

    logger.info("Shutdown complete.");
    process.exit(0);
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
