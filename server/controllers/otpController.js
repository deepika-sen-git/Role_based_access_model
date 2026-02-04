const OTPModel = require("../models/otp");
const User = require("../models/User");
const { generateOTP } = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const TempUser = require("../models/TempUser");
const generateToken = require("../utils/generateToken");
const { createUser } = require("../services/userService");

const sendOTP = async (email) => {
  try {
    // const userId = req.user._id;

    const tempUser = await TempUser.findOne({ email });
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
    // const userId = req.user._id;

    // const user = await User.findOne({ _id: userId, email });
    const tempUser = await TempUser.findOne({ email });
    console.log(tempUser, "user");

    if (!tempUser) {
      return res.json({
        message: "User does not exist, please register first",
      });
    }

    const savedOTP = await OTPModel.findOne({ email });

    console.log(savedOTP, "savedOTP");
    if (!savedOTP) {
  return res.json({
    success: false,
    message: "OTP expired or not found",
  });
}

    const isMatched = await bcrypt.compare(otp, savedOTP.otp);

    if (isMatched) {
      await savedOTP.deleteOne();
      console.log(createUser, "createUser");
      
      const user = await createUser(tempUser);
       await TempUser.deleteOne({ email });
      const token = generateToken(user._id);
      
      res.json({
        success: true,
        message: "OTP verified successfully and User created successfully",
        // message: "User created successfully",
        user,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports = { sendOTP, verifyOTP };
