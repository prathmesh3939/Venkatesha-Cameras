// // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // /* =========================
// //    AUTH & GUARDS
// // ========================= */
// // import RequireAuth from "./auth/RequireAuth";
// // import RoleGuard from "./auth/RoleGuard";

// // /* =========================
// //    LAYOUT
// // ========================= */
// // import Sidebar from "./components/Sidebar";
// // import Topbar from "./components/Topbar";

// // /* =========================
// //    PAGES – AUTH / COMMON
// // ========================= */
// // import Login from "./pages/auth/Login";
// // import Unauthorized from "./pages/Unauthorized";
// // import Dashboard from "./pages/dashboard/Dashboard";

// // /* =========================
// //    PAGES – CUSTOMERS
// // ========================= */
// // import Customers from "./pages/customers/Customers";
// // import CreateCustomer from "./pages/customers/CreateCustomer";
// // import CustomerView from "./pages/customers/CustomerView";
// // import CustomerEdit from "./pages/customers/CustomerEdit";

// // /* =========================
// //    PAGES – ITEMS
// // ========================= */
// // import Items from "./pages/items/Items";
// // import CreateItem from "./pages/items/CreateItem";
// // import EditItem from "./pages/items/EditItem";
// // import ItemAvailability from "./pages/items/ItemAvailability";

// // /* =========================
// //    PAGES – OTHER MODULES
// // ========================= */
// // import Bookings from "./pages/bookings/Bookings";
// // import Payments from "./pages/payments/Payments";
// // import Agreements from "./pages/agreements/Agreements";

// // import AdminLayout from "./layout/AdminLayout";

// // <Routes>
// //   <Route
// //     path="/admin/dashboard"
// //     element={
// //       <AdminLayout>
// //         <Dashboard />
// //       </AdminLayout>
// //     }
// //   />

// //   <Route
// //     path="/admin/bookings"
// //     element={
// //       <AdminLayout>
// //         <Bookings />
// //       </AdminLayout>
// //     }
// //   />

// //   <Route
// //     path="/admin/items"
// //     element={
// //       <AdminLayout>
// //         <Items />
// //       </AdminLayout>
// //     }
// //   />
// // </Routes>

// // /* =========================
// //    LAYOUT WRAPPER
// // ========================= */
// // function Layout({ children }) {
// //   return (
// //     <div className="flex min-h-screen bg-slate-100">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col">
// //         <Topbar />
// //         <main className="p-6">{children}</main>
// //       </div>
// //     </div>
// //   );
// // }

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>

// //         {/* =========================
// //            PUBLIC ROUTES
// //         ========================= */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/unauthorized" element={<Unauthorized />} />

// //         {/* =========================
// //            PROTECTED ROUTES
// //         ========================= */}
// //         <Route element={<RequireAuth />}>

// //           {/* Dashboard */}
// //           <Route path="/" element={<Layout><Dashboard /></Layout>} />

// //           {/* Customers */}
// //           <Route path="/customers" element={<Layout><Customers /></Layout>} />
// //           <Route path="/customers/create" element={<Layout><CreateCustomer /></Layout>} />
// //           <Route path="/customers/:id" element={<Layout><CustomerView /></Layout>} />
// //           <Route path="/customers/:id/edit" element={<Layout><CustomerEdit /></Layout>} />

// //           {/* Items */}
// //           <Route path="/items" element={<Layout><Items /></Layout>} />
// //           <Route path="/items/create" element={<Layout><CreateItem /></Layout>} />
// //           <Route path="/items/:id/edit" element={<Layout><EditItem /></Layout>} />

// //           {/* ✅ Item Availability (ADMIN VIEW) */}
// //           <Route
// //             path="/items/availability"
// //             element={<Layout><ItemAvailability /></Layout>}
// //           />

// //           {/* Other Modules */}
// //           <Route path="/bookings" element={<Layout><Bookings /></Layout>} />
// //           <Route path="/payments" element={<Layout><Payments /></Layout>} />
// //           <Route path="/agreements" element={<Layout><Agreements /></Layout>} />

// //           {/* =========================
// //              ROLE-BASED ROUTES
// //           ========================= */}
// //           <Route element={<RoleGuard allowedRoles={["ADMIN"]} />}>
// //             <Route path="/admin" element={<Layout><Dashboard /></Layout>} />
// //           </Route>

