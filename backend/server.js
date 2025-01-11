import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import router from './src/routes/requests.js'
import mongoose from 'mongoose';
import express from 'express'
import app from './src/app.js'
// const express = require('express');
// const mongoose = require('mongoose');
// const app = require('./src/app');

const PORT = 5001;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection URI (Replace with your MongoDB URI)
const MONGO_URI = 'mongodb+srv://lby19981017:liubiyu123@cluster0.6znvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Use your database name

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// app.use('/api/login', loginRoutes)
// app.use('/api/account', accountRoutes)
app.use('/api/requests', router)
app.use('/api/', router)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
