// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../../api/api";

// // const CreateCustomer = () => {
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     mobile: "",
// //     referenceName: "",
// //     notes: "",
// //     isTrusted: false,
// //     isBlacklisted: false,
// //   });

// //   const [document, setDocument] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === "checkbox" ? checked : value,
// //     });
// //   };

// //   const handleFileChange = (e) => {
// //     setDocument(e.target.files[0]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage("");

// //     try {
// //       const data = new FormData();

// //       Object.entries(formData).forEach(([key, value]) => {
// //         data.append(key, value);
// //       });

// //       if (document) {
// //         data.append("document", document); // 🔥 must match multer
// //       }

// //       await api.post("/customers", data);

// //       setMessage("Customer created successfully");

// //       // Redirect after success (important to avoid confusion)
// //       setTimeout(() => {
// //         navigate("/customers");
// //       }, 800);
// //     } catch (err) {
// //       setMessage(
// //         err.response?.data?.message || "Failed to create customer"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
// //       <h2 className="text-xl font-semibold mb-4">Create Customer</h2>

// //       {message && <p className="mb-3 text-sm">{message}</p>}

// //       <form onSubmit={handleSubmit} className="space-y-3">
// //         <input
// //           name="name"
// //           placeholder="Name"
// //           value={formData.name}
// //           onChange={handleChange}
// //           required
// //         />

// //         <input
// //           name="mobile"
// //           placeholder="Mobile"
// //           value={formData.mobile}
// //           onChange={handleChange}
// //           required
// //         />

// //         <input
// //           name="referenceName"
// //           placeholder="Reference Name (optional)"
// //           value={formData.referenceName}
// //           onChange={handleChange}
// //         />

// //         <textarea
// //           name="notes"
// //           placeholder="Notes (optional)"
// //           value={formData.notes}
// //           onChange={handleChange}
// //         />

// //         <input
// //           type="file"
// //           accept=".jpg,.jpeg,.png,.pdf"
// //           onChange={handleFileChange}
// //         />

// //         <label>
// //           <input
// //             type="checkbox"
// //             name="isTrusted"
// //             checked={formData.isTrusted}
// //             onChange={handleChange}
// //           />{" "}
// //           Trusted
// //         </label>

// //         <label>
// //           <input
// //             type="checkbox"
// //             name="isBlacklisted"
// //             checked={formData.isBlacklisted}
// //             onChange={handleChange}
// //           />{" "}
// //           Blacklisted
// //         </label>

// //         <button disabled={loading}>
// //           {loading ? "Saving..." : "Create Customer"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreateCustomer;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import { 
//   UserPlus, 
//   ArrowLeft, 
//   Upload, 
//   Shield, 
//   Ban,
//   User,
//   Phone,
//   Users,
//   FileText
// } from "lucide-react";

// const CreateCustomer = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     referenceName: "",
//     notes: "",
//     isTrusted: false,
//     isBlacklisted: false,
//   });

//   const [document, setDocument] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setDocument(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const data = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         data.append(key, value);
//       });

//       if (document) {
//         data.append("document", document);
//       }

//       await api.post("/customers", data);

//       setMessage({ 
//         type: "success", 
//         text: "✅ Customer created successfully!" 
//       });

//       setTimeout(() => {
//         navigate("/customers");
//       }, 1500);
//     } catch (err) {
//       setMessage({ 
//         type: "error", 
//         text: err.response?.data?.message || "❌ Failed to create customer" 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="animate-fade-in">
//       {/* Header */}
//       <div className="mb-8">
//         <button
//           onClick={() => navigate("/customers")}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           <span className="text-sm font-medium">Back to Customers</span>
//         </button>
        
//         <div className="flex items-center gap-3">
//           <div className="p-3 rounded-lg bg-primary-50">
//             <UserPlus className="h-6 w-6 text-primary-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Add New Customer</h1>
//             <p className="text-gray-600">Fill in customer details below</p>
//           </div>
//         </div>
//       </div>

