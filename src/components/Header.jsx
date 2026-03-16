// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeNav, setActiveNav] = useState("");
//   const navigate = useNavigate();

//   // Add scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 5);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Set active nav based on current path
//   useEffect(() => {
//     const path = window.location.pathname;
//     setActiveNav(path);
//   }, []);

//   const checkAuth = async () => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const storedUser =
//       localStorage.getItem("user") || sessionStorage.getItem("user");

//     if (!token) {
//       setIsAuthenticated(false);
//       setUser(null);
//       return;
//     }

//     try {
//       if (storedUser) {
//         try {
//           const userData = JSON.parse(storedUser);
//           setUser(userData);
//           setIsAuthenticated(true);
//         } catch (e) {
//           console.error("Error parsing user data:", e);
//         }
//       }

//       const response = await axios.get(
//         "https://rp-875v.onrender.com/api/auth/verify",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.valid) {
//         setIsAuthenticated(true);

//         if (response.data.user) {
//           setUser(response.data.user);
//           const storage = localStorage.getItem("token")
//             ? localStorage
//             : sessionStorage;
//           storage.setItem("user", JSON.stringify(response.data.user));
//         }
//       }
//     } catch (err) {
//       // console.error("Token verification failed:", err);  /////////////////////////////////////////////////////////changes i made 
//     }
//   };

//   useEffect(() => {
//     // Check auth on component mount
//     checkAuth();
    
//     // Listen for custom auth change event
//     const handleAuthChange = () => checkAuth();
//     window.addEventListener("authChange", handleAuthChange);
    
//     // Listen for storage changes
//     const handleStorageChange = (e) => {
//       if (e.key === "token" || e.key === "user") {
//         checkAuth();
//       }
//     };
//     window.addEventListener("storage", handleStorageChange);
    
//     // Check auth periodically
//     // const interval = setInterval(() => {
//     //   checkAuth();
//     // }, 2000);
    
//     // return () => {
//     //   window.removeEventListener("authChange", handleAuthChange);
//     //   window.removeEventListener("storage", handleStorageChange);
//     //   clearInterval(interval);
//     // };
//   }, []);

//   const clearAuthData = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("user");
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   const handleLogout = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") ||
//         sessionStorage.getItem("token");
//       if (token) {
//         await axios
//           .post(
//             "https://rp-875v.onrender.com/api/auth/logout",
//             {},
//             { headers: { Authorization: `Bearer ${token}` } }
//           )
//           .catch(console.log);
//       }

//       clearAuthData();
//       window.dispatchEvent(new Event("authChange"));
//       setIsMenuOpen(false);
//       navigate("/");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   // Function to handle protected navigation
//   const handleProtectedNavigation = (to, mobile = false) => {
//     const protectedRoutes = ["/relay", "/analog-data", "/binary-input"];
    
//     if (protectedRoutes.includes(to) && !isAuthenticated) {
//       navigate("/login");
//       if (mobile) {
//         setIsMenuOpen(false);
//       }
//       return false;
//     }
    
//     checkAuth();
//     setActiveNav(to);
//     if (mobile) {
//       setIsMenuOpen(false);
//     }
//     return true;
//   };

//   const NavLink = ({ to, children, mobile = false }) => {
//     const isActive = activeNav === to;

//     const handleClick = (e) => {
//       e.preventDefault();
//       const canNavigate = handleProtectedNavigation(to, mobile);
//       if (canNavigate) {
//         navigate(to);
//       }
//     };

//     if (mobile) {
//       return (
//         <a
//           href={to}
//           onClick={handleClick}
//           className={`flex items-center py-3 px-4 text-black hover:bg-gray-800 transition-colors duration-200 ${
//             isActive ? "bg-blue-900 text-white" : ""
//           } ${!isAuthenticated && ["/relay", "/analog-data", "/binary-input"].includes(to) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
//         >
//           <div
//             className={`w-2 h-2 rounded-full mr-3 ${
//               isActive ? "bg-blue-500" : "bg-gray-600"
//             }`}
//           ></div>
//           <span className="font-medium text-sm sm:text-base">{children}</span>
//           {!isAuthenticated && ["/relay", "/analog-data", "/binary-input"].includes(to) && (
//             <span className="ml-2 text-xs text-yellow-500">(Login Required)</span>
//           )}
//         </a>
//       );
//     }
    

//     return (
//       <a
//         href={to}
//         onClick={handleClick}
//         className={`py-2 px-2 sm:px-3 font-medium text-black hover:text-white hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base ${
//           isActive ? "bg-blue-900 text-white" : ""
//         } ${!isAuthenticated && ["/relay", "/analog-data", "/binary-input"].includes(to) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
//       >
//         {children}
//         {!isAuthenticated && ["/relay", "/analog-data", "/binary-input"].includes(to) && (
//           <span className="ml-1 text-xs text-yellow-500">*</span>
//         )}
//       </a>
//     );
//   };

