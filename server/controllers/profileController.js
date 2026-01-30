const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const profileController = async(req, res) => {
   try {
     const userId = req.user._id;
     const role = req.user.role; 
     let result = {}
     if (role==="patient") {
        result = await Patient.findOne({userId})
        .populate("userId", "name email")
     }
     else if(role==="doctor"){
        result = await Doctor.findOne({userId})
        .populate("userId", "name email")
     }
    res.status(200).json({
        success:true,
        message:"User details fetched sucessfully",
        result,
    })

   } catch (error) {
    res.json({
        message:error.message
    })
   }
}
module.exports = {profileController};