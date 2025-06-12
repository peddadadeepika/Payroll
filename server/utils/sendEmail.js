// utils/sendEmail.js
import nodemailer from "nodemailer";


const sendEmail = async (email, otp) => {
  try {
    const isSecure = parseInt(process.env.SMTP_PORT, 10) === 465;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: isSecure, // Use true for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Your OTP Code",
  text: `Your verification code is: ${otp}`,
};

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
     

    console.log("SMTP Host:", process.env.SMTP_HOST);
console.log("SMTP Port:", process.env.SMTP_PORT);

    console.log("Sending email to:", email, "with OTP:", otp);

  } catch (err) {
    console.error("Error sending email:", err.message);
    throw new Error("Failed to send OTP email");
  }
};
 

export default sendEmail;
