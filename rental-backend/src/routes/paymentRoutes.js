// import express from "express";
// import { addPayment } from "../controllers/paymentController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// /**
//  * @route   POST /api/payments
//  * @desc    Add payment to booking
//  * @access  Private (ADMIN, STAFF)
//  */
// router.post(
//   "/",
//   protect,
//   authorizeRoles("ADMIN", "STAFF"),
//   addPayment
// );

// export default router;

import express from "express";
import {
  addPayment,
  getAllPayments
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/payments
 * @desc    Get all payments
 * @access  TEMP Public (until login fixed)
 */
router.get("/", getAllPayments);

/**
 * @route   POST /api/payments
 * @desc    Add payment to booking
 * @access  Private (ADMIN, STAFF)
 */
router.post(
  "/",
  protect,
  authorizeRoles("ADMIN", "STAFF"),
  addPayment
);

export default router;
