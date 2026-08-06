import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS?.replace(/\s+/g, "");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY?.trim();

if (!EMAIL_USER) {
  console.error("Email config missing EMAIL_USER.");
}
if (!EMAIL_PASS && !SENDGRID_API_KEY) {
  console.error("Missing EMAIL_PASS or SENDGRID_API_KEY.");
}

let transporter;
if (!SENDGRID_API_KEY) {
  transporter = nodemailer.createTransport({
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

  transporter.verify((error) => {
    if (error) {
      console.log("SMTP Error:", error);
    } else {
      console.log("SMTP Ready");
    }
  });
}

const sendViaSendGrid = async ({ to, subject, html }) => {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: to }],
          subject,
        },
      ],
      from: { email: EMAIL_USER, name: "Portfolio Contact" },
      content: [{ type: "text/html", value: html }],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`SendGrid error ${response.status}: ${body}`);
  }
};

const sendMail = async ({ name, email, subject, message }) => {
  const normalizedSubject = subject || "New contact message";
  const htmlMessage = `
    <h2>Someone contacted you</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${normalizedSubject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  const replyMessage = `
    <h2>Hi ${name},</h2>
    <p>Thanks for contacting me.</p>
    <p>I have received your message and will reply soon.</p>
    <br/>
    <p>Regards,</p>
    <p>Ritik Pal</p>
  `;

  if (SENDGRID_API_KEY) {
    await sendViaSendGrid({
      to: EMAIL_USER,
      subject: `New Contact Form: ${normalizedSubject}`,
      html: htmlMessage,
    });

    await sendViaSendGrid({
      to: email,
      subject: "Thanks for contacting me",
      html: replyMessage,
    });
    return;
  }

  if (!transporter) {
    throw new Error("No email transporter configured.");
  }

  await transporter.sendMail({
    from: `"Portfolio Contact" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    subject: `New Contact Form: ${normalizedSubject}`,
    html: htmlMessage,
  });

  await transporter.sendMail({
    from: EMAIL_USER,
    to: email,
    subject: "Thanks for contacting me",
    html: replyMessage,
  });
};

export default sendMail;
