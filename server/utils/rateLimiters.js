const rateLimit = require("express-rate-limit"); 

const sendOtpLimiter = rateLimit({
    windowMs: 10*60*1000, 
    max: 3, 
    message: "Too many otp attempts. Please try again in 10 minutes."
})

module.exports = {
    sendOtpLimiter
}