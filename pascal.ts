import { isAlphaNum, isLowerAlpha, isNum, isUpperAlpha } from "./utils";

export namespace Pascal {
  export function isPascal(name: string): boolean {
    if (name.length === 0) return true;
    if (isLowerAlpha(name[0]) || isNum(name[0])) return false;

    return isAlphaNum(name);
  }

  export function toKebab(name: string): string {
    return name
      .split("")
      .reduce((arr, char, index) => {
        if (isUpperAlpha(char)) {
          if (index !== 0) {
            arr.push("-");
          }
          arr.push(char.toLowerCase());
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
      .map((piece) => {
        if (piece.length === 0) {
          return piece;
        }

        return `${piece[0].toUpperCase()}${piece.slice(1)}`;
      })
      .join("");
  }
}
