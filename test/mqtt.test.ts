import { parseDeviceId } from "../src/mqtt/parser";
import { validateTelemetry } from "../src/mqtt/payload";

describe("MQTT parsing & validation", () => {
  test("extracts device ID", () => {
    const deviceId = parseDeviceId("devices/123/telemetry");
    expect(deviceId).toBe("123");
  });

  test("valid telemetry passes validation", () => {
    const valid = validateTelemetry({ temp: 55, battery: 80 });
    expect(valid.temp).toBe(55);
    expect(valid.battery).toBe(80);
  });

  test("invalid telemetry throws error", () => {
    expect(() =>
      validateTelemetry({ temp: "abc", battery: null })
    ).toThrow();
  });
});