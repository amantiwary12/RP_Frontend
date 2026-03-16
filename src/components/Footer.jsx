// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Footer = () => {
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     navigate(path);
//     // Scroll to top after navigation
//     window.scrollTo(0, 0);
//   };

//   // Theme color: #0AC4E0
//   const themeColor = "#0AC4E0";

//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gradient-to-br from-gray-900 via-[#0A2B30] to-[#0A3A40] text-gray-300 mt-auto border-t border-[#0AC4E0]/20 relative overflow-hidden">
//       {/* Decorative background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0AC4E0]/5 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0A8B9F]/5 rounded-full blur-3xl"></div>
//       </div>

//       {/* Main footer content */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative z-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
//           {/* Company info & Social Media */}
//           <div className="space-y-4 sm:space-y-5">
//             <div className="flex items-center group">
//               <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#0AC4E0] to-[#0A8B9F] rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base mr-2 sm:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
//                 TS
//               </div>
//               <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] bg-clip-text text-transparent">
//                 TransSync
//               </h3>
//             </div>

//             <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
//               Advanced monitoring and control software for BTS-2000.
//             </p>

//             {/* Social Media Links */}
//             <div className="pt-2">
//               <h4 className="text-sm font-semibold text-[#0AC4E0] mb-3">
//                 Connect With Us
//               </h4>
//               <div className="flex flex-wrap gap-3">
//                 <a
//                   href="https://linkedin.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-gray-800/50 p-2 sm:p-2.5 rounded-lg hover:bg-[#0AC4E0] hover:text-white transition-all duration-300 group border border-gray-700 hover:border-[#0AC4E0]"
//                   aria-label="LinkedIn"
//                 >
//                   <svg
//                     className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                   </svg>
//                 </a>
//                 <a
//                   href="https://instagram.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-gray-800/50 p-2 sm:p-2.5 rounded-lg hover:bg-[#0AC4E0] hover:text-white transition-all duration-300 group border border-gray-700 hover:border-[#0AC4E0]"
//                   aria-label="Instagram"
//                 >
//                   <svg
//                     className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
//                   </svg>
//                 </a>
//                 <a
//                   href="https://twitter.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-gray-800/50 p-2 sm:p-2.5 rounded-lg hover:bg-[#0AC4E0] hover:text-white transition-all duration-300 group border border-gray-700 hover:border-[#0AC4E0]"
//                   aria-label="Twitter"
//                 >
//                   <svg
//                     className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.775-3.374 14.5 14.5 0 001.333-5.89c0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                   </svg>
//                 </a>
//                 <a
//                   href="https://facebook.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-gray-800/50 p-2 sm:p-2.5 rounded-lg hover:bg-[#0AC4E0] hover:text-white transition-all duration-300 group border border-gray-700 hover:border-[#0AC4E0]"
//                   aria-label="Facebook"
//                 >
//                   <svg
//                     className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                   </svg>
//                 </a>
//                 <a
//                   href="https://youtube.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-gray-800/50 p-2 sm:p-2.5 rounded-lg hover:bg-[#0AC4E0] hover:text-white transition-all duration-300 group border border-gray-700 hover:border-[#0AC4E0]"
//                   aria-label="YouTube"
//                 >
//                   <svg
//                     className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* About Links */}
//           <div>
//             <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#0AC4E0] border-b border-[#0AC4E0]/30 pb-2">
//               About
//             </h3>
//             <ul className="space-y-2 sm:space-y-3">
//               <li>
//                 <button
//                   onClick={() => handleNavigation("/about")}
//                   className="text-gray-300 hover:text-[#0AC4E0] transition-colors text-xs sm:text-sm block w-full text-left py-1 hover:translate-x-1 transform duration-200"
//                 >
//                   About Us
//                 </button>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Links */}
//           <div>
//             <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#0AC4E0] border-b border-[#0AC4E0]/30 pb-2">
//               Contact
//             </h3>
//             <ul className="space-y-2 sm:space-y-3">
//               <li>
//                 <button
//                   onClick={() => handleNavigation("/contact")}
//                   className="text-gray-300 hover:text-[#0AC4E0] transition-colors text-xs sm:text-sm block w-full text-left py-1 hover:translate-x-1 transform duration-200"
//                 >
//                   Contact Us
//                 </button>
//               </li>
//               {/* <li>
//                 <button
//                   onClick={() => handleNavigation("/sales")}
//                   className="text-gray-300 hover:text-[#0AC4E0] transition-colors text-xs sm:text-sm block w-full text-left py-1 hover:translate-x-1 transform duration-200"
//                 >
//                   Sales Inquiry
//                 </button>
//               </li> */}
//               <li>
//                 <button
//                   onClick={() => handleNavigation("/request-demo")}
//                   className="text-gray-300 hover:text-[#0AC4E0] transition-colors text-xs sm:text-sm block w-full text-left py-1 hover:translate-x-1 transform duration-200"
//                 >
//                   Request Demo
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => handleNavigation("/")}
//                   className="text-gray-300 hover:text-[#0AC4E0] transition-colors text-xs sm:text-sm block w-full text-left py-1 hover:translate-x-1 transform duration-200"
//                 >
//                   FAQ
//                 </button>
//               </li>
//             </ul>
//           </div>

