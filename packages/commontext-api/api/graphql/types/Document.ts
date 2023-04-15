import { objectType } from "nexus";
import { Context } from "../../context";

export const DocumentType = objectType({
  name: "Document",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("title", { type: "String" });
    t.field("content", { type: "JSON" });
    t.field("descriptor", { type: "String" });
    t.field("preset", { type: "String" });

    t.field("creator", {
      type: "User",
      resolve: async (document, __, context: Context) => {
        // TODO: just get creatorId off document?
        return await context.prisma.user.findFirst({
          where: {
            documents: {
              some: {
                id: document.id as string,
              },
            },
          },
        });
      },
    });

    t.list.field("savedItems", {
      type: "SavedItem",
      resolve: async (document, __, context: Context) => {
        // TODO: just get creatorId off document?
        return await context.prisma.savedItem.findMany({
          where: {
            document: {
              id: document.id as string,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
