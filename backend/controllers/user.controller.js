const bcrypt = require("bcryptjs");

const sendVerificationEmail = require("../helper/sendVerificationEmail");
const User = require("../models/User");
const generateReferralCode = require("../helper/referGenerator");
const { walletCreater, walletCreatorTron } = require("../helper/walletCreater");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"]
      }
    });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteSingleUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    await user.destroy();
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    next(error);
  }
};

const deleteAllUsers = async (req, res, next) => {
  try {
    await User.destroy({ where: {} });
    res.status(200).json({ msg: "All users deleted" });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  const { email, password, username, refCode } = req.body;
  console.log(req.body);
  try {
    // Check if user already exists
    let user = await User.findOne({ where: { email } });

    if (user?.verified) {
      res.status(400).json({ msg: "User already exists" });
    }

    if (user && !user.verified) {
      await user.destroy();
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const emailData = {
      email,
      subject: "Welcome to Profit Link - Start Earning Today!",
      html: `
    <div style="font-family: 'Lemonada', Arial, sans-serif; background-color: #f0f4f8; color: #333; padding: 40px 20px; border-radius: 10px; max-width: 600px; margin: auto;">
      <div style="text-align: center; padding-bottom: 20px;">
        <img src="https://i.ibb.co.com/cJvmZL6/Screenshot-2024-10-26-at-2-27-28-PM-removebg-preview-1.png" alt="Profit Link" style="width: 150px;"/>
      </div>
      <h2 style="color: #02C2A7; text-align: center; font-size: 28px;">Welcome, ${username}!</h2>
      
      <p style="font-size: 18px; line-height: 1.6; text-align: center; margin: 20px 0;">
        Congratulations! 🎉 You’re now part of Profit Link, where your money can grow while you relax! Get ready to unlock exciting earning opportunities and maximize your rewards through our referral program.
      </p>
      
      <div style="padding: 20px; background-color: #fff; border: 2px solid #02C2A7; border-radius: 8px; margin: 20px auto; max-width: 500px; text-align: center;">
        <h3 style="color: #02C2A7; font-size: 24px; margin-bottom: 10px;">Verify Your Email</h3>
        <p style="font-size: 16px; color: #666;">To complete your registration, please enter the code below:</p>
        <div style="padding: 15px 0; margin: 10px 0;">
          <h3 style="color: #02C2A7; font-size: 32px; margin: 0; font-weight: bold; letter-spacing: 2px;">${verificationCode}</h3>
        </div>
      </div>
      
      <p style="font-size: 18px; text-align: center; line-height: 1.6; margin: 20px 0;">
        To kick things off, please verify your email and activate your account. Let’s embark on this profitable journey together!
      </p>

      <div style="text-align: center; padding-top: 20px;">
        <p style="font-size: 16px; color: #999;">Cheers to your success,</p>
        <h3 style="color: #02C2A7; font-weight: bold; font-size: 24px; margin: 10px 0;">The Profit Link Team</h3>
      </div>
      <div style="text-align: center; padding-top: 30px;">
        <p style="font-size: 12px; color: #aaa;">© 2024 Profit Link. All rights reserved.</p>
      </div>
    </div>
  `
    };

    // Send verification email
    await sendVerificationEmail(emailData);
    const wallet = walletCreater();
    console.log(wallet);

    const tronWallet = walletCreatorTron();
    console.log(tronWallet);

    // Create a new user
    user = await User.create({
      email,
      password: hashedPassword,
      username,
      verificationCode,
      referCode: generateReferralCode(12),
      depositAmount: 0,
      publicKey: wallet.publicKey,
      privateKey: wallet.privateKey,
      publicKeyTrc20: tronWallet.publicAddress,
      privateKeyTrc20: tronWallet.privateKey,
      referer: refCode
    });

    // Update refer count of the referer
    if (refCode) {
      const refererUser = await User.findOne({ where: { referCode: refCode } });

      if (refererUser) {
        refererUser.referCount += 1;
        await refererUser.save();
      }
    }

    res.status(200).json({ msg: "User registered. Verification email sent." });
  } catch (err) {
    next(err);
  }
};

const verifyUser = async (req, res, next) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.verificationCode !== code) {
      return res.status(400).json({ msg: "Invalid verification code" });
    }

    // Update user to be verified
    user.verified = true;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({ msg: "User verified successfully" });
  } catch (err) {
    next(err);
  }
};

const resendSignUpValidationCode = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.verified) {
      return res.status(400).json({ msg: "This account is already verified." });
    }

    // Rate limit check (optional, e.g., 1-minute)
    const now = new Date();
    const lastResendTime = user.lastResendTime || new Date(0);
    const timeDifference = (now - lastResendTime) / 1000 / 60;

    if (timeDifference < 1) {
      return res
        .status(429)
        .json({ msg: "Please wait before requesting a new code." });
    }

    const newVerificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.verificationCode = newVerificationCode;
    user.lastResendTime = now;
    await user.save();

    // Send the new verification code
    await sendVerificationEmail(email, newVerificationCode);

    res
      .status(200)
      .json({ msg: "A new verification code has been sent to your email." });
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user && !user.verified) {
      return res.status(400).json({ msg: "You are not authenticated!!" });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationCode = resetCode;
    await user.save();

    const emailData = {
      email,
      subject: "Reset Your Password - Let’s Get You Back on Track!",
      html: `
      <div style="font-family: 'Lemonada', Arial, sans-serif; background-color: #f0f4f8; color: #333; padding: 40px 20px; border-radius: 10px; max-width: 600px; margin: auto;">
      <div style="text-align: center; padding-bottom: 20px;">
        <img src="https://i.ibb.co.com/cJvmZL6/Screenshot-2024-10-26-at-2-27-28-PM-removebg-preview-1.png" alt="Profit Link" style="width: 150px;"/>
      </div>
      <h2 style="color: #02C2A7; text-align: center; font-size: 28px;">Hey, ${user.username}!</h2>
      
      <p style="font-size: 18px; line-height: 1.6; text-align: center; margin: 20px 0;">
        Need a little help? No problem! If you've forgotten your password, click the link below to reset it and continue your journey with Profit Link.

      </p>
      
      <div style="padding: 20px; background-color: #fff; border: 2px solid #02C2A7; border-radius: 8px; margin: 20px auto; max-width: 500px; text-align: center;">
        <h3 style="color: #02C2A7; font-size: 24px; margin-bottom: 10px;">Reset Password Code</h3>
      
        <div style="padding: 15px 0; margin: 10px 0;">
          <h3 style="color: #02C2A7; font-size: 32px; margin: 0; font-weight: bold; letter-spacing: 2px;">${resetCode}</h3>
        </div>
      </div>
      
      <p style="font-size: 18px; text-align: center; line-height: 1.6; margin: 20px 0;">
        We’re here to support you every step of the way!


      </p>

      <div style="text-align: center; padding-top: 20px;">
        <h3 style="color: #02C2A7; font-weight: bold; font-size: 24px; margin: 10px 0;">The Profit Link Team</h3>
      </div>
      
      <div style="text-align: center; padding-top: 30px;">
        <p style="font-size: 12px; color: #aaa;">© 2024 Profit Link. All rights reserved.</p>
      </div>
    </div>
      `
    };

    // Send the reset code
    await sendVerificationEmail(emailData);

    res.status(200).json({ msg: "Reset code sent to your email" });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ msg: "Invalid reset code" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({ msg: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  verifyUser,
  resendSignUpValidationCode,
  forgotPassword,
  resetPassword,
  getAllUsers,
  deleteSingleUser,
  deleteAllUsers
};
