// import mongoose from "mongoose";

// export const connectDB = async ()=>{
//     await mongoose.connect(process.env.MONGO_URI)
//     .then(()=>console.log("DB Connected"))
//     .catch(err => console.error(err));
// }

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

 


// mongodb+srv://SudheerChilaka:Sudheer@627@cluster0.m0nkljj.mongodb.net/?appName=Cluster0
// 