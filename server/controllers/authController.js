const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const TempUser = require("../models/TempUser");
const { sendOTP } = require("./otpController");

// register --> temp User create(unverified) --> sendOTP --> verify OTP --> User create(verified)

const registerController = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    if ((!name, !email, !role, !password)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    console.log({ name, email, role, password });

    const tempUserFound = await TempUser.findOne({ email });
    if (tempUserFound) {
      sendOTP(email);
      return res.json({
        message: "User already registered with this email, please verify user",
      });
    }

    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.json({
        message: "User already exists with this email, please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const user = await User.create({
    //   name,
    //   email,
    //   role,
    //   password: hashedPassword,
    // });

    const tempUser = await TempUser.create({
      name,
      email,
      role,
      password: hashedPassword,
    });
    sendOTP(email);

    // const token = generateToken(user._id);

    // res.json({
    //   message: "User created successfully",
    //   user,
    //   token,
    //   success: true,
    // });

    res.json({
      message: "User registered successfully, OTP sent to your registered email",
      user: tempUser,
      // token,
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });

    const user = await User.findOne({ email });
    console.log(user, "user");

    if (!user) {
      return res.json({
        message: "User does not exist, please register first",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.json({
        message: "Invalid Password",
      });
    }

    const token = generateToken(user._id);

    const subject = "This is hospital appointment system";

    const html = `
            <h1>Welcome to our app</h1>
            <p>this is very good app build by doraemon</p>
            `;

    // sendEmail(email, subject, html);
    res.json({
      message: "Login Successful",
      user,
      token,
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

// const createUser = async (tempUser) => {
//  try {
//    const user = await User.create({
//     name: tempUser.name,
//     email: tempUser.email,
//     role: tempUser.role,
//     password: tempUser.password,
//   });

//   // res.json({
//     //   message: "User created successfully",
//     //   user,
//     //   token,
//     //   success: true,
//     // });
//     return user;
//  } catch (error) {
//   console.log(error.message);
  
//  }
// };

module.exports = { registerController, loginController };
