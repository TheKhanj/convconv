export namespace Camel {
  export function toKebab(name: string): string {
    return name
      .split("")
      .reduce((arr, char, index) => {
        if (char === char.toUpperCase()) {
          arr.push("-", char.toLowerCase());
        } else {
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
