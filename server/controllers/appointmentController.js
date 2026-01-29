const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

exports.bookAppointments = async (req, res) => {
  try {
    const { doctorId, appointmentDate, slot, reason } = req.body;
    if (!doctorId || !appointmentDate || !slot) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const userId = req.user._id;
    const patient = await Patient.findOne({ userId });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      slot,
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "Slot already booked",
      });
    }
    const appointment = await Appointment.create({
      doctorId,
      patientId: patient._id,
      appointmentDate,
      fees: doctor.fees,
      slot,
      reason,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "name email")
      .lean(); 

    const formattedDoctors = doctors.map((doc) => {
      const { userId, ...rest } = doc;

      return {
        ...rest,
        user: userId, 
      };
    });

    res.status(200).json({
      success: true,
      doctors: formattedDoctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const userId = req.user._id; 
    const userRole = req.user.role; 

    let appointments = []; 
    if (userRole==="patient") {
      const patient = await Patient.findOne({userId}); 
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: "patient not found"
        })
      }
      appointments = await Appointment.find({patientId: patient._id})
      .populate({
        path: "doctorId", 
        populate: {path: "userId", select: "name email" }
      }).sort({appointmentDate: -1})
    }
    else if(userRole === "doctor"){
      const doctor = await doctor.findOne({userId}); 
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: "doctor not found"
        })
      }
      appointments = await Appointment.find({doctorId: doctor._id})
       .populate({
        path: "patientId", 
        populate: {path: "userId", select: "name email" }
      }).sort({appointmentDate: 1})
    }

    res.status(200).json({success: true, data: appointments}); 
  } catch (error) {
    res.status(500).json({success: false, message: error.message }); 
  }
}

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { role, _id: userId } = req.user;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // PATIENT RULES
    if (role === "patient") {
      if (status !== "cancelled") {
        return res.status(403).json({
          success: false,
          message: "Patient can only cancel appointment",
        });
      }

      const patient = await Patient.findOne({ userId });
      if (!patient || appointment.patientId.toString() !== patient._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this appointment",
        });
      }
    }

    // DOCTOR RULES
    if (role === "doctor") {
      const allowed = ["approved", "cancelled"];
      if (!allowed.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      const doctor = await Doctor.findOne({ userId });
      if (!doctor || appointment.doctorId.toString() !== doctor._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this appointment",
        });
      }
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
