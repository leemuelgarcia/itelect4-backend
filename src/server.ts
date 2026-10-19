import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/bookings.js";
import sessionRoutes from "./routes/sessions.js";
import { aiRouter } from "./routes/ai.js";

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());

// Connect to MongoDB before handling API requests.
app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(503).json({ message: "Database connection unavailable" });
  }
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    db: mongoose.connection.readyState === 1,
  });
});

app.get("/", (_req, res) => {
  res.json({
    message: "ITELECT4 Backend API is running",
  });
});

app.use("/api/sessions", sessionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// ===== GT5: one more router, mounted like the others ===============
// Private, rate limited, and the only route that talks to Gemini.
app.use("/api/ai", aiRouter);

export default app;