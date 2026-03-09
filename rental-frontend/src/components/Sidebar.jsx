// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   Package,
//   Calendar,
//   CreditCard,
//   FileText,
//   LogOut
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// const menu = [
//   { path: "/", label: "Dashboard", icon: LayoutDashboard },
//   { path: "/customers", label: "Customers", icon: Users },
//   { path: "/items", label: "Items", icon: Package },
//   { path: "/bookings", label: "Bookings", icon: Calendar },
//   { path: "/payments", label: "Payments", icon: CreditCard },
//   { path: "/agreements", label: "Agreements", icon: FileText }
// ];

// function Sidebar() {
//   const location = useLocation();
//   const { logout } = useAuth();

//   return (
//     <aside className="w-64 bg-white border-r px-5 py-6 flex flex-col">
//       <h1 className="text-2xl font-bold text-slate-800 mb-8">
//         Venkatesha Cameras
//       </h1>

//       <nav className="space-y-1">
//         {menu.map(({ path, label, icon: Icon }) => {
//           const active = location.pathname === path;

//           return (
//             <Link
//               key={path}
//               to={path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
//                 ${
//                   active
//                     ? "bg-blue-100 text-blue-900 font-semibold"
//                     : "text-slate-600 hover:bg-slate-100"
//                 }`}
//             >
//               <Icon size={18} />
//               {label}
//             </Link>
//           );
//         })}

//         {/* <li>
//   <Link to="/items/availability">Item Availability</Link>
// </li> */}

//       </nav>

//       <button
//         onClick={logout}
//         className="mt-auto flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
//       >
//         <LogOut size={18} />
//         Logout
//       </button>
//     </aside>
//   );
// }

// export default Sidebar;



//deepseek
// components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  Calendar,
  CreditCard,
  FileText,
  LogOut,
  Camera,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Venk_logo.png";

const menu = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/customers", label: "Customers", icon: Users },
  { path: "/items", label: "Inventory", icon: Package },
  { path: "/bookings", label: "Bookings", icon: Calendar },
  { path: "/payments", label: "Payments", icon: CreditCard },
  { path: "/agreements", label: "Agreements", icon: FileText }
];

function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation on mount
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`relative h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-500 ease-in-out shadow-sm
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isAnimating ? 'animate-slideIn' : ''}`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-16 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:rotate-180 shadow-md z-10"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo with animation */}
      {/* <div className="p-6 border-b border-gray-100 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
        <div className={`flex items-center transition-all duration-500 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="relative">
            <Camera className={`h-8 w-8 text-blue-600 transform transition-all duration-500 hover:rotate-12 hover:scale-110 ${isAnimating ? 'animate-bounce' : ''}`} />
            <div className="absolute -inset-1 bg-blue-400 rounded-full filter blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          {!isCollapsed && (
            <div className="ml-3 animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-800">Venkatesha Cameras</h2>
              <p className="text-xs text-gray-500">Camera Rental System</p>
            </div>
          )}
        </div>
      </div> */}

      {/* Logo */}
<div className="border-b border-gray-200">
  <img
    src={logo}
    alt="Venkatesha Cameras"
    className={`w-full object-cover transition-all duration-500 ${
      isCollapsed ? "h-16" : "h-28"
    }`}
  />
</div>

      {/* Navigation with animations */}
      <nav className="flex-1 p-4 space-y-2 overflow-auto">
        {menu.map(({ path, label, icon: Icon }, index) => {
          const active = location.pathname === path;
          const isHovered = hoveredItem === path;

          return (
            <Link
              key={path}
              to={path}
              onMouseEnter={() => setHoveredItem(path)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`
                relative flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-300 group
                ${isCollapsed ? 'justify-center' : ''}
                ${active 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }
              `}
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Icon with animations */}
              <div className="relative">
                <Icon 
                  size={20} 
                  className={`
                    transform transition-all duration-300
                    ${active ? 'animate-pulse' : ''}
                    ${isHovered && !active ? 'scale-110' : ''}
                  `}
                />
                {active && (
                  <span className="absolute -inset-1 bg-white rounded-full filter blur-md opacity-30 animate-ping"></span>
                )}
              </div>

              {/* Label */}
              {!isCollapsed && (
                <span className={`
                  font-medium transition-all duration-300
                  ${isHovered ? 'translate-x-1' : ''}
                `}>
                  {label}
                </span>
              )}

              {/* Active indicator */}
              {active && !isCollapsed && (
                <span className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              )}

              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                  {label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout button only */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className={`
            flex items-center gap-3 w-full px-4 py-3
            text-gray-600 hover:text-red-600 hover:bg-red-50
            rounded-xl transition-all duration-300 group
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut 
            size={18} 
            className="transform transition-all duration-300 group-hover:translate-x-1" 
          />
          {!isCollapsed && (
            <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
              Logout
            </span>
          )}
          
          {/* Tooltip for collapsed mode */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;