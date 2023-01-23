"use strict";
exports.__esModule = true;
exports.LinkType = void 0;
var nexus_1 = require("nexus");
exports.LinkType = (0, nexus_1.objectType)({
    name: "Link",
    definition: function (t) {
        t.field("url", { type: "String" });
        t.field("title", { type: "String" });
        t.field("description", { type: "String" });
        t.field("updatedAt", { type: "DateTime" });
        t.field("createdAt", { type: "DateTime" });
    }
});
//# sourceMappingURL=Link.js.map