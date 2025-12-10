import { saveTelemetry } from "../src/db/telemetry";
import { __mockQuery } from "./__mocks__/pg";

jest.mock("pg");

describe("Telemetry DB operations", () => {
  beforeEach(() => __mockQuery.mockReset());

  test("inserts telemetry + updates device", async () => {
    __mockQuery.mockResolvedValueOnce({ rows: [] });
    __mockQuery.mockResolvedValueOnce({ rows: [] });

    await saveTelemetry("device123", { temp: 40, battery: 90 });

    expect(__mockQuery).toHaveBeenCalledTimes(2);

    expect(__mockQuery).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining("INSERT INTO telemetry"),
      ["123", 40, 90]
    );

    expect(__mockQuery).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("INSERT INTO devices"),
      ["123"]
    );
  });
});