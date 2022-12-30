import { objectType } from "nexus";

export const LinkType = objectType({
  name: "Link",
  definition(t) {
    t.field("url", {
      type: "String",
    });

    t.field("title", {
      type: "String",
    });

    t.field("description", {
      type: "String",
    });
  },
});
