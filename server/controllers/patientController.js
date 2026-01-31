const Patient = require("../models/Patient");
const sendEmail = require("../utils/sendEmail");

exports.patientController = async (req, res) => {
  try {
    const { medicalHistory, age, gender, address, nationality } = req.body;
    if ((!medicalHistory, !age, !gender, !address, !nationality)) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }
    const userId = req.user._id;
    console.log(userId);

    const isExist = await Patient.findOne({ userId });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "patient profile already exists.",
      });
    }
    const newpatient = await Patient.create({
      userId,
      medicalHistory,
      age,
      gender,
      address,
      nationality,
    });
<<<<<<< HEAD
=======
    sendEmail(); 
>>>>>>> 89c79fbe74d90051ace302469bf8ef3a331e88b1
    res.status(201).json({
      success: true,
      message: "patient profile created successfully",
      patient: newpatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 89c79fbe74d90051ace302469bf8ef3a331e88b1
