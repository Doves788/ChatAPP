import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "50mb" })); // req.body
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// This correctly allows your frontend to send and receive the secure cookie
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start Server & Connect to Database
server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});