

// import { useEffect, useState } from "react";
// import api from "../../api/api";

// function CreateBookingModal({ onClose, onSuccess }) {
//   const [customers, setCustomers] = useState([]);
//   const [items, setItems] = useState([]);
//   const [availability, setAvailability] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [form, setForm] = useState({
//     customerId: "",
//     itemId: "",
//     quantity: 1,
//     startDate: "",
//     endDate: ""
//   });

//   /* =========================
//      LOAD CUSTOMERS & ITEMS
//   ========================= */
//   useEffect(() => {
//     Promise.all([api.get("/customers"), api.get("/items")])
//       .then(([c, i]) => {
//         setCustomers(c.data.customers || []);
//         setItems(i.data.items || []);
//       })
//       .catch(() => setError("Failed to load customers or items"));
//   }, []);

//   /* =========================
//      CHECK AVAILABILITY
//   ========================= */
//   useEffect(() => {
//     if (form.itemId && form.startDate && form.endDate) {
//       api
//         .get("/items/availability", {
//           params: {
//             startDate: form.startDate,
//             endDate: form.endDate
//           }
//         })
//         .then(res => {
//           const found = res.data.availability.find(
//             a => a.itemId === form.itemId
//           );
//           setAvailability(found || null);
//         })
//         .catch(() => {
//           setAvailability(null);
//         });
//     } else {
//       setAvailability(null);
//     }
//   }, [form.itemId, form.startDate, form.endDate]);

//   /* =========================
//      SUBMIT BOOKING
//   ========================= */
//   const submit = async () => {
//     setError("");

//     if (!form.customerId || !form.itemId || !form.startDate || !form.endDate) {
//       setError("All fields are required");
//       return;
//     }

//     if (
//       availability &&
//       form.quantity > availability.availableQuantity
//     ) {
//       setError(
//         `Only ${availability.availableQuantity} item(s) available for selected dates`
//       );
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/bookings", form);
//       onSuccess();
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create booking");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div style={overlay}>
//       <div style={modal}>
//         <h3 style={{ marginBottom: 10 }}>Create Booking</h3>

//         {error && <p style={{ color: "red", marginBottom: 8 }}>{error}</p>}

//         {/* Customer */}
//         <select
//           value={form.customerId}
//           onChange={e => setForm({ ...form, customerId: e.target.value })}
//         >
//           <option value="">Select Customer</option>
//           {customers.map(c => (
//             <option key={c._id} value={c._id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         {/* Item */}
//         <select
//           value={form.itemId}
//           onChange={e => setForm({ ...form, itemId: e.target.value })}
//         >
//           <option value="">Select Item</option>
//           {items.map(i => (
//             <option key={i._id} value={i._id}>
//               {i.name}
//             </option>
//           ))}
//         </select>

//         {/* Dates */}
//         <input
//           type="date"
//           value={form.startDate}
//           onChange={e => setForm({ ...form, startDate: e.target.value })}
//         />

//         <input
//           type="date"
//           value={form.endDate}
//           onChange={e => setForm({ ...form, endDate: e.target.value })}
//         />

//         {/* Quantity */}
//         <input
//           type="number"
//           min="1"
//           value={form.quantity}
//           onChange={e =>
//             setForm({ ...form, quantity: Number(e.target.value) })
//           }
//         />

//         {/* Availability Info */}
//         {availability && (
//           <p style={{ fontSize: 13, marginTop: 6 }}>
//             Available:{" "}
//             <strong>{availability.availableQuantity}</strong>
//           </p>
//         )}

//         {/* Actions */}
//         <div style={{ marginTop: 12 }}>
//           <button
//             onClick={submit}
//             disabled={
//               loading ||
//               (availability &&
//                 form.quantity > availability.availableQuantity)
//             }
//           >
//             {loading ? "Creating..." : "Create"}
//           </button>

//           <button onClick={onClose} style={{ marginLeft: 8 }}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    STYLES
// ========================= */
// const overlay = {
//   position: "fixed",
//   inset: 0,
//   background: "rgba(0,0,0,.4)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 50
// };

