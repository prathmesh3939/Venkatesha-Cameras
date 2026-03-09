// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-slate-100">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Right side */}
//       <div className="flex flex-col flex-1">
//         {/* Topbar */}
//         <Topbar />

//         {/* Page content */}
//         <main className="p-6 overflow-y-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }




// // // // import Sidebar from "../components/Sidebar";
// // // // import Topbar from "../components/Topbar";

// // // // export default function AdminLayout({ children }) {
// // // //   return (
// // // //     <div className="min-h-screen bg-slate-100">
// // // //       <Sidebar />

// // // //       {/* MAIN CONTENT */}
// // // //       <div className="lg:ml-64 flex flex-col">
// // // //         <Topbar />
// // // //         <main className="p-6">
// // // //           {children}
// // // //         </main>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }



// // // import Sidebar from "../components/Sidebar";
// // // import Topbar from "../components/Topbar";

// // // export default function AdminLayout({ children }) {
// // //   return (
// // //     <div className="min-h-screen bg-slate-100">
// // //       <Sidebar />

// // //       {/* Main content */}
// // //       <div className="lg:ml-64 flex flex-col">
// // //         <Topbar />
// // //         <main className="p-6">
// // //           {children}
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import Sidebar from "../components/Sidebar";
// // import Topbar from "../components/Topbar";

// // export default function AdminLayout({ children }) {
// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Sidebar />
      
// //       {/* Main content area - with proper margin for sidebar */}
// //       <div className="md:ml-64 flex flex-col min-h-screen">
// //         <Topbar />
// //         <main className="flex-1 p-6">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

//deepseek
// // layout/AdminLayout.jsx
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar on left - FIXED width */}
//       <div className="hidden md:block">
//         <Sidebar />
//       </div>
      
//       {/* Main content area - Takes remaining space */}
//       <div className="flex-1 flex flex-col">
//         <Topbar />
//         <main className="flex-1 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }



//dont scroll sidebar 
// layout/AdminLayout.jsx
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Fixed, no scroll */}
      <div className="hidden md:block flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Main content area - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}