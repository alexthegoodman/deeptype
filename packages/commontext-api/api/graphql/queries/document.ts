import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const DocumentQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("document", {
      type: "Document",
      args: {
        documentId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { documentId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const document = await prisma.document.findFirst({
          where: {
            id: documentId,
            creator: {
              id: currentUser.id,
            },
          },
        });

        return document;
      },
    });
  },
});
