import dns from "node:dns/promises";
dns.setDefaultResultOrder("ipv4first");


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";


dotenv.config();

const app = express();

/* =========================
   CORS
========================= */

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without Origin
    // (Postman, curl, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, "");

    if (
      allowedOrigins.length === 0 ||
      allowedOrigins.includes(normalizedOrigin)
    ) {
      return callback(null, true);
    }

    console.warn(`❌ Blocked by CORS: ${origin}`);

    return callback(new Error("Not allowed by CORS"));
  },

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],

  credentials: true,
};


app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

/* =========================
   Middleware
========================= */

app.use(express.json());

/* =========================
   Routes
========================= */

app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Portfolio backend is running 🚀");
});

/* =========================
   Server
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  console.log(
    `Allowed CORS origins: ${
      allowedOrigins.length ? allowedOrigins.join(", ") : "⚠️ none set"
    }`,
  );
});
