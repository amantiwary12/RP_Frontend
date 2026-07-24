// import React ,{ useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import heroVideo from "../assets/BSDTN.mp4";
// import aartech from "../assets/aartech.jpg";

// const HeroPage = () => {
//   const [videoLoaded, setVideoLoaded] = useState(false);
//   const [videoError, setVideoError] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     // Try to load video manually if needed
//     if (videoRef.current) {
//       videoRef.current.load();
//     }

//     // Check if user has a theme preference
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'light') {
//       setIsDarkMode(false);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     localStorage.setItem('theme', newMode ? 'dark' : 'light');
//   };

//   const handleVideoLoad = () => {
//     setVideoLoaded(true);
//     setVideoError(false);
//   };

//   const handleVideoError = () => {
//     console.error("Failed to load video:", heroVideo);
//     setVideoError(true);
//     setVideoLoaded(false);
//   };

//   const downloadUrl = "https://drive.google.com/uc?export=download&id=1LVVNo5PprTfdruTreRKEG1HWsKrtv8FN";

//   const handleDownload = () => {
//     if (downloadUrl) {
//       window.open(downloadUrl, "_blank");
//     } else {
//       alert("Brochure link coming soon!");
//     }
//   };

//   // Theme classes - Video overlay removed from light mode
//   const themeClasses = {
//     container: isDarkMode
//       ? "text-gray-200 bg-gray-900"
//       : "text-gray-800 bg-gray-50",
//     heroText: isDarkMode ? "text-white" : "text-gray-800",
//     heroSubtitle: isDarkMode ? "text-gray-300" : "text-gray-700",
//     heroDescription: isDarkMode ? "text-gray-400" : "text-gray-600",
//     badge: isDarkMode
//       ? "bg-gray-800 text-blue-400 border-gray-700"
//       : "bg-white text-blue-600 border-blue-200 shadow-sm",
//     badgeDot: "w-2 h-2 bg-green-500 rounded-full mr-2",
//     title: isDarkMode ? "text-white" : "text-gray-900",
//     highlight: isDarkMode ? "text-blue-400" : "text-blue-600",
//     statsCard: isDarkMode
//       ? "bg-gray-800/50 border-gray-700"
//       : "bg-white border-gray-200 shadow-sm",
//     statsValue: isDarkMode ? "text-blue-400" : "text-blue-600",
//     statsLabel: isDarkMode ? "text-gray-400" : "text-gray-600",
//     buttonPrimary: isDarkMode
//       ? "bg-blue-800 text-white border-blue-700 hover:bg-blue-700"
//       : "bg-blue-600 text-white border-blue-500 hover:bg-blue-700 shadow-sm hover:shadow",
//     buttonSecondary: isDarkMode
//       ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
//       : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 shadow-sm hover:shadow",
//     section: isDarkMode
//       ? "bg-gray-900 border-gray-800"
//       : "bg-white border-gray-200",
//     sectionTitle: isDarkMode ? "text-white" : "text-gray-900",
//     sectionSubtitle: isDarkMode ? "text-gray-400" : "text-gray-600",
//     specContainer: isDarkMode
//       ? "bg-gray-800 border-gray-700"
//       : "bg-white border-gray-200 shadow-lg",
//     specHeader: isDarkMode
//       ? "bg-gray-900 border-gray-700"
//       : "bg-blue-50 border-blue-200",
//     specHeaderText: isDarkMode ? "text-white" : "text-gray-900",
//     specHeaderSubtext: isDarkMode ? "text-blue-400" : "text-blue-700",
//     specRow: (i, value) => isDarkMode
//       ? !value
//         ? "bg-gray-900/50 font-bold text-gray-300"
//         : "hover:bg-gray-700/30"
//       : !value
//         ? "bg-gray-50 font-bold text-gray-700"
//         : "hover:bg-gray-50",
//     specText: (i, value) => isDarkMode
//       ? !value ? "text-gray-300" : "text-gray-400"
//       : !value ? "text-gray-700" : "text-gray-600",
//     specValue: isDarkMode ? "text-gray-300" : "text-gray-800",
//     specFooter: isDarkMode
//       ? "bg-gray-900 border-gray-700"
//       : "bg-blue-50 border-blue-200",
//     specFooterText: isDarkMode ? "text-gray-400" : "text-gray-700",
//     specFooterHighlight: isDarkMode ? "text-blue-400" : "text-blue-700",
//     ctaSection: isDarkMode
//       ? "bg-gray-800 border-gray-700"
//       : "bg-gray-50 border-gray-200",
//     ctaButton: isDarkMode
//       ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
//       : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 shadow-sm hover:shadow",
//     contactInfo: isDarkMode ? "text-gray-400" : "text-gray-600",
//     contactTitle: isDarkMode ? "text-gray-300" : "text-gray-800",
//     scrollIndicator: isDarkMode
//       ? "border-gray-700 bg-gray-600"
//       : "border-gray-300 bg-gray-400",
//     scrollText: "text-gray-500 text-xs uppercase tracking-wider",
//     logoContainer: isDarkMode
//       ? "bg-gray-900/80 backdrop-blur-sm border-blue-700"
//       : "bg-white/95 backdrop-blur-sm border-blue-300",
//     // VIDEO OVERLAY CHANGED: No white overlay in light mode
//     videoOverlay: isDarkMode
//       ? "bg-gradient-to-b from-black/70 via-black/50 to-black/70"
//       : "bg-gradient-to-b from-black/30 via-black/20 to-black/30", // Keep dark overlay but lighter
//     videoFallback: isDarkMode
//       ? "bg-gradient-to-br from-gray-900 to-gray-800"
//       : "bg-gradient-to-br from-gray-800 to-gray-900", // Keep dark fallback
//     patternOverlay: "absolute inset-0 z-10 opacity-10",
//     loadingOverlay: isDarkMode ? "bg-gray-900" : "bg-gray-900", // Keep dark loading
//     loadingText: isDarkMode ? "text-gray-400" : "text-gray-300"
//   };

//   return (
//     <div className={themeClasses.container}>
//       {/* Theme Toggle Button & Aartech Logo Container */}
//       <div className="fixed top-20 right-6 z-50 flex flex-col items-end space-y-3">
//         {/* Theme Toggle Button - Always visible */}
//         <button
//           onClick={toggleTheme}
//           className={`p-2 rounded-full ${
//             isDarkMode
//               ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
//               : 'bg-white hover:bg-gray-100 border border-gray-300 shadow-sm'
//           } transition-colors duration-300`}
//           aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//         >
//           {isDarkMode ? (
//             // Sun icon for light mode
//             <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//           ) : (
//             // Moon icon for dark mode
//             <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//             </svg>
//           )}
//         </button>

//         {/* Aartech Logo - Hidden on small devices, visible on medium and larger */}
//         <div className={`rounded-lg p-2 border shadow-lg ${themeClasses.logoContainer} hidden md:block`}>
//           <img
//             src={aartech}
//             alt="Aartech Logo"
//             className="h-20 w-auto object-contain"
//           />
//         </div>
//       </div>

//       {/* Hero Section with Video */}
//       <section className="relative py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen overflow-hidden">
//         {/* Background Video */}
//         <div className="absolute inset-0 z-0">
//           {!videoError ? (
//             <video
//               ref={videoRef}
//               autoPlay
//               loop
//               muted
//               playsInline
//               preload="auto"
//               poster="/hero.jpg"
//               onLoadedData={handleVideoLoad}
//               className="absolute w-full h-full object-cover"
//             >
//               <source src={heroVideo} type="video/mp4" />
//               {/* Your browser does not support the video tag. */}
//             </video>
//           ) : (
//             <div className={`absolute inset-0 ${themeClasses.videoFallback}`} />
//           )}

//           {/* Loading state */}
//           {!videoLoaded && !videoError && (
//             <div className={`absolute inset-0 flex items-center justify-center ${themeClasses.loadingOverlay}`}>
//               <div className="text-center">
//                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                 <p className={`mt-4 text-sm ${themeClasses.loadingText}`}>LOADING...</p>
//               </div>
//             </div>
//           )}

//           {/* Video Overlay - Same dark overlay for both themes, just lighter in light mode */}
//           <div className={`absolute inset-0 ${themeClasses.videoOverlay}`}></div>
//         </div>

//         {/* Pattern overlay - Only show in dark mode */}
//         {isDarkMode && (
//           <div className={themeClasses.patternOverlay}>
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
//                                 linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
//                 backgroundSize: "50px 50px",
//               }}
//             ></div>
//           </div>
//         )}

//         {/* Content */}
//         <div className="relative max-w-6xl mx-auto text-center z-20">
//           {/* Status Badge */}
//           <div className={`inline-flex items-center text-xs font-bold px-4 py-2 rounded border mb-6 tracking-wider ${themeClasses.badge}`}>
//             <div className={themeClasses.badgeDot}></div>
//             INDUSTRIAL BTS-2000 SYSTEM
//           </div>

//           {/* Main Title */}
//           <div className="mb-8">
//             <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight ${themeClasses.title}`}>
//               <span className={themeClasses.title}>BTS-2000</span>
//             </h1>
//             <h2 className={`text-xl sm:text-2xl font-medium mb-4 ${themeClasses.heroSubtitle}`}>
//               INDUSTRIAL BUS TRANSFER SYSTEM
//             </h2>
//           </div>

//           {/* Subtitle */}
//           <h3 className={`text-lg sm:text-xl font-medium mb-6 leading-relaxed max-w-2xl mx-auto ${themeClasses.heroSubtitle}`}>
//             Advanced Power Management & Control Platform
//             <br />
//             <span className={`font-bold ${themeClasses.highlight}`}>
//               99.9% UPTIME • REAL-TIME MONITORING
//             </span>
//           </h3>

//           {/* Description */}
//           <p className={`max-w-2xl mx-auto mb-8 text-sm leading-relaxed ${themeClasses.heroDescription}`}>
//             Enterprise-grade automatic transfer switch with remote control,
//             cloud monitoring, and industrial protocols for mission-critical
//             infrastructure.
//           </p>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
//             <a
//               href="/contact"
//               className={`font-bold px-8 py-3 rounded border transition-colors w-full sm:w-auto ${themeClasses.buttonPrimary}`}
//             >
//               INVESTMENT PROPOSAL
//             </a>
//             <a
//               href="#specifications"
//               className={`font-bold px-8 py-3 rounded border transition-colors w-full sm:w-auto ${themeClasses.buttonSecondary}`}
//             >
//               TECHNICAL SPECS
//             </a>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 overflow-hidden gap-4 max-w-md mx-auto">
//             {[
//               ["5", "INSTALLATIONS"],
//               ["99.9%", "UPTIME"],
//               ["<200ms", "TRANSFER"],
//             ].map(([value, label], index) => (
//               <div
//                 key={index}
//                 className={`text-center p-3 rounded border ${themeClasses.statsCard}`}
//               >
//                 <div className={`text-xl font-bold ${themeClasses.statsValue}`}>{value}</div>
//                 <div className={`text-xs uppercase tracking-wider mt-1 ${themeClasses.statsLabel}`}>
//                   {label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
//           <div className={themeClasses.scrollText}>
//             SCROLL
//           </div>
//           <div className={`w-6 h-10 border rounded-full flex justify-center mx-auto mt-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
//             <div className={`w-1 h-3 rounded-full mt-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`}></div>
//           </div>
//         </div>
//       </section>

//       {/* Specifications Section */}
//       <section
//         id="specifications"
//         className={`py-16 px-4 sm:px-6 lg:px-8 border-t ${themeClasses.section}`}
//       >
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <div className={`inline-flex items-center text-xs font-bold px-4 py-2 rounded border mb-4 tracking-wider ${themeClasses.badge}`}>
//               TECHNICAL SPECIFICATIONS
//             </div>
//             <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${themeClasses.sectionTitle}`}>
//               ENGINEERING SPECIFICATIONS
//             </h2>
//             <p className={`max-w-2xl mx-auto text-sm ${themeClasses.sectionSubtitle}`}>
//               Industrial-grade specifications for maximum reliability and
//               performance
//             </p>
//           </div>

//           {/* Specifications Grid */}
//           <div className={`rounded-lg border overflow-hidden ${themeClasses.specContainer}`}>
//             <div className={`px-6 py-4 border-b ${themeClasses.specHeader}`}>
//               <h3 className={`text-lg font-bold flex items-center ${themeClasses.specHeaderText}`}>
//                 <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
//                 BTS-2000 TECHNICAL SPECIFICATIONS
//                 <span className={`ml-auto text-sm font-normal ${themeClasses.specHeaderSubtext}`}>
//                   ENTERPRISE GRADE
//                 </span>
//               </h3>
//             </div>

//             <div className={`grid md:grid-cols-2 divide-x ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
//               {/* Left Column */}
//               <div>
//                 {[
//                   ["ELECTRICAL SPECIFICATIONS", ""],
//                   ["Rated Voltage", "415V AC ±10%"],
//                   ["Frequency", "50/60 Hz Auto-detection"],
//                   ["Transfer Time", "< 200ms (Typical)"],
//                   ["Withstand Current", "65kA / 1 Second"],
//                   ["Insulation Level", "2.5kV / 1 Minute"],
//                   ["", ""],
//                   ["PROTECTION FEATURES", ""],
//                   ["Overcurrent Protection", "Digital, Adjustable"],
//                   ["Short Circuit", "I²t Characteristic"],
//                   ["Phase Failure", "All-phase Monitoring"],
//                   ["Earth Fault", "Sensitive Protection"],
//                 ].map(([spec, value], i) => (
//                   <div
//                     key={i}
//                     className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${themeClasses.specRow(i, value)}`}
//                   >
//                     <div className="flex justify-between items-center">
//                       <span className={`font-medium ${themeClasses.specText(i, value)}`}>
//                         {spec}
//                       </span>
//                       {value && (
//                         <span className={`font-medium ${themeClasses.specValue}`}>
//                           {value}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Right Column */}
//               <div>
//                 {[
//                   ["CONTROL & COMMUNICATION", ""],
//                   ["Processor", "32-bit ARM Cortex-M7"],
//                   ["Memory", "2MB Flash, 1MB RAM"],
//                   ["Display", '7" Touch LCD'],
//                   ["Protocols", "Modbus, Ethernet, IEC 61850"],
//                   ["Cloud Ready", "AWS IoT, Azure Compatible"],
//                   ["", ""],
//                   ["ENVIRONMENTAL", ""],
//                   ["Enclosure Rating", "IP54 / IP65 (Optional)"],
//                   ["Temperature", "-10°C to +55°C"],
//                   ["Humidity", "5% to 95% Non-condensing"],
//                   ["Altitude", "Up to 2000m ASL"],
//                 ].map(([spec, value], i) => (
//                   <div
//                     key={i}
//                     className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${themeClasses.specRow(i, value)}`}
//                   >
//                     <div className="flex justify-between items-center">
//                       <span className={`font-medium ${themeClasses.specText(i, value)}`}>
//                         {spec}
//                       </span>
//                       {value && (
//                         <span className={`font-medium ${themeClasses.specValue}`}>
//                           {value}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Footer */}
//             <div className={`px-6 py-4 border-t ${themeClasses.specFooter}`}>
//               <div className="flex flex-col sm:flex-row justify-between items-center">
//                 <div className={`text-sm font-medium ${themeClasses.specFooterText}`}>
//                   CERTIFIED: IEC 60947-6-1 | ISO 9001:2015 | CE | UL
//                 </div>
//                 <div className={`font-bold text-sm mt-2 sm:mt-0 ${themeClasses.specFooterHighlight}`}>
//                   EXPECTED LIFESPAN: 5+ YEARS
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className={`py-16 px-4 sm:px-6 lg:px-8 border-t ${themeClasses.ctaSection}`}>
//         <div className="max-w-6xl mx-auto text-center">
//           {/* Main Heading */}
//           <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${themeClasses.sectionTitle}`}>
//             READY TO DEPLOY INDUSTRIAL SOLUTION?
//           </h2>

//           <p className={`mb-8 max-w-2xl mx-auto text-sm ${themeClasses.sectionSubtitle}`}>
//             Join industry leaders in adopting intelligent power transfer
//             technology.
//           </p>

//           {/* Button Group */}
//           <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">

//           <Link to="/contact"> <button className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-colors ${themeClasses.ctaButton}`}>
//               SCHEDULE DEMO
//             </button></Link>

//             <button
//               onClick={handleDownload}
//               className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-colors ${themeClasses.ctaButton}`}
//             >
//               DOWNLOAD BROCHURE
//             </button>

//             <button className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-colors ${themeClasses.ctaButton}`}>
//               <Link to="/about">ABOUT US</Link>
//             </button>

//             <Link to="/contact">
//               <button className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-colors ${themeClasses.ctaButton}`}>
//                 CONTACT
//               </button>
//             </Link>
//           </div>

//           {/* Contact Info */}
//           <div className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
//               <div className={themeClasses.contactInfo}>
//                 <div className={`font-bold mb-1 ${themeClasses.contactTitle}`}>SUPPORT</div>
//                 <div>24/7 Technical Support</div>
//                 <div>support@transync.com</div>
//               </div>
//               <div className={themeClasses.contactInfo}>
//                 <div className={`font-bold mb-1 ${themeClasses.contactTitle}`}>HEADQUARTERS</div>
//                 <div>Industrial Automation Division</div>
//                 <div>Delhi, India</div>
//               </div>
//               <div className={themeClasses.contactInfo}>
//                 <div className={`font-bold mb-1 ${themeClasses.contactTitle}`}>
//                   CERTIFICATION
//                 </div>
//                 <div>ISO 9001:2015</div>
//                 <div>IEC 60947-6-1</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HeroPage;

import React from "react";
import {
  Activity,
  Shield,
  Cpu,
  Network,
  BarChart3,
  Lock,
  Download,
  Calendar,
  ArrowRight,
  CheckCircle,
  Server,
  Zap,
  Globe,
  TrendingUp,
  PieChart,
  Settings,
  Bell,
  Cloud,
  Database,
  LineChart,
  AlertTriangle,
  Power,
  Wifi,
  Gauge,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom";
// import { div } from "@tensorflow/tfjs";
import aartech from "../assets/aartech.jpg";
import graph from "../assets/graph.png";
import diagram from "../assets/dragram.png";

const downloadUrl =
  "https://drive.google.com/file/d/1Y_Sgw2rIxca9vjtFMOkABh7nA5Xno79E/view?usp=sharing";

const handleDownload = () => {
  if (downloadUrl) {
    window.open(downloadUrl, "_blank");
  } else {
    alert("Brochure link coming soon!");
  }
};

export default function HomePage() {
  return (
    <div>
      <div>
        <div className="fixed z-50 top-24 right-6 rounded-md p-2 bg-slate-900 border border-slate-800 shadow-lg hidden md:block ">
          <img
            src={aartech}
            alt="Aartech Logo"
            className="h-20 w-auto object-contain"
          />
        </div>
      </div>
      <div className="min-h-screen relative bg-slate-950 text-slate-100">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden bg-slate-950 pt-32 pb-40 border-b border-slate-800">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://cdn.pixabay.com/photo/2016/09/02/18/38/factory-1639990_1280.jpg"
              alt="Industrial Power Grid Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(rgba(2,6,23,0.85), rgba(2,6,23,0.9))",
              }}
            ></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center bg-slate-900 rounded-md px-4 py-2 mb-8 border border-slate-800">
                  <Activity className="w-4 h-4 text-amber-500 mr-2" />
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                    Real-time Control & Monitoring Platform
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Digital Intelligence for
                  <span className="block text-amber-500">BTS2000 Systems</span>
                </h1>

                <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                  Enterprise-grade monitoring, predictive analytics, and secure
                  command interface engineered for mission-critical industrial
                  power transfer systems.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/request-demo">
                    <button className="group bg-amber-500 text-slate-950 px-8 py-4 rounded-md font-bold uppercase tracking-wide hover:bg-amber-400 transition-colors duration-200 flex items-center">
                      Schedule Demo
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
                    </button>
                  </Link>
                  <button
                    onClick={handleDownload}
                    className="bg-transparent border border-slate-700 text-white px-8 py-4 rounded-md font-bold uppercase tracking-wide hover:border-amber-500 hover:text-amber-400 transition-colors duration-200 flex items-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Brochure
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-800">
                  <div>
                    <div className="text-3xl font-bold text-white">
                      95.0%
                    </div>
                    <div className="text-sm text-slate-500">Uptime</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">
                      &lt;200ms
                    </div>
                    <div className="text-sm text-slate-500">Response Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">
                      24/7
                    </div>
                    <div className="text-sm text-slate-500">Monitoring</div>
                  </div>
                </div>
              </div>

              {/* Live Dashboard Preview */}
              <div className="relative">
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                    <span className="text-sm text-slate-500 ml-2">
                      Live Dashboard
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* First Image Card */}
                      <div className="bg-slate-950 rounded-md border border-slate-800 overflow-hidden">
                        <img
                          src={graph}
                          alt="Graph"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Second Image Card */}
                      <div className="bg-slate-950 rounded-md border border-slate-800 overflow-hidden">
                        <img
                          src={diagram}
                          alt="Diagram"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-2 bg-amber-500 rounded-full"></div>
                      <div className="h-2 bg-amber-500 rounded-full"></div>
                      <div className="h-2 bg-amber-500 rounded-full"></div>
                    </div>

                    <div className="h-32 overflow-auto bg-slate-950 rounded-md flex items-center justify-center border border-slate-800">
                      <img
                        src="https://aartechsolonics.com/assets/bts1-da0a73a3.webp"
                        alt="Waveform Preview"
                        className="w-full h-full object-cover rounded-md opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES GRID ================= */}
        <section
          id="features"
          className="py-24 px-6 relative overflow-hidden bg-slate-900"
        >
          <div className="max-w-7xl mx-auto margin-auto justify-between">
            <div className="text-center mb-16">
              <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">
                Features
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-4 text-white">
                Enterprise-Grade Monitoring
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Comprehensive visibility and control for your critical power
                infrastructure
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6 justify-items-center">
              <FeatureCard
                icon={<Cpu className="w-6 h-6" />}
                title="Real-time Telemetry"
                description="Sub-2000ms data refresh with MQTT support"
                color="#f59e0b"
                image="https://cdn.pixabay.com/photo/2021/09/15/08/15/windmills-6626200_960_720.jpg"
              />

              <FeatureCard
                icon={<Cloud className="w-6 h-6" />}
                title="Cloud Connectivity"
                description="Secure cloud backup and remote access"
                color="#f59e0b"
                image="https://cdn.pixabay.com/photo/2014/02/10/14/47/cooling-towers-263466_960_720.jpg"
              />

              <FeatureCard
                icon={<Database className="w-6 h-6" />}
                title="Data Historian"
                description="5-days data retention with compression"
                color="#f59e0b"
                image="https://cdn.pixabay.com/photo/2021/09/15/08/15/windmills-6626200_960_720.jpg"
              />
            </div>
          </div>
        </section>

        {/* ================= TECHNICAL SPECIFICATIONS ================= */}
        <section
          id="technical"
          className="py-24 px-6 text-white relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `
      linear-gradient(rgba(2,6,23,0.88), rgba(2,6,23,0.92)),
      url('https://cdn.pixabay.com/photo/2016/11/16/00/06/industry-1827884_1280.jpg')
    `,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">
                Technical
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-4 text-white">
                System Architecture & Compliance
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Built on industry standards with enterprise-grade security and
                reliability
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <TechnicalCard
                icon={<Server className="w-8 h-8" />}
                title="System Capabilities"
                color="#f59e0b"
                image="https://cdn.pixabay.com/photo/2021/05/03/13/24/sunset-6226244_1280.jpg"
                items={["Sub-2000ms real-time refresh", "MQTT & RESTful API"]}
              />

              <TechnicalCard
                icon={<Shield className="w-8 h-8" />}
                title="Compliance Standards"
                color="#f59e0b"
                image="https://cdn.pixabay.com/photo/2022/06/19/07/03/power-plant-7271169_1280.jpg"
                items={[]}
              />

              <TechnicalCard
                icon={<Globe className="w-8 h-8" />}
                title="Deployment Options"
                color="#f59e0b"
                image="https://cdn.pixabay.com/photo/2017/11/25/12/46/energy-2976738_960_720.jpg"
                items={[
                  "Cloud-based",
                  "Hybrid architecture",
                  "Edge computing",
                  "Multi-site aggregation",
                ]}
              />
            </div>
            {/* Architecture Diagram
          <div className="mt-16 relative">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="System Architecture Diagram"
              className="rounded-xl opacity-50 w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm px-8 py-4 rounded-full border border-[#0AC4E0]">
                <span className="text-white font-semibold">System Architecture Overview</span>
              </div>
            </div>
          </div> */}
          </div>
        </section>

        {/* ================= LIVE MONITORING DASHBOARD ================= */}
        <section className="py-24 px-6 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">
                Live View
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-4 text-white">
                Real-time Monitoring Dashboard
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Live telemetry and system status at your fingertips
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left side - Metrics */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    title="Analog"
                    value="110.02 V"
                    change="+0.2%"
                    color="#f59e0b"
                    image="https://cdn.pixabay.com/photo/2017/07/03/15/02/architecture-2468004_1280.jpg"
                  />
                  <MetricCard
                    title="Analog"
                    value="110.0 V"
                    change="-0.1%"
                    color="#f59e0b"
                    image="https://cdn.pixabay.com/photo/2017/07/03/15/02/architecture-2468004_1280.jpg"
                  />
                  <MetricCard
                    title="Frequency"
                    value="50.0 Hz"
                    change="Stable"
                    color="#f59e0b"
                    image="https://cdn.pixabay.com/photo/2017/07/03/15/02/architecture-2468004_1280.jpg"
                  />
                  <MetricCard
                    title="Phase Difference"
                    value="-0.10"
                    change="Optimal"
                    color="#f59e0b"
                    image="https://cdn.pixabay.com/photo/2017/07/03/15/02/architecture-2468004_1280.jpg"
                  />
                </div>

                {/* Status indicators */}
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
                  <h3 className="font-semibold mb-4 flex items-center text-white">
                    <Activity className="w-5 h-5 mr-2 text-amber-500" />
                    Online Status
                  </h3>
                  <div className="space-y-3">
                    <StatusIndicator
                      label="Breaker Status"
                      status="Closed"
                      color="#10b981"
                    />
                    <StatusIndicator
                      label="Transfer"
                      status="Auto"
                      color="#10b981"
                    />
                    <StatusIndicator
                      label="Sync Check"
                      status="In Sync"
                      color="#10b981"
                    />
                  </div>
                </div>
              </div>

              {/* Right side - Charts */}
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center text-white">
                    <LineChart className="w-5 h-5 mr-2 text-amber-500" />
                    Live Waveform
                  </h3>
                  <div className="flex space-x-2 items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-slate-400">Live</span>
                  </div>
                </div>

                {/* Waveform visualization */}
                <div className="h-48 relative rounded-md overflow-hidden border border-slate-800">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/04/01/15/08/industry-702561_1280.jpg"
                    alt="Waveform Monitor"
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-slate-950/90 px-4 py-2 rounded-md border border-amber-500/40">
                      <span className="text-sm font-medium text-amber-400">
                        Live Data Feed
                      </span>
                    </div>
                  </div>
                  {/* Colored waveform lines */}
                  <svg
                    className="w-full h-full absolute top-0 left-0"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,80 Q20,40 40,80 T80,80 T120,80 T160,80 T200,80"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </div>

                {/* Mini metrics */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="text-center p-2 bg-slate-950 rounded-md border border-slate-800">
                    <div className="text-xs text-slate-500">Peak</div>
                    <div className="text-sm font-bold text-amber-400">
                      120.0 V
                    </div>
                  </div>
                  <div className="text-center p-2 bg-slate-950 rounded-md border border-slate-800">
                    <div className="text-xs text-slate-500">Min</div>
                    <div className="text-sm font-bold text-amber-400">
                      90.0 V
                    </div>
                  </div>
                  <div className="text-center p-2 bg-slate-950 rounded-md border border-slate-800">
                    <div className="text-xs text-slate-500">Avg</div>
                    <div className="text-sm font-bold text-amber-400">
                      110.0 V
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INVESTMENT SECTION ================= */}
        <section
          id="investment"
          className="py-24 px-6 relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `
      linear-gradient(rgba(2,6,23,0.88), rgba(2,6,23,0.92)),
      url('https://cdn.pixabay.com/photo/2016/08/17/00/51/wind-1599494_1280.jpg')
    `,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">
                Investment
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-4 text-white">
                Growth & Revenue Potential
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Scalable software solution with multiple revenue streams and
                high margins
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <InvestmentCard
                icon={<TrendingUp className="w-8 h-8" />}
                title="Expanding Market"
                description="Increasing demand for digital retrofitting across manufacturing and utilities"
                metric="--"
                metricLabel="Market Size"
                color="#f59e0b"
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <InvestmentCard
                icon={<Server className="w-8 h-8" />}
                title="Scalable Model"
                description="Single-site, multi-site, and cloud-based deployment with recurring subscriptions"
                metric="40%"
                metricLabel="Gross Margin"
                color="#f59e0b"
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <InvestmentCard
                icon={<Zap className="w-8 h-8" />}
                title="Software Layer"
                description="High-margin digital intelligence add-on without major capex for end-users"
                metric="2-2.5x"
                metricLabel="ROI Multiple"
                color="#f59e0b"
                image="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
            </div>

            {/* Market Analysis Chart */}
            {/* <div className="mb-16 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-[#0AC4E0]" />
              Market Growth Projection
            </h3>
            <div className="relative h-48">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="Market Growth Chart"
                className="w-full h-full object-cover rounded-lg opacity-20"
              />
              <div className="absolute inset-0 flex items-end">
                <div className="w-1/4 h-24 bg-[#0AC4E0] rounded-t-lg mx-1"></div>
                <div className="w-1/4 h-32 bg-[#08a8c0] rounded-t-lg mx-1"></div>
                <div className="w-1/4 h-40 bg-[#068ca0] rounded-t-lg mx-1"></div>
                <div className="w-1/4 h-48 bg-[#0AC4E0] rounded-t-lg mx-1"></div>
              </div>
            </div>
            <div className="flex justify-around mt-4 text-sm text-slate-600">
              <span>2024</span>
              <span>2025</span>
              <span>2026</span>
              <span>2027</span>
            </div>
          </div> */}

            {/* CTA */}
            <div className="relative overflow-hidden rounded-lg border border-slate-800">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1581091870627-3f5a4c1c8b4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt="Background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/85"></div>
              </div>
              <div className="relative bg-slate-900/60 p-12 border-t border-slate-800">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Ready to transform your power infrastructure?
                    </h3>
                    <p className="text-slate-400 text-lg mb-6">
                      Join industry leaders who have already deployed the
                      BTS2000 Intelligence Platform
                    </p>
                    <Link to="/request-demo">
                      <button className="group bg-amber-500 text-slate-950 px-8 py-4 rounded-md font-bold uppercase tracking-wide hover:bg-amber-400 transition-colors duration-200 flex items-center">
                        Schedule a Consultation
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
                      </button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-md p-6 text-center">
                      <div className="text-3xl font-bold text-amber-400 mb-2">
                        5+
                      </div>
                      <div className="text-sm text-slate-400">Deployments</div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-md p-6 text-center">
                      <div className="text-3xl font-bold text-amber-400 mb-2">
                        24/7
                      </div>
                      <div className="text-sm text-slate-400">Support</div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-md p-6 text-center">
                      <div className="text-3xl font-bold text-amber-400 mb-2">
                        95.0%
                      </div>
                      <div className="text-sm text-slate-400">Uptime</div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-md p-6 text-center">
                      <div className="text-3xl font-bold text-amber-400 mb-2">
                        2000 ms
                      </div>
                      <div className="text-sm text-slate-400">Latency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function FeatureCard({ icon, title, description, color, image }) {
  return (
    <div className="group bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-amber-500/40 transition-colors duration-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-12 h-12 bg-amber-500/10 rounded-md flex items-center justify-center text-amber-400 mb-4 relative z-10">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white relative z-10">
        {title}
      </h3>
      <p className="text-slate-400 text-sm relative z-10">{description}</p>

      {/* Accent indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
    </div>
  );
}

function TechnicalCard({ icon, title, color, image, items }) {
  return (
    <div className="bg-slate-900/60 rounded-lg p-8 border border-slate-800 hover:border-slate-700 transition-colors duration-200 group relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-14 h-14 bg-amber-500 rounded-md flex items-center justify-center mb-4 text-slate-950 relative z-10">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4 relative z-10 text-white">{title}</h3>
      <ul className="space-y-3 relative z-10">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 text-slate-300"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InvestmentCard({
  icon,
  title,
  description,
  metric,
  metricLabel,
  color,
  image,
}) {
  return (
    <div className="group bg-slate-900 p-8 rounded-lg border border-slate-800 hover:border-amber-500/40 transition-colors duration-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-14 h-14 bg-amber-500 rounded-md flex items-center justify-center text-slate-950 mb-4 relative z-10">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 relative z-10 text-white">{title}</h3>
      <p className="text-slate-400 mb-4 relative z-10">{description}</p>
      <div className="pt-4 border-t border-slate-800 relative z-10">
        <div className="text-2xl font-bold text-amber-400">{metric}</div>
        <div className="text-sm text-slate-500">{metricLabel}</div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, color, image }) {
  return (
    <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 relative overflow-hidden group">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10">
        <div className="text-sm text-slate-500 mb-1">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div
          className={`text-xs ${
            change.includes("+")
              ? "text-emerald-500"
              : change.includes("-")
                ? "text-red-500"
                : "text-amber-400"
          }`}
        >
          {change}
        </div>
      </div>
    </div>
  );
}

function StatusIndicator({ label, status, color }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">{label}</span>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
        <span className="font-medium text-emerald-400">{status}</span>
      </div>
    </div>
  );
}

function FooterColumn({ title, color, links }) {
  return (
    <div>
      <h4 className="font-bold mb-4 text-amber-500 text-xs uppercase tracking-widest">{title}</h4>
      <ul className="space-y-2 text-slate-400 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href="#"
              className="hover:text-amber-400 transition-colors duration-200 group flex items-center"
            >
              <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// import React ,{ useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import heroVideo from "../assets/BSDTN.mp4";
// import aartech from "../assets/aartech.jpg";

// const HeroPage = () => {
//   const [videoLoaded, setVideoLoaded] = useState(false);
//   const [videoError, setVideoError] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     // Try to load video manually if needed
//     if (videoRef.current) {
//       videoRef.current.load();
//     }

//     // Check if user has a theme preference
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'light') {
//       setIsDarkMode(false);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     localStorage.setItem('theme', newMode ? 'dark' : 'light');
//   };

//   const handleVideoLoad = () => {
//     setVideoLoaded(true);
//     setVideoError(false);
//   };

//   const handleVideoError = () => {
//     console.error("Failed to load video:", heroVideo);
//     setVideoError(true);
//     setVideoLoaded(false);
//   };

//   const downloadUrl = "https://drive.google.com/uc?export=download&id=1LVVNo5PprTfdruTreRKEG1HWsKrtv8FN";

//   const handleDownload = () => {
//     if (downloadUrl) {
//       window.open(downloadUrl, "_blank");
//     } else {
//       alert("Brochure link coming soon!");
//     }
//   };

//   // Theme classes - Video overlay removed from light mode
//   const themeClasses = {
//     container: isDarkMode
//       ? "text-gray-200 bg-gray-900"
//       : "text-gray-800 bg-gray-50",
//     heroText: isDarkMode ? "text-white" : "text-gray-800",
//     heroSubtitle: isDarkMode ? "text-gray-300" : "text-gray-700",
//     heroDescription: isDarkMode ? "text-gray-400" : "text-gray-600",
//     badge: isDarkMode
//       ? "bg-gray-800 text-blue-400 border-gray-700"
//       : "bg-white text-blue-600 border-blue-200 shadow-sm",
//     badgeDot: "w-2 h-2 bg-green-500 rounded-full mr-2",
//     title: isDarkMode ? "text-white" : "text-gray-900",
//     highlight: isDarkMode ? "text-blue-400" : "text-blue-600",
//     statsCard: isDarkMode
//       ? "bg-gray-800/50 border-gray-700"
//       : "bg-white border-gray-200 shadow-sm",
//     statsValue: isDarkMode ? "text-blue-400" : "text-blue-600",
//     statsLabel: isDarkMode ? "text-gray-400" : "text-gray-600",
//     buttonPrimary: isDarkMode
//       ? "bg-blue-800 text-white border-blue-700 hover:bg-blue-700"
//       : "bg-blue-600 text-white border-blue-500 hover:bg-blue-700 shadow-sm hover:shadow",
//     buttonSecondary: isDarkMode
//       ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
//       : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 shadow-sm hover:shadow",
//     section: isDarkMode
//       ? "bg-gray-900 border-gray-800"
//       : "bg-white border-gray-200",
//     sectionTitle: isDarkMode ? "text-white" : "text-gray-900",
//     sectionSubtitle: isDarkMode ? "text-gray-400" : "text-gray-600",
//     specContainer: isDarkMode
//       ? "bg-gray-800 border-gray-700"
//       : "bg-white border-gray-200 shadow-lg",
//     specHeader: isDarkMode
//       ? "bg-gray-900 border-gray-700"
//       : "bg-blue-50 border-blue-200",
//     specHeaderText: isDarkMode ? "text-white" : "text-gray-900",
//     specHeaderSubtext: isDarkMode ? "text-blue-400" : "text-blue-700",
//     specRow: (i, value) => isDarkMode
//       ? !value
//         ? "bg-gray-900/50 font-bold text-gray-300"
//         : "hover:bg-gray-700/30"
//       : !value
//         ? "bg-gray-50 font-bold text-gray-700"
//         : "hover:bg-gray-50",
//     specText: (i, value) => isDarkMode
//       ? !value ? "text-gray-300" : "text-gray-400"
//       : !value ? "text-gray-700" : "text-gray-600",
//     specValue: isDarkMode ? "text-gray-300" : "text-gray-800",
//     specFooter: isDarkMode
//       ? "bg-gray-900 border-gray-700"
//       : "bg-blue-50 border-blue-200",
//     specFooterText: isDarkMode ? "text-gray-400" : "text-gray-700",
//     specFooterHighlight: isDarkMode ? "text-blue-400" : "text-blue-700",
//     ctaSection: isDarkMode
//       ? "bg-gray-800 border-gray-700"
//       : "bg-gray-50 border-gray-200",
//     ctaButton: isDarkMode
//       ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
//       : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 shadow-sm hover:shadow",
//     contactInfo: isDarkMode ? "text-gray-400" : "text-gray-600",
//     contactTitle: isDarkMode ? "text-gray-300" : "text-gray-800",
//     scrollIndicator: isDarkMode
//       ? "border-gray-700 bg-gray-600"
//       : "border-gray-300 bg-gray-400",
//     scrollText: "text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider",
//     logoContainer: isDarkMode
//       ? "bg-gray-900/80 backdrop-blur-sm border-blue-700"
//       : "bg-white/95 backdrop-blur-sm border-blue-300",
//     // VIDEO OVERLAY CHANGED: No white overlay in light mode
//     videoOverlay: isDarkMode
//       ? "bg-gradient-to-b from-black/70 via-black/50 to-black/70"
//       : "bg-gradient-to-b from-black/30 via-black/20 to-black/30", // Keep dark overlay but lighter
//     videoFallback: isDarkMode
//       ? "bg-gradient-to-br from-gray-900 to-gray-800"
//       : "bg-gradient-to-br from-gray-800 to-gray-900", // Keep dark fallback
//     patternOverlay: "absolute inset-0 z-10 opacity-10",
//     loadingOverlay: isDarkMode ? "bg-gray-900" : "bg-gray-900", // Keep dark loading
//     loadingText: isDarkMode ? "text-gray-400" : "text-gray-300"
//   };

//   return (
//     <div className={`${themeClasses.container} overflow-x-hidden w-full`}>
//       {/* Theme Toggle Button & Aartech Logo Container */}
//       <div className="fixed top-4 sm:top-6 md:top-20 right-4 sm:right-6 z-50 flex flex-col items-end space-y-2 sm:space-y-3">
//         {/* Theme Toggle Button - Always visible */}
//         <button
//           onClick={toggleTheme}
//           className={`p-1.5 sm:p-2 rounded-full ${
//             isDarkMode
//               ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
//               : 'bg-white hover:bg-gray-100 border border-gray-300 shadow-sm'
//           } transition-colors duration-300`}
//           aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//         >
//           {isDarkMode ? (
//             // Sun icon for light mode
//             <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//           ) : (
//             // Moon icon for dark mode
//             <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//             </svg>
//           )}
//         </button>

//         {/* Aartech Logo - Hidden on small devices, visible on medium and larger */}
//         <div className={`rounded-lg p-1.5 sm:p-2 border shadow-lg ${themeClasses.logoContainer} hidden md:block`}>
//           <img
//             src={aartech}
//             alt="Aartech Logo"
//             className="h-14 sm:h-16 md:h-20 w-auto object-contain"
//           />
//         </div>
//       </div>

//       {/* Hero Section with Video */}
//       <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[90vh] sm:min-h-screen overflow-hidden">
//         {/* Background Video */}
//         <div className="absolute inset-0 z-0">
//           {!videoError ? (
//             <video
//               ref={videoRef}
//               autoPlay
//               loop
//               muted
//               playsInline
//               preload="auto"
//               poster="/hero.jpg"
//               onLoadedData={handleVideoLoad}
//               className="absolute w-full h-full object-cover"
//             >
//               <source src={heroVideo} type="video/mp4" />
//               {/* Your browser does not support the video tag. */}
//             </video>
//           ) : (
//             <div className={`absolute inset-0 ${themeClasses.videoFallback}`} />
//           )}

//           {/* Loading state */}
//           {!videoLoaded && !videoError && (
//             <div className={`absolute inset-0 flex items-center justify-center ${themeClasses.loadingOverlay}`}>
//               <div className="text-center px-4">
//                 <div className="inline-block animate-spin rounded-full h-6 sm:h-8 w-6 sm:w-8 border-t-2 border-b-2 border-blue-500"></div>
//                 <p className={`mt-3 sm:mt-4 text-xs sm:text-sm ${themeClasses.loadingText}`}>LOADING...</p>
//               </div>
//             </div>
//           )}

//           {/* Video Overlay - Same dark overlay for both themes, just lighter in light mode */}
//           <div className={`absolute inset-0 ${themeClasses.videoOverlay}`}></div>
//         </div>

//         {/* Pattern overlay - Only show in dark mode */}
//         {isDarkMode && (
//           <div className={themeClasses.patternOverlay}>
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
//                                 linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
//                 backgroundSize: "40px 40px",
//                 '@media (min-width: 640px)': {
//                   backgroundSize: "50px 50px"
//                 }
//               }}
//             ></div>
//           </div>
//         )}

//         {/* Content */}
//         <div className="relative max-w-6xl mx-auto text-center z-20 px-2 sm:px-4">
//           {/* Status Badge */}
//           <div className={`inline-flex items-center text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded border mb-4 sm:mb-6 tracking-wider ${themeClasses.badge}`}>
//             <div className={`${themeClasses.badgeDot} w-1.5 h-1.5 sm:w-2 sm:h-2`}></div>
//             INDUSTRIAL BTS-2000 SYSTEM
//           </div>

//           {/* Main Title */}
//           <div className="mb-6 sm:mb-8">
//             <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-tight ${themeClasses.title}`}>
//               <span className={themeClasses.title}>BTS-2000</span>
//             </h1>
//             <h2 className={`text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4 px-2 ${themeClasses.heroSubtitle}`}>
//               INDUSTRIAL BUS TRANSFER SYSTEM
//             </h2>
//           </div>

//           {/* Subtitle */}
//           <h3 className={`text-base sm:text-lg md:text-xl font-medium mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto px-3 ${themeClasses.heroSubtitle}`}>
//             Advanced Power Management & Control Platform
//             <br className="hidden xs:block" />
//             <span className={`font-bold ${themeClasses.highlight} block xs:inline mt-1 xs:mt-0`}>
//               99.9% UPTIME • REAL-TIME MONITORING
//             </span>
//           </h3>

//           {/* Description */}
//           <p className={`max-w-2xl mx-auto mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed px-4 ${themeClasses.heroDescription}`}>
//             Enterprise-grade automatic transfer switch with remote control,
//             cloud monitoring, and industrial protocols for mission-critical
//             infrastructure.
//           </p>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
//             <a
//               href="/contact"
//               className={`font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded border transition-colors w-full sm:w-auto text-xs sm:text-sm ${themeClasses.buttonPrimary}`}
//             >
//               INVESTMENT PROPOSAL
//             </a>
//             <a
//               href="#specifications"
//               className={`font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded border transition-colors w-full sm:w-auto text-xs sm:text-sm ${themeClasses.buttonSecondary}`}
//             >
//               TECHNICAL SPECS
//             </a>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-xs sm:max-w-sm md:max-w-md mx-auto px-2">
//             {[
//               ["5", "INSTALLATIONS"],
//               ["99.9%", "UPTIME"],
//               ["<200ms", "TRANSFER"],
//             ].map(([value, label], index) => (
//               <div
//                 key={index}
//                 className={`text-center p-2 sm:p-3 rounded border ${themeClasses.statsCard}`}
//               >
//                 <div className={`text-base sm:text-lg md:text-xl font-bold ${themeClasses.statsValue}`}>{value}</div>
//                 <div className={`text-[10px] sm:text-xs uppercase tracking-wider mt-0.5 sm:mt-1 ${themeClasses.statsLabel}`}>
//                   {label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
//           <div className={themeClasses.scrollText}>
//             SCROLL
//           </div>
//           <div className={`w-5 h-8 sm:w-6 sm:h-10 border rounded-full flex justify-center mx-auto mt-1 sm:mt-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
//             <div className={`w-0.5 sm:w-1 h-2 sm:h-3 rounded-full mt-1.5 sm:mt-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`}></div>
//           </div>
//         </div>
//       </section>

//       {/* Specifications Section */}
//       <section
//         id="specifications"
//         className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t ${themeClasses.section}`}
//       >
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-8 sm:mb-12">
//             <div className={`inline-flex items-center text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded border mb-3 sm:mb-4 tracking-wider ${themeClasses.badge}`}>
//               TECHNICAL SPECIFICATIONS
//             </div>
//             <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 px-2 ${themeClasses.sectionTitle}`}>
//               ENGINEERING SPECIFICATIONS
//             </h2>
//             <p className={`max-w-2xl mx-auto text-xs sm:text-sm px-4 ${themeClasses.sectionSubtitle}`}>
//               Industrial-grade specifications for maximum reliability and
//               performance
//             </p>
//           </div>

//           {/* Specifications Grid */}
//           <div className={`rounded-lg border overflow-hidden mx-1 sm:mx-0 ${themeClasses.specContainer}`}>
//             <div className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${themeClasses.specHeader}`}>
//               <h3 className={`text-base sm:text-lg font-bold flex flex-wrap items-center gap-2 ${themeClasses.specHeaderText}`}>
//                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
//                 BTS-2000 TECHNICAL SPECIFICATIONS
//                 <span className={`ml-auto text-[10px] sm:text-sm font-normal whitespace-nowrap ${themeClasses.specHeaderSubtext}`}>
//                   ENTERPRISE GRADE
//                 </span>
//               </h3>
//             </div>

//             <div className={`grid md:grid-cols-2 ${isDarkMode ? 'divide-y md:divide-y-0 md:divide-x divide-gray-700' : 'divide-y md:divide-y-0 md:divide-x divide-gray-200'}`}>
//               {/* Left Column */}
//               <div className="divide-y divide-inherit">
//                 {[
//                   ["ELECTRICAL SPECIFICATIONS", ""],
//                   ["Rated Voltage", "415V AC ±10%"],
//                   ["Frequency", "50/60 Hz Auto-detection"],
//                   ["Transfer Time", "< 200ms (Typical)"],
//                   ["Withstand Current", "65kA / 1 Second"],
//                   ["Insulation Level", "2.5kV / 1 Minute"],
//                   ["", ""],
//                   ["PROTECTION FEATURES", ""],
//                   ["Overcurrent Protection", "Digital, Adjustable"],
//                   ["Short Circuit", "I²t Characteristic"],
//                   ["Phase Failure", "All-phase Monitoring"],
//                   ["Earth Fault", "Sensitive Protection"],
//                 ].map(([spec, value], i) => (
//                   <div
//                     key={i}
//                     className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${themeClasses.specRow(i, value)}`}
//                   >
//                     <div className="flex flex-wrap justify-between items-center gap-2">
//                       <span className={`text-xs sm:text-sm font-medium ${themeClasses.specText(i, value)}`}>
//                         {spec}
//                       </span>
//                       {value && (
//                         <span className={`text-xs sm:text-sm font-medium ${themeClasses.specValue} break-words max-w-[60%] text-right`}>
//                           {value}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Right Column */}
//               <div className="divide-y divide-inherit">
//                 {[
//                   ["CONTROL & COMMUNICATION", ""],
//                   ["Processor", "32-bit ARM Cortex-M7"],
//                   ["Memory", "2MB Flash, 1MB RAM"],
//                   ["Display", '7" Touch LCD'],
//                   ["Protocols", "Modbus, Ethernet, IEC 61850"],
//                   ["Cloud Ready", "AWS IoT, Azure Compatible"],
//                   ["", ""],
//                   ["ENVIRONMENTAL", ""],
//                   ["Enclosure Rating", "IP54 / IP65 (Optional)"],
//                   ["Temperature", "-10°C to +55°C"],
//                   ["Humidity", "5% to 95% Non-condensing"],
//                   ["Altitude", "Up to 2000m ASL"],
//                 ].map(([spec, value], i) => (
//                   <div
//                     key={i}
//                     className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${themeClasses.specRow(i, value)}`}
//                   >
//                     <div className="flex flex-wrap justify-between items-center gap-2">
//                       <span className={`text-xs sm:text-sm font-medium ${themeClasses.specText(i, value)}`}>
//                         {spec}
//                       </span>
//                       {value && (
//                         <span className={`text-xs sm:text-sm font-medium ${themeClasses.specValue} break-words max-w-[60%] text-right`}>
//                           {value}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Footer */}
//             <div className={`px-4 sm:px-6 py-3 sm:py-4 border-t ${themeClasses.specFooter}`}>
//               <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
//                 <div className={`text-[10px] sm:text-sm font-medium text-center sm:text-left ${themeClasses.specFooterText}`}>
//                   CERTIFIED: IEC 60947-6-1 | ISO 9001:2015 | CE | UL
//                 </div>
//                 <div className={`font-bold text-[10px] sm:text-sm ${themeClasses.specFooterHighlight} whitespace-nowrap`}>
//                   EXPECTED LIFESPAN: 5+ YEARS
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t ${themeClasses.ctaSection}`}>
//         <div className="max-w-6xl mx-auto text-center">
//           {/* Main Heading */}
//           <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 px-2 ${themeClasses.sectionTitle}`}>
//             READY TO DEPLOY INDUSTRIAL SOLUTION?
//           </h2>

