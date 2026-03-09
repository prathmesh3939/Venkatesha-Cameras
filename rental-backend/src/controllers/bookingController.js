
// import Booking from "../models/Booking.js";
// import Item from "../models/Item.js";
// import Customer from "../models/Customer.js";
// import fs from "fs";
// import path from "path";
// import { generateAgreementPDF } from "../utils/agreementGenerator.js";

// /* =====================================================
//    CREATE BOOKING (SINGLE ITEM)
// ===================================================== */
// export const createBooking = async (req, res) => {
//   try {
//     const {
//       customerId,
//       itemId,
//       quantity,
//       startDate,
//       endDate,
//       advanceAmount = 0
//     } = req.body;

//     if (!customerId || !itemId || !quantity || !startDate || !endDate) {
//       return res.status(400).json({
//         message: "customerId, itemId, quantity, startDate, endDate are required"
//       });
//     }

//     const customer = await Customer.findById(customerId);
//     if (!customer) return res.status(404).json({ message: "Customer not found" });

//     if (customer.isBlacklisted) {
//       return res.status(403).json({ message: "Customer is blacklisted" });
//     }

//     const item = await Item.findById(itemId);
//     if (!item || !item.isActive) {
//       return res.status(404).json({ message: "Item not available" });
//     }

//     if (item.availableQuantity < quantity) {
//       return res.status(400).json({
//         message: "Insufficient item stock"
//       });
//     }

//     const booking = await Booking.create({
//       customer: customer._id,
//       item: item._id,
//       quantity,
//       startDate,
//       endDate,
//       rentPerDay: item.rentPerDay,
//       advanceAmount,
//       status: "ENQUIRY",
//       createdBy: req.user._id
//     });

//     const populated = await Booking.findById(booking._id)
//       .populate("customer")
//       .populate("item");

//     return res.status(201).json({
//       message: "Booking enquiry created",
//       booking: populated
//     });

//   } catch (error) {
//     console.error("Create booking error:", error);
//     return res.status(500).json({
//       message: "Failed to create booking",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    GET ALL BOOKINGS
// ===================================================== */
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("customer")
//       .populate("item")
//       .sort({ createdAt: -1 });

//     res.json({ count: bookings.length, bookings });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to load bookings" });
//   }
// };

// /* =====================================================
//    VERIFY
// ===================================================== */
// export const verifyBooking = async (req, res) => {
//   const booking = await Booking.findById(req.params.id);
//   if (!booking) return res.status(404).json({ message: "Booking not found" });

//   if (booking.status !== "ENQUIRY") {
//     return res.status(400).json({ message: "Invalid booking state" });
//   }

//   booking.status = "VERIFIED";
//   await booking.save();

//   res.json({ message: "Booking verified", booking });
// };

// /* =====================================================
//    HANDOVER
// ===================================================== */
// export const handoverBooking = async (req, res) => {
//   const booking = await Booking.findById(req.params.id).populate("item");
//   if (!booking) return res.status(404).json({ message: "Booking not found" });

//   if (booking.status !== "VERIFIED") {
//     return res.status(400).json({ message: "Only verified bookings allowed" });
//   }

//   booking.item.availableQuantity -= booking.quantity;
//   await booking.item.save();

//   booking.status = "HANDED_OVER";
//   booking.handedOverBy = req.user._id;
//   await booking.save();

//   res.json({ message: "Item handed over", booking });
// };

// /* =====================================================
//    RETURN
// ===================================================== */
// export const returnBooking = async (req, res) => {
//   const booking = await Booking.findById(req.params.id).populate("item");
//   if (!booking) return res.status(404).json({ message: "Booking not found" });

//   if (booking.status !== "HANDED_OVER") {
//     return res.status(400).json({ message: "Invalid return state" });
//   }

//   booking.item.availableQuantity += booking.quantity;
//   await booking.item.save();

//   booking.status = "RETURNED";
//   booking.returnedBy = req.user._id;
//   await booking.save();

//   res.json({ message: "Item returned", booking });
// };

// /* =====================================================
//    AGREEMENT
// ===================================================== */
// export const generateAgreement = async (req, res) => {
//   const booking = await Booking.findById(req.params.id)
//     .populate("customer")
//     .populate("item");

//   if (!booking) return res.status(404).json({ message: "Booking not found" });

