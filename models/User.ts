import { Schema, model } from "mongoose";

//User Model
const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

export default model("User", userSchema)