//           <p className={`mb-6 sm:mb-8 max-w-2xl mx-auto text-xs sm:text-sm px-4 ${themeClasses.sectionSubtitle}`}>
//             Join industry leaders in adopting intelligent power transfer
//             technology.
//           </p>

//           {/* Button Group */}
//           <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center px-2">
//             <Link to="/contact" className="w-full sm:w-auto">
//               <button className={`w-full sm:w-auto font-bold px-4 sm:px-6 py-2 sm:py-3 rounded border transition-colors text-xs sm:text-sm ${themeClasses.ctaButton}`}>
//                 SCHEDULE DEMO
//               </button>
//             </Link>

//             <button
//               onClick={handleDownload}
//               className={`w-full sm:w-auto font-bold px-4 sm:px-6 py-2 sm:py-3 rounded border transition-colors text-xs sm:text-sm ${themeClasses.ctaButton}`}
//             >
//               DOWNLOAD BROCHURE
//             </button>

//             <Link to="/about" className="w-full sm:w-auto">
//               <button className={`w-full sm:w-auto font-bold px-4 sm:px-6 py-2 sm:py-3 rounded border transition-colors text-xs sm:text-sm ${themeClasses.ctaButton}`}>
//                 ABOUT US
//               </button>
//             </Link>

//             <Link to="/contact" className="w-full sm:w-auto">
//               <button className={`w-full sm:w-auto font-bold px-4 sm:px-6 py-2 sm:py-3 rounded border transition-colors text-xs sm:text-sm ${themeClasses.ctaButton}`}>
//                 CONTACT
//               </button>
//             </Link>
//           </div>

