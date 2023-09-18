export interface Adapter {
  toKebab(name: string): string;
  fromKebab(name: string): string;
}
