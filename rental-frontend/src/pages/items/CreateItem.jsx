// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";

// const CreateItem = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     description: "",
//     totalQuantity: "",
//     rentPerDay: "",
//     isActive: true,
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const payload = {
//         ...formData,
//         totalQuantity: Number(formData.totalQuantity),
//         availableQuantity: Number(formData.totalQuantity), // 🔒 important
//         rentPerDay: Number(formData.rentPerDay),
//       };

//       await api.post("/items", payload);

//       setMessage("Item created successfully");

//       setTimeout(() => {
//         navigate("/items");
//       }, 800);
//     } catch (err) {
//       setMessage(
//         err.response?.data?.message || "Failed to create item"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Add Item</h2>

//       {message && <p className="mb-3 text-sm">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           name="name"
//           placeholder="Item Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="category"
//           placeholder="Category (Camera, Lens, etc.)"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="totalQuantity"
//           placeholder="Total Quantity"
//           value={formData.totalQuantity}
//           onChange={handleChange}
//           min="0"
//           required
//         />

//         <input
//           type="number"
//           name="rentPerDay"
//           placeholder="Rent Per Day"
//           value={formData.rentPerDay}
//           onChange={handleChange}
//           min="0"
//           required
//         />

//         <label>
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//           />{" "}
//           Active
//         </label>

//         <button disabled={loading}>
//           {loading ? "Saving..." : "Create Item"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateItem;

// //before categori working properly

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";

// /* =========================
//    CATEGORY CONFIG (STATIC)
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
//     brands: [], // brand optional
//     subCategories: ["Tripod", "Battery", "Memory Card", "Mic", "Bag"]
//   }
// };

// const CreateItem = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     brand: "",
//     subCategory: "",
//     description: "",
//     totalQuantity: "",
//     rentPerDay: "",
//     isActive: true
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   /* =========================
//      HANDLERS
//   ========================= */
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name === "category") {
//       setFormData({
//         ...formData,
//         category: value,
//         brand: "",
//         subCategory: ""
//       });
//       return;
//     }

//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value
//     });
//   };

//   /* =========================
//      SUBMIT
//   ========================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!formData.category) {
//       setMessage("Category is required");
//       return;
//     }

//     const config = CATEGORY_MAP[formData.category];

//     if (config.brands.length > 0 && !formData.brand) {
//       setMessage("Brand is required for selected category");
//       return;
//     }

//     if (config.subCategories.length > 0 && !formData.subCategory) {
//       setMessage("Type is required for selected category");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         name: formData.name,
//         category: formData.category,
//         brand: formData.brand || null,
//         subCategory: formData.subCategory || null,
//         description: formData.description,
//         totalQuantity: Number(formData.totalQuantity),
//         rentPerDay: Number(formData.rentPerDay),
//         isActive: formData.isActive
//       };

//       await api.post("/items", payload);

//       setMessage("Item created successfully");
//       setTimeout(() => navigate("/items"), 700);

//     } catch (err) {
//       setMessage(err.response?.data?.message || "Failed to create item");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const categoryConfig = CATEGORY_MAP[formData.category] || {
//     brands: [],
//     subCategories: []
//   };

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Add Item</h2>

//       {message && <p className="mb-3 text-sm">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-3">

//         <input
//           name="name"
//           placeholder="Item Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Category</option>
//           {Object.keys(CATEGORY_MAP).map(cat => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>

//         {categoryConfig.brands.length > 0 && (
//           <select
//             name="brand"
//             value={formData.brand}
//             onChange={handleChange}
//           >
//             <option value="">Select Brand</option>
//             {categoryConfig.brands.map(b => (
//               <option key={b} value={b}>{b}</option>
//             ))}
//           </select>
//         )}

//         {categoryConfig.subCategories.length > 0 && (
//           <select
//             name="subCategory"
//             value={formData.subCategory}
//             onChange={handleChange}
//           >
//             <option value="">Select Type</option>
//             {categoryConfig.subCategories.map(s => (
//               <option key={s} value={s}>{s}</option>
//             ))}
//           </select>
//         )}

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="totalQuantity"
//           placeholder="Total Quantity"
//           value={formData.totalQuantity}
//           onChange={handleChange}
//           min="0"
//           required
//         />

//         <input
//           type="number"
//           name="rentPerDay"
//           placeholder="Rent Per Day"
//           value={formData.rentPerDay}
//           onChange={handleChange}
//           min="0"
//           required
//         />

//         <label>
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//           />{" "}
//           Active
//         </label>

//         <button disabled={loading}>
//           {loading ? "Saving..." : "Create Item"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateItem;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import {
  Package,
  Camera,
  Search,
  Zap,
  Box,
  Sun,
  Layers,
  Info,
  CheckCircle,
  AlertCircle,
  Loader,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  DollarSign,
  Hash,
  FileText,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  ArrowLeft,
  Save
} from "lucide-react";

