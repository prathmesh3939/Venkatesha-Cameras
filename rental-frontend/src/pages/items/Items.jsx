// import { useEffect, useMemo, useState } from "react";
// import api from "../../api/api";
// import { useNavigate } from "react-router-dom";

// /* =========================
//    CATEGORY CONSTANTS
// ========================= */
// const CATEGORIES = ["All", "Camera", "Lens", "Lights", "Accessories"];

// function Items() {
//   const navigate = useNavigate();

//   const [items, setItems] = useState([]);
//   const [availability, setAvailability] = useState(null);
//   const [error, setError] = useState("");

//   const [category, setCategory] = useState("All");

//   const today = new Date().toISOString().split("T")[0];
//   const [filter, setFilter] = useState({
//     startDate: today,
//     endDate: today
//   });

//   /* =========================
//      LOAD ITEMS (DEFAULT VIEW)
//   ========================= */
//   const loadItems = async () => {
//     try {
//       const res = await api.get("/items");
//       setItems(res.data.items || []);
//       setAvailability(null);
//     } catch {
//       setError("Failed to load items");
//     }
//   };

//   useEffect(() => {
//     loadItems();
//   }, []);

//   /* =========================
//      DATE-WISE AVAILABILITY
//   ========================= */
//   const checkAvailability = async () => {
//     try {
//       const res = await api.get("/items/availability", {
//         params: filter
//       });
//       setAvailability(res.data.availability || []);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to fetch availability");
//     }
//   };

//   const resetToToday = async () => {
//     const todayValue = new Date().toISOString().split("T")[0];
//     setFilter({ startDate: todayValue, endDate: todayValue });

//     try {
//       const res = await api.get("/items/availability", {
//         params: { startDate: todayValue, endDate: todayValue }
//       });
//       setAvailability(res.data.availability || []);
//     } catch {
//       alert("Failed to load today's availability");
//     }
//   };

//   useEffect(() => {
//     resetToToday();
//     // eslint-disable-next-line
//   }, []);

//   /* =========================
//      CATEGORY FILTER
//   ========================= */
//   const visibleItems = useMemo(() => {
//     const source = availability || items;

//     if (category === "All") return source;

//     return source.filter(
//       (i) =>
//         (i.category || "").toLowerCase() === category.toLowerCase()
//     );
//   }, [category, availability, items]);

//   /* =========================
//      HELPERS
//   ========================= */
//   const getAvailableQty = (item) =>
//     availability ? item.availableQuantity : item.availableQuantity;

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div>
//       {/* HEADER */}
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <h2>Items</h2>
//         <button onClick={() => navigate("/items/create")}>
//           Add Item
//         </button>
//       </div>

//       {/* CATEGORY FILTER */}
//       <div style={{ margin: "12px 0" }}>
//         {CATEGORIES.map((c) => (
//           <button
//             key={c}
//             onClick={() => setCategory(c)}
//             style={{
//               marginRight: 6,
//               padding: "6px 12px",
//               fontWeight: category === c ? "bold" : "normal"
//             }}
//           >
//             {c}
//           </button>
//         ))}
//       </div>

//       {/* DATE FILTER */}
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
//         <button style={{ marginLeft: 6 }} onClick={checkAvailability}>
//           Apply
//         </button>
//         <button style={{ marginLeft: 6 }} onClick={resetToToday}>
//           Today
//         </button>
//       </div>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* TABLE */}
//       <table border="1" width="100%" cellPadding="6">
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Category</th>
//             <th>Total Qty</th>
//             <th>Booked</th>
//             <th>Available</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {visibleItems.map((item) => {
//             const availableQty = getAvailableQty(item);

//             return (
//               <tr key={item.itemId || item._id}>
//                 <td>{item.name}</td>
//                 <td>{item.category}</td>
//                 <td>{item.totalQuantity}</td>
//                 <td>{availability ? item.bookedQuantity : "—"}</td>
//                 <td>{availableQty}</td>
//                 <td>
//                   <strong
//                     style={{
//                       color: availableQty > 0 ? "green" : "red"
//                     }}
//                   >
//                     {availableQty > 0 ? "Available" : "Out of Stock"}
//                   </strong>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       navigate(`/items/${item.itemId || item._id}/edit`)
//                     }
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}

//           {visibleItems.length === 0 && (
//             <tr>
//               <td colSpan="7" align="center">
//                 No items found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Items;



