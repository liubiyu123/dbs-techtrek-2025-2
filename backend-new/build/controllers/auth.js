"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
//import { User } from "../models/user";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
    findOne: (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id }) {
        // Simulate a database query by searching in mockUsers
        return mockUsers.find((user) => user.user_id === user_id) || null;
    }),
};
// Login Controller
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, password } = req.body;
        // Check if the user exists
        const isUserExist = yield User.findOne({ user_id });
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
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
});
exports.loginUser = loginUser;
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
