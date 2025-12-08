import mqtt from "mqtt";
import { handleMqttMessage } from "./message";

export function startMqttClient() {
  const brokerUrl = process.env.MQTT_URL || "mqtt://localhost:1883";

  console.log("Connecting to MQTT broker:", brokerUrl);
  const client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("MQTT connected");

    client.subscribe("devices/+/telemetry", (err) => {
      if (err) console.error("Subscribe failed:", err);
      else console.log("Subscribed to devices/+/telemetry");
    });
  });

  client.on("message", handleMqttMessage);

  client.on("error", (err) => {
    console.error("MQTT Error:", err);
  });
}