//           {/* Contact Info */}
//           <div className={`mt-8 sm:mt-12 pt-6 sm:pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm px-2">
//               <div className={`${themeClasses.contactInfo} px-2`}>
//                 <div className={`font-bold mb-1 sm:mb-2 text-sm sm:text-base ${themeClasses.contactTitle}`}>SUPPORT</div>
//                 <div className="space-y-0.5 sm:space-y-1">
//                   <div>24/7 Technical Support</div>
//                   <div className="break-words">support@transync.com</div>
//                 </div>
//               </div>
//               <div className={`${themeClasses.contactInfo} px-2`}>
//                 <div className={`font-bold mb-1 sm:mb-2 text-sm sm:text-base ${themeClasses.contactTitle}`}>HEADQUARTERS</div>
//                 <div className="space-y-0.5 sm:space-y-1">
//                   <div>Industrial Automation Div.</div>
//                   <div>Delhi, India</div>
//                 </div>
//               </div>
//               <div className={`${themeClasses.contactInfo} px-2`}>
//                 <div className={`font-bold mb-1 sm:mb-2 text-sm sm:text-base ${themeClasses.contactTitle}`}>
//                   CERTIFICATION
//                 </div>
//                 <div className="space-y-0.5 sm:space-y-1">
//                   <div>ISO 9001:2015</div>
//                   <div>IEC 60947-6-1</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HeroPage;

