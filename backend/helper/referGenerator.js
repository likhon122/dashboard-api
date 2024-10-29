const crypto = require("crypto");
function generateReferralCode(length = 12) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(charactersLength);
    result += characters[randomIndex];
  }

  return result;
}
module.exports = generateReferralCode;
