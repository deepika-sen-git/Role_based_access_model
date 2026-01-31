const mongoose = require("mongoose");

const OTPschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 300,
  },
});

const OTPModel = mongoose.model("OTP", OTPschema);

module.exports = OTPModel;
