const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", // Use Hostinger's SMTP server
  port: process.env.EMAIL_PORT, // Use 587 for TLS or 465 for SSL
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.COMPANY_EMAIL, // Your Hostinger email
    pass: process.env.COMPANY_EMAIL_PASSWORD, // Your Hostinger email password
  },
});

const sendEmail = async (to, subject, text, attachments) => {
  try {
    console.log(process.env.COMPANY_EMAIL);
    console.log(process.env.COMPANY_EMAIL_PASSWORD);
    console.log(to, subject, text, attachments);

    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to,
      subject,
      text,
      attachments,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
