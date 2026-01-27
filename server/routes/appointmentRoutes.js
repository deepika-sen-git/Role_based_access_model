const express = require("express");
// const { profileController } = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");
const { doctorController } = require("../controllers/doctorController");

const appointmentRoute = express.Router();

appointmentRoute.post("/book", authMiddleware, bookAppointment);
appointmentRoute.get("/my-appointments", authMiddleware, getMyAppointments);
appointmentRoute.put("/status", authMiddleware, bookAppointment);


module.exports = appointmentRoute;