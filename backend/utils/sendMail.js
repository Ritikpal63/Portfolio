import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS?.replace(/\s+/g, "");

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error("SMTP config missing EMAIL_USER or EMAIL_PASS.");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },

  tls: {
    servername: "smtp.gmail.com",
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Ready");
  }
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
