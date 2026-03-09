// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await login({ email, password });

//       const user = JSON.parse(localStorage.getItem("user"));

//       if (user.role === "ADMIN") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { Camera, Lock, Mail, LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";

// function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       await login({ email, password });

//       const user = JSON.parse(localStorage.getItem("user"));

//       // Small delay for better UX
//       setTimeout(() => {
//         if (user.role === "ADMIN") {
//           navigate("/admin");
//         } else {
//           navigate("/");
//         }
//       }, 300);

//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password");
//       setIsLoading(false);
//     }
//   };

//   const handleDemoLogin = (role) => {
//     const demoCredentials = {
//       ADMIN: { email: "admin@venkatesha.com", password: "admin123" },
//       STAFF: { email: "staff@venkatesha.com", password: "staff123" },
//     };
    
//     setEmail(demoCredentials[role].email);
//     setPassword(demoCredentials[role].password);
//     // Auto-submit after setting credentials
//     setTimeout(() => {
//       const submitButton = document.querySelector('button[type="submit"]');
//       if (submitButton) submitButton.click();
//     }, 100);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
//       <div className="absolute top-8 left-8">
//         <div className="flex items-center gap-2">
//           <Camera className="h-8 w-8 text-blue-600" />
//           <span className="text-2xl font-bold text-gray-800">Venkatesha Cameras</span>
//         </div>
//       </div>

//       <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
//         {/* Left Side - Brand & Info */}
//         <div className="w-full md:w-1/2 text-center md:text-left">
//           <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-200">
//             <div className="flex flex-col items-center md:items-start mb-8">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
//                 <Camera className="h-8 w-8 text-blue-600" />
//               </div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
//                 Welcome Back
//               </h1>
//               <p className="text-gray-600">
//                 Sign in to your account to access the camera retail system
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
//                 <div className="p-2 bg-blue-100 rounded-lg">
//                   <div className="h-5 w-5 text-blue-600">📱</div>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-800">Inventory Management</p>
//                   <p className="text-sm text-gray-600">Track and manage camera equipment</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
//                 <div className="p-2 bg-purple-100 rounded-lg">
//                   <div className="h-5 w-5 text-purple-600">💳</div>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-800">Payment Processing</p>
//                   <p className="text-sm text-gray-600">Handle customer payments securely</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
//                 <div className="p-2 bg-green-100 rounded-lg">
//                   <div className="h-5 w-5 text-green-600">📄</div>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-800">Agreement Management</p>
//                   <p className="text-sm text-gray-600">Generate and manage rental agreements</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="w-full md:w-1/2">
//           <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-200">
//             <div className="mb-8 text-center">
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
//                 Login to Dashboard
//               </h2>
//               <p className="text-gray-600">Enter your credentials to continue</p>
//             </div>

//             {/* Demo Login Buttons */}
//             <div className="mb-6">
//               <p className="text-sm text-gray-500 mb-3 text-center">Quick Demo Login:</p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   type="button"
//                   onClick={() => handleDemoLogin("ADMIN")}
//                   className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
//                 >
//                   <div className="h-5 w-5">👑</div>
//                   Admin Account
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => handleDemoLogin("STAFF")}
//                   className="flex-1 px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
//                 >
//                   <div className="h-5 w-5">👤</div>
//                   Staff Account
//                 </button>
//               </div>
//             </div>

//             <div className="relative mb-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white text-gray-500">Or sign in with credentials</span>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Input */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               {/* Password Input */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5 text-gray-400" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-600">Remember me</span>
//                 </label>
//                 <button
//                   type="button"
//                   className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
//                   <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
//                   <span className="text-red-700 text-sm">{error}</span>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Signing in...
//                   </>
//                 ) : (
//                   <>
//                     <LogIn className="h-5 w-5" />
//                     Sign In
//                   </>
//                 )}
//               </button>

//               {/* Terms and Privacy */}
//               <p className="text-xs text-center text-gray-500">
//                 By signing in, you agree to our{" "}
//                 <button type="button" className="text-blue-600 hover:underline">
//                   Terms of Service
//                 </button>{" "}
//                 and{" "}
//                 <button type="button" className="text-blue-600 hover:underline">
//                   Privacy Policy
//                 </button>
//               </p>
//             </form>

