const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  depositAmount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  verificationCode: {
    type: DataTypes.STRING
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  lastResendTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  referCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  referCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  publicKey: {
    type: DataTypes.STRING,
    allowNull: true
  },
  privateKey: {
    type: DataTypes.STRING,
    allowNull: true
  },
  publicKeyTrc20: {
    type: DataTypes.STRING,
    allowNull: true
  },
  privateKeyTrc20: {
    type: DataTypes.STRING,
    allowNull: true
  },
  LOCUSBalance: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  CRETABalance: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  referer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  referBonus: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;
