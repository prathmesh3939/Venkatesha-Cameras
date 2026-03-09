import express from "express";
import {
  getDashboardSummary,
  getStaffCollection,
  getMonthlyTrend
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Dashboard summary
 */
router.get(
  "/summary",
  protect,
  authorizeRoles("ADMIN"),
  getDashboardSummary
);

/**
 * Staff-wise collection
 */
router.get(
  "/staff-collection",
  protect,
  authorizeRoles("ADMIN"),
  getStaffCollection
);

/**
 * Monthly revenue trend
 */
router.get(
  "/monthly-trend",
  protect,
  authorizeRoles("ADMIN"),
  getMonthlyTrend
);

export default router;
