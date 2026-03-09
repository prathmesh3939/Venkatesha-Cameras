
// //deepseek
// // pages/dashboard/Dashboard.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import { useAuth } from "../../context/AuthContext";
// import { 
//   Users, Camera, Calendar, Package, 
//   Plus, FileText, ArrowRight, 
//   TrendingUp, TrendingDown 
// } from "lucide-react";

// function Dashboard() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     customers: 0,
//     items: 0,
//     activeBookings: 0,
//     pendingReturns: 0
//   });

//   const [recentBookings, setRecentBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* =========================
//      LOAD DASHBOARD DATA
//   ========================= */
//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {
//       setLoading(true);
//       const [customersRes, itemsRes, bookingsRes] = await Promise.all([
//         api.get("/customers"),
//         api.get("/items"),
//         api.get("/bookings")
//       ]);

//       const bookings = bookingsRes.data.bookings || [];

//       setStats({
//         customers: customersRes.data.count ?? customersRes.data.customers?.length ?? 0,
//         items: itemsRes.data.count ?? itemsRes.data.items?.length ?? 0,
//         activeBookings: bookings.filter(b =>
//           ["ENQUIRY", "VERIFIED", "HANDED_OVER"].includes(b.status)
//         ).length,
//         pendingReturns: bookings.filter(b => b.status === "HANDED_OVER").length
//       });

//       setRecentBookings(bookings.slice(0, 5));
//     } catch (err) {
//       console.error("Dashboard load failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mock changes (you can remove or replace with real data)
//   const changes = {
//     customers: '+12%',
//     items: '+5%',
//     activeBookings: '+8%',
//     pendingReturns: '-2%'
//   };

//   return (
//     <div className="animate-fade-in">
//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-gray-600 mt-1">
//           Welcome back, <span className="font-semibold text-primary-700">{user?.name}</span>
//         </p>
//       </div>

//       {/* STATS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard
//           title="Total Customers"
//           value={stats.customers}
//           change={changes.customers}
//           icon={Users}
//           color="primary"
//           loading={loading}
//           onClick={() => navigate("/customers")}
//         />
//         <StatCard
//           title="Total Items"
//           value={stats.items}
//           change={changes.items}
//           icon={Camera}
//           color="success"
//           loading={loading}
//           onClick={() => navigate("/items")}
//         />
//         <StatCard
//           title="Active Bookings"
//           value={stats.activeBookings}
//           change={changes.activeBookings}
//           icon={Calendar}
//           color="warning"
//           loading={loading}
//           onClick={() => navigate("/bookings")}
//         />
//         <StatCard
//           title="Pending Returns"
//           value={stats.pendingReturns}
//           change={changes.pendingReturns}
//           icon={Package}
//           color="danger"
//           loading={loading}
//           onClick={() => navigate("/bookings")}
//         />
//       </div>

//       {/* LOWER SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* RECENT BOOKINGS */}
//         <div className="lg:col-span-2">
//           <div className="card card-hover">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
//                 <p className="text-gray-600 text-sm">Latest rental activities</p>
//               </div>
//               <button 
//                 onClick={() => navigate("/bookings")}
//                 className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
//               >
//                 View all
//                 <ArrowRight className="h-4 w-4 ml-1" />
//               </button>
//             </div>

