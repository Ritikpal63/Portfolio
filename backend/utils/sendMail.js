import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "node:dns/promises";

dotenv.config();
dns.setDefaultResultOrder("ipv4first");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS?.replace(/\s+/g, "");

if (!EMAIL_USER) {
  console.error("❌ EMAIL_USER is missing");
}

if (!EMAIL_PASS) {
  console.error("❌ EMAIL_PASS is missing");
}
const result = await dns.lookup("smtp.gmail.com", {
  family: 4,
});

console.log("Gmail IPv4:", result);

const transporter = nodemailer.createTransport({
  host: "142.250.107.108",
  port: 587,
  secure: false,
  family: 4,

  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },

  tls: {
    servername: "smtp.gmail.com",
  },
});

// Verify SMTP connection
transporter
  .verify()
  .then(() => {
    console.log("✅ SMTP Ready");
  })
  .catch((error) => {
    console.error("❌ SMTP Error:", error.message);
  });

const sendMail = async ({ name, email, subject, message }) => {
  const normalizedSubject = subject?.trim() || "New contact message";

  // Email received by portfolio owner
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

  // Confirmation email to visitor
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

  // 1️⃣ Send message to portfolio owner
  await transporter.sendMail({
    from: `"Portfolio Contact" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    replyTo: email,
    subject: `New Contact Form: ${normalizedSubject}`,
    html: htmlMessage,
  });

  // 2️⃣ Send confirmation to visitor
  await transporter.sendMail({
    from: `"Ritik Pal Portfolio" <${EMAIL_USER}>`,
    to: email,
    subject: "Thanks for contacting me",
    html: replyMessage,
  });

  console.log("✅ Both emails sent successfully");
};

export default sendMail;
