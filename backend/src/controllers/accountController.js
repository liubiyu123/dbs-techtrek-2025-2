const { getAccountById, updateAccountBalance } = require('../services/accountService.js');

exports.getAccountDetails = (req, res) => {
  const companyId = parseInt(req.params.id);
  const company = getAccountById(companyId);
  
  if (company) {
    res.status(200).json({ 
      companyName: user.companyName,
      activeAccount: user.activeAccount,
      carbonBalance: user.carbonBalance,
      cashBalance: user.cashBalance,
      createdDatetime: user.createdDatetime,
      updatedDatetime: user.updatedDatetime,
     });
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};

// Update the updateAccountBalance function to handle both carbonBalance and cashBalance
exports.updateAccountBalance = (req, res) => {
  const companyId = parseInt(req.params.id);
  const { carbonBalance, cashBalance } = req.body;

  // Assuming updateAccountBalance is updated to handle both carbonBalance and cashBalance
  const user = updateAccountBalance(companyId, carbonBalance, cashBalance);
  
  if (user) {
    res.status(200).json({ message: 'Balance updated successfully', newBalance: user });
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};

// Assuming this is your updated updateAccountBalance function
function updateAccountBalance(companyId, carbonBalance, cashBalance) {
  // Mock example: Retrieve account by companyId (e.g., from a database)
  const account = accounts.find(acc => acc.companyId === companyId);
  
  if (account) {
    if (carbonBalance !== undefined) {
      account.carbonBalance = carbonBalance; // Update carbon balance if provided
    }
    if (cashBalance !== undefined) {
      account.cashBalance = cashBalance; // Update cash balance if provided
    }
    return account; // Return the updated account
  }
  
  return null; // Return null if account is not found
}


