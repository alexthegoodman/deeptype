import { objectType } from "nexus";
import { Context } from "../../context";

export const DocumentType = objectType({
  name: "Document",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("title", { type: "String" });
    t.field("content", { type: "JSONObject" });
    t.field("descriptor", { type: "String" });

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

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
