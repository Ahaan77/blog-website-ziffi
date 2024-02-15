import { connect } from "mongoose";

export const connectToDatabase = async () => {
    try {
        await connect(`mongodb+srv://admin:KonIpXBsEZPwyGP8@cluster0.mmh7kh7.mongodb.net/?retryWrites=true&w=majority`)
    } catch (err) {
        console.log(err)
        return err
    }
}