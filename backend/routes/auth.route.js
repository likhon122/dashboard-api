const express = require("express");

const {
  verifyUser,
  loginUser,
  logOutUser
} = require("../controllers/auth.controller");
const { userIsLoggedOut, userIsLoggedIn } = require("../middlewares/auth");
const { loginUserValidation } = require("../validation/authValidation");
const { runValidation } = require("../validation/validation");

const authRouter = express.Router();

authRouter.get("/verify-user", verifyUser);

authRouter.post(
  "/login",
  userIsLoggedOut,
  loginUserValidation,
  runValidation,
  loginUser
);

authRouter.get("/log-out", userIsLoggedIn, logOutUser);

module.exports = authRouter;
