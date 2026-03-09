// import fs from "fs";
// import path from "path";
// import PDFDocument from "pdfkit";

// /**
//  * Generate Marathi Rental Agreement PDF
//  */
// export const generateAgreementPDF = async (booking) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const fileName = `${booking.bookingNumber}.pdf`;
//       const filePath = path.join(
//         process.cwd(),
//         "uploads",
//         "agreements",
//         fileName
//       );

//       // Prevent duplicate generation
//       if (fs.existsSync(filePath)) {
//         return resolve(filePath);
//       }

//       const doc = new PDFDocument({ margin: 40 });
//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       /* =========================
//          HEADER
//       ========================== */
//       doc
//         .fontSize(16)
//         .text("॥ श्री ॥", { align: "center" })
//         .moveDown(0.5);

//       doc
//         .fontSize(18)
//         .text("व्यंकटेश एंटरप्रायजेस", { align: "center" })
//         .moveDown(0.2);

//       doc
//         .fontSize(10)
//         .text("प्रो. प्रा. सुमित द. महाजन | मो. ९९२२२२३९३९", {
//           align: "center"
//         })
//         .moveDown(1);

//       /* =========================
//          BOOKING META
//       ========================== */
//       doc
//         .fontSize(10)
//         .text(`बुकिंग क्रमांक: ${booking.bookingNumber}`)
//         .text(`दिनांक: ${new Date().toLocaleDateString("en-IN")}`)
//         .moveDown();

//       /* =========================
//          MAIN DECLARATION
//       ========================== */
//       doc
//         .fontSize(11)
//         .text(
//           "मी माझ्या वैयक्तिक / व्यावसायिक कार्यक्रमासाठी खाली नमूद केलेल्या सर्व वस्तू पूर्णपणे तपासून, समाधानकारकरीत्या घेतल्या आहेत. सदर वस्तू ठरवलेल्या वेळेत, त्याच स्थितीत परत करण्याची संपूर्ण जबाबदारी माझी आहे.",
//           { align: "justify" }
//         )
//         .moveDown();

//       /* =========================
//          RENTAL PERIOD
//       ========================== */
//       doc
//         .fontSize(11)
//         .text("भाडे कालावधी", { underline: true })
//         .moveDown(0.3);

//       doc
//         .fontSize(10)
//         .text(
//           `दिनांक: ${new Date(booking.startDate).toLocaleDateString(
//             "en-IN"
//           )} ते ${new Date(booking.endDate).toLocaleDateString("en-IN")}`
//         )
//         .text(`एकूण दिवस: ${booking.totalDays}`)
//         .moveDown();

//       /* =========================
//          ITEM DETAILS
//       ========================== */
//       doc
//         .fontSize(11)
//         .text("वस्तूंचा तपशील", { underline: true })
//         .moveDown(0.3);

//       doc
//         .fontSize(10)
//         .text(`वस्तूचे नाव: ${booking.item.name}`)
//         .text(`वर्ग: ${booking.item.category}`)
//         .text(`प्रमाण: ${booking.quantity}`)
//         .text(`दर (₹/दिवस): ₹${booking.rentPerDay}`)
//         .moveDown();

//       /* =========================
//          PAYMENT DETAILS
//       ========================== */
//       doc
//         .fontSize(11)
//         .text("भाडे व पेमेंट तपशील", { underline: true })
//         .moveDown(0.3);

//       doc
//         .fontSize(10)
//         .text(`एकूण रक्कम: ₹${booking.totalAmount}`)
//         .text(`आगाऊ रक्कम: ₹${booking.advanceAmount}`)
//         .text(`उर्वरित रक्कम: ₹${booking.remainingAmount}`)
//         .moveDown();

//       /* =========================
//          RULES
//       ========================== */
//       doc
//         .fontSize(11)
//         .text("नियम व अटी", { underline: true })
//         .moveDown(0.3);

//       doc.fontSize(9).list([
//         "ठरलेल्या वेळेत वस्तू जमा न केल्यास ₹100 प्रति तास अतिरिक्त शुल्क आकारले जाईल.",
//         "वस्तू तपासून घेतल्यानंतर कोणतीही तक्रार मान्य केली जाणार नाही.",
//         "कोणताही बिघाड, नुकसान किंवा वस्तू हरवल्यास संपूर्ण रक्कम ग्राहकाकडून वसूल केली जाईल.",
//         "भाड्याने घेतलेल्या वस्तूंची संपूर्ण जबाबदारी ग्राहकाची राहील."
//       ]);

//       doc.moveDown();

//       /* =========================
//          PICKUP PERSON (OPTIONAL)
//       ========================== */
//       if (booking.pickupPerson && booking.pickupPerson.name) {
//         doc
//           .fontSize(11)
//           .text("Pickup Person (वस्तू स्वीकारणारी व्यक्ती)", {
//             underline: true
//           })
//           .moveDown(0.3);

//         doc
//           .fontSize(10)
//           .text(`नाव: ${booking.pickupPerson.name}`)
//           .text(`मोबाईल: ${booking.pickupPerson.mobile || "-"}`)
//           .text(
//             `ओळखपत्र: ${booking.pickupPerson.idType || "-"} (${
//               booking.pickupPerson.idNumber || "-"
//             })`
//           )
//           .moveDown(0.3);

