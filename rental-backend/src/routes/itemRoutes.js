import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemAvailability
} from "../controllers/itemController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   AVAILABILITY (ADMIN)
========================= */
router.get(
  "/availability",
  protect,
  authorize("ADMIN"),
  getItemAvailability
);

/* =========================
   ITEMS CRUD
========================= */
router.get("/", protect, getItems);
router.get("/:id", protect, getItemById);
router.post("/", protect, authorize("ADMIN"), createItem);
router.put("/:id", protect, authorize("ADMIN"), updateItem);
router.delete("/:id", protect, authorize("ADMIN"), deleteItem);

export default router;
