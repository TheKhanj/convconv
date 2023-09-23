import { Convention } from "./types";
import { CONVENTIONS } from "./constants";
import { IS_OPERATIONS } from "./is.operations";
import { ConventionNotFoundError } from "./errors";

export function getConvention(name: string): Convention {
  const convention = CONVENTIONS.reduce(
    (prev, convention) => {
      if (prev !== null) {
        return prev;
      }
      if (IS_OPERATIONS.isConvention(convention, name)) {
        return convention;
      }
      return null;
    },
    null as null | Convention,
  );

  if (convention === null) {
    throw new ConventionNotFoundError();
  }

  return convention;
}
