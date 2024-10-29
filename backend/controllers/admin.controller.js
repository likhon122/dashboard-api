const User = require("../models/User");
const Withdrawal = require("../models/withdrawals");

const changeAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isAdmin) {
      return res.status(400).json({ message: "User is already an admin" });
    }

    user.isAdmin = true;
    await user.save();
    res.status(200).json({ message: "User is now an admin" });

  } catch (error) {
    next(error);
  }
};

const getWithdrawals = async (req, res, next) => {
  try {
    const withdrawals = await Withdrawal.findAll();

    if (!withdrawals) {
      return res.status(404).json({ message: "No withdrawals found" });
    }

    res.status(200).json({ withdrawals });
  } catch (error) {
    next(error);
  }
};

module.exports = { changeAdmin, getWithdrawals };