//           {/* Address & Contact Info */}
//           <div>
//             <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#0AC4E0] border-b border-[#0AC4E0]/30 pb-2">
//               Visit Us
//             </h3>
//             <address className="text-gray-300 not-italic text-xs sm:text-sm space-y-3">
//               <p className="flex items-start">
//                 <svg
//                   className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 text-[#0AC4E0] flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//                 <span className="hover:text-[#0AC4E0] transition-colors">
//                   Aartech Solonics Limited,
//                   <br />
//                   Industrial Area,
//                   <br />
//                   Mandideep, Madhya Pradesh - 462046
//                 </span>
//               </p>

//               <p className="flex items-center">
//                 <svg
//                   className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#0AC4E0] flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                   />
//                 </svg>
//                 <span className="hover:text-[#0AC4E0] transition-colors">
//                   Helpline: +91 983583246
//                 </span>
//               </p>

//               <p className="flex items-center">
//                 <svg
//                   className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#0AC4E0] flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//                 <span className="hover:text-[#0AC4E0] transition-colors">
//                   support@transsync.in
//                 </span>
//               </p>

//               <p className="flex items-center">
//                 <svg
//                   className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#0AC4E0] flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
//                   />
//                 </svg>
//                <a href="https://aartechsolonics.com/" target="_blank"> <span className="hover:text-[#0AC4E0] transition-colors">
//                   www.aartecbts.com
//                 </span></a>
//               </p>
//             </address>

