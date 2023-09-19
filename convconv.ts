import { Camel } from "./camel";
import { Kebab } from "./kebab";
import { Snake } from "./snake";
import { Pascal } from "./pascal";
import { Adapter } from "./adapter";
import { ScreamingKebab } from "./screaming-kebab";

export const TYPES = [
  "kebab",
  "camel",
  "pascal",
  "snake",
  "screaming-kebab",
] as const;

export type Types = (typeof TYPES)[number];

export interface ConvConv {
  toType(type: Types): ConvConv;

  toKebab(): ConvConv;
  toCamel(): ConvConv;
  toSnake(): ConvConv;
  toPascal(): ConvConv;
  toScreamingKebab(): ConvConv;

  toString(): string;
}

type Obj = { name: string; adapter: Adapter };
type This = ConvConv & Obj;

function ConvConv(this: This, name: string, adapter: Adapter) {
  this.name = name;
  this.adapter = adapter;
}

const Adapters = {
  kebab: Kebab,
  camel: Camel,
  pascal: Pascal,
  snake: Snake,
  screamingKebab: ScreamingKebab,
};

ConvConv.prototype.toString = function (this: This) {
  return this.name;
};

ConvConv.prototype.toType = function (this: This, type: Types): ConvConv {
  const functionName = "to" + Pascal.fromKebab(type);

  return this[functionName]();
};

for (const key of Object.keys(Adapters) as (keyof typeof Adapters)[]) {
  const adapter: Adapter = Adapters[key];
  const methodName = "to" + key[0].toUpperCase() + key.slice(1);

  ConvConv.prototype[methodName] = function (this: This): ConvConv {
    this.name = adapter.fromKebab(this.adapter.toKebab(this.name));
    this.adapter = adapter;

    return this;
  };
}

export function fromType(type: Types, name: string): ConvConv {
  const functionName = "from" + Pascal.fromKebab(type);

  return exports[functionName](name);
}

export abstract class ConvConvError extends Error {}

export class ConventionViolationError extends ConvConvError {
  public constructor(type: Types, name: string) {
    super(`"${name}" is not ${type.split('-').join(' ')} case`);
  }
}

function assertType(type: Types, name: string) {
  if (!isType(type, name)) {
    throw new ConventionViolationError(type, name);
  }
}

export function fromKebab(name: string): ConvConv {
  assertType("kebab", name);
  return new ConvConv(name, Kebab);
}

export function fromCamel(name: string): ConvConv {
  assertType("camel", name);
  return new ConvConv(name, Camel);
}

export function fromSnake(name: string): ConvConv {
  assertType("snake", name);
  return new ConvConv(name, Snake);
}

export function fromPascal(name: string): ConvConv {
  assertType("pascal", name);
  return new ConvConv(name, Pascal);
}

export function fromScreamingKebab(name: string): ConvConv {
  assertType("screaming-kebab", name);
  return new ConvConv(name, ScreamingKebab);
}

export const isKebab = Kebab.isKebab;
export const isCamel = Camel.isCamel;
export const isSnake = Snake.isSnake;
export const isPascal = Pascal.isPascal;
export const isScreamingKebab = ScreamingKebab.isScreamingKebab;

export function isType(type: Types, name: string): boolean {
  const functionName = "is" + Pascal.fromKebab(type);

  return exports[functionName](name);
}

export default {
  isType,
  fromType,
  isKebab,
  fromKebab,
  isCamel,
  fromCamel,
  isSnake,
  fromSnake,
  isPascal,
  fromPascal,
  isScreamingKebab,
  fromScreamingKebab,
  ConventionViolationError: ConvConvError,
};
