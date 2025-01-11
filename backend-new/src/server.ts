import express from "express";
import userRoutes from "./routes/users";  // If using ES Modules (with "type": "module" in package.json)
import requestRoutes from "./routes/requests";  // If using ES Modules (with "type": "module" in package.json)
import accountRoutes from "./routes/account";  // If using ES Modules (with "type": "module" in package.json)
// const express = require('express'); // If using CommonJS syntax (default)

export const app = express();
const port = 5001;

// Middleware to parse JSON requests
app.use(express.json());

// Basic route for testing
app.use('/api/users', userRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/account', accountRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});