//             {loading ? (
//               <div className="space-y-4">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="animate-pulse flex items-center justify-between">
//                     <div>
//                       <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
//                       <div className="h-3 bg-gray-200 rounded w-24"></div>
//                     </div>
//                     <div className="h-6 bg-gray-200 rounded w-20"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : recentBookings.length === 0 ? (
//               <div className="text-center py-8">
//                 <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500">No recent bookings</p>
//                 <p className="text-gray-400 text-sm mt-1">New bookings will appear here</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {recentBookings.map((booking) => (
//                   <div 
//                     key={booking._id} 
//                     className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center mr-3">
//                         <Users className="h-5 w-5 text-primary-600" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {booking.customer?.name || "Unknown Customer"}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {booking.item?.name || "Camera Equipment"}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
//                         {booking.status}
//                       </span>
//                       <p className="text-xs text-gray-400 mt-1">
//                         ID: {booking._id?.substring(0, 8) || 'N/A'}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* QUICK ACTIONS */}
//         <div>
//           <div className="card card-hover">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//             <div className="space-y-3">
//               <ActionButton
//                 icon={<Users className="h-4 w-4" />}
//                 label="Add Customer"
//                 color="primary"
//                 onClick={() => navigate("/customers/create")}
//               />
//               <ActionButton
//                 icon={<Camera className="h-4 w-4" />}
//                 label="Add Equipment"
//                 color="success"
//                 onClick={() => navigate("/items/create")}
//               />
//               <ActionButton
//                 icon={<Plus className="h-4 w-4" />}
//                 label="Create Booking"
//                 color="warning"
//                 onClick={() => navigate("/bookings")}
//               />
//               <ActionButton
//                 icon={<FileText className="h-4 w-4" />}
//                 label="View Agreements"
//                 color="danger"
//                 onClick={() => navigate("/agreements")}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    STAT CARD COMPONENT
// ========================= */
// function StatCard({ title, value, change, icon: Icon, color, loading, onClick }) {
//   const isPositive = change && change.startsWith('+');
  
//   const colorConfig = {
//     primary: {
//       bg: 'bg-primary-50',
//       iconBg: 'bg-primary-100',
//       iconColor: 'text-primary-600',
//     },
//     success: {
//       bg: 'bg-success-50',
//       iconBg: 'bg-success-100',
//       iconColor: 'text-success-600',
//     },
//     warning: {
//       bg: 'bg-warning-50',
//       iconBg: 'bg-warning-100',
//       iconColor: 'text-warning-600',
//     },
//     danger: {
//       bg: 'bg-danger-50',
//       iconBg: 'bg-danger-100',
//       iconColor: 'text-danger-600',
//     },
//   };

//   const config = colorConfig[color];

//   if (loading) {
//     return (
//       <div className="card animate-pulse">
//         <div className="flex items-center justify-between">
//           <div className="space-y-3">
//             <div className="h-4 bg-gray-200 rounded w-24"></div>
//             <div className="h-8 bg-gray-200 rounded w-16"></div>
//             <div className="h-3 bg-gray-200 rounded w-32"></div>
//           </div>
//           <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       onClick={onClick}
//       className={`card card-hover cursor-pointer ${config.bg}`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          
//           {change ? (
//             <div className="flex items-center mt-2">
//               {isPositive ? (
//                 <TrendingUp className="h-4 w-4 text-success-500 mr-1" />
//               ) : (
//                 <TrendingDown className="h-4 w-4 text-danger-500 mr-1" />
//               )}
//               <span className={`text-sm font-medium ${isPositive ? 'text-success-600' : 'text-danger-600'}`}>
//                 {change}
//               </span>
//             </div>
//           ) : (
//             <div className="text-gray-400 text-sm mt-2">—</div>
//           )}
//         </div>
        
//         <div className={`p-3 rounded-lg ${config.iconBg}`}>
//           <Icon className={`h-6 w-6 ${config.iconColor}`} />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    ACTION BUTTON COMPONENT
// ========================= */
// function ActionButton({ icon, label, color, onClick }) {
//   const colorClasses = {
//     primary: 'border-primary-200 hover:bg-primary-50 hover:border-primary-300 text-primary-700',
//     success: 'border-success-200 hover:bg-success-50 hover:border-success-300 text-success-700',
//     warning: 'border-warning-200 hover:bg-warning-50 hover:border-warning-300 text-warning-700',
//     danger: 'border-danger-200 hover:bg-danger-50 hover:border-danger-300 text-danger-700',
//   };

//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 ${colorClasses[color]}`}
//     >
//       <div className="p-1.5 rounded-md bg-white">
//         {icon}
//       </div>
//       <span className="font-medium text-left flex-1">{label}</span>
//       <ArrowRight className="h-4 w-4 opacity-60" />
//     </button>
//   );
// }

