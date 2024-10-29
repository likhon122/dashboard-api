const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "mail.profit-link.io",
  port: 587, // or 465 if needed
  secure: false, // Use `true` for port 465, `false` for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

const sendVerificationEmail = async (emailData = {}) => {
  try {
    const mailOption = {
      from: process.env.EMAIL_USER, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html
    };
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log("Error is occurred from sendWithNodeMailer Function", error);
    throw error;
  }
};

module.exports = sendVerificationEmail;
