const jwt = require("jsonwebtoken");
const User = require("../models/User")
const authMiddleware =async (req, res, next) => {
    let token;
    if(req.headers.Authorization  && req.headers.Authorization.startsWith('Bearer')){
       try {
         token = req.headers.Authorization.split(" ")[1];

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(verifiedToken.id);
        const user = await User.findById({_id:verifiedToken.id});
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
            message:"Token Not Present"
        })
    }
}

module.exports = authMiddleware;