const { TronWeb } = require("tronweb");
const User = require("../models/User");
const tokenABI = require("../abi/usdt");
const listeners = [];

// const usdtTokenAddress = process.env.USDT_TOKEN_ADDRESS_TRON;
const usdtTokenAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
console.log(usdtTokenAddress);
const tokensAddress = [usdtTokenAddress];

// Initialize TronWeb with TronGrid (or your own full node)
const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
});

const getBalance = async (address) => {
  const contract = tronWeb.contract(tokenABI, usdtTokenAddress);
  let result = await contract
    .balanceOf("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t")
    .call();
  console.log(result);
};

getBalance();
