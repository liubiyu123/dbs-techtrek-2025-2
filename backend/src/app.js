import express from "express"
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

// Import routes here
import loginRoutes from './routes/login'
import accountRoutes from './routes/account'
// const loginRoutes = require('./routes/login');
// const accountRoutes = require('./routes/account');

// Use routes
app.use('/login', loginRoutes);
app.use('/account', accountRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

module.exports = app;
