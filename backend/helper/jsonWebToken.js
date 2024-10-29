const jwt = require("jsonwebtoken");

require("dotenv").config();

const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

const createJsonWebToken = (tokenData, secretKey, expireTime) => {
  if (typeof tokenData !== "object") {
    throw new Error("Token Data is must be an object!");
  }
  if (typeof secretKey !== "string") {
    throw new Error("Token secretKey is must be a string value!");
  }
  if (typeof expireTime !== "string") {
    throw new Error("Token Expire time must be a string!");
  }

  try {
    const token = jwt.sign(tokenData, secretKey, {
      expiresIn: expireTime
    });
    return token;
  } catch (error) {
    throw Error(error);
  }
};

const verifyJsonWebToken = (token, jwtSecretKey) => {
  try {
    const data = jwt.verify(token, jwtSecretKey);
    if (data) {
      return data;
    }
    throw Error("Token verify not successful");
  } catch (error) {
    throw error;
  }
};

const createRefreshToken = (res, user) => {
  try {
    const affiliate = jwt.sign(user, refreshTokenKey, { expiresIn: "15d" });
    res.cookie("affiliate", affiliate, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "none"
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createJsonWebToken,
  verifyJsonWebToken,
  createRefreshToken
};
