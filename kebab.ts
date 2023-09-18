import { isLowerAlphaNum, isNum } from "./utils";

export namespace Kebab {
  export function isKebab(name: string): boolean {
    if (name.length == 0) return true;
    if (isNum(name[0])) return false;

    return name.split("-").every(isLowerAlphaNum);
  }

  export function toKebab(name: string): string {
    return name;
  }

  export function fromKebab(name: string): string {
    return name;
  }
}
