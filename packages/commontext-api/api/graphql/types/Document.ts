import { objectType } from "nexus";

export const DocumentType = objectType({
  name: "Document",
  definition(t) {
    t.field("id", {
      type: "String",
    });
  },
});
