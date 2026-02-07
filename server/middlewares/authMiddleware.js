const jwt = require("jsonwebtoken");
const User = require("../models/User")
const authMiddleware =async (req, res, next) => {
    let token;
    // console.log("req.headers", req.headers);
    
    if(req.headers.authorization  && req.headers.authorization.startsWith('Bearer')){
       try {
        token = req.headers.authorization.split(" ")[1];
        console.log("token", token);

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(verifiedToken.id, "verifiedToken.   id");
        const user = await User.findById({_id:verifiedToken.id}).select("-password");
        console.log(user);
        req.user = user;
        next();

       } catch (error) {
        return res.json({
            message:error.message
        })
       }
        
    }
    if(!token){
        res.json({
            success: false, 
            message:"Token Not Present"
        })
    }
}

module.exports = authMiddleware;