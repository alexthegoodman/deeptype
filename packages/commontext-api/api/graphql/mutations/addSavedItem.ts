import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const AddSavedItemMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addSavedItem", {
      type: "SavedItem",
      args: {
        type: nonNull(stringArg()),
        data: nonNull(stringArg()),
        documentId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { type, data, documentId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const savedItem = await prisma.savedItem.create({
          data: {
            type,
            data: JSON.parse(data),
            document: {
              connect: {
                id: documentId,
              },
            },
          },
        });

        return savedItem;
      },
    });
  },
});
