import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/xitHub"
            // , 
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // }
        );
        console.log("MongoDB connected successfully.");
    }
    catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connect;
