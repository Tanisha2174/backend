const nodemailer = require("nodemailer");

const sendResetEmail = async (email, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com", // Use Hostinger's SMTP server
      port: process.env.EMAIL_PORT, // Use 587 for TLS or 465 for SSL
      secure: true, // Can be 'gmail', 'outlook', etc.
      auth: {
        user: process.env.COMPANY_EMAIL, // Your email
        pass: process.env.COMPANY_EMAIL_PASSWORD, // Your email app password
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" style="background: #462A03; color: #FFE5C0; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendResetEmail;
