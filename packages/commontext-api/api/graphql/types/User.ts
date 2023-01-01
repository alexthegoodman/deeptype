import { objectType } from "nexus";
import { Context } from "../../context";

export const UserType = objectType({
  name: "User",
  definition(t) {
    t.field("email", { type: "String" });
    t.field("role", { type: "String" });

    t.list.field("documents", {
      type: "Document",
      resolve: async (user, __, context: Context) => {
        return await context.prisma.document.findMany({
          where: {
            creator: {
              email: user.email as string,
            },
          },
        });
      },
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
