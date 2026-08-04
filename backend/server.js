import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5174",
  })
);
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Portfolio backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,  () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


