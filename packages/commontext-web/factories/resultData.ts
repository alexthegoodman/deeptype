import { faker } from "@faker-js/faker";

export const resultDataFactory = () => {
  return {
    contextKeywords: ["test"],
    keywords: ["testing"],
    results: new Array(10).fill(0).map((x) => {
      return {
        topicClassification: {
          name: faker.random.word(),
        },
        summary: faker.random.words(30),
        url: faker.internet.url(),
      };
    }),
  };
};