// import { useEffect, useMemo, useState } from "react";
// import api from "../../api/api";
// import { useNavigate } from "react-router-dom";

// /* =========================
//    CATEGORY CONSTANTS
// ========================= */
// const CATEGORIES = ["All", "Camera", "Lens", "Lights", "Accessories"];

// const categoryIcons = {
//   Camera: "📷",
//   Lens: "🔍",
//   Lights: "💡",
//   Accessories: "📦",
//   All: "📋"
// };

// function Items() {
//   const navigate = useNavigate();

//   const [items, setItems] = useState([]);
//   const [availability, setAvailability] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [loadingAvailability, setLoadingAvailability] = useState(false);

//   const [category, setCategory] = useState("All");

//   const today = new Date().toISOString().split("T")[0];
//   const [filter, setFilter] = useState({
//     startDate: today,
//     endDate: today
//   });

//   /* =========================
//      LOAD ITEMS (DEFAULT VIEW)
//   ========================= */
//   const loadItems = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/items");
//       setItems(res.data.items || []);
//       setAvailability(null);
//       setError("");
//     } catch {
//       setError("Failed to load items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadItems();
//   }, []);

//   /* =========================
//      DATE-WISE AVAILABILITY
//   ========================= */
//   const checkAvailability = async () => {
//     try {
//       setLoadingAvailability(true);
//       const res = await api.get("/items/availability", {
//         params: filter
//       });
//       setAvailability(res.data.availability || []);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to fetch availability");
//     } finally {
//       setLoadingAvailability(false);
//     }
//   };

//   const resetToToday = async () => {
//     const todayValue = new Date().toISOString().split("T")[0];
//     setFilter({ startDate: todayValue, endDate: todayValue });

//     try {
//       setLoadingAvailability(true);
//       const res = await api.get("/items/availability", {
//         params: { startDate: todayValue, endDate: todayValue }
//       });
//       setAvailability(res.data.availability || []);
//     } catch {
//       alert("Failed to load today's availability");
//     } finally {
//       setLoadingAvailability(false);
//     }
//   };

//   useEffect(() => {
//     resetToToday();
//     // eslint-disable-next-line
//   }, []);

//   /* =========================
//      CATEGORY FILTER
//   ========================= */
//   const visibleItems = useMemo(() => {
//     const source = availability || items;

//     if (category === "All") return source;

//     return source.filter(
//       (i) =>
//         (i.category || "").toLowerCase() === category.toLowerCase()
//     );
//   }, [category, availability, items]);

//   /* =========================
//      HELPERS
//   ========================= */
//   const getAvailableQty = (item) =>
//     availability ? item.availableQuantity : item.availableQuantity;

//   const getCategoryColor = (cat) => {
//     const colors = {
//       camera: "bg-blue-100 text-blue-800",
//       lens: "bg-purple-100 text-purple-800",
//       lights: "bg-yellow-100 text-yellow-800",
//       accessories: "bg-green-100 text-green-800"
//     };
//     return colors[cat.toLowerCase()] || "bg-gray-100 text-gray-800";
//   };

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* HEADER */}
//         <div className="mb-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Inventory Management</h1>
//               <p className="text-gray-600 mt-1">Track and manage all camera equipment</p>
//             </div>
//             <button
//               onClick={() => navigate("/items/create")}
//               className="mt-4 md:mt-0 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium flex items-center justify-center transition duration-200 shadow-sm hover:shadow"
//             >
//               <span className="mr-2">+</span>
//               Add New Item
//             </button>
//           </div>

