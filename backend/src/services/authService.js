const users = [
    { id: 1, username: 'eunice', password: 'password123', balance: 1000 },
    // Add more users here
  ];
  
  exports.authenticate = (username, password) => {
    return users.find(user => user.username === username && user.password === password);
  };
  