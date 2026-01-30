const Doctor = require("../models/Doctor");


exports.doctorController = async (req, res) => {
    try {
        const {specialization, degree, availableDays, slots, fees } = req.body; 
        if (!specialization, !degree, !availableDays, !slots, !fees) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }
        const userId = req.user._id; 
        console.log(userId);
        

        const isExist = await Doctor.findOne({userId}); 
        if (isExist) {
            return res.status(400).json({
                success: false, 
                message: "Doctor profile already exists."
            })
        }
        const newDoctor= await Doctor.create({
            userId, 
            specialization, 
            degree, 
            availableDays, 
            slots, 
            fees
        })
        res.status(201).json({
            success: true, 
            message: "Doctor profile created successfully", 
            doctor: newDoctor
        })

    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}