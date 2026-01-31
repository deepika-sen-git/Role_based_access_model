const nodemailer = require("nodemailer")

const sendEmail = async (to, subject, html) => {
    try {
        if(!to || !subject || !html){
            res.status(400).json({
                message: "Missing required email fields"
            })
        }
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: "jayashpal3@gmail.com", 
                pass: "xbiqmglvfcwktype"
            }
        }); 

        const mailOption = {
            from: `Hospital Appointment <jayashpal3@gmail.com>`, 
            to, 
            subject, 
            html
        }

        transporter.sendMail(mailOption); 
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = sendEmail; 
