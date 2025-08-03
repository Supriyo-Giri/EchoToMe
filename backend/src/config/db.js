import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected successfully")
    } catch (error) {
        console.log(`error connecting to mongodb: ${error}`);
        process.exit(1); 
    }
}