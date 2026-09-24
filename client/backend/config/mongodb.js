import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  if (!process.env.MONGODB_URL) {
    console.error("MONGODB_URL is not set in your .env file");
    return;
  }

  if (
    process.env.MONGODB_URL.includes("YOUR_USER") ||
    process.env.MONGODB_URL.includes("YOUR_PASSWORD")
  ) {
    console.error(
      "MongoDB connection string still contains placeholder values. Replace YOUR_USER and YOUR_PASSWORD with real credentials.",
    );
    return;
  }

  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};

export default connectDB;
