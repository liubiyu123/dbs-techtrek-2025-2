const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Import routes here
const loginRoutes = require('./routes/login');
const accountRoutes = require('./routes/account');

// Use routes
app.use('/login', loginRoutes);
app.use('/account', accountRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

module.exports = app;