//           {/* STATS CARDS */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
//               <div className="flex items-center">
//                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
//                   <span className="text-blue-600 font-bold">📦</span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Total Items</p>
//                   <p className="text-xl font-bold text-gray-800">{items.length}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
//               <div className="flex items-center">
//                 <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
//                   <span className="text-green-600 font-bold">⚡</span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Available Today</p>
//                   <p className="text-xl font-bold text-gray-800">
//                     {availability ? 
//                       availability.filter(i => i.availableQuantity > 0).length : 
//                       items.filter(i => i.availableQuantity > 0).length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
//               <div className="flex items-center">
//                 <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
//                   <span className="text-purple-600 font-bold">📅</span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Selected Dates</p>
//                   <p className="text-sm font-medium text-gray-800">
//                     {filter.startDate === filter.endDate ? 
//                       filter.startDate : 
//                       `${filter.startDate} to ${filter.endDate}`}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
//               <div className="flex items-center">
//                 <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
//                   <span className="text-yellow-600 font-bold">🔧</span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Active Filter</p>
//                   <p className="text-sm font-medium text-gray-800">{category}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CATEGORY FILTER */}
//         <div className="bg-white rounded-xl p-4 mb-6 shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-3">
//             Filter by Category
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {CATEGORIES.map((c) => (
//               <button
//                 key={c}
//                 onClick={() => setCategory(c)}
//                 className={`px-4 py-2.5 rounded-lg font-medium flex items-center transition duration-200 ${
//                   category === c 
//                     ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 <span className="mr-2">{categoryIcons[c]}</span>
//                 {c}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* DATE FILTER */}
//         <div className="bg-white rounded-xl p-4 mb-6 shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-3">
//             Check Availability
//           </h3>
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//             <div className="flex flex-col md:flex-row gap-4 flex-1">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                 <input
//                   type="date"
//                   value={filter.startDate}
//                   onChange={(e) =>
//                     setFilter({ ...filter, startDate: e.target.value })
//                   }
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                 <input
//                   type="date"
//                   value={filter.endDate}
//                   onChange={(e) =>
//                     setFilter({ ...filter, endDate: e.target.value })
//                   }
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button 
//                 onClick={checkAvailability}
//                 disabled={loadingAvailability}
//                 className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium flex items-center transition duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loadingAvailability ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Loading...
//                   </>
//                 ) : (
//                   <>
//                     <span className="mr-2">📅</span>
//                     Check Availability
//                   </>
//                 )}
//               </button>
//               <button 
//                 onClick={resetToToday}
//                 className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center transition duration-200"
//               >
//                 Show Today
//               </button>
//             </div>
//           </div>
//           <p className="text-sm text-gray-500 mt-3">
//             Showing availability for {filter.startDate === filter.endDate ? 
//               filter.startDate : 
//               `${filter.startDate} to ${filter.endDate}`}
//           </p>
//         </div>

//         {/* ERROR MESSAGE */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
//             <p className="text-red-700 font-medium">{error}</p>
//           </div>
//         )}

//         {/* TABLE */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
//           <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//             <h3 className="text-lg font-semibold text-gray-800">
//               {availability ? 'Availability Results' : 'All Items'}
//               <span className="text-sm font-normal text-gray-500 ml-2">
//                 ({visibleItems.length} items)
//               </span>
//             </h3>
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Item Name
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Category
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Total Qty
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Booked
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Available
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {visibleItems.map((item) => {
//                     const availableQty = getAvailableQty(item);
//                     const isAvailable = availableQty > 0;

//                     return (
//                       <tr key={item.itemId || item._id} className="hover:bg-gray-50 transition duration-150">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">
//                               {item.name.charAt(0).toUpperCase()}
//                             </div>
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">{item.name}</div>
//                               <div className="text-sm text-gray-500">ID: {item.itemId || item._id}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
//                             <span className="mr-1.5">{categoryIcons[item.category]}</span>
//                             {item.category}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           <div className="font-semibold">{item.totalQuantity}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           <div className="font-semibold">{availability ? item.bookedQuantity : "—"}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           <div className={`font-bold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
//                             {availableQty}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                             isAvailable 
//                               ? 'bg-green-100 text-green-800' 
//                               : 'bg-red-100 text-red-800'
//                           }`}>
//                             <div className={`w-2 h-2 rounded-full mr-2 ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                             {isAvailable ? 'Available' : 'Out of Stock'}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <button
//                             onClick={() =>
//                               navigate(`/items/${item.itemId || item._id}/edit`)
//                             }
//                             className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition duration-200"
//                           >
//                             <span className="mr-1.5">✏️</span>
//                             Edit
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}

//                   {visibleItems.length === 0 && (
//                     <tr>
//                       <td colSpan="7" className="px-6 py-12 text-center">
//                         <div className="text-gray-400 text-5xl mb-4">📦</div>
//                         <h4 className="text-lg font-semibold text-gray-700 mb-2">No Items Found</h4>
//                         <p className="text-gray-500 max-w-md mx-auto">
//                           {category !== "All" 
//                             ? `No ${category.toLowerCase()} items found${availability ? ' for selected dates' : ''}.` 
//                             : `No items found${availability ? ' for selected dates' : ''}.`}
//                         </p>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* TABLE FOOTER */}
//           <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//             <div className="flex justify-between items-center">
//               <div className="text-sm text-gray-500">
//                 Showing <span className="font-medium">{visibleItems.length}</span> items
//                 {availability && " for selected dates"}
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => window.history.back()}
//                   className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm"
//                 >
//                   Back to Dashboard
//                 </button>
//                 <button
//                   onClick={() => loadItems()}
//                   className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium text-sm transition duration-200 shadow-sm hover:shadow"
//                 >
//                   Refresh Items
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Items;




import { useEffect, useMemo, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Camera,
  Search,
  Filter,
  RefreshCw,
  Edit,
  AlertCircle,
  Loader,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle,
  XCircle,
  Layers,
  Sun,
  Zap,
  Box,
  Grid,
  Plus
} from "lucide-react";

/* =========================
   CATEGORY CONSTANTS
========================= */
const CATEGORIES = ["All", "Camera", "Lens", "Lights", "Accessories"];

const categoryIcons = {
  Camera: Camera,
  Lens: Search,
  Lights: Sun,
  Accessories: Box,
  All: Grid
};

const categoryColors = {
  Camera: "blue",
  Lens: "purple",
  Lights: "yellow",
  Accessories: "green",
  All: "gray"
};

function Items() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [category, setCategory] = useState("All");

  const today = new Date().toISOString().split("T")[0];
  const [filter, setFilter] = useState({
    startDate: today,
    endDate: today
  });

  /* =========================
     LOAD ITEMS (DEFAULT VIEW)
  ========================= */
  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await api.get("/items");
      setItems(res.data.items || []);
      setAvailability(null);
      setError("");
      setTimeout(() => setAnimateItems(true), 100);
    } catch {
      setError("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  /* =========================
     DATE-WISE AVAILABILITY
  ========================= */
  const checkAvailability = async () => {
    if (!filter.startDate || !filter.endDate) {
      alert("Please select both dates");
      return;
    }

    if (new Date(filter.endDate) < new Date(filter.startDate)) {
      alert("End date cannot be before start date");
      return;
    }

    try {
      setLoadingAvailability(true);
      setAnimateItems(false);
      const res = await api.get("/items/availability", {
        params: filter
      });
      setAvailability(res.data.availability || []);
      setTimeout(() => setAnimateItems(true), 100);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch availability");
    } finally {
      setLoadingAvailability(false);
    }
  };

  const resetToToday = async () => {
    const todayValue = new Date().toISOString().split("T")[0];
    setFilter({ startDate: todayValue, endDate: todayValue });

    try {
      setLoadingAvailability(true);
      setAnimateItems(false);
      const res = await api.get("/items/availability", {
        params: { startDate: todayValue, endDate: todayValue }
      });
      setAvailability(res.data.availability || []);
      setTimeout(() => setAnimateItems(true), 100);
    } catch {
      alert("Failed to load today's availability");
    } finally {
      setLoadingAvailability(false);
    }
  };

  useEffect(() => {
    resetToToday();
    // eslint-disable-next-line
  }, []);

  /* =========================
     FILTERS
  ========================= */
  const visibleItems = useMemo(() => {
    const source = availability || items;

    // Category filter
    let filtered = category === "All" 
      ? source 
      : source.filter(i => 
          (i.category || "").toLowerCase() === category.toLowerCase()
        );

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.itemId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [category, availability, items, searchTerm]);

  /* =========================
     STATS CALCULATIONS
  ========================= */
  const stats = useMemo(() => {
    const source = availability || items;
    return {
      total: items.length,
      availableToday: source.filter(i => i.availableQuantity > 0).length,
      totalBooked: source.reduce((sum, i) => sum + (i.bookedQuantity || 0), 0),
      categories: new Set(items.map(i => i.category)).size
    };
  }, [items, availability]);

  /* =========================
     HELPERS
  ========================= */
  const getAvailableQty = (item) =>
    availability ? item.availableQuantity : item.availableQuantity;

  const getCategoryColor = (cat) => {
    const colors = {
      camera: "bg-blue-100 text-blue-800 border-blue-200",
      lens: "bg-purple-100 text-purple-800 border-purple-200",
      lights: "bg-yellow-100 text-yellow-800 border-yellow-200",
      accessories: "bg-green-100 text-green-800 border-green-200"
    };
    return colors[cat?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* HEADER */}
        <div className="mb-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg animate-float">
                <Package className="h-6 w-6 text-white" />
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  Track and manage all camera equipment
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/items/create")}
              className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-200 transform hover:scale-105 shadow-md self-start"
            >
              <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
              Add New Item
            </button>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
            {[
              { label: 'Total Items', value: stats.total, icon: Package, color: 'blue', bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
              { label: 'Available Today', value: stats.availableToday, icon: CheckCircle, color: 'green', bg: 'bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
              { label: 'Total Booked', value: stats.totalBooked, icon: Calendar, color: 'purple', bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
              { label: 'Categories', value: stats.categories, icon: Layers, color: 'yellow', bg: 'bg-yellow-50', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-2.5 rounded-lg ${stat.iconBg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-4 animate-slideInUp" style={{ animationDelay: '400ms' }}>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search items by name, category, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="bg-white rounded-xl p-4 sm:p-5 mb-4 shadow-sm border border-gray-200 animate-slideInUp" style={{ animationDelay: '500ms' }}>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Filter className="h-4 w-4 text-blue-600" />
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c, idx) => {
              const Icon = categoryIcons[c];
              const isActive = category === c;
              const color = categoryColors[c];

              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`
                    px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2
                    transition-all duration-200 transform hover:scale-105
                    animate-fadeIn
                    ${isActive 
                      ? `bg-gradient-to-r from-${color}-600 to-${color}-700 text-white shadow-md` 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Icon className="h-4 w-4" />
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* DATE FILTER */}
        <div className="bg-white rounded-xl p-4 sm:p-5 mb-6 shadow-sm border border-gray-200 animate-slideInUp" style={{ animationDelay: '600ms' }}>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            Check Availability
          </h3>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 w-full">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Start Date</label>
                <input
                  type="date"
                  value={filter.startDate}
                  onChange={(e) =>
                    setFilter({ ...filter, startDate: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">End Date</label>
                <input
                  type="date"
                  value={filter.endDate}
                  onChange={(e) =>
                    setFilter({ ...filter, endDate: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="flex gap-2 w-full lg:w-auto">
              <button 
                onClick={checkAvailability}
                disabled={loadingAvailability}
                className="flex-1 lg:flex-none px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center gap-2"
              >
                {loadingAvailability ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4" />
                    Check
                  </>
                )}
              </button>
              <button 
                onClick={resetToToday}
                className="flex-1 lg:flex-none px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Today
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>
              Showing availability for {filter.startDate === filter.endDate 
                ? filter.startDate 
                : `${filter.startDate} to ${filter.endDate}`}
            </span>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-shake">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* ITEMS TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-slideInUp" style={{ animationDelay: '700ms' }}>
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {availability ? 'Availability Results' : 'All Items'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {visibleItems.length} items found
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadItems()}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Refresh"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <Loader className="h-16 w-16 text-blue-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="text-gray-600 mt-4 animate-pulse">Loading items...</p>
            </div>
          ) : (
            <>
              {/* Mobile View - Cards */}
              <div className="md:hidden p-4 space-y-3">
                {visibleItems.length === 0 ? (
                  <EmptyState 
                    category={category} 
                    availability={availability} 
                    searchTerm={searchTerm}
                  />
                ) : (
                  visibleItems.map((item, index) => (
                    <ItemCard 
                      key={item.itemId || item._id} 
                      item={item} 
                      availability={availability}
                      index={index}
                      animateItems={animateItems}
                      onEdit={() => navigate(`/items/${item.itemId || item._id}/edit`)}
                    />
                  ))
                )}
              </div>

              {/* Desktop View - Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Item Details', 'Category', 'Total Qty', 'Booked', 'Available', 'Status', 'Action'].map((header, idx) => (
                        <th 
                          key={idx}
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {visibleItems.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12">
                          <EmptyState 
                            category={category} 
                            availability={availability} 
                            searchTerm={searchTerm}
                          />
                        </td>
                      </tr>
                    ) : (
                      visibleItems.map((item, index) => (
                        <ItemRow 
                          key={item.itemId || item._id} 
                          item={item} 
                          availability={availability}
                          index={index}
                          animateItems={animateItems}
                          onEdit={() => navigate(`/items/${item.itemId || item._id}/edit`)}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Footer */}
          {visibleItems.length > 0 && (
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Showing {visibleItems.length} of {items.length} items
                </p>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs">1</span>
                  <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}

/* =========================
   ITEM CARD (Mobile)
========================= */
const ItemCard = ({ item, availability, index, animateItems, onEdit }) => {
  const availableQty = availability ? item.availableQuantity : item.availableQuantity;
  const isAvailable = availableQty > 0;
  const CategoryIcon = categoryIcons[item.category] || Package;
  const categoryColor = getCategoryColorClass(item.category);

  return (
    <div 
      className={`
        bg-white rounded-xl border border-gray-200 p-4 shadow-sm
        hover:shadow-md transition-all duration-300 transform hover:-translate-y-1
        ${animateItems ? 'animate-slideInUp' : 'opacity-0'}
      `}
      style={{ animationDelay: `${800 + index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg mr-3 shadow-md">
            {item.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-base">{item.name}</h4>
            <p className="text-xs text-gray-500 mt-0.5">ID: {item.itemId || item._id}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${categoryColor}`}>
          <CategoryIcon className="h-3 w-3 mr-1" />
          {item.category}
        </span>
      </div>

      {/* Quantity Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Total</p>
          <p className="text-xl font-bold text-gray-900">{item.totalQuantity}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Booked</p>
          <p className="text-xl font-bold text-orange-600">
            {availability ? item.bookedQuantity : '—'}
          </p>
        </div>
        <div className={`rounded-lg p-3 text-center ${isAvailable ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className="text-xs text-gray-500 mb-1">Available</p>
          <p className={`text-xl font-bold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
            {availableQty}
          </p>
        </div>
      </div>

      {/* Status and Action */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
          isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
          {isAvailable ? 'Available' : 'Out of Stock'}
        </span>
        
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 hover:scale-105 text-xs"
        >
          <Edit className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>
    </div>
  );
};

/* =========================
   ITEM ROW (Desktop)
========================= */
const ItemRow = ({ item, availability, index, animateItems, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const availableQty = availability ? item.availableQuantity : item.availableQuantity;
  const isAvailable = availableQty > 0;
  const CategoryIcon = categoryIcons[item.category] || Package;
  const categoryColor = getCategoryColorClass(item.category);
  const availabilityPercentage = (availableQty / item.totalQuantity) * 100;

  return (
    <tr 
      className={`
        hover:bg-blue-50/30 transition-all duration-300
        ${animateItems ? 'animate-fadeIn' : 'opacity-0'}
      `}
      style={{ animationDelay: `${800 + index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className={`
            h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 
            flex items-center justify-center text-white font-bold text-sm mr-3
            transition-all duration-300
            ${isHovered ? 'scale-110 rotate-3 shadow-lg' : ''}
          `}>
            {item.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-base">{item.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">ID: {item.itemId || item._id}</p>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium ${categoryColor}`}>
          <CategoryIcon className="h-4 w-4" />
          {item.category}
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center justify-center h-8 w-8 bg-gray-100 text-gray-700 rounded-lg font-bold">
          {item.totalQuantity}
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center justify-center h-8 w-8 bg-orange-100 text-orange-700 rounded-lg font-bold">
          {availability ? item.bookedQuantity : '—'}
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-lg font-bold ${
          isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {availableQty}
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
            isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {isAvailable ? 'Available' : 'Out of Stock'}
          </span>
          
          {/* Progress bar */}
          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'} transition-all duration-500`}
              style={{ width: `${availabilityPercentage}%` }}
            ></div>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 transform hover:scale-110"
        >
          <Edit className="h-4 w-4" />
          Edit
        </button>
      </td>
    </tr>
  );
};

/* =========================
   EMPTY STATE
========================= */
const EmptyState = ({ category, availability, searchTerm }) => (
  <div className="text-center py-8 animate-fadeIn">
    <div className="relative inline-block">
      <Package className="h-16 w-16 text-gray-200 mx-auto" />
      <Sparkles className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
    </div>
    <h4 className="text-sm font-semibold text-gray-900 mt-4">No Items Found</h4>
    <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
      {searchTerm 
        ? 'No items match your search term'
        : category !== "All" 
          ? `No ${category.toLowerCase()} items found${availability ? ' for selected dates' : ''}`
          : `No items found${availability ? ' for selected dates' : ''}`}
    </p>
  </div>
);

/* =========================
   HELPER FUNCTIONS
========================= */
const getCategoryColorClass = (category) => {
  const colors = {
    camera: "bg-blue-100 text-blue-800",
    lens: "bg-purple-100 text-purple-800",
    lights: "bg-yellow-100 text-yellow-800",
    accessories: "bg-green-100 text-green-800"
  };
  return colors[category?.toLowerCase()] || "bg-gray-100 text-gray-800";
};

export default Items;