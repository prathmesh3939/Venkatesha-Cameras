import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import mongoose from "mongoose";

/**
 * @desc Dashboard summary
 * @route GET /api/dashboard/summary
 * @access ADMIN
 */
export const getDashboardSummary = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Today's collection
    const todayPayments = await Payment.aggregate([
      {
        $match: {
          createdAt: { $gte: todayStart, $lte: todayEnd }
        }
      },
      {
        $group: {
          _id: "$method",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let today = { total: 0, cash: 0, upi: 0 };

    todayPayments.forEach(p => {
      today.total += p.total;
      if (p._id === "CASH") today.cash = p.total;
      if (p._id === "UPI") today.upi = p.total;
    });

    // Monthly pending
    const pending = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalPending: { $sum: "$remainingAmount" }
        }
      }
    ]);

    res.json({
      today,
      pending: pending[0]?.totalPending || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Staff-wise collection
 * @route GET /api/dashboard/staff-collection
 * @access ADMIN
 */
export const getStaffCollection = async (req, res) => {
  try {
    const data = await Payment.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "receivedBy",
          foreignField: "_id",
          as: "staff"
        }
      },
      { $unwind: "$staff" },
      {
        $group: {
          _id: "$staff.name",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Monthly revenue trend
 * @route GET /api/dashboard/monthly-trend
 * @access ADMIN
 */
export const getMonthlyTrend = async (req, res) => {
  try {
    const trend = await Payment.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json(trend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};