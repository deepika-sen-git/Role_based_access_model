const express = require("express");
const { profileController } = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");
const { doctorController } = require("../controllers/doctorController");
const { patientController } = require("../controllers/patientController");
const { uploadImage } = require("../controllers/uploadController");
const upload = require("../middlewares/upload");

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, profileController);
userRouter.post("/doctor-detail", authMiddleware, doctorController);
userRouter.post("/patient-detail", authMiddleware, patientController);

// image upload route
userRouter.post(
  "/upload",         // optional but recommended
  upload.single("image"),  // key must match frontend
  uploadImage
);

module.exports = userRouter;