// import React, { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import heroVideo from "../assets/BSDTN.mp4";
// import aartech from "../assets/aartech.jpg";

// const HeroPage = () => {
//   const [videoLoaded, setVideoLoaded] = useState(false);
//   const [videoError, setVideoError] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [activeSection, setActiveSection] = useState("overview");
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load();
//     }

//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'light') {
//       setIsDarkMode(false);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     localStorage.setItem('theme', newMode ? 'dark' : 'light');
//   };

//   const handleVideoLoad = () => {
//     setVideoLoaded(true);
//     setVideoError(false);
//   };

//   const handleVideoError = () => {
//     console.error("Failed to load video:", heroVideo);
//     setVideoError(true);
//     setVideoLoaded(false);
//   };

//   // Updated with your Google Drive PDF link
//   const downloadUrl = "https://drive.google.com/uc?export=download&id=1LVVNo5PprTfdruTreRKEG1HWsKrtv8FN";

//   const handleDownload = () => {
//     if (downloadUrl) {
//       // Open the PDF in a new tab for download
//       window.open(downloadUrl, "_blank");
//     } else {
//       alert("Brochure link coming soon!");
//     }
//   };

//   const specifications = {
//     electrical: [
//       { label: "Rated Voltage", value: "415V AC ±10%", highlight: false },
//       { label: "Frequency", value: "50/60 Hz Auto-detection", highlight: false },
//       { label: "Transfer Time", value: "< 200ms", highlight: true },
//       { label: "Withstand Current", value: "65kA / 1 Second", highlight: false },
//       { label: "Insulation Level", value: "2.5kV / 1 Minute", highlight: false },
//     ],
//     protection: [
//       { label: "Overcurrent Protection", value: "Digital, Adjustable", highlight: false },
//       { label: "Short Circuit", value: "I²t Characteristic", highlight: false },
//       { label: "Phase Failure", value: "All-phase Monitoring", highlight: false },
//       { label: "Earth Fault", value: "Sensitive Protection", highlight: false },
//     ],
//     control: [
//       { label: "Processor", value: "32-bit ARM Cortex-M7", highlight: false },
//       { label: "Memory", value: "2MB Flash, 1MB RAM", highlight: false },
//       { label: "Display", value: '7" Touch LCD', highlight: false },
//       { label: "Protocols", value: "Modbus, Ethernet, IEC 61850", highlight: true },
//       { label: "Cloud Connectivity", value: "AWS IoT, Azure Compatible", highlight: false },
//     ],
//     environmental: [
//       { label: "Enclosure Rating", value: "IP54 / IP65 (Optional)", highlight: false },
//       { label: "Temperature Range", value: "-10°C to +55°C", highlight: false },
//       { label: "Humidity", value: "5% to 95% Non-condensing", highlight: false },
//       { label: "Altitude", value: "Up to 2000m ASL", highlight: false },
//     ]
//   };