//   return (
//     <>
//       <header
//         className={`sticky top-0 z-50 w-full ${
//           isScrolled
//             ? "bg-[#cacfe2] border-b "
//             : "bg-[#cacfe2] border-b "
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
//           <div className="flex items-center justify-between h-14 sm:h-16">
//             {/* Logo - Responsive sizing */}
//             <Link
//               to="/"
//               className="flex items-center space-x-2 sm:space-x-3"
//               onClick={() => setActiveNav("/")}
//             >
//               <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-blue-900 rounded-lg flex items-center justify-center border border-blue-700">
//                 <span className="text-base sm:text-lg md:text-xl font-bold text-blue-300">TS</span>
//               </div>
//               <div className="flex flex-col leading-tight">
//                 <span className="text-base sm:text-lg md:text-xl font-bold text-black">TRANSYNC</span>
//                 <span className="text-xs text-black font-bold hidden sm:block">Industrial Automation</span>
//               </div>
//             </Link>

//             {/* Desktop Navigation - Show on medium and larger screens */}
//             <nav className="hidden md:flex items-center text-black space-x-1 lg:space-x-2">
//               <NavLink to="/relay">CONTROL</NavLink>
//               <NavLink to="/analog-data">ANALOG</NavLink>
//               <NavLink to="/events">EVENTS</NavLink>
//               <NavLink to="/dr">DR</NavLink>
//               <NavLink to="/binary-input">BI/BO</NavLink>
//               <NavLink to="/history">HISTORY</NavLink>

//               {/* Auth Section - Desktop */}
//               <div className="flex items-center space-x-2 sm:space-x-3 ml-4 pl-4 border-l border-gray-700">
//                 {isAuthenticated ? (
//                   <>
//                     {user && (
//                       <div className="hidden sm:flex items-center space-x-2 bg-gray-800 rounded px-3 py-1.5 border border-gray-700">
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                         <span className="text-xs sm:text-sm text-gray-300 truncate max-w-[100px] lg:max-w-[120px] xl:max-w-[140px]">
//                           {user.username}
//                         </span>
//                       </div>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="bg-red-900 text-white px-3 sm:px-4 py-1.5 rounded text-xs sm:text-sm font-medium hover:bg-red-800 transition-colors border border-red-700 whitespace-nowrap"
//                     >
//                       LOGOUT
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="bg-blue-800 text-black px-3 sm:px-4 py-1.5 rounded text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors border border-blue-600 whitespace-nowrap"
//                   >
//                     LOGIN
//                   </button>
//                 )}
//               </div>
//             </nav>

//             {/* Tablet Navigation (768px - 1023px) */}
//             <nav className="hidden sm:flex md:hidden items-center space-x-1">
//               <NavLink to="/relay">CTRL</NavLink>
//               <NavLink to="/analog-data">ANLG</NavLink>
//               <NavLink to="/events">EVNT</NavLink>
//               <NavLink to="/dr">DR</NavLink>
              
//               {/* Tablet Auth Section */}
//               <div className="flex items-center space-x-2 ml-3 pl-3 border-l border-gray-700">
//                 {isAuthenticated ? (
//                   <>
//                     {user && (
//                       <div className="flex items-center space-x-2 bg-gray-800 rounded px-2 py-1 border border-gray-700">
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                         <span className="text-xs text-gray-300 truncate max-w-[60px]">
//                           {user.username}
//                         </span>
//                       </div>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="bg-red-900 text-white px-2 py-1.5 rounded text-xs font-medium hover:bg-red-800 transition-colors border border-red-700"
//                     >
//                       OUT
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="bg-blue-800 text-white px-2 py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors border border-blue-600"
//                   >
//                     IN
//                   </button>
//                 )}
//               </div>
//             </nav>

//             {/* Mobile Menu Button - Show on small and medium screens */}
//             <div className="flex items-center md:hidden space-x-2">
//               {/* Mobile Auth Status */}
//               {isAuthenticated && user && (
//                 <div className="hidden xs:flex items-center space-x-2 bg-gray-800 rounded px-2 py-1 border border-gray-700">
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <span className="text-xs text-gray-300 truncate max-w-[80px] sm:max-w-[100px]">
//                     {user.username}
//                   </span>
//                 </div>
//               )}
              
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
//                 aria-label="Toggle menu"
//               >
//                 {isMenuOpen ? (
//                   <svg
//                     className="w-6 h-6 sm:w-7 sm:h-7"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="w-6 h-6 sm:w-7 sm:h-7"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <>
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//             onClick={() => setIsMenuOpen(false)}
//           />
          
//           {/* Mobile Menu Panel - Responsive width */}
//           <div className="fixed top-14 sm:top-16 right-0 w-full max-w-xs sm:max-w-sm h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-gray-900 border-l border-gray-800 shadow-xl z-40 md:hidden overflow-y-auto">
//             {/* Mobile Navigation Links */}
//             <div className="py-2">
//               <div className="px-2 py-3 mb-2 border-b border-gray-800">
//                 <span className="text-xs font-bold text-black uppercase tracking-wider px-4">
//                   NAVIGATION
//                 </span>
//               </div>
              
