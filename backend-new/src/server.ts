import express from "express";
// import userRoutes from "./src/routes/users";  // If using ES Modules (with "type": "module" in package.json)
import requestRoutes from "./routes/requests";  // If using ES Modules (with "type": "module" in package.json)
// const express = require('express'); // If using CommonJS syntax (default)

export const app = express();
const port = process.env.PORT || 4402;

// Basic route for testing
// app.use('/api', userRoutes)
app.use('/api', requestRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "./models/user";

app.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});

app.post("/auth/register", async (req, res) => {
    try {
      // ** Get The User Data From Body ;
      const user = req.body;
  
      // ** destructure the information from user;
      const { user_id, password } = user;
  
      // ** Check the user id all ready exist  in database or not ;
      // ** Import the user model from "./models/user";
  
      const isUserExisting = await User.findOne({
        user_id: user_id,
      });
  
      // ** Add a condition if the user exist we will send the response as email all ready exist
      if (isUserExisting) {
        res.status(400).json({
          status: 400,
          message: "User ID already in use",
        });
        return;
      }
  
      // ** if not create a new user ;
      // !! Don't save the password as plain text in db . I am saving just for demonstration.
      // ** You can use bcrypt to hash the plain password.
  
      // now create the user;
      const newUser = await User.create({
        user_id,
        password,
      });
  
      // Send the newUser as  response;
      res.status(200).json({
        status: 201,
        success: true,
        message: " User created Successfully",
        user: newUser,
      });
    } catch (error: any) {
      // console the error to debug
      console.log(error);
  
      // Send the error message to the client
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
    }
  });
  
  app.post("/auth/login", async (req, res) => {
    try {
      // ** Get The User Data From Body ;
      const user = req.body;
  
      // ** destructure the information from user;
      const { user_id, password } = user;
  
      // ** Check the (email/user) exist  in database or not ;
      const isUserExist = await User.findOne({
        user_id: user_id,
      });
  
      // ** if there is not any user we will send user not found;
      if (!isUserExist) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "User not found",
        });
        return;
      }
  
      // ** if the (user) exist  in database we will check the password is valid or not ;
      // **  compare the password in db and the password sended in the request body
  
      const isPasswordMatched =
        isUserExist?.password === password;
  
      // ** if not matched send response that wrong password;
  
      if (!isPasswordMatched) {
        res.status(400).json({
          status: 400,
          success: false,
          message: "wrong password",
        });
        return;
      }
  
      // ** if the email and password is valid create a token
  
      /*
      To create a token JsonWebToken (JWT) receive's 3 parameter
      1. Payload -  This contains the claims or data you want to include in the token.
      2. Secret Key - A secure key known only to the server used for signing the token.
      3. expiration -  Additional settings like token expiration or algorithm selection.
      */
  
      // !! Don't Provide the secret openly, keep it in the .env file. I am Keeping Open just for demonstration
  
      // ** This is our JWT Token
      const token = jwt.sign(
        { _id: isUserExist?._id, user_id: isUserExist?.user_id },
        "YOUR_SECRET",
        {
          expiresIn: "1d",
        }
      );
  
      // send the response
      res.status(200).json({
        status: 200,
        success: true,
        message: "login success",
        token: token,
      });
    } catch (error: any) {
      // Send the error message to the client
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
    }
  });
  
  // Listen the server
  app.listen(port, async () => {
    console.log(`🗄️  Server Fire on http:localhost//${port}`);
  
    // Connect To The Database
    try {
      await mongoose.connect(
        process.env.DATABASE_URL as string
      );
      console.log("🛢️  Connected To Database");
    } catch (error) {
      console.log("⚠️ Error to connect Database");
    }
});