import convconv, { Types } from "../convconv";

function cartesian(...a: any[][]): any[] {
  if (a.length === 1) {
    return a[0].map((x) => [x]);
  }

  return a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
}

describe("convconv", () => {
  const tests: { [key: string]: string }[] = [
    {
      kebab: "my-random-sentence-123",
      snake: "my_random_sentence_123",
      camel: "myRandomSentence123",
      pascal: "MyRandomSentence123",
      screamingKebab: "MY_RANDOM_SENTENCE_123",
    },
    {
      kebab: "my-random-sentence-123-and-something-after",
      snake: "my_random_sentence_123_and_something_after",
      camel: "myRandomSentence123AndSomethingAfter",
      pascal: "MyRandomSentence123AndSomethingAfter",
      screamingKebab: "MY_RANDOM_SENTENCE_123_AND_SOMETHING_AFTER",
    },
  ];

  const types = Object.keys(tests[0]);

  tests.forEach((tests) =>
    test.each(cartesian(types, types))(
      "converting %s to %s",
      (fromType: Types, toType: Types) => {
        const from = tests[fromType];
        const to = tests[toType];

        expect(convconv.fromType(fromType, from).toType(toType)).toBe(to);
      }
    )
  );

  tests.forEach((tests) =>
    test.each(cartesian(types, types))(
      "autoFrom should convert %s to %s",
      (fromType: Types, toType: Types) => {
        const from = tests[fromType];
        const to = tests[toType];

        expect(convconv.autoFrom(from).toType(toType)).toBe(to);
      }
    )
  );

  test.each([
    "123NumberPrefix",
    "snake_then-kebab",
    "camelCaseButThenAnAtSign@",
    "Random_sTring-with_nOConvention",
  ])(
    "getType should throw ConventionNotFoundError for invalid inputs",
    (from: string) => {
      expect(() => convconv.getType(from)).toThrow(
        convconv.ConventionNotFoundError
      );
    }
  );
});