//             <div className="mt-4 sm:mt-6">
//               <button
//                 onClick={() => handleNavigation("/contact")}
//                 className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] hover:from-[#0A8B9F] hover:to-[#0AC4E0] text-white rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               >
//                 Contact Form
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="border-t border-[#0AC4E0]/20 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
//           <p className="text-gray-400 text-xs sm:text-sm order-2 sm:order-1">
//             © {currentYear} TransSync. All rights reserved. | Aartech Solonics
//             Limited
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };

  // Theme color: #0AC4E0
  const themeColor = "#0AC4E0";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-600 mt-auto border-t border-[#0AC4E0]/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0AC4E0]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0A8B9F]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Company info & Social Media */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#0AC4E0] to-[#0A8B9F] rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base mr-2 sm:mr-3 shadow-md group-hover:scale-110 transition-transform duration-300">
                TS
              </div>
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] bg-clip-text text-transparent">
                TransSync
              </h3>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Advanced monitoring and control software for BTS-2000.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-[#0AC4E0] mb-3">
                Connect With Us
              </h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://in.linkedin.com/company/aartech-solonics-limited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200/80 p-2 sm:p-2.5 rounded-lg hover:bg-[#0AC4E0] hover:text-white transition-all duration-300 group border border-gray-300 hover:border-[#0AC4E0]"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/aartech_solonics_ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200/80 p-2 sm:p-2.5 rounded-lg hover:bg-[#0AC4E0] hover:text-white transition-all duration-300 group border border-gray-300 hover:border-[#0AC4E0]"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200/80 p-2 sm:p-2.5 rounded-lg hover:bg-[#0AC4E0] hover:text-white transition-all duration-300 group border border-gray-300 hover:border-[#0AC4E0]"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.775-3.374 14.5 14.5 0 001.333-5.89c0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/aartechsolonicslimited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200/80 p-2 sm:p-2.5 rounded-lg hover:bg-[#0AC4E0] hover:text-white transition-all duration-300 group border border-gray-300 hover:border-[#0AC4E0]"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@aartechsolonicslimited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200/80 p-2 sm:p-2.5 rounded-lg hover:bg-[#0AC4E0] hover:text-white transition-all duration-300 group border border-gray-300 hover:border-[#0AC4E0]"
                  aria-label="YouTube"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#0AC4E0] border-b border-[#0AC4E0]/30 pb-2">
              About
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="text-gray-600 hover:text-[#0AC4E0] transition-colors text-xs sm:text-sm block w-full text-left py-1 hover:translate-x-1 transform duration-200"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#0AC4E0] border-b border-[#0AC4E0]/30 pb-2">
              Contact
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="text-gray-600 hover:text-[#0AC4E0] transition-colors text-xs sm:text-sm block w-full text-left py-1 hover:translate-x-1 transform duration-200"
                >
                  Contact Us
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => handleNavigation("/sales")}
                  className="text-gray-300 hover:text-[#0AC4E0] transition-colors text-xs sm:text-sm block w-full text-left py-1 hover:translate-x-1 transform duration-200"
                >
                  Sales Inquiry
                </button>
              </li> */}
              <li>
                <button
                  onClick={() => handleNavigation("/request-demo")}
                  className="text-gray-600 hover:text-[#0AC4E0] transition-colors text-xs sm:text-sm block w-full text-left py-1 hover:translate-x-1 transform duration-200"
                >
                  Request Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Address & Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#0AC4E0] border-b border-[#0AC4E0]/30 pb-2">
              Visit Us
            </h3>
            <address className="text-gray-600 not-italic text-xs sm:text-sm space-y-3">
              <a
                href="https://maps.app.goo.gl/a35PiMctxiwjySoi7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start hover:text-[#0AC4E0] transition-colors"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 text-[#0AC4E0] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span>
                  Aartech Solonics Limited,
                  <br />
                  Industrial Area,
                  <br />
                  Mandideep, Madhya Pradesh - 462046
                </span>
              </a>

              <p className="flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#0AC4E0] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <a
                  href="tel:+919835383246"
                  className="hover:text-[#0AC4E0] transition-colors"
                >
                  Helpline: +91 9835383246
                </a>
              </p>

              <p className="flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#0AC4E0] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:amantiwary2505@gmail.com"
                  className="hover:text-[#0AC4E0] transition-colors"
                >
                  rjha@aartechsolonics.com
                </a>
              </p>

              <p className="flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#0AC4E0] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <a
                  href="https://aartechsolonics.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="hover:text-[#0AC4E0] transition-colors">
                    www.aartechsolonics.com
                  </span>
                </a>
              </p>
            </address>

            <div className="mt-4 sm:mt-6">
              <button
                onClick={() => handleNavigation("/contact")}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] hover:from-[#0A8B9F] hover:to-[#0AC4E0] text-white rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Contact Form
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#0AC4E0]/20 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <p className="text-gray-500 text-xs sm:text-sm order-2 sm:order-1">
            © {currentYear} TransSync. All rights reserved. | Aartech Solonics
            Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
