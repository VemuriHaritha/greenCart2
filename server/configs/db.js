import mongoose from "mongoose";
// import { MONGODB_URI } from "./index.js";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () =>
            console.log("Database Connected")
        );
        await mongoose.connect(`${process.env.MONGODB_URL}/greencart`);
    } catch (error) {
        console.error(error.message);
    }
};

export default connectDB;