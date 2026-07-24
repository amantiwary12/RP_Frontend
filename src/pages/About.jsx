// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function About() {
//   const navigate = useNavigate();

//   const handleRequestDemo = () => {
//     navigate("/request-demo");
//   };

//   return (
//     <div className="min-h-screen  bg-gradient-to-br from-gray-200 to-gray-300 text-gray-800 px-4 sm:px-6 lg:px-20 py-12">
//       <div className="max-w-6xl mx-auto">
//         {/* Hero Section */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6 shadow-lg">
//             <div className="bg-white p-4 rounded-full shadow-inner">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
//           </div>
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
//             About <span className="text-gray-900">TransSync</span>
//           </h1>
//           <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6 rounded-full"></div>
//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Advanced monitoring solution for the <span className="font-semibold text-gray-900">Bus Transfer System 2000</span> by Aartech Solonics Limited
//           </p>
//         </div>

//         {/* Intro Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 md:p-10 rounded-2xl border border-blue-500/20 shadow-xl mb-16 relative overflow-hidden">
//           <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
//           <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl"></div>
          
//           <div className="relative z-10">
//             <p className="text-base md:text-lg text-white/95 leading-relaxed text-center font-light">
//               <span className="font-semibold text-white">TransSync</span> is an advanced software solution designed to provide{" "}
//               <span className="text-white font-medium">real-time monitoring of the Bus Transfer System 2000 (BTS-2000)</span>. Unlike conventional relay panels or bulky SCADA systems, TransSync delivers a modern, lightweight, and user-friendly platform for engineers and operators to ensure seamless power continuity.
//             </p>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
//           {[
//             {
//               icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               ),
//               title: "Real-Time Monitoring",
//               description: "Monitor live parameters of BTS-2000 including bus voltages, frequency, and switch status in a single dashboard. Gain instant insights without relying on outdated relay panels."
//             },
//             {
//               icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
//                 </svg>
//               ),
//               title: "Lightweight SCADA Alternative",
//               description: "Traditional SCADA systems can be complex and resource-intensive. TransSync provides the same critical visibility with a simplified, cost-effective interface."
//             },
//             {
//               icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               ),
//               title: "Proactive Alerts",
//               description: "Get notified instantly in case of bus transfer failures, abnormal conditions, or synchronization issues, enabling operators to act before disruptions occur."
//             },
//             {
//               icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//               ),
//               title: "Secure & Scalable",
//               description: "Built with modern security standards, TransSync ensures safe data handling and is scalable for multiple installations across plants and facilities."
//             }
//           ].map((feature, index) => (
//             <div key={index} className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg">
//               <div className="flex items-start mb-4">
//                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg mr-4 shadow-sm">
//                   {feature.icon}
//                 </div>
//                 <h2 className="text-lg md:text-xl font-semibold text-gray-900">{feature.title}</h2>
//               </div>
//               <p className="text-gray-600 leading-relaxed text-sm md:text-base">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
//           {[
//             { value: "95%", label: "Faster Issue Detection" },
//             { value: "70%", label: "Cost Reduction" },
//             { value: "24/7", label: "Monitoring" },
//             { value: "99.9%", label: "Uptime" }
//           ].map((stat, index) => (
//             <div key={index} className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm text-center group hover:shadow-md transition-shadow duration-300">
//               <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
//                 {stat.value}
//               </div>
//               <p className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Why Choose Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-xl mb-16">
//           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
//           <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>
          
