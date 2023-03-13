import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

import { EPub } from "../../../lib/html-to-epub";
// const { EPub } = require("@lesjoursfr/html-to-epub");

export const ExportMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("export", {
      type: "String",
      args: {
        type: nonNull(stringArg()),
        html: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { type, html },
        { prisma, currentUser }: Context,
        x
      ) => {
        if (type === "epub") {
          const option = {
            title: "My Book",
            description: "My Book Description",
            author: "John Doe",
            publisher: "My Company",
            verbose: true,
            // cover: "http://example.com/cover.jpg",
            content: [
              {
                title: "Chapter 1",
                data: html,
              },
            ],
          };

          const epub = new EPub(option, "temp/temp.epub");
          epub.loadContent();

          // setTimeout due to dynamic import?
          setTimeout(() => {
            console.info("render", epub);
            epub
              .render()
              .then(() => {
                console.log("Ebook Generated Successfully!");
              })
              .catch((err: any) => {
                console.error("Failed to generate Ebook because of ", err);
              });
          }, 500);
        } else if (type === "pdf") {
        }

        return "success";
      },
    });
  },
});
