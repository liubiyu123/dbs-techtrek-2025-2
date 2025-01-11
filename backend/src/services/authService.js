const mongoose = require('mongoose');
const User = require('../models/account');

// Example MongoDB User model (you would define this in src/models/User.js)
const authenticateUser = async (username, password) => {
  try {
    // Query the database for the user by username
    const user = await Account.findOne({ username });

    // Check if user exists and if password matches (assuming password is stored securely)
    if (!user || user.password !== password) {
      return { success: false, message: 'Invalid credentials' };
    }

    return { success: true, message: `Login successful. Welcome, ${user.companyName}` };
  } catch (error) {
    console.error('Error during authentication:', error);
    return { success: false, message: 'An error occurred during login' };
  }
};

module.exports = {
  authenticateUser,
};
