import { Adapter } from "./adapters/adapter";
import { CONVENTIONS } from "./constants";

type Obj = { name: string; adapter: Adapter };
export type ConvConvThis = ConvConv & Obj;

export type Convention = (typeof CONVENTIONS)[number];

export interface ConvConv {
  toConvention(convention: Convention): string;
  toKebab(): string;
  toCamel(): string;
  toSnake(): string;
  toPascal(): string;
  toScreamingKebab(): string;
}

export interface From {
  autoFrom(name: string): ConvConv;
  fromConvention(convention: Convention, name: string): ConvConv;
  fromKebab(name: string): ConvConv;
  fromCamel(name: string): ConvConv;
  fromSnake(name: string): ConvConv;
  fromPascal(name: string): ConvConv;
  fromScreamingKebab(name: string): ConvConv;
}

export interface Is {
  isConvention(convention: Convention, name: string): boolean;
  isKebab(name: string): boolean;
  isCamel(name: string): boolean;
  isSnake(name: string): boolean;
  isPascal(name: string): boolean;
  isScreamingKebab(name: string): boolean;
}
