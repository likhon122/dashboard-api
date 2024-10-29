const express = require("express");
const { userIsLoggedIn, checkAdmin } = require("../middlewares/auth");
const { runValidation } = require("../validation/validation");
const {
  changeAdmin,
  getWithdrawals
} = require("../controllers/admin.controller");
const { deleteWithdrawal } = require("../controllers/withdraw.controller");

const adminRouter = express.Router();

adminRouter.get("/get-withdrawals", userIsLoggedIn, checkAdmin, getWithdrawals);

adminRouter.post(
  "/change-admin",
  userIsLoggedIn,
  // checkAdmin,
  changeAdmin
);

adminRouter.delete(
  "/delete-withdrawal",
  userIsLoggedIn,
  checkAdmin,
  deleteWithdrawal
);

module.exports = adminRouter;