// /* =========================
//    STATUS BADGE HELPER
// ========================= */
// const getStatusBadgeClass = (status) => {
//   switch (status) {
//     case "ENQUIRY":
//       return "bg-gray-100 text-gray-700";
//     case "VERIFIED":
//       return "bg-blue-100 text-blue-700";
//     case "HANDED_OVER":
//       return "bg-warning-100 text-warning-700";
//     case "RETURNED":
//       return "bg-success-100 text-success-700";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// };

// export default Dashboard;






// pages/dashboard/Dashboard.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import { useAuth } from "../../context/AuthContext";
// import { 
//   Users, Camera, Calendar, Package, 
//   Plus, FileText, ArrowRight, 
//   TrendingUp, TrendingDown 
// } from "lucide-react";

// function Dashboard() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     customers: 0,
//     items: 0,
//     activeBookings: 0,
//     pendingReturns: 0
//   });

//   const [recentBookings, setRecentBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* =========================
//      LOAD DASHBOARD DATA
//   ========================= */
//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {
//       setLoading(true);
//       const [customersRes, itemsRes, bookingsRes] = await Promise.all([
//         api.get("/customers"),
//         api.get("/items"),
//         api.get("/bookings")
//       ]);

//       const bookings = bookingsRes.data.bookings || [];

//       setStats({
//         customers: customersRes.data.count ?? customersRes.data.customers?.length ?? 0,
//         items: itemsRes.data.count ?? itemsRes.data.items?.length ?? 0,
//         activeBookings: bookings.filter(b =>
//           ["ENQUIRY", "VERIFIED", "HANDED_OVER"].includes(b.status)
//         ).length,
//         pendingReturns: bookings.filter(b => b.status === "HANDED_OVER").length
//       });

//       setRecentBookings(bookings.slice(0, 5));
//     } catch (err) {
//       console.error("Dashboard load failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mock changes
//   const changes = {
//     customers: '+12%',
//     items: '+5%',
//     activeBookings: '+8%',
//     pendingReturns: '-2%'
//   };

//   return (
//     <div className="animate-fade-in">
//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-gray-600 mt-1">
//           Welcome back, <span className="font-semibold text-blue-600">{user?.name}</span>
//         </p>
//       </div>

//       {/* STATS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard
//           title="Total Customers"
//           value={stats.customers}
//           change={changes.customers}
//           icon={Users}
//           color="primary"
//           loading={loading}
//           onClick={() => navigate("/customers")}
//         />
//         <StatCard
//           title="Total Items"
//           value={stats.items}
//           change={changes.items}
//           icon={Camera}
//           color="success"
//           loading={loading}
//           onClick={() => navigate("/items")}
//         />
//         <StatCard
//           title="Active Bookings"
//           value={stats.activeBookings}
//           change={changes.activeBookings}
//           icon={Calendar}
//           color="warning"
//           loading={loading}
//           onClick={() => navigate("/bookings")}
//         />
//         <StatCard
//           title="Pending Returns"
//           value={stats.pendingReturns}
//           change={changes.pendingReturns}
//           icon={Package}
//           color="danger"
//           loading={loading}
//           onClick={() => navigate("/bookings")}
//         />
//       </div>

//       {/* LOWER SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* RECENT BOOKINGS */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
//                 <p className="text-gray-600 text-sm">Latest rental activities</p>
//               </div>
//               <button 
//                 onClick={() => navigate("/bookings")}
//                 className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
//               >
//                 View all
//                 <ArrowRight className="h-4 w-4 ml-1" />
//               </button>
//             </div>

