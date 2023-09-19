import { Camel } from "./camel";
import { Kebab } from "./kebab";
import { Snake } from "./snake";
import { Pascal } from "./pascal";
import { Adapter } from "./adapter";
import { ScreamingKebab } from "./screaming-kebab";

export const CONVENTIONS = [
  "kebab",
  "camel",
  "pascal",
  "snake",
  "screaming-kebab",
] as const;

export type Convention = (typeof CONVENTIONS)[number];

export interface ConvConv {
  toConvention(convention: Convention): string;

  toKebab(): string;
  toCamel(): string;
  toSnake(): string;
  toPascal(): string;
  toScreamingKebab(): string;
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

ConvConv.prototype.toConvention = function (
  this: This,
  convention: Convention
): ConvConv {
  const functionName = "to" + Pascal.fromKebab(convention);

  return this[functionName]();
};

for (const key of Object.keys(Adapters) as (keyof typeof Adapters)[]) {
  const adapter: Adapter = Adapters[key];
  const methodName = "to" + key[0].toUpperCase() + key.slice(1);

  ConvConv.prototype[methodName] = function (this: This): string {
    return adapter.fromKebab(this.adapter.toKebab(this.name));
  };
}

export function fromConvention(convention: Convention, name: string): ConvConv {
  const functionName = "from" + Pascal.fromKebab(convention);

  return exports[functionName](name);
}

export abstract class ConvConvError extends Error {}

export class ConventionViolationError extends ConvConvError {
  public constructor(convention: Convention, name: string) {
    super(`"${name}" is not ${convention.split("-").join(" ")} case`);
  }
}

export class ConventionNotFoundError extends ConvConvError {
  public constructor() {
    super(`convention doesn't confowm with neither ${CONVENTIONS.join(", ")}`);
  }
}

function assertConvention(convention: Convention, name: string) {
  if (!isConvention(convention, name)) {
    throw new ConventionViolationError(convention, name);
  }
}

export function getConvention(name: string): Convention {
  const convention = CONVENTIONS.reduce((prev, convention) => {
    if (prev !== null) {
      return prev;
    }
    if (isConvention(convention, name)) {
      return convention;
    }
    return null;
  }, null as null | Convention);

  if (convention === null) {
    throw new ConventionNotFoundError();
  }

  return convention;
}

export function autoFrom(name: string): ConvConv {
  return fromConvention(getConvention(name), name);
}

export function fromKebab(name: string): ConvConv {
  assertConvention("kebab", name);
  return new ConvConv(name, Kebab);
}

export function fromCamel(name: string): ConvConv {
  assertConvention("camel", name);
  return new ConvConv(name, Camel);
}

export function fromSnake(name: string): ConvConv {
  assertConvention("snake", name);
  return new ConvConv(name, Snake);
}

export function fromPascal(name: string): ConvConv {
  assertConvention("pascal", name);
  return new ConvConv(name, Pascal);
}

export function fromScreamingKebab(name: string): ConvConv {
  assertConvention("screaming-kebab", name);
  return new ConvConv(name, ScreamingKebab);
}

export const isKebab = Kebab.isKebab;
export const isCamel = Camel.isCamel;
export const isSnake = Snake.isSnake;
export const isPascal = Pascal.isPascal;
export const isScreamingKebab = ScreamingKebab.isScreamingKebab;

export function isConvention(convention: Convention, name: string): boolean {
  const functionName = "is" + Pascal.fromKebab(convention);

  return exports[functionName](name);
}

export default {
  autoFrom,
  getConvention,
  isConvention,
  fromConvention,
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
  ConvConvError,
  ConventionNotFoundError,
  ConventionViolationError,
};
