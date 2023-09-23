import convconv, { Convention } from "../index";

function cartesian(...a: any[][]): any[] {
  if (a.length === 1) {
    return a[0].map((x) => [x]);
  }

  return a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
}

describe("convconv", () => {
  const allTests: { [key in Convention]: string }[] = [
    {
      kebab: "my-random-sentence-123",
      snake: "my_random_sentence_123",
      camel: "myRandomSentence123",
      pascal: "MyRandomSentence123",
      "screaming-kebab": "MY-RANDOM-SENTENCE-123",
      "screaming-snake": "MY_RANDOM_SENTENCE_123",
    },
    {
      kebab: "my-random-sentence-123-and-something-after",
      snake: "my_random_sentence_123_and_something_after",
      camel: "myRandomSentence123AndSomethingAfter",
      pascal: "MyRandomSentence123AndSomethingAfter",
      "screaming-kebab": "MY-RANDOM-SENTENCE-123-AND-SOMETHING-AFTER",
      "screaming-snake": "MY_RANDOM_SENTENCE_123_AND_SOMETHING_AFTER",
    },
  ];

  const conventions = Object.keys(allTests[0]);

  allTests.forEach((tests) =>
    test.each(cartesian(conventions, conventions))(
      "converting %s to %s",
      (fromConvention: Convention, toConvention: Convention) => {
        const from = tests[fromConvention];
        const to = tests[toConvention];

        expect(
          convconv
            .fromConvention(fromConvention, from)
            .toConvention(toConvention),
        ).toBe(to);
      },
    ),
  );

  allTests.forEach((tests) =>
    test.each(cartesian(conventions, conventions))(
      "autoFrom should convert %s to %s",
      (fromConvention: Convention, toConvention: Convention) => {
        const from = tests[fromConvention];
        const to = tests[toConvention];

        expect(convconv.autoFrom(from).toConvention(toConvention)).toBe(to);
      },
    ),
  );

  test.each([
    "123NumberPrefix",
    "snake_then-kebab",
    "camelCaseButThenAnAtSign@",
    "Random_sTring-with_nOConvention",
  ])(
    "getConvention should throw ConventionNotFoundError for invalid inputs",
    (from: string) => {
      expect(() => convconv.getConvention(from)).toThrow(
        convconv.ConventionNotFoundError,
      );
    },
  );
});
