"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var api_1 = require("./api");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
var port = process.env.PORT ? process.env.PORT : 3001;
console.info("Setup Express Routes...");
app.use((0, cors_1["default"])());
app.get("/", function (req, res) {
    res.send("API Functioning");
});
console.info("Start Server...");
app.listen(port, "0.0.0.0", function () {
    console.info("Express Server ready on port ".concat(port));
});
(0, api_1.startApolloServer)();
//# sourceMappingURL=index.js.map