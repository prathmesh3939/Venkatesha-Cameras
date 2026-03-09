import mongoose from "mongoose";

/**
 * Booking Schema
 * Represents the complete rental lifecycle
 */
const bookingSchema = new mongoose.Schema(
  {
    /* =========================
       BOOKING NUMBER
    ========================== */
    bookingNumber: {
      type: String,
      unique: true
    },

    /* =========================
       CUSTOMER (REFERENCE)
    ========================== */
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    /* =========================
       ITEM & BOOKING DETAILS
    ========================== */
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    totalDays: {
      type: Number
    },

    rentPerDay: {
      type: Number,
      required: true
    },

    /* =========================
       PAYMENT DETAILS
    ========================== */
    advanceAmount: {
      type: Number,
      default: 0
    },

    totalAmount: {
      type: Number
    },

    remainingAmount: {
      type: Number
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PARTIAL", "PAID"],
      default: "PENDING"
    },

    /* =========================
       AGREEMENT (OTP-READY)
    ========================== */
    agreementGenerated: {
      type: Boolean,
      default: false
    },

    agreementAccepted: {
      type: Boolean,
      default: false
    },

    agreementAcceptedAt: {
      type: Date
    },

    agreementAcceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    agreementFilePath: {
  type: String
},

    /* =========================
       PICKUP PERSON (IF DIFFERENT)
    ========================== */
    pickupPerson: {
      name: {
        type: String,
        trim: true
      },
      mobile: {
        type: String,
        trim: true
      },
      idType: {
        type: String,
        enum: ["AADHAAR", "PAN", "DRIVING_LICENSE", "OTHER"]
      },
      idNumber: {
        type: String,
        trim: true
      },
      note: {
        type: String,
        trim: true
      }
    },


    // For future OTP verification (do NOT use yet)
    agreementOtpHash: {
      type: String
    },

    agreementOtpExpiresAt: {
      type: Date
    },

    /* =========================
       HANDOVER / RETURN
    ========================== */
    handedOverBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    returnedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    /* =========================
       DAMAGE / LOSS HANDLING
    ========================== */
    damageStatus: {
      type: String,
      enum: ["NONE", "DAMAGED", "LOST"],
      default: "NONE"
    },

    damageDescription: {
      type: String,
      trim: true
    },

    damageAmount: {
      type: Number,
      default: 0
    },

    /* =========================
       BOOKING STATUS
    ========================== */
    status: {
      type: String,
      enum: [
        "ENQUIRY",
        "VERIFIED",
        "BOOKED",
        "HANDED_OVER",
        "RETURNED",
        "CLOSED",
        "DAMAGED",
        "LOST"
      ],
      default: "ENQUIRY"
    },

    /* =========================
       AUDIT
    ========================== */
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

/* =========================
   VALIDATIONS & CALCULATIONS
========================== */

// Validate dates
bookingSchema.pre("validate", function () {
  if (this.startDate > this.endDate) {
    throw new Error("Start date cannot be after end date");
  }
});

// Generate booking number + calculate amounts
bookingSchema.pre("save", async function () {
  // Generate booking number only once
  if (!this.bookingNumber) {
    const year = new Date().getFullYear();

    const lastBooking = await mongoose.model("Booking").findOne(
      { bookingNumber: new RegExp(`^BK-${year}-`) },
      {},
      { sort: { createdAt: -1 } }
    );

    let nextNumber = 1;

    if (lastBooking && lastBooking.bookingNumber) {
      const parts = lastBooking.bookingNumber.split("-");
      nextNumber = parseInt(parts[2]) + 1;
    }

    this.bookingNumber = `BK-${year}-${String(nextNumber).padStart(4, "0")}`;
  }

  const start = new Date(this.startDate);
  const end = new Date(this.endDate);

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  this.totalDays = diffDays;
  this.totalAmount = this.totalDays * this.quantity * this.rentPerDay;
  this.remainingAmount = this.totalAmount - this.advanceAmount;

  if (this.remainingAmount <= 0) {
    this.paymentStatus = "PAID";
  } else if (this.advanceAmount > 0) {
    this.paymentStatus = "PARTIAL";
  } else {
    this.paymentStatus = "PENDING";
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
