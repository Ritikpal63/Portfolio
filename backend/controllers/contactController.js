import pool from "../config/db.js";
import sendMail from "../utils/sendMail.js";


export const submitContact = async (req, res) => {
  try {

    const {
      name,
      email,
      subject,
      message,
    } = req.body;


    console.log("===== Contact Request =====");
    console.log(req.body);


    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email aur message required hain",
      });
    }


    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please put valid email",
      });
    }


    // Save message in TiDB/MySQL
    const [result] = await pool.query(
      `
      INSERT INTO contact_messages
      (name, email, subject, message)
      VALUES (?, ?, ?, ?)
      `,
      [
        name,
        email,
        subject || null,
        message,
      ]
    );


    console.log(
      "✅ Message saved to database:",
      result.insertId
    );


    // Send emails
    await sendMail({
      name,
      email,
      subject,
      message,
    });


    console.log("✅ Email sent successfully");


    return res.status(201).json({
      success: true,
      message: "Message Sent",
      id: result.insertId,
    });


  } catch (error) {

    console.error(
      "❌ submitContact error:",
      error
    );


    return res.status(500).json({
      success: false,
      message: "Message couldn't be sent",
    });
  }
};


export const getAllMessages = async (req, res) => {

  try {

    const [rows] = await pool.query(
      `
      SELECT *
      FROM contact_messages
      ORDER BY created_at DESC
      `
    );


    return res.status(200).json({
      success: true,
      data: rows,
    });


  } catch (error) {

    console.error(
      "❌ getAllMessages error:",
      error
    );


    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

