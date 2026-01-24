const express = require("express");
const { profileController } = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.get("/user", authMiddleware, profileController);

module.exports = userRouter;