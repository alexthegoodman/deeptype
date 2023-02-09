import { objectType } from "nexus";
import { Context } from "../../context";

export const SavedItemType = objectType({
  name: "SavedItem",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("type", { type: "String" });
    t.field("data", { type: "JSON" });

    t.field("document", {
      type: "Document",
      resolve: async (savedItem, __, context: Context) => {
        // TODO: just get creatorId off document?
        return await context.prisma.document.findFirst({
          where: {
            savedItems: {
              some: {
                id: savedItem.id as string,
              },
            },
          },
        });
      },
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