//               <NavLink to="/relay" mobile>CONTROL PANEL</NavLink>
//               <NavLink to="/analog-data" mobile>ANALOG DATA</NavLink>
//               <NavLink to="/events" mobile>EVENTS LOG</NavLink>
//               <NavLink to="/dr" mobile>DR</NavLink>
//               <NavLink to="/binary-input" mobile>BINARY INPUT/OUTPUT</NavLink>
//               <NavLink to="/history" mobile>HISTORY</NavLink>
//             </div>

//             {/* Mobile Auth Section */}
//             <div className="border-t border-gray-800 mt-4 pt-4">
//               <div className="px-2 py-3 mb-2">
//                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4">
//                   ACCOUNT
//                 </span>
//               </div>
              
//               {isAuthenticated ? (
//                 <>
//                   {user && (
//                     <div className="flex items-center py-3 px-4 bg-gray-800 mx-4 rounded border border-gray-700 mb-4">
//                       <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
//                       <div className="flex-1">
//                         <div className="text-sm font-medium text-white truncate">
//                           {user.username}
//                         </div>
//                         <div className="text-xs text-gray-400">
//                           Signed in • Active
//                         </div>
//                       </div>
//                     </div>
//                   )}
                  
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center justify-center w-full py-3 px-4 mx-4 mb-2 bg-red-900 text-white rounded text-sm font-medium hover:bg-red-800 transition-colors border border-red-700"
//                   >
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                     </svg>
//                     LOGOUT
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <div className="px-4 mb-4">
//                     <p className="text-xs text-gray-400 mb-2">
//                       Sign in to access all features
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setIsMenuOpen(false);
//                       navigate("/login");
//                     }}
//                     className="flex items-center justify-center w-full py-3 px-4 mx-4 mb-4 bg-blue-800 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors border border-blue-600"
//                   >
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                     </svg>
//                     LOGIN TO DASHBOARD
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Footer Info */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900">
//               <div className="text-center text-xs text-gray-500">
//                 TRANSYNC v1.0 • Industrial Automation System
//               </div>
//               <div className="text-center text-xs text-gray-600 mt-1">
//                 Responsive for all devices
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }









// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeNav, setActiveNav] = useState("");
//   const navigate = useNavigate();

//   // Add scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 5);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Set active nav based on current path
//   useEffect(() => {
//     const path = window.location.pathname;
//     setActiveNav(path);
//   }, []);

//   const checkAuth = async () => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const storedUser =
//       localStorage.getItem("user") || sessionStorage.getItem("user");

//     if (!token) {
//       setIsAuthenticated(false);
//       setUser(null);
//       return;
//     }

//     try {
//       if (storedUser) {
//         try {
//           const userData = JSON.parse(storedUser);
//           setUser(userData);
//           setIsAuthenticated(true);
//         } catch (e) {
//           console.error("Error parsing user data:", e);
//         }
//       }

//       const response = await axios.get(
//         "https://rp-875v.onrender.com/api/auth/verify",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.valid) {
//         setIsAuthenticated(true);

//         if (response.data.user) {
//           setUser(response.data.user);
//           const storage = localStorage.getItem("token")
//             ? localStorage
//             : sessionStorage;
//           storage.setItem("user", JSON.stringify(response.data.user));
//         }
//       }
//     } catch (err) {
//       // console.error("Token verification failed:", err);
//     }
//   };

//   useEffect(() => {
//     // Check auth on component mount
//     checkAuth();
    
//     // Listen for custom auth change event
//     const handleAuthChange = () => checkAuth();
//     window.addEventListener("authChange", handleAuthChange);
    
//     // Listen for storage changes
//     const handleStorageChange = (e) => {
//       if (e.key === "token" || e.key === "user") {
//         checkAuth();
//       }
//     };
//     window.addEventListener("storage", handleStorageChange);
//   }, []);

//   const clearAuthData = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("user");
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   const handleLogout = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") ||
//         sessionStorage.getItem("token");
//       if (token) {
//         await axios
//           .post(
//             "https://rp-875v.onrender.com/api/auth/logout",
//             {},
//             { headers: { Authorization: `Bearer ${token}` } }
//           )
//           .catch(console.log);
//       }

//       clearAuthData();
//       window.dispatchEvent(new Event("authChange"));
//       setIsMenuOpen(false);
//       navigate("/");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   // Function to handle protected navigation
//   const handleProtectedNavigation = (to, mobile = false) => {
//     const protectedRoutes = ["/relay", "/analog-data", "/binary-input"];
    
//     if (protectedRoutes.includes(to) && !isAuthenticated) {
//       navigate("/login");
//       if (mobile) {
//         setIsMenuOpen(false);
//       }
//       return false;
//     }
    
