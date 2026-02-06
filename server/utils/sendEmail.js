// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject, html) => {
//   try {
//     if (!to || !subject || !html) {
//       res.status(400).json({
//         message: "Missing required email fields",
//       });
//     }
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });

//     const mailOption = {
//       from: `Hospital Appointment <jayashpal3@gmail.com>`,
//       to,
//       subject,
//       html,
//     };

//     transporter.sendMail(mailOption);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = sendEmail;
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    if (!to || !subject || !html) {
      throw new Error("Missing required email fields");
    }

    const msg = {
      to,
      from: {
        name: "Hospital Appointment",
        email: "wddeepikasen@gmail.com"
      },
      subject,
      html
    };

    await sgMail.send(msg);
    console.log("Email sent successfully ✅");

  } catch (error) {
    console.error("SendGrid Error ❌", error.message);
  }
};

module.exports = sendEmail;
