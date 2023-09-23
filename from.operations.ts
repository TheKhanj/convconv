import { Camel } from "./adapters/camel";
import { Adapters } from "./adapters/adapter";
import { ConvConvImpl } from "./convconv";
import { IS_OPERATIONS } from "./is.operations";
import { getConvention } from "./get.convention";
import { ConventionViolationError } from "./errors";
import { ConvConv, Convention, From } from "./types";

function assertConvention(convention: Convention, name: string) {
  if (!IS_OPERATIONS.isConvention(convention, name)) {
    throw new ConventionViolationError(convention, name);
  }
}

export const FROM_OPERATIONS: From = {
  autoFrom(this: From, name: string): ConvConv {
    return this.fromConvention(getConvention(name), name);
  },
  fromConvention(this: From, convention: Convention, name: string): ConvConv {
    assertConvention(convention, name);

    const adapter = Adapters[Camel.fromKebab(convention)];

    return new ConvConvImpl(name, adapter);
  },
  fromKebab(this: From, name: string): ConvConv {
    return this.fromConvention("kebab", name);
  },
  fromCamel(this: From, name: string): ConvConv {
    return this.fromConvention("camel", name);
  },
  fromSnake(this: From, name: string): ConvConv {
    return this.fromConvention("snake", name);
  },
  fromPascal(this: From, name: string): ConvConv {
    return this.fromConvention("pascal", name);
  },
  fromScreamingKebab(this: From, name: string): ConvConv {
    return this.fromConvention("screaming-kebab", name);
  },
  fromScreamingSnake(this: From, name: string): ConvConv {
    return this.fromConvention("screaming-snake", name);
  },
};
