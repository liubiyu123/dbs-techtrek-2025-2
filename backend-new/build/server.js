"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
// import userRoutes from "./src/routes/users";  // If using ES Modules (with "type": "module" in package.json)
var requests_1 = __importDefault(require("./routes/requests")); // If using ES Modules (with "type": "module" in package.json)
var account_1 = __importDefault(require("./routes/account")); // If using ES Modules (with "type": "module" in package.json)
// const express = require('express'); // If using CommonJS syntax (default)
exports.app = (0, express_1.default)();
var port = 5001;
// Middleware to parse JSON requests
exports.app.use(express_1.default.json());
// Basic route for testing
// app.use('/api', userRoutes)
exports.app.use('/api', requests_1.default);
exports.app.use('/api/account', account_1.default);
// Start the server
exports.app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
