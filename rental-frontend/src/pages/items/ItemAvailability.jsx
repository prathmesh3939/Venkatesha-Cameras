// import { useState } from "react";
// import api from "../../api/api";

// const ItemAvailability = () => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchAvailability = async () => {
//     if (!startDate || !endDate) {
//       alert("Select both dates");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await api.get("/items/availability", {
//         params: { startDate, endDate }
//       });
//       setItems(res.data.availability);
//     } catch (error) {
//       alert("Failed to fetch availability");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Item Availability</h2>

//       <div style={{ marginBottom: 15 }}>
//         <input type="date" onChange={e => setStartDate(e.target.value)} />
//         <input type="date" onChange={e => setEndDate(e.target.value)} />
//         <button onClick={fetchAvailability}>
//           {loading ? "Checking..." : "Check Availability"}
//         </button>
//       </div>

//       <table border="1" width="100%">
//         <thead>
//           <tr>
//             <th>Item</th>
//             <th>Total Qty</th>
//             <th>Booked</th>
//             <th>Available</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map(item => (
//             <tr key={item.itemId}>
//               <td>{item.name}</td>
//               <td>{item.totalQuantity}</td>
//               <td>{item.bookedQuantity}</td>
//               <td
//                 style={{
//                   color: item.availableQuantity > 0 ? "green" : "red",
//                   fontWeight: "bold"
//                 }}
//               >
//                 {item.availableQuantity}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ItemAvailability;


import { useState, useEffect } from "react";
import api from "../../api/api";
import { 
  Package, 
  Calendar, 
  Search, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Loader,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter
} from "lucide-react";

