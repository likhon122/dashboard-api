const { body } = require("express-validator");

// Validation for user registration
const registerValidation = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("password")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage(
      "Password must contain at least one uppercase letter, one number, and one special character"
    )
];

// Validation for resending verification code
const resendCodeValidation = [
  body("email").isEmail().withMessage("Please enter a valid email address")
];

// Validation for verifying the user
const verifyValidation = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("code")
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage("Verification code must be 6 digits")
];

// Validation for forgot password
const forgotPasswordValidation = [
  body("email").isEmail().withMessage("Please enter a valid email address")
];

// Validation for resetting password
const resetPasswordValidation = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("code")
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage("Verification code must be 6 digits"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("password")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage(
      "Password must contain at least one uppercase letter, one number, and one special character"
    )
];

module.exports = {
  registerValidation,
  resendCodeValidation,
  verifyValidation,
  forgotPasswordValidation,
  resetPasswordValidation
};