//         doc
//           .fontSize(9)
//           .text(
//             "महत्त्वाची नोंद: वस्तू इतर व्यक्तीने स्वीकारल्या असल्या तरी, संपूर्ण आर्थिक व कायदेशीर जबाबदारी मूळ ग्राहकाचीच राहील.",
//             { align: "justify" }
//           )
//           .moveDown();
//       }

//       /* =========================
//          SIGNATURE
//       ========================== */
//       doc.moveDown(1);

//       doc
//         .fontSize(10)
//         .text("वरील सर्व नियम व अटी मला मान्य आहेत.")
//         .moveDown();

//       doc
//         .text("ग्राहक सही: ____________________________")
//         .moveDown(0.5);

//       doc
//         .text(`ग्राहक नाव: ${booking.customer.name}`)
//         .text(`मोबाईल: ${booking.customer.mobile}`)
//         .moveDown(0.5);

//       doc.text(`Ref. Contact: ${booking.customer.referenceName || "-"}`);

//       doc.end();

//       stream.on("finish", () => resolve(filePath));
//     } catch (error) {
//       reject(error);
//     }
//   });
// };




// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";

// export const generateAgreementPDF = (booking) => {
// return new Promise((resolve, reject) => {
// try {


//   /* ===============================
//      CREATE AGREEMENTS FOLDER
//   =============================== */

//   const uploadDir = path.join(process.cwd(), "uploads", "agreements");

//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   const fileName = `${booking.bookingNumber}.pdf`;
//   const filePath = path.join(uploadDir, fileName);

//   /* ===============================
//      FONT PATH (MARATHI SUPPORT)
//   =============================== */

//   const fontPath = path.join(
//     process.cwd(),
//     "src",
//     "utils",
//     "fonts",
//     "Mangal 400.ttf"
//   );

//   /* ===============================
//      CREATE PDF
//   =============================== */

//   const doc = new PDFDocument({
//     size: "A4",
//     margin: 40
//   });

//   const stream = fs.createWriteStream(filePath);

//   doc.pipe(stream);

//   /* ===============================
//      LOAD MARATHI FONT
//   =============================== */

//   if (fs.existsSync(fontPath)) {
//     doc.registerFont("marathi", fontPath);
//     doc.font("marathi");
//   }

//   /* ===============================
//      HEADER
//   =============================== */

//   doc.fontSize(16).text("॥ श्री ॥", { align: "center" });

//   doc.moveDown(0.5);

//   doc.fontSize(18).text("व्यंकटेश एंटरप्रायजेस", {
//     align: "center"
//   });

//   doc.moveDown(0.3);

//   doc.fontSize(10).text(
//     "प्रो. प्रा. सुमित दे. महाजन | मो. 9922223939",
//     { align: "center" }
//   );

//   doc.moveDown();

//   doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();

//   doc.moveDown();

//   /* ===============================
//      CUSTOMER DECLARATION
//   =============================== */

//   doc.fontSize(11).text(
//     `मी ${booking.customer.name}, मोबाईल नं. ${
//       booking.customer.mobile
//     }, खालील नमूद केलेली सर्व वस्तू भाड्याने घेत असून त्या वेळेत व सुस्थितीत परत करण्याची पूर्ण जबाबदारी माझी आहे.`
//   );

//   doc.moveDown();

//   /* ===============================
//      BOOKING DETAILS
//   =============================== */

//   const startDate = new Date(booking.startDate).toLocaleDateString("en-GB");
//   const endDate = new Date(booking.endDate).toLocaleDateString("en-GB");

//   doc.text(`बुकिंग नंबर: ${booking.bookingNumber}`);
//   doc.text(`दिनांक: ${startDate} ते ${endDate}`);
//   doc.text(`एकूण दिवस: ${booking.totalDays}`);

//   doc.moveDown();

//   /* ===============================
//      ITEM DETAILS
//   =============================== */

//   doc.fontSize(12).text("वस्तू तपशील:", { underline: true });

//   doc.moveDown(0.5);

//   doc.fontSize(11).text(
//     `• ${booking.item.name} (प्रमाण: ${booking.quantity})`
//   );

//   doc.text(`भाडे प्रति दिवस: ₹${booking.rentPerDay}`);

//   doc.text(`एकूण रक्कम: ₹${booking.totalAmount}`);

//   doc.moveDown();

//   /* ===============================
//      TERMS & CONDITIONS
//   =============================== */

//   doc.fontSize(12).text("नियम व अटी:", { underline: true });

//   doc.moveDown(0.5);

//   doc.fontSize(10).text(


// `• ठरलेल्या वेळेत वस्तू परत न केल्यास प्रति तास दंड आकारला जाईल.
// • वस्तू हरवल्यास किंवा नुकसान झाल्यास पूर्ण रक्कम देणे बंधनकारक आहे.
// • उपकरण दुसऱ्या व्यक्तीस देण्यास मनाई आहे.
// • कोणताही वाद झाल्यास मालकाचा निर्णय अंतिम राहील.`
// );


//   doc.moveDown(2);

//   /* ===============================
//      SIGNATURE SECTION
//   =============================== */

//   doc.text("ग्राहक सही: ____________________", {
//     align: "left"
//   });

//   doc.moveDown();

//   doc.text("मालक सही: ____________________", {
//     align: "right"
//   });

//   /* ===============================
//      FINISH PDF
//   =============================== */

//   doc.end();

//   stream.on("finish", () => {
//     resolve(filePath);
//   });

//   stream.on("error", (err) => {
//     reject(err);
//   });

// } catch (err) {
//   reject(err);
// }


// });
// };


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