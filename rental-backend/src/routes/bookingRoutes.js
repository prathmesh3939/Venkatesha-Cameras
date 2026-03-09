// import express from "express";

// /* =========================
//    CONTROLLERS
// ========================= */
// import {
//   createBooking,
//   verifyBooking,
//   handoverBooking,
//   returnBooking,
//   getAllBookings,
//   generateAgreement
// } from "../controllers/bookingController.js";

// /* =========================
//    MIDDLEWARE
// ========================= */
// import { protect } from "../middleware/authMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// /**
//  * @route   POST /api/bookings
//  * @desc    Create booking enquiry / booking
//  * @access  Private (ADMIN, STAFF)
//  */
// router.post(
//   "/",
//   protect,
//   authorizeRoles("ADMIN", "STAFF"),
//   createBooking
// );

// /**
//  * @route   PUT /api/bookings/:id/verify
//  * @desc    Verify reference & documents
//  * @access  Private (ADMIN)
//  */
// router.put(
//   "/:id/verify",
//   protect,
//   authorizeRoles("ADMIN"),
//   verifyBooking
// );

// /**
//  * @route   PUT /api/bookings/:id/handover
//  * @desc    Handover items to customer / pickup person
//  * @access  Private (ADMIN, STAFF)
//  */
// router.put(
//   "/:id/handover",
//   protect,
//   authorizeRoles("ADMIN", "STAFF"),
//   handoverBooking
// );

// /**
//  * @route   PUT /api/bookings/:id/return
//  * @desc    Return items / handle damage or loss
//  * @access  Private (ADMIN, STAFF)
//  */
// router.put(
//   "/:id/return",
//   protect,
//   authorizeRoles("ADMIN", "STAFF"),
//   returnBooking
// );

// /**
//  * @route   GET /api/bookings
//  * @desc    Get all bookings
//  * @access  Private (ADMIN)
//  */
// router.get(
//   "/",
//   protect,
//   authorizeRoles("ADMIN"),
//   getAllBookings
// );

// /**
//  * @route   GET /api/bookings/:id/agreement
//  * @desc    Generate & download agreement PDF
//  * @access  Private (ADMIN, STAFF)
//  */
// router.get(
//   "/:id/agreement",
//   protect,
//   authorizeRoles("ADMIN", "STAFF"),
//   generateAgreement
// );

// export default router;




import express from "express";

/* =========================
   CONTROLLERS
========================= */
import {
  createBooking,
  verifyBooking,
  handoverBooking,
  returnBooking,
  getAllBookings,
  generateAgreement
} from "../controllers/bookingController.js";

/* =========================
   MIDDLEWARE
========================= */
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings
 * @access  TEMP Public (until login fixed)
 */
router.get("/", getAllBookings);

/**
 * @route   POST /api/bookings
 * @desc    Create booking enquiry / booking
 * @access  Private (ADMIN, STAFF)
 */
router.post(
  "/",
  protect,
  authorizeRoles("ADMIN", "STAFF"),
  createBooking
);

/**
 * @route   PUT /api/bookings/:id/verify
 * @desc    Verify reference & documents
 * @access  Private (ADMIN)
 */
router.put(
  "/:id/verify",
  protect,
  authorizeRoles("ADMIN"),
  verifyBooking
);

/**
 * @route   PUT /api/bookings/:id/handover
 * @desc    Handover items to customer / pickup person
 * @access  Private (ADMIN, STAFF)
 */
router.put(
  "/:id/handover",
  protect,
  authorizeRoles("ADMIN", "STAFF"),
  handoverBooking
);

/**
 * @route   PUT /api/bookings/:id/return
 * @desc    Return items / handle damage or loss
 * @access  Private (ADMIN, STAFF)
 */
router.put(
  "/:id/return",
  protect,
  authorizeRoles("ADMIN", "STAFF"),
  returnBooking
);

/**
 * @route   GET /api/bookings/:id/agreement
 * @desc    Generate & download agreement PDF
 * @access  Private (ADMIN, STAFF)
 */
router.get(
  "/:id/agreement",
  protect,
  authorizeRoles("ADMIN", "STAFF"),
  generateAgreement
);

export default router;
