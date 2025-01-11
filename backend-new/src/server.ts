import express from "express";
// import userRoutes from "./src/routes/users";  // If using ES Modules (with "type": "module" in package.json)
import requestRoutes from "./routes/requests";  // If using ES Modules (with "type": "module" in package.json)
// const express = require('express'); // If using CommonJS syntax (default)

export const app = express();
const port = 5001;

// Middleware to parse JSON requests
app.use(express.json());

// Basic route for testing
// app.use('/api', userRoutes)
app.use('/api', requestRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});