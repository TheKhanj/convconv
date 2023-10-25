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

type IsFirstUpperOthersLower<S extends string> =
  S extends `${UpperChar}${infer R}` ? IsLowerCase<R> : false;

type GetNext<
  T,
  S extends string,
  R extends string = "",
> = S extends `${infer A}${infer B}`
  ? A extends S
    ? [R, S]
    : GetNext<B, `${R}${A}`>
  : [R, S];

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

type khanj = Match<"e", ["b", "a"]>;

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

type ElseFalse<T, R, K> = T extends R ? K : false;
type ElseNever<T, R, K> = T extends R ? K : never;

type Extends<T, U> = T extends U ? T : never;

type IsPascalTokens<T extends string[]> = T extends [infer Token1, ...infer O1]
  ? Token1 extends string
    ? IsUpperCase<Token1> extends true
      ? O1 extends string[]
        ? O1 extends [infer Token2, ...infer O2]
          ? Token2 extends string
            ? IsUpperCase<Token2> extends true
              ? IsPascalTokens<O1>
              : IsLowerCase<Token2> extends true
              ? O2 extends string[]
                ? O2 extends [infer Token3, ...infer O3]
                  ? Token3 extends string
                    ? IsUpperCase<Token3> extends true
                      ? IsPascalTokens<O2>
                      : IsNumbers<Token3> extends true
                      ? O3 extends string[]
                        ? IsPascalTokens<O3>
                        : never
                      : false
                    : never
                  : true
                : never
              : IsNumbers<Token2> extends true
              ? O2 extends string[]
                ? IsPascalTokens<O2>
                : never
              : false
            : never
          : true
        : never
      : false
    : never
  : true;

type IsPascal<T extends string> = IsPascalTokens<Tokenize<T, Tokens>>;

type test = IsPascal<"123">;
