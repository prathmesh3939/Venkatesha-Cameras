// import mongoose from "mongoose";

// /**
//  * Customer Schema
//  * Represents a rental customer profile
//  */
// const customerSchema = new mongoose.Schema(
//   {
//     /* =========================
//        CUSTOMER ID
//     ========================== */
//     customerId: {
//       type: String,
//       unique: true
//     },

//     /* =========================
//        BASIC DETAILS
//     ========================== */
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     mobile: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true
//     },

//     referenceName: {
//       type: String,
//       trim: true
//     },

//     /* =========================
//        DOCUMENTS
//     ========================== */
//     documents: {
//       aadhaar: {
//         number: { type: String },
//         verified: { type: Boolean, default: false }
//       },
//       pan: {
//         number: { type: String },
//         verified: { type: Boolean, default: false }
//       },
//       passport: {
//         number: { type: String },
//         verified: { type: Boolean, default: false }
//       }
//     },

//     /* =========================
//        CUSTOMER STATUS
//     ========================== */
//     isTrusted: {
//       type: Boolean,
//       default: false
//     },

//     isBlacklisted: {
//       type: Boolean,
//       default: false
//     },

//     notes: {
//       type: String,
//       trim: true
//     },

//     /* =========================
//        AUDIT
//     ========================== */
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

// /* =========================
//    AUTO CUSTOMER ID (VC-0001)
// ========================== */
// customerSchema.pre("save", async function () {
//   if (!this.customerId) {
//     const lastCustomer = await mongoose.model("Customer").findOne(
//       {},
//       {},
//       { sort: { createdAt: -1 } }
//     );

//     let nextNumber = 1;

//     if (lastCustomer && lastCustomer.customerId) {
//       const num = parseInt(lastCustomer.customerId.replace("VC-", ""));
//       nextNumber = num + 1;
//     }

//     this.customerId = `VC-${String(nextNumber).padStart(4, "0")}`;
//   }
// });

// const Customer = mongoose.model("Customer", customerSchema);

// export default Customer;

import mongoose from "mongoose";

/* =========================
   UPLOADED DOCUMENT SCHEMA
========================== */
const uploadedDocumentSchema = new mongoose.Schema(
  {
    originalName: String,
    fileName: String,
    path: String,
    mimeType: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

/* =========================
   CUSTOMER SCHEMA
========================== */
const customerSchema = new mongoose.Schema(
  {
    /* CUSTOMER ID */
    customerId: {
      type: String,
      unique: true,
    },

    /* BASIC DETAILS */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    referenceName: {
      type: String,
      trim: true,
    },

    /* ID NUMBERS (STRUCTURED) */
    documents: {
      aadhaar: {
        number: { type: String },
        verified: { type: Boolean, default: false },
      },
      pan: {
        number: { type: String },
        verified: { type: Boolean, default: false },
      },
      passport: {
        number: { type: String },
        verified: { type: Boolean, default: false },
      },
    },

    /* FILE UPLOADS (PDF / JPG) */
    uploadedDocuments: {
      type: [uploadedDocumentSchema],
      default: [],
    },

    /* CUSTOMER STATUS */
    isTrusted: {
      type: Boolean,
      default: false,
    },

    isBlacklisted: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      trim: true,
    },

    /* AUDIT */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

/* =========================
   AUTO CUSTOMER ID (VC-0001)
========================== */
customerSchema.pre("save", async function () {
  if (!this.customerId) {
    const lastCustomer = await mongoose
      .model("Customer")
      .findOne({}, {}, { sort: { createdAt: -1 } });

    let nextNumber = 1;

    if (lastCustomer && lastCustomer.customerId) {
      const num = parseInt(lastCustomer.customerId.replace("VC-", ""));
      nextNumber = num + 1;
    }

    this.customerId = `VC-${String(nextNumber).padStart(4, "0")}`;
  }
});

export default mongoose.model("Customer", customerSchema);
