// import Customer from "../models/Customer.js";
// import path from "path";
// import fs from "fs";

// /**
//  * CREATE CUSTOMER (with document upload)
//  * POST /api/customers
//  */
// export const createCustomer = async (req, res) => {
//   try {
//     const {
//       name,
//       mobile,
//       referenceName,
//       notes,
//       isTrusted,
//       isBlacklisted,
//     } = req.body;

//     if (!name || !mobile) {
//       return res.status(400).json({
//         message: "Customer name and mobile are required",
//       });
//     }

//     const existingCustomer = await Customer.findOne({ mobile });
//     if (existingCustomer) {
//       return res.status(400).json({
//         message: "Customer with this mobile already exists",
//         customer: existingCustomer,
//       });
//     }

//     let documents = [];

//     if (req.file) {
//       documents.push({
//         originalName: req.file.originalname,
//         fileName: req.file.filename,
//         path: req.file.path,
//         mimeType: req.file.mimetype,
//         uploadedAt: new Date(),
//       });
//     }

//     const customer = await Customer.create({
//       name,
//       mobile,
//       referenceName,
//       notes,
//       documents,
//       isTrusted: isTrusted ?? false,
//       isBlacklisted: isBlacklisted ?? false,
//       createdBy: req.user._id,
//     });

//     res.status(201).json({
//       message: "Customer created successfully",
//       customer,
//     });
//   } catch (error) {
//     console.error("Create customer error:", error);
//     res.status(500).json({
//       message: "Failed to create customer",
//       error: error.message,
//     });
//   }
// };

// /**
//  * GET ALL CUSTOMERS
//  * GET /api/customers
//  */
// export const getAllCustomers = async (req, res) => {
//   try {
//     const customers = await Customer.find().sort({ createdAt: -1 });
//     res.status(200).json({ customers });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch customers",
//       error: error.message,
//     });
//   }
// };

// /**
//  * GET CUSTOMER BY ID
//  * GET /api/customers/:id
//  */
// export const getCustomerById = async (req, res) => {
//   try {
//     const customer = await Customer.findById(req.params.id);

//     if (!customer) {
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     res.status(200).json({ customer });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch customer",
//       error: error.message,
//     });
//   }
// };

// /**
//  * UPDATE CUSTOMER (ADMIN)
//  * PUT /api/customers/:id
//  */
// export const updateCustomer = async (req, res) => {
//   try {
//     const customer = await Customer.findById(req.params.id);

//     if (!customer) {
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     const {
//       name,
//       referenceName,
//       notes,
//       isTrusted,
//       isBlacklisted,
//     } = req.body;

//     if (name !== undefined) customer.name = name;
//     if (referenceName !== undefined) customer.referenceName = referenceName;
//     if (notes !== undefined) customer.notes = notes;
//     if (isTrusted !== undefined) customer.isTrusted = isTrusted;
//     if (isBlacklisted !== undefined) customer.isBlacklisted = isBlacklisted;

//     await customer.save();

//     res.status(200).json({
//       message: "Customer updated successfully",
//       customer,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to update customer",
//       error: error.message,
//     });
//   }
// };

// /**
//  * DOWNLOAD CUSTOMER DOCUMENT
//  * GET /api/customers/:id/document
//  */
// export const downloadCustomerDocument = async (req, res) => {
//   try {
//     const customer = await Customer.findById(req.params.id);

//     if (!customer || !customer.documents || customer.documents.length === 0) {
//       return res.status(404).json({ message: "Document not found" });
//     }

//     const doc = customer.documents[0];
//     const filePath = path.resolve(doc.path);

//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ message: "File not found on server" });
//     }

//     res.download(filePath, doc.originalName);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to download document",
//       error: error.message,
//     });
//   }
// };


import Customer from "../models/Customer.js";
import path from "path";
import fs from "fs";

/**
 * CREATE CUSTOMER (with document upload)
 * POST /api/customers
 */
export const createCustomer = async (req, res) => {
  try {
    const {
      name,
      mobile,
      referenceName,
      notes,
      isTrusted,
      isBlacklisted,
    } = req.body;

    if (!name || !mobile) {
      return res.status(400).json({
        message: "Customer name and mobile are required",
      });
    }

    const existingCustomer = await Customer.findOne({ mobile });
    if (existingCustomer) {
      return res.status(400).json({
        message: "Customer with this mobile already exists",
        customer: existingCustomer,
      });
    }

    /* 🔥 CORRECT FIELD — uploadedDocuments */
    let uploadedDocuments = [];

    if (req.file) {
      uploadedDocuments.push({
        originalName: req.file.originalname,
        fileName: req.file.filename,
        path: req.file.path,
        mimeType: req.file.mimetype,
        uploadedAt: new Date(),
      });
    }

    const customer = await Customer.create({
      name,
      mobile,
      referenceName,
      notes,
      uploadedDocuments, // ✅ FIXED
      isTrusted: isTrusted ?? false,
      isBlacklisted: isBlacklisted ?? false,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    console.error("Create customer error:", error);
    res.status(500).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
};

/**
 * GET ALL CUSTOMERS
 * GET /api/customers
 */
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};

/**
 * GET CUSTOMER BY ID
 * GET /api/customers/:id
 */
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer",
      error: error.message,
    });
  }
};

/**
 * UPDATE CUSTOMER (ADMIN)
 * PUT /api/customers/:id
 */
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const {
      name,
      referenceName,
      notes,
      isTrusted,
      isBlacklisted,
    } = req.body;

    if (name !== undefined) customer.name = name;
    if (referenceName !== undefined) customer.referenceName = referenceName;
    if (notes !== undefined) customer.notes = notes;
    if (isTrusted !== undefined) customer.isTrusted = isTrusted;
    if (isBlacklisted !== undefined) customer.isBlacklisted = isBlacklisted;

    await customer.save();

    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

/**
 * DOWNLOAD CUSTOMER DOCUMENT
 * GET /api/customers/:id/document
 */
export const downloadCustomerDocument = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (
      !customer ||
      !customer.uploadedDocuments ||
      customer.uploadedDocuments.length === 0
    ) {
      return res.status(404).json({ message: "Document not found" });
    }

    const doc = customer.uploadedDocuments[0];
    const filePath = path.resolve(doc.path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found on server" });
    }

    res.download(filePath, doc.originalName);
  } catch (error) {
    res.status(500).json({
      message: "Failed to download document",
      error: error.message,
    });
  }
};

/**
 * DELETE CUSTOMER (ADMIN)
 * DELETE /api/customers/:id
 */
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.deleteOne();

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};
