type LowerChar =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";
type UpperChar =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";
type Num = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type IsAll<
  P,
  S extends string,
  T extends any[] = [],
> = S extends `${infer A}${infer B}`
  ? A extends P
    ? IsAll<P, B, [...T, any]>
    : false
  : true;

type IsLowerCase<S extends string> = IsAll<LowerChar, S>;
type IsUpperCase<S extends string> = IsAll<UpperChar, S>;
type IsNumbers<S extends string> = IsAll<Num, S>;

type Match<S extends string, G extends string[]> = G extends [
  infer A,
  ...infer B,
]
  ? S extends A
    ? A
    : B extends string[]
    ? Match<S, B>
    : never
  : never;

type ReverseArr<A extends string[]> = A extends [infer A, ...infer B]
  ? B extends string[]
    ? [...ReverseArr<B>, A]
    : never
  : A;

type Tokenize<
  T,
  S extends string[],
  Matches extends string[] = [],
> = T extends `${infer A}${infer B}`
  ? Match<A, S> extends string
    ? Matches extends [infer LastMatch, ...infer RestMatches]
      ? LastMatch extends string
        ? LastMatch extends `${infer LastMatchFirstChar}${infer LastMatchOthers}`
          ? LastMatchFirstChar extends Match<A, S>
            ? RestMatches extends string[]
              ? Tokenize<B, S, [`${LastMatch}${A}`, ...RestMatches]>
              : never
            : Tokenize<B, S, [A, ...Matches]>
          : never
        : never
      : Tokenize<B, S, [A]>
    : never
  : ReverseArr<Matches>;

type Tokens = ["-", "_", UpperChar, LowerChar, Num];

type ElseFalse<T, K> = T extends true ? K : false;

type Or<T extends boolean[]> = T extends [infer A, ...infer O]
  ? A extends true
    ? true
    : O extends boolean[]
    ? Or<O>
    : never
  : false;

type IsPascalTokens<T extends string[], N extends number = 0> = T extends [
  infer FirstToken,
  ...infer OtherTokens,
]
  ? FirstToken extends string
    ? OtherTokens extends string[]
      ? N extends 0
        ? ElseFalse<
            IsUpperCase<FirstToken>,
            Or<[IsPascalTokens<OtherTokens, 1>, IsPascalTokens<OtherTokens, 2>]>
          >
        : N extends 1
        ? ElseFalse<
            IsLowerCase<FirstToken>,
            Or<[IsPascalTokens<OtherTokens, 2>, IsPascalTokens<OtherTokens, 0>]>
          >
        : N extends 2
        ? ElseFalse<IsNumbers<FirstToken>, IsPascalTokens<OtherTokens, 0>>
        : never
      : never
    : never
  : true;

type IsCamelTokens<T extends string[], N extends number = 0> = T extends [
  infer FirstToken,
  ...infer OtherTokens,
]
  ? FirstToken extends string
    ? OtherTokens extends string[]
      ? N extends 0
        ? ElseFalse<
            IsLowerCase<FirstToken>,
            Or<[IsCamelTokens<OtherTokens, 1>, IsCamelTokens<OtherTokens, 2>]>
          >
        : N extends 1
        ? ElseFalse<IsNumbers<FirstToken>, IsCamelTokens<OtherTokens, 2>>
        : N extends 2
        ? ElseFalse<
            IsUpperCase<FirstToken>,
            Or<[IsCamelTokens<OtherTokens, 0>, IsCamelTokens<OtherTokens, 1>]>
          >
        : never
      : never
    : never
  : true;

type IsPascalCase<T extends string> = IsPascalTokens<Tokenize<T, Tokens>>;
type IsCamelCase<T extends string> = IsCamelTokens<Tokenize<T, Tokens>>;
