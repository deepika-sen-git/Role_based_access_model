const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "email is required"]
  },
  role: {
    type: String,
    enum: ["patient", "doctor"],
    required: [true, "role is required"]
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
