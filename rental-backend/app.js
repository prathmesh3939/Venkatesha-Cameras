import customerRoutes from "./src/routes/customerRoutes.js";
import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/authRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

// Inventory routes
app.use("/api/items", itemRoutes);

// Booking routes
app.use("/api/bookings", bookingRoutes);

app.use("/api/customers", customerRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Rental API running" });
});

export default app;