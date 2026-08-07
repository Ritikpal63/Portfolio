import pool from "../config/db.js";
import sendMail from "../utils/sendMail.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log("===== Contact Request =====");
    console.log(req.body);
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email aur message required hain",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Valid email daaliye",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject || null, message],
    );

    try {
      await sendMail({
        name,
        email,
        subject,
        message,
      });
    } catch (emailError) {
      console.error("Email send failed:", emailError);
      return res.status(201).json({
        success: true,
        message: "Message saved successfully, but email notification failed.",
        id: result.id,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Message bhej diya gaya! Jaldi reply karunga.",
      id: result.insertId,
    });
  } catch (error) {
    console.error("submitContact error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error, thodi der baad try karo",
    });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC",
    );
    return res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("getAllMessages error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