//   let filePath = booking.agreementFilePath;

//   if (!filePath || !fs.existsSync(filePath)) {
//     filePath = await generateAgreementPDF(booking);
//     booking.agreementFilePath = filePath;
//     booking.agreementGenerated = true;
//     await booking.save();
//   }

//   res.download(filePath, path.basename(filePath));
// };

import Booking from "../models/Booking.js";
import Item from "../models/Item.js";
import Customer from "../models/Customer.js";
import fs from "fs";
import path from "path";
import { generateAgreementPDF } from "../utils/agreementGenerator.js";

/* =====================================================
   CREATE BOOKING (ENQUIRY ONLY)
===================================================== */
export const createBooking = async (req, res) => {
  try {
    const {
      customerId,
      itemId,
      quantity,
      startDate,
      endDate,
      advanceAmount = 0
    } = req.body;

    if (!customerId || !itemId || !quantity || !startDate || !endDate) {
      return res.status(400).json({
        message: "customerId, itemId, quantity, startDate, endDate are required"
      });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.isBlacklisted) {
      return res.status(403).json({ message: "Customer is blacklisted" });
    }

    const item = await Item.findById(itemId);
    if (!item || !item.isActive) {
      return res.status(404).json({ message: "Item not available" });
    }

    const booking = await Booking.create({
      customer: customer._id,
      item: item._id,
      quantity,
      startDate,
      endDate,
      rentPerDay: item.rentPerDay,
      advanceAmount,
      status: "ENQUIRY",
      createdBy: req.user._id
    });

    const populated = await Booking.findById(booking._id)
      .populate("customer")
      .populate("item");

    res.status(201).json({
      message: "Booking enquiry created",
      booking: populated
    });

  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message
    });
  }
};

/* =====================================================
   GET ALL BOOKINGS
===================================================== */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer")
      .populate("item")
      .sort({ createdAt: -1 });

    res.json({ count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ message: "Failed to load bookings" });
  }
};

/* =====================================================
   VERIFY BOOKING (RESERVE STOCK HERE)
===================================================== */
export const verifyBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("item");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "ENQUIRY") {
      return res.status(400).json({ message: "Invalid booking state" });
    }

    // 🔒 STOCK CHECK
    if (booking.item.availableQuantity < booking.quantity) {
      return res.status(400).json({
        message: "Insufficient stock to verify booking"
      });
    }

    // 🔽 RESERVE STOCK
    booking.item.availableQuantity -= booking.quantity;
    await booking.item.save();

    booking.status = "VERIFIED";
    await booking.save();

    res.json({
      message: "Booking verified and stock reserved",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to verify booking",
      error: error.message
    });
  }
};

/* =====================================================
   HANDOVER (NO STOCK CHANGE)
===================================================== */
export const handoverBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "VERIFIED") {
      return res.status(400).json({ message: "Only verified bookings allowed" });
    }

    booking.status = "HANDED_OVER";
    booking.handedOverBy = req.user._id;
    await booking.save();

    res.json({
      message: "Item handed over (stock already reserved)",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to handover booking",
      error: error.message
    });
  }
};

/* =====================================================
   RETURN BOOKING (RESTORE STOCK)
===================================================== */
export const returnBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("item");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "HANDED_OVER") {
      return res.status(400).json({ message: "Invalid return state" });
    }

    // 🔼 RESTORE STOCK
    booking.item.availableQuantity += booking.quantity;

    // Safety clamp
    if (booking.item.availableQuantity > booking.item.totalQuantity) {
      booking.item.availableQuantity = booking.item.totalQuantity;
    }

    await booking.item.save();

    booking.status = "RETURNED";
    booking.returnedBy = req.user._id;
    await booking.save();

    res.json({
      message: "Item returned and stock restored",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to return booking",
      error: error.message
    });
  }
};

/* =====================================================
   AGREEMENT PDF
===================================================== */
export const generateAgreement = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("customer")
    .populate("item");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  let filePath = booking.agreementFilePath;

  if (!filePath || !fs.existsSync(filePath)) {
    filePath = await generateAgreementPDF(booking);
    booking.agreementFilePath = filePath;
    booking.agreementGenerated = true;
    await booking.save();
  }

  res.download(filePath, path.basename(filePath));
};
