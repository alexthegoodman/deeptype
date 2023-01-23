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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.RegisterUserMutation = void 0;
var nexus_1 = require("nexus");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
// const mailchimp = require("mailchimp-node")(process.env.MAILCHIMP_KEY);
// import mailchimpPackage from "mailchimp-node";
// import axios from "axios";
var Helpers_1 = __importDefault(require("../../../helpers/Helpers"));
var ERROR_CODES_1 = __importDefault(require("../../../helpers/ERROR_CODES"));
var uuid_1 = require("uuid");
// const mailchimp = mailchimpPackage(process.env.MAILCHIMP_KEY);
exports.RegisterUserMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition: function (t) {
        var _this = this;
        t.nonNull.field("registerUser", {
            type: "String",
            args: {},
            resolve: function (_, _a, _b) {
                var prisma = _b.prisma, mixpanel = _b.mixpanel, req = _b.req;
                return __awaiter(_this, void 0, void 0, function () {
                    var helpers, credentials, email, password, user, data, token;
                    var _this = this;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                helpers = new Helpers_1["default"]();
                                credentials = helpers.parseAuthHeader(req.headers.authorization);
                                email = credentials[0];
                                password = credentials[1];
                                return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            console.info("Register User Incoming Request ", email);
                                            bcryptjs_1["default"].hash(password, 12, function (err, hash) { return __awaiter(_this, void 0, void 0, function () {
                                                var newUser, error_1;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!helpers.isDefinedWithContent(hash)) return [3 /*break*/, 5];
                                                            newUser = void 0;
                                                            _a.label = 1;
                                                        case 1:
                                                            _a.trys.push([1, 3, , 4]);
                                                            return [4 /*yield*/, prisma.user.create({
                                                                    data: {
                                                                        email: email,
                                                                        password: hash,
                                                                        role: "USER",
                                                                        subscriptionToken: (0, uuid_1.v4)(),
                                                                        subscription: "NONE",
                                                                        frequency: ""
                                                                    }
                                                                })];
                                                        case 2:
                                                            newUser = _a.sent();
                                                            return [3 /*break*/, 4];
                                                        case 3:
                                                            error_1 = _a.sent();
                                                            reject(ERROR_CODES_1["default"].C008);
                                                            return [3 /*break*/, 4];
                                                        case 4:
                                                            // TODO: mandrill
                                                            // TODO: mailchimp list
                                                            // TODO: mixpanel
                                                            resolve(newUser);
                                                            return [3 /*break*/, 6];
                                                        case 5:
                                                            reject(ERROR_CODES_1["default"].C005);
                                                            _a.label = 6;
                                                        case 6: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [2 /*return*/];
                                        });
                                    }); })];
                            case 1:
                                user = _c.sent();
                                // await helpers.subscribeMailchimp(email);
                                // console.info("mailchimpData", mailchimpData);
                                console.info("Register user", user);
                                data = {
                                    userId: user.id
                                };
                                token = helpers.createJWT(data);
                                return [2 /*return*/, token];
                        }
                    });
                });
            }
        });
    }
});
//# sourceMappingURL=registerUser.js.map