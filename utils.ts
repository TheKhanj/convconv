function _is(input: string, func: (input: string) => boolean): boolean {
  if (input.length === 0) return true;
  if (input.length === 1) return func(input);
  return input.split("").every(func);
}

export function isUpperAlpha(input: string) {
  return _is(input, (input) => {
    const charCode = input.charCodeAt(0);
    const ACharCode = "A".charCodeAt(0);
    const ZCharCode = "Z".charCodeAt(0);

    return ACharCode <= charCode && charCode <= ZCharCode;
  });
}

export function isLowerAlpha(input: string) {
  return _is(input, (input) => {
    const charCode = input.charCodeAt(0);
    const aCharCode = "a".charCodeAt(0);
    const zCharCode = "z".charCodeAt(0);

    return aCharCode <= charCode && charCode <= zCharCode;
  });
}

export function isAlpha(input: string): boolean {
  return _is(input, (input) => isUpperAlpha(input) || isLowerAlpha(input));
}

export function isNum(input: string): boolean {
  return _is(input, (input: string) => {
    const charCode = input.charAt(0);
    const _0charCode = "0".charAt(0);
    const _9charCode = "9".charAt(0);

    return _0charCode <= charCode && charCode <= _9charCode;
  });
}

export function isAlphaNum(input: string): boolean {
  return _is(input, (input) => isAlpha(input) || isNum(input));
}
