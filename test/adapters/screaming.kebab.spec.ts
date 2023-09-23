import { ScreamingKebab } from "../../adapters/screaming.kebab";

describe("screaming kebab", () => {
  it("isScreamingKebab", () => {
    expect(ScreamingKebab.isScreamingKebab("SCREAMING-123")).toBe(true);
    expect(ScreamingKebab.isScreamingKebab("SCREAMING123")).toBe(false);
  });
});