//     checkAuth();
//     setActiveNav(to);
//     if (mobile) {
//       setIsMenuOpen(false);
//     }
//     return true;
//   };

//   const NavLink = ({ to, children, mobile = false }) => {
//     const isActive = activeNav === to;
//     const isProtected = ["/relay", "/analog-data", "/binary-input"].includes(to);
//     const requiresAuth = isProtected && !isAuthenticated;

//     const handleClick = (e) => {
//       e.preventDefault();
//       const canNavigate = handleProtectedNavigation(to, mobile);
//       if (canNavigate) {
//         navigate(to);
//       }
//     };

//     if (mobile) {
//       return (
//         <a
//           href={to}
//           onClick={handleClick}
//           className={`flex items-center py-4 px-6 transition-all duration-300 group relative overflow-hidden ${
//             isActive 
//               ? "bg-gradient-to-r from-[#0AC4E0]/10 to-blue-100 text-gray-900 border-l-4 border-[#0AC4E0]" 
//               : "text-gray-700 hover:bg-gray-100 hover:border-l-4 hover:border-[#0AC4E0]/50"
//           } ${requiresAuth ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
//         >
//           {/* Animated background effect */}
//           <div className={`absolute inset-0 bg-gradient-to-r from-[#0AC4E0]/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ${isActive ? 'translate-x-0' : ''}`}></div>
          
//           <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 group-hover:scale-125 ${
//             isActive ? "bg-[#0AC4E0] shadow-lg shadow-[#0AC4E0]/30" : "bg-gray-400 group-hover:bg-[#0AC4E0]"
//           }`}></div>
//           <span className="font-medium text-sm sm:text-base relative z-10">{children}</span>
//           {requiresAuth && (
//             <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
//               Login Required
//             </span>
//           )}
//         </a>
//       );
//     }
    

//     return (
//       <a
//         href={to}
//         onClick={handleClick}
//         className={`relative py-2 px-3 lg:px-4 font-medium tracking-wide transition-all duration-300 group ${
//           isActive 
//             ? "text-[#0AC4E0] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#0AC4E0] after:to-blue-400" 
//             : "text-gray-600 hover:text-gray-900"
//         } ${requiresAuth ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} text-sm lg:text-base`}
//       >
//         <span className="relative z-10 flex items-center">
//           {children}
//           {!isAuthenticated && isProtected && (
//             <span className="ml-1.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
//           )}
//         </span>
        
//         {/* Hover effect */}
//         <span className={`absolute inset-0 bg-gradient-to-r from-[#0AC4E0]/0 via-[#0AC4E0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}></span>
        
//         {/* Active indicator dot */}
//         {isActive && (
//           <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#0AC4E0] rounded-full shadow-lg shadow-[#0AC4E0]/30"></span>
//         )}
//       </a>
//     );
//   };

//   return (
//     <>
//       <header
//         className={`sticky top-0 z-50 w-full transition-all duration-500 ${
//           isScrolled
//             ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200"
//             : "bg-white border-b border-gray-200"
//         }`}
//       >
//         {/* Top gradient line */}
//         <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0AC4E0] via-blue-400 to-[#0AC4E0]"></div>
        
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
//           <div className="flex items-center justify-between h-14 sm:h-16">
//             {/* Logo - Enhanced with better animations */}
//             <Link
//               to="/"
//               className="flex items-center space-x-2 sm:space-x-3 group"
//               onClick={() => setActiveNav("/")}
//             >
//               <div className="relative">
//                 <div className="absolute inset-0  rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
//                 <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-200 group-hover:border-[#0AC4E0]/60 transition-all duration-300 transform shadow-sm">
//                   <span className="text-base sm:text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0AC4E0] to-blue-600">TS</span>
//                 </div>
//               </div>
//               <div className="flex flex-col leading-tight">
//                 <span className="text-base sm:text-lg md:text-xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight">
//                   TRANSYNC
//                 </span>
//                 <span className="text-xs text-black font-bold hidden sm:block transition-colors duration-300">
//                   Industrial Automation
//                 </span>
//               </div>
//             </Link>

//             {/* Desktop Navigation - Enhanced with better styling */}
//             <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
//               <NavLink to="/relay">CONTROL</NavLink>
//               <NavLink to="/analog-data">ANALOG</NavLink>
//               <NavLink to="/events">EVENTS</NavLink>
//               <NavLink to="/dr">DR</NavLink>
//               <NavLink to="/binary-input">BI/BO</NavLink>
//               <NavLink to="/history">HISTORY</NavLink>

//               {/* Auth Section - Desktop with enhanced styling */}
//               <div className="flex items-center space-x-2 sm:space-x-3 ml-4 pl-4 border-l border-gray-200">
//                 {isAuthenticated ? (
//                   <>
//                     {user && (
//                       <div className="group relative hidden sm:flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-white rounded-full px-4 py-1.5 border border-gray-200 hover:border-[#0AC4E0]/30 transition-all duration-300 shadow-sm">
//                         <div className="relative">
//                           <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
//                           <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-50"></div>
//                         </div>
//                         <span className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-900 transition-colors truncate max-w-[100px] lg:max-w-[120px] xl:max-w-[140px]">
//                           {user.username}
//                         </span>
                        
