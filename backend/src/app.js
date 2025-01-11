
import express from "express";

// Import routes here
import loginRoutes from './routes/login';
import accountRoutes from './routes/account';

const app = express();

// Use routes
app.use('/login', loginRoutes);
app.use('/account', accountRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

module.exports = app;
