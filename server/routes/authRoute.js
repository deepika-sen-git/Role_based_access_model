const { registerController, loginController } = require("../controllers/authController");
const { sendOTP, verifyOTP } = require("../controllers/otpController");

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const Router = express.Router();

Router.post("/register", registerController);
Router.post("/login", loginController);
Router.post("/send-otp",authMiddleware,  sendOTP);
Router.post("/verify-otp", authMiddleware, verifyOTP);

module.exports = Router;