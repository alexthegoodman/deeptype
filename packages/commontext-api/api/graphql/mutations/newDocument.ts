import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const NewDocumentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("newDocument", {
      type: "Document",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const newDocument = await prisma.document.create({
          data: {
            title: "New Document",
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        return newDocument;
      },
    });
  },
});
