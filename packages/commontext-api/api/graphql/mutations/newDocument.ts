import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const NewDocumentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("newDocument", {
      type: "Document",
      args: {},
      resolve: async (_, { query }, { prisma }: Context, x) => {
        const newDocument = await prisma.document.create({
          data: {
            title: "New Document",
          },
        });

        return newDocument;
      },
    });
  },
});
