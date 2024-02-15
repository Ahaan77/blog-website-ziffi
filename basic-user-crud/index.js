const express = require('express');
require('dotenv').config();
const cors = require("cors");
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql')
const port = process.env.PORT || 9000;
const app = express();

const BlogType = new GraphQLObjectType({
    name: "BlogType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

const blogList = [
    { id: "1", name: "Blog #1" },
    { id: "2", name: "Blog #2" },
    { id: "3", name: "Blog #3" }
]

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: {
            type: new GraphQLList(BlogType),
            resolve() {
                return blogList
            }
        },
        blog: {
            type: BlogType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return blogList.find((blog) => blog.id === args.id)
            }
        }
    }
})

const mutations = new GraphQLObjectType({
    name: "mutations",
    fields: {
        addBlog: {
            type: BlogType,
            args: { name: { type: GraphQLString } },
            resolve(parent, { name }) {
                const newBlog = { name, id: Date.now().toString() };
                blogList.push(newBlog)
                return newBlog
            }
        },
        updateBlog: {
            type: BlogType,
            args: { id: { type: GraphQLID }, name:{type : GraphQLString} },
            resolve(parent, { id, name }) {
                const blog = blogList.find((b) => b.id === id)
                blog.name = name
                return blog
            }
        }
    },
})

const schema = new GraphQLSchema({ query: RootQuery, mutation: mutations })

app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);
app.listen(port, console.log(`> Server is rinning on PORT: ${port}`));