//             {loading ? (
//               <div className="space-y-4">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="animate-pulse flex items-center justify-between">
//                     <div>
//                       <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
//                       <div className="h-3 bg-gray-200 rounded w-24"></div>
//                     </div>
//                     <div className="h-6 bg-gray-200 rounded w-20"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : recentBookings.length === 0 ? (
//               <div className="text-center py-8">
//                 <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500">No recent bookings</p>
//                 <p className="text-gray-400 text-sm mt-1">New bookings will appear here</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {recentBookings.map((booking) => (
//                   <div 
//                     key={booking._id} 
//                     className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
//                         <Users className="h-5 w-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {booking.customer?.name || "Unknown Customer"}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {booking.item?.name || "Camera Equipment"}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
//                         {booking.status}
//                       </span>
//                       <p className="text-xs text-gray-400 mt-1">
//                         ID: {booking._id?.substring(0, 8) || 'N/A'}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* QUICK ACTIONS */}
//         <div>
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//             <div className="space-y-3">
//               <ActionButton
//                 icon={<Users className="h-4 w-4" />}
//                 label="Add Customer"
//                 color="primary"
//                 onClick={() => navigate("/customers/create")}
//               />
//               <ActionButton
//                 icon={<Camera className="h-4 w-4" />}
//                 label="Add Equipment"
//                 color="success"
//                 onClick={() => navigate("/items/create")}
//               />
//               <ActionButton
//                 icon={<Plus className="h-4 w-4" />}
//                 label="Create Booking"
//                 color="warning"
//                 onClick={() => navigate("/bookings")}
//               />
//               <ActionButton
//                 icon={<FileText className="h-4 w-4" />}
//                 label="View Agreements"
//                 color="danger"
//                 onClick={() => navigate("/agreements")}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    STAT CARD COMPONENT - FIXED
// ========================= */
// function StatCard({ title, value, change, icon: Icon, color, loading, onClick }) {
//   const isPositive = change && change.startsWith('+');
  
//   const colorConfig = {
//     primary: {
//       bg: 'bg-blue-50',
//       border: 'border-blue-200',
//       iconBg: 'bg-blue-100',
//       iconColor: 'text-blue-600',
//     },
//     success: {
//       bg: 'bg-green-50',
//       border: 'border-green-200',
//       iconBg: 'bg-green-100',
//       iconColor: 'text-green-600',
//     },
//     warning: {
//       bg: 'bg-yellow-50',
//       border: 'border-yellow-200',
//       iconBg: 'bg-yellow-100',
//       iconColor: 'text-yellow-600',
//     },
//     danger: {
//       bg: 'bg-red-50',
//       border: 'border-red-200',
//       iconBg: 'bg-red-100',
//       iconColor: 'text-red-600',
//     },
//   };

//   const config = colorConfig[color] || colorConfig.primary;

//   if (loading) {
//     return (
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
//         <div className="flex items-center justify-between">
//           <div className="space-y-3">
//             <div className="h-4 bg-gray-200 rounded w-24"></div>
//             <div className="h-8 bg-gray-200 rounded w-16"></div>
//             <div className="h-3 bg-gray-200 rounded w-32"></div>
//           </div>
//           <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       onClick={onClick}
//       className={`bg-white rounded-xl shadow-sm border ${config.border} p-6 hover:shadow-md transition-all duration-200 cursor-pointer ${config.bg}`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          
//           {change ? (
//             <div className="flex items-center mt-2">
//               {isPositive ? (
//                 <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//               ) : (
//                 <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
//               )}
//               <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
//                 {change}
//               </span>
//               <span className="text-gray-500 text-sm ml-1">from last month</span>
//             </div>
//           ) : (
//             <div className="text-gray-400 text-sm mt-2">—</div>
//           )}
//         </div>
        
//         <div className={`p-3 rounded-lg ${config.iconBg}`}>
//           <Icon className={`h-6 w-6 ${config.iconColor}`} />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    ACTION BUTTON COMPONENT - FIXED
// ========================= */
// function ActionButton({ icon, label, color, onClick }) {
//   const colorClasses = {
//     primary: 'border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700',
//     success: 'border-green-200 hover:bg-green-50 hover:border-green-300 text-green-700',
//     warning: 'border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300 text-yellow-700',
//     danger: 'border-red-200 hover:bg-red-50 hover:border-red-300 text-red-700',
//   };

