const { authenticate } = require('../services/authService');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = authenticate(username, password);
  
  if (user) {
    res.status(200).json({ message: 'Login successful', userId: user.id });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
