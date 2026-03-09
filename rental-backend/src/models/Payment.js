
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 1
    },

    mode: {
      type: String,
      enum: ["CASH", "UPI", "CARD", "BANK_TRANSFER"],
      required: true
    },

    remark: {
      type: String,
      trim: true
    },

    paidAt: {
      type: Date,
      default: Date.now
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
