import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const NewDocumentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("newDocument", {
      type: "Document",
      args: {
        preset: nonNull(stringArg()),
      },
      resolve: async (_, { preset }, { prisma, currentUser }: Context, x) => {
        let title = "New Document";

        if (preset === "book") {
          title = "New Book";
        }

        if (preset === "cover") {
          title = "New Cover";
        }

        if (preset === "part") {
          title = "New Part";
        }

        if (preset === "chapter") {
          title = "New Chapter";
        }

        const newDocument = await prisma.document.create({
          data: {
            title,
            preset,
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
