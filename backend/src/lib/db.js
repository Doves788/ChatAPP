import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://chatuser:ChatApp2026@cluster0.fofryk6.mongodb.net/chatify?appName=Cluster0");
    
    console.log("MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("Error connection to MONGODB:", error);
    process.exit(1); 
  }
};