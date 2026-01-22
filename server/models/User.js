const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String
    }, 
    phone:{
        type:String
    }, 
     password:{
        type:String
    },email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },  date:{
        type:Date
    },  time:{
        type:String
    },  role:{
        type:String,
        enum:['patient', 'doctor']
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;