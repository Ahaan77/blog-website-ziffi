import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql"

export const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})

export const BlogType = new GraphQLObjectType({
    name: "BlogType",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        date: { type: GraphQLString },
    })
})
