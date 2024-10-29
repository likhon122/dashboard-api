const bcrypt = require("bcryptjs");

const {
  verifyJsonWebToken,
  createRefreshToken
} = require("../helper/jsonWebToken");
const User = require("../models/User");
const { refreshTokenKey } = require("../secret");

const verifyUser = async (req, res, next) => {
  try {
    const affiliate = req.cookies?.affiliate;

    if (!affiliate) {
      return res.status(401).send({ msg: "Token Not found. Please login." });
    }

    const existUser = verifyJsonWebToken(affiliate, refreshTokenKey);

    if (!existUser) {
      return res.status(401).send({ msg: "Token verification failed!" });
    }

    const userInDB = await User.findOne({ where: { email: existUser.email } });

    if (!userInDB) {
      return res.status(404).send({ msg: "User not found." });
    }

    // Directly use the userInDB without toObject()
    const user = userInDB.get();
    delete user.password;

    res.status(200).send({ msg: "User found successfully.", user });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userObj = await User.findOne({ where: { email } });

    if (!userObj) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!userObj.verified) {
      return res.status(400).json({ msg: "Please verify your account" });
    }

    const isMatch = await bcrypt.compare(password, userObj.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Email or password is not matched!!" });
    }

    createRefreshToken(res, { id: userObj.id, email: userObj.email });

    const user = userObj.get();

    delete user.password;

    res.status(200).json({ msg: "Logged in successfully", user });
  } catch (error) {
    next(error);
  }
};

const logOutUser = async (req, res, next) => {
  try {
    res.clearCookie("affiliate", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    res.status(200).send({ msg: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyUser, loginUser, logOutUser };
