const nodemailer = require("nodemailer");

const sendEmail =async (to, subject, html) => {
try {
    if(!to || !subject|| !html){
        console.log("required fields absent");
    }
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"deepika2501004@gmail.com",
            pass:"lfzzfdzpzyelzrak"
        }
    })

    const mailOption = {
        from:"<deepika2501004@gmail.com>",
        to,
        subject,
        html
    };

    transporter.sendMail(mailOption);
} catch (error) {
    console.log(error.message);
}

}

module.exports = sendEmail