//                         {/* Tooltip */}
//                         <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-700">
//                           Logged in as {user.username}
//                         </div>
//                       </div>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 border border-red-400/30 whitespace-nowrap"
//                     >
//                       <span className="relative z-10 flex items-center">
//                         <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                         </svg>
//                         LOGOUT
//                       </span>
//                       <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="group relative overflow-hidden bg-gradient-to-r from-[#0AC4E0] to-blue-500 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:from-[#0AC4E0] hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#0AC4E0]/30 border border-[#0AC4E0]/30 whitespace-nowrap"
//                   >
//                     <span className="relative z-10 flex items-center">
//                       <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                       </svg>
//                       LOGIN
//                     </span>
//                     <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
//                   </button>
//                 )}
//               </div>
//             </nav>

//             {/* Tablet Navigation (768px - 1023px) - Enhanced */}
//             <nav className="hidden sm:flex md:hidden items-center space-x-1">
//               <NavLink to="/relay">CTRL</NavLink>
//               <NavLink to="/analog-data">ANLG</NavLink>
//               <NavLink to="/events">EVNT</NavLink>
//               <NavLink to="/dr">DR</NavLink>
              
//               {/* Tablet Auth Section - Enhanced */}
//               <div className="flex items-center space-x-2 ml-3 pl-3 border-l border-gray-200">
//                 {isAuthenticated ? (
//                   <>
//                     {user && (
//                       <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-white rounded-full px-2 py-1 border border-gray-200 shadow-sm">
//                         <div className="relative">
//                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                         </div>
//                         <span className="text-xs text-gray-700 truncate max-w-[60px]">
//                           {user.username}
//                         </span>
//                       </div>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1.5 rounded-full text-xs font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 border border-red-400/30 shadow-sm"
//                     >
//                       OUT
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="bg-gradient-to-r from-[#0AC4E0] to-blue-500 text-white px-2 py-1.5 rounded-full text-xs font-medium hover:from-[#0AC4E0] hover:to-blue-600 transition-all duration-300 border border-[#0AC4E0]/30 shadow-sm"
//                   >
//                     IN
//                   </button>
//                 )}
//               </div>
//             </nav>

//             {/* Mobile Menu Button - Enhanced */}
//             <div className="flex items-center md:hidden space-x-2">
//               {/* Mobile Auth Status - Enhanced */}
//               {isAuthenticated && user && (
//                 <div className="hidden xs:flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-white rounded-full px-2 py-1.5 border border-gray-200 shadow-sm">
//                   <div className="relative">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                   </div>
//                   <span className="text-xs text-gray-700 truncate max-w-[80px] sm:max-w-[100px]">
//                     {user.username}
//                   </span>
//                 </div>
//               )}
              
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="relative group p-2 rounded-full bg-gradient-to-r from-gray-50 to-white text-gray-600 hover:text-[#0AC4E0] focus:outline-none border border-gray-200 hover:border-[#0AC4E0]/50 transition-all duration-300 shadow-sm"
//                 aria-label="Toggle menu"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#0AC4E0]/0 to-[#0AC4E0]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 {isMenuOpen ? (
//                   <svg
//                     className="w-6 h-6 sm:w-7 sm:h-7 relative z-10"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="w-6 h-6 sm:w-7 sm:h-7 relative z-10"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu Overlay - Enhanced with better animations */}
//       {isMenuOpen && (
//         <>
//           {/* Backdrop with blur */}
//           <div
//             className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
//             onClick={() => setIsMenuOpen(false)}
//           />
          
//           {/* Mobile Menu Panel - Enhanced with gradient and animations */}
//           <div className="fixed top-14 sm:top-16 right-0 w-full max-w-sm h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-white border-l border-gray-200 shadow-2xl z-40 md:hidden overflow-y-auto animate-slideIn">
//             {/* Decorative top gradient */}
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0AC4E0] via-blue-400 to-[#0AC4E0]"></div>
            
//             {/* User Profile Section (if authenticated) */}
//             {isAuthenticated && user && (
//               <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#0AC4E0]/5 to-transparent">
//                 <div className="flex items-center space-x-4">
//                   <div className="relative">
//                     <div className="w-14 h-14 bg-gradient-to-br from-[#0AC4E0] to-blue-500 rounded-2xl flex items-center justify-center shadow-md">
//                       <span className="text-2xl font-black text-white">
//                         {user.username?.charAt(0).toUpperCase() || 'U'}
//                       </span>
//                     </div>
//                     <div className="absolute -bottom-1 -right-1">
//                       <div className="relative">
//                         <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
//                         <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-50"></div>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-lg font-bold text-gray-800">{user.username}</div>
//                     <div className="text-xs text-[#0AC4E0] font-medium flex items-center">
//                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
//                       Active • Signed in
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Mobile Navigation Links */}
//             <div className="py-3">
//               <div className="px-6 py-3 mb-2">
//                 <span className="text-xs font-bold text-[#0AC4E0] uppercase tracking-wider">
//                   NAVIGATION
//                 </span>
//               </div>
              
