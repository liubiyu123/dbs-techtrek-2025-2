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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import userRoutes from "./src/routes/users";  // If using ES Modules (with "type": "module" in package.json)
const requests_1 = __importDefault(require("./routes/requests")); // If using ES Modules (with "type": "module" in package.json)
// const express = require('express'); // If using CommonJS syntax (default)
exports.app = (0, express_1.default)();
const port = 9323;
// Basic route for testing
// app.use('/api', userRoutes)
exports.app.use('/api', requests_1.default);
// Start the server
exports.app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("./models/user");
exports.app.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});
exports.app.post("/auth/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ** Get The User Data From Body ;
        const user = req.body;
        // ** destructure the information from user;
        const { user_id, password } = user;
        // ** Check the user id all ready exist  in database or not ;
        // ** Import the user model from "./models/user";
        const isUserExisting = yield user_1.User.findOne({
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
        const newUser = yield user_1.User.create({
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
    }
    catch (error) {
        // console the error to debug
        console.log(error);
        // Send the error message to the client
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
}));
exports.app.post("/auth/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ** Get The User Data From Body ;
        const user = req.body;
        // ** destructure the information from user;
        const { user_id, password } = user;
        // ** Check the (email/user) exist  in database or not ;
        const isUserExist = yield user_1.User.findOne({
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
        const isPasswordMatched = (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) === password;
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
        const token = jsonwebtoken_1.default.sign({ _id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id, user_id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.user_id }, "YOUR_SECRET", {
            expiresIn: "1d",
        });
        // send the response
        res.status(200).json({
            status: 200,
            success: true,
            message: "login success",
            token: token,
        });
    }
    catch (error) {
        // Send the error message to the client
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
}));
// Listen the server
exports.app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🗄️  Server Fire on http:localhost//${port}`);
    // Connect To The Database
    try {
        yield mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log("🛢️  Connected To Database");
    }
    catch (error) {
        console.log("⚠️ Error to connect Database");
    }
}));
