"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.startApolloServer = void 0;
var express_1 = __importDefault(require("express"));
var express4_1 = require("@apollo/server/express4");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var server_1 = require("./server");
var context_1 = require("./context");
var client_1 = require("@prisma/client");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var prisma = new client_1.PrismaClient();
var startApolloServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, server_1.server.start()];
            case 1:
                _a.sent();
                app = (0, express_1["default"])();
                // server.applyMiddleware({ app });
                // https://www.apollographql.com/docs/apollo-server/api/express-middleware/#context
                app.use("/graphql", (0, cors_1["default"])(), body_parser_1["default"].json(), (0, express4_1.expressMiddleware)(server_1.server, {
                    context: function (_a) {
                        var req = _a.req, res = _a.res;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var tokenHeaderKey, jwtSecretKey, currentUser, tokenHeader, token, verified, error_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
                                        jwtSecretKey = process.env.JWT_SECRET_KEY;
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 5, , 6]);
                                        tokenHeader = req.header(tokenHeaderKey);
                                        token = tokenHeader === null || tokenHeader === void 0 ? void 0 : tokenHeader.split("Bearer ")[1];
                                        verified = jsonwebtoken_1["default"].verify(token, jwtSecretKey);
                                        if (!(verified && typeof verified !== "string")) return [3 /*break*/, 3];
                                        return [4 /*yield*/, prisma.user.findFirst({
                                                where: {
                                                    id: verified.userId
                                                }
                                            })];
                                    case 2:
                                        currentUser = _b.sent();
                                        console.info("Verified Token", verified, "currentUser", currentUser);
                                        return [3 /*break*/, 4];
                                    case 3:
                                        console.warn("Token Not Verified 1");
                                        _b.label = 4;
                                    case 4: return [3 /*break*/, 6];
                                    case 5:
                                        error_1 = _b.sent();
                                        // ex. if token is not provided
                                        console.warn("Token Not Verified 2");
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/, __assign({ req: req, currentUser: currentUser }, context_1.context)];
                                }
                            });
                        });
                    }
                }));
                return [4 /*yield*/, new Promise(function (r) { return app.listen({ port: 4000 }, r); })];
            case 2:
                _a.sent();
                console.info("\uD83D\uDE80 Server ready at http://localhost:4000/graphql");
                return [2 /*return*/];
        }
    });
}); };
exports.startApolloServer = startApolloServer;
//# sourceMappingURL=index.js.map