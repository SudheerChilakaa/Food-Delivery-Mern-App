
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1);
    }
};

// module.exports = connectDB;

// mongodb+srv://SudheerChilaka:Sudheer@627@cluster0.m0nkljj.mongodb.net/?appName=Cluster0
// 