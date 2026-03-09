// import { useEffect, useState } from "react";
// import api from "../../api/api";

// function Agreements() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await api.get("/bookings");
//         setBookings(res.data.bookings || []);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load agreements");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const downloadAgreement = async (bookingId) => {
//     try {
//       const res = await api.get(
//         `/bookings/${bookingId}/agreement`,
//         { responseType: "blob" }
//       );

//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "agreement.pdf");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to download agreement");
//     }
//   };

//   if (loading) return <p>Loading agreements...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       {/* Header */}
//       <div style={{ marginBottom: 20 }}>
//         <h2>Agreements</h2>
//       </div>

//       {/* Table */}
//       <table style={tableStyle}>
//         <thead>
//           <tr>
//             <th>Booking No</th>
//             <th>Customer</th>
//             <th>Item</th>
//             <th>Status</th>
//             <th>Agreement</th>
//           </tr>
//         </thead>

//         <tbody>
//           {bookings.map((b) => (
//             <tr key={b._id}>
//               <td>{b.bookingNumber}</td>
//               <td>{b.customer?.name || "—"}</td>
//               <td>{b.item?.name || "—"}</td>
//               <td>
//                 <span style={statusStyle(b.status)}>
//                   {b.status}
//                 </span>
//               </td>
//               <td>
//                 {b.status === "HANDED_OVER" || b.status === "RETURNED" ? (
//                   <button
//                     style={actionBtn}
//                     onClick={() => downloadAgreement(b._id)}
//                   >
//                     Download PDF
//                   </button>
//                 ) : (
//                   "—"
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// /* ---------------- Helpers ---------------- */

// const statusStyle = (status) => {
//   switch (status) {
//     case "ENQUIRY":
//       return { color: "orange", fontWeight: "bold" };
//     case "VERIFIED":
//       return { color: "blue", fontWeight: "bold" };
//     case "HANDED_OVER":
//       return { color: "purple", fontWeight: "bold" };
//     case "RETURNED":
//       return { color: "green", fontWeight: "bold" };
//     default:
//       return {};
//   }
// };

// /* ---------------- Styles ---------------- */

// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse"
// };

// const actionBtn = {
//   marginRight: "6px"
// };

// export default Agreements;



import { useEffect, useState } from "react";
import api from "../../api/api";
import { FileText, Download, Search, Filter, AlertCircle, Loader2 } from "lucide-react";

function Agreements() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings");
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load agreements");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const downloadAgreement = async (bookingId) => {
    try {
      const res = await api.get(
        `/bookings/${bookingId}/agreement`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `agreement-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Clean up URL object
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download agreement");
    }
  };

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.bookingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.item?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "ALL" || 
      b.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const canDownloadAgreement = (status) => {
    return status === "HANDED_OVER" || status === "RETURNED";
  };

  // Statistics
  const totalBookings = filteredBookings.length;
  const handedOverCount = filteredBookings.filter(b => b.status === "HANDED_OVER").length;
  const returnedCount = filteredBookings.filter(b => b.status === "RETURNED").length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FileText className="h-8 w-8 text-purple-600" />
                Agreements
              </h1>
              <p className="text-gray-600 mt-1">Manage and download customer agreements</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by booking, customer, or item..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select 
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white min-w-[180px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Status</option>
                <option value="ENQUIRY">Enquiry</option>
                <option value="VERIFIED">Verified</option>
                <option value="HANDED_OVER">Handed Over</option>
                <option value="RETURNED">Returned</option>
              </select>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{totalBookings}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Handed Over</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{handedOverCount}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="h-6 w-6 text-purple-600">📦</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Returned</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{returnedCount}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="h-6 w-6 text-green-600">✅</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Agreements Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              </div>
              <p className="mt-3 text-gray-600">Loading agreements...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No agreements found</p>
              {searchTerm && (
                <p className="text-gray-500 text-sm mt-1">Try adjusting your search criteria</p>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Booking No</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Customer</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Item</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Agreement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBookings.map((b) => (
                      <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-mono font-semibold text-gray-800">{b.bookingNumber}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <span className="text-gray-700 font-medium">{b.customer?.name || "—"}</span>
                            {b.customer?.phone && (
                              <p className="text-sm text-gray-500 mt-1">{b.customer.phone}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <span className="text-gray-700">{b.item?.name || "—"}</span>
                            {b.item?.category && (
                              <p className="text-xs text-gray-500 mt-1">{b.item.category}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getStatusClasses(b.status)}`}>
                            {getStatusIcon(b.status)}
                            {getStatusLabel(b.status)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          {canDownloadAgreement(b.status) ? (
                            <button
                              onClick={() => downloadAgreement(b._id)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                            >
                              <Download className="h-4 w-4" />
                              Download PDF
                            </button>
                          ) : (
                            <div className="flex flex-col">
                              <span className="text-gray-400 text-sm">Not available</span>
                              <span className="text-gray-500 text-xs mt-1">
                                Available when {b.status === "ENQUIRY" || b.status === "VERIFIED" ? "handed over" : ""}
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Footer Summary */}
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredBookings.length}</span> of{" "}
                    <span className="font-semibold">{bookings.length}</span> bookings
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-100 border border-purple-300"></span>
                      <span className="text-gray-600">Downloadable: <span className="font-semibold">{handedOverCount + returnedCount}</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper functions
const getStatusClasses = (status) => {
  switch (status) {
    case "ENQUIRY":
      return "bg-orange-50 text-orange-700 border border-orange-200";
    case "VERIFIED":
      return "bg-blue-50 text-blue-700 border border-blue-200";
    case "HANDED_OVER":
      return "bg-purple-50 text-purple-700 border border-purple-200";
    case "RETURNED":
      return "bg-green-50 text-green-700 border border-green-200";
    default:
      return "bg-gray-50 text-gray-700 border border-gray-200";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "ENQUIRY":
      return <span className="mr-1.5">❓</span>;
    case "VERIFIED":
      return <span className="mr-1.5">🔍</span>;
    case "HANDED_OVER":
      return <span className="mr-1.5">📦</span>;
    case "RETURNED":
      return <span className="mr-1.5">✅</span>;
    default:
      return <span className="mr-1.5">📄</span>;
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "ENQUIRY":
      return "Enquiry";
    case "VERIFIED":
      return "Verified";
    case "HANDED_OVER":
      return "Handed Over";
    case "RETURNED":
      return "Returned";
    default:
      return status;
  }
};

export default Agreements;