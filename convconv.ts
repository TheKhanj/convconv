import { Camel } from "./adapters/camel";
import { Adapter, Adapters } from "./adapters/adapter";
import { ConvConv, Convention } from "./types";

export class ConvConvImpl implements ConvConv {
  public constructor(
    private readonly name: string,
    private readonly adapter: Adapter
  ) {}
  public toConvention(convention: Convention): string {
    const newAdapter = Adapters[Camel.fromKebab(convention)];
    return newAdapter.fromKebab(this.adapter.toKebab(this.name));
  }
  public toKebab(): string {
    return this.toConvention("kebab");
  }
  public toCamel(): string {
    return this.toConvention("camel");
  }
  public toSnake(): string {
    return this.toConvention("snake");
  }
  public toPascal(): string {
    return this.toConvention("pascal");
  }
  public toScreamingKebab(): string {
    return this.toConvention("screaming-kebab");
  }
}
