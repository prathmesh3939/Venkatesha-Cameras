// import Item from "../models/Item.js";
// import Booking from "../models/Booking.js";

// /* =====================================================
//    CREATE ITEM
// ===================================================== */
// export const createItem = async (req, res) => {
//   try {
//     const { name, category, description, totalQuantity, rentPerDay } = req.body;

//     if (!name || !category || totalQuantity == null || rentPerDay == null) {
//       return res.status(400).json({
//         message: "Name, category, totalQuantity and rentPerDay are required"
//       });
//     }

//     const item = await Item.create({
//       name,
//       category,
//       description,
//       totalQuantity,
//       availableQuantity: totalQuantity,
//       rentPerDay,
//       createdBy: req.user._id
//     });

//     res.status(201).json({
//       message: "Item created successfully",
//       item
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to create item",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    GET ALL ACTIVE ITEMS
// ===================================================== */
// export const getItems = async (req, res) => {
//   try {
//     const items = await Item.find({ isActive: true }).sort({ createdAt: -1 });

//     res.status(200).json({
//       count: items.length,
//       items
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch items",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    GET SINGLE ITEM BY ID
// ===================================================== */
// export const getItemById = async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     res.status(200).json({ item });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch item",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    UPDATE ITEM (ADMIN)
// ===================================================== */
// export const updateItem = async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     const {
//       name,
//       category,
//       description,
//       totalQuantity,
//       rentPerDay,
//       isActive
//     } = req.body;

//     if (name !== undefined) item.name = name;
//     if (category !== undefined) item.category = category;
//     if (description !== undefined) item.description = description;
//     if (rentPerDay !== undefined) item.rentPerDay = rentPerDay;
//     if (isActive !== undefined) item.isActive = isActive;

//     if (totalQuantity !== undefined) {
//       item.totalQuantity = totalQuantity;

//       // Safety clamp
//       if (item.availableQuantity > totalQuantity) {
//         item.availableQuantity = totalQuantity;
//       }
//     }

//     const updatedItem = await item.save();

//     res.status(200).json({
//       message: "Item updated successfully",
//       item: updatedItem
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to update item",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    DELETE ITEM (ADMIN)
// ===================================================== */
// export const deleteItem = async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     await item.deleteOne();

//     res.status(200).json({
//       message: "Item deleted successfully"
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to delete item",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    DATE-WISE ITEM AVAILABILITY (ADMIN)
// ===================================================== */
// export const getItemAvailability = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     if (!startDate || !endDate) {
//       return res.status(400).json({
//         message: "startDate and endDate are required"
//       });
//     }

//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     // Active items only
//     const items = await Item.find({ isActive: true });

//     // Overlapping verified / handed-over bookings
//     const bookings = await Booking.find({
//       status: { $in: ["VERIFIED", "HANDED_OVER"] },
//       startDate: { $lte: end },
//       endDate: { $gte: start }
//     });

//     const availability = items.map(item => {
//       const bookedQuantity = bookings
//         .filter(b => b.item.toString() === item._id.toString())
//         .reduce((sum, b) => sum + b.quantity, 0);

//       return {
//         itemId: item._id,
//         name: item.name,
//         category: item.category,
//         totalQuantity: item.totalQuantity,
//         bookedQuantity,
//         availableQuantity: Math.max(
//           item.totalQuantity - bookedQuantity,
//           0
//         )
//       };
//     });

//     res.status(200).json({ availability });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to calculate availability",
//       error: error.message
//     });
//   }
// };

// //before category working

import Item from "../models/Item.js";
import Booking from "../models/Booking.js";

/* =====================================================
   CREATE ITEM (ADMIN)
===================================================== */
export const createItem = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,
      brand,
      description,
      totalQuantity,
      rentPerDay
    } = req.body;

    if (!name || !category || totalQuantity == null || rentPerDay == null) {
      return res.status(400).json({
        message: "Name, category, totalQuantity and rentPerDay are required"
      });
    }

    const item = await Item.create({
      name,
      category,
      subCategory: subCategory || null,
      brand: brand || null,
      description,
      totalQuantity,
      availableQuantity: totalQuantity,
      rentPerDay,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Item created successfully",
      item
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create item",
      error: error.message
    });
  }
};

/* =====================================================
   GET ALL ACTIVE ITEMS (WITH OPTIONAL FILTERS)
===================================================== */
export const getItems = async (req, res) => {
  try {
    const { category, subCategory, brand } = req.query;

    const filter = { isActive: true };

    // Optional filters (backward compatible)
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (brand) filter.brand = brand;

    const items = await Item.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      count: items.length,
      items
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch items",
      error: error.message
    });
  }
};

/* =====================================================
   GET SINGLE ITEM BY ID
===================================================== */
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch item",
      error: error.message
    });
  }
};

/* =====================================================
   UPDATE ITEM (ADMIN)
===================================================== */
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const {
      name,
      category,
      subCategory,
      brand,
      description,
      totalQuantity,
      rentPerDay,
      isActive
    } = req.body;

    if (name !== undefined) item.name = name;
    if (category !== undefined) item.category = category;
    if (subCategory !== undefined) item.subCategory = subCategory || null;
    if (brand !== undefined) item.brand = brand || null;
    if (description !== undefined) item.description = description;
    if (rentPerDay !== undefined) item.rentPerDay = rentPerDay;
    if (isActive !== undefined) item.isActive = isActive;

    if (totalQuantity !== undefined) {
      item.totalQuantity = totalQuantity;

      // Safety clamp
      if (item.availableQuantity > totalQuantity) {
        item.availableQuantity = totalQuantity;
      }
    }

    const updatedItem = await item.save();

    res.status(200).json({
      message: "Item updated successfully",
      item: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update item",
      error: error.message
    });
  }
};

/* =====================================================
   DELETE ITEM (ADMIN)
===================================================== */
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.deleteOne();

    res.status(200).json({
      message: "Item deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete item",
      error: error.message
    });
  }
};

/* =====================================================
   DATE-WISE ITEM AVAILABILITY (ADMIN)
===================================================== */
export const getItemAvailability = async (req, res) => {
  try {
    const { startDate, endDate, category, subCategory, brand } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "startDate and endDate are required"
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const itemFilter = { isActive: true };
    if (category) itemFilter.category = category;
    if (subCategory) itemFilter.subCategory = subCategory;
    if (brand) itemFilter.brand = brand;

    const items = await Item.find(itemFilter);

    const bookings = await Booking.find({
      status: { $in: ["VERIFIED", "HANDED_OVER"] },
      startDate: { $lte: end },
      endDate: { $gte: start }
    });

    const availability = items.map(item => {
      const bookedQuantity = bookings
        .filter(b => b.item.toString() === item._id.toString())
        .reduce((sum, b) => sum + b.quantity, 0);

      return {
        itemId: item._id,
        name: item.name,
        category: item.category,
        subCategory: item.subCategory,
        brand: item.brand,
        totalQuantity: item.totalQuantity,
        bookedQuantity,
        availableQuantity: Math.max(
          item.totalQuantity - bookedQuantity,
          0
        )
      };
    });

    res.status(200).json({ availability });
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate availability",
      error: error.message
    });
  }
};
