import mongoose, { mongo } from "mongoose";

const connectMonogoDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGODB_URI); // Add this line
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};



export default connectMonogoDB;

