const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { bookAppointments, getAllDoctors, getAppointments, updateAppointmentStatus } = require("../controllers/appointmentController");

const appointmentRoute = express.Router();

appointmentRoute.post("/book", authMiddleware, bookAppointments);
appointmentRoute.get("/my-appointments", authMiddleware, getAppointments);
appointmentRoute.patch("/status/:id", authMiddleware, updateAppointmentStatus);
appointmentRoute.get("/getDoctors", authMiddleware, getAllDoctors);

module.exports = appointmentRoute;