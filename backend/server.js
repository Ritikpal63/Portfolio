import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// Middlewares
// CLIENT_URL can be a single URL or a comma-separated list
// e.g. CLIENT_URL=https://portfolio-eta-three-63.vercel.app,http://localhost:5174
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, "")) // trim + remove trailing slash
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // allow server-to-server / curl / Postman requests (no Origin header)
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.length === 0 || allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    console.warn(`❌ Blocked by CORS: ${origin} (allowed: ${allowedOrigins.join(", ") || "none set"})`);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// app.options(cors());
app.use(express.json());

// Routes
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