/* =========================
   CATEGORY CONFIG (STATIC)
========================= */
const CATEGORY_MAP = {
  Camera: {
    brands: ["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic"],
    subCategories: ["Camera Body", "Camera With Kit Lens", "Mirrorless", "DSLR"],
    icon: Camera,
    color: "blue"
  },
  Lens: {
    brands: ["Canon", "Nikon", "Sony", "Sigma", "Tamron"],
    subCategories: ["Prime Lens", "Zoom Lens", "Wide Angle", "Telephoto"],
    icon: Search,
    color: "purple"
  },
  Light: {
    brands: ["Godox", "Aputure", "Nanlite", "Profoto", "Broncolor"],
    subCategories: ["LED Light", "Flash Light", "Porta Set", "Softbox"],
    icon: Sun,
    color: "yellow"
  },
  Accessories: {
    brands: ["AmazonBasics", "Manfrotto", "Lowepro", "Peak Design"],
    subCategories: ["Tripod", "Battery", "Memory Card", "Mic", "Bag", "Filter"],
    icon: Box,
    color: "green"
  }
};

const CreateItem = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    subCategory: "",
    description: "",
    totalQuantity: "",
    rentPerDay: "",
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [animateForm, setAnimateForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setAnimateForm(true);
  }, []);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "category") {
      setFormData({
        ...formData,
        category: value,
        brand: "",
        subCategory: ""
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!formData.category) {
      setMessage({ text: "Category is required", type: "error" });
      return;
    }

    const config = CATEGORY_MAP[formData.category];

    if (config.brands.length > 0 && !formData.brand) {
      setMessage({ text: "Brand is required for selected category", type: "error" });
      return;
    }

    if (config.subCategories.length > 0 && !formData.subCategory) {
      setMessage({ text: "Type is required for selected category", type: "error" });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        category: formData.category,
        brand: formData.brand || null,
        subCategory: formData.subCategory || null,
        description: formData.description,
        totalQuantity: Number(formData.totalQuantity),
        rentPerDay: Number(formData.rentPerDay),
        isActive: formData.isActive
      };

      await api.post("/items", payload);

      setMessage({ 
        text: "Item created successfully! Redirecting...", 
        type: "success" 
      });
      
      setTimeout(() => navigate("/items"), 1500);

    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || "Failed to create item", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  const categoryConfig = CATEGORY_MAP[formData.category] || {
    brands: [],
    subCategories: [],
    icon: Package,
    color: "gray"
  };

  const CategoryIcon = categoryConfig.icon;

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Item</h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  Add camera equipment to your inventory
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/items")}
              className="group flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-all duration-200 hover:scale-105 self-start"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Items
            </button>
          </div>

          {/* PROGRESS INDICATOR */}
          <div className="flex items-center mt-6 animate-slideInUp" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                transition-all duration-300
                ${currentStep >= 1 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-500'
                }
              `}>
                1
              </div>
              <div className={`ml-2 text-sm font-medium ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                Item Details
              </div>
            </div>
            <div className={`flex-1 h-1 mx-4 transition-all duration-500 ${currentStep >= 1 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'}`}></div>
            <div className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                transition-all duration-300
                ${currentStep >= 2 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-500'
                }
              `}>
                2
              </div>
              <div className={`ml-2 text-sm font-medium ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                Review & Submit
              </div>
            </div>
          </div>
        </div>

        {/* MAIN FORM CARD */}
        <div className={`
          bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden
          transition-all duration-500
          ${animateForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          {/* CARD HEADER */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Item Information
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Fill in the details below to add a new item
                </p>
              </div>
            </div>
          </div>

          {/* FORM CONTENT */}
          <div className="p-5 sm:p-6">
            {/* MESSAGE DISPLAY */}
            {message.text && (
              <div className={`
                mb-6 p-4 rounded-lg flex items-center gap-3 animate-slideInUp
                ${message.type === "error" 
                  ? "bg-red-50 border border-red-200" 
                  : "bg-green-50 border border-green-200"
                }
              `}>
                {message.type === "error" ? (
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                )}
                <p className={`text-sm font-medium ${
                  message.type === "error" ? "text-red-700" : "text-green-700"
                }`}>
                  {message.text}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ITEM NAME */}
              <div className="animate-slideInUp" style={{ animationDelay: '200ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    name="name"
                    placeholder="e.g., Sony A7 IV Camera Body"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setCurrentStep(1)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* CATEGORY */}
              <div className="animate-slideInUp" style={{ animationDelay: '300ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                
                {/* Category Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {Object.entries(CATEGORY_MAP).map(([cat, config], idx) => {
                    const Icon = config.icon;
                    const isSelected = formData.category === cat;
                    const color = config.color;

                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            category: cat,
                            brand: "",
                            subCategory: ""
                          });
                          setCurrentStep(1);
                        }}
                        className={`
                          p-3 rounded-xl border-2 flex flex-col items-center justify-center
                          transition-all duration-200 transform hover:scale-105
                          animate-fadeIn
                          ${isSelected
                            ? `border-${color}-500 bg-${color}-50 shadow-md`
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                          }
                        `}
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <Icon className={`h-5 w-5 mb-1 ${isSelected ? `text-${color}-600` : 'text-gray-600'}`} />
                        <span className={`text-xs font-medium ${isSelected ? `text-${color}-700` : 'text-gray-700'}`}>
                          {cat}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Category Select */}
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a category</option>
                  {Object.keys(CATEGORY_MAP).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* BRAND & TYPE - CONDITIONAL */}
              {formData.category && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slideInUp" style={{ animationDelay: '400ms' }}>
                  {/* BRAND */}
                  {categoryConfig.brands.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Brand <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select brand</option>
                        {categoryConfig.brands.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* TYPE */}
                  {categoryConfig.subCategories.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select type</option>
                        {categoryConfig.subCategories.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* DESCRIPTION */}
              <div className="animate-slideInUp" style={{ animationDelay: '500ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <div className="relative group">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <textarea
                    name="description"
                    placeholder="Add details about the item, condition, specifications..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* QUANTITY & PRICE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slideInUp" style={{ animationDelay: '600ms' }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Total Quantity <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="number"
                      name="totalQuantity"
                      placeholder="0"
                      value={formData.totalQuantity}
                      onChange={handleChange}
                      min="0"
                      required
                      className="w-full pl-10 pr-16 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      units
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Rent Per Day <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="number"
                      name="rentPerDay"
                      placeholder="0.00"
                      value={formData.rentPerDay}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                      className="w-full pl-10 pr-16 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      /day
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTIVE STATUS */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 animate-slideInUp" style={{ animationDelay: '700ms' }}>
                <div className="flex items-center gap-3">
                  {formData.isActive ? (
                    <ToggleRight className="h-6 w-6 text-green-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                  <div>
                    <label className="font-medium text-gray-700 text-sm">
                      Item is Active
                    </label>
                    <p className="text-xs text-gray-500">
                      Active items will be available for booking
                    </p>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className={`
                    w-11 h-6 rounded-full peer 
                    transition-all duration-300
                    ${formData.isActive ? 'bg-blue-600' : 'bg-gray-300'}
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all
                    peer-checked:after:translate-x-5
                  `}></div>
                </label>
              </div>

              {/* FORM ACTIONS */}
              <div className="pt-5 border-t border-gray-200 animate-slideInUp" style={{ animationDelay: '800ms' }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/items")}
                    className="group px-5 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 order-2 sm:order-1"
                  >
                    <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    onMouseEnter={() => setCurrentStep(2)}
                    disabled={loading}
                    className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 order-1 sm:order-2"
                  >
                    {loading ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        Creating Item...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 transition-transform group-hover:scale-110" />
                        Create Item
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  <p>All fields marked with <span className="text-red-500">*</span> are required</p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* HELP CARD */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100 animate-slideInUp" style={{ animationDelay: '900ms' }}>
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-md">
              <Info className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                Tips for adding items
              </h4>
              <ul className="text-xs text-gray-600 space-y-1.5">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5"></div>
                  <span>Use descriptive names that customers will recognize</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5"></div>
                  <span>Set accurate rental prices based on market rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5"></div>
                  <span>Include detailed descriptions for better customer understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5"></div>
                  <span>Keep inactive items disabled until they're available again</span>
                </li>
              </ul>
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
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
      `}</style>
    </div>
  );
};

export default CreateItem;