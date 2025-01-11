const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection URI (Replace with your MongoDB URI)
const MONGO_URI = 'mongodb+srv://lby19981017:liubiyu123@cluster0.6znvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Use your database name

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, Express with Mongoose!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