//               <NavLink to="/relay" mobile>CONTROL PANEL</NavLink>
//               <NavLink to="/analog-data" mobile>ANALOG DATA</NavLink>
//               <NavLink to="/events" mobile>EVENTS</NavLink>
//               <NavLink to="/dr" mobile>DR</NavLink>
//               <NavLink to="/binary-input" mobile>BI/BO</NavLink>
//               <NavLink to="/history" mobile>HISTORY</NavLink>
//             </div>

//             {/* Mobile Auth Section - Enhanced */}
//             <div className="border-t border-gray-100 mt-4 pt-4">
//               <div className="px-6 py-3 mb-2">
//                 <span className="text-xs font-bold text-[#0AC4E0] uppercase tracking-wider">
//                   ACCOUNT
//                 </span>
//               </div>
              
//               {isAuthenticated ? (
//                 <>
//                   <button
//                     onClick={handleLogout}
//                     className="group relative overflow-hidden mx-6 mb-4 flex items-center justify-center w-[calc(100%-3rem)] py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/30 border border-red-400/30"
//                   >
//                     <span className="relative z-10 flex items-center">
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                       </svg>
//                       LOGOUT
//                     </span>
//                     <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <div className="px-6 mb-4">
//                     <p className="text-sm text-gray-500 mb-3">
//                       Sign in to access all features
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setIsMenuOpen(false);
//                       navigate("/login");
//                     }}
//                     className="group relative overflow-hidden mx-6 mb-6 flex items-center justify-center w-[calc(100%-3rem)] py-4 bg-gradient-to-r from-[#0AC4E0] to-blue-500 text-white rounded-xl text-sm font-medium hover:from-[#0AC4E0] hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#0AC4E0]/30 border border-[#0AC4E0]/30"
//                   >
//                     <span className="relative z-10 flex items-center">
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                       </svg>
//                       LOGIN TO DASHBOARD
//                     </span>
//                     <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Footer Info */}
//             <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//               <div className="text-center text-xs font-medium text-gray-500">
//                 <span className="text-[#0AC4E0]">TRANSYNC</span> v1.0 • Industrial Automation System
//               </div>
//               <div className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center">
//                 <span className="w-1.5 h-1.5 bg-[#0AC4E0] rounded-full mr-2 animate-pulse"></span>
//                 Responsive for all devices
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Global Styles for animations */}
//       <style >{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out forwards;
//         }
        
//         .animate-slideIn {
//           animation: slideIn 0.3s ease-out forwards;
//         }
//       `}</style>
//     </>
//   );
// }