// const modal = {
//   background: "#fff",
//   padding: 20,
//   width: 360,
//   borderRadius: 6
// };

// export default CreateBookingModal;

// //before category working properly 



// import { useEffect, useState } from "react";
// import api from "../../api/api";

// /* =========================
//    CATEGORY CONFIG
// ========================= */
// const CATEGORY_MAP = {
//   Camera: {
//     brands: ["Canon", "Nikon", "Sony"],
//     subCategories: ["Camera Body"]
//   },
//   Lens: {
//     brands: ["Canon", "Nikon", "Sony"],
//     subCategories: ["Prime Lens", "Zoom Lens"]
//   },
//   Light: {
//     brands: ["Godox", "Aputure", "Nanlite"],
//     subCategories: ["LED Light", "Flash Light"]
//   },
//   Accessories: {
//     brands: [],
//     subCategories: ["Tripod", "Battery", "Memory Card", "Mic", "Bag"]
//   }
// };

// function CreateBookingModal({ onClose, onSuccess }) {
//   const [customers, setCustomers] = useState([]);
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [availability, setAvailability] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [filters, setFilters] = useState({
//     category: "",
//     brand: "",
//     subCategory: ""
//   });

//   const [form, setForm] = useState({
//     customerId: "",
//     itemId: "",
//     quantity: 1,
//     startDate: "",
//     endDate: ""
//   });

//   /* =========================
//      LOAD DATA
//   ========================= */
//   useEffect(() => {
//     Promise.all([api.get("/customers"), api.get("/items")])
//       .then(([c, i]) => {
//         setCustomers(c.data.customers || []);
//         setItems(i.data.items || []);
//         setFilteredItems(i.data.items || []);
//       })
//       .catch(() => setError("Failed to load customers or items"));
//   }, []);

//   /* =========================
//      FILTER ITEMS (FIXED)
//   ========================= */
//   useEffect(() => {
//     let result = [...items];

//     if (filters.category) {
//       result = result.filter(i => i.category === filters.category);
//     }

//     if (filters.brand) {
//       result = result.filter(
//         i => i.brand && i.brand === filters.brand
//       );
//     }

//     if (filters.subCategory) {
//       result = result.filter(
//         i => i.subCategory && i.subCategory === filters.subCategory
//       );
//     }

//     setFilteredItems(result);
//     setForm(prev => ({ ...prev, itemId: "" }));

//   }, [filters, items]);

//   /* =========================
//      AVAILABILITY
//   ========================= */
//   useEffect(() => {
//     if (form.itemId && form.startDate && form.endDate) {
//       api
//         .get("/items/availability", {
//           params: {
//             startDate: form.startDate,
//             endDate: form.endDate
//           }
//         })
//         .then(res => {
//           const found = res.data.availability.find(
//             a => a.itemId === form.itemId
//           );
//           setAvailability(found || null);
//         })
//         .catch(() => setAvailability(null));
//     } else {
//       setAvailability(null);
//     }
//   }, [form.itemId, form.startDate, form.endDate]);

//   /* =========================
//      SUBMIT
//   ========================= */
//   const submit = async () => {
//     setError("");

//     if (!form.customerId || !form.itemId || !form.startDate || !form.endDate) {
//       setError("All fields are required");
//       return;
//     }

//     if (availability && form.quantity > availability.availableQuantity) {
//       setError(
//         `Only ${availability.availableQuantity} item(s) available`
//       );
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/bookings", form);
//       onSuccess();
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create booking");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const categoryConfig = CATEGORY_MAP[filters.category] || {
//     brands: [],
//     subCategories: []
//   };

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div style={overlay}>
//       <div style={modal}>
//         <h3>Create Booking</h3>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <select
//           value={form.customerId}
//           onChange={e => setForm({ ...form, customerId: e.target.value })}
//         >
//           <option value="">Select Customer</option>
//           {customers.map(c => (
//             <option key={c._id} value={c._id}>{c.name}</option>
//           ))}
//         </select>

//         <select
//           value={filters.category}
//           onChange={e =>
//             setFilters({ category: e.target.value, brand: "", subCategory: "" })
//           }
//         >
//           <option value="">Select Category</option>
//           {Object.keys(CATEGORY_MAP).map(cat => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>

//         {categoryConfig.brands.length > 0 && (
//           <select
//             value={filters.brand}
//             onChange={e => setFilters({ ...filters, brand: e.target.value })}
//           >
//             <option value="">Select Brand</option>
//             {categoryConfig.brands.map(b => (
//               <option key={b} value={b}>{b}</option>
//             ))}
//           </select>
//         )}

//         {categoryConfig.subCategories.length > 0 && (
//           <select
//             value={filters.subCategory}
//             onChange={e =>
//               setFilters({ ...filters, subCategory: e.target.value })
//             }
//           >
//             <option value="">Select Type</option>
//             {categoryConfig.subCategories.map(s => (
//               <option key={s} value={s}>{s}</option>
//             ))}
//           </select>
//         )}

//         <select
//           value={form.itemId}
//           onChange={e => setForm({ ...form, itemId: e.target.value })}
//         >
//           <option value="">Select Item</option>
//           {filteredItems.map(i => (
//             <option key={i._id} value={i._id}>{i.name}</option>
//           ))}
//         </select>

//         <input
//           type="date"
//           value={form.startDate}
//           onChange={e => setForm({ ...form, startDate: e.target.value })}
//         />
//         <input
//           type="date"
//           value={form.endDate}
//           onChange={e => setForm({ ...form, endDate: e.target.value })}
//         />

//         <input
//           type="number"
//           min="1"
//           value={form.quantity}
//           onChange={e =>
//             setForm({ ...form, quantity: Number(e.target.value) })
//           }
//         />

//         {availability && (
//           <p style={{ fontSize: 13 }}>
//             Available: <b>{availability.availableQuantity}</b>
//           </p>
//         )}

//         <div style={{ marginTop: 12 }}>
//           <button onClick={submit} disabled={loading}>
//             {loading ? "Creating..." : "Create Booking"}
//           </button>
//           <button onClick={onClose} style={{ marginLeft: 8 }}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    STYLES
// ========================= */
// const overlay = {
//   position: "fixed",
//   inset: 0,
//   background: "rgba(0,0,0,.4)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 50
// };

// const modal = {
//   background: "#fff",
//   padding: 20,
//   width: 380,
//   borderRadius: 6
// };

// export default CreateBookingModal;


import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  X,
  User,
  Phone,
  Calendar,
  Package,
  Filter,
  ShoppingCart,
  Tag,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Camera,
  Film,
  Zap,
  Box,
  Users,
  CalendarRange,
  DollarSign,
  Shield,
  Ban,
  Loader,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";

/* =========================
   CATEGORY CONFIG
========================= */
const CATEGORY_MAP = {
  Camera: {
    brands: ["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic"],
    subCategories: ["Camera Body", "Camera with Kit Lens", "Cinema Camera"],
    icon: Camera,
    color: "blue",
    gradient: "from-blue-600 to-blue-700"
  },
  Lens: {
    brands: ["Canon", "Nikon", "Sony", "Sigma", "Tamron"],
    subCategories: ["Prime Lens", "Zoom Lens", "Wide Angle", "Telephoto"],
    icon: Film,
    color: "purple",
    gradient: "from-purple-600 to-purple-700"
  },
  Light: {
    brands: ["Godox", "Aputure", "Nanlite", "Profoto", "Broncolor"],
    subCategories: ["LED Light", "Flash Light", "Softbox", "Light Stand"],
    icon: Zap,
    color: "amber",
    gradient: "from-amber-500 to-orange-600"
  },
  Accessories: {
    brands: [],
    subCategories: ["Tripod", "Battery", "Memory Card", "Mic", "Bag", "Filter", "Monopod"],
    icon: Box,
    color: "green",
    gradient: "from-green-600 to-emerald-600"
  }
};

function CreateBookingModal({ onClose, onSuccess }) {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [animateModal, setAnimateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    subCategory: ""
  });

  const [form, setForm] = useState({
    customerId: "",
    itemId: "",
    quantity: 1,
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    setAnimateModal(true);
  }, []);

  const selectedCustomer = customers.find(c => c._id === form.customerId);
  const selectedItem = filteredItems.find(i => i._id === form.itemId);

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    setDataLoading(true);
    Promise.all([api.get("/customers"), api.get("/items")])
      .then(([c, i]) => {
        setCustomers(c.data.customers || []);
        setItems(i.data.items || []);
        setFilteredItems(i.data.items || []);
        setError("");
      })
      .catch(() => setError("Failed to load customers or items"))
      .finally(() => setDataLoading(false));
  }, []);

  /* =========================
     FILTER ITEMS
  ========================= */
  useEffect(() => {
    let result = [...items];

    if (filters.category) {
      result = result.filter(i => i.category === filters.category);
    }

    if (filters.brand) {
      result = result.filter(i => i.brand && i.brand === filters.brand);
    }

    if (filters.subCategory) {
      result = result.filter(i => i.subCategory && i.subCategory === filters.subCategory);
    }

    setFilteredItems(result);
    setForm(prev => ({ ...prev, itemId: "" }));

  }, [filters, items]);

  /* =========================
     AVAILABILITY
  ========================= */
  useEffect(() => {
    if (form.itemId && form.startDate && form.endDate) {
      api
        .get("/items/availability", {
          params: { startDate: form.startDate, endDate: form.endDate }
        })
        .then(res => {
          const found = res.data.availability.find(a => a.itemId === form.itemId);
          setAvailability(found || null);
        })
        .catch(() => setAvailability(null));
    } else {
      setAvailability(null);
    }
  }, [form.itemId, form.startDate, form.endDate]);

  /* =========================
     SUBMIT
  ========================= */
  const submit = async () => {
    setError("");

    if (!form.customerId || !form.itemId || !form.startDate || !form.endDate) {
      setError("Please fill all required fields");
      return;
    }

    if (new Date(form.startDate) > new Date(form.endDate)) {
      setError("End date must be after start date");
      return;
    }

    if (availability && form.quantity > availability.availableQuantity) {
      setError(`Only ${availability.availableQuantity} item(s) available for selected dates`);
      return;
    }

    try {
      setLoading(true);
      await api.post("/bookings", form);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  const categoryConfig = CATEGORY_MAP[filters.category] || {
    brands: [],
    subCategories: [],
    icon: Box,
    color: "gray",
    gradient: "from-gray-600 to-gray-700"
  };

  const CategoryIcon = categoryConfig.icon;

  /* =========================
     CALCULATIONS
  ========================= */
  const calculateDays = () => {
    if (!form.startDate || !form.endDate) return 0;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const totalDays = calculateDays();
  const totalPrice = selectedItem ? selectedItem.rentPerDay * totalDays * form.quantity : 0;

  /* =========================
     UI
  ========================= */
  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
      <div 
        className={`
          bg-white rounded-2xl shadow-2xl w-full max-w-7xl 
          max-h-[95vh] overflow-hidden flex flex-col border border-gray-200
          transition-all duration-500 ease-out
          ${animateModal ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
        `}
      >
        {/* MODAL HEADER */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/20">
                  <Calendar className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-3 w-3 sm:h-4 sm:w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-white"></span>
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">Create New Booking</h2>
                <p className="text-blue-100 text-xs sm:text-sm flex items-center gap-2">
                  <span>Book camera equipment for customers</span>
                  <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                  <span className="hidden sm:inline">Complete all details</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 sm:h-10 sm:w-10 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110 border border-white/20"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mt-4 sm:mt-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`
                    w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold
                    transition-all duration-300
                    ${currentStep >= step 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'bg-white/20 text-white'
                    }
                  `}>
                    {step}
                  </div>
                  <div className={`ml-1.5 sm:ml-2 text-xs sm:text-sm font-medium hidden sm:block ${currentStep >= step ? 'text-white' : 'text-blue-200'}`}>
                    {step === 1 ? 'Customer' : step === 2 ? 'Equipment' : 'Booking'}
                  </div>
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-all duration-500 ${currentStep > step ? 'bg-white' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MODAL CONTENT */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-3 sm:p-4 lg:p-6">
          {dataLoading ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20">
              <div className="relative">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 animate-pulse" />
                </div>
              </div>
              <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">Loading booking data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              
              {/* LEFT COLUMN - CUSTOMER & FILTERS */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-5">
                
                {/* CUSTOMER SELECTION CARD */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 animate-slideInUp" style={{ animationDelay: '100ms' }}>
                  <div 
                    className="px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex items-center justify-between cursor-pointer"
                    onClick={() => setCurrentStep(1)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900">Select Customer</h3>
                    </div>
                    {currentStep === 1 && <span className="text-xs text-blue-600 font-medium">Current</span>}
                  </div>
                  
                  <div className="p-4 sm:p-5">
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <select
                        value={form.customerId}
                        onChange={e => setForm({ ...form, customerId: e.target.value })}
                        className="w-full pl-10 pr-8 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white text-sm"
                      >
                        <option value="">Choose a customer...</option>
                        {customers.map(c => (
                          <option key={c._id} value={c._id}>
                            {c.name} - {c.mobile}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>

                    {selectedCustomer && (
                      <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 animate-slideInUp">
                        <div className="flex items-start gap-3">
                          <div className={`
                            h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg
                            ${selectedCustomer.isBlacklisted 
                              ? 'bg-gradient-to-r from-red-600 to-red-700' 
                              : selectedCustomer.isTrusted 
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                            }
                          `}>
                            {selectedCustomer.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">{selectedCustomer.name}</div>
                            <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 mt-1">
                              <Phone className="h-3 w-3" />
                              {selectedCustomer.mobile}
                            </div>
                            <div className="mt-2">
                              {selectedCustomer.isBlacklisted ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium">
                                  <Ban className="h-3 w-3" />
                                  Blacklisted
                                </span>
                              ) : selectedCustomer.isTrusted ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
                                  <Shield className="h-3 w-3" />
                                  Trusted Customer
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CATEGORY FILTERS CARD */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 animate-slideInUp" style={{ animationDelay: '200ms' }}>
                  <div 
                    className="px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex items-center justify-between cursor-pointer"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-purple-100 rounded-lg">
                        <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900">Filter Equipment</h3>
                    </div>
                    {showFilters ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                  
                  {showFilters && (
                    <div className="p-4 sm:p-5 animate-slideInDown">
                      {/* Category Grid */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {Object.entries(CATEGORY_MAP).map(([key, config], idx) => {
                          const Icon = config.icon;
                          const isSelected = filters.category === key;
                          const color = config.color;

                          return (
                            <button
                              key={key}
                              onClick={() => {
                                setSelectedCategory(key);
                                setFilters({ 
                                  category: filters.category === key ? "" : key, 
                                  brand: "", 
                                  subCategory: "" 
                                });
                              }}
                              className={`
                                p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105
                                flex flex-col items-center gap-1 sm:gap-2
                                animate-fadeIn
                                ${isSelected 
                                  ? `bg-gradient-to-r ${config.gradient} text-white border-transparent shadow-md` 
                                  : `border-gray-200 text-gray-700 hover:border-${color}-300 hover:bg-${color}-50`
                                }
                              `}
                              style={{ animationDelay: `${idx * 50}ms` }}
                            >
                              <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isSelected ? 'text-white' : `text-${color}-600`}`} />
                              <span className="text-xs font-medium">{key}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Brand Filter */}
                      {categoryConfig.brands.length > 0 && (
                        <div className="mt-4 sm:mt-5">
                          <label className="block text-xs font-medium text-gray-700 mb-1.5 sm:mb-2">
                            Brand
                          </label>
                          <div className="relative">
                            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                              value={filters.brand}
                              onChange={e => setFilters({ ...filters, brand: e.target.value })}
                              className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white text-sm"
                            >
                              <option value="">All Brands</option>
                              {categoryConfig.brands.map(b => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      )}

                      {/* Sub Category Filter */}
                      {categoryConfig.subCategories.length > 0 && (
                        <div className="mt-3 sm:mt-4">
                          <label className="block text-xs font-medium text-gray-700 mb-1.5 sm:mb-2">
                            Type
                          </label>
                          <div className="relative">
                            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                              value={filters.subCategory}
                              onChange={e => setFilters({ ...filters, subCategory: e.target.value })}
                              className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white text-sm"
                            >
                              <option value="">All Types</option>
                              {categoryConfig.subCategories.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* MIDDLE COLUMN - ITEM SELECTION */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-5">
                
                {/* ITEM SELECTION CARD */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 animate-slideInUp" style={{ animationDelay: '300ms' }}>
                  <div 
                    className="px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex items-center justify-between cursor-pointer"
                    onClick={() => setCurrentStep(2)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-indigo-100 rounded-lg">
                        <Package className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900">Select Equipment</h3>
                    </div>
                    {currentStep === 2 && <span className="text-xs text-blue-600 font-medium">Current</span>}
                  </div>
                  
                  <div className="p-4 sm:p-5">
                    <div className="relative">
                      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                        value={form.itemId}
                        onChange={e => {
                          setForm({ ...form, itemId: e.target.value });
                          setCurrentStep(2);
                        }}
                        className="w-full pl-10 pr-8 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white text-sm"
                        disabled={filteredItems.length === 0}
                      >
                        <option value="">
                          {filteredItems.length === 0 ? "No items match filters" : "Choose equipment..."}
                        </option>
                        {filteredItems.map(i => (
                          <option key={i._id} value={i._id}>
                            {i.name} - ₹{i.rentPerDay}/day ({i.availableQuantity} left)
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>

                    {selectedItem && (
                      <div className="mt-4 animate-slideInUp">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 sm:p-4 border border-indigo-100">
                          <div className="flex items-start gap-3">
                            <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-md">
                              {selectedItem.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 text-sm sm:text-base">{selectedItem.name}</div>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                                <span className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">
                                  {selectedItem.category}
                                </span>
                                {selectedItem.brand && (
                                  <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                                    {selectedItem.brand}
                                  </span>
                                )}
                                {selectedItem.subCategory && (
                                  <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                                    {selectedItem.subCategory}
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 sm:mt-3 text-xs sm:text-sm">
                                <span className="text-gray-600">Daily Rate: </span>
                                <span className="font-bold text-indigo-600">₹{selectedItem.rentPerDay}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - DATES & SUMMARY */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-5">
                
                {/* BOOKING PERIOD CARD */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 animate-slideInUp" style={{ animationDelay: '400ms' }}>
                  <div 
                    className="px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex items-center justify-between cursor-pointer"
                    onClick={() => setCurrentStep(3)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-100 rounded-lg">
                        <CalendarRange className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900">Booking Period</h3>
                    </div>
                    {currentStep === 3 && <span className="text-xs text-blue-600 font-medium">Current</span>}
                  </div>
                  
                  <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Start Date</label>
                      <div className="relative group">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="date"
                          value={form.startDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={e => {
                            setForm({ ...form, startDate: e.target.value });
                            setCurrentStep(3);
                          }}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">End Date</label>
                      <div className="relative group">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="date"
                          value={form.endDate}
                          min={form.startDate || new Date().toISOString().split('T')[0]}
                          onChange={e => {
                            setForm({ ...form, endDate: e.target.value });
                            setCurrentStep(3);
                          }}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                        />
                      </div>
                    </div>

                    {form.startDate && form.endDate && (
                      <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 animate-scaleUp">
                        <div className="text-center">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 mx-auto mb-1 sm:mb-2" />
                          <div className="text-xs text-gray-600">Booking Duration</div>
                          <div className="text-xl sm:text-2xl font-bold text-amber-600">{totalDays} days</div>
                          <div className="text-xs text-gray-500 mt-1 sm:mt-2">
                            {new Date(form.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - {new Date(form.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* QUANTITY CARD */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 animate-slideInUp" style={{ animationDelay: '500ms' }}>
                  <div className="px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-green-100 rounded-lg">
                        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900">Quantity</h3>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setForm({ ...form, quantity: Math.max(1, form.quantity - 1) })}
                        className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-700 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                        disabled={form.quantity <= 1}
                      >
                        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-blue-600">{form.quantity}</div>
                        <div className="text-xs text-gray-500 mt-1">items</div>
                      </div>
                      
                      <button
                        onClick={() => setForm({ ...form, quantity: form.quantity + 1 })}
                        className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 hover:bg-blue-200 rounded-xl flex items-center justify-center text-blue-700 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                        disabled={availability && form.quantity >= availability.availableQuantity}
                      >
                        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>

                    {/* Availability Status */}
                    {availability && (
                      <div className={`mt-4 p-3 sm:p-4 rounded-xl animate-slideInUp ${
                        form.quantity > availability.availableQuantity
                          ? 'bg-red-50 border border-red-200'
                          : 'bg-green-50 border border-green-200'
                      }`}>
                        <div className="flex items-center gap-2 sm:gap-3">
                          {form.quantity > availability.availableQuantity ? (
                            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                          ) : (
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                          )}
                          <div>
                            <div className={`text-xs sm:text-sm font-medium ${
                              form.quantity > availability.availableQuantity ? 'text-red-700' : 'text-green-700'
                            }`}>
                              {availability.availableQuantity} item(s) available
                            </div>
                            {form.quantity <= availability.availableQuantity && (
                              <div className="text-xs text-green-600">✓ Sufficient stock</div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* SUMMARY CARD */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{ animationDelay: '600ms' }}>
                  <div className="px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border-b border-white/20">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      <h3 className="font-semibold text-sm sm:text-base text-white">Booking Summary</h3>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-5">
                    {selectedItem && form.startDate && form.endDate && form.quantity > 0 ? (
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center text-white/90 text-xs sm:text-sm">
                          <span>Daily Rate:</span>
                          <span className="font-medium">₹{selectedItem.rentPerDay} × {form.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center text-white/90 text-xs sm:text-sm">
                          <span>Duration:</span>
                          <span className="font-medium">{totalDays} days</span>
                        </div>
                        <div className="border-t border-white/20 pt-2 sm:pt-3 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-semibold text-sm sm:text-base">Total Amount:</span>
                            <span className="text-xl sm:text-2xl font-bold text-white">₹{totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 mt-2 p-2 bg-white/10 rounded-lg">
                          <Info className="h-3 w-3 text-white/60 mt-0.5" />
                          <p className="text-xs text-white/60">
                            * Taxes and security deposit calculated separately
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 sm:py-6">
                        <ShoppingCart className="h-8 w-8 sm:h-10 sm:w-10 text-white/40 mx-auto mb-2 sm:mb-3" />
                        <p className="text-white/70 text-xs sm:text-sm">Complete the form to see summary</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 animate-shake">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-700 text-xs sm:text-sm">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-t border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span>All fields are required</span>
            </div>
            <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium text-xs sm:text-sm hover:bg-gray-50 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={loading || !form.customerId || !form.itemId || !form.startDate || !form.endDate}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-1.5 sm:gap-2 min-w-[140px] sm:min-w-[180px]"
              >
                {loading ? (
                  <>
                    <Loader className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Create Booking
                  </>
                )}
              </button>
            </div>
          </div>
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
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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
        .animate-slideInDown {
          animation: slideInDown 0.4s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default CreateBookingModal;