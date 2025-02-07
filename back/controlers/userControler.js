const { getAllUsers } = require('../models/userModel');

// 1. get all users
exports.getAllUsers = async (req, res, next) => {
  const users = await getAllUsers();
  res.status(200).json({
    status: 'success',
    data: users,
  });
};

// 2. get user by ID
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

//3. update user
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

//4. delete user
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