//       {/* Form Card */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         {message.text && (
//           <div className={`mb-6 p-4 rounded-lg ${
//             message.type === "success" 
//               ? "bg-green-50 border border-green-200 text-green-700" 
//               : "bg-red-50 border border-red-200 text-red-700"
//           }`}>
//             <p className="font-medium">{message.text}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <User className="h-5 w-5 text-gray-500" />
//               Basic Information
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Name Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name *
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <input
//                     name="name"
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Mobile Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Mobile Number *
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <input
//                     name="mobile"
//                     placeholder="+91 9876543210"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Additional Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Users className="h-5 w-5 text-gray-500" />
//               Additional Information
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Reference Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Reference Name
//                 </label>
//                 <div className="relative">
//                   <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <input
//                     name="referenceName"
//                     placeholder="Optional reference"
//                     value={formData.referenceName}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Notes */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Notes
//                 </label>
//                 <div className="relative">
//                   <FileText className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
//                   <textarea
//                     name="notes"
//                     placeholder="Any additional notes about the customer..."
//                     value={formData.notes}
//                     onChange={handleChange}
//                     rows="3"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Document Upload */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Upload className="h-5 w-5 text-gray-500" />
//               Document Upload
//             </h3>
            
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
//               <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//               <p className="text-gray-600 mb-2">
//                 {document ? document.name : "Upload ID Proof, Photo, or Document"}
//               </p>
//               <p className="text-sm text-gray-500 mb-4">
//                 Supports JPG, PNG, PDF (Max 5MB)
//               </p>
//               <label className="cursor-pointer">
//                 <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium">
//                   <Upload className="h-4 w-4" />
//                   Choose File
//                 </span>
//                 <input
//                   type="file"
//                   accept=".jpg,.jpeg,.png,.pdf"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </label>
//             </div>
//           </div>

//           {/* Status Flags */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Flags</h3>
            
//             <div className="flex flex-wrap gap-6">
//               {/* Trusted Customer */}
//               <label className="flex items-center gap-3 cursor-pointer">
//                 <div className="relative">
//                   <input
//                     type="checkbox"
//                     name="isTrusted"
//                     checked={formData.isTrusted}
//                     onChange={handleChange}
//                     className="sr-only peer"
//                   />
//                   <div className="h-6 w-11 bg-gray-200 peer-checked:bg-green-500 rounded-full transition-colors"></div>
//                   <div className="absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Shield className="h-5 w-5 text-green-600" />
//                   <div>
//                     <p className="font-medium text-gray-900">Trusted Customer</p>
//                     <p className="text-sm text-gray-500">This customer is reliable</p>
//                   </div>
//                 </div>
//               </label>

//               {/* Blacklisted */}
//               <label className="flex items-center gap-3 cursor-pointer">
//                 <div className="relative">
//                   <input
//                     type="checkbox"
//                     name="isBlacklisted"
//                     checked={formData.isBlacklisted}
//                     onChange={handleChange}
//                     className="sr-only peer"
//                   />
//                   <div className="h-6 w-11 bg-gray-200 peer-checked:bg-red-500 rounded-full transition-colors"></div>
//                   <div className="absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Ban className="h-5 w-5 text-red-600" />
//                   <div>
//                     <p className="font-medium text-gray-900">Blacklisted</p>
//                     <p className="text-sm text-gray-500">Flag as problematic</p>
//                   </div>
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center justify-between pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={() => navigate("/customers")}
//               className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
//             >
//               Cancel
//             </button>
            
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <>
//                   <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Creating Customer...
//                 </>
//               ) : (
//                 <>
//                   <UserPlus className="h-5 w-5" />
//                   Create Customer
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateCustomer;



//create button visible 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { 
  UserPlus, 
  ArrowLeft, 
  Upload, 
  Shield, 
  Ban,
  User,
  Phone,
  Users,
  FileText
} from "lucide-react";

const CreateCustomer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    referenceName: "",
    notes: "",
    isTrusted: false,
    isBlacklisted: false,
  });

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (document) {
        data.append("document", document);
      }

      await api.post("/customers", data);

      setMessage({ 
        type: "success", 
        text: "✅ Customer created successfully!" 
      });

      setTimeout(() => {
        navigate("/customers");
      }, 1500);
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "❌ Failed to create customer" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/customers")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Customers</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-50">
              <UserPlus className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Customer</h1>
              <p className="text-gray-500">Fill in customer details below</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === "success" 
                ? "bg-green-50 border border-green-200 text-green-700" 
                : "bg-red-50 border border-red-200 text-red-700"
            }`}>
              <p className="font-medium">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
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

                {/* Mobile Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      name="mobile"
                      type="tel"
                      placeholder="Enter mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
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

            {/* Document Upload */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-gray-400" />
                Document Upload
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">
                  {document ? document.name : "Drag and drop or click to upload"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Supports JPG, PNG, PDF (Max 5MB)
                </p>
                <label className="cursor-pointer inline-block">
                  <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium">
                    Choose File
                  </span>
                  <input
                    type="file"
                    name="document"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Status Flags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Flags</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Trusted Customer */}
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    name="isTrusted"
                    checked={formData.isTrusted}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Trusted Customer</p>
                      <p className="text-sm text-gray-500">Mark as reliable customer</p>
                    </div>
                  </div>
                </label>

                {/* Blacklisted */}
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    name="isBlacklisted"
                    checked={formData.isBlacklisted}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                  <div className="flex items-center gap-2">
                    <Ban className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-gray-900">Blacklisted</p>
                      <p className="text-sm text-gray-500">Flag as problematic customer</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons - Clearly Visible */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/customers")}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5" />
                    Create Customer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;