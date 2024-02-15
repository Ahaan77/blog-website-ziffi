"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = require("mongoose");
//Establish connection with mongo
const connectToDatabase = async () => {
    try {
        await (0, mongoose_1.connect)(`mongodb+srv://admin:KonIpXBsEZPwyGP8@cluster0.mmh7kh7.mongodb.net/?retryWrites=true&w=majority`);
    }
    catch (err) {
        console.log(err);
        return err;
    }
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=connection.js.map