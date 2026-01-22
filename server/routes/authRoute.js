const { registerController, loginController } = require("../controllers/authController");


const express = require("express");

const Router = express.Router();

Router.post("/register", registerController);
Router.post("/login", loginController);

module.exports = Router;