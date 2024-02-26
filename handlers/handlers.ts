import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import Blog from "../models/Blog";
import User from "../models/User";
import { BlogType, UserType } from "../schema/schema";
import { Document } from "mongoose";
import { resolve } from "path";

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        // get all users
        users: {
            type: GraphQLList(UserType),
            async resolve() {
                return await User.find()
            }
        },
        // get all blogs
        blogs: {
            type: GraphQLList(BlogType),
            async resolve() {
                return await Blog.find()
            }
        },
    }
})

const mutations = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        //add a new user
        addNewUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            async resolve(parent, { name, email }) {
                let existingUser: Document<any, any, any>;
                try {
                    existingUser = await User.findOne({ email })
                    if (existingUser) return new Error("User exists")
                    const user = new User({ name, email })
                    return await user.save()
                } catch (err) {
                    return new Error("User addition failed")
                }
            }
        },
        //create a new blog
        createBlog: {
            type: BlogType,
            args: {
                title: { type: GraphQLString },
                content: { type: GraphQLString },
                date: { type: GraphQLString }
            },
            async resolve(parent, { title, content, date }) {
                let blog: Document<any, any, any>
                try {
                    blog = new Blog({ title, content, date })
                    await blog.save()
                } catch (err) {
                    return new Error(err)
                }
            }
        },
        //get data with blog id
        getBlog: {
            type: BlogType,
            args: {
                id: { type: GraphQLString },
            },
            async resolve(parent, { id }) {
                try {
                    const blog = await Blog.findById(id);
                    return blog;
                } catch (err) {
                    return new Error("Blog does not exist")
                }
            }
        }
    }
})

export default new GraphQLSchema({ query: RootQuery, mutation: mutations })