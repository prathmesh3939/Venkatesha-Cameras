
// import Payment from "../models/Payment.js";
// import Booking from "../models/Booking.js";

// /**
//  * =====================================================
//  * ADD PAYMENT TO BOOKING
//  * POST /api/payments
//  * ACCESS: ADMIN, STAFF
//  * =====================================================
//  */
// export const addPayment = async (req, res) => {
//   try {
//     const { bookingId, amount, mode, remark } = req.body;

//     // 1️⃣ Validation
//     if (!bookingId || !amount || amount <= 0 || !mode) {
//       return res.status(400).json({
//         message: "bookingId, valid amount and mode are required"
//       });
//     }

//     // 2️⃣ Load booking
//     const booking = await Booking.findById(bookingId);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     if (booking.remainingAmount <= 0) {
//       return res.status(400).json({
//         message: "Booking already fully paid"
//       });
//     }

//     if (amount > booking.remainingAmount) {
//       return res.status(400).json({
//         message: "Payment amount exceeds remaining balance"
//       });
//     }

//     // 3️⃣ Create payment entry
//     const payment = await Payment.create({
//       booking: booking._id,
//       customer: booking.customer,
//       amount,
//       mode,
//       remark,
//       createdBy: req.user._id
//     });

//     // 4️⃣ Update booking financials
//     booking.remainingAmount -= amount;

//     if (booking.remainingAmount === 0) {
//       booking.paymentStatus = "PAID";
//     } else {
//       booking.paymentStatus = "PARTIAL";
//     }

//     await booking.save();

//     // 5️⃣ Response
//     res.status(201).json({
//       message: "Payment added successfully",
//       payment,
//       bookingSummary: {
//         bookingNumber: booking.bookingNumber,
//         totalAmount: booking.totalAmount,
//         remainingAmount: booking.remainingAmount,
//         paymentStatus: booking.paymentStatus
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to add payment",
//       error: error.message
//     });
//   }
// };

// /**
//  * =====================================================
//  * GET ALL PAYMENTS
//  * GET /api/payments
//  * ACCESS: ADMIN
//  * =====================================================
//  */
// export const getAllPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find()
//       .populate({
//         path: "booking",
//         select: "bookingNumber totalAmount remainingAmount paymentStatus"
//       })
//       .populate("customer", "name mobile")
//       .sort({ createdAt: -1 });

//     res.json({ count: payments.length, payments });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch payments",
//       error: error.message
//     });
//   }
// };


import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";

/**
 * =====================================================
 * ADD PAYMENT TO BOOKING
 * POST /api/payments
 * ACCESS: ADMIN, STAFF
 * =====================================================
 */
export const addPayment = async (req, res) => {
  try {
    const { bookingId, amount, mode, remark } = req.body;

    const paymentAmount = Number(amount);

    // 1️⃣ Validation
    if (!bookingId || !paymentAmount || paymentAmount <= 0 || !mode) {
      return res.status(400).json({
        message: "bookingId, valid amount and mode are required"
      });
    }

    // 2️⃣ Load booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.remainingAmount <= 0) {
      return res.status(400).json({
        message: "Booking already fully paid"
      });
    }

    if (paymentAmount > booking.remainingAmount) {
      return res.status(400).json({
        message: "Payment amount exceeds remaining balance"
      });
    }

    // 3️⃣ Create payment entry
    const payment = await Payment.create({
      booking: booking._id,
      customer: booking.customer,
      amount: paymentAmount,
      mode,
      remark,
      createdBy: req.user._id
    });

    // 4️⃣ Update booking financials
    // booking.remainingAmount =
    //   Number(booking.remainingAmount) - paymentAmount;

    // if (booking.remainingAmount <= 0) {
    //   booking.remainingAmount = 0;
    //   booking.paymentStatus = "PAID";
    // } 
    // else if (booking.remainingAmount < booking.totalAmount) {
    //   booking.paymentStatus = "PARTIAL";
    // } 
    // else {
    //   booking.paymentStatus = "PENDING";
    // }

    // await booking.save();

    // 4️⃣ Recalculate payment totals

const payments = await Payment.find({ booking: booking._id });

const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);

booking.remainingAmount = Number(booking.totalAmount) - totalPaid;

if (booking.remainingAmount <= 0) {
  booking.remainingAmount = 0;
  booking.paymentStatus = "PAID";
} 
else if (totalPaid > 0) {
  booking.paymentStatus = "PARTIAL";
} 
else {
  booking.paymentStatus = "PENDING";
}

await booking.save();

    // 5️⃣ Response
    res.status(201).json({
      message: "Payment added successfully",
      payment,
      bookingSummary: {
        bookingNumber: booking.bookingNumber,
        totalAmount: booking.totalAmount,
        remainingAmount: booking.remainingAmount,
        paymentStatus: booking.paymentStatus
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to add payment",
      error: error.message
    });
  }
};


/**
 * =====================================================
 * GET ALL PAYMENTS
 * GET /api/payments
 * ACCESS: ADMIN
 * =====================================================
 */
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate({
        path: "booking",
        select: "bookingNumber totalAmount remainingAmount paymentStatus"
      })
      .populate("customer", "name mobile")
      .sort({ createdAt: -1 });

    res.json({ count: payments.length, payments });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message
    });
  }
};