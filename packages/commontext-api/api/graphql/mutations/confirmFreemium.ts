import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const ConfirmFreemiumMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("confirmFreemium", {
      type: "User",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const updatedUser = await prisma.user.update({
          where: {
            id: currentUser.id,
          },
          data: {
            subscription: "STARTER",
          },
        });

        return updatedUser;
      },
    });
  },
});
