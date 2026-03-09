// import { useAuth } from "../context/AuthContext";

// function Topbar() {
//   const { user } = useAuth();

//   return (
//     <header className="h-14 bg-white border-b flex items-center justify-end px-6">
//       <div className="text-sm text-slate-700">
//         Welcome,&nbsp;
//         <span className="font-semibold">{user?.name}</span>
//         <span className="ml-2 text-slate-500">
//           ({user?.role})
//         </span>
//       </div>
//     </header>
//   );
// }

// export default Topbar;

//deepseek
// components/Topbar.jsx
import { useAuth } from "../context/AuthContext";
import { Search, Bell } from "lucide-react";
import { useState, useEffect } from "react";

function Topbar() {
  const { user } = useAuth();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation on mount
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 h-14 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Search Bar - Only on desktop */}
      <div className="hidden md:block flex-1 max-w-xl">
        <div className="relative group">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-all duration-300 ${
            isSearchFocused ? 'text-blue-500 scale-110' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search rentals, customers, items..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`
              pl-10 pr-4 py-2 w-full border rounded-lg outline-none text-sm
              transition-all duration-300 ease-in-out
              ${isSearchFocused 
                ? 'border-blue-500 ring-2 ring-blue-200 scale-[1.02] shadow-lg' 
                : 'border-gray-300 hover:border-gray-400 hover:shadow'
              }
              ${isAnimating ? 'animate-slideIn' : ''}
            `}
          />
          {/* Search hint tooltip */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-xs text-gray-400">Press ⌘K</span>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Notification Bell with animation */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`
              p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 
              rounded-lg transition-all duration-300 relative group
              ${showNotifications ? 'bg-blue-50 text-blue-600' : ''}
              hover:scale-110
            `}
          >
            <Bell className="h-5 w-5 transform transition-transform duration-300 group-hover:rotate-12" />
            
            {/* Notification dot with pulse animation */}
            {notificationCount > 0 && (
              <>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </>
            )}
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-scaleUp z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:pl-6"
                  >
                    <p className="text-sm text-gray-600">New booking request #{item}</p>
                    <p className="text-xs text-gray-400 mt-1">5 min ago</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Section */}
        <div className="flex items-center space-x-3 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {user?.name || 'Admin User'}
            </p>
            <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
              {user?.role || 'Administrator'}
            </p>
          </div>
          
          {/* Avatar with hover animation */}
          <div className="relative">
            <div className={`
              h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 
              flex items-center justify-center transform transition-all duration-300
              group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg
              ${isAnimating ? 'animate-bounce' : ''}
              cursor-pointer
            `}>
              <span className="text-sm font-semibold text-white">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            
            {/* Online status indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Mobile Search Toggle - Visible only on mobile */}
      <button className="md:hidden p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110">
        <Search className="h-5 w-5" />
      </button>
    </header>
  );
}

export default Topbar;