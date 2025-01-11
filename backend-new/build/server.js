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
const dotenv_1 = __importDefault(require("dotenv"));
// import userRoutes from "./src/routes/users";  // If using ES Modules (with "type": "module" in package.json)
const requests_1 = __importDefault(require("./routes/requests")); // If using ES Modules (with "type": "module" in package.json)
// const express = require('express'); // If using CommonJS syntax (default)
const auth_1 = require("./controllers/auth");
exports.app = (0, express_1.default)();
const port = 5001;
// Basic route for testing
// app.use('/api', userRoutes)
exports.app.use('/api', requests_1.default);
exports.app.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});
dotenv_1.default.config();
exports.app.use(express_1.default.json());
// Routes
//app.post("/auth/register", registerUser);
exports.app.post("/auth/login", auth_1.loginUser);
// Connect to Database and Start Server
exports.app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🗄️  Server running at http://localhost:${port}`);
    // try {
    //   await mongoose.connect(process.env.DATABASE_URL as string);
    //   console.log("🛢️  Connected to Database");
    // } catch (error) {
    //   console.error("⚠️ Error connecting to Database", error);
    // }
}));
