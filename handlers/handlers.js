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
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var Blog_1 = require("../models/Blog");
var User_1 = require("../models/User");
var schema_1 = require("../schema/schema");
var RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        // get all users
        users: {
            type: (0, graphql_1.GraphQLList)(schema_1.UserType),
            resolve: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, User_1.default.find()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            }
        },
        // get all blogs
        blogs: {
            type: (0, graphql_1.GraphQLList)(schema_1.BlogType),
            resolve: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Blog_1.default.find()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            }
        }
    }
});
var mutations = new graphql_1.GraphQLObjectType({
    name: 'mutation',
    fields: {
        //add a new user
        addNewUser: {
            type: schema_1.UserType,
            args: {
                name: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString }
            },
            //@ts-ignore
            resolve: function (parent, _a) {
                var name = _a.name, email = _a.email;
                return __awaiter(this, void 0, void 0, function () {
                    var existingUser, user, err_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                return [4 /*yield*/, User_1.default.findOne({ email: email })];
                            case 1:
                                existingUser = _b.sent();
                                if (existingUser)
                                    return [2 /*return*/, new Error("User exists")];
                                user = new User_1.default({ name: name, email: email });
                                return [4 /*yield*/, user.save()];
                            case 2: return [2 /*return*/, _b.sent()];
                            case 3:
                                err_1 = _b.sent();
                                return [2 /*return*/, new Error("User addition failed")];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            }
        },
        //create a new blog
        createBlog: {
            type: schema_1.BlogType,
            args: {
                title: { type: graphql_1.GraphQLString },
                content: { type: graphql_1.GraphQLString },
                date: { type: graphql_1.GraphQLString }
            },
            resolve: function (parent, _a) {
                var title = _a.title, content = _a.content, date = _a.date;
                return __awaiter(this, void 0, void 0, function () {
                    var blog, err_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                blog = new Blog_1.default({ title: title, content: content, date: date });
                                return [4 /*yield*/, blog.save()];
                            case 1:
                                _b.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                err_2 = _b.sent();
                                return [2 /*return*/, new Error(err_2)];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: mutations });
