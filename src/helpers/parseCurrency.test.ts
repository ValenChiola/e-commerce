import { parseCurrency } from "./parseCurrency";

describe("parseCurrency tests", () => {
  it("Should convert the currency correctly", () => {
    expect(parseCurrency(22.3)).toBe("$22.30");
  });

  it("Should fail", () => {
    expect(parseCurrency(22.3)).not.toBe("$22,30");
  });
});
