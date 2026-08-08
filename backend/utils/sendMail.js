import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS?.replace(/\s+/g, "");

if (!EMAIL_USER) {
  console.error("❌ EMAIL_USER is missing");
}

if (!EMAIL_PASS) {
  console.error("❌ EMAIL_PASS is missing");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  family: 4,

  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },

  tls: {
    servername: "smtp.gmail.com",
    minVersion: "TLSv1.2",
  },

  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
});

const sendMail = async ({ name, email, subject, message }) => {
  const normalizedSubject =
    subject?.trim() || "New contact message";

  const htmlMessage = `
    <h2>Someone contacted you</h2>

    <p>
      <strong>Name:</strong> ${name}
    </p>

    <p>
      <strong>Email:</strong> ${email}
    </p>

    <p>
      <strong>Subject:</strong> ${normalizedSubject}
    </p>

    <p>
      <strong>Message:</strong>
    </p>

    <p>${message}</p>
  `;

  const replyMessage = `
    <h2>Hi ${name},</h2>

    <p>
      Thanks for contacting me.
    </p>

    <p>
      I have received your message and will reply soon.
    </p>

    <br />

    <p>Regards,</p>
    <p><strong>Ritik Pal</strong></p>
  `;

  // Email to portfolio owner
  await transporter.sendMail({
    from: `"Portfolio Contact" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    replyTo: email,
    subject: `New Contact Form: ${normalizedSubject}`,
    html: htmlMessage,
  });

  // Auto-reply to visitor
  await transporter.sendMail({
    from: `"Ritik Pal Portfolio" <${EMAIL_USER}>`,
    to: email,
    subject: "Thanks for contacting me",
    html: replyMessage,
  });

  console.log("✅ Both emails sent successfully");
};

export default sendMail;
