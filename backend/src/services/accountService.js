const users = [
    { id: 1, username: 'eunice', password: 'password123', balance: 1000 },
    // Add more users here
  ];
  
  exports.getAccountById = (userId) => {
    return users.find(user => user.id === userId);
  };
  
  exports.updateAccountBalance = (userId, balance) => {
    const user = users.find(user => user.id === userId);
    if (user) {
      user.balance = balance;
      return user;
    }
    return null;
  };
  