//   const config = colorClasses[color] || colorClasses.primary;

//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 ${config}`}
//     >
//       <div className="p-1.5 rounded-md bg-white">
//         {icon}
//       </div>
//       <span className="font-medium text-left flex-1">{label}</span>
//       <ArrowRight className="h-4 w-4 opacity-60" />
//     </button>
//   );
// }

// /* =========================
//    STATUS BADGE HELPER
// ========================= */
// const getStatusBadgeClass = (status) => {
//   switch (status) {
//     case "ENQUIRY":
//       return "bg-gray-100 text-gray-700";
//     case "VERIFIED":
//       return "bg-blue-100 text-blue-700";
//     case "HANDED_OVER":
//       return "bg-yellow-100 text-yellow-700";
//     case "RETURNED":
//       return "bg-green-100 text-green-700";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// };

// export default Dashboard;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { 
  Users, Camera, Calendar, Package, 
  Plus, FileText, ArrowRight, 
  TrendingUp, TrendingDown, Clock,
  ChevronRight, Sparkles
} from "lucide-react";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    customers: 0,
    items: 0,
    activeBookings: 0,
    pendingReturns: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animateItems, setAnimateItems] = useState(false);

  /* =========================
     LOAD DASHBOARD DATA
  ========================= */
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [customersRes, itemsRes, bookingsRes] = await Promise.all([
        api.get("/customers"),
        api.get("/items"),
        api.get("/bookings")
      ]);

      const bookings = bookingsRes.data.bookings || [];

      setStats({
        customers: customersRes.data.count ?? customersRes.data.customers?.length ?? 0,
        items: itemsRes.data.count ?? itemsRes.data.items?.length ?? 0,
        activeBookings: bookings.filter(b =>
          ["ENQUIRY", "VERIFIED", "HANDED_OVER"].includes(b.status)
        ).length,
        pendingReturns: bookings.filter(b => b.status === "HANDED_OVER").length
      });

      setRecentBookings(bookings.slice(0, 5));
      
      // Trigger animations after data loads
      setTimeout(() => setAnimateItems(true), 100);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Mock changes
  const changes = {
    customers: '+12%',
    items: '+5%',
    activeBookings: '+8%',
    pendingReturns: '-2%'
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* HEADER WITH ANIMATION */}
        <div className="mb-6 sm:mb-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
                <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-full animate-pulse-slow">
                  {getGreeting()}
                </div>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Welcome back, <span className="font-semibold text-blue-600">{user?.name}</span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="text-gray-500">{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </p>
            </div>
            
            {/* Quick action button */}
            <button
              onClick={() => navigate("/bookings")}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>New Booking</span>
            </button>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
          <StatCard
            title="Total Customers"
            value={stats.customers}
            change={changes.customers}
            icon={Users}
            color="primary"
            loading={loading}
            onClick={() => navigate("/customers")}
            delay={0}
            animateItems={animateItems}
          />
          <StatCard
            title="Total Items"
            value={stats.items}
            change={changes.items}
            icon={Camera}
            color="success"
            loading={loading}
            onClick={() => navigate("/items")}
            delay={100}
            animateItems={animateItems}
          />
          <StatCard
            title="Active Bookings"
            value={stats.activeBookings}
            change={changes.activeBookings}
            icon={Calendar}
            color="warning"
            loading={loading}
            onClick={() => navigate("/bookings")}
            delay={200}
            animateItems={animateItems}
          />
          <StatCard
            title="Pending Returns"
            value={stats.pendingReturns}
            change={changes.pendingReturns}
            icon={Package}
            color="danger"
            loading={loading}
            onClick={() => navigate("/bookings")}
            delay={300}
            animateItems={animateItems}
          />
        </div>

        {/* LOWER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* RECENT BOOKINGS */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden animate-slideInUp" style={{ animationDelay: '400ms' }}>
              <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Bookings</h3>
                      <p className="text-gray-500 text-xs sm:text-sm">Latest rental activities</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate("/bookings")}
                    className="group text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    View all
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                          <div>
                            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                          </div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                      </div>
                    ))}
                  </div>
                ) : recentBookings.length === 0 ? (
                  <div className="text-center py-8 animate-fadeIn">
                    <div className="relative inline-block">
                      <Calendar className="h-16 w-16 text-gray-200 mx-auto" />
                      <Sparkles className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                    <p className="text-gray-600 font-medium mt-4">No recent bookings</p>
                    <p className="text-gray-400 text-sm mt-1">New bookings will appear here</p>
                    <button
                      onClick={() => navigate("/bookings")}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                    >
                      Create First Booking
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentBookings.map((booking, index) => (
                      <div 
                        key={booking._id} 
                        className="group flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md animate-slideInUp"
                        style={{ animationDelay: `${500 + index * 100}ms` }}
                        onClick={() => navigate(`/bookings/${booking._id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                              #{booking.bookingNumber?.slice(-4) || "000"}
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-base">
                              {booking.customer?.name || "Unknown Customer"}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Camera className="h-3.5 w-3.5 text-gray-400" />
                              <p className="text-sm text-gray-600">
                                {booking.item?.name || "Camera Equipment"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1.5">{formatStatus(booking.status)}</span>
                          </span>
                          <p className="text-xs text-gray-400 mt-2">
                            ID: {booking._id?.substring(0, 8) || 'N/A'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer with view all link */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => navigate("/bookings")}
                  className="w-full text-sm text-gray-600 hover:text-blue-600 font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  View all bookings
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden animate-slideInUp" style={{ animationDelay: '500ms' }}>
              <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Quick Actions</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">Frequently used tasks</p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-3">
                  <ActionButton
                    icon={<Users className="h-4 w-4" />}
                    label="Add New Customer"
                    description="Create customer profile"
                    color="primary"
                    onClick={() => navigate("/customers/create")}
                    delay={600}
                  />
                  <ActionButton
                    icon={<Camera className="h-4 w-4" />}
                    label="Add Equipment"
                    description="Register new camera gear"
                    color="success"
                    onClick={() => navigate("/items/create")}
                    delay={700}
                  />
                  <ActionButton
                    icon={<Calendar className="h-4 w-4" />}
                    label="Create Booking"
                    description="New rental agreement"
                    color="warning"
                    onClick={() => navigate("/bookings")}
                    delay={800}
                  />
                  <ActionButton
                    icon={<FileText className="h-4 w-4" />}
                    label="View Agreements"
                    description="Manage rental contracts"
                    color="danger"
                    onClick={() => navigate("/agreements")}
                    delay={900}
                  />
                </div>
              </div>

              {/* Today's summary */}
              <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Today's summary</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">
                    {stats.activeBookings} active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* =========================
   STAT CARD COMPONENT - WITH ANIMATIONS
========================= */
function StatCard({ title, value, change, icon: Icon, color, loading, onClick, delay, animateItems }) {
  const isPositive = change && change.startsWith('+');
  const [isHovered, setIsHovered] = useState(false);
  
  const colorConfig = {
    primary: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      hoverBg: 'hover:bg-blue-100',
      gradient: 'from-blue-600 to-indigo-600'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      hoverBg: 'hover:bg-green-100',
      gradient: 'from-green-600 to-emerald-600'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      hoverBg: 'hover:bg-yellow-100',
      gradient: 'from-yellow-600 to-orange-600'
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      hoverBg: 'hover:bg-red-100',
      gradient: 'from-red-600 to-pink-600'
    },
  };

  const config = colorConfig[color] || colorConfig.primary;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative bg-white rounded-xl shadow-sm border ${config.border} p-5 
        transition-all duration-300 cursor-pointer overflow-hidden group
        transform hover:-translate-y-1 hover:shadow-xl
        ${animateItems ? 'animate-slideInUp' : 'opacity-0'}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background gradient on hover */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 
        group-hover:opacity-5 transition-opacity duration-500
      `}></div>

      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 group-hover:scale-105 transition-transform duration-300 origin-left">
            {value}
          </p>
          
          {change ? (
            <div className="flex items-center mt-2">
              <div className={`
                transform transition-all duration-300
                ${isHovered ? 'scale-110' : ''}
              `}>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
              </div>
              <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'} group-hover:scale-105 transition-transform`}>
                {change}
              </span>
              <span className="text-gray-500 text-xs ml-1 group-hover:translate-x-1 transition-transform">
                vs last month
              </span>
            </div>
          ) : (
            <div className="text-gray-400 text-sm mt-2">—</div>
          )}
        </div>
        
        <div className={`
          relative p-3 rounded-lg ${config.iconBg} 
          transform transition-all duration-300
          group-hover:scale-110 group-hover:rotate-3
        `}>
          <Icon className={`h-6 w-6 ${config.iconColor}`} />
          
          {/* Floating dots animation */}
          <div className="absolute -top-1 -right-1 flex space-x-0.5">
            <span className={`w-1.5 h-1.5 rounded-full bg-${color}-400 animate-bounce`} style={{ animationDelay: '0s' }}></span>
            <span className={`w-1.5 h-1.5 rounded-full bg-${color}-500 animate-bounce`} style={{ animationDelay: '0.2s' }}></span>
          </div>
        </div>
      </div>

      {/* Progress bar animation on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
        <div className={`
          h-full bg-gradient-to-r ${config.gradient} transition-all duration-700
          ${isHovered ? 'w-full' : 'w-0'}
        `}></div>
      </div>
    </div>
  );
}

/* =========================
   ACTION BUTTON COMPONENT - WITH ANIMATIONS
========================= */
function ActionButton({ icon, label, description, color, onClick, delay }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const colorClasses = {
    primary: {
      border: 'border-blue-200',
      hover: 'hover:bg-blue-50 hover:border-blue-300',
      text: 'text-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    success: {
      border: 'border-green-200',
      hover: 'hover:bg-green-50 hover:border-green-300',
      text: 'text-green-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    warning: {
      border: 'border-yellow-200',
      hover: 'hover:bg-yellow-50 hover:border-yellow-300',
      text: 'text-yellow-700',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    danger: {
      border: 'border-red-200',
      hover: 'hover:bg-red-50 hover:border-red-300',
      text: 'text-red-700',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
  };

  const config = colorClasses[color] || colorClasses.primary;

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`
        group w-full flex items-center gap-3 px-4 py-3 rounded-xl 
        border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md
        ${config.border} ${config.hover}
        animate-slideInUp
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`
        p-2 rounded-lg ${config.iconBg} transition-all duration-300
        ${isHovered ? 'scale-110 rotate-3' : ''}
      `}>
        <div className={`${config.iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="flex-1 text-left">
        <span className={`font-medium ${config.text} block`}>{label}</span>
        {description && (
          <span className="text-xs text-gray-500">{description}</span>
        )}
      </div>
      <ArrowRight className={`
        h-4 w-4 text-gray-400 transition-all duration-300
        ${isHovered ? 'translate-x-1 text-blue-600' : ''}
      `} />
    </button>
  );
}

/* =========================
   STATUS HELPERS
========================= */
const getStatusBadgeClass = (status) => {
  switch (status) {
    case "ENQUIRY":
      return "bg-gray-100 text-gray-700";
    case "VERIFIED":
      return "bg-blue-100 text-blue-700";
    case "HANDED_OVER":
      return "bg-yellow-100 text-yellow-700";
    case "RETURNED":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "ENQUIRY":
      return "⏳";
    case "VERIFIED":
      return "✓";
    case "HANDED_OVER":
      return "📦";
    case "RETURNED":
      return "✅";
    default:
      return "•";
  }
};

const formatStatus = (status) => {
  return status.replace(/_/g, ' ');
};

export default Dashboard;