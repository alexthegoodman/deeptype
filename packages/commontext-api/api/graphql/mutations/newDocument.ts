import { PrismaClient } from "@prisma/client";
import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

const prisma = new PrismaClient();

export const NewDocumentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("newDocument", {
      type: "Document",
      args: {},
      resolve: async (_, { query }, context, x) => {
        console.info("context", context);

        const newDocument = await prisma.document.create({
          data: {
            title: "New Document",
          },
        });

        return newDocument;
      },
    });
  },
});
