// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const API_BASE = "https://mqtt-testing-2.onrender.com/api/v1";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch(`${API_BASE}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // 🔴 HARD CHECK – these must exist
//       if (!data.token) {
//         throw new Error("Server did not return auth token");
//       }

//       // If backend didn't send user, build one
//       const user = data.user || { username };

//       // 🔥 STORE AUTH DATA (keys must match Header)
//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("user", JSON.stringify(user));

//       // 🔥 FORCE HEADER TO RE-READ STORAGE
//       window.dispatchEvent(new Event("authChange"));

//       // 🔥 REDIRECT
//       navigate("/");
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
//       <div className="w-full max-w-md">
//         {/* Floating Card with Glass Effect */}
//         <div className="relative">
//           {/* Background Glow Effect */}
//           <div className="absolute -inset-0.5 border-black"></div>

//           {/* Main Card */}
//           <div className="relative bg-white/95 backdrop-blur-sm border border-gray-400 rounded-2xl shadow-2xl shadow-blue-200/30 p-8">
            
//             {/* Error Alert */}
//             {error && (
//               <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl shadow-sm animate-fade-in">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <svg
//                       className="h-5 w-5 text-red-500"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm font-medium text-red-700">{error}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Username Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Username
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg
//                       className="h-5 w-5 text-blue-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       ></path>
//                     </svg>
//                   </div>
//                   <input
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="Enter your username"
//                     required
//                     disabled={loading}
//                     className="block w-full pl-10 pr-4 py-3.5 bg-gray-50/80 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg
//                       className="h-5 w-5 text-blue-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                       ></path>
//                     </svg>
//                   </div>
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     required
//                     disabled={loading}
//                     className="block w-full pl-10 pr-4 py-3.5 bg-gray-50/80 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                   />
//                 </div>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
              
//               <Link to="/admin-login"> <button
//                   type="button"
//                   className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
//                 >
//                   Admin login→
//                 </button></Link> 
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Signing in...
//                   </span>
//                 ) : (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="w-5 h-5 mr-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
//                       ></path>
//                     </svg>
//                     Sign In
//                   </span>
//                 )}
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="mt-8">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-200"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-3 bg-white text-gray-500 font-medium">
//                     Secure access only
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 © {new Date().getFullYear()} Admin Portal. All rights reserved.
//               </p>
//               <p className="text-xs text-gray-500 mt-1">
//                 Contact support if you encounter any issues
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add fade-in animation */}
//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }












import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.DEV ? "http://localhost:8000/api/v1" : "https://mqtt-testing-2.onrender.com/api/v1";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // 🔴 HARD CHECK – these must exist
      if (!data.token) {
        throw new Error("Server did not return auth token");
      }

      // If backend didn't send user, build one
      const user = data.user || { username };

      // 🔥 STORE AUTH DATA (keys must match Header)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 FORCE HEADER TO RE-READ STORAGE
      window.dispatchEvent(new Event("authChange"));

      // 🔥 REDIRECT
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Theme color: #0AC4E0
  const themeColor = "#0AC4E0";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md">
        {/* Main Card - Clean, professional design */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">

          {/* Logo/Icon */}
          <div className="text-center mb-8">

            <p className="text-slate-400 text-sm">
              Sign in to your account
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-3 bg-red-950/40 border border-red-800 rounded">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-red-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  disabled={loading}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Admin Login */}
            <div className="flex items-center justify-between">


              <Link to="/admin-login" className="text-sm font-medium text-amber-400 hover:text-amber-300">
                Admin login →
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-amber-500 text-slate-950 font-bold uppercase tracking-wide rounded-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign In
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-slate-900 text-slate-500">
                  Secure Access
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} TransSync. All rights reserved.</p>
            <p className="mt-1"> <Link to="/contact" className="text-amber-400 hover:text-amber-300"> Contact</Link> support for assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

