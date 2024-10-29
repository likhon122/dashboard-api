const { body } = require("express-validator");

const loginUserValidation = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
];

module.exports = { loginUserValidation };