//   const performanceStats = [
//     { value: "99.9%", label: "System Uptime", description: "Guaranteed reliability" },
//     { value: "<200ms", label: "Transfer Speed", description: "Instant switching" },
//     { value: "65kA", label: "Withstand Current", description: "Maximum protection" },
//     { value: "5+", label: "Years Lifespan", description: "Long-term durability" },
//   ];

//   // UPDATED: Replaced with your provided feature descriptions
//   const keyFeatures = [
//     "Real-time Monitoring & Analytics",
//     "Cloud-based Management Platform",
//     "Industrial Protocol Support",
//     "Remote Configuration & Control",
//     "Predictive Maintenance Alerts",
//     "Energy Consumption Analytics",
//     "Multi-level Security",
//     "Scalable Architecture"
//   ];

//   const themeClasses = {
//     container: isDarkMode
//       ? "text-gray-100 bg-gray-900"
//       : "text-gray-900 bg-gray-50",
//     heroText: isDarkMode ? "text-white" : "text-gray-900",
//     heroSubtitle: isDarkMode ? "text-gray-300" : "text-gray-700",
//     heroDescription: isDarkMode ? "text-gray-400" : "text-gray-600",
//     badge: isDarkMode
//       ? "bg-gray-800/80 text-blue-400 border-blue-800/50"
//       : "bg-white/95 text-blue-600 border-blue-200 shadow-lg",
//     badgeDot: "w-2 h-2 bg-green-500 rounded-full mr-2",
//     title: isDarkMode ? "text-white" : "text-gray-900",
//     highlight: isDarkMode ? "text-blue-400" : "text-blue-600",
//     statsCard: isDarkMode
//       ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
//       : "bg-white/80 border-gray-200 hover:bg-white shadow-lg hover:shadow-xl",
//     statsValue: isDarkMode ? "text-blue-400" : "text-blue-600",
//     statsLabel: isDarkMode ? "text-gray-400" : "text-gray-600",
//     buttonPrimary: isDarkMode
//       ? "bg-gradient-to-r from-blue-700 to-blue-600 text-white border-blue-600 hover:from-blue-600 hover:to-blue-500"
//       : "bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg hover:shadow-xl",
//     buttonSecondary: isDarkMode
//       ? "bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700/50"
//       : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50 shadow-lg hover:shadow-xl",
//     section: isDarkMode
//       ? "bg-gray-900 border-gray-800"
//       : "bg-white border-gray-200",
//     sectionTitle: isDarkMode ? "text-white" : "text-gray-900",
//     sectionSubtitle: isDarkMode ? "text-gray-400" : "text-gray-600",
//     specContainer: isDarkMode
//       ? "bg-gray-800/40 border-gray-700"
//       : "bg-white border-gray-200 shadow-xl",
//     specHeader: isDarkMode
//       ? "bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700"
//       : "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200",
//     specHeaderText: isDarkMode ? "text-white" : "text-gray-900",
//     specHeaderSubtext: isDarkMode ? "text-blue-400" : "text-blue-700",
//     specCard: isDarkMode
//       ? "bg-gray-800/30 border-gray-700/50 hover:border-blue-700/50"
//       : "bg-white border-gray-200 hover:border-blue-200 shadow-lg hover:shadow-xl",
//     specCardHeader: isDarkMode
//       ? "border-gray-700 bg-gray-900/30"
//       : "border-gray-200 bg-blue-50/50",
//     specValue: isDarkMode ? "text-gray-300" : "text-gray-800",
//     specHighlight: isDarkMode ? "text-green-400" : "text-green-600",
//     ctaSection: isDarkMode
//       ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700"
//       : "bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-xl",
//     ctaButton: isDarkMode
//       ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
//       : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 shadow-lg hover:shadow-xl",
//     contactInfo: isDarkMode ? "text-gray-400" : "text-gray-600",
//     contactTitle: isDarkMode ? "text-gray-300" : "text-gray-800",
//     scrollIndicator: isDarkMode
//       ? "border-gray-700 bg-gray-600"
//       : "border-gray-300 bg-gray-400",
//     scrollText: "text-gray-500 text-xs uppercase tracking-wider",
//     logoContainer: isDarkMode
//       ? "bg-gray-900/80 backdrop-blur-lg border-blue-800/50"
//       : "bg-white/95 backdrop-blur-lg border-blue-300 shadow-2xl",
//     videoOverlay: isDarkMode
//       ? "bg-gradient-to-br from-gray-900/85 via-gray-900/70 to-gray-900/85"
//       : "bg-gradient-to-br from-white/95 via-white/90 to-white/95",
//     videoFallback: isDarkMode
//       ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
//       : "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100",
//     loadingOverlay: isDarkMode ? "bg-gray-900/95" : "bg-gray-900/95",
//     loadingText: isDarkMode ? "text-gray-400" : "text-gray-300",
//     navItem: isDarkMode
//       ? "text-gray-400 hover:text-white"
//       : "text-gray-600 hover:text-gray-900",
//     navActive: isDarkMode
//       ? "text-blue-400"
//       : "text-blue-600",
//     featureCard: isDarkMode
//       ? "bg-gray-800/40 hover:bg-gray-800/60 border-gray-700/30"
//       : "bg-white hover:bg-gray-50 border-gray-200 shadow-lg hover:shadow-xl"
//   };

