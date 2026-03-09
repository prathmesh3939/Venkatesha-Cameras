

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/api";

// const Customers = () => {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const res = await api.get("/customers");
//         setCustomers(res.data.customers || []);
//       } catch (err) {
//         console.error("Failed to load customers", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   if (loading) return <p>Loading customers...</p>;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Customers</h2>

//         {/* 🔥 FIXED ADD BUTTON */}
//         <Link
//           to="/customers/create"
//           className="px-4 py-2 border rounded hover:bg-slate-100"
//         >
//           Add Customer
//         </Link>
//       </div>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-slate-200">
//             <th>Customer ID</th>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {customers.map((c) => (
//             <tr key={c._id} className="text-center border-t">
//               <td>{c.customerId}</td>
//               <td>{c.name}</td>
//               <td>{c.mobile}</td>
//               <td className="text-green-600">
//                 {c.isBlacklisted ? "Blocked" : "Active"}
//               </td>
//               <td className="space-x-2">

//                 {/* 🔥 VIEW */}
//                 <Link
//                   to={`/customers/${c._id}`}
//                   className="px-2 py-1 border rounded"
//                 >
//                   View
//                 </Link>

//                 {/* 🔥 EDIT */}
//                 <Link
//                   to={`/customers/${c._id}/edit`}
//                   className="px-2 py-1 border rounded"
//                 >
//                   Edit
//                 </Link>

//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Customers;



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/api";
// import {
//   Users,
//   UserPlus,
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Edit,
//   Phone,
//   Shield,
//   Ban,
//   Loader,
//   MoreVertical,
//   UserCheck,
//   UserX,
//   ChevronLeft,
//   ChevronRight
// } from "lucide-react";

// const Customers = () => {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const res = await api.get("/customers");
//         setCustomers(res.data.customers || []);
//       } catch (err) {
//         console.error("Failed to load customers", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   // Filter customers based on search term
//   const filteredCustomers = customers.filter(customer =>
//     customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.mobile?.includes(searchTerm) ||
//     customer.customerId?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[400px]">
//         <Loader className="h-12 w-12 text-blue-500 animate-spin mb-4" />
//         <p className="text-gray-600">Loading customers...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="animate-fade-in">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <div className="p-3 rounded-lg bg-blue-50">
//               <Users className="h-6 w-6 text-blue-600" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
//               <p className="text-gray-600">Manage your rental customers</p>
//             </div>
//           </div>
          
//           {/* Add Customer Button */}
//           <Link
//             to="/customers/create"
//             className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors"
//           >
//             <UserPlus className="h-4 w-4" />
//             Add Customer
//           </Link>
//         </div>

