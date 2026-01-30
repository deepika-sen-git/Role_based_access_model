const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  slot: {
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled", "completed"],
    default: "pending",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;