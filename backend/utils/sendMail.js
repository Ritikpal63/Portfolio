import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // 465 ke liye true hota hai
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async ({ name, email, subject, message }) => {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,

    subject: `New Contact Form: ${subject}`,

    html: `
      <h2>Someone contacted you</h2>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Subject:</strong> ${subject}</p>

      <p><strong>Message:</strong></p>

      <p>${message}</p>
    `,
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thanks for contacting me",
    html: `
      <h2>Hi ${name},</h2>

      <p>Thanks for contacting me.</p>

      <p>I have received your message and will reply soon.</p>

      <br>

      <p>Regards,</p>
      <p>Ritik Pal</p>
    `,
  });
};

export default sendMail;
