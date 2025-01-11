const { getAccountById, updateAccountBalance } = require('../services/accountService.js');

exports.getAccountBalance = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = getAccountById(userId);
  
  if (user) {
    res.status(200).json({ balance: user.balance });
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};

exports.updateAccountBalance = (req, res) => {
  const userId = parseInt(req.params.id);
  const { balance } = req.body;
  const user = updateAccountBalance(userId, balance);
  
  if (user) {
    res.status(200).json({ message: 'Balance updated successfully', newBalance: user.balance });
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};
