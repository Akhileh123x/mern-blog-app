import mongoose from "mongoose";

// CONNECT TO MONGODB
const connectDB = async () => {
  try {
    // Connect using connection string from .env
    await mongoose.connect(process.env.MONGODB_URI);

    // Success log
    console.log("Database connected");

  } catch (error) {
    // Error log if connection fails
    console.log(error.message);
  }
};

export default connectDB;