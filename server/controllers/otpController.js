const User = require("../models/User");
const { generateOTP } = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const TempUser = require("../models/TempUser");
const generateToken = require("../utils/generateToken");
const { createUser } = require("../services/userService");
const OTPModel = require("../models/Otp");

const sendOTP = async (email) => {
  try {
    // const userId = req.user._id;

    // console.log(user, "user");

    // if (!user) {
    //   return res.json({
    //     message: "User does not exist, please register first",
    //   });
    // }

    const otp = generateOTP();

    const hashedOTP = await bcrypt.hash(otp.toString(), 10);
    const otpObject = await OTPModel.findOne({ email });

    if (otpObject) {
      otpObject.otp = hashedOTP;

      await otpObject.save();
    } else {
      await OTPModel.create({
        email,
        otp: hashedOTP,
        createdAt: Date.now(),
      });
    }

    const subject = "This is from hospital appointment system";

    const html = `
            <h1>OTP for hospital appointment system</h1>
            <p>OTP: ${otp}</p>
            `;

    sendEmail(email, subject, html);

    // res.status(200).json({
    //   success: true,
    //   message: "OTP sent successfully",
    // });
  } catch (error) {
    // res.json({
    //   error: error.message,
    // });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      return res.status(404).json({
        success: false,
        message: "User does not exist, please register first",
      });
    }

    const savedOTP = await OTPModel.findOne({ email }).sort({ createdAt: -1 });
    if (!savedOTP) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }

    const OTP_EXPIRY_TIME = 60 * 1000;
    const expiryTime = savedOTP.createdAt.getTime() + OTP_EXPIRY_TIME;

    if (Date.now() > expiryTime) {
      await savedOTP.deleteOne();
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const isMatched = await bcrypt.compare(otp, savedOTP.otp);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await savedOTP.deleteOne();

    const user = await User.create({
      name: tempUser.name,
      email: tempUser.email,
      role: tempUser.role,
      password: tempUser.password,
    });

    await tempUser.deleteOne();

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "OTP verified and user created successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { sendOTP, verifyOTP };
