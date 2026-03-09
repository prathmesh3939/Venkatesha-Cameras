// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../api/api";

// const EditItem = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     description: "",
//     totalQuantity: "",
//     availableQuantity: "",
//     rentPerDay: "",
//     isActive: true,
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const res = await api.get(`/items/${id}`);
//         const item = res.data.item;

//         setFormData({
//           name: item.name || "",
//           category: item.category || "",
//           description: item.description || "",
//           totalQuantity: item.totalQuantity,
//           availableQuantity: item.availableQuantity,
//           rentPerDay: item.rentPerDay,
//           isActive: item.isActive,
//         });
//       } catch (err) {
//         setMessage("Failed to load item");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItem();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setMessage("");

//     // Safety: available <= total
//     if (Number(formData.availableQuantity) > Number(formData.totalQuantity)) {
//       setMessage("Available quantity cannot exceed total quantity");
//       setSaving(false);
//       return;
//     }

//     try {
//       await api.put(`/items/${id}`, {
//         ...formData,
//         totalQuantity: Number(formData.totalQuantity),
//         availableQuantity: Number(formData.availableQuantity),
//         rentPerDay: Number(formData.rentPerDay),
//       });

//       setMessage("Item updated successfully");

//       setTimeout(() => {
//         navigate("/items");
//       }, 800);
//     } catch (err) {
//       setMessage(
//         err.response?.data?.message || "Failed to update item"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to permanently delete this item?"
//     );

//     if (!confirmDelete) return;

//     setDeleting(true);

//     try {
//       await api.delete(`/items/${id}`);
//       alert("Item deleted successfully");
//       navigate("/items");
//     } catch (err) {
//       alert("Failed to delete item");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   if (loading) return <p>Loading item...</p>;

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Edit Item</h2>

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
//           placeholder="Category"
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
//           name="availableQuantity"
//           placeholder="Available Quantity"
//           value={formData.availableQuantity}
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

//         <button disabled={saving}>
//           {saving ? "Saving..." : "Update Item"}
//         </button>
//       </form>

//       <hr className="my-6" />

//       {/* Danger Zone */}
//       <div>
//         <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
//         <button
//           onClick={handleDelete}
//           disabled={deleting}
//           className="text-red-600 underline"
//         >
//           {deleting ? "Deleting..." : "Delete Item"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditItem;



