import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const UpdateUserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateUser", {
      type: "User",
      args: { documentTree: nullable(stringArg()) },
      resolve: async (
        _,
        { documentTree },
        { prisma, currentUser }: Context,
        x
      ) => {
        const updateData = {} as any;

        if (documentTree) updateData.documentTree = JSON.parse(documentTree);

        const updatedUser = await prisma.user.update({
          where: {
            id: currentUser.id,
          },
          data: updateData,
        });

        return updatedUser;
      },
    });
  },
});
