const Contact = require("../models/Contact");
const sendEmail = require("../config/mailer");

exports.submitForm = async (req, res) => {
  try {
    const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);

    const newContact = new Contact({
      ...req.body,
      fileUrls,
    });

    await newContact.save();

    const subject = `New Contact Form Submission from ${req.body.firstName} ${req.body.lastName}`;

    const emailContent = `
      New Contact Form Submission:
      Name: ${req.body.firstName} ${req.body.lastName}
      Email: ${req.body.email}
      Phone: ${req.body.phone}
      Reason for contact: ${req.body.message}
      Attachments are included if any.
    `;

    const attachments = req.files.map((file) => ({
      filename: file.originalname,
      path: `./uploads/${file.filename}`,
    }));

    await sendEmail(process.env.SUPPORT_EMAIL, subject, emailContent, attachments);

    res.status(200).json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
