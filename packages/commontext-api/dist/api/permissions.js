"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.permissions = void 0;
var apollo_server_1 = require("apollo-server");
var graphql_shield_1 = require("graphql-shield");
var isAdmin = (0, graphql_shield_1.rule)()(function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
    var allowed;
    return __generator(this, function (_a) {
        allowed = ctx.currentUser.role === "ADMIN";
        return [2 /*return*/, allowed];
    });
}); });
var isAuthenticated = (0, graphql_shield_1.rule)()(function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
    var allowed;
    return __generator(this, function (_a) {
        allowed = ctx.currentUser !== null && typeof ctx.currentUser !== "undefined";
        return [2 /*return*/, allowed];
    });
}); });
exports.permissions = (0, graphql_shield_1.shield)({
    Query: {
        "*": isAuthenticated,
        authenticate: (0, graphql_shield_1.not)(isAuthenticated)
    },
    Mutation: {
        "*": isAuthenticated,
        registerUser: (0, graphql_shield_1.not)(isAuthenticated)
    }
}, {
    fallbackError: function (thrownThing, parent, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (thrownThing instanceof apollo_server_1.ApolloError) {
                return [2 /*return*/, thrownThing];
            }
            else if (thrownThing instanceof Error) {
                console.error(thrownThing);
                return [2 /*return*/, new apollo_server_1.ApolloError(thrownThing.message, "ERR_INTERNAL_SERVER")];
            }
            else {
                console.error("The resolver threw something that is not an error.");
                if (thrownThing === null) {
                    thrownThing = "NOT AUTHORIZED!";
                }
                console.error(thrownThing);
                return [2 /*return*/, new apollo_server_1.ApolloError(thrownThing, "ERR_INTERNAL_SERVER")];
            }
            return [2 /*return*/];
        });
    }); }
});
//# sourceMappingURL=permissions.js.map