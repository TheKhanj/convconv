import { Camel } from "./camel";
import { Kebab } from "./kebab";
import { Snake } from "./snake";
import { Pascal } from "./pascal";
import { Adapter } from "./adapter";
import { ScreamingKebab } from "./screaming-kebab";

export type Types = "kebab" | "camel" | "pascal" | "snake" | "screamingKebab";

export interface ConvConv {
  to(type: Types): ConvConv;
  toKebab(): ConvConv;
  toCamel(): ConvConv;
  toSnake(): ConvConv;
  toString(): string;
  toPascal(): ConvConv;
  toScreamingKebab(): ConvConv;
}

export namespace ConvConv {
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

  ConvConv.prototype.to = function (this: This, type: Types): ConvConv {
    const functionName = "to" + type[0].toUpperCase() + type.slice(1);
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

  export function from(type: Types, name: string): ConvConv {
    const functionName = "from" + type[0].toUpperCase() + type.slice(1);

    return exports.ConvConv[functionName](name);
  }

  export function fromKebab(name: string): ConvConv {
    return new ConvConv(name, Kebab);
  }

  export function fromCamel(name: string): ConvConv {
    return new ConvConv(name, Camel);
  }

  export function fromSnake(name: string): ConvConv {
    return new ConvConv(name, Snake);
  }

  export function fromPascal(name: string): ConvConv {
    return new ConvConv(name, Pascal);
  }

  export function fromScreamingKebab(name: string): ConvConv {
    return new ConvConv(name, ScreamingKebab);
  }
}
