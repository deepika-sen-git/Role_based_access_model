const express = require("express");
const { profileController } = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");
const { doctorController } = require("../controllers/doctorController");
const { patientController } = require("../controllers/patientController");

const userRouter = express.Router();

userRouter.get("/user", authMiddleware, profileController);
userRouter.post("/doctor-detail", authMiddleware, doctorController)
userRouter.post("/patient-detail", authMiddleware, patientController)


module.exports = userRouter;