//   return (
//     <div className={themeClasses.container}>
//       {/* Hero Section */}
//       <section id="overview" className="relative pt-16 pb-20 min-h-screen flex items-center overflow-hidden">
//         {/* Background Video */}
//         <div className="absolute inset-0 z-0">
//           {!videoError ? (
//             <>
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 preload="auto"
//                 onLoadedData={handleVideoLoad}
//                 className="absolute w-full h-full object-cover"
//               >
//                 <source src={heroVideo} type="video/mp4" />
//               </video>
//               <div className={`absolute inset-0 ${themeClasses.videoOverlay}`}></div>
//             </>
//           ) : (
//             <div className={`absolute inset-0 ${themeClasses.videoFallback}`} />
//           )}

//           {/* Loading state */}
//           {!videoLoaded && !videoError && (
//             <div className={`absolute inset-0 flex items-center justify-center ${themeClasses.loadingOverlay} backdrop-blur-sm`}>
//               <div className="text-center">
//                 <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
//                 <p className={`mt-4 text-sm font-medium ${themeClasses.loadingText}`}>LOADING SYSTEM...</p>
//               </div>
//             </div>
//           )}

//           {/* Grid Pattern - Only in dark mode */}
//           {isDarkMode && (
//             <div className="absolute inset-0 opacity-5">
//               <div className="absolute inset-0" style={{
//                 backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
//                                 linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
//                 backgroundSize: "40px 40px",
//               }}></div>
//             </div>
//           )}
//         </div>

