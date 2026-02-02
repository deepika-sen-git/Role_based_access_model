const OTPModel = require("../models/otp");
const User = require("../models/User");
const { generateOTP } = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.user._id;

    const user = await User.findOne({_id:userId, email});
    console.log(user, "user");

    if (!user) {
      return res.json({
        message: "User does not exist, please register first",
      });
    }

    const otp = generateOTP();

    const hashedOTP = await bcrypt.hash(otp, 10);

    const otpObject = await OTPModel.create({
      email,
      otp:hashedOTP,
      createdAt: Date.now(),
    });
    console.log(otpObject);

    const subject = "This is from hospital appointment system";

    const html = `
            <h1>OTP for hospital appointment system</h1>
            <p>OTP: ${otp}</p>
            `;

    sendEmail(email, subject, html);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userId = req.user._id;

    const user = await User.findOne({_id:userId, email});
    console.log(user, "user");

    if (!user) {
      return res.json({
        message: "User does not exist, please register first",
      });
    }

    const savedOTP = await OTPModel.findOne({email});

    console.log(savedOTP, "savedOTP");
    const isMatched = await bcrypt.compare(otp, savedOTP.otp);

    if(isMatched){
      res.json({
        success:true,
        message:"OTP verified successfully"
      })
    }
    else{
      res.json({
         success:false,
        message:"Invalid OTP"
      })
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports = { sendOTP, verifyOTP };