import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const navigate = useNavigate();

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set active nav based on current path
  useEffect(() => {
    const path = window.location.pathname;
    setActiveNav(path);
  }, []);

  const checkAuth = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }

      const response = await axios.get(
        "https://rp-875v.onrender.com/api/auth/verify",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.valid) {
        setIsAuthenticated(true);

        if (response.data.user) {
          setUser(response.data.user);
          const storage = localStorage.getItem("token")
            ? localStorage
            : sessionStorage;
          storage.setItem("user", JSON.stringify(response.data.user));
        }
      }
    } catch (err) {
      // console.error("Token verification failed:", err);
    }
  };

  useEffect(() => {
    // Check auth on component mount
    checkAuth();
    
    // Listen for custom auth change event
    const handleAuthChange = () => checkAuth();
    window.addEventListener("authChange", handleAuthChange);
    
    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "user") {
        checkAuth();
      }
    };
    window.addEventListener("storage", handleStorageChange);
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleLogout = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");
      if (token) {
        await axios
          .post(
            "https://rp-875v.onrender.com/api/auth/logout",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .catch(console.log);
      }

      clearAuthData();
      window.dispatchEvent(new Event("authChange"));
      setIsMenuOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Function to handle protected navigation
  const handleProtectedNavigation = (to, mobile = false) => {
    // Updated protected routes to include DR, EVENTS, and HISTORY
    const protectedRoutes = [
      "/relay", 
      "/analog-data", 
      "/binary-input",
      "/dr",
      "/events",
      // "/history"
    ];
    
    if (protectedRoutes.includes(to) && !isAuthenticated) {
      navigate("/login");
      if (mobile) {
        setIsMenuOpen(false);
      }
      return false;
    }
    
    checkAuth();
    setActiveNav(to);
    if (mobile) {
      setIsMenuOpen(false);
    }
    return true;
  };

  const NavLink = ({ to, children, mobile = false }) => {
    const isActive = activeNav === to;
    // Updated protected routes to include DR, EVENTS, and HISTORY
    const protectedRoutes = [
      "/relay", 
      "/analog-data", 
      "/binary-input",
      "/dr",
      "/events",
      // "/history"
    ];
    const isProtected = protectedRoutes.includes(to);
    const requiresAuth = isProtected && !isAuthenticated;

    const handleClick = (e) => {
      e.preventDefault();
      const canNavigate = handleProtectedNavigation(to, mobile);
      if (canNavigate) {
        navigate(to);
      }
    };

    if (mobile) {
      return (
        <a
          href={to}
          onClick={handleClick}
          className={`flex items-center py-4 px-6 transition-all duration-300 group relative overflow-hidden ${
            isActive 
              ? "bg-gradient-to-r from-[#0AC4E0]/10 to-blue-100 text-gray-900 border-l-4 border-[#0AC4E0]" 
              : "text-gray-700 hover:bg-gray-100 hover:border-l-4 hover:border-[#0AC4E0]/50"
          } ${requiresAuth ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {/* Animated background effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-[#0AC4E0]/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ${isActive ? 'translate-x-0' : ''}`}></div>
          
          <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 group-hover:scale-125 ${
            isActive ? "bg-[#0AC4E0] shadow-lg shadow-[#0AC4E0]/30" : "bg-gray-400 group-hover:bg-[#0AC4E0]"
          }`}></div>
          <span className="font-medium text-sm sm:text-base relative z-10">{children}</span>
          {requiresAuth && (
            <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
              Login Required
            </span>
          )}
        </a>
      );
    }
    

    return (
      <a
        href={to}
        onClick={handleClick}
        className={`relative py-2 px-3 lg:px-4 font-medium tracking-wide transition-all duration-300 group ${
          isActive 
            ? "text-[#0AC4E0] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#0AC4E0] after:to-blue-400" 
            : "text-gray-600 hover:text-gray-900"
        } ${requiresAuth ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} text-sm lg:text-base`}
      >
        <span className="relative z-10 flex items-center">
          {children}
          {!isAuthenticated && isProtected && (
            <span className="ml-1.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          )}
        </span>
        
        {/* Hover effect */}
        <span className={`absolute inset-0 bg-gradient-to-r from-[#0AC4E0]/0 via-[#0AC4E0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}></span>
        
        {/* Active indicator dot */}
        {isActive && (
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#0AC4E0] rounded-full shadow-lg shadow-[#0AC4E0]/30"></span>
        )}
      </a>
    );
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200"
            : "bg-white border-b border-gray-200"
        }`}
      >
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0AC4E0] via-blue-400 to-[#0AC4E0]"></div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo - Enhanced with better animations */}
            <Link
              to="/"
              className="flex items-center space-x-2 sm:space-x-3 group"
              onClick={() => setActiveNav("/")}
            >
              <div className="relative">
                <div className="absolute inset-0  rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center border border-gray-200 group-hover:border-[#0AC4E0]/60 transition-all duration-300 transform shadow-sm">
                  <span className="text-base sm:text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0AC4E0] to-blue-600">TS</span>
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base sm:text-lg md:text-xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight">
                  TRANSYNC
                </span>
                <span className="text-xs text-black font-bold hidden sm:block transition-colors duration-300">
                  BUS TRANSFER SYSTEM
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Enhanced with better styling */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <NavLink to="/relay">CONTROL</NavLink>
              <NavLink to="/analog-data">ANALOG</NavLink>
              <NavLink to="/events">EVENTS</NavLink>
              <NavLink to="/dr">DR</NavLink>
              <NavLink to="/binary-input">BI/BO</NavLink>
              {/* <NavLink to="/history">HISTORY</NavLink> */}

              {/* Auth Section - Desktop with enhanced styling */}
              <div className="flex items-center space-x-2 sm:space-x-3 ml-4 pl-4 border-l border-gray-200">
                {isAuthenticated ? (
                  <>
                    {user && (
                      <div className="group relative hidden sm:flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-white rounded-full px-4 py-1.5 border border-gray-200 hover:border-[#0AC4E0]/30 transition-all duration-300 shadow-sm">
                        <div className="relative">
                          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-50"></div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-900 transition-colors truncate max-w-[100px] lg:max-w-[120px] xl:max-w-[140px]">
                          {user.username}
                        </span>
                        
                        {/* Tooltip */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-700">
                          Logged in as {user.username}
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleLogout}
                      className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 border border-red-400/30 whitespace-nowrap"
                    >
                      <span className="relative z-10 flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        LOGOUT
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="group relative overflow-hidden bg-gradient-to-r from-[#0AC4E0] to-blue-500 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:from-[#0AC4E0] hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#0AC4E0]/30 border border-[#0AC4E0]/30 whitespace-nowrap"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      LOGIN
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  </button>
                )}
              </div>
            </nav>

            {/* Tablet Navigation (768px - 1023px) - Enhanced */}
            <nav className="hidden sm:flex md:hidden items-center space-x-1">
              <NavLink to="/relay">CTRL</NavLink>
              <NavLink to="/analog-data">ANLG</NavLink>
              <NavLink to="/events">EVNT</NavLink>
              <NavLink to="/dr">DR</NavLink>
              
              {/* Tablet Auth Section - Enhanced */}
              <div className="flex items-center space-x-2 ml-3 pl-3 border-l border-gray-200">
                {isAuthenticated ? (
                  <>
                    {user && (
                      <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-white rounded-full px-2 py-1 border border-gray-200 shadow-sm">
                        <div className="relative">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-xs text-gray-700 truncate max-w-[60px]">
                          {user.username}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={handleLogout}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1.5 rounded-full text-xs font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 border border-red-400/30 shadow-sm"
                    >
                      OUT
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-gradient-to-r from-[#0AC4E0] to-blue-500 text-white px-2 py-1.5 rounded-full text-xs font-medium hover:from-[#0AC4E0] hover:to-blue-600 transition-all duration-300 border border-[#0AC4E0]/30 shadow-sm"
                  >
                    IN
                  </button>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button - Enhanced */}
            <div className="flex items-center md:hidden space-x-2">
              {/* Mobile Auth Status - Enhanced */}
              {isAuthenticated && user && (
                <div className="hidden xs:flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-white rounded-full px-2 py-1.5 border border-gray-200 shadow-sm">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-xs text-gray-700 truncate max-w-[80px] sm:max-w-[100px]">
                    {user.username}
                  </span>
                </div>
              )}
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative group p-2 rounded-full bg-gradient-to-r from-gray-50 to-white text-gray-600 hover:text-[#0AC4E0] focus:outline-none border border-gray-200 hover:border-[#0AC4E0]/50 transition-all duration-300 shadow-sm"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0AC4E0]/0 to-[#0AC4E0]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Enhanced with better animations */}
      {isMenuOpen && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel - Enhanced with gradient and animations */}
          <div className="fixed top-14 sm:top-16 right-0 w-full max-w-sm h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-white border-l border-gray-200 shadow-2xl z-40 md:hidden overflow-y-auto animate-slideIn">
            {/* Decorative top gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0AC4E0] via-blue-400 to-[#0AC4E0]"></div>
            
            {/* User Profile Section (if authenticated) */}
            {isAuthenticated && user && (
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#0AC4E0]/5 to-transparent">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0AC4E0] to-blue-500 rounded-2xl flex items-center justify-center shadow-md">
                      <span className="text-2xl font-black text-white">
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      <div className="relative">
                        <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-50"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">{user.username}</div>
                    <div className="text-xs text-[#0AC4E0] font-medium flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                      Active • Signed in
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation Links */}
            <div className="py-3">
              <div className="px-6 py-3 mb-2">
                <span className="text-xs font-bold text-[#0AC4E0] uppercase tracking-wider">
                  NAVIGATION
                </span>
              </div>
              
              <NavLink to="/relay" mobile>CONTROL PANEL</NavLink>
              <NavLink to="/analog-data" mobile>ANALOG DATA</NavLink>
              <NavLink to="/events" mobile>EVENTS</NavLink>
              <NavLink to="/dr" mobile>DR</NavLink>
              <NavLink to="/binary-input" mobile>BI/BO</NavLink>
              {/* <NavLink to="/history" mobile>HISTORY</NavLink> */}
            </div>

            {/* Mobile Auth Section - Enhanced */}
            <div className="border-t border-gray-100 mt-4 pt-4">
              <div className="px-6 py-3 mb-2">
                <span className="text-xs font-bold text-[#0AC4E0] uppercase tracking-wider">
                  ACCOUNT
                </span>
              </div>
              
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="group relative overflow-hidden mx-6 mb-4 flex items-center justify-center w-[calc(100%-3rem)] py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/30 border border-red-400/30"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      LOGOUT
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  </button>
                </>
              ) : (
                <>
                  <div className="px-6 mb-4">
                    <p className="text-sm text-gray-500 mb-3">
                      Sign in to access all features
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/login");
                    }}
                    className="group relative overflow-hidden mx-6 mb-6 flex items-center justify-center w-[calc(100%-3rem)] py-4 bg-gradient-to-r from-[#0AC4E0] to-blue-500 text-white rounded-xl text-sm font-medium hover:from-[#0AC4E0] hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#0AC4E0]/30 border border-[#0AC4E0]/30"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      LOGIN TO DASHBOARD
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  </button>
                </>
              )}
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="text-center text-xs font-medium text-gray-500">
                <span className="text-[#0AC4E0]">TRANSYNC</span> v1.0 • Industrial Automation System
              </div>
              <div className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-[#0AC4E0] rounded-full mr-2 animate-pulse"></span>
                Responsive for all devices
              </div>
            </div>
          </div>
        </>
      )}

      {/* Global Styles for animations */}
      <style >{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}