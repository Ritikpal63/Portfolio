import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";
import contactRoutes from "./routes/contactRoutes.js";
dns.setDefaultResultOrder("ipv4first");

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, "")) 
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, "");

    if (
      allowedOrigins.length === 0 ||
      allowedOrigins.includes(normalizedOrigin)
    ) {
      return callback(null, true);
    }

    console.warn(
      `❌ Blocked by CORS: ${origin} (allowed: ${allowedOrigins.join(", ") || "none set"})`,
    );
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Portfolio backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Allowed CORS origins: ${allowedOrigins.length ? allowedOrigins.join(", ") : "⚠️ none set (CLIENT_URL missing)"}`,
  );
});
