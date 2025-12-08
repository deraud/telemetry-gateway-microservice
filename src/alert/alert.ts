import { subscribe, publish } from "../events/bus";

export function startAlertProcessor() {
  subscribe("telemetry", ({ deviceId, data }) => {
    const alerts: any[] = [];

    if (data.temp > 60) {
      alerts.push({
        type: "high_temperature",
        value: data.temp,
      });
    }

    if (data.battery < 15) {
      alerts.push({
        type: "low_battery",
        value: data.battery,
      });
    }

    for (const alert of alerts) {
      publish("alert", {
        deviceId,
        alert,
        timestamp: new Date(),
      });
      console.log("Alert:", alert);
    }
  });
}