//         {/* Theme Toggle Button - Moved to floating position */}
//         <button
//           onClick={toggleTheme}
//           className={`fixed top-24 right-6 z-50 p-3 rounded-full transition-all ${
//             isDarkMode
//               ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
//               : 'bg-white hover:bg-gray-100 border border-gray-300 shadow-lg'
//           }`}
//           aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//         >
//           {isDarkMode ? (
//             <div className="w-5 h-5">
//               <div className="relative w-full h-full">
//                 <div className="absolute inset-0 bg-yellow-300 rounded-full"></div>
//                 <div className="absolute top-1 left-1 w-3 h-3 bg-gray-900 rounded-full"></div>
//               </div>
//             </div>
//           ) : (
//             <div className="w-5 h-5">
//               <div className="relative w-full h-full">
//                 <div className="absolute inset-0 bg-gray-700 rounded-full"></div>
//                 <div className="absolute top-1 left-1 w-3 h-3 bg-gray-900 rounded-full"></div>
//               </div>
//             </div>
//           )}
//         </button>

//         {/* Content */}
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">

//             {/* Left Column - Main Content */}
//             <div className="space-y-10">
//               {/* Status Badge */}
//               <div className={`inline-flex items-center px-5 py-2.5 rounded-full backdrop-blur-sm ${themeClasses.badge}`}>
//                 <div className={themeClasses.badgeDot}></div>
//                 <span className="text-sm font-semibold tracking-wider">
//                   INDUSTRIAL AUTOMATION SOLUTION
//                 </span>
//               </div>

//               {/* Main Title */}
//               <div className="space-y-6">
//                 <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight ${themeClasses.title}`}>
//                   BTS-2000
//                   <br />
//                   <span className={`block mt-2 ${themeClasses.highlight}`}>
//                     Industrial Bus Transfer System
//                   </span>
//                 </h1>

//                 <div className={`h-1 w-24 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}></div>

//                 <p className={`text-xl leading-relaxed max-w-2xl ${themeClasses.heroDescription}`}>
//                   Advanced power management platform with enterprise-grade reliability,
//                   real-time monitoring, and industrial protocol support for mission-critical
//                   infrastructure.
//                 </p>
//               </div>

