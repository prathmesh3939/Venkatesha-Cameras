// // import express from "express";
// // import {
// //   createCustomer,
// //   getAllCustomers,
// //   getCustomerById,
// //   updateCustomer
// // } from "../controllers/customerController.js";

// // import { protect } from "../middleware/authMiddleware.js";
// // import { adminOnly } from "../middleware/roleMiddleware.js";

// // const router = express.Router();

// // /**
// //  * Create customer
// //  * ADMIN + STAFF
// //  */
// // router.post("/", protect, createCustomer);

// // /**
// //  * Get all customers
// //  * ADMIN + STAFF
// //  */
// // router.get("/", protect, getAllCustomers);

// // /**
// //  * Get single customer profile
// //  * ADMIN + STAFF
// //  */
// // router.get("/:id", protect, getCustomerById);

// // /**
// //  * Update customer
// //  * ADMIN only
// //  */
// // router.put("/:id", protect, adminOnly, updateCustomer);

// // export default router;

// import express from "express";
// import {
//   createCustomer,
//   getAllCustomers,
//   getCustomerById,
//   updateCustomer
// } from "../controllers/customerController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import { adminOnly } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// /**
//  * Get all customers
//  * TEMP PUBLIC (until login is fixed)
//  */
// router.get("/", getAllCustomers);

// /**
//  * Create customer
//  * ADMIN + STAFF
//  */
// router.post("/", protect, createCustomer);

// /**
//  * Get single customer profile
//  * ADMIN + STAFF
//  */
// router.get("/:id", protect, getCustomerById);

// /**
//  * Update customer
//  * ADMIN only
//  */
// router.put("/:id", protect, adminOnly, updateCustomer);

// export default router;


import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  downloadCustomerDocument,
} from "../controllers/customerController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { deleteCustomer } from "../controllers/customerController.js";
const router = express.Router();

/**
 * GET ALL CUSTOMERS
 * ADMIN + STAFF
 */
router.get("/", protect, getAllCustomers);

/**
 * CREATE CUSTOMER (with document upload)
 * ADMIN + STAFF
 */
router.post(
  "/",
  protect,
  upload.single("document"),
  createCustomer
);

/**
 * GET CUSTOMER BY ID
 * ADMIN + STAFF
 */
router.get("/:id", protect, getCustomerById);

/**
 * DOWNLOAD CUSTOMER DOCUMENT
 * ADMIN + STAFF
 */
router.get("/:id/document", protect, downloadCustomerDocument);

/**
 * UPDATE CUSTOMER
 * ADMIN ONLY
 */
router.put("/:id", protect, adminOnly, updateCustomer);
router.delete("/:id", protect, adminOnly, deleteCustomer);

export default router;