//           <div className="relative z-10 text-center text-white">
//             <h2 className="text-2xl md:text-3xl font-bold mb-6">
//               Why Choose <span className="text-white">TransSync</span>?
//             </h2>
//             <div className="w-16 h-0.5 bg-white/50 mx-auto mb-8 rounded-full"></div>
//             <p className="text-base text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
//               With its intuitive design, real-time insights, and cost-effective approach, TransSync empowers industries to maintain reliable power continuity without the overhead of conventional relay panels or heavy SCADA systems.
//             </p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
//               {[
//                 { 
//                   icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
//                   label: "Real-time Data" 
//                 },
//                 { 
//                   icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
//                   label: "Cost Effective" 
//                 },
//                 { 
//                   icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
//                   label: "Secure & Reliable" 
//                 },
//                 { 
//                   icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
//                   label: "Easy Integration" 
//                 }
//               ].map((item, index) => (
//                 <div key={index} className="text-center group">
//                   <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
//                     </svg>
//                   </div>
//                   <p className="text-sm font-medium text-white/95">{item.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="text-center mt-16">
//           <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Power Monitoring?</h3>
//           <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6">
//             Experience the future of bus transfer system monitoring with a personalized demo tailored to your specific needs.
//           </p>
//           <button 
//             onClick={handleRequestDemo} 
//             className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl inline-flex items-center"
//           >
//             Request a Demo
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function About() {
//   const navigate = useNavigate();

//   const handleRequestDemo = () => {
//     navigate("/request-demo");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-white">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50"></div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="text-center">
//             {/* Logo */}
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-xl mb-8">
//               <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
            
//             {/* Title */}
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">TransSync</span>
//             </h1>
            
//             {/* Subtitle */}
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//               Advanced monitoring platform for Bus Transfer System 2000 by Aartech Solonics Limited
//             </p>
            
//             {/* Divider */}
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full mb-12"></div>
//           </div>
//         </div>
//       </div>

//       {/* Overview Section */}
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">
//           <div className="flex items-start">
//             <div className="hidden md:block mr-6 flex-shrink-0">
//               <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Industrial Monitoring Platform</h2>
//               <p className="text-gray-700 leading-relaxed text-lg">
//                 TransSync is a modern software solution designed for real-time monitoring of Bus Transfer System 2000. 
//                 It provides critical operational insights with an intuitive interface, replacing complex legacy systems 
//                 and ensuring uninterrupted power continuity in industrial facilities.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Features</h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Designed for reliability, efficiency, and operational excellence
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {[
//             {
//               title: "Real-Time Monitoring",
//               description: "Monitor live parameters including bus voltages, frequency, and switch status with sub-second updates.",
//               icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
//               color: "from-blue-600 to-blue-700"
//             },
//             {
//               title: "Lightweight SCADA",
//               description: "Get SCADA-level insights without the complexity and cost of traditional systems.",
//               icon: "M13 10V3L4 14h7v7l9-11h-7z",
//               color: "from-cyan-500 to-blue-600"
//             },
//             {
//               title: "Predictive Alerts",
//               description: "Advanced anomaly detection identifies potential issues before they impact operations.",
//               icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
//               color: "from-blue-600 to-cyan-500"
//             },
//             {
//               title: "Enterprise Security",
//               description: "Industrial-grade security protocols with scalable architecture for multiple facilities.",
//               icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
//               color: "from-blue-700 to-blue-800"
//             }
//           ].map((feature, index) => (
//             <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
//               <div className="flex items-start space-x-4">
//                 <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-lg flex-shrink-0`}>
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
//                   <p className="text-gray-700 leading-relaxed">{feature.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-white mb-4">Performance Metrics</h2>
//             <p className="text-blue-100 text-lg">Validated results from industrial deployments</p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { value: "99.9%", label: "System Uptime" },
//               { value: "≤50ms", label: "Response Time" },
//               { value: "95%", label: "Faster Detection" },
//               { value: "70%", label: "Cost Reduction" }
//             ].map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
//                 <div className="text-blue-100 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Advantages Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TransSync</h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Engineered for reliability in demanding industrial environments
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {[
//             {
//               title: "24/7 Support",
//               description: "Continuous monitoring with automated failover systems"
//             },
//             {
//               title: "Multi-Site Ready",
//               description: "Scalable architecture for enterprise deployments"
//             },
//             {
//               title: "Easy Integration",
//               description: "Compatible with existing industrial infrastructure"
//             }
//           ].map((item, index) => (
//             <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
//               <p className="text-gray-700 text-sm">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-gray-900 py-20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Monitoring?</h2>
//           <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
//             Schedule a personalized demonstration to see TransSync in action
//           </p>
//           <button 
//             onClick={handleRequestDemo}
//             className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
//           >
//             Request a Demo
//             <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//             </svg>
//           </button>
//           <p className="text-gray-400 text-sm mt-4">Contact our industrial solutions team</p>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function About() {
//   const navigate = useNavigate();

//   const handleRequestDemo = () => {
//     navigate("/request-demo");
//   };

//   const features = [
//     {
//       icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
//       title: "Real-Time Monitoring",
//       description: "Monitor bus voltages, frequency, and switch status with sub-second updates and live data streaming.",
//       stats: "50ms latency"
//     },
//     {
//       icon: "M13 10V3L4 14h7v7l9-11h-7z",
//       title: "Lightweight SCADA",
//       description: "Enterprise-grade SCADA functionality without the complexity and cost of traditional systems.",
//       stats: "95% lighter"
//     },
//     {
//       icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
//       title: "Predictive Analytics",
//       description: "Advanced algorithms detect anomalies and predict failures before they impact operations.",
//       stats: "30% faster detection"
//     },
//     {
//       icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
//       title: "Enterprise Security",
//       description: "Industrial-grade security with encrypted communications and multi-layer protection.",
//       stats: "Zero incidents"
//     },
//     {
//       icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
//       title: "Cloud Integration",
//       description: "Seamless integration with cloud platforms for remote monitoring and data analytics.",
//       stats: "AWS/Azure ready"
//     },
//     {
//       icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
//       title: "Multi-Site Support",
//       description: "Centralized monitoring for multiple facilities with role-based access control.",
//       stats: "Unlimited sites"
//     }
//   ];

//   const stats = [
//     { value: "99.9%", label: "System Uptime", description: "Guaranteed reliability" },
//     { value: "<50ms", label: "Response Time", description: "Near real-time updates" },
//     { value: "24/7", label: "Monitoring", description: "Continuous operation" },
//     { value: "70%", label: "Cost Reduction", description: "Vs traditional SCADA" }
//   ];

//   const advantages = [
//     {
//       title: "Industrial Grade Reliability",
//       description: "Built for 24/7 operation in harsh industrial environments with automatic failover systems."
//     },
//     {
//       title: "Scalable Architecture",
//       description: "From single-site installations to multi-facility enterprise deployments with centralized management."
//     },
//     {
//       title: "Easy Integration",
//       description: "Compatible with existing PLCs, RTUs, and industrial protocols including Modbus and IEC 61850."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
//                             linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
//             backgroundSize: "40px 40px",
//           }}></div>
//         </div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="text-center">
//             {/* Logo/Badge */}
//             <div className="inline-flex items-center justify-center mb-8">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-50"></div>
//                 <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl">
//                   <span className="text-2xl font-bold text-white">TS</span>
//                 </div>
//               </div>
//             </div>

//             {/* Title */}
//             <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
//               About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">TransSync</span>
//             </h1>
            
//             {/* Subtitle */}
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
//               Advanced monitoring platform for Bus Transfer System 2000 by Aartech Solonics Limited
//             </p>
            
//             {/* Divider */}
//             <div className="flex justify-center mb-12">
//               <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
//             </div>
            
//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
//               {stats.map((stat, index) => (
//                 <div key={index} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
//                   <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
//                   <div className="text-sm font-medium text-blue-300">{stat.label}</div>
//                   <div className="text-xs text-gray-400 mt-1">{stat.description}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission Statement */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className={`bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden`}>
//             <div className="p-8 md:p-12 lg:p-16">
//               <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
//                 {/* Icon */}
//                 <div className="flex-shrink-0">
//                   <div className="bg-gradient-to-br from-blue-600 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl">
//                     <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                 </div>
                
//                 {/* Content */}
//                 <div className="flex-1">
//                   <h2 className="text-3xl font-bold text-gray-900 mb-6">Industrial Monitoring Platform</h2>
//                   <div className="space-y-4">
//                     <p className="text-gray-700 text-lg leading-relaxed">
//                       TransSync represents a paradigm shift in industrial monitoring. Developed specifically for 
//                       Aartech Solonics' Bus Transfer System 2000, it provides critical operational insights through 
//                       an intuitive, modern interface.
//                     </p>
//                     <p className="text-gray-700 text-lg leading-relaxed">
//                       Our platform replaces complex legacy systems with a streamlined solution that ensures 
//                       uninterrupted power continuity in mission-critical industrial facilities, delivering 
//                       enterprise-grade functionality at a fraction of the cost.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-gradient-to-b from-white to-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Capabilities</h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               Designed for reliability, efficiency, and operational excellence in demanding industrial environments
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature, index) => (
//               <div 
//                 key={index}
//                 className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
//               >
//                 {/* Icon Container */}
//                 <div className="mb-6">
//                   <div className="relative inline-flex">
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
//                     <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 p-3 rounded-xl">
//                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4 leading-relaxed">
//                   {feature.description}
//                 </p>
                
//                 {/* Stats Badge */}
//                 <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
//                   <span className="text-sm font-medium text-blue-700">{feature.stats}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Technology Stack */}
//       <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technology Stack</h2>
//             <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//               Built with modern technologies for maximum performance and reliability
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               { name: "React.js", description: "Frontend Framework", color: "from-blue-400 to-cyan-300" },
//               { name: "Node.js", description: "Backend Runtime", color: "from-green-400 to-emerald-300" },
//               { name: "MQTT", description: "Real-time Protocol", color: "from-purple-400 to-pink-300" },
//               { name: "WebSocket", description: "Live Communication", color: "from-yellow-400 to-orange-300" },
//             ].map((tech, index) => (
//               <div 
//                 key={index}
//                 className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
//               >
//                 <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-4 mx-auto`}>
//                   <span className="text-lg font-bold text-white">{tech.name.charAt(0)}</span>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-xl font-bold text-white mb-1">{tech.name}</div>
//                   <div className="text-sm text-gray-300">{tech.description}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Advantages Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Enterprise Advantages</h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               Why industry leaders choose TransSync for their critical operations
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {advantages.map((advantage, index) => (
//               <div 
//                 key={index}
//                 className="relative group"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
//                 <div className="relative bg-white rounded-2xl border border-gray-200 p-8 h-full">
//                   <div className="flex items-center mb-6">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
//                       <div className="w-6 h-6 bg-white rounded-full"></div>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900">{advantage.title}</h3>
//                   </div>
//                   <p className="text-gray-600 leading-relaxed">
//                     {advantage.description}
//                   </p>
//                   <div className="mt-6 pt-6 border-t border-gray-100">
//                     <div className="flex items-center text-blue-600 font-medium">
//                       <span>Learn more</span>
//                       <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Partnership Section */}
//       <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row items-center gap-12">
//             <div className="flex-1">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Powered by <span className="text-blue-600">Aartech Solonics</span>
//               </h2>
//               <p className="text-gray-700 text-lg leading-relaxed mb-8">
//                 As a subsidiary of Aartech Solonics Limited, TransSync benefits from decades of industrial 
//                 automation expertise. Our partnership ensures that every feature is designed with real-world 
//                 operational needs in mind.
//               </p>
//               <div className="flex items-center space-x-4">
//                 <div className="bg-white px-4 py-2 rounded-lg border border-gray-300">
//                   <div className="text-sm font-medium text-gray-600">ISO 9001:2015</div>
//                 </div>
//                 <div className="bg-white px-4 py-2 rounded-lg border border-gray-300">
//                   <div className="text-sm font-medium text-gray-600">IEC 60947 Certified</div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex-shrink-0">
//               <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
//                 <div className="text-center">
//                   <div className="text-4xl font-bold text-blue-600 mb-2">BTS-2000</div>
//                   <div className="text-sm text-gray-600 uppercase tracking-wider">Bus Transfer System</div>
//                   <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto my-4 rounded-full"></div>
//                   <div className="text-lg font-medium text-gray-800">Integrated Monitoring Platform</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Ready to Transform Your Monitoring?
//           </h2>
//           <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
//             Schedule a personalized demonstration to see TransSync in action with your BTS-2000 system
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button 
//               onClick={handleRequestDemo}
//               className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
//             >
//               <span className="relative z-10 flex items-center justify-center">
//                 Request a Live Demo
//                 <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                 </svg>
//               </span>
//             </button>
            
//             <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
//               <span className="flex items-center justify-center">
//                 Download Brochure
//                 <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </span>
//             </button>
//           </div>
          
//           <p className="text-gray-400 text-sm mt-8">
//             Contact our industrial solutions team • 24/7 Technical Support
//           </p>
//         </div>
//       </section>

//       {/* Footer Note */}
//       <footer className="py-8 bg-gray-900 border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="mb-4 md:mb-0">
//               <div className="flex items-center space-x-3">
//                 <div className="bg-gradient-to-br from-blue-600 to-cyan-500 w-8 h-8 rounded-lg flex items-center justify-center">
//                   <span className="text-sm font-bold text-white">TS</span>
//                 </div>
//                 <div>
//                   <div className="text-lg font-bold text-white">TransSync</div>
//                   <div className="text-sm text-gray-400">Industrial Monitoring Platform</div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="text-gray-500 text-sm text-center md:text-right">
//               <div>© {new Date().getFullYear()} Aartech Solonics Limited. All rights reserved.</div>
//               <div className="mt-1">BTS-2000 Monitoring System v2.0</div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }




// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function About() {
//   const navigate = useNavigate();

//   const handleRequestDemo = () => {
//     navigate("/request-demo");
//   };

//   const features = [
//     {
//       // icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
//       title: "Real-Time Monitoring",
//       description: "Monitor bus voltages, frequency, and switch status with sub-second updates and live data streaming.",
//       stats: "50ms latency"
//     },
//     {
//       // icon: "M13 10V3L4 14h7v7l9-11h-7z",
//       title: "Lightweight SCADA",
//       description: "Enterprise-grade SCADA functionality without the complexity and cost of traditional systems.",
//       stats: "95% lighter"
//     },
//     {
//       // icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
//       title: "Predictive Analytics",
//       description: "Advanced algorithms detect anomalies and predict failures before they impact operations.",
//       stats: "30% faster detection"
//     },
//     {
//       // icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
//       title: "Enterprise Security",
//       description: "Industrial-grade security with encrypted communications and multi-layer protection.",
//       stats: "Zero incidents"
//     },
//     {
//       // icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
//       title: "Cloud Integration",
//       description: "Seamless integration with cloud platforms for remote monitoring and data analytics.",
//       stats: "AWS/Azure ready"
//     },
//     {
//       // icon : "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
//       title: "Multi-Site Support",
//       description: "Centralized monitoring for multiple facilities with role-based access control.",
//       stats: "Unlimited sites"
//     }
//   ];

//   const stats = [
//     { value: "99.9%", label: "System Uptime", description: "Guaranteed reliability" },
//     { value: "<200ms", label: "Response Time", description: "Near real-time updates" },
//     { value: "24/7", label: "Monitoring", description: "Continuous operation" },
//     { value: "70%", label: "Cost Reduction", description: "Vs traditional SCADA" }
//   ];

//   const advantages = [
//     {
//       title: "Industrial Grade Reliability",
//       description: "Built for 24/7 operation in harsh industrial environments with automatic failover systems."
//     },
//     {
//       title: "Scalable Architecture",
//       description: "From single-site installations to multi-facility enterprise deployments with centralized management."
//     },
//     {
//       title: "Easy Integration",
//       description: "Compatible with existing PLCs, RTUs, and industrial protocols including Modbus and IEC 61850."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b  from-gray-50 via-white to-gray-50">
//       {/* Hero Section - Enhanced with more depth and animations */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
//         {/* Animated background elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute inset-0" style={{
//               backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1.5px, transparent 1.5px)`,
//               backgroundSize: "60px 60px",
//             }}></div>
//           </div>
          
//           {/* Floating orbs */}
//           <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute top-40 right-40 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
//         </div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
//           <div className="text-center ">
//             {/* Logo/Badge - Enhanced with premium effects */}
//             {/* <div className="inline-flex items-center justify-center mb-8 group">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-2xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
//                 <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 w-28 h-28 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
//                   <span className="text-3xl font-black text-white tracking-tighter">TS</span>
//                 </div>
//               </div>
//             </div> */}

//             {/* Title - Enhanced typography */}
//             <h1 className="text-2xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
//               About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300 animate-gradient">TransSync</span>
//             </h1>
            
//             {/* Subtitle - Enhanced readability */}
//             <p className="text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
//               Advanced monitoring platform for Bus Transfer System 2000 by Aartech Solonics Limited
//             </p>
            
//             {/* Divider - Enhanced gradient animation */}
//             <div className="flex justify-center mb-12">
//               <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full animate-gradient-x"></div>
//             </div>
            
//             {/* Stats - Enhanced glass morphism */}
//             <div className="grid grid-cols-2 md:grid-cols-4  gap-6 max-w-2xl mx-auto">
//               {stats.map((stat, index) => (
//                 <div 
//                   key={index} 
//                   className="text-center p-5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105"
//                 >
//                   <div className="text-3xl overflow-hidden md:text-4xl font-black text-white mb-1 bg-gradient-to-b from-white to-blue-100 bg-clip-text text-transparent">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm font-bold text-cyan-200 uppercase tracking-wider">{stat.label}</div>
//                   <div className="text-xs text-blue-200/80 mt-1 font-medium">{stat.description}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom wave effect */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg className="w-full h-auto" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M0 50L60 55.6C120 61.2 240 72.4 360 72.2C480 72 600 61.2 720 50C840 38.8 960 27.6 1080 22.2C1200 16.8 1320 16.8 1380 16.8L1440 16.8V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" 
//               className="fill-white dark:fill-gray-900" fill="white"/>
//           </svg>
//         </div>
//       </section>

//       {/* Mission Statement - Enhanced with premium card design */}
//       <section className="py-20 md:py-28 relative">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-4xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-3xl transition-shadow duration-500">
//             <div className="p-8 md:p-12 lg:p-16">
//               <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-12">
//                 {/* Icon - Enhanced */}
//                 <div className="flex-shrink-0">
//                   <div className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
//                     <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
//                       <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Content - Enhanced typography */}
//                 <div className="flex-1">
//                   <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">
//                     Industrial Monitoring Platform
//                   </h2>
//                   <div className="space-y-5">
//                     <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light">
//                       TransSync represents a paradigm shift in industrial monitoring. Developed specifically for 
//                       Aartech Solonics' Bus Transfer System 2000, it provides critical operational insights through 
//                       an intuitive, modern interface.
//                     </p>
//                     <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light">
//                       Our platform replaces complex legacy systems with a streamlined solution that ensures 
//                       uninterrupted power continuity in mission-critical industrial facilities, delivering 
//                       enterprise-grade functionality at a fraction of the cost.
//                     </p>
//                   </div>
                  
//                   {/* Decorative line */}
//                   <div className="mt-8 h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section - Enhanced with better cards and animations */}
//       <section className="py-20 md:py-28 bg-gradient-to-b from-white via-blue-50/30 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-sm font-bold uppercase tracking-wider mb-6">
//               Core Capabilities
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
//               Advanced Features
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
//               Designed for reliability, efficiency, and operational excellence in demanding industrial environments
//             </p>
//             <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto"></div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index}
//                 className="group border-gray-250  bg-white rounded-3xl border  p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 relative overflow-hidden"
//               >
//                 {/* Background gradient effect on hover */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
//                 {/* Icon Container - Enhanced */}
//                 {/* <div className="mb-6 relative">
//                   <div className="relative inline-flex">
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
//                     <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-4 rounded-xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-500">
//                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
//                       </svg>
//                     </div>
//                   </div>
//                 </div> */}

//                 {/* Content - Enhanced */}
                
//                 <h3 className="text-xl font-bold  text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 relative">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 mb-6 leading-relaxed relative">
//                   {feature.description}
//                 </p>
                
//                 {/* Stats Badge - Enhanced */}
//                 <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 relative group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-300">
//                   <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-2 animate-pulse"></div>
//                   <span className="text-sm font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
//                     {feature.stats}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Technology Stack - Enhanced with premium dark design */}
//       <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
//         {/* Animated background */}
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 opacity-10" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//             backgroundSize: "60px 60px",
//           }}></div>
          
//           {/* Floating orbs */}
//           <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
//         </div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-cyan-200 text-sm font-bold uppercase tracking-wider border border-white/20 mb-6">
//               Technology Stack
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
//               Built With Excellence
//             </h2>
//             <p className="text-xl text-blue-200/90 max-w-3xl mx-auto font-light">
//               Built with modern technologies for maximum performance and reliability
//             </p>
//           </div>

          
//         </div>
//       </section>

//       {/* Advantages Section - Enhanced with premium cards */}
//       <section className="py-20 md:py-28 relative">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-sm font-bold uppercase tracking-wider mb-6">
//               Enterprise Advantages
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
//               Why Choose TransSync
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
//               Why industry leaders choose TransSync for their critical operations
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {advantages.map((advantage, index) => (
//               <div 
//                 key={index}
//                 className="relative group"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
//                 <div className="relative bg-white rounded-3xl border border-gray-200 p-10 h-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-bl-full"></div>
                  
//                   <div className="flex items-center mb-6">
//                     <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mr-5 shadow-lg transform group-hover:scale-110 transition-transform duration-500">
//                       <div className="w-7 h-7 bg-white rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
//                     </div>
//                     <h3 className="text-xl font-black text-gray-900 tracking-tight">{advantage.title}</h3>
//                   </div>
                  
//                   <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">
//                     {advantage.description}
//                   </p>
                  
//                   <div className="mt-8 pt-6 border-t border-gray-100">
//                     <div className="flex items-center text-blue-600 font-bold group/link">
//                       <span className="group-hover/link:translate-x-1 transition-transform duration-300">Learn more</span>
//                       <svg className="w-5 h-5 ml-2 transform group-hover/link:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Partnership Section - Enhanced with premium design */}
//       <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
//         {/* Decorative elements */}
//         <div className="absolute inset-0">
//           <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
//         </div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
//             <div className="flex-1">
//               {/* <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-sm font-bold uppercase tracking-wider mb-6">
//                 Strategic Partnership
//               </div> */}
//               <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
//                 Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Aartech Solonics</span>
//               </h2>
//               <p className="text-gray-700 text-xl leading-relaxed mb-8 font-light">
//                 As a subsidiary of Aartech Solonics Limited, TransSync benefits from decades of industrial 
//                 automation expertise. Our partnership ensures that every feature is designed with real-world 
//                 operational needs in mind.
//               </p>
//               {/* <div className="flex items-center space-x-4">
//                 <div className="bg-white/80 backdrop-blur-lg px-5 py-2.5 rounded-xl border border-blue-200 shadow-lg">
//                   <div className="text-sm font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">ISO 9001:2015</div>
//                 </div>
//                 <div className="bg-white/80 backdrop-blur-lg px-5 py-2.5 rounded-xl border border-blue-200 shadow-lg">
//                   <div className="text-sm font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">IEC 60947 Certified</div>
//                 </div>
//               </div> */}
//             </div>
            
//             <div className="flex-shrink-0">
//               <div className="relative group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
//                 <div className="relative bg-white p-10 rounded-2xl shadow-2xl border border-gray-200 transform group-hover:scale-105 transition-transform duration-500">
//                   <div className="text-center">
//                     <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3 tracking-tight">
//                       BTS-2000
//                     </div>
//                     <div className="text-sm text-gray-700 uppercase tracking-wider font-bold border-b border-gray-200 pb-3 mb-3">
//                       Bus Transfer System
//                     </div>
//                     <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto my-4 rounded-full"></div>
//                     <div className="text-lg font-bold text-gray-800">
//                       Integrated Monitoring Platform
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section - Enhanced with premium effects */}
//       <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
//         {/* Animated background */}
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 opacity-20" style={{
//             backgroundImage: `radial-gradient(circle at 2px 2px, #60a5fa 1px, transparent 1px)`,
//             backgroundSize: "40px 40px",
//           }}></div>
          
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
//         </div>
        
//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-cyan-200 text-sm font-bold uppercase tracking-wider border border-white/20 mb-8">
//             Get Started Today
//           </div>
          
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
//             Ready to Transform Your Monitoring?
//           </h2>
          
//           <p className="text-xl md:text-2xl text-blue-200/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
//             Schedule a personalized demonstration to see TransSync in action with your BTS-2000 system
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <button 
//               onClick={handleRequestDemo}
//               className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 text-white font-bold py-5 px-10 rounded-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 shadow-2xl hover:shadow-3xl"
//             >
//               <span className="relative z-10 flex items-center justify-center text-lg">
//                 Request a Live Demo
//                 <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                 </svg>
//               </span>
//             </button>
            
//             <button className="group relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/30 text-white font-bold py-5 px-10 rounded-xl hover:bg-white/20 transition-all duration-500 hover:-translate-y-1 hover:scale-105">
//               <span className="flex items-center justify-center text-lg">
//                 Download Brochure
//                 <svg className="w-5 h-5 ml-3 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </span>
//             </button>
//           </div>
          
//           <div className="mt-12 pt-8 border-t border-white/20">
//             <p className="text-blue-200/80 text-lg font-medium flex items-center justify-center gap-3">
//               <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
//               Contact our industrial solutions team • 24/7 Technical Support
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer Note - Enhanced with premium design */}
//       <footer className="py-10 bg-gradient-to-br from-gray-900 to-indigo-900 border-t border-gray-800/50 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-5" style={{
//           backgroundImage: `linear-gradient(45deg, #3b82f6 1px, transparent 1px)`,
//           backgroundSize: "30px 30px",
//         }}></div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//             <div className="flex items-center space-x-4 group">
//               <div className="bg-gradient-to-br from-blue-600 to-cyan-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
//                 <span className="text-lg font-black text-white">TS</span>
//               </div>
//               <div>
//                 <div className="text-xl font-black text-white tracking-tight">TransSync</div>
//                 <div className="text-sm text-blue-200/80 font-medium">Industrial Monitoring Platform</div>
//               </div>
//             </div>
            
//             <div className="text-center md:text-right">
//               <div className="text-gray-400 text-sm font-medium">© {new Date().getFullYear()} Aartech Solonics Limited. All rights reserved.</div>
//               <div className="text-blue-300/80 text-sm mt-1.5 font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 BTS-2000 Monitoring System v2.0
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Global Styles for custom animations */}
//       <style jsx>{`
//         @keyframes gradient-x {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
        
//         .animate-gradient-x {
//           background-size: 200% 200%;
//           animation: gradient-x 3s ease infinite;
//         }
        
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient-x 5s ease infinite;
//         }
        
//         .bg-grid-pattern {
//           background-image: linear-gradient(to right, #3b82f6 1px, transparent 1px),
//                           linear-gradient(to bottom, #3b82f6 1px, transparent 1px);
//         }
//       `}</style>
//     </div>
//   );
// }







import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const handleRequestDemo = () => {
    navigate("/request-demo");
  };

  const features = [
    {
      title: "Real-Time Monitoring",
      description: "Monitor bus voltages, frequency, and switch status with sub-second updates and live data streaming.",
      stats: "50ms latency"
    },
    {
  title: "Role-Based Access Control",
  description: "Granular permissions with multi-factor authentication.",
  stats: "2 step verification"
},
   {
  title: "Mobile Accessibility",
  description: "Monitor your BTS-2000 fleet from anywhere with responsive mobile design.",
  stats: "100% responsive"
},
    {
      title: "Enterprise Security",
      description: "Industrial-grade security with encrypted communications and multi-layer protection.",
      stats: "Zero incidents"
    },
    {
      title: "Cloud Integration",
      description: "Seamless integration with cloud platforms for remote monitoring and data analytics.",
      stats: "AWS/Azure ready"
    },
    {
      title: "Multi-Site Support",
      description: "Centralized monitoring for multiple facilities with role-based access control.",
      stats: "Unlimited sites"
    }
  ];

  const stats = [
    { value: "24/7", label: "Support", description: "Expert assistance" },
    { value: "<200ms", label: "Response Time", description: "Near real-time updates" },
    { value: "24/7", label: "Monitoring", description: "Continuous operation" },
    { value: "99.9%", label: "System Uptime", description: "Reliability you can trust" },
  ];

  const advantages = [
    {
      title: "Industrial Grade Reliability",
      description: "Built for 24/7 operation in harsh industrial environments with automatic failover systems."
    },
    {
      title: "Scalable Architecture",
      description: "From single-site installations to multi-facility enterprise deployments with centralized management."
    },
    {
      title: "Easy Integration",
      description: "Compatible with existing PLCs, RTUs, and industrial protocols including Modbus and IEC 61850."
    }
  ];

  // Theme color: #0AC4E0
  const themeColor = "#0AC4E0";

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 border-b border-slate-800">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #f59e0b 1.5px, transparent 1.5px)`,
              backgroundSize: "60px 60px",
            }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="text-center">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tight px-4">
              About <span className="text-amber-400">TransSync</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed font-light px-4">
              Advanced monitoring platform for Bus Transfer System 2000 by Aartech Solonics Limited
            </p>

            {/* Divider */}
            <div className="flex justify-center mb-8 md:mb-12">
              <div className="w-20 sm:w-24 md:w-32 h-1 bg-amber-500"></div>
            </div>

            {/* Stats - Responsive grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 sm:p-4 md:p-5 bg-slate-950 rounded-md border border-slate-800 hover:border-amber-500/40 transition-colors duration-200"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium hidden sm:block">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
            <div className="p-6 md:p-8 lg:p-12 xl:p-16">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8 lg:gap-12">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="bg-amber-500 w-20 h-20 md:w-24 md:h-24 rounded-md flex items-center justify-center">
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 md:mb-6 tracking-tight">
                    Industrial Monitoring Platform
                  </h2>
                  <div className="space-y-4 md:space-y-5">
                    <p className="text-slate-400 text-base md:text-lg lg:text-xl leading-relaxed font-light">
                      TransSync represents a paradigm shift in industrial monitoring. Developed specifically for
                      Aartech Solonics' Bus Transfer System 2000, it provides critical operational insights through
                      an intuitive, modern interface.
                    </p>
                    {/* <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed font-light">
                      Our platform replaces complex legacy systems with a streamlined solution that ensures
                      uninterrupted power continuity in mission-critical industrial facilities.
                    </p> */}
                  </div>

                  {/* Decorative line */}
                  <div className="mt-6 md:mt-8 h-1 w-24 bg-amber-500 mx-auto lg:mx-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-4 md:mb-6">
              Core Capabilities
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 tracking-tight px-4">
              Advanced Features
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-light px-4">
              Designed for reliability, efficiency, and operational excellence in demanding industrial environments
            </p>
            <div className="mt-4 w-24 h-1 bg-amber-500 mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-900 rounded-lg border border-slate-800 p-6 md:p-8 hover:border-amber-500/40 transition-colors duration-200"
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-slate-400 mb-4 md:mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats Badge */}
                <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-md bg-amber-500/10 border border-amber-500/30">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-xs md:text-sm font-bold text-amber-400">
                    {feature.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 md:py-20 lg:py-28 relative overflow-hidden bg-slate-900 border-t border-slate-800">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-4 md:mb-6">
              Technology Stack
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 tracking-tight px-4">
              Built With Excellence
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-light px-4">
              Built with modern technologies for maximum performance and reliability
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 md:py-20 lg:py-28 relative bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-4 md:mb-6">
              Enterprise Advantages
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 tracking-tight px-4">
              Why Choose TransSync
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-light px-4">
              Why industry leaders choose TransSync for their critical operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="group"
              >
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 md:p-8 lg:p-10 h-full hover:border-amber-500/40 transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-start gap-4 mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-500 rounded-md flex items-center justify-center flex-shrink-0">
                      <div className="w-5 h-5 md:w-7 md:h-7 bg-slate-950 rounded-md transform rotate-45"></div>
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-white tracking-tight">{advantage.title}</h3>
                  </div>

                  <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6 md:mb-8 font-light">
                    {advantage.description}
                  </p>

                  {/* <div className="mt-auto pt-4 md:pt-6 border-t border-gray-100">
                    <div className="flex items-center text-[#0AC4E0] font-bold group/link">
                      <span className="text-sm md:text-base group-hover/link:translate-x-1 transition-transform duration-300">Learn more</span>
                      <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 transform group-hover/link:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 md:py-20 lg:py-28 relative overflow-hidden bg-slate-900 border-t border-slate-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left px-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 tracking-tight">
                Powered by <span className="text-amber-400">Aartech Solonics</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-6 md:mb-8 font-light">
                As a subsidiary of Aartech Solonics Limited, TransSync benefits from decades of industrial
                automation expertise. Our partnership ensures that every feature is designed with real-world
                operational needs in mind.
              </p>
            </div>

            <div className="flex-shrink-0 px-4">
              <div className="bg-slate-950 p-6 md:p-8 lg:p-10 rounded-lg border border-slate-800">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-black text-amber-400 mb-2 md:mb-3 tracking-tight">
                    BTS-2000
                  </div>
                  <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800 pb-2 md:pb-3 mb-2 md:mb-3">
                    Bus Transfer System
                  </div>
                  <div className="w-12 md:w-16 h-1 bg-amber-500 mx-auto my-3 md:my-4"></div>
                  <div className="text-base md:text-lg font-bold text-white">
                    Integrated Monitoring Platform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-28 relative overflow-hidden bg-slate-950 border-t border-slate-800">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-6 md:mb-8">
            Get Started Today
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tight px-4">
            Ready to Transform Your Monitoring?
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-slate-400 mb-8 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed px-4">
            Schedule a personalized demonstration to see TransSync in action with your BTS-2000 system
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
            <button
              onClick={handleRequestDemo}
              className="bg-amber-500 text-slate-950 font-bold uppercase tracking-wide py-4 md:py-5 px-6 md:px-8 lg:px-10 rounded-md hover:bg-amber-400 transition-colors duration-200 text-sm md:text-base"
            >
              <span className="flex items-center justify-center">
                Request a Live Demo
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            <button className="bg-transparent border border-slate-700 text-white font-bold uppercase tracking-wide py-4 md:py-5 px-6 md:px-8 lg:px-10 rounded-md hover:border-amber-500 hover:text-amber-400 transition-colors duration-200 text-sm md:text-base">
              <span className="flex items-center justify-center">
                Download Brochure
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            </button>
          </div>

          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-800 px-4">
            <p className="text-slate-400 text-sm md:text-base lg:text-lg font-medium flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>Contact our industrial solutions team • 24/7 Technical Support</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}