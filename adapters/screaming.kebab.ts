import { isNum, isUpperAlphaNum } from "../utils";

export namespace ScreamingKebab {
  export function isScreamingKebab(name: string): boolean {
    if (name.length === 0) return true;
    if (isNum(name[0])) return false;

    return name.split("-").every(isUpperAlphaNum);
  }

  export function toKebab(name: string): string {
    return name.toLowerCase();
  }

  export function fromKebab(name: string): string {
    return name.toUpperCase();
  }
}
