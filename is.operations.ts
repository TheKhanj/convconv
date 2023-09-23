import { Kebab } from "./adapters/kebab";
import { Snake } from "./adapters/snake";
import { Camel } from "./adapters/camel";
import { Pascal } from "./adapters/pascal";
import { Convention, Is } from "./types";
import { ScreamingKebab } from "./adapters/screaming.kebab";
import { ScreamingSnake } from "./adapters/screaming.snake";

export const IS_OPERATIONS: Is = {
  isConvention(this: Is, convention: Convention, name: string): boolean {
    type MethodName = Exclude<keyof Is, "isConvention">;
    const methodName = ("is" + Pascal.fromKebab(convention)) as MethodName;

    return this[methodName](name);
  },
  isKebab: Kebab.isKebab,
  isCamel: Camel.isCamel,
  isSnake: Snake.isSnake,
  isPascal: Pascal.isPascal,
  isScreamingKebab: ScreamingKebab.isScreamingKebab,
  isScreamingSnake: ScreamingSnake.isScreamingSnake,
};