const ItemAvailability = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Set today's date as default on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
    setEndDate(today);
  }, []);

  const fetchAvailability = async () => {
    if (!startDate || !endDate) {
      alert("Please select both dates");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date");
      return;
    }

    setLoading(true);
    setAnimateItems(false);
    
    try {
      const res = await api.get("/items/availability", {
        params: { startDate, endDate }
      });
      setItems(res.data.availability);
      setTimeout(() => setAnimateItems(true), 100);
    } catch (error) {
      alert("Failed to fetch availability");
    } finally {
      setLoading(false);
    }
  };

  // Filter items based on search
  const filteredItems = items.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary stats
  const stats = {
    totalItems: items.length,
    availableItems: items.filter(i => i.availableQuantity > 0).length,
    outOfStock: items.filter(i => i.availableQuantity === 0).length,
    totalBooked: items.reduce((sum, i) => sum + i.bookedQuantity, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg animate-float">
                <Package className="h-6 w-6 text-white" />
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500"></span>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Item Availability</h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  Check equipment availability for specific dates
                </p>
              </div>
            </div>
            
            {/* Last updated indicator */}
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-200 self-start">
              <Clock className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
            {[
              { label: 'Total Items', value: stats.totalItems, icon: Package, color: 'blue', bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
              { label: 'Available', value: stats.availableItems, icon: CheckCircle, color: 'green', bg: 'bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
              { label: 'Out of Stock', value: stats.outOfStock, icon: XCircle, color: 'red', bg: 'bg-red-50', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
              { label: 'Total Booked', value: stats.totalBooked, icon: Calendar, color: 'purple', bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' }
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

        {/* Date Selection Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 mb-6 animate-slideInUp" style={{ animationDelay: '400ms' }}>
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Select Date Range
          </h3>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 w-full lg:w-auto">
              <button
                onClick={fetchAvailability}
                disabled={loading}
                className="flex-1 lg:flex-none px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Check Availability
                  </>
                )}
              </button>
              <button
                onClick={fetchAvailability}
                disabled={loading}
                className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 hover:scale-110"
                title="Refresh"
              >
                <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Quick date presets */}
          <div className="flex flex-wrap gap-2 mt-4">
            {['Today', 'Tomorrow', 'This Weekend', 'Next Week'].map((preset, idx) => (
              <button
                key={preset}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        {items.length > 0 && (
          <div className="mb-6 animate-slideInUp" style={{ animationDelay: '500ms' }}>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                placeholder="Search items by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
        )}

        {/* Availability Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-slideInUp" style={{ animationDelay: '600ms' }}>
          {/* Table Header */}
          <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-purple-600" />
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Availability Results</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {filteredItems.length} items found • {stats.availableItems} available
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <Loader className="h-16 w-16 text-purple-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="text-gray-600 mt-4 animate-pulse">Checking availability...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 animate-fadeIn">
              <div className="relative inline-block">
                <Package className="h-20 w-20 text-gray-200 mx-auto" />
                <AlertCircle className="h-6 w-6 text-yellow-400 absolute -top-1 -right-1" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mt-4">No Items to Check</h4>
              <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                Select dates and click "Check Availability" to see item availability
              </p>
            </div>
          ) : (
            <>
              {/* Mobile View - Cards */}
              <div className="md:hidden p-4 space-y-3">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No items match your search</p>
                  </div>
                ) : (
                  filteredItems.map((item, index) => (
                    <AvailabilityCard 
                      key={item.itemId} 
                      item={item} 
                      index={index}
                      animateItems={animateItems}
                    />
                  ))
                )}
              </div>

              {/* Desktop View - Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Item Details</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Total Qty</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Booked</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Available</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <p className="text-gray-500">No items match your search</p>
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item, index) => (
                        <AvailabilityRow 
                          key={item.itemId} 
                          item={item} 
                          index={index}
                          animateItems={animateItems}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Showing {filteredItems.length} of {items.length} items
                </p>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-3 py-1 bg-purple-600 text-white rounded-lg text-xs">1</span>
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

/* =========================
   AVAILABILITY CARD (Mobile)
========================= */
const AvailabilityCard = ({ item, index, animateItems }) => {
  const isAvailable = item.availableQuantity > 0;

  return (
    <div 
      className={`
        bg-white rounded-xl border border-gray-200 p-4 shadow-sm
        hover:shadow-md transition-all duration-300 transform hover:-translate-y-1
        ${animateItems ? 'animate-slideInUp' : 'opacity-0'}
      `}
      style={{ animationDelay: `${700 + index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 text-base">{item.name}</h4>
          <p className="text-sm text-gray-500 mt-0.5">Category: {item.category || 'General'}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
          isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isAvailable ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 mr-1" />
          )}
          {isAvailable ? 'Available' : 'Out of Stock'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Total</p>
          <p className="text-xl font-bold text-gray-900">{item.totalQuantity}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Booked</p>
          <p className="text-xl font-bold text-orange-600">{item.bookedQuantity}</p>
        </div>
        <div className={`rounded-lg p-3 text-center ${
          isAvailable ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <p className="text-xs text-gray-500 mb-1">Available</p>
          <p className={`text-xl font-bold ${
            isAvailable ? 'text-green-600' : 'text-red-600'
          }`}>
            {item.availableQuantity}
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================
   AVAILABILITY ROW (Desktop)
========================= */
const AvailabilityRow = ({ item, index, animateItems }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isAvailable = item.availableQuantity > 0;
  const availabilityPercentage = (item.availableQuantity / item.totalQuantity) * 100;

  return (
    <tr 
      className={`
        hover:bg-purple-50/30 transition-all duration-300
        ${animateItems ? 'animate-fadeIn' : 'opacity-0'}
      `}
      style={{ animationDelay: `${700 + index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className={`
            h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 
            flex items-center justify-center text-white font-bold text-sm mr-3
            transition-all duration-300
            ${isHovered ? 'scale-110 rotate-3 shadow-lg' : ''}
          `}>
            {item.name?.charAt(0) || 'I'}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-base">{item.name}</p>
            <p className="text-sm text-gray-500">{item.category || 'General'}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="inline-flex items-center justify-center h-8 w-8 bg-gray-100 text-gray-700 rounded-lg font-bold">
          {item.totalQuantity}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="inline-flex items-center justify-center h-8 w-8 bg-orange-100 text-orange-700 rounded-lg font-bold">
          {item.bookedQuantity}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-lg font-bold ${
          isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {item.availableQuantity}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
            isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isAvailable ? (
              <CheckCircle className="h-3.5 w-3.5" />
            ) : (
              <XCircle className="h-3.5 w-3.5" />
            )}
            {isAvailable ? 'Available' : 'Out of Stock'}
          </span>
          
          {/* Availability progress bar */}
          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'} transition-all duration-500`}
              style={{ width: `${availabilityPercentage}%` }}
            ></div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ItemAvailability;