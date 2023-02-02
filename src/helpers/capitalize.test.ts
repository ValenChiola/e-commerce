import { capitalize } from "./capitalize";

describe("capitalize tests", () => {
  it("Should capitalize the text correctly", () => {
    expect(capitalize('hello')).toBe("Hello");
  });

  it("Should capitalize the text with rare symbols correctly", () => {
    expect(capitalize('.hello how are you?')).toBe(".hello how are you?");
  });

  it("Should capitalize the phrase correctly", () => {
    expect(capitalize('hello how are you?')).toBe("Hello how are you?");
  });

  it("Should fail", () => {
    expect(capitalize('hello how are you?')).not.toBe("hello how are you?");
  });
});
