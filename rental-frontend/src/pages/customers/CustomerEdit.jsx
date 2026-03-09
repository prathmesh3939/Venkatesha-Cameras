// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../api/api";

// const CustomerEdit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     referenceName: "",
//     notes: "",
//     isTrusted: false,
//     isBlacklisted: false,
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchCustomer = async () => {
//       try {
//         const res = await api.get(`/customers/${id}`);
//         const c = res.data.customer;

//         setFormData({
//           name: c.name || "",
//           mobile: c.mobile || "",
//           referenceName: c.referenceName || "",
//           notes: c.notes || "",
//           isTrusted: c.isTrusted || false,
//           isBlacklisted: c.isBlacklisted || false,
//         });
//       } catch (err) {
//         setMessage("Failed to load customer");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomer();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setMessage("");

//     try {
//       await api.put(`/customers/${id}`, {
//         name: formData.name,
//         referenceName: formData.referenceName,
//         notes: formData.notes,
//         isTrusted: formData.isTrusted,
//         isBlacklisted: formData.isBlacklisted,
//       });

//       setMessage("Customer updated successfully");

//       setTimeout(() => {
//         navigate(`/customers/${id}`);
//       }, 800);
//     } catch (err) {
//       setMessage("Failed to update customer");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to permanently delete this customer?"
//     );

//     if (!confirmDelete) return;

//     setDeleting(true);

//     try {
//       await api.delete(`/customers/${id}`);
//       alert("Customer deleted successfully");
//       navigate("/customers");
//     } catch (err) {
//       alert("Failed to delete customer");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   if (loading) return <p>Loading customer...</p>;

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>

//       {message && <p className="mb-3 text-sm">{message}</p>}

//       <form onSubmit={handleUpdate} className="space-y-3">
//         <input
//           name="name"
//           placeholder="Customer Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         {/* Mobile is NOT editable (industry standard) */}
//         <input
//           name="mobile"
//           value={formData.mobile}
//           disabled
//         />

//         <input
//           name="referenceName"
//           placeholder="Reference Name"
//           value={formData.referenceName}
//           onChange={handleChange}
//         />

//         <textarea
//           name="notes"
//           placeholder="Notes"
//           value={formData.notes}
//           onChange={handleChange}
//         />

//         <label>
//           <input
//             type="checkbox"
//             name="isTrusted"
//             checked={formData.isTrusted}
//             onChange={handleChange}
//           />{" "}
//           Trusted Customer
//         </label>

//         <label>
//           <input
//             type="checkbox"
//             name="isBlacklisted"
//             checked={formData.isBlacklisted}
//             onChange={handleChange}
//           />{" "}
//           Blacklisted Customer
//         </label>

//         <button disabled={saving}>
//           {saving ? "Saving..." : "Update Customer"}
//         </button>
//       </form>

//       <hr className="my-6" />

//       {/* DANGER ZONE */}
//       <div>
//         <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
//         <button
//           onClick={handleDelete}
//           disabled={deleting}
//           className="text-red-600 underline"
//         >
//           {deleting ? "Deleting..." : "Delete Customer"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomerEdit;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import {
  User,
  Phone,
  Users,
  FileText,
  Shield,
  Ban,
  Save,
  ArrowLeft,
  Trash2,
  AlertTriangle,
  Loader
} from "lucide-react";

const CustomerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    referenceName: "",
    notes: "",
    isTrusted: false,
    isBlacklisted: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.get(`/customers/${id}`);
        const c = res.data.customer;

        setFormData({
          name: c.name || "",
          mobile: c.mobile || "",
          referenceName: c.referenceName || "",
          notes: c.notes || "",
          isTrusted: c.isTrusted || false,
          isBlacklisted: c.isBlacklisted || false,
        });
      } catch (err) {
        setMessage({ type: "error", text: "❌ Failed to load customer details" });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      await api.put(`/customers/${id}`, {
        name: formData.name,
        referenceName: formData.referenceName,
        notes: formData.notes,
        isTrusted: formData.isTrusted,
        isBlacklisted: formData.isBlacklisted,
      });

      setMessage({ 
        type: "success", 
        text: "✅ Customer updated successfully!" 
      });

      setTimeout(() => {
        navigate(`/customers/${id}`);
      }, 1500);
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: "❌ Failed to update customer" 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "⚠️ Are you absolutely sure you want to permanently delete this customer?\n\nThis action cannot be undone and will delete all associated bookings and records."
    );

    if (!confirmDelete) return;

    setDeleting(true);

    try {
      await api.delete(`/customers/${id}`);
      alert("✅ Customer deleted successfully");
      navigate("/customers");
    } catch (err) {
      alert("❌ Failed to delete customer");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-sm p-8">
            <Loader className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading customer details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/customers/${id}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Customer Details</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-50">
              <User className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Customer</h1>
              <p className="text-gray-500">Update customer information</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === "success" 
                ? "bg-green-50 border border-green-200 text-green-700" 
                : "bg-red-50 border border-red-200 text-red-700"
            }`}>
              <p className="font-medium">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-8">
            {/* Basic Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-gray-400" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter customer name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Mobile Field (Disabled) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      name="mobile"
                      value={formData.mobile}
                      disabled
                      className="w-full pl-10 pr-24 py-2.5 border border-gray-300 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      Read-only
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Mobile number cannot be changed
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-400" />
                Additional Information
              </h3>
              
              <div className="space-y-6">
                {/* Reference Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Name
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      name="referenceName"
                      type="text"
                      placeholder="Enter reference name (optional)"
                      value={formData.referenceName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <textarea
                      name="notes"
                      placeholder="Enter any additional notes..."
                      value={formData.notes}
                      onChange={handleChange}
                      rows="4"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status Flags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Trusted Customer */}
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors">
                  <input
                    type="checkbox"
                    name="isTrusted"
                    checked={formData.isTrusted}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-5 w-5 text-green-600" />
                      <p className="font-medium text-gray-900">Trusted Customer</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Mark as reliable and trustworthy
                    </p>
                  </div>
                </label>

                {/* Blacklisted */}
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-red-300 transition-colors">
                  <input
                    type="checkbox"
                    name="isBlacklisted"
                    checked={formData.isBlacklisted}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Ban className="h-5 w-5 text-red-600" />
                      <p className="font-medium text-gray-900">Blacklisted</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Flag as problematic customer
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons - Clearly Visible */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(`/customers/${id}`)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {saving ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Update Customer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-700">Danger Zone</h3>
              <p className="text-red-600 text-sm">Irreversible actions</p>
            </div>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-800 mb-1">Delete Customer</p>
                <p className="text-red-600 text-sm">
                  Permanently delete this customer and all associated records
                </p>
              </div>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {deleting ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                {deleting ? "Deleting..." : "Delete Customer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerEdit;