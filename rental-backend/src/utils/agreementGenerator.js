import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateAgreementPDF = (booking) => {
return new Promise((resolve, reject) => {
try {

/* ===============================
   CREATE AGREEMENTS FOLDER
=============================== */

const uploadDir = path.join(process.cwd(), "uploads", "agreements");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const fileName = `${booking.bookingNumber}.pdf`;
const filePath = path.join(uploadDir, fileName);

/* ===============================
   CREATE PDF
=============================== */

const doc = new PDFDocument({
  size: "A4",
  margin: 40
});

const stream = fs.createWriteStream(filePath);

doc.pipe(stream);

/* ===============================
   HEADER
=============================== */

doc.fontSize(18).text("VENKATESHA ENTERPRISES", {
  align: "center"
});

doc.moveDown(0.3);

doc.fontSize(10).text(
  "Prop. Pra. Sumit D. Mahajan | Mobile: 9922223939",
  { align: "center" }
);

doc.moveDown();

doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();

doc.moveDown();

/* ===============================
   CUSTOMER DECLARATION
=============================== */

doc.fontSize(11).text(
  `I, ${booking.customer.name}, Mobile No. ${booking.customer.mobile}, hereby confirm that I am renting the items listed below and I take full responsibility to return them in proper condition within the agreed rental period.`
);

doc.moveDown();

/* ===============================
   BOOKING DETAILS
=============================== */

const startDate = new Date(booking.startDate).toLocaleDateString("en-GB");
const endDate = new Date(booking.endDate).toLocaleDateString("en-GB");

doc.text(`Booking Number: ${booking.bookingNumber}`);
doc.text(`Rental Period: ${startDate} to ${endDate}`);
doc.text(`Total Days: ${booking.totalDays}`);

doc.moveDown();

/* ===============================
   ITEM DETAILS
=============================== */

doc.fontSize(12).text("Item Details:", { underline: true });

doc.moveDown(0.5);

doc.fontSize(11).text(
  `• ${booking.item.name} (Quantity: ${booking.quantity})`
);

doc.text(`Rent Per Day: ₹${booking.rentPerDay}`);

doc.text(`Total Amount: ₹${booking.totalAmount}`);

doc.moveDown();

/* ===============================
   TERMS & CONDITIONS
=============================== */

doc.fontSize(12).text("Terms & Conditions:", { underline: true });

doc.moveDown(0.5);

doc.fontSize(10).text(

`• The rented equipment must be returned within the agreed time.
• Late returns may incur additional hourly charges.
• If the equipment is lost or damaged, the customer is responsible for paying the full replacement cost.
• The rented equipment must not be handed over to any third party.
• In case of any dispute, the decision of the owner will be final.`

);

doc.moveDown(2);

/* ===============================
   SIGNATURE SECTION
=============================== */

doc.text("Customer Signature: ____________________", {
  align: "left"
});

doc.moveDown();

doc.text("Owner Signature: ____________________", {
  align: "right"
});

/* ===============================
   FINISH PDF
=============================== */

doc.end();

stream.on("finish", () => {
  resolve(filePath);
});

stream.on("error", (err) => {
  reject(err);
});

} catch (err) {
  reject(err);
}

});
};