import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    totalQuantity: "",
    availableQuantity: "",
    rentPerDay: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        const item = res.data.item;

        setFormData({
          name: item.name || "",
          category: item.category || "",
          description: item.description || "",
          totalQuantity: item.totalQuantity || "",
          availableQuantity: item.availableQuantity || "",
          rentPerDay: item.rentPerDay || "",
          isActive: item.isActive !== undefined ? item.isActive : true,
        });
        setMessage({ text: "", type: "" });
      } catch (err) {
        setMessage({ text: "Failed to load item", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    // Safety: available <= total
    if (Number(formData.availableQuantity) > Number(formData.totalQuantity)) {
      setMessage({ 
        text: "Available quantity cannot exceed total quantity", 
        type: "error" 
      });
      setSaving(false);
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.category || !formData.totalQuantity || !formData.rentPerDay) {
      setMessage({ 
        text: "Please fill all required fields", 
        type: "error" 
      });
      setSaving(false);
      return;
    }

    try {
      await api.put(`/items/${id}`, {
        ...formData,
        totalQuantity: Number(formData.totalQuantity),
        availableQuantity: Number(formData.availableQuantity),
        rentPerDay: Number(formData.rentPerDay),
      });

      setMessage({ 
        text: "✅ Item updated successfully! Redirecting...", 
        type: "success" 
      });

      setTimeout(() => {
        navigate("/items");
      }, 1200);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to update item",
        type: "error"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this item? This action cannot be undone."
    );

    if (!confirmDelete) return;

    setDeleting(true);
    setMessage({ text: "", type: "" });

    try {
      await api.delete(`/items/${id}`);
      setMessage({ 
        text: "Item deleted successfully. Redirecting...", 
        type: "success" 
      });
      setTimeout(() => navigate("/items"), 1000);
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || "Failed to delete item", 
        type: "error" 
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading item details...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit Item</h1>
              <p className="text-gray-600 mt-1">Update item details and inventory information</p>
            </div>
            <button
              onClick={() => navigate("/items")}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center"
            >
              <span className="mr-2">←</span>
              Back to Items
            </button>
          </div>

          {/* IDENTIFICATION BADGE */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xl font-bold mr-4 shadow-md">
                {formData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm text-gray-500">Editing Item</div>
                <div className="font-bold text-gray-800">{formData.name}</div>
                <div className="text-sm text-gray-600">Item ID: {id}</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN FORM CARD */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-6">
          {/* CARD HEADER */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-xl font-semibold text-gray-800">
              ✏️ Edit Item Details
            </h2>
          </div>

          {/* FORM CONTENT */}
          <div className="p-6">
            {/* MESSAGE DISPLAY */}
            {message.text && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.type === "error" 
                  ? "bg-red-50 border border-red-200" 
                  : "bg-green-50 border border-green-200"
              }`}>
                <p className={`flex items-center ${
                  message.type === "error" ? "text-red-700" : "text-green-700"
                }`}>
                  <span className="mr-2">ℹ️</span>
                  {message.text}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ITEM NAME & CATEGORY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      🏷️
                    </div>
                    <input
                      name="name"
                      placeholder="e.g., Sony A7 IV Camera"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      📦
                    </div>
                    <input
                      name="category"
                      placeholder="e.g., Camera, Lens, Accessories"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Add details about the item, condition, specifications..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* INVENTORY QUANTITIES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Quantity *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      💾
                    </div>
                    <input
                      type="number"
                      name="totalQuantity"
                      placeholder="0"
                      value={formData.totalQuantity}
                      onChange={handleChange}
                      min="0"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                    <div className="absolute right-3 top-3 text-gray-400 text-sm">
                      units
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Total items in inventory</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Quantity *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      📦
                    </div>
                    <input
                      type="number"
                      name="availableQuantity"
                      placeholder="0"
                      value={formData.availableQuantity}
                      onChange={handleChange}
                      min="0"
                      max={formData.totalQuantity}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                    <div className="absolute right-3 top-3 text-gray-400 text-sm">
                      units
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Currently available for rent</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rent Per Day *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-500">
                      💰
                    </div>
                    <input
                      type="number"
                      name="rentPerDay"
                      placeholder="0.00"
                      value={formData.rentPerDay}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                    <div className="absolute right-3 top-3 text-gray-400 text-sm">
                      /day
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Daily rental rate</p>
                </div>
              </div>

              {/* QUANTITY WARNING */}
              {Number(formData.availableQuantity) > Number(formData.totalQuantity) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <span className="mr-2">⚠️</span>
                    <span className="text-yellow-700 font-medium">
                      Available quantity ({formData.availableQuantity}) exceeds total quantity ({formData.totalQuantity})
                    </span>
                  </div>
                </div>
              )}

              {/* STATUS */}
              <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3">
                  <label className="font-medium text-gray-700">
                    Item is Active
                  </label>
                  <p className="text-sm text-gray-500">
                    Active items will be available for booking
                  </p>
                </div>
                <div className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${
                  formData.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {formData.isActive ? "Active" : "Inactive"}
                </div>
              </div>

              {/* FORM ACTIONS */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <button
                    type="button"
                    onClick={() => navigate("/items")}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-200 flex items-center justify-center"
                  >
                    <span className="mr-2">←</span>
                    Cancel
                  </button>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <span className="mr-2">💾</span>
                          Update Item
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200">
          {/* CARD HEADER */}
          <div className="px-6 py-4 border-b border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
            <h2 className="text-xl font-semibold text-red-800">
              ⚠️ Danger Zone
            </h2>
            <p className="text-sm text-red-600 mt-1">Irreversible actions</p>
          </div>

          {/* DANGER ZONE CONTENT */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold text-gray-800 mb-1">Delete this item</h3>
                <p className="text-sm text-gray-600">
                  Once deleted, this item will be permanently removed from the system. 
                  This action cannot be undone.
                </p>
              </div>
              
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg font-medium transition duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🗑️</span>
                    Delete Item
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* STATS INFO */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-100">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mr-4 shadow-md">
              <span className="text-white">ℹ️</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Quick Stats</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-sm text-gray-500">Total Quantity</p>
                  <p className="text-xl font-bold text-gray-800">{formData.totalQuantity || 0}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-sm text-gray-500">Available</p>
                  <p className={`text-xl font-bold ${
                    Number(formData.availableQuantity) > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formData.availableQuantity || 0}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-sm text-gray-500">Booked</p>
                  <p className="text-xl font-bold text-gray-800">
                    {Number(formData.totalQuantity) - Number(formData.availableQuantity)}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-sm text-gray-500">Daily Rate</p>
                  <p className="text-xl font-bold text-blue-600">₹{formData.rentPerDay || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;