export namespace Snake {
  export function toKebab(name: string): string {
    return name.replace(/_/g, "-");
  }

  export function fromKebab(name: string): string {
    return name.replace(/-/g, "_");
  }
}
