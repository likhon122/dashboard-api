const Withdrawal = require("../models/withdrawals");

const withdrawController = async (req, res, next) => {
  try {
    const { email, tokenType, network, amount, address } = req.body;

    if (!email || !tokenType || !network || !amount || !address) {
      return res.status(400).json({
        message: "Email, tokenType, network, amount, address is required!!"
      });
    }

    const withdrawal = await Withdrawal.create({
      email,
      tokenType,
      network,
      amount,
      address
    });

    if (!withdrawal) {
      return res.status(400).json({ message: "Withdrawal request failed" });
    }

    res.status(201).json({
      message: "Withdrawal request created. Soon your request is approved!!",
      withdrawal
    });
  } catch (error) {
    next(error);
  }
};

const deleteWithdrawal = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Id is required!!"
      });
    }

    const withdrawal = await Withdrawal.destroy({ where: { id } });
    if (!withdrawal) {
      return res.status(400).json({
        message: "Withdrawal request not found"
      });
    }

    res.status(200).json({
      message: "Withdrawal request deleted successfully",
      withdrawal
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { withdrawController, deleteWithdrawal };
