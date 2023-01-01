import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const MyDocumentQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myDocuments", {
      type: "Document",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const documents = await prisma.document.findMany({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
        });

        return documents;
      },
    });
  },
});
