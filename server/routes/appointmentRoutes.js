const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { bookAppointments, getAllDoctors } = require("../controllers/appointmentController");

const appointmentRoute = express.Router();

appointmentRoute.post("/book", authMiddleware, bookAppointments);
// appointmentRoute.get("/my-appointments", authMiddleware, getMyAppointments);
// appointmentRoute.put("/status", authMiddleware, bookAppointment);
appointmentRoute.get("/getDoctors", authMiddleware, getAllDoctors);

module.exports = appointmentRoute;
