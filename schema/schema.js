"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogType = exports.UserType = void 0;
var graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: "UserType",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
    }); }
});
exports.BlogType = new graphql_1.GraphQLObjectType({
    name: "BlogType",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        date: { type: graphql_1.GraphQLString },
    }); }
});