//             {/* Support Info */}
//             <div className="mt-8 pt-6 border-t border-gray-200 text-center">
//               <p className="text-sm text-gray-600">
//                 Need help?{" "}
//                 <button type="button" className="text-blue-600 font-medium hover:underline">
//                   Contact Support
//                 </button>
//               </p>
//               <p className="text-xs text-gray-500 mt-2">
//                 © {new Date().getFullYear()} Venkatesha Cameras. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Camera, Lock, Mail, LogIn, Eye, EyeOff, AlertCircle, ChevronRight, Sparkles } from "lucide-react";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login({ email, password });

      const user = JSON.parse(localStorage.getItem("user"));

      // Small delay for better UX
      setTimeout(() => {
        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 300);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const demoCredentials = {
      ADMIN: { email: "admin@venkatesha.com", password: "admin123" },
      STAFF: { email: "staff@venkatesha.com", password: "staff123" },
    };
    
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
    
    // Auto-submit after setting credentials with animation
    setTimeout(() => {
      const submitButton = document.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.classList.add('animate-pulse');
        submitButton.click();
      }
    }, 100);
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-2 overflow-hidden">
    {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with animation
      <div className={`
        absolute top-8 left-4 sm:left-8 transition-all duration-1000 transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
      `}>
        <div className="flex items-center gap-2 group">
          <div className="relative">
            <Camera className="h-8 w-8 text-blue-600 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <div className="absolute -inset-1 bg-blue-400 rounded-full filter blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            Venkatesha Cameras
          </span>
        </div>
      </div> */}

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-6 relative z-10">
        {/* Left Side - Brand & Info */}
        <div className={`
          w-full lg:w-1/2 transition-all duration-1000 delay-300 transform
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
        `}>
          <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-7 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-500 group">
            <div className="flex flex-col items-center lg:items-start h-full">
              {/* Animated icon */}
              <div className="relative mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl">
                  <Camera className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <span className="flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-500 items-center justify-center">
                      <Sparkles className="h-3 w-3 text-white" />
                    </span>
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 animate-fadeInUp">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-base sm:text-lg mb-8 text-center lg:text-left animate-fadeInUp animation-delay-200">
                Sign in to your account to access the camera retail system
              </p>

              <div className="space-y-4 w-full">
                {[
                  { icon: "📱", title: "Inventory Management", desc: "Track and manage camera equipment", color: "blue", delay: "400" },
                  { icon: "💳", title: "Payment Processing", desc: "Handle customer payments securely", color: "purple", delay: "600" },
                  { icon: "📄", title: "Agreement Management", desc: "Generate and manage rental agreements", color: "green", delay: "800" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl bg-${item.color}-50 
                      transform transition-all duration-500 hover:scale-105 hover:shadow-lg
                      animate-slideInRight
                    `}
                    style={{ animationDelay: `${item.delay}ms` }}
                  >
                    <div className={`
                      p-3 bg-${item.color}-100 rounded-lg transform transition-all duration-300
                      group-hover:rotate-6
                    `}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={`
          w-full lg:w-1/2 transition-all duration-1000 delay-500 transform
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
        `}>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-7 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 animate-fadeInDown">
                Login to Dashboard
              </h2>
              <p className="text-gray-600 animate-fadeInDown animation-delay-200">
                Enter your credentials to continue
              </p>
            </div>

            {/* Demo Login Buttons */}
            <div className="mb-6 animate-fadeInUp animation-delay-400">
              <p className="text-sm text-gray-500 mb-3 text-center">Quick Demo Login:</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleDemoLogin("ADMIN")}
                  className="group flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-xl"
                >
                  <span className="text-lg transform transition-transform group-hover:rotate-12">👑</span>
                  Admin Account
                  <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin("STAFF")}
                  className="group flex-1 px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-xl"
                >
                  <span className="text-lg transform transition-transform group-hover:rotate-12">👤</span>
                  Staff Account
                  <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </div>
            </div>

            <div className="relative mb-6 animate-fadeIn animation-delay-600">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or sign in with credentials</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="animate-fadeInUp animation-delay-800">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`
                      w-full pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all duration-300
                      ${focusedField === 'email' 
                        ? 'border-blue-500 ring-4 ring-blue-100 scale-[1.02]' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    disabled={isLoading}
                  />
                  {email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div className="animate-fadeInUp animation-delay-1000">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors duration-300 ${
                      focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`
                      w-full pl-10 pr-12 py-3 border-2 rounded-xl outline-none transition-all duration-300
                      ${focusedField === 'password' 
                        ? 'border-blue-500 ring-4 ring-blue-100 scale-[1.02]' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center group/eye"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-all duration-300 group-hover/eye:scale-110" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-all duration-300 group-hover/eye:scale-110" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between animate-fadeIn animation-delay-1200">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300 group-hover:scale-110"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-shake">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 animate-pulse" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] hover:shadow-xl animate-fadeInUp animation-delay-1400"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="animate-pulse">Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 transform transition-transform group-hover:rotate-12" />
                    <span>Sign In</span>
                    <ChevronRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </>
                )}
              </button>

              {/* Terms and Privacy */}
              <p className="text-xs text-center text-gray-500 animate-fadeIn animation-delay-1600">
                By signing in, you agree to our{" "}
                <button type="button" className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300 hover:scale-105">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300 hover:scale-105">
                  Privacy Policy
                </button>
              </p>
            </form>

            {/* Support Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center animate-fadeIn animation-delay-1800">
              <p className="text-sm text-gray-600">
                Need help?{" "}
                <button type="button" className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-all duration-300 hover:scale-105">
                  Contact Support
                </button>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                © {new Date().getFullYear()} Venkatesha Cameras. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Login;