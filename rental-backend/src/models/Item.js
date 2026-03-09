// import mongoose from "mongoose";

// /**
//  * Item / Inventory Schema
//  * Represents rental products (camera, lens, light, etc.)
//  */
// const itemSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     category: {
//       type: String,
//       required: true,
//       trim: true
//       // Examples: Camera, Lens, Light, Tripod
//     },

//     description: {
//       type: String,
//       trim: true
//     },

//     totalQuantity: {
//       type: Number,
//       required: true,
//       min: 0
//     },

//     availableQuantity: {
//       type: Number,
//       required: true,
//       min: 0
//     },

//     rentPerDay: {
//       type: Number,
//       required: true,
//       min: 0
//     },

//     isActive: {
//       type: Boolean,
//       default: true
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// /**
//  * Ensure availableQuantity never exceeds totalQuantity
//  */
// itemSchema.pre("save", function () {
//   if (this.availableQuantity > this.totalQuantity) {
//     this.availableQuantity = this.totalQuantity;
//   }
// });

// const Item = mongoose.model("Item", itemSchema);

// export default Item;

// //upper before category working properly


import mongoose from "mongoose";

/**
 * Item / Inventory Schema
 * Represents rental products
 * (Camera, Lens, Light, Accessories, etc.)
 */
const itemSchema = new mongoose.Schema(
  {
    /* =========================
       BASIC INFO
    ========================= */
    name: {
      type: String,
      required: true,
      trim: true
    },

    /**
     * MAIN CATEGORY
     * Examples:
     * Camera, Lens, Light, Accessories
     */
    category: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    /**
     * SUB CATEGORY (OPTIONAL)
     * Examples:
     * Camera Body, Prime Lens, Zoom Lens
     * Backward compatible
     */
    subCategory: {
      type: String,
      trim: true,
      default: null,
      index: true
    },

    /**
     * BRAND (OPTIONAL)
     * Examples:
     * Canon, Nikon, Sony
     * Accessories may not require brand
     */
    brand: {
      type: String,
      trim: true,
      default: null,
      index: true
    },

    description: {
      type: String,
      trim: true
    },

    /* =========================
       INVENTORY
    ========================= */
    totalQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    /**
     * AVAILABLE STOCK
     * Auto-managed
     */
    availableQuantity: {
      type: Number,
      min: 0
    },

    rentPerDay: {
      type: Number,
      required: true,
      min: 0
    },

    /* =========================
       STATUS
    ========================= */
    isActive: {
      type: Boolean,
      default: true
    },

    /* =========================
       AUDIT
    ========================= */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

/* =====================================================
   PRE-SAVE SAFETY GUARDS
===================================================== */

/**
 * Normalize empty strings to null
 * Prevents filtering bugs
 */
itemSchema.pre("save", function () {
  if (this.subCategory === "") this.subCategory = null;
  if (this.brand === "") this.brand = null;
});

/**
 * Auto-initialize availableQuantity
 * and clamp it safely
 */
itemSchema.pre("save", function () {
  // If creating item and availableQuantity not set
  if (this.isNew && this.availableQuantity == null) {
    this.availableQuantity = this.totalQuantity;
  }

  // Safety clamp
  if (this.availableQuantity > this.totalQuantity) {
    this.availableQuantity = this.totalQuantity;
  }

  if (this.availableQuantity < 0) {
    this.availableQuantity = 0;
  }
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
