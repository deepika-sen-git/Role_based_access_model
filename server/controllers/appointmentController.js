const Patient = require("../models/Patient");

exports.bookAppointments = async (req, res) => {
    try {
        const {doctorId, appointmentDate, slot, reason} = req.body; 
        if (!doctorId, !appointmentDate, !slot) {
            return res.status(400).json({
                success: false, 
                message: "all fields are required"
            })
        }
        const userId = req.user._id;
        const patient = await Patient.findOne({userId}); 
        if (!patient) {
            return res.status(404).json({message: ""})
        }

    } catch (error) {
        
    }
}