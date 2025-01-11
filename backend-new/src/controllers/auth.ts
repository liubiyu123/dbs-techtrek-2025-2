// auth.controller.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
//import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

// Register Controller
// export const registerUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { user_id, password } = req.body;

//     // Check if the user already exists
//     const isUserExisting = await User.findOne({ user_id });

//     if (isUserExisting) {
//       res.status(400).json({
//         status: 400,
//         message: "User ID already in use",
//       });
//       return;
//     }

//     // Create a new user
//     const newUser = await User.create({ user_id, password });

//     res.status(201).json({
//       status: 201,
//       success: true,
//       message: "User created successfully",
//       user: newUser,
//     });
//   } catch (error: any) {
//     console.error(error);
//     res.status(400).json({
//       status: 400,
//       message: error.message,
//     });
//   }
// };

const mockUsers = [
    { _id: "1", user_id: "1234", password: "password123" },
    { _id: "2", user_id: "2000", password: "examplepass" },
  ];
  
  const User = {
    findOne: async ({ user_id }: { user_id: string }) => {
      // Simulate a database query by searching in mockUsers
      return mockUsers.find((user) => user.user_id === user_id) || null;
    },
  };

// Login Controller
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, password } = req.body;

    // Check if the user exists
    const isUserExist = await User.findOne({ user_id });

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }

    // Verify password
    const isPasswordMatched = isUserExist.password === password;

    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Wrong password",
      });
      return;
    }

    // Generate JWT Token
    // const token = jwt.sign(
    //   { _id: isUserExist._id, user_id: isUserExist.user_id },
    //   process.env.JWT_SECRET as string,
    //   { expiresIn: "1d" }
    // );

    const token = "JWT_SECRET"; // Mocked JWT token for testing

    res.status(200).json({
      status: 200,
      success: true,
      message: "Login success",
      token,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

  
//   // Test the login logic using the mock User model
//   const loginUser = async (req: { body: any }, res: { status: Function; json: Function }) => {
//     try {
//       const { user_id, password } = req.body;
  
//       // Use mock User model to check if the user exists
//       const isUserExist = await User.findOne({ user_id });
  
//       if (!isUserExist) {
//         res.status(404).json({
//           status: 404,
//           success: false,
//           message: "User not found",
//         });
//         return;
//       }
  
//       const isPasswordMatched = isUserExist.password === password;
  
//       if (!isPasswordMatched) {
//         res.status(400).json({
//           status: 400,
//           success: false,
//           message: "Wrong password",
//         });
//         return;
//       }
  
//       const token = "mocked_jwt_token"; // Mocked JWT token for testing
//       res.status(200).json({
//         status: 200,
//         success: true,
//         message: "Login success",
//         token,
//       });
//     } catch (error: any) {
//       console.error(error);
//       res.status(400).json({
//         status: 400,
//         message: error.message,
//       });
//     }
//   };
  