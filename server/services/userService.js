const User = require("../models/User");

const createUser = async (tempUser) => {
  try {
    const user = await User.create({
      name: tempUser.name,
      email: tempUser.email,
      role: tempUser.role,
      password: tempUser.password,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser };
