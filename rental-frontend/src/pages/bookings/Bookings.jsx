
// //final 
// import { useEffect, useState } from "react";
// import api from "../../api/api";
// import { useNavigate } from "react-router-dom";
// import CreateBookingModal from "./CreateBookingModal";

// function Bookings() {
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState("");
//   const [showCreate, setShowCreate] = useState(false);
//   const [actionLoading, setActionLoading] = useState(null);

//   const navigate = useNavigate();

//   /* =========================
//      LOAD BOOKINGS
//   ========================= */
//   const loadBookings = async () => {
//     try {
//       const res = await api.get("/bookings");
//       setBookings(res.data.bookings || []);
//     } catch {
//       setError("Failed to load bookings");
//     }
//   };

//   useEffect(() => {
//     loadBookings();
//   }, []);

//   /* =========================
//      ACTIONS
//   ========================= */
//   const verifyBooking = async (id) => {
//     try {
//       setActionLoading(id);
//       await api.put(`/bookings/${id}/verify`);
//       loadBookings();
//     } catch {
//       alert("Failed to verify booking");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handoverBooking = async (id) => {
//     if (!window.confirm("Confirm item handover?")) return;

//     try {
//       setActionLoading(id);
//       await api.put(`/bookings/${id}/handover`);
//       loadBookings();
//     } catch {
//       alert("Failed to hand over booking");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const returnBooking = async (id) => {
//     if (!window.confirm("Confirm item return?")) return;

//     try {
//       setActionLoading(id);
//       await api.put(`/bookings/${id}/return`);
//       loadBookings();
//     } catch {
//       alert("Failed to return booking");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const deleteBooking = async (id) => {
//     if (!window.confirm("Delete this booking?")) return;

//     try {
//       await api.delete(`/bookings/${id}`);
//       loadBookings();
//     } catch (err) {
//       alert(err.response?.data?.message || "Delete failed");
//     }
//   };

//   const openAgreement = (id) => {
//     window.open(
//       `${import.meta.env.VITE_API_URL}/bookings/${id}/agreement`,
//       "_blank"
//     );
//   };

//   const formatDate = (date) =>
//     date ? new Date(date).toLocaleDateString("en-GB") : "—";

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div>
//       {/* HEADER */}
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
//         <h2>Bookings</h2>
//         <button onClick={() => setShowCreate(true)}>Create Booking</button>
//       </div>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <table border="1" width="100%" cellPadding="6">
//         <thead>
//           <tr>
//             <th>Booking No</th>
//             <th>Customer</th>
//             <th>Item</th>
//             <th>From</th>
//             <th>To</th>
//             <th>Days</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {bookings.map((b) => (
//             <tr key={b._id}>
//               <td>{b.bookingNumber}</td>
//               <td>{b.customer?.name || "—"}</td>
//               <td>{b.item?.name || "—"}</td>
//               <td>{formatDate(b.startDate)}</td>
//               <td>{formatDate(b.endDate)}</td>
//               <td>{b.totalDays}</td>
//               <td>
//                 <strong style={{ color: statusColor(b.status) }}>
//                   {b.status}
//                 </strong>
//               </td>

//               <td>
//                 {/* ENQUIRY */}
//                 {b.status === "ENQUIRY" && (
//                   <>
//                     <button
//                       disabled={actionLoading === b._id}
//                       onClick={() => verifyBooking(b._id)}
//                     >
//                       Verify
//                     </button>

//                     <button
//                       style={{ marginLeft: 6 }}
//                       onClick={() => navigate(`/bookings/${b._id}/edit`)}
//                     >
//                       Edit
//                     </button>

//                     <button
//                       style={{ marginLeft: 6, color: "red" }}
//                       onClick={() => deleteBooking(b._id)}
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}

//                 {/* VERIFIED */}
//                 {b.status === "VERIFIED" && (
//                   <>
//                     <button
//                       disabled={actionLoading === b._id}
//                       onClick={() => handoverBooking(b._id)}
//                     >
//                       Hand Over
//                     </button>

//                     <button
//                       style={{ marginLeft: 6 }}
//                       onClick={() => navigate(`/bookings/${b._id}/edit`)}
//                     >
//                       Edit
//                     </button>
//                   </>
//                 )}

//                 {/* HANDED OVER */}
//                 {b.status === "HANDED_OVER" && (
//                   <>
//                     <button
//                       disabled={actionLoading === b._id}
//                       onClick={() => returnBooking(b._id)}
//                     >
//                       Return
//                     </button>

//                     <button
//                       style={{ marginLeft: 6 }}
//                       onClick={() => openAgreement(b._id)}
//                     >
//                       Agreement
//                     </button>
//                   </>
//                 )}

//                 {/* RETURNED */}
//                 {b.status === "RETURNED" && (
//                   <button onClick={() => openAgreement(b._id)}>
//                     Agreement
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* CREATE BOOKING MODAL */}
//       {showCreate && (
//         <CreateBookingModal
//           onClose={() => setShowCreate(false)}
//           onSuccess={loadBookings}
//         />
//       )}
//     </div>
//   );
// }

// /* =========================
//    STATUS COLORS
// ========================= */
// const statusColor = (status) => {
//   switch (status) {
//     case "ENQUIRY":
//       return "gray";
//     case "VERIFIED":
//       return "blue";
//     case "HANDED_OVER":
//       return "orange";
//     case "RETURNED":
//       return "green";
//     default:
//       return "black";
//   }
// };

// export default Bookings;


// import { useEffect, useMemo, useState } from "react";
// import api from "../../api/api";
// import { useNavigate } from "react-router-dom";
// import CreateBookingModal from "./CreateBookingModal";

// /* =========================
//    STATUS FILTERS
// ========================= */
// const STATUS_FILTERS = [
//   "All",
//   "ENQUIRY",
//   "VERIFIED",
//   "HANDED_OVER",
//   "RETURNED"
// ];

// function Bookings() {
//   const navigate = useNavigate();

//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState("");
//   const [showCreate, setShowCreate] = useState(false);
//   const [actionLoading, setActionLoading] = useState(null);

//   const today = new Date().toISOString().split("T")[0];

//   const [filter, setFilter] = useState({
//     startDate: today,
//     endDate: today
//   });

//   const [status, setStatus] = useState("All");

//   /* =========================
//      LOAD BOOKINGS
//   ========================= */
//   const loadBookings = async () => {
//     try {
//       const res = await api.get("/bookings");
//       setBookings(res.data.bookings || []);
//     } catch {
//       setError("Failed to load bookings");
//     }
//   };

//   useEffect(() => {
//     loadBookings();
//   }, []);

//   /* =========================
//      DATE FILTER HELPERS
//   ========================= */
//   const applyDateFilter = () => {
//     if (!filter.startDate || !filter.endDate) {
//       alert("Please select both dates");
//       return;
//     }
//   };

//   const resetToToday = () => {
//     const todayValue = new Date().toISOString().split("T")[0];
//     setFilter({ startDate: todayValue, endDate: todayValue });
//   };

//   /* =========================
//      FILTERED BOOKINGS
//   ========================= */
//   const visibleBookings = useMemo(() => {
//     return bookings.filter((b) => {
//       const bookingDate = b.startDate?.split("T")[0];

//       const inDateRange =
//         bookingDate >= filter.startDate &&
//         bookingDate <= filter.endDate;

//       const statusMatch =
//         status === "All" || b.status === status;

//       return inDateRange && statusMatch;
//     });
//   }, [bookings, filter, status]);

//   /* =========================
//      ACTIONS (UNCHANGED)
//   ========================= */
//   const verifyBooking = async (id) => {
//     try {
//       setActionLoading(id);
//       await api.put(`/bookings/${id}/verify`);
//       loadBookings();
//     } catch {
//       alert("Failed to verify booking");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handoverBooking = async (id) => {
//     if (!window.confirm("Confirm item handover?")) return;

//     try {
//       setActionLoading(id);
//       await api.put(`/bookings/${id}/handover`);
//       loadBookings();
//     } catch {
//       alert("Failed to hand over booking");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const returnBooking = async (id) => {
//     if (!window.confirm("Confirm item return?")) return;

//     try {
//       setActionLoading(id);
//       await api.put(`/bookings/${id}/return`);
//       loadBookings();
//     } catch {
//       alert("Failed to return booking");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const deleteBooking = async (id) => {
//     if (!window.confirm("Delete this booking?")) return;

//     try {
//       await api.delete(`/bookings/${id}`);
//       loadBookings();
//     } catch (err) {
//       alert(err.response?.data?.message || "Delete failed");
//     }
//   };

//   const openAgreement = (id) => {
//     window.open(
//       `${import.meta.env.VITE_API_URL}/bookings/${id}/agreement`,
//       "_blank"
//     );
//   };

//   const formatDate = (date) =>
//     date ? new Date(date).toLocaleDateString("en-GB") : "—";

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div>
//       {/* HEADER */}
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
//         <h2>Bookings</h2>
//         <button onClick={() => setShowCreate(true)}>
//           Create Booking
//         </button>
//       </div>

//       {/* FILTER BAR */}
//       <div style={{ marginBottom: 12 }}>
//         <input
//           type="date"
//           value={filter.startDate}
//           onChange={(e) =>
//             setFilter({ ...filter, startDate: e.target.value })
//           }
//         />
//         <input
//           type="date"
//           style={{ marginLeft: 6 }}
//           value={filter.endDate}
//           onChange={(e) =>
//             setFilter({ ...filter, endDate: e.target.value })
//           }
//         />

//         <button style={{ marginLeft: 6 }} onClick={applyDateFilter}>
//           Apply
//         </button>
//         <button style={{ marginLeft: 6 }} onClick={resetToToday}>
//           Today
//         </button>
//       </div>

//       {/* STATUS FILTER */}
//       <div style={{ marginBottom: 12 }}>
//         {STATUS_FILTERS.map((s) => (
//           <button
//             key={s}
//             onClick={() => setStatus(s)}
//             style={{
//               marginRight: 6,
//               fontWeight: status === s ? "bold" : "normal"
//             }}
//           >
//             {s}
//           </button>
//         ))}
//       </div>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* TABLE */}
//       <table border="1" width="100%" cellPadding="6">
//         <thead>
//           <tr>
//             <th>Booking No</th>
//             <th>Customer</th>
//             <th>Item</th>
//             <th>From</th>
//             <th>To</th>
//             <th>Days</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {visibleBookings.map((b) => (
//             <tr key={b._id}>
//               <td>{b.bookingNumber}</td>
//               <td>{b.customer?.name || "—"}</td>
//               <td>{b.item?.name || "—"}</td>
//               <td>{formatDate(b.startDate)}</td>
//               <td>{formatDate(b.endDate)}</td>
//               <td>{b.totalDays}</td>
//               <td>
//                 <strong style={{ color: statusColor(b.status) }}>
//                   {b.status}
//                 </strong>
//               </td>

//               <td>
//                 {/* ENQUIRY */}
//                 {b.status === "ENQUIRY" && (
//                   <>
//                     <button
//                       disabled={actionLoading === b._id}
//                       onClick={() => verifyBooking(b._id)}
//                     >
//                       Verify
//                     </button>
//                     <button
//                       style={{ marginLeft: 6 }}
//                       onClick={() => navigate(`/bookings/${b._id}/edit`)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       style={{ marginLeft: 6, color: "red" }}
//                       onClick={() => deleteBooking(b._id)}
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}

//                 {/* VERIFIED */}
//                 {b.status === "VERIFIED" && (
//                   <>
//                     <button
//                       disabled={actionLoading === b._id}
//                       onClick={() => handoverBooking(b._id)}
//                     >
//                       Hand Over
//                     </button>
//                     <button
//                       style={{ marginLeft: 6 }}
//                       onClick={() => navigate(`/bookings/${b._id}/edit`)}
//                     >
//                       Edit
//                     </button>
//                   </>
//                 )}

//                 {/* HANDED OVER */}
//                 {b.status === "HANDED_OVER" && (
//                   <>
//                     <button
//                       disabled={actionLoading === b._id}
//                       onClick={() => returnBooking(b._id)}
//                     >
//                       Return
//                     </button>
//                     <button
//                       style={{ marginLeft: 6 }}
//                       onClick={() => openAgreement(b._id)}
//                     >
//                       Agreement
//                     </button>
//                   </>
//                 )}

//                 {/* RETURNED */}
//                 {b.status === "RETURNED" && (
//                   <button onClick={() => openAgreement(b._id)}>
//                     Agreement
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}

//           {visibleBookings.length === 0 && (
//             <tr>
//               <td colSpan="8" align="center">
//                 No bookings found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* CREATE BOOKING MODAL */}
//       {showCreate && (
//         <CreateBookingModal
//           onClose={() => setShowCreate(false)}
//           onSuccess={loadBookings}
//         />
//       )}
//     </div>
//   );
// }

// /* =========================
//    STATUS COLORS
// ========================= */
// const statusColor = (status) => {
//   switch (status) {
//     case "ENQUIRY":
//       return "gray";
//     case "VERIFIED":
//       return "blue";
//     case "HANDED_OVER":
//       return "orange";
//     case "RETURNED":
//       return "green";
//     default:
//       return "black";
//   }
// };

// export default Bookings;




// import { useEffect, useMemo, useState } from "react";
// import api from "../../api/api";
// import { useNavigate } from "react-router-dom";
// import CreateBookingModal from "./CreateBookingModal";
// import { 
//   Calendar, 
//   Filter, 
//   RefreshCw, 
//   Plus, 
//   ChevronDown,
//   ChevronUp,
//   Eye,
//   Edit,
//   Trash2,
//   FileText,
//   CheckCircle,
//   Clock,
//   ArrowLeft
// } from "lucide-react";

// /* =========================
//    STATUS FILTERS
// ========================= */
// const STATUS_FILTERS = [
//   "All",
//   "ENQUIRY",
//   "VERIFIED",
//   "HANDED_OVER",
//   "RETURNED"
// ];

// const statusConfig = {
//   ENQUIRY: {
//     color: "bg-gray-100 text-gray-800",
//     label: "Enquiry",
//     badgeColor: "bg-gray-500",
//     icon: Clock
//   },
//   VERIFIED: {
//     color: "bg-blue-100 text-blue-800",
//     label: "Verified",
//     badgeColor: "bg-blue-500",
//     icon: CheckCircle
//   },
//   HANDED_OVER: {
//     color: "bg-orange-100 text-orange-800",
//     label: "Handed Over",
//     badgeColor: "bg-orange-500",
//     icon: Clock
//   },
//   RETURNED: {
//     color: "bg-green-100 text-green-800",
//     label: "Returned",
//     badgeColor: "bg-green-500",
//     icon: CheckCircle
//   }
// };

// function Bookings() {
//   const navigate = useNavigate();

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showCreate, setShowCreate] = useState(false);
//   const [actionLoading, setActionLoading] = useState(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [animateItems, setAnimateItems] = useState(false);

//   const today = new Date().toISOString().split("T")[0];

//   const [filter, setFilter] = useState({
//     startDate: today,
//     endDate: today
//   });

//   const [status, setStatus] = useState("All");
//   const [dateFilterApplied, setDateFilterApplied] = useState(false);

//   /* =========================
//      LOAD BOOKINGS
//   ========================= */
//   const loadBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/bookings");
//       setBookings(res.data.bookings || []);
//       setError("");
//       // Trigger animation after data loads
//       setTimeout(() => setAnimateItems(true), 100);
//     } catch {
//       setError("Failed to load bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadBookings();
//   }, []);

//   /* =========================
//      DATE FILTER HELPERS
//   ========================= */
//   // const applyDateFilter = () => {
//   //   if (!filter.startDate || !filter.endDate) {
//   //     alert("Please select both dates");
//   //     return;
//   //   }
//   //   setAnimateItems(false);
//   //   setTimeout(() => setAnimateItems(true), 300);
//   // };

// const applyDateFilter = () => {
//   if (!filter.startDate || !filter.endDate) {
//     alert("Please select both dates");
//     return;
//   }

//   setDateFilterApplied(true);

//   setAnimateItems(false);
//   setTimeout(() => setAnimateItems(true), 300);
// };

//   // const resetToToday = () => {
//   //   const todayValue = new Date().toISOString().split("T")[0];
//   //   setFilter({ startDate: todayValue, endDate: todayValue });
//   //   setAnimateItems(false);
//   //   setTimeout(() => setAnimateItems(true), 300);
//   // };

//   const resetToToday = () => {
//   const todayValue = new Date().toISOString().split("T")[0];

//   setFilter({
//     startDate: todayValue,
//     endDate: todayValue
//   });

//   setDateFilterApplied(false);

//   setAnimateItems(false);
//   setTimeout(() => setAnimateItems(true), 300);
// };

//   /* =========================
//      FILTERED BOOKINGS
//   ========================= */
//   // const visibleBookings = useMemo(() => {
//   //   return bookings.filter((b) => {
//   //     const bookingDate = b.startDate?.split("T")[0];

//   //     const inDateRange =
//   //       bookingDate >= filter.startDate &&
//   //       bookingDate <= filter.endDate;

//   //     const statusMatch =
//   //       status === "All" || b.status === status;

//   //     return inDateRange && statusMatch;
//   //   });
//   // }, [bookings, filter, status]);

//   const visibleBookings = useMemo(() => {

//   let filtered = [...bookings];

//   // SORT NEWEST BOOKINGS FIRST
//   filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//   // APPLY DATE FILTER ONLY AFTER CLICKING APPLY
//   if (dateFilterApplied) {
//     filtered = filtered.filter((b) => {
//       const bookingDate = b.startDate?.split("T")[0];

//       return (
//         bookingDate >= filter.startDate &&
//         bookingDate <= filter.endDate
//       );
//     });
//   }

//   // STATUS FILTER
//   if (status !== "All") {
//     filtered = filtered.filter((b) => b.status === status);
//   }

//   return filtered;

// }, [bookings, filter, status, dateFilterApplied]);

//   /* =========================
//      ACTIONS
//   ========================= */
//   const verifyBooking = async (id) => {
//     try {
//       setActionLoading(id);
//       await api.put(`/bookings/${id}/verify`);
//       await loadBookings();
//     } catch {
//       alert("Failed to verify booking");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handoverBooking = async (id) => {
//     if (!window.confirm("Confirm item handover?")) return;

//     try {
//       setActionLoading(id);
//       await api.put(`/bookings/${id}/handover`);
//       await loadBookings();
//     } catch {
//       alert("Failed to hand over booking");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const returnBooking = async (id) => {
//     if (!window.confirm("Confirm item return?")) return;

//     try {
//       setActionLoading(id);
//       await api.put(`/bookings/${id}/return`);
//       await loadBookings();
//     } catch {
//       alert("Failed to return booking");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const deleteBooking = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) return;

//     try {
//       setActionLoading(id);
//       await api.delete(`/bookings/${id}`);
//       await loadBookings();
//     } catch (err) {
//       alert(err.response?.data?.message || "Delete failed");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const openAgreement = (id) => {
//     window.open(
//       `${import.meta.env.VITE_API_URL}/bookings/${id}/agreement`,
//       "_blank"
//     );
//   };

//   const formatDate = (date) =>
//     date ? new Date(date).toLocaleDateString("en-GB") : "—";

//   /* =========================
//      STATS CALCULATIONS
//   ========================= */
//   const stats = useMemo(() => ({
//     total: bookings.length,
//     active: bookings.filter(b => b.status === "VERIFIED" || b.status === "HANDED_OVER").length,
//     enquiry: bookings.filter(b => b.status === "ENQUIRY").length,
//     returned: bookings.filter(b => b.status === "RETURNED").length
//   }), [bookings]);

//   /* =========================
//      RESPONSIVE TABLE RENDER
//   ========================= */
//   const renderMobileCard = (b, index) => {
//     const statusInfo = statusConfig[b.status] || {
//       color: "bg-gray-100 text-gray-800",
//       label: b.status,
//       badgeColor: "bg-gray-500",
//       icon: Clock
//     };
//     const StatusIcon = statusInfo.icon;

//     return (
//       <div 
//         key={b._id} 
//         className={`
//           bg-white rounded-xl border border-gray-200 p-5 mb-4 
//           shadow-sm hover:shadow-md transition-all duration-300
//           transform hover:-translate-y-1
//           ${animateItems ? 'animate-slideInUp' : 'opacity-0'}
//         `}
//         style={{ animationDelay: `${index * 0.05}s` }}
//       >
//         {/* CARD HEADER */}
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-base mr-3 shadow-md">
//               #{b.bookingNumber?.slice(-4) || "000"}
//             </div>
//             <div>
//               <div className="font-semibold text-gray-900 text-base">#{b.bookingNumber}</div>
//               <div className="text-xs text-gray-500 mt-0.5">ID: {b._id.slice(-6)}</div>
//             </div>
//           </div>
//           <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
//             <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
//             {statusInfo.label}
//           </span>
//         </div>

//         {/* CUSTOMER & ITEM INFO */}
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           <div className="bg-gray-50 rounded-xl p-3">
//             <div className="text-xs text-gray-500 mb-1">Customer</div>
//             <div className="font-medium text-gray-900 text-base truncate">{b.customer?.name || "—"}</div>
//             <div className="text-sm text-gray-600 truncate">{b.customer?.mobile || "No contact"}</div>
//           </div>
//           <div className="bg-gray-50 rounded-xl p-3">
//             <div className="text-xs text-gray-500 mb-1">Item</div>
//             <div className="font-medium text-gray-900 text-base truncate">{b.item?.name || "—"}</div>
//             <div className="text-sm text-gray-600 truncate">{b.item?.category || "—"}</div>
//           </div>
//         </div>

//         {/* DATES & DAYS */}
//         <div className="grid grid-cols-3 gap-3 mb-5">
//           <div className="bg-blue-50 rounded-xl p-3">
//             <div className="text-xs text-blue-600 mb-1">From</div>
//             <div className="font-medium text-gray-900 text-base">{formatDate(b.startDate)}</div>
//           </div>
//           <div className="bg-blue-50 rounded-xl p-3">
//             <div className="text-xs text-blue-600 mb-1">To</div>
//             <div className="font-medium text-gray-900 text-base">{formatDate(b.endDate)}</div>
//           </div>
//           <div className="bg-purple-50 rounded-xl p-3 text-center">
//             <div className="text-xs text-purple-600 mb-1">Days</div>
//             <div className="font-bold text-gray-900 text-lg">{b.totalDays || 0}</div>
//           </div>
//         </div>

//         {/* ACTIONS */}
//         <div className="grid grid-cols-2 gap-3">
//           {/* ENQUIRY */}
//           {b.status === "ENQUIRY" && (
//             <>
//               <button
//                 disabled={actionLoading === b._id}
//                 onClick={() => verifyBooking(b._id)}
//                 className="col-span-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center gap-2"
//               >
//                 {actionLoading === b._id ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 ) : (
//                   <>
//                     <CheckCircle className="w-4 h-4" />
//                     Verify
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={() => navigate(`/bookings/${b._id}/edit`)}
//                 className="col-span-1 px-4 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
//               >
//                 <Edit className="w-4 h-4" />
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteBooking(b._id)}
//                 disabled={actionLoading === b._id}
//                 className="col-span-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center gap-2"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Delete
//               </button>
//             </>
//           )}

//           {/* VERIFIED */}
//           {b.status === "VERIFIED" && (
//             <>
//               <button
//                 disabled={actionLoading === b._id}
//                 onClick={() => handoverBooking(b._id)}
//                 className="col-span-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center gap-2"
//               >
//                 {actionLoading === b._id ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 ) : (
//                   <>
//                     <Clock className="w-4 h-4" />
//                     Hand Over
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={() => navigate(`/bookings/${b._id}/edit`)}
//                 className="col-span-1 px-4 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
//               >
//                 <Edit className="w-4 h-4" />
//                 Edit
//               </button>
//               <button
//                 onClick={() => navigate(`/bookings/${b._id}`)}
//                 className="col-span-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
//               >
//                 <Eye className="w-4 h-4" />
//                 View Details
//               </button>
//             </>
//           )}

//           {/* HANDED OVER */}
//           {b.status === "HANDED_OVER" && (
//             <>
//               <button
//                 disabled={actionLoading === b._id}
//                 onClick={() => returnBooking(b._id)}
//                 className="col-span-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center gap-2"
//               >
//                 {actionLoading === b._id ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 ) : (
//                   <>
//                     <CheckCircle className="w-4 h-4" />
//                     Return
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={() => openAgreement(b._id)}
//                 className="col-span-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
//               >
//                 <FileText className="w-4 h-4" />
//                 Agreement
//               </button>
//               <button
//                 onClick={() => navigate(`/bookings/${b._id}`)}
//                 className="col-span-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
//               >
//                 <Eye className="w-4 h-4" />
//                 View
//               </button>
//             </>
//           )}

//           {/* RETURNED */}
//           {b.status === "RETURNED" && (
//             <>
//               <button
//                 onClick={() => openAgreement(b._id)}
//                 className="col-span-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
//               >
//                 <FileText className="w-4 h-4" />
//                 Agreement
//               </button>
//               <button
//                 onClick={() => navigate(`/bookings/${b._id}`)}
//                 className="col-span-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
//               >
//                 <Eye className="w-4 h-4" />
//                 View
//               </button>
//             </>
//           )}

//           {/* DEFAULT VIEW FOR ALL */}
//           {!["ENQUIRY", "VERIFIED", "HANDED_OVER", "RETURNED"].includes(b.status) && (
//             <button
//               onClick={() => navigate(`/bookings/${b._id}`)}
//               className="col-span-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
//             >
//               <Eye className="w-4 h-4" />
//               View Details
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
//         {/* HEADER */}
//         <div className="mb-6 animate-fadeIn">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Booking Management</h1>
//               <p className="text-gray-600 text-sm sm:text-base mt-1">
//                 Track and manage all equipment bookings
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="md:hidden px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
//               >
//                 <Filter className="w-4 h-4" />
//                 Filters
//                 {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//               </button>
//               <button
//                 onClick={() => setShowCreate(true)}
//                 className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>Create Booking</span>
//               </button>
//             </div>
//           </div>

//           {/* STATS CARDS */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
//             {[
//               { label: 'Total Bookings', value: stats.total, color: 'blue', delay: 0, icon: '📊' },
//               { label: 'Active Rentals', value: stats.active, color: 'orange', delay: 100, icon: '🔄' },
//               { label: 'Pending Enquiry', value: stats.enquiry, color: 'gray', delay: 200, icon: '⏳' },
//               { label: 'Completed', value: stats.returned, color: 'green', delay: 300, icon: '✅' }
//             ].map((stat, idx) => (
//               <div 
//                 key={idx}
//                 className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp"
//                 style={{ animationDelay: `${stat.delay}ms` }}
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <span className={`text-2xl`}>{stat.icon}</span>
//                   <span className={`text-xs font-medium text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded-full`}>
//                     {stat.label.split(' ')[0]}
//                   </span>
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
//                 <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* FILTERS SECTION */}
//         <div className={`${showFilters ? 'block' : 'hidden md:block'} space-y-4 mb-6 animate-slideInDown`}>
//           {/* DATE FILTER */}
//           <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
//             <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Calendar className="w-5 h-5 text-blue-600" />
//               Date Range
//             </h3>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 w-full">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
//                   <input
//                     type="date"
//                     value={filter.startDate}
//                     onChange={(e) =>
//                       setFilter({ ...filter, startDate: e.target.value })
//                     }
//                     className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
//                   <input
//                     type="date"
//                     value={filter.endDate}
//                     onChange={(e) =>
//                       setFilter({ ...filter, endDate: e.target.value })
//                     }
//                     className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                   />
//                 </div>
//               </div>
//               <div className="flex gap-3 w-full sm:w-auto">
//                 <button 
//                   onClick={applyDateFilter}
//                   className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
//                 >
//                   Apply
//                 </button>
//                 <button 
//                   onClick={resetToToday}
//                   className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all duration-200"
//                 >
//                   Today
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* STATUS FILTER */}
//           <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
//             <h3 className="text-base font-semibold text-gray-900 mb-4">Status</h3>
//             <div className="flex flex-wrap gap-2">
//               {STATUS_FILTERS.map((s, idx) => {
//                 const isActive = status === s;
//                 const config = s === "All" 
//                   ? { label: "All Bookings" }
//                   : statusConfig[s];
                
//                 return (
//                   <button
//                     key={s}
//                     onClick={() => setStatus(s)}
//                     className={`
//                       px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
//                       transform hover:scale-105 animate-fadeIn
//                       ${isActive
//                         ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }
//                     `}
//                     style={{ animationDelay: `${idx * 50}ms` }}
//                   >
//                     {config.label || s}
//                     {s !== "All" && (
//                       <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white bg-opacity-20">
//                         {bookings.filter(b => b.status === s).length}
//                       </span>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* ERROR MESSAGE */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-shake">
//             <p className="text-red-700 text-sm font-medium">{error}</p>
//           </div>
//         )}

//         {/* BOOKINGS LIST */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Bookings List
//                 <span className="text-sm font-normal text-gray-600 ml-3">
//                   ({visibleBookings.length} bookings)
//                 </span>
//               </h3>
//               <button
//                 onClick={() => {
//                   setAnimateItems(false);
//                   loadBookings();
//                 }}
//                 className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2"
//               >
//                 <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//                 Refresh
//               </button>
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="relative">
//                 <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* MOBILE VIEW - CARDS */}
//               <div className="md:hidden p-4">
//                 {visibleBookings.length > 0 ? (
//                   visibleBookings.map((booking, index) => renderMobileCard(booking, index))
//                 ) : (
//                   <div className="text-center py-12 animate-fadeIn">
//                     <div className="text-gray-300 text-5xl mb-4">📋</div>
//                     <h4 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Found</h4>
//                     <p className="text-sm text-gray-600 mb-4">
//                       {status !== "All" 
//                         ? `No ${status.toLowerCase().replace("_", " ")} bookings found for selected dates.` 
//                         : 'No bookings found for selected dates.'}
//                     </p>
//                     <button
//                       onClick={() => setShowCreate(true)}
//                       className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
//                     >
//                       Create Booking
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* DESKTOP VIEW - TABLE */}
//               <div className="hidden md:block overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       {['Booking #', 'Customer', 'Item', 'Period', 'Days', 'Status', 'Actions'].map((header, idx) => (
//                         <th 
//                           key={idx}
//                           scope="col" 
//                           className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
//                         >
//                           {header}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {visibleBookings.map((b, index) => {
//                       const statusInfo = statusConfig[b.status] || {
//                         color: "bg-gray-100 text-gray-800",
//                         label: b.status,
//                         badgeColor: "bg-gray-500",
//                         icon: Clock
//                       };
//                       const StatusIcon = statusInfo.icon;

//                       return (
//                         <tr 
//                           key={b._id} 
//                           className={`
//                             hover:bg-gray-50 transition-all duration-200
//                             ${animateItems ? 'animate-fadeIn' : 'opacity-0'}
//                           `}
//                           style={{ animationDelay: `${index * 0.03}s` }}
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm mr-3 shadow-md">
//                                 #{b.bookingNumber?.slice(-4) || "000"}
//                               </div>
//                               <div>
//                                 <div className="text-base font-medium text-gray-900">#{b.bookingNumber}</div>
//                                 <div className="text-xs text-gray-500 mt-0.5">ID: {b._id.slice(-6)}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div>
//                               <div className="text-base font-medium text-gray-900">{b.customer?.name || "—"}</div>
//                               <div className="text-sm text-gray-500">{b.customer?.mobile || "No contact"}</div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div>
//                               <div className="text-base font-medium text-gray-900">{b.item?.name || "—"}</div>
//                               <div className="text-sm text-gray-500">{b.item?.category || "—"}</div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-base text-gray-900">
//                               <div>{formatDate(b.startDate)}</div>
//                               <div className="text-sm text-gray-500 mt-0.5">to {formatDate(b.endDate)}</div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className="inline-flex items-center justify-center h-9 w-9 bg-blue-100 text-blue-800 rounded-xl text-base font-bold">
//                               {b.totalDays || 0}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium ${statusInfo.color}`}>
//                               <StatusIcon className="w-4 h-4 mr-1.5" />
//                               {statusInfo.label}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-2">
//                               {/* ENQUIRY */}
//                               {b.status === "ENQUIRY" && (
//                                 <>
//                                   <button
//                                     disabled={actionLoading === b._id}
//                                     onClick={() => verifyBooking(b._id)}
//                                     className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-md"
//                                     title="Verify"
//                                   >
//                                     {actionLoading === b._id ? (
//                                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                     ) : (
//                                       <CheckCircle className="w-5 h-5" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => navigate(`/bookings/${b._id}/edit`)}
//                                     className="p-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 transform hover:scale-110"
//                                     title="Edit"
//                                   >
//                                     <Edit className="w-5 h-5" />
//                                   </button>
//                                   <button
//                                     onClick={() => deleteBooking(b._id)}
//                                     disabled={actionLoading === b._id}
//                                     className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-md"
//                                     title="Delete"
//                                   >
//                                     <Trash2 className="w-5 h-5" />
//                                   </button>
//                                 </>
//                               )}

//                               {/* VERIFIED */}
//                               {b.status === "VERIFIED" && (
//                                 <>
//                                   <button
//                                     disabled={actionLoading === b._id}
//                                     onClick={() => handoverBooking(b._id)}
//                                     className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-md"
//                                     title="Hand Over"
//                                   >
//                                     {actionLoading === b._id ? (
//                                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                     ) : (
//                                       <Clock className="w-5 h-5" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => navigate(`/bookings/${b._id}/edit`)}
//                                     className="p-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 transform hover:scale-110"
//                                     title="Edit"
//                                   >
//                                     <Edit className="w-5 h-5" />
//                                   </button>
//                                   <button
//                                     onClick={() => navigate(`/bookings/${b._id}`)}
//                                     className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
//                                     title="View"
//                                   >
//                                     <Eye className="w-5 h-5" />
//                                   </button>
//                                 </>
//                               )}

//                               {/* HANDED OVER */}
//                               {b.status === "HANDED_OVER" && (
//                                 <>
//                                   <button
//                                     disabled={actionLoading === b._id}
//                                     onClick={() => returnBooking(b._id)}
//                                     className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-md"
//                                     title="Return"
//                                   >
//                                     {actionLoading === b._id ? (
//                                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                     ) : (
//                                       <CheckCircle className="w-5 h-5" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => openAgreement(b._id)}
//                                     className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
//                                     title="Agreement"
//                                   >
//                                     <FileText className="w-5 h-5" />
//                                   </button>
//                                   <button
//                                     onClick={() => navigate(`/bookings/${b._id}`)}
//                                     className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
//                                     title="View"
//                                   >
//                                     <Eye className="w-5 h-5" />
//                                   </button>
//                                 </>
//                               )}

//                               {/* RETURNED */}
//                               {b.status === "RETURNED" && (
//                                 <>
//                                   <button
//                                     onClick={() => openAgreement(b._id)}
//                                     className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
//                                     title="Agreement"
//                                   >
//                                     <FileText className="w-5 h-5" />
//                                   </button>
//                                   <button
//                                     onClick={() => navigate(`/bookings/${b._id}`)}
//                                     className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
//                                     title="View"
//                                   >
//                                     <Eye className="w-5 h-5" />
//                                   </button>
//                                 </>
//                               )}

//                               {/* DEFAULT */}
//                               {!["ENQUIRY", "VERIFIED", "HANDED_OVER", "RETURNED"].includes(b.status) && (
//                                 <button
//                                   onClick={() => navigate(`/bookings/${b._id}`)}
//                                   className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
//                                   title="View"
//                                 >
//                                   <Eye className="w-5 h-5" />
//                                 </button>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}

//                     {visibleBookings.length === 0 && (
//                       <tr>
//                         <td colSpan="7" className="px-6 py-12 text-center">
//                           <div className="text-gray-300 text-5xl mb-4">📋</div>
//                           <h4 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Found</h4>
//                           <p className="text-sm text-gray-600 mb-4">
//                             {status !== "All" 
//                               ? `No ${status.toLowerCase().replace("_", " ")} bookings found for selected dates.` 
//                               : 'No bookings found for selected dates.'}
//                           </p>
//                           <button
//                             onClick={() => setShowCreate(true)}
//                             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
//                           >
//                             Create Booking
//                           </button>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}

//           {/* FOOTER */}
//           <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-gray-600">
//                 Showing <span className="font-medium">{visibleBookings.length}</span> bookings
//                 {status !== "All" && ` (${statusConfig[status]?.label})`}
//               </div>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CREATE BOOKING MODAL */}
//       {showCreate && (
//         <CreateBookingModal
//           onClose={() => setShowCreate(false)}
//           onSuccess={loadBookings}
//         />
//       )}

//       <style jsx>{`
//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes slideInDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
//           20%, 40%, 60%, 80% { transform: translateX(5px); }
//         }
//         .animate-slideInUp {
//           animation: slideInUp 0.5s ease-out forwards;
//         }
//         .animate-slideInDown {
//           animation: slideInDown 0.5s ease-out forwards;
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out forwards;
//         }
//         .animate-shake {
//           animation: shake 0.6s ease-in-out;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Bookings;





