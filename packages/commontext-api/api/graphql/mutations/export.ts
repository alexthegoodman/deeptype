import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

import { EPub } from "../../../lib/html-to-epub";
import { generatePdf } from "../../../lib/html-pdf-node";
import { writeFileSync } from "fs";
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
          let options = {
            // format: "A4"
            width: "4in",
            height: "6in",
            margin: {
              top: "1cm",
              bottom: "1cm",
              left: "1cm",
              right: "1cm",
            },
          };
          // Example of options with args //
          // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

          let file = { content: html };

          generatePdf(file, options).then((pdfBuffer) => {
            console.log("PDF Buffer:-", pdfBuffer);
            writeFileSync("10111.pdf", pdfBuffer, "binary");
          });
        }

        return "success";
      },
    });
  },
});
