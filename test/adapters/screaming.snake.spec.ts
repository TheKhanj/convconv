import { ScreamingSnake } from "../../adapters/screaming.snake";

describe("screaming snake", () => {
  it("isScreamingSnake", () => {
    expect(ScreamingSnake.isScreamingSnake("SCREAMING_123")).toBe(true);
    expect(ScreamingSnake.isScreamingSnake("SCREAMING123")).toBe(false);
  });
});
