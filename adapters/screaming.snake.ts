import { isNum, isUpperAlphaNum } from "../utils";

export namespace ScreamingSnake {
  export function isScreamingSnake(name: string): boolean {
    if (name.length === 0) return true;
    if (isNum(name[0])) return false;

    return name.split("_").every(isUpperAlphaNum);
  }

  export function toKebab(name: string): string {
    return name.toLowerCase().split("_").join("-");
  }

  export function fromKebab(name: string): string {
    return name.toUpperCase().split("-").join("_");
  }
}
