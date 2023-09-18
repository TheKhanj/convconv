import { isLowerAlphaNum, isNum } from "./utils";

export namespace Snake {
  export function isSnake(name: string): boolean {
    if (name.length === 0) return true;
    if (isNum(name[0])) return false;

    return name.split("_").every(isLowerAlphaNum);
  }

  export function toKebab(name: string): string {
    return name.replace(/_/g, "-");
  }

  export function fromKebab(name: string): string {
    return name.replace(/-/g, "_");
  }
}
