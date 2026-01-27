const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //  reference
  },
  specialization: {
    type: String,
  },
  degree: {
    type: String,
  },
  availableDays: {
    type: [String],
    default: [],
  },
  slots: {
    type: [
      {
        startTime: {
          type: String,
        },
        endTime: {
          type: String,
        },
      },
    ],
  },
  fees: {
    type: Number,
    min: 0,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
