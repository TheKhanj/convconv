export namespace ScreamingKebab {
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
