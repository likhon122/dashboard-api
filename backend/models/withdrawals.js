const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Withdrawal = sequelize.define(
  "Withdrawal",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tokenType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    network: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = Withdrawal;
