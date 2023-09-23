import {
  isUpperAlpha,
  isLowerAlpha,
  isAlpha,
  isNum,
  isAlphaNum,
  isLowerAlphaNum,
  isUpperAlphaNum,
} from "../utils";

describe("isUpperAlpha", () => {
  it("should return true for uppercase letters", () => {
    expect(isUpperAlpha("A")).toBe(true);
    expect(isUpperAlpha("Z")).toBe(true);
    expect(isUpperAlpha("")).toBe(true);
    expect(isUpperAlpha("TEST")).toBe(true);
  });

  it("should return false for lowercase letters and other characters", () => {
    expect(isUpperAlpha("a")).toBe(false);
    expect(isUpperAlpha("1")).toBe(false);
    expect(isUpperAlpha("Test")).toBe(false);
  });
});

describe("isLowerAlpha", () => {
  it("should return true for lowercase letters", () => {
    expect(isLowerAlpha("a")).toBe(true);
    expect(isLowerAlpha("z")).toBe(true);
    expect(isLowerAlpha("")).toBe(true);
    expect(isLowerAlpha("test")).toBe(true);
  });

  it("should return false for uppercase letters and other characters", () => {
    expect(isLowerAlpha("A")).toBe(false);
    expect(isLowerAlpha("1")).toBe(false);
    expect(isLowerAlpha("tEST")).toBe(false);
  });
});

describe("isAlpha", () => {
  it("should return true for alphabetic characters", () => {
    expect(isAlpha("A")).toBe(true);
    expect(isAlpha("z")).toBe(true);
    expect(isAlpha("")).toBe(true);
    expect(isAlpha("TeSt")).toBe(true);
  });

  it("should return false for non-alphabetic characters", () => {
    expect(isAlpha("1")).toBe(false);
    expect(isAlpha("TeSt1")).toBe(false);
  });
});

describe("isNum", () => {
  it("should return true for numeric characters", () => {
    expect(isNum("0")).toBe(true);
    expect(isNum("9")).toBe(true);
    expect(isNum("")).toBe(true);
    expect(isNum("999")).toBe(true);
  });

  it("should return false for non-numeric characters", () => {
    expect(isNum("A")).toBe(false);
  });
});

describe("isAlphaNum", () => {
  it("should return true for alphanumeric characters", () => {
    expect(isAlphaNum("A")).toBe(true);
    expect(isAlphaNum("z")).toBe(true);
    expect(isAlphaNum("0")).toBe(true);
    expect(isAlphaNum("9")).toBe(true);
    expect(isAlphaNum("")).toBe(true);
    expect(isAlphaNum("TeSt123")).toBe(true);
  });

  it("should return false for non-alphanumeric characters", () => {
    expect(isAlphaNum("#")).toBe(false);
    expect(isAlphaNum(" ")).toBe(false);
    expect(isAlphaNum("TeSt 123")).toBe(false);
  });
});

describe("isLowerAlphaNum", () => {
  it("should return true for alphanumeric characters", () => {
    expect(isLowerAlphaNum("A")).toBe(false);
    expect(isLowerAlphaNum("z")).toBe(true);
    expect(isLowerAlphaNum("0")).toBe(true);
    expect(isLowerAlphaNum("9")).toBe(true);
    expect(isLowerAlphaNum("")).toBe(true);
    expect(isLowerAlphaNum("test123")).toBe(true);
    expect(isLowerAlphaNum("TEST123")).toBe(false);
  });

  it("should return false for non-alphanumeric characters", () => {
    expect(isLowerAlphaNum("#")).toBe(false);
    expect(isLowerAlphaNum(" ")).toBe(false);
    expect(isLowerAlphaNum("test 123")).toBe(false);
  });
});

describe("isUpperAlphaNum", () => {
  it("should return true for alphanumeric characters", () => {
    expect(isUpperAlphaNum("A")).toBe(true);
    expect(isUpperAlphaNum("z")).toBe(false);
    expect(isUpperAlphaNum("0")).toBe(true);
    expect(isUpperAlphaNum("9")).toBe(true);
    expect(isUpperAlphaNum("")).toBe(true);
    expect(isUpperAlphaNum("TEST123")).toBe(true);
    expect(isUpperAlphaNum("test123")).toBe(false);
  });

  it("should return false for non-alphanumeric characters", () => {
    expect(isUpperAlphaNum("#")).toBe(false);
    expect(isUpperAlphaNum(" ")).toBe(false);
    expect(isUpperAlphaNum("TEST 123")).toBe(false);
  });
});
