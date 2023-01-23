"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.context = void 0;
var client_1 = require("@prisma/client");
var mixpanel_1 = __importDefault(require("../helpers/mixpanel"));
var prisma = new client_1.PrismaClient();
var mixpanel = new mixpanel_1["default"]();
exports.context = {
    prisma: prisma,
    mixpanel: mixpanel
};
//# sourceMappingURL=context.js.map