import convconv, { Types } from "./convconv";

function cartesian(...a: any[][]): any[] {
  if (a.length === 1) {
    return a[0].map((x) => [x]);
  }

  return a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
}

describe("/utils/naming-convention", () => {
  const tests: { [key: string]: string } = {
    kebab: "my-random-sentence",
    snake: "my_random_sentence",
    camel: "myRandomSentence",
    pascal: "MyRandomSentence",
    screamingKebab: "MY_RANDOM_SENTENCE",
  };

  const types = Object.keys(tests);

  test.each(cartesian(types, types))(
    "converting %s to %s",
    (fromType: Types, toType: Types) => {
      const from = tests[fromType];
      const to = tests[toType];

      expect(convconv.fromType(fromType, from).toType(toType).toString()).toBe(to);
    },
  );
});
