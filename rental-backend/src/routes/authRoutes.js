import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ADMIN only: create users
 */
router.post("/register", protect, authorize("ADMIN"), registerUser);

/**
 * Public login
 */
router.post("/login", loginUser);

export default router;
