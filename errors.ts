import { Convention } from "./types";
import { CONVENTIONS } from "./constants";

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
