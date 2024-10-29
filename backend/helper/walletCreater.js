const Web3 = require("web3");
const { TronWeb } = require("tronweb");

const walletCreater = () => {
  const web3 = new Web3();
  const account = web3.eth.accounts.create();
  console.log("Private Key:", account.privateKey);
  console.log("Public Address:", account.address);
  return {
    privateKey: account.privateKey,
    publicKey: account.address,
  };
};
// console.log(walletCreater());

// Initialize TronWeb without a provider, as we’re only generating keys

const walletCreatorTron = () => {
  const tronWeb = new TronWeb({
    fullHost: "https://api.trongrid.io", // Full node API endpoint
  });
  // Generate a new account
  const account = tronWeb.utils.accounts.generateAccount();

  console.log("Private Key:", account.privateKey);
  console.log("Public Address:", account.address.base58);

  return {
    privateKey: account.privateKey,
    publicAddress: account.address.base58,
  };
};

module.exports = { walletCreater, walletCreatorTron };
