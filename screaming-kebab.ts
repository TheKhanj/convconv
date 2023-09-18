import { isNum, isUpperAlphaNum } from "./utils";

export namespace ScreamingKebab {
  export function isScreamingKebab(name: string): boolean {
    if (name.length === 0) return true;
    if (isNum(name[0])) return false;

    return name.split("_").every(isUpperAlphaNum);
  }

  export function toKebab(name: string): string {
    return name
      .toLowerCase()
      .split("")
      .map((char) => (char === "_" ? "-" : char))
      .join("");
  }

  export function fromKebab(name: string): string {
    return name
      .toUpperCase()
      .split("")
      .map((char) => (char === "-" ? "_" : char))
      .join("");
  }
}
