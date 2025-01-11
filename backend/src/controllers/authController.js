const authService = require('../services/authService');

const login = (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const { success, message } = authService.authenticateUser(username, password);

  if (success) {
    return res.status(200).json({ message });
  } else {
    return res.status(401).json({ message });
  }
};

module.exports = {
  login,
};
