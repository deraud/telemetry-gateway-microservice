import { clientSubscriptions } from "../src/websocket/subscription";
import { broadcastTelemetry } from "../src/websocket/broadcast";
import { broadcastAlert } from "../src/websocket/alert";

class MockWebSocket {
  public sent: any[] = [];
  public readyState = 1; 

  send(msg: string) {
    this.sent.push(JSON.parse(msg));
  }
}

describe("WebSocket broadcasting", () => {
  let wsAll: MockWebSocket;
  let wsDevice1: MockWebSocket;
  let wsDeviceX: MockWebSocket;

  beforeEach(() => {
    clientSubscriptions.clear();

    wsAll = new MockWebSocket();
    wsDevice1 = new MockWebSocket();
    wsDeviceX = new MockWebSocket();

    clientSubscriptions.set(wsAll as any, { type: "all" });
    clientSubscriptions.set(wsDevice1 as any, {
      type: "device",
      deviceId: "123",
    });
    clientSubscriptions.set(wsDeviceX as any, {
      type: "device",
      deviceId: "234",
    });
  });

  test("broadcasts telemetry to ALL subscribers", () => {
    broadcastTelemetry("123", { temp: 80, battery: 60 });

    expect(wsAll.sent.length).toBe(1);
    expect(wsAll.sent[0]).toMatchObject({
      type: "telemetry",
      deviceId: "123",
    });
  });

  test("broadcasts telemetry to DEVICE subscribers", () => {
    broadcastTelemetry("123", { temp: 80, battery: 60 });

    expect(wsDevice1.sent.length).toBe(1);
    expect(wsDevice1.sent[0]).toMatchObject({
      type: "telemetry",
      deviceId: "123",
    });
  });

  test("does NOT send telemetry to wrong device subscribers", () => {
    broadcastTelemetry("123", { temp: 80, battery: 60 });

    expect(wsDeviceX.sent.length).toBe(0);
  });

  test("skips CLOSED websocket clients", () => {
    wsAll.readyState = 3; 

    broadcastTelemetry("123", { temp: 80, battery: 60 });

    expect(wsAll.sent.length).toBe(0);
  });

  test("broadcasts alerts only to correct subscribers", () => {
    broadcastAlert("123", { type: "high_temperature", value: 90 });

    expect(wsDevice1.sent[0]).toMatchObject({
      type: "alert",
      deviceId: "123",
      alert: { type: "high_temperature", value: 90 }
    });

    expect(wsDeviceX.sent.length).toBe(0);
  });
});