//         {/* Stats Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-white p-4 rounded-xl border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Customers</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">{customers.length}</p>
//               </div>
//               <Users className="h-8 w-8 text-blue-500" />
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded-xl border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Trusted Customers</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">
//                   {customers.filter(c => c.isTrusted).length}
//                 </p>
//               </div>
//               <Shield className="h-8 w-8 text-green-500" />
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded-xl border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Blacklisted</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">
//                   {customers.filter(c => c.isBlacklisted).length}
//                 </p>
//               </div>
//               <Ban className="h-8 w-8 text-red-500" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
//         <div className="flex items-center gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search customers by name, phone, or ID..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
//               <Filter className="h-4 w-4" />
//               <span>Filter</span>
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
//               <Download className="h-4 w-4" />
//               <span>Export</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Customers Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Customer
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Contact
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Reference
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredCustomers.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-12 text-center">
//                     <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                     <p className="text-gray-500">No customers found</p>
//                     <p className="text-gray-400 text-sm mt-1">
//                       {searchTerm ? 'Try a different search term' : 'Start by adding your first customer'}
//                     </p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredCustomers.map((customer) => (
//                   <tr 
//                     key={customer._id} 
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     {/* Customer Info */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                           <span className="font-semibold text-blue-700">
//                             {customer.name?.charAt(0) || 'C'}
//                           </span>
//                         </div>
//                         <div className="ml-4">
//                           <div className="flex items-center gap-2">
//                             <p className="font-medium text-gray-900">{customer.name}</p>
//                             {customer.isTrusted && (
//                               <Shield className="h-4 w-4 text-green-500" />
//                             )}
//                           </div>
//                           <p className="text-sm text-gray-500">ID: {customer.customerId || 'N/A'}</p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Contact */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <Phone className="h-4 w-4 text-gray-400" />
//                         <span className="text-gray-900">{customer.mobile}</span>
//                       </div>
//                     </td>

//                     {/* Reference */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <p className="text-gray-900">
//                         {customer.referenceName || '—'}
//                       </p>
//                     </td>

//                     {/* Status */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {customer.isBlacklisted ? (
//                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                           <UserX className="h-3 w-3" />
//                           Blocked
//                         </span>
//                       ) : (
//                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                           <UserCheck className="h-3 w-3" />
//                           Active
//                         </span>
//                       )}
//                     </td>

//                     {/* Actions */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <Link
//                           to={`/customers/${customer._id}`}
//                           className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="View Details"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <Link
//                           to={`/customers/${customer._id}/edit`}
//                           className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="Edit"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </Link>
//                         <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
//                           <MoreVertical className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Table Footer */}
//         {filteredCustomers.length > 0 && (
//           <div className="px-6 py-4 border-t border-gray-200">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-gray-500">
//                 Showing <span className="font-medium">1-{filteredCustomers.length}</span> of{" "}
//                 <span className="font-medium">{filteredCustomers.length}</span> customers
//               </p>
//               <div className="flex items-center gap-2">
//                 <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <span className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">
//                   1
//                 </span>
//                 <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Floating Action Button for Mobile */}
//       <Link
//         to="/customers/create"
//         className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all hover:scale-110"
//       >
//         <UserPlus className="h-6 w-6" />
//       </Link>
//     </div>
//   );
// };

// export default Customers;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Phone,
  Shield,
  Ban,
  Loader,
  MoreVertical,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mail,
  Calendar,
  ArrowRight,
  Clock
} from "lucide-react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [animateItems, setAnimateItems] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get("/customers");
        setCustomers(res.data.customers || []);
        // Trigger animations after data loads
        setTimeout(() => setAnimateItems(true), 100);
      } catch (err) {
        console.error("Failed to load customers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.mobile?.includes(searchTerm) ||
    customer.customerId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <Loader className="h-16 w-16 text-blue-500 animate-spin mb-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 text-lg animate-pulse">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header with Animation */}
        <div className="mb-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg animate-float">
                <Users className="h-6 w-6 text-white" />
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Customers</h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">Manage your rental customers</p>
              </div>
            </div>
            
            {/* Add Customer Button */}
            <Link
              to="/customers/create"
              className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-200 transform hover:scale-105 shadow-md self-start"
            >
              <UserPlus className="h-4 w-4 transition-transform group-hover:rotate-12" />
              Add Customer
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </div>

          {/* Stats Summary with Animations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { 
                label: 'Total Customers', 
                value: customers.length, 
                icon: Users, 
                color: 'blue',
                bg: 'bg-blue-50',
                iconBg: 'bg-blue-100',
                iconColor: 'text-blue-600',
                delay: 0
              },
              { 
                label: 'Trusted Customers', 
                value: customers.filter(c => c.isTrusted).length, 
                icon: Shield, 
                color: 'green',
                bg: 'bg-green-50',
                iconBg: 'bg-green-100',
                iconColor: 'text-green-600',
                delay: 100
              },
              { 
                label: 'Blacklisted', 
                value: customers.filter(c => c.isBlacklisted).length, 
                icon: Ban, 
                color: 'red',
                bg: 'bg-red-50',
                iconBg: 'bg-red-100',
                iconColor: 'text-red-600',
                delay: 200
              }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className={`
                  bg-white rounded-xl p-5 shadow-sm border border-gray-200 
                  hover:shadow-md transition-all duration-300 transform hover:-translate-y-1
                  ${animateItems ? 'animate-slideInUp' : 'opacity-0'}
                `}
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      <Clock className="inline h-3 w-3 mr-1" />
                      Updated just now
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.iconBg} transform transition-all duration-300 group-hover:scale-110`}>
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 animate-slideInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search customers by name, phone, email, or ID..."
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
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-105"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-105">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
              <div className="flex flex-wrap gap-2">
                {['All', 'Active', 'Trusted', 'Blacklisted'].map((filter, idx) => (
                  <button
                    key={filter}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-3">
          {filteredCustomers.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center animate-fadeIn">
              <div className="relative inline-block">
                <Users className="h-16 w-16 text-gray-200 mx-auto" />
                <Sparkles className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <p className="text-gray-600 font-medium mt-4">No customers found</p>
              <p className="text-gray-400 text-sm mt-2">
                {searchTerm ? 'Try a different search term' : 'Start by adding your first customer'}
              </p>
              <Link
                to="/customers/create"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-200 transform hover:scale-105 shadow-md mt-4"
              >
                <UserPlus className="h-4 w-4" />
                Add Customer
              </Link>
            </div>
          ) : (
            filteredCustomers.map((customer, index) => (
              <CustomerCard 
                key={customer._id} 
                customer={customer} 
                index={index}
                animateItems={animateItems}
              />
            ))
          )}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-slideInUp" style={{ animationDelay: '400ms' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="relative inline-block">
                        <Users className="h-16 w-16 text-gray-200 mx-auto" />
                        <Sparkles className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                      </div>
                      <p className="text-gray-600 font-medium mt-4">No customers found</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {searchTerm ? 'Try a different search term' : 'Start by adding your first customer'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer, index) => (
                    <CustomerRow 
                      key={customer._id} 
                      customer={customer} 
                      index={index}
                      animateItems={animateItems}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredCustomers.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium">1-{filteredCustomers.length}</span> of{" "}
                  <span className="font-medium">{filteredCustomers.length}</span> customers
                </p>
                <div className="flex items-center gap-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium shadow-md">
                    1
                  </span>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Action Button for Mobile */}
        <Link
          to="/customers/create"
          className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-110 hover:rotate-12"
        >
          <UserPlus className="h-6 w-6" />
        </Link>
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
   CUSTOMER CARD (Mobile)
========================= */
const CustomerCard = ({ customer, index, animateItems }) => {
  return (
    <div 
      className={`
        bg-white rounded-xl border border-gray-200 p-5 shadow-sm
        hover:shadow-md transition-all duration-300 transform hover:-translate-y-1
        ${animateItems ? 'animate-slideInUp' : 'opacity-0'}
      `}
      style={{ animationDelay: `${500 + index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              {customer.name?.charAt(0) || 'C'}
            </div>
            {customer.isTrusted && (
              <div className="absolute -top-1 -right-1">
                <Shield className="h-5 w-5 text-green-500 bg-white rounded-full p-0.5 shadow-sm" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900 text-lg">{customer.name}</p>
            </div>
            <p className="text-sm text-gray-500">ID: {customer.customerId || 'N/A'}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
          customer.isBlacklisted 
            ? 'bg-red-100 text-red-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {customer.isBlacklisted ? (
            <UserX className="h-3.5 w-3.5 mr-1.5" />
          ) : (
            <UserCheck className="h-3.5 w-3.5 mr-1.5" />
          )}
          {customer.isBlacklisted ? 'Blocked' : 'Active'}
        </span>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <Phone className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Phone</p>
            <p className="font-medium text-gray-900 text-base">{customer.mobile}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <Mail className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Email</p>
            <p className="font-medium text-gray-900 text-base">{customer.email || '—'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <Users className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Reference</p>
            <p className="font-medium text-gray-900 text-base">{customer.referenceName || '—'}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Link
          to={`/customers/${customer._id}`}
          className="flex items-center justify-center gap-2 px-3 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-sm"
        >
          <Eye className="h-4 w-4" />
          <span>View</span>
        </Link>
        <Link
          to={`/customers/${customer._id}/edit`}
          className="flex items-center justify-center gap-2 px-3 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105"
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </Link>
        <button className="flex items-center justify-center gap-2 px-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105">
          <MoreVertical className="h-4 w-4" />
          <span>More</span>
        </button>
      </div>
    </div>
  );
};

/* =========================
   CUSTOMER ROW (Desktop)
========================= */
const CustomerRow = ({ customer, index, animateItems }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <tr 
      className={`
        hover:bg-blue-50/30 transition-all duration-300
        ${animateItems ? 'animate-fadeIn' : 'opacity-0'}
      `}
      style={{ animationDelay: `${500 + index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Customer Info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="relative">
            <div className={`
              h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 
              flex items-center justify-center text-white font-bold text-base
              transition-all duration-300
              ${isHovered ? 'scale-110 rotate-3 shadow-lg' : ''}
            `}>
              {customer.name?.charAt(0) || 'C'}
            </div>
            {customer.isTrusted && (
              <div className="absolute -top-1 -right-1">
                <Shield className="h-5 w-5 text-green-500 bg-white rounded-full p-0.5 shadow-sm" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900 text-base">{customer.name}</p>
            </div>
            <p className="text-sm text-gray-500">ID: {customer.customerId || 'N/A'}</p>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 text-sm">{customer.mobile}</span>
          </div>
          {customer.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 text-sm">{customer.email}</span>
            </div>
          )}
        </div>
      </td>

      {/* Reference */}
      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-gray-900 text-base">
          {customer.referenceName || '—'}
        </p>
        {customer.referenceMobile && (
          <p className="text-sm text-gray-500 mt-1">{customer.referenceMobile}</p>
        )}
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        {customer.isBlacklisted ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <UserX className="h-4 w-4" />
            Blocked
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <UserCheck className="h-4 w-4" />
            Active
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Link
            to={`/customers/${customer._id}`}
            className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 transform hover:scale-110"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <Link
            to={`/customers/${customer._id}/edit`}
            className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 transform hover:scale-110"
            title="Edit"
          >
            <Edit className="h-5 w-5" />
          </Link>
          <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 transform hover:scale-110">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Customers;