"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Blog_1 = __importDefault(require("../models/Blog"));
const User_1 = __importDefault(require("../models/User"));
const schema_1 = require("../schema/schema");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        // get all users
        users: {
            type: (0, graphql_1.GraphQLList)(schema_1.UserType),
            async resolve() {
                return await User_1.default.find();
            }
        },
        // get all blogs
        blogs: {
            type: (0, graphql_1.GraphQLList)(schema_1.BlogType),
            async resolve() {
                return await Blog_1.default.find();
            }
        }
    }
});
const mutations = new graphql_1.GraphQLObjectType({
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
            async resolve(parent, { name, email }) {
                let existingUser;
                try {
                    existingUser = await User_1.default.findOne({ email });
                    if (existingUser)
                        return new Error("User exists");
                    const user = new User_1.default({ name, email });
                    return await user.save();
                }
                catch (err) {
                    return new Error("User addition failed");
                }
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
            async resolve(parent, { title, content, date }) {
                let blog;
                try {
                    blog = new Blog_1.default({ title, content, date });
                    await blog.save();
                }
                catch (err) {
                    return new Error(err);
                }
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: mutations });
//# sourceMappingURL=handlers.js.map