
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../api/api";

// const CustomerView = () => {
//   const { id } = useParams();
//   const [customer, setCustomer] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCustomer = async () => {
//       try {
//         const res = await api.get(`/customers/${id}`);
//         console.log("CUSTOMER API RESPONSE:", res.data.customer);
//         setCustomer(res.data.customer);
//       } catch (err) {
//         console.error("Failed to fetch customer", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomer();
//   }, [id]);

//   const handleDownload = async () => {
//     try {
//       const response = await api.get(
//         `/customers/${id}/document`,
//         { responseType: "blob" }
//       );

//       const blob = new Blob([response.data]);
//       const url = window.URL.createObjectURL(blob);

//       const doc = customer.uploadedDocuments[0];

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = doc.originalName || "document";

//       document.body.appendChild(link);
//       link.click();

//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       alert("Failed to download document");
//       console.error(error);
//     }
//   };

//   if (loading) return <p>Loading customer...</p>;
//   if (!customer) return <p>Customer not found</p>;

//   const hasDocument =
//     customer.uploadedDocuments &&
//     customer.uploadedDocuments.length > 0;

//   return (
//     <div className="max-w-3xl bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Customer Details</h2>

//       <div className="space-y-2">
//         <p><strong>Name:</strong> {customer.name}</p>
//         <p><strong>Mobile:</strong> {customer.mobile}</p>
//         <p><strong>Reference:</strong> {customer.referenceName || "-"}</p>
//         <p>
//           <strong>Status:</strong>{" "}
//           {customer.isBlacklisted ? "Blocked" : "Active"}
//         </p>
//         <p><strong>Notes:</strong> {customer.notes || "-"}</p>
//       </div>

//       <hr className="my-4" />

//       <h3 className="font-semibold mb-2">Documents</h3>

//       {hasDocument ? (
//         <button
//           onClick={handleDownload}
//           className="text-blue-600 underline"
//         >
//           View / Download Document
//         </button>
//       ) : (
//         <p>No document uploaded</p>
//       )}
//     </div>
//   );
// };

// export default CustomerView;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const CustomerView = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.get(`/customers/${id}`);
        console.log("CUSTOMER API RESPONSE:", res.data.customer);
        setCustomer(res.data.customer);
      } catch (err) {
        console.error("Failed to fetch customer", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await api.get(
        `/customers/${id}/document`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const doc = customer.uploadedDocuments[0];

      const link = document.createElement("a");
      link.href = url;
      link.download = doc.originalName || "document";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to download document");
      console.error(error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (!customer) return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-6xl mb-4">👤</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Customer Not Found</h3>
      <p className="text-gray-500">The requested customer could not be found.</p>
    </div>
  );

  const hasDocument =
    customer.uploadedDocuments &&
    customer.uploadedDocuments.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Customer Details</h1>
          <p className="text-gray-600 mt-1">View and manage customer information</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Status Banner */}
          <div className={`px-6 py-3 ${customer.isBlacklisted ? 'bg-red-50 border-b border-red-100' : 'bg-green-50 border-b border-green-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${customer.isBlacklisted ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span className={`font-medium ${customer.isBlacklisted ? 'text-red-700' : 'text-green-700'}`}>
                  Status: {customer.isBlacklisted ? "Blocked" : "Active"}
                </span>
              </div>
              <span className="text-sm text-gray-500">ID: {id}</span>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="p-6">
            <div className="flex items-start mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4 shadow-md">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{customer.name}</h2>
                <p className="text-gray-600">Customer Profile</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information Card */}
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm border">
                      <span className="text-blue-600 font-bold">#</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mobile Number</p>
                      <p className="font-medium text-gray-800">{customer.mobile}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm border">
                      <span className="text-blue-600 font-bold">↗</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reference</p>
                      <p className="font-medium text-gray-800">
                        {customer.referenceName || <span className="text-gray-400">Not specified</span>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information Card */}
              <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm border">
                    <span className="text-purple-600 font-bold">📝</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="font-medium text-gray-800">
                      {customer.notes || <span className="text-gray-400">No notes available</span>}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 bg-white rounded p-3 border border-gray-200">
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Documents</h3>
                {hasDocument && (
                  <span className="text-sm text-gray-500">
                    {customer.uploadedDocuments.length} document(s) available
                  </span>
                )}
              </div>

              {hasDocument ? (
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4 shadow-md">
                        <span className="text-white text-xl font-bold">📄</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {customer.uploadedDocuments[0].originalName || "Document"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Click below to view or download</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => window.open(`/customers/${id}/document`, '_blank')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center transition duration-200 shadow-sm hover:shadow"
                      >
                        <span className="mr-2">👁️</span>
                        View
                      </button>
                      <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-lg font-medium flex items-center transition duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="mr-2">⬇️</span>
                        {downloading ? "Downloading..." : "Download"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <div className="text-gray-400 text-5xl mb-4">📄</div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">No Documents Uploaded</h4>
                  <p className="text-gray-500 max-w-md mx-auto">
                    This customer hasn't uploaded any documents yet. Documents will appear here once uploaded.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={() => window.history.back()}
                className="px-5 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Back to List
              </button>
              <button
                onClick={() => window.location.href = `/customers/${id}/edit`}
                className="ml-3 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition duration-200 shadow-sm hover:shadow"
              >
                Edit Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;
