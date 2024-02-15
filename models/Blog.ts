import { Schema, model } from "mongoose";

//Blog Model
const blogSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    date : {
        type : Date,
        required : true
    }
})

export default model("Blog", blogSchema)