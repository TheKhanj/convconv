import { Kebab } from "./adapters/kebab";
import { Snake } from "./adapters/snake";
import { Camel } from "./adapters/camel";
import { Pascal } from "./adapters/pascal";
import { Convention, Is } from "./types";
import { ScreamingKebab } from "./adapters/screaming.kebab";

export const IS_OPERATIONS: Is = {
  isConvention(this: Is, convention: Convention, name: string): boolean {
    const functionName = "is" + Pascal.fromKebab(convention);

    return this[functionName](name);
  },
  isKebab: Kebab.isKebab,
  isCamel: Camel.isCamel,
  isSnake: Snake.isSnake,
  isPascal: Pascal.isPascal,
  isScreamingKebab: ScreamingKebab.isScreamingKebab,
};
