import * as ERRORS from "./errors";
import { CONVENTIONS } from "./constants";
import { IS_OPERATIONS } from "./is.operations";
import { getConvention } from "./get.convention";
import { FROM_OPERATIONS } from "./from.operations";

export { ConvConv, Convention } from "./types";

export default {
  getConvention,
  CONVENTIONS,
  ...ERRORS,
  ...IS_OPERATIONS,
  ...FROM_OPERATIONS,
};
