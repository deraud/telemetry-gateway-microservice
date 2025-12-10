import { startAlertProcessor } from "../src/alert/alert";
import { publish } from "../src/events/bus";
import { saveAlert } from "../src/db/alert";

jest.mock("../src/events/bus", () => ({
  publish: jest.fn(),
  subscribe: (eventName: string, handler: any) => {
    mockSubscribers[eventName] = handler;
  }
}));

jest.mock("../src/db/alert", () => ({
  saveAlert: jest.fn().mockResolvedValue(undefined)
}));

const mockSubscribers: Record<string, Function> = {};

function emitTelemetry(payload: any) {
  mockSubscribers["telemetry"](payload);
}

describe("Alert processor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSubscribers.telemetry = undefined as any;
    startAlertProcessor();
  });

  test("HIGH TEMPERATURE alert higher than 15", async () => {
    emitTelemetry({
      deviceId: "d1",
      data: { temp: 90, battery: 80 }
    });

    expect(publish).toHaveBeenCalledWith("alert", {
      deviceId: "d1",
      alert: { type: "high_temperature", value: 90 }
    });

    expect(saveAlert).toHaveBeenCalledWith("d1", {
      type: "high_temperature",
      value: 90
    });
  });

  test("LOW BATTERY alert lower than 15", async () => {
    emitTelemetry({
      deviceId: "d2",
      data: { temp: 40, battery: 10 }
    });

    expect(publish).toHaveBeenCalledWith("alert", {
      deviceId: "d2",
      alert: { type: "low_battery", value: 10 }
    });

    expect(saveAlert).toHaveBeenCalledWith("d2", {
      type: "low_battery",
      value: 10
    });
  });

  test("Both conditions triggered (Low Battery, High temperature)", async () => {
    emitTelemetry({
      deviceId: "d3",
      data: { temp: 120, battery: 5 }
    });

    expect(publish).toHaveBeenCalledWith("alert", {
      deviceId: "d3",
      alert: { type: "high_temperature", value: 120 }
    });

    expect(publish).toHaveBeenCalledWith("alert", {
      deviceId: "d3",
      alert: { type: "low_battery", value: 5 }
    });

    expect(saveAlert).toHaveBeenCalledTimes(2);
  });

  test("NO alert for values withing safe boundary", async () => {
    emitTelemetry({
      deviceId: "d4",
      data: { temp: 45, battery: 90 }
    });

    expect(publish).not.toHaveBeenCalled();
    expect(saveAlert).not.toHaveBeenCalled();
  });
});