import { Camel } from "./camel";
import { Kebab } from "./kebab";
import { Snake } from "./snake";
import { Pascal } from "./pascal";
import { ScreamingKebab } from "./screaming.kebab";

export interface Adapter {
  toKebab(name: string): string;
  fromKebab(name: string): string;
}

export const Adapters: { [key: string]: Adapter } = {
  kebab: Kebab,
  camel: Camel,
  pascal: Pascal,
  snake: Snake,
  screamingKebab: ScreamingKebab,
};
