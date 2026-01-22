const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");


const registerController =async (req, res) => {
     try {
         const {name, phone, email, date, time, role, password} = req.body;
    console.log({name, phone, email, date, time, role, password});

    const userFound = await User.findOne({email});
    if(userFound){
       return res.json({
            message:"User already exists with this email"
        });
    };
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({name, phone, email, date, time, role, password:hashedPassword});

    const token = generateToken(user._id);


res.json({
    message:"User created successfully",
    user,
    token,
    success:true
})
     } catch (error) {
        res.json({
            error:error.message
        })
     }
}

const loginController =async (req, res) => {
   try {
       const {email, password} = req.body;
    console.log({email, password});

    const user =await User.findOne({email});

    if(!user){
       return res.json({
            message: "User does not exist, please register first"
        })
    }

    const isMatched = await bcrypt.compare(password, user.password);
        
    if(!isMatched){
        return res.json({
            message: "Invalid Password"
        })
    }

const token = generateToken(user._id);

res.json({
  message:"Login Successful",
  user,
  token,
  success:true
})
   } catch (error) {
     res.json({
            error:error.message
        })
   }
}

module.exports = {registerController, loginController}