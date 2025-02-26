const nodemailer = require("nodemailer");

exports.sendOtpEmail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com", // Use Hostinger's SMTP server
        port: process.env.EMAIL_PORT, // Use 587 for TLS or 465 for SSL
        secure: true,
        auth: { user: process.env.COMPANY_EMAIL, pass: process.env.COMPANY_EMAIL_PASSWORD },
    });

    await transporter.sendMail({
        from: process.env.COMPANY_EMAIL,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });
};

