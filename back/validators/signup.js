const { body } = require('express-validator');
const { getUserByEmail } = require('../models/userModel');

const validateNewUser = [
  body().notEmpty().withMessage('User body must contain data'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid')
    .normalizeEmail() 
    .custom(async (value) => {
      const user = await getUserByEmail(value); 
      if (user) {
        throw new Error('Email already exists');
      }
      return true; 
    }),

  body('username').notEmpty().withMessage('Username is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .custom(async (value, { req }) => {
      if (value !== req.body.passwordconfirm) {
        throw new Error(
          'Password and password confirmation do not match. Please try again.'
        );
      }
      return true; 
    }),
];
module.exports = validateNewUser;
