const express = require("express");
const { userIsLoggedIn, checkAdmin } = require("../middlewares/auth");
const { runValidation } = require("../validation/validation");
const {
  changeAdmin,
  getWithdrawals
} = require("../controllers/admin.controller");

const adminRouter = express.Router();

adminRouter.get("/get-withdrawals", userIsLoggedIn, checkAdmin, getWithdrawals);

adminRouter.post(
  "/change-admin",
  userIsLoggedIn,
  // checkAdmin,
  changeAdmin
);

module.exports = adminRouter;
