const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //  reference
  },
  medicalHistory: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender:{
    type:String,
    enum:["male", "female", "other"],
  },
  address:{
    type:String
  },
  nationality:{
    type:String
  }
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