//               {/* Key Features - UPDATED: Now shows your feature titles */}
//               <div className="grid grid-cols-2 gap-4 max-w-lg">
//                 {keyFeatures.slice(0, 4).map((feature, index) => (
//                   <div key={index} className="flex items-start space-x-3">
//                     <div className={`w-2 h-2 mt-2 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
//                     <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Link
//                   to="/contact"
//                   className={`px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 ${themeClasses.buttonPrimary}`}
//                 >
//                   Request Investment Proposal
//                 </Link>
//                 <button
//                   onClick={handleDownload}
//                   className={`px-10 py-4 rounded-lg font-bold text-lg transition-all border ${themeClasses.buttonSecondary}`}
//                 >
//                   Download Technical Brochure
//                 </button>
//               </div>
//             </div>

//             {/* Right Column - Performance Stats */}
//             <div className={`rounded-3xl p-10 backdrop-blur-lg ${themeClasses.specContainer}`}>

//               {/* Performance Stats Grid */}
//               <div className="grid grid-cols-2 gap-8 mb-10">
//                 {performanceStats.map((stat, index) => (
//                   <div key={index} className={`text-center p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 ${themeClasses.statsCard}`}>
//                     <div className={`text-3xl font-bold mb-2 ${themeClasses.statsValue}`}>
//                       {stat.value}
//                     </div>
//                     <div className={`font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//                       {stat.label}
//                     </div>
//                     <div className={`text-sm ${themeClasses.statsLabel}`}>
//                       {stat.description}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Aartech Branding */}
//               <div className={`pt-10 mt-10 border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>

//                 <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-900/40' : 'bg-gray-50'} rounded-lg p-3 border shadow-2xl ${themeClasses.logoContainer} hidden md:block`}>
//                   <img
//                     src={aartech}
//                     alt="Aartech Logo"
//                     className="h-32 w-auto mx-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
//                   />

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
//           <div className={themeClasses.scrollText}>EXPLORE</div>
//           <div className={`w-8 h-12 border rounded-full flex justify-center mx-auto mt-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
//             <div className={`w-1 h-3 rounded-full mt-3 animate-bounce ${themeClasses.scrollIndicator}`}></div>
//           </div>
//         </div>
//       </section>

//       {/* Specifications Section */}
//       <section id="specifications" className="py-24 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">

//           {/* Section Header */}
//           <div className="text-center mb-20">
//             <div className={`inline-block px-6 py-2 rounded-full mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
//               <span className={`text-sm font-semibold tracking-wider ${themeClasses.highlight}`}>
//                 TECHNICAL SPECIFICATIONS
//               </span>
//             </div>
//             <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${themeClasses.sectionTitle}`}>
//               Engineering <span className={themeClasses.highlight}>Excellence</span>
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${themeClasses.sectionSubtitle}`}>
//               Precision-engineered specifications for maximum reliability and performance in demanding industrial environments
//             </p>
//           </div>

//           {/* Specification Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {Object.entries(specifications).map(([category, items], categoryIndex) => (
//               <div key={categoryIndex} className={`rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${themeClasses.specCard}`}>

//                 {/* Category Header */}
//                 <div className={`p-6 border-b ${themeClasses.specCardHeader}`}>
//                   <div className="flex items-center">
//                     <div className={`w-3 h-8 mr-4 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}></div>
//                     <h3 className={`text-xl font-bold ${themeClasses.specHeaderText}`}>
//                       {category.charAt(0).toUpperCase() + category.slice(1)}
//                     </h3>
//                   </div>
//                 </div>

//                 {/* Specification Items */}
//                 <div className="p-6 space-y-6">
//                   {items.map((item, itemIndex) => (
//                     <div key={itemIndex} className="space-y-2">
//                       <div className={`text-sm font-medium ${themeClasses.contactInfo}`}>
//                         {item.label}
//                       </div>
//                       <div className={`text-lg font-semibold ${item.highlight ? themeClasses.specHighlight : themeClasses.specValue}`}>
//                         {item.value}
//                       </div>
//                       {itemIndex < items.length - 1 && (
//                         <div className={`h-px ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'}`}></div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Certifications */}

//         </div>
//       </section>

//       {/* Features Section - UPDATED: Now shows your feature descriptions */}
//       <section id="features" className={`py-24 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-800/20' : 'bg-white'}`}>
//         <div className="max-w-7xl mx-auto">

//           {/* Section Header */}
//           <div className="text-center mb-20">
//             <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${themeClasses.sectionTitle}`}>
//               Advanced <span className={themeClasses.highlight}>Features</span>
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${themeClasses.sectionSubtitle}`}>
//               Comprehensive feature set designed for modern industrial power management requirements
//             </p>
//           </div>

//           {/* Features Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {keyFeatures.map((feature, index) => {
//               // Create descriptions for each feature based on your provided text
//               const featureDescriptions = [
//                 "Track device status, performance metrics, and system health instantly with live dashboards and actionable insights.",
//                 "Access, manage, and control all connected devices securely from a centralized cloud dashboard — anytime, anywhere.",
//                 "Compatible with standard industrial communication protocols like MQTT, Modbus, and HTTP for seamless system integration.",
//                 "Update settings, trigger actions, and manage operations remotely without on-site intervention.",
//                 "Receive intelligent alerts based on usage patterns and performance anomalies to prevent failures before they happen.",
//                 "Monitor power usage trends, identify inefficiencies, and optimize energy costs with detailed consumption reports.",
//                 "Ensure data and device protection with encrypted communication, role-based access control, and secure authentication.",
//                 "Built to handle growing device networks — easily scale from a few units to thousands without performance loss."
//               ];

//               return (
//                 <div key={index} className={`p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${themeClasses.featureCard}`}>
//                   <div className="flex items-start space-x-4">
//                     <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
//                       <div className={`w-6 h-6 rounded ${isDarkMode ? 'bg-blue-600' : 'bg-blue-600'}`}></div>
//                     </div>
//                     <div>
//                       <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                         {feature}
//                       </h3>
//                       <p className={`text-sm ${themeClasses.contactInfo}`}>
//                         {featureDescriptions[index]}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className={`py-24 px-4 sm:px-6 lg:px-8 ${themeClasses.ctaSection}`}>
//         <div className="max-w-6xl mx-auto text-center">
//           {/* Main Heading */}
//           <div className={`inline-block px-6 py-3 rounded-full mb-8 ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
//             <span className={`text-sm font-semibold tracking-wider ${themeClasses.highlight}`}>
//               READY TO DEPLOY INDUSTRIAL SOLUTION?
//             </span>
//           </div>

//           <h2 className={`text-3xl sm:text-4xl font-bold mb-8 ${themeClasses.sectionTitle}`}>
//             Transform Your Power Management Infrastructure
//           </h2>

//           <p className={`text-xl mb-12 max-w-3xl mx-auto ${themeClasses.sectionSubtitle}`}>
//             Join industry leaders in adopting intelligent power transfer technology with our comprehensive solutions and dedicated support
//           </p>

//           {/* Button Group */}
//           <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
//             <button
//               onClick={handleDownload}
//               className={`px-12 py-5 rounded-lg font-bold text-lg border transition-all ${themeClasses.buttonSecondary}`}
//             >
//               Download Brochure
//             </button>
//             <Link to="/about" className={`px-12 py-5 rounded-lg font-bold text-lg border transition-all ${themeClasses.buttonSecondary}`}>
//               About Our Technology
//             </Link>
//           </div>

//           {/* Contact Info */}
//           <div className={`pt-12 mt-12 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//             <div className="grid md:grid-cols-3 gap-12 text-left">
//               <div>
//                 <div className={`text-lg font-bold mb-4 ${themeClasses.contactTitle}`}>Technical Support</div>
//                 <div className={`space-y-2 ${themeClasses.contactInfo}`}>
//                   <div>24/7 Emergency Support</div>
//                   <div>dummy@gmail.com</div>
//                   <div>+91 9835383246</div>
//                 </div>
//               </div>
//               <div>
//                 <div className={`text-lg font-bold mb-4 ${themeClasses.contactTitle}`}>Headquarters</div>
//                 <div className={`space-y-2 ${themeClasses.contactInfo}`}>
//                   <div>Aartech Solonics Ltd.</div>
//                   <div>Industrial Area </div>
//                   <div>Bhopal Mandideep, India 110092</div>
//                 </div>
//               </div>
//               <div>
//                 <div className={`text-lg font-bold mb-4 ${themeClasses.contactTitle}`}>Business Hours</div>
//                 <div className={`space-y-2 ${themeClasses.contactInfo}`}>
//                   <div>Emergency: 24/7 Available</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="mb-8 md:mb-0">
//               <div className="flex items-center space-x-4 mb-6">
//                 <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
//                   <div className="w-10 h-10 flex items-center justify-center">
//                     <span className={`text-2xl font-bold ${themeClasses.highlight}`}>BTS</span>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="text-xl font-bold">BTS-2000 Industrial System</div>
//                   {/* <div className={`text-sm ${themeClasses.contactInfo}`}>Enterprise Power Management Solutions</div> */}
//                 </div>
//               </div>
//               <div className={`text-sm ${themeClasses.contactInfo}`}>
//                 © {new Date().getFullYear()} Aartech Solonics Ltd.
//               </div>
//             </div>

//             <div className="flex space-x-8">
//               <Link to="/about" className={`text-sm font-medium ${themeClasses.navItem}`}>
//                 About Us
//               </Link>
//               <Link to="/contact" className={`text-sm font-medium ${themeClasses.navItem}`}>
//                 Contact
//               </Link>
//               <Link to="/privacypolicy" className={`text-sm font-medium ${themeClasses.navItem}`}>
//                 Privacy Policy
//               </Link>
//               <Link to="/terms" className={`text-sm font-medium ${themeClasses.navItem}`}>
//                 Terms of Service
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HeroPage;