import { useEffect, useMemo, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import CreateBookingModal from "./CreateBookingModal";
import { 
  Calendar, 
  Filter, 
  RefreshCw, 
  Plus, 
  ChevronDown,
  ChevronUp,
  Eye,
  Edit,
  Trash2,
  FileText,
  CheckCircle,
  Clock,
  ArrowLeft,
  Users,
  Package,
  AlertCircle,
  Loader,
  Sparkles,
  CalendarRange,
  Hash,
  User,
  Phone,
  Tag,
  XCircle,
  Download
} from "lucide-react";

/* =========================
   STATUS FILTERS
========================= */
const STATUS_FILTERS = [
  "All",
  "ENQUIRY",
  "VERIFIED",
  "HANDED_OVER",
  "RETURNED"
];

const statusConfig = {
  ENQUIRY: {
    color: "bg-gray-100 text-gray-700",
    label: "Enquiry",
    badgeColor: "bg-gray-500",
    icon: Clock,
    bg: "bg-gray-50"
  },
  VERIFIED: {
    color: "bg-blue-100 text-blue-700",
    label: "Verified",
    badgeColor: "bg-blue-500",
    icon: CheckCircle,
    bg: "bg-blue-50"
  },
  HANDED_OVER: {
    color: "bg-orange-100 text-orange-700",
    label: "Handed Over",
    badgeColor: "bg-orange-500",
    icon: Package,
    bg: "bg-orange-50"
  },
  RETURNED: {
    color: "bg-green-100 text-green-700",
    label: "Returned",
    badgeColor: "bg-green-500",
    icon: CheckCircle,
    bg: "bg-green-50"
  }
};

function Bookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const [filter, setFilter] = useState({
    startDate: today,
    endDate: today
  });

  const [status, setStatus] = useState("All");
  const [dateFilterApplied, setDateFilterApplied] = useState(false);

  /* =========================
     LOAD BOOKINGS
  ========================= */
  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings");
      setBookings(res.data.bookings || []);
      setError("");
      setTimeout(() => setAnimateItems(true), 100);
    } catch {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  /* =========================
     DATE FILTER HELPERS
  ========================= */
  const applyDateFilter = () => {
    if (!filter.startDate || !filter.endDate) {
      setError("Please select both dates");
      return;
    }

    if (new Date(filter.endDate) < new Date(filter.startDate)) {
      setError("End date cannot be before start date");
      return;
    }

    setDateFilterApplied(true);
    setError("");
    setAnimateItems(false);
    setTimeout(() => setAnimateItems(true), 300);
  };

  const resetToToday = () => {
    const todayValue = new Date().toISOString().split("T")[0];

    setFilter({
      startDate: todayValue,
      endDate: todayValue
    });

    setDateFilterApplied(false);
    setError("");
    setAnimateItems(false);
    setTimeout(() => setAnimateItems(true), 300);
  };

  /* =========================
     FILTERED BOOKINGS
  ========================= */
  const visibleBookings = useMemo(() => {
    let filtered = [...bookings];

    // Sort newest first
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Apply date filter only when applied
    if (dateFilterApplied) {
      filtered = filtered.filter((b) => {
        const bookingDate = b.startDate?.split("T")[0];
        return (
          bookingDate >= filter.startDate &&
          bookingDate <= filter.endDate
        );
      });
    }

    // Apply status filter
    if (status !== "All") {
      filtered = filtered.filter((b) => b.status === status);
    }

    return filtered;
  }, [bookings, filter, status, dateFilterApplied]);

  /* =========================
     ACTIONS
  ========================= */
  const verifyBooking = async (id) => {
    try {
      setActionLoading(id);
      await api.put(`/bookings/${id}/verify`);
      await loadBookings();
    } catch {
      alert("Failed to verify booking");
    } finally {
      setActionLoading(null);
    }
  };

  const handoverBooking = async (id) => {
    if (!window.confirm("Confirm item handover?")) return;

    try {
      setActionLoading(id);
      await api.put(`/bookings/${id}/handover`);
      await loadBookings();
    } catch {
      alert("Failed to hand over booking");
    } finally {
      setActionLoading(null);
    }
  };

  const returnBooking = async (id) => {
    if (!window.confirm("Confirm item return?")) return;

    try {
      setActionLoading(id);
      await api.put(`/bookings/${id}/return`);
      await loadBookings();
    } catch {
      alert("Failed to return booking");
    } finally {
      setActionLoading(null);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      setActionLoading(id);
      await api.delete(`/bookings/${id}`);
      await loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setActionLoading(null);
    }
  };

  const openAgreement = (id) => {
    window.open(
      `${import.meta.env.VITE_API_URL}/bookings/${id}/agreement`,
      "_blank"
    );
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "—";

  /* =========================
     STATS CALCULATIONS
  ========================= */
  const stats = useMemo(() => ({
    total: bookings.length,
    active: bookings.filter(b => b.status === "VERIFIED" || b.status === "HANDED_OVER").length,
    enquiry: bookings.filter(b => b.status === "ENQUIRY").length,
    returned: bookings.filter(b => b.status === "RETURNED").length
  }), [bookings]);

  /* =========================
     RESPONSIVE TABLE RENDER
  ========================= */
  const renderMobileCard = (b, index) => {
    const statusInfo = statusConfig[b.status] || {
      color: "bg-gray-100 text-gray-700",
      label: b.status,
      badgeColor: "bg-gray-500",
      icon: Clock,
      bg: "bg-gray-50"
    };
    const StatusIcon = statusInfo.icon;

    return (
      <div 
        key={b._id} 
        className={`
          bg-white rounded-xl border border-gray-200 p-5 mb-4 
          shadow-sm hover:shadow-lg transition-all duration-300
          transform hover:-translate-y-1
          ${animateItems ? 'animate-slideInUp' : 'opacity-0'}
        `}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {/* Card Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-base mr-3 shadow-md">
              <Hash className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-base">#{b.bookingNumber}</div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <Calendar className="h-3 w-3" />
                {formatDate(b.createdAt)}
              </div>
            </div>
          </div>
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
            <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
            {statusInfo.label}
          </span>
        </div>

        {/* Customer & Item Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`rounded-xl p-3 ${statusInfo.bg}`}>
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-600">Customer</span>
            </div>
            <div className="font-medium text-gray-900 text-base truncate">{b.customer?.name || "—"}</div>
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <Phone className="h-3 w-3" />
              {b.customer?.mobile || "No contact"}
            </div>
          </div>
          <div className={`rounded-xl p-3 ${statusInfo.bg}`}>
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-600">Item</span>
            </div>
            <div className="font-medium text-gray-900 text-base truncate">{b.item?.name || "—"}</div>
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <Tag className="h-3 w-3" />
              {b.item?.category || "—"}
            </div>
          </div>
        </div>

        {/* Dates & Days */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-blue-50 rounded-xl p-3">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="h-3 w-3 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">From</span>
            </div>
            <div className="font-medium text-gray-900 text-sm">{formatDate(b.startDate)}</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-3">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="h-3 w-3 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">To</span>
            </div>
            <div className="font-medium text-gray-900 text-sm">{formatDate(b.endDate)}</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-3 w-3 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">Days</span>
            </div>
            <div className="font-bold text-gray-900 text-lg">{b.totalDays || 0}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          {/* ENQUIRY */}
          {b.status === "ENQUIRY" && (
            <>
              <button
                disabled={actionLoading === b._id}
                onClick={() => verifyBooking(b._id)}
                className="col-span-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center gap-2"
              >
                {actionLoading === b._id ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Verify
                  </>
                )}
              </button>
              <button
                onClick={() => navigate(`/bookings/${b._id}/edit`)}
                className="col-span-1 px-4 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => deleteBooking(b._id)}
                disabled={actionLoading === b._id}
                className="col-span-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center gap-2"
              >
                {actionLoading === b._id ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </>
          )}

          {/* VERIFIED */}
          {b.status === "VERIFIED" && (
            <>
              <button
                disabled={actionLoading === b._id}
                onClick={() => handoverBooking(b._id)}
                className="col-span-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center gap-2"
              >
                {actionLoading === b._id ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Package className="w-4 h-4" />
                    Hand Over
                  </>
                )}
              </button>
              <button
                onClick={() => navigate(`/bookings/${b._id}/edit`)}
                className="col-span-1 px-4 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => navigate(`/bookings/${b._id}`)}
                className="col-span-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </>
          )}

          {/* HANDED OVER */}
          {b.status === "HANDED_OVER" && (
            <>
              <button
                disabled={actionLoading === b._id}
                onClick={() => returnBooking(b._id)}
                className="col-span-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center gap-2"
              >
                {actionLoading === b._id ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Return
                  </>
                )}
              </button>
              <button
                onClick={() => openAgreement(b._id)}
                className="col-span-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Agreement
              </button>
              <button
                onClick={() => navigate(`/bookings/${b._id}`)}
                className="col-span-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
            </>
          )}

          {/* RETURNED */}
          {b.status === "RETURNED" && (
            <>
              <button
                onClick={() => openAgreement(b._id)}
                className="col-span-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Agreement
              </button>
              <button
                onClick={() => navigate(`/bookings/${b._id}`)}
                className="col-span-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
            </>
          )}

          {/* DEFAULT VIEW FOR ALL */}
          {!["ENQUIRY", "VERIFIED", "HANDED_OVER", "RETURNED"].includes(b.status) && (
            <button
              onClick={() => navigate(`/bookings/${b._id}`)}
              className="col-span-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
          )}
        </div>
      </div>
    );
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Booking Management</h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  Track and manage all equipment bookings
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowCreate(true)}
                className="group px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                <span>Create Booking</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
            {[
              { label: 'Total Bookings', value: stats.total, icon: Calendar, color: 'blue', bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', delay: 0 },
              { label: 'Active Rentals', value: stats.active, icon: Package, color: 'orange', bg: 'bg-orange-50', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', delay: 100 },
              { label: 'Pending Enquiry', value: stats.enquiry, icon: Clock, color: 'gray', bg: 'bg-gray-50', iconBg: 'bg-gray-100', iconColor: 'text-gray-600', delay: 200 },
              { label: 'Completed', value: stats.returned, icon: CheckCircle, color: 'green', bg: 'bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-600', delay: 300 }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp"
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.bg} ${stat.iconColor}`}>
                    {stat.label.split(' ')[0]}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Section */}
        <div className={`${showFilters ? 'block' : 'hidden md:block'} space-y-4 mb-6 animate-slideInDown`}>
          {/* Date Filter */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CalendarRange className="w-5 h-5 text-blue-600" />
              Date Range
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 w-full">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={filter.startDate}
                      onChange={(e) =>
                        setFilter({ ...filter, startDate: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={filter.endDate}
                      onChange={(e) =>
                        setFilter({ ...filter, endDate: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button 
                  onClick={applyDateFilter}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  Apply Filter
                </button>
                <button 
                  onClick={resetToToday}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all duration-200"
                >
                  Today
                </button>
              </div>
            </div>
            {dateFilterApplied && (
              <div className="mt-3 flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                <Calendar className="h-3 w-3" />
                <span>Showing: {filter.startDate} to {filter.endDate}</span>
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              Status Filter
            </h3>
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map((s, idx) => {
                const isActive = status === s;
                const config = s === "All" 
                  ? { label: "All Bookings", icon: Filter }
                  : statusConfig[s];
                const Icon = config?.icon || Filter;
                
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`
                      px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                      transform hover:scale-105 animate-fadeIn flex items-center gap-2
                      ${isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <Icon className="w-4 h-4" />
                    {config?.label || s}
                    {s !== "All" && (
                      <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-white bg-opacity-20">
                        {bookings.filter(b => b.status === s).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-shake">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Bookings List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Bookings List
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {visibleBookings.length} {visibleBookings.length === 1 ? 'booking' : 'bookings'} found
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAnimateItems(false);
                    loadBookings();
                  }}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Export"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="relative">
                <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Mobile View - Cards */}
              <div className="md:hidden p-4">
                {visibleBookings.length > 0 ? (
                  visibleBookings.map((booking, index) => renderMobileCard(booking, index))
                ) : (
                  <div className="text-center py-12 animate-fadeIn">
                    <div className="relative inline-block">
                      <Calendar className="h-16 w-16 text-gray-200 mx-auto" />
                      <Sparkles className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">No Bookings Found</h4>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                      {status !== "All" 
                        ? `No ${status.toLowerCase().replace("_", " ")} bookings found for the selected criteria.` 
                        : 'No bookings found. Create your first booking to get started.'}
                    </p>
                    <button
                      onClick={() => setShowCreate(true)}
                      className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
                    >
                      Create Booking
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop View - Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Booking Details', 'Customer', 'Item', 'Booking Period', 'Days', 'Status', 'Actions'].map((header, idx) => (
                        <th 
                          key={idx}
                          scope="col" 
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visibleBookings.map((b, index) => {
                      const statusInfo = statusConfig[b.status] || {
                        color: "bg-gray-100 text-gray-700",
                        label: b.status,
                        badgeColor: "bg-gray-500",
                        icon: Clock
                      };
                      const StatusIcon = statusInfo.icon;

                      return (
                        <tr 
                          key={b._id} 
                          className={`
                            hover:bg-blue-50/30 transition-all duration-200
                            ${animateItems ? 'animate-fadeIn' : 'opacity-0'}
                          `}
                          style={{ animationDelay: `${index * 0.03}s` }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm mr-3 shadow-md">
                                <Hash className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-base font-medium text-gray-900">#{b.bookingNumber}</div>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(b.createdAt)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-base font-medium text-gray-900">{b.customer?.name || "—"}</div>
                              <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                                <Phone className="h-3 w-3" />
                                {b.customer?.mobile || "No contact"}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-base font-medium text-gray-900">{b.item?.name || "—"}</div>
                              <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                                <Tag className="h-3 w-3" />
                                {b.item?.category || "—"}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-gray-400" />
                                {formatDate(b.startDate)}
                              </div>
                              <div className="flex items-center gap-1 mt-1 text-gray-500">
                                <Calendar className="h-3 w-3" />
                                to {formatDate(b.endDate)}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center justify-center h-9 w-9 bg-blue-100 text-blue-800 rounded-xl text-base font-bold">
                              {b.totalDays || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium ${statusInfo.color}`}>
                              <StatusIcon className="w-4 h-4 mr-1.5" />
                              {statusInfo.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {/* ENQUIRY */}
                              {b.status === "ENQUIRY" && (
                                <>
                                  <button
                                    disabled={actionLoading === b._id}
                                    onClick={() => verifyBooking(b._id)}
                                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-md"
                                    title="Verify"
                                  >
                                    {actionLoading === b._id ? (
                                      <Loader className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <CheckCircle className="w-4 h-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => navigate(`/bookings/${b._id}/edit`)}
                                    className="p-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 transform hover:scale-110"
                                    title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteBooking(b._id)}
                                    disabled={actionLoading === b._id}
                                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-md"
                                    title="Delete"
                                  >
                                    {actionLoading === b._id ? (
                                      <Loader className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="w-4 h-4" />
                                    )}
                                  </button>
                                </>
                              )}

                              {/* VERIFIED */}
                              {b.status === "VERIFIED" && (
                                <>
                                  <button
                                    disabled={actionLoading === b._id}
                                    onClick={() => handoverBooking(b._id)}
                                    className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-md"
                                    title="Hand Over"
                                  >
                                    {actionLoading === b._id ? (
                                      <Loader className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Package className="w-4 h-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => navigate(`/bookings/${b._id}/edit`)}
                                    className="p-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 transform hover:scale-110"
                                    title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => navigate(`/bookings/${b._id}`)}
                                    className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
                                    title="View"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                </>
                              )}

                              {/* HANDED OVER */}
                              {b.status === "HANDED_OVER" && (
                                <>
                                  <button
                                    disabled={actionLoading === b._id}
                                    onClick={() => returnBooking(b._id)}
                                    className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-md"
                                    title="Return"
                                  >
                                    {actionLoading === b._id ? (
                                      <Loader className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <CheckCircle className="w-4 h-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => openAgreement(b._id)}
                                    className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
                                    title="Agreement"
                                  >
                                    <FileText className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => navigate(`/bookings/${b._id}`)}
                                    className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
                                    title="View"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                </>
                              )}

                              {/* RETURNED */}
                              {b.status === "RETURNED" && (
                                <>
                                  <button
                                    onClick={() => openAgreement(b._id)}
                                    className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
                                    title="Agreement"
                                  >
                                    <FileText className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => navigate(`/bookings/${b._id}`)}
                                    className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
                                    title="View"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                </>
                              )}

                              {/* DEFAULT */}
                              {!["ENQUIRY", "VERIFIED", "HANDED_OVER", "RETURNED"].includes(b.status) && (
                                <button
                                  onClick={() => navigate(`/bookings/${b._id}`)}
                                  className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md"
                                  title="View"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {visibleBookings.length === 0 && (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <div className="relative inline-block">
                            <Calendar className="h-16 w-16 text-gray-200 mx-auto" />
                            <Sparkles className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">No Bookings Found</h4>
                          <p className="text-sm text-gray-500 max-w-sm mx-auto">
                            {status !== "All" 
                              ? `No ${status.toLowerCase().replace("_", " ")} bookings found for the selected criteria.` 
                              : 'No bookings found. Create your first booking to get started.'}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className={`w-2 h-2 rounded-full ${visibleBookings.length > 0 ? 'bg-green-500' : 'bg-gray-300'} animate-pulse`}></div>
                Showing <span className="font-medium">{visibleBookings.length}</span> bookings
                {status !== "All" && ` (${statusConfig[status]?.label})`}
                {dateFilterApplied && ` for selected dates`}
              </div>
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Booking Modal */}
      {showCreate && (
        <CreateBookingModal
          onClose={() => setShowCreate(false)}
          onSuccess={loadBookings}
        />
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out forwards;
        }
        .animate-slideInDown {
          animation: slideInDown 0.5s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Bookings;