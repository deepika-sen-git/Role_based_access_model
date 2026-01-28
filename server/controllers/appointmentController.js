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
    // const userId = req.user._id; 
    const userRole = req.user.role; 
    let appointments = []; 
    if (userRole==="patient") {
      appointments = await Appointment.find()
      .populate("doctorId", "name email").sort({appointmentDate: -1})
    }
    else if(userRole === "doctor"){
      appointments = await Appointment.find()
      .populate("patientId", "name email").sort({appointmentDate: 1})
    }

    res.status(200).json({success: true, data: appointments}); 
  } catch (error) {
    res.status(500).json({success: false, message: error.message }); 
  }
}