// //           <Route element={<RoleGuard allowedRoles={["STAFF"]} />}>
// //             <Route path="/staff" element={<Layout><Dashboard /></Layout>} />
// //           </Route>

// //         </Route>
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";

// /* =========================
//    AUTH & GUARDS
// ========================= */
// import RequireAuth from "./auth/RequireAuth";
// import RoleGuard from "./auth/RoleGuard";

// /* =========================
//    LAYOUT
// ========================= */
// import AdminLayout from "./layout/AdminLayout";

// /* =========================
//    PAGES – AUTH / COMMON
// ========================= */
// import Login from "./pages/auth/Login";
// import Unauthorized from "./pages/Unauthorized";
// import Dashboard from "./pages/dashboard/Dashboard";

// /* =========================
//    PAGES – CUSTOMERS
// ========================= */
// import Customers from "./pages/customers/Customers";
// import CreateCustomer from "./pages/customers/CreateCustomer";
// import CustomerView from "./pages/customers/CustomerView";
// import CustomerEdit from "./pages/customers/CustomerEdit";

// /* =========================
//    PAGES – ITEMS
// ========================= */
// import Items from "./pages/items/Items";
// import CreateItem from "./pages/items/CreateItem";
// import EditItem from "./pages/items/EditItem";
// import ItemAvailability from "./pages/items/ItemAvailability";

// /* =========================
//    PAGES – OTHER MODULES
// ========================= */
// import Bookings from "./pages/bookings/Bookings";
// import Payments from "./pages/payments/Payments";
// import Agreements from "./pages/agreements/Agreements";
// import TestDashboard from "./pages/dashboard/TestDashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* =========================
//            PUBLIC ROUTES
//         ========================= */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />

//         {/* =========================
//            PROTECTED ROUTES
//         ========================= */}
//         <Route element={<RequireAuth />}>

//           {/* Dashboard */}
//           <Route
//             path="/"
//             element={
//               <AdminLayout>
//                 <Dashboard />
//               </AdminLayout>
//             }
//           />

//           {/* Customers */}
//           <Route
//             path="/customers"
//             element={
//               <AdminLayout>
//                 <Customers />
//               </AdminLayout>
//             }
//           />
//           <Route
//             path="/customers/create"
//             element={
//               <AdminLayout>
//                 <CreateCustomer />
//               </AdminLayout>
//             }
//           />
//           <Route
//             path="/customers/:id"
//             element={
//               <AdminLayout>
//                 <CustomerView />
//               </AdminLayout>
//             }
//           />
//           <Route
//             path="/customers/:id/edit"
//             element={
//               <AdminLayout>
//                 <CustomerEdit />
//               </AdminLayout>
//             }
//           />

//           {/* Items */}
//           <Route
//             path="/items"
//             element={
//               <AdminLayout>
//                 <Items />
//               </AdminLayout>
//             }
//           />
//           <Route
//             path="/items/create"
//             element={
//               <AdminLayout>
//                 <CreateItem />
//               </AdminLayout>
//             }
//           />
//           <Route
//             path="/items/:id/edit"
//             element={
//               <AdminLayout>
//                 <EditItem />
//               </AdminLayout>
//             }
//           />

//           {/* Item Availability (Admin View) */}
//           <Route
//             path="/items/availability"
//             element={
//               <AdminLayout>
//                 <ItemAvailability />
//               </AdminLayout>
//             }
//           />

//           {/* Other Modules */}
//           <Route
//             path="/bookings"
//             element={
//               <AdminLayout>
//                 <Bookings />
//               </AdminLayout>
//             }
//           />
//           <Route
//             path="/payments"
//             element={
//               <AdminLayout>
//                 <Payments />
//               </AdminLayout>
//             }
//           />
//           <Route
//             path="/agreements"
//             element={
//               <AdminLayout>
//                 <Agreements />
//               </AdminLayout>
//             }
//           />

//           {/* =========================
//              ROLE-BASED ROUTES
//           ========================= */}
//           <Route element={<RoleGuard allowedRoles={["ADMIN"]} />}>
//             <Route
//               path="/admin"
//               element={
//                 <AdminLayout>
//                   <TestDashboard />
//                 </AdminLayout>
//               }
//             />
//           </Route>

