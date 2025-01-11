import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import userRoutes from "./src/routes/users";  // If using ES Modules (with "type": "module" in package.json)
import requestRoutes from "./routes/requests";  // If using ES Modules (with "type": "module" in package.json)
// const express = require('express'); // If using CommonJS syntax (default)
import { loginUser } from "./controllers/auth";

export const app = express();
const port = 5001;

// Basic route for testing
// app.use('/api', userRoutes)
app.use('/api', requestRoutes)

app.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});

dotenv.config();
app.use(express.json());

// Routes
//app.post("/auth/register", registerUser);
app.post("/auth/login", loginUser);

// Connect to Database and Start Server
app.listen(port, async () => {
  console.log(`🗄️  Server running at http://localhost:${port}`);
  // try {
  //   await mongoose.connect(process.env.DATABASE_URL as string);
  //   console.log("🛢️  Connected to Database");
  // } catch (error) {
  //   console.error("⚠️ Error connecting to Database", error);
  // }
});
