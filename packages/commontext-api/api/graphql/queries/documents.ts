import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const DocumentQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("documents", {
      type: "Document",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const documents = await prisma.document.findMany({
          where: {},
        });

        return documents;
      },
    });
  },
});