//           <Route element={<RoleGuard allowedRoles={["STAFF"]} />}>
//             <Route
//               path="/staff"
//               element={
//                 <AdminLayout>
//                   <Dashboard />
//                 </AdminLayout>
//               }
//             />
//           </Route>

//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

/* =========================
   AUTH & GUARDS
========================= */
import RequireAuth from "./auth/RequireAuth";
import RoleGuard from "./auth/RoleGuard";

/* =========================
   LAYOUT
========================= */
import AdminLayout from "./layout/AdminLayout";

/* =========================
   PAGES – AUTH / COMMON
========================= */
import Login from "./pages/auth/Login";
import Unauthorized from "./pages/Unauthorized";
import Dashboard from "./pages/dashboard/Dashboard";

/* =========================
   PAGES – CUSTOMERS
========================= */
import Customers from "./pages/customers/Customers";
import CreateCustomer from "./pages/customers/CreateCustomer";
import CustomerView from "./pages/customers/CustomerView";
import CustomerEdit from "./pages/customers/CustomerEdit";

/* =========================
   PAGES – ITEMS
========================= */
import Items from "./pages/items/Items";
import CreateItem from "./pages/items/CreateItem";
import EditItem from "./pages/items/EditItem";
import ItemAvailability from "./pages/items/ItemAvailability";

/* =========================
   PAGES – OTHER MODULES
========================= */
import Bookings from "./pages/bookings/Bookings";
import Payments from "./pages/payments/Payments";
import Agreements from "./pages/agreements/Agreements";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
           PUBLIC ROUTES
        ========================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* =========================
           PROTECTED ROUTES
        ========================= */}
        <Route element={<RequireAuth />}>

          {/* Dashboard */}
          <Route
            path="/"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />

          {/* Test route - REMOVE THIS IF NOT NEEDED */}
          {/* <Route
            path="/test"
            element={
              <AdminLayout>
                <div className="p-6">
                  <h1>Test Page</h1>
                  <p>If you see this, layout works!</p>
                </div>
              </AdminLayout>
            }
          /> */}

          {/* Customers */}
          <Route
            path="/customers"
            element={
              <AdminLayout>
                <Customers />
              </AdminLayout>
            }
          />
          <Route
            path="/customers/create"
            element={
              <AdminLayout>
                <CreateCustomer />
              </AdminLayout>
            }
          />
          <Route
            path="/customers/:id"
            element={
              <AdminLayout>
                <CustomerView />
              </AdminLayout>
            }
          />
          <Route
            path="/customers/:id/edit"
            element={
              <AdminLayout>
                <CustomerEdit />
              </AdminLayout>
            }
          />

          {/* Items */}
          <Route
            path="/items"
            element={
              <AdminLayout>
                <Items />
              </AdminLayout>
            }
          />
          <Route
            path="/items/create"
            element={
              <AdminLayout>
                <CreateItem />
              </AdminLayout>
            }
          />
          <Route
            path="/items/:id/edit"
            element={
              <AdminLayout>
                <EditItem />
              </AdminLayout>
            }
          />

          {/* Item Availability */}
          <Route
            path="/items/availability"
            element={
              <AdminLayout>
                <ItemAvailability />
              </AdminLayout>
            }
          />

          {/* Other Modules */}
          <Route
            path="/bookings"
            element={
              <AdminLayout>
                <Bookings />
              </AdminLayout>
            }
          />
          <Route
            path="/payments"
            element={
              <AdminLayout>
                <Payments />
              </AdminLayout>
            }
          />
          <Route
            path="/agreements"
            element={
              <AdminLayout>
                <Agreements />
              </AdminLayout>
            }
          />

          {/* =========================
             ROLE-BASED ROUTES (OPTIONAL - Can remove if not needed)
          ========================= */}
          <Route element={<RoleGuard allowedRoles={["ADMIN"]} />}>
            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              }
            />
          </Route>

          <Route element={<RoleGuard allowedRoles={["STAFF"]} />}>
            <Route
              path="/staff"
              element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              }
            />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;