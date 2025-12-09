import "dotenv/config";
import http from "http";

import { createHttpServer } from "./server/http";
import { createWebSocketServer, wss } from "./websocket/ws";
import { startMqttClient, client } from "./mqtt/mqtt";
import { startAlertProcessor } from "./alert/alert";
import { startTelemetryListener } from "./telemetry/listener";
import { setupGracefulShutdown } from "./shutdown";
import { pool } from "./db/db";



const PORT = process.env.PORT || 3000;

// Create HTTP app
const app = createHttpServer();

// WebSocket server
const httpServer = http.createServer(app);
createWebSocketServer(httpServer);

startTelemetryListener();
startAlertProcessor();

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`WebSocket listening on ws://localhost:${PORT}/ws`);
});

// MQTT Client
startMqttClient();


// ---- Graceful Shutdown ----
setupGracefulShutdown(httpServer, wss, client, pool);
