import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const GetGeneratedTextQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getGeneratedText", {
      type: "String",
      args: {
        contextText: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { contextText },
        { prisma, openai, currentUser }: Context,
        x
      ) => {
        console.info("getGeneratedText", contextText);

        // get continuation text from openai
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: contextText,
          max_tokens: 7,
          temperature: 0,
        });

        console.info("openai response", response);

        return response.data.choices[0].text as string;
      },
    });
  },
});
