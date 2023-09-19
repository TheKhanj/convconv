import { isAlphaNum, isNum, isUpperAlpha } from "../utils";

export namespace Camel {
  export function isCamel(name: string): boolean {
    if (name.length === 0) return true;
    if (isUpperAlpha(name[0]) || isNum(name[0])) return false;

    return isAlphaNum(name);
  }

  export function toKebab(name: string): string {
    return name
      .split("")
      .reduce((arr, char, index) => {
        if (isUpperAlpha(char)) {
          arr.push("-", char.toLowerCase());
        } else {
          if (isNum(char) && !isNum(name[index - 1])) {
            arr.push("-");
          }
          arr.push(char);
        }

        return arr;
      }, [] as string[])
      .join("");
  }

  export function fromKebab(name: string): string {
    return name
      .split("-")
      .map((piece, index) => {
        if (piece.length === 0 || index === 0) {
          return piece;
        }

        return `${piece[0].toUpperCase()}${piece.slice(1)}`;
      })
      .join("");
  }
}
