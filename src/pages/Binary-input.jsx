
// // ///////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";

// const API_BASE = "https://mqtt-testing-2.onrender.com";

// export default function BinaryIO() {
//   const [activeTab, setActiveTab] = useState("inputs");
//   const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
//   const [searchTerm, setSearchTerm] = useState("");
//   const [connected, setConnected] = useState(false);
//   const [biSignals, setBiSignals] = useState([]);
//   const [boSignals, setBoSignals] = useState([]);
//   const [isDarkMode, setIsDarkMode] = useState(true);

//   useEffect(() => {
//     // Check if user has a theme preference
//     const savedTheme = localStorage.getItem('binaryio-theme');
//     if (savedTheme === 'light') {
//       setIsDarkMode(false);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     localStorage.setItem('binaryio-theme', newMode ? 'dark' : 'light');
//   };

//   // Single SSE Stream for both BI and BO
//   useEffect(() => {
//     const source = new EventSource(`${API_BASE}/api/v1/stream/bi-bo`);

//     source.onopen = () => setConnected(true);
//     source.onerror = () => setConnected(false);

//     source.onmessage = (e) => {
//       try {
//         const data = JSON.parse(e.data);
        
//         // Handle both BI and BO data from single stream
//         if (data.bi && Array.isArray(data.bi)) {
//           setBiSignals(data.bi);
//         }
        
//         if (data.bo && Array.isArray(data.bo)) {
//           setBoSignals(data.bo);
//         }
        
//         // Handle combined format if both are in one array
//         if (data.signals && Array.isArray(data.signals)) {
//           // Separate BI and BO signals
//           const bi = data.signals.filter(s => 
//             s.address && s.address.includes('I') || 
//             s.type === 'INPUT' || 
//             s.tag.toLowerCase().includes('input')
//           );
//           const bo = data.signals.filter(s => 
//             s.address && s.address.includes('O') || 
//             s.type === 'OUTPUT' || 
//             s.tag.toLowerCase().includes('output')
//           );
          
//           if (bi.length > 0) setBiSignals(bi);
//           if (bo.length > 0) setBoSignals(bo);
//         }
        
//         // Handle alternative format
//         if (data.data && Array.isArray(data.data)) {
//           const bi = [];
//           const bo = [];
          
//           data.data.forEach(item => {
//             if (item.address && item.address.includes('I')) {
//               bi.push(item);
//             } else if (item.address && item.address.includes('O')) {
//               bo.push(item);
//             }
//           });
          
//           if (bi.length > 0) setBiSignals(bi);
//           if (bo.length > 0) setBoSignals(bo);
//         }
        
//       } catch (err) {
//         console.error("SSE parse error:", err);
//       }
//     };

//     return () => {
//       source.close();
//     };
//   }, []);

//   // Helper functions
//   const formatName = (tag) => {
//     return tag
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, l => l.toUpperCase());
//   };

//   const getSignalType = (address) => {
//     if (!address) return 'UNKNOWN';
//     if (address.includes('I')) return 'INPUT';
//     if (address.includes('O')) return 'OUTPUT';
//     if (address.includes('M')) return 'MEMORY';
//     return 'INTERNAL';
//   };

//   const getStatusColor = (value, type) => {
//     if (type === 'INPUT') {
//       return value ? 
//         (isDarkMode ? 'bg-green-900 border-green-500' : 'bg-green-100 border-green-400') : 
//         (isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300');
//     }
//     if (type === 'OUTPUT') {
//       return value ? 
//         (isDarkMode ? 'bg-blue-900 border-blue-500' : 'bg-blue-100 border-blue-400') : 
//         (isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300');
//     }
//     return value ? 
//       // (isDarkMode ? 'bg-purple-900 border-purple-500' : 'bg-purple-100 border-purple-400') : 
//       // (isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300');
//       (isDarkMode ? 'bg-blue-900 border-blue-500' : 'bg-green-300 border-blue-400') : 
//       (isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300');
//   };

//   const getStatusText = (value, type) => {
//     if (type === 'INPUT') {
//       return value ? 'ACTIVE' : 'INACTIVE';
//     }
//     if (type === 'OUTPUT') {
//       return value ? 'ON' : 'OFF';
//     }
//     return value ? 'TRUE' : 'FALSE';
//   };

//   // Theme-based classes
//   const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-300";
//   const textClass = isDarkMode ? "text-gray-200" : "text-gray-800";
//   const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
//   const cardBorderClass = isDarkMode ? "border-gray-700" : "border-gray-300";
//   const cardText = isDarkMode ? "text-gray-400" : "text-gray-600";
//   const cardTitle = isDarkMode ? "text-gray-300" : "text-gray-700";
//   const statCardBg = isDarkMode ? "bg-gray-800" : "bg-white";
//   const statCardBorder = isDarkMode ? "border-gray-700" : "border-gray-300";
//   const statCardText = isDarkMode ? "text-gray-400" : "text-gray-600";
//   const statCardValue = (color) => isDarkMode ? `text-${color}-400` : `text-${color}-600`;
//   const controlBarBg = isDarkMode ? "bg-gray-800" : "bg-white";
//   const controlBarBorder = isDarkMode ? "border-gray-700" : "border-gray-300";
//   const tabButtonActive = isDarkMode 
//     ? "bg-blue-900 text-blue-100 border border-blue-700" 
//     : "bg-blue-600 text-white border border-blue-500";
//   const tabButtonInactive = isDarkMode 
//     ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
//     : "bg-gray-200 text-gray-700 hover:bg-gray-300";
//   const viewButtonActive = isDarkMode 
//     ? "bg-gray-700 text-white border border-gray-600" 
//     : "bg-gray-300 text-gray-800 border border-gray-400";
//   const viewButtonInactive = isDarkMode 
//     ? "bg-gray-800 text-gray-400 hover:bg-gray-700" 
//     : "bg-gray-100 text-gray-600 hover:bg-gray-200";
//   const searchInputBg = isDarkMode ? "bg-gray-700" : "bg-gray-100";
//   const searchInputBorder = isDarkMode ? "border-gray-600" : "border-gray-300";
//   const sectionTitle = isDarkMode ? "text-gray-300" : "text-gray-700";
//   const sectionSubtitle = isDarkMode ? "text-gray-500" : "text-gray-600";
//   const gridCardText = isDarkMode ? "text-gray-300" : "text-gray-700";
//   const gridCardAddressBg = isDarkMode ? "bg-gray-900/50" : "bg-gray-100";
//   const gridCardAddressText = isDarkMode ? "text-gray-500" : "text-gray-600";
//   const gridCardValueBg = (value) => value 
//     ? (isDarkMode ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700 border border-green-200") 
//     : (isDarkMode ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600 border border-gray-300");
//   const tableHeaderBg = isDarkMode ? "bg-gray-900" : "bg-gray-50";
//   const tableHeaderText = isDarkMode ? "text-gray-300" : "text-gray-700";
//   const tableBorder = isDarkMode ? "border-gray-700" : "border-gray-300";
//   const tableRowBg = (value) => value ? (isDarkMode ? "bg-gray-800/50" : "bg-gray-50") : "";
//   const tableRowHover = isDarkMode ? "hover:bg-gray-750" : "hover:bg-gray-100";
//   const typeBadge = (type) => {
//     if (type === 'INPUT') {
//       return isDarkMode 
//         ? 'bg-blue-900/30 text-blue-300' 
//         : 'bg-blue-100 text-blue-700 border border-blue-200';
//     }
//     if (type === 'OUTPUT') {
//       return isDarkMode 
//         ? 'bg-purple-900/30 text-purple-300' 
//         : 'bg-purple-100 text-purple-700 border border-purple-200';
//     }
//     return isDarkMode 
//       ? 'bg-gray-700 text-gray-400' 
//       : 'bg-gray-200 text-gray-600 border border-gray-300';
//   };
//   const statusTextColor = (value) => value 
//     ? (isDarkMode ? 'text-green-400' : 'text-green-600') 
//     : (isDarkMode ? 'text-gray-400' : 'text-gray-600');
//   const tableValueColor = (value) => value 
//     ? (isDarkMode ? 'text-green-400' : 'text-green-600') 
//     : (isDarkMode ? 'text-gray-500' : 'text-gray-600');
//   const footerBorder = isDarkMode ? "border-gray-800" : "border-gray-300";
//   const footerText = isDarkMode ? "text-gray-500" : "text-gray-600";
//   const statusBarBg = isDarkMode ? "bg-gray-800" : "bg-white";
//   const statusBarText = isDarkMode ? "text-gray-400" : "text-gray-600";

//   // Data filtering
//   const data = activeTab === "inputs" ? biSignals : boSignals;
//   const filtered = data.filter(
//     (s) =>
//       (s.tag && s.tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (s.address && s.address.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   // Statistics
//   const activeCount = filtered.filter((s) => s.value).length;
//   const inactiveCount = filtered.length - activeCount;
//   const inputCount = biSignals.length;
//   const outputCount = boSignals.length;

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-3`}>
//       {/* Header */}
//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center space-x-3">
//             <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//             <h1 className="text-lg font-bold tracking-wide">BINARY I/O MONITOR</h1>
//           </div>
//           <div className="flex items-center space-x-3">
//             {/* Theme Toggle Button */}
//             <button
//               onClick={toggleTheme}
//               className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:bg-gray-100 border border-gray-300 shadow-sm'} transition-colors duration-300`}
//               aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//             >
//               {isDarkMode ? (
//                 // Sun icon for light mode
//                 <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//               ) : (
//                 // Moon icon for dark mode
//                 <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//                 </svg>
//               )}
//             </button>
//             <div className={`text-xs ${statusBarText} ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} px-3 py-1 rounded border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
//               {connected ? 'LIVE STREAM' : 'OFFLINE'}
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
//           <div className={`${statCardBg} p-3 rounded border ${statCardBorder}`}>
//             <div className={`text-xs ${statCardText}`}>INPUTS</div>
//             <div className="text-lg font-bold">{inputCount}</div>
//           </div>
//           <div className={`${statCardBg} p-3 rounded border ${statCardBorder}`}>
//             <div className={`text-xs ${statCardText}`}>OUTPUTS</div>
//             <div className="text-lg font-bold">{outputCount}</div>
//           </div>
//           <div className={`${statCardBg} p-3 rounded border ${statCardBorder}`}>
//             <div className={`text-xs ${statCardText}`}>ACTIVE</div>
//             <div className={`text-lg font-bold ${statCardValue('green')}`}>{activeCount}</div>
//           </div>
//           <div className={`${statCardBg} p-3 rounded border ${statCardBorder}`}>
//             <div className={`text-xs ${statCardText}`}>INACTIVE</div>
//             <div className={`text-lg font-bold ${statCardValue('gray')}`}>{inactiveCount}</div>
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className={`${controlBarBg} p-3 rounded-lg border ${controlBarBorder} mb-4`}>
//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* Tab Selection */}
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setActiveTab("inputs")}
//               className={`px-4 py-2 text-sm font-bold rounded transition-all ${
//                 activeTab === "inputs" ? tabButtonActive : tabButtonInactive
//               }`}
//             >
//               INPUTS
//             </button>
//             <button
//               onClick={() => setActiveTab("outputs")}
//               className={`px-4 py-2 text-sm font-bold rounded transition-all ${
//                 activeTab === "outputs" ? tabButtonActive : tabButtonInactive
//               }`}
//             >
//               OUTPUTS
//             </button>
//           </div>

//           {/* View Mode Toggle */}
//           <div className="flex space-x-2 ml-0 sm:ml-auto">
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`px-3 py-2 text-sm rounded transition-all ${
//                 viewMode === "grid" ? viewButtonActive : viewButtonInactive
//               }`}
//             >
//               GRID
//             </button>
//             <button
//               onClick={() => setViewMode("table")}
//               className={`px-3 py-2 text-sm rounded transition-all ${
//                 viewMode === "table" ? viewButtonActive : viewButtonInactive
//               }`}
//             >
//               TABLE
//             </button>
//           </div>

//           {/* Search */}
//           <div className="flex-1 min-w-[200px]">
//             <input
//               type="text"
//               placeholder="Search by tag or address..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className={`w-full px-3 py-2 ${searchInputBg} border ${searchInputBorder} rounded text-sm focus:outline-none focus:border-blue-500`}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       {viewMode === "grid" ? (
//         /* ========== GRID VIEW ========== */
//         <div className="mb-4">
//           <div className="flex items-center justify-between mb-2 px-1">
//             <h2 className={`text-sm font-semibold uppercase tracking-wide ${sectionTitle}`}>
//               {activeTab === "inputs" ? "DIGITAL INPUTS" : "DIGITAL OUTPUTS"}
//             </h2>
//             <span className={`text-xs ${sectionSubtitle}`}>{filtered.length} SIGNALS</span>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
//             {filtered.map((s) => {
//               const type = getSignalType(s.address);
//               const statusColor = getStatusColor(s.value, type);
//               const statusText = getStatusText(s.value, type);
              
//               return (
//                 <div
//                   key={s.address || s.tag}
//                   className={`p-3 rounded border transition-all ${statusColor} ${isDarkMode ? 'hover:brightness-110' : 'hover:shadow-md'}`}
//                 >
//                   <div className="mb-2">
//                     <div className={`text-xs font-medium truncate mb-1 ${gridCardText}`}>
//                       {formatName(s.tag || 'Untagged')}
//                     </div>
//                     <div className={`text-[10px] font-mono ${gridCardAddressText} ${gridCardAddressBg} px-1.5 py-0.5 rounded`}>
//                       {s.address || 'No Address'}
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div className={`text-xs font-bold px-2 py-1 rounded ${gridCardValueBg(s.value)}`}>
//                       {s.value ? '1' : '0'}
//                     </div>
//                     <div className={`text-[10px] font-medium ${cardText}`}>
//                       {statusText}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ) : (
//         /* ========== TABLE VIEW ========== */
//         <div className="mb-4">
//           <div className={`${cardBgClass} rounded-lg border ${cardBorderClass} overflow-hidden`}>
//             <table className="w-full">
//               <thead className={tableHeaderBg}>
//                 <tr className="text-xs uppercase tracking-wide">
//                   <th className={`p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>SIGNAL</th>
//                   <th className={`p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>ADDRESS</th>
//                   <th className={`p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>TYPE</th>
//                   <th className={`p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>STATUS</th>
//                   <th className={`p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>VALUE</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((s) => {
//                   const type = getSignalType(s.address);
//                   const statusText = getStatusText(s.value, type);
                  
//                   return (
//                     <tr
//                       key={s.address || s.tag}
//                       className={`border-b ${tableBorder} ${tableRowHover} ${tableRowBg(s.value)}`}
//                     >
//                       <td className="p-3">
//                         <div className="font-medium text-sm">{formatName(s.tag || 'Untagged')}</div>
//                       </td>
//                       <td className="p-3">
//                         <div className="font-mono text-xs text-gray-400">{s.address || 'No Address'}</div>
//                       </td>
//                       <td className="p-3">
//                         <div className={`text-xs font-bold px-2 py-1 rounded inline-block ${typeBadge(type)}`}>
//                           {type}
//                         </div>
//                       </td>
//                       <td className="p-3">
//                         <div className="flex items-center">
//                           <div className={`w-2 h-2 rounded-full mr-2 ${s.value ? 'bg-green-500' : isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
//                           <span className={`text-sm font-medium ${statusTextColor(s.value)}`}>
//                             {statusText}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="p-3">
//                         <div className={`text-lg font-bold font-mono ${tableValueColor(s.value)}`}>
//                           {s.value ? '1' : '0'}
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
            
//             {filtered.length === 0 && (
//               <div className="p-8 text-center text-gray-500">
//                 <div className="text-lg mb-2">No signals found</div>
//                 <div className="text-sm">Try a different search term or check connection</div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <div className={`mt-4 pt-3 border-t ${footerBorder}`}>
//         <div className={`flex flex-col sm:flex-row justify-between items-center text-xs ${footerText}`}>
//           <div className="flex items-center space-x-4 mb-2 sm:mb-0">
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-green-500"></div>
//               <span>ACTIVE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-gray-500"></div>
//               <span>INACTIVE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//               <span>INPUT</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 rounded-full bg-purple-500"></div>
//               <span>OUTPUT</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div>MODE: {viewMode.toUpperCase()} • {activeTab.toUpperCase()}</div>
//             <div className={isDarkMode ? "text-gray-600" : "text-gray-500"}>BINARY I/O v1.0</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









// import React, { useState, useEffect } from "react";

// const API_BASE = "https://mqtt-testing-2.onrender.com";

// export default function BinaryIO() {
//   const [activeTab, setActiveTab] = useState("inputs");
//   const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
//   const [searchTerm, setSearchTerm] = useState("");
//   const [connected, setConnected] = useState(false);
//   const [biSignals, setBiSignals] = useState([]);
//   const [boSignals, setBoSignals] = useState([]);

//   // Single SSE Stream for both BI and BO
//   useEffect(() => {
//     const source = new EventSource(`${API_BASE}/api/v1/stream/bi-bo`);

//     source.onopen = () => setConnected(true);
//     source.onerror = () => setConnected(false);

//     source.onmessage = (e) => {
//       try {
//         const data = JSON.parse(e.data);
        
//         // Handle both BI and BO data from single stream
//         if (data.bi && Array.isArray(data.bi)) {
//           setBiSignals(data.bi);
//         }
        
//         if (data.bo && Array.isArray(data.bo)) {
//           setBoSignals(data.bo);
//         }
        
//         // Handle combined format if both are in one array
//         if (data.signals && Array.isArray(data.signals)) {
//           // Separate BI and BO signals
//           const bi = data.signals.filter(s => 
//             s.address && s.address.includes('I') || 
//             s.type === 'INPUT' || 
//             (s.tag && s.tag.toLowerCase().includes('input'))
//           );
//           const bo = data.signals.filter(s => 
//             s.address && s.address.includes('O') || 
//             s.type === 'OUTPUT' || 
//             (s.tag && s.tag.toLowerCase().includes('output'))
//           );
          
//           if (bi.length > 0) setBiSignals(bi);
//           if (bo.length > 0) setBoSignals(bo);
//         }
        
//         // Handle alternative format
//         if (data.data && Array.isArray(data.data)) {
//           const bi = [];
//           const bo = [];
          
//           data.data.forEach(item => {
//             if (item.address && item.address.includes('I')) {
//               bi.push(item);
//             } else if (item.address && item.address.includes('O')) {
//               bo.push(item);
//             }
//           });
          
//           if (bi.length > 0) setBiSignals(bi);
//           if (bo.length > 0) setBoSignals(bo);
//         }
        
//       } catch (err) {
//         console.error("SSE parse error:", err);
//       }
//     };

//     return () => {
//       source.close();
//     };
//   }, []);

//   // Helper functions
//   const formatName = (tag) => {
//     if (!tag) return 'Untagged';
//     return tag
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, l => l.toUpperCase());
//   };

//   const getSignalType = (address) => {
//     if (!address) return 'UNKNOWN';
//     if (address.includes('I')) return 'INPUT';
//     if (address.includes('O')) return 'OUTPUT';
//     if (address.includes('M')) return 'MEMORY';
//     return 'INTERNAL';
//   };

//   const getStatusColor = (value, type) => {
//     if (type === 'INPUT') {
//       return value 
//         ? 'bg-[#0AC4E0]/20 border-[#0AC4E0]' 
//         : 'bg-gray-100 border-gray-300';
//     }
//     if (type === 'OUTPUT') {
//       return value 
//         ? 'bg-purple-100 border-purple-400' 
//         : 'bg-gray-100 border-gray-300';
//     }
//     return value 
//       ? 'bg-blue-100 border-blue-400' 
//       : 'bg-gray-100 border-gray-300';
//   };

//   const getStatusText = (value, type) => {
//     if (type === 'INPUT') {
//       return value ? 'ACTIVE' : 'INACTIVE';
//     }
//     if (type === 'OUTPUT') {
//       return value ? 'ON' : 'OFF';
//     }
//     return value ? 'TRUE' : 'FALSE';
//   };

//   // Light theme classes
//   const bgClass = "bg-gray-100";
//   const textClass = "text-gray-800";
//   const cardBgClass = "bg-white";
//   const cardBorderClass = "border-gray-300";
//   const cardText = "text-gray-600";
//   const cardTitle = "text-gray-700";
//   const statCardBg = "bg-white";
//   const statCardBorder = "border-gray-300";
//   const statCardText = "text-gray-600";
//   const controlBarBg = "bg-white";
//   const controlBarBorder = "border-gray-300";
//   const tabButtonActive = "bg-[#0AC4E0] text-white border border-[#0A8B9F]";
//   const tabButtonInactive = "bg-gray-200 text-gray-700 hover:bg-gray-300";
//   const viewButtonActive = "bg-gray-300 text-gray-800 border border-gray-400";
//   const viewButtonInactive = "bg-gray-100 text-gray-600 hover:bg-gray-200";
//   const searchInputBg = "bg-gray-50";
//   const searchInputBorder = "border-gray-300";
//   const sectionTitle = "text-gray-700";
//   const sectionSubtitle = "text-gray-600";
//   const gridCardText = "text-gray-700";
//   const gridCardAddressBg = "bg-gray-100";
//   const gridCardAddressText = "text-gray-600";
//   const gridCardValueBg = (value) => value 
//     ? "bg-[#0AC4E0] text-white border border-[#0A8B9F]" 
//     : "bg-gray-200 text-gray-700 border border-gray-400";
//   const tableHeaderBg = "bg-gray-50";
//   const tableHeaderText = "text-gray-700";
//   const tableBorder = "border-gray-300";
//   const tableRowBg = (value) => value ? "bg-[#0AC4E0]/5" : "";
//   const tableRowHover = "hover:bg-gray-100";
//   const typeBadge = (type) => {
//     if (type === 'INPUT') {
//       return 'bg-[#0AC4E0]/20 text-[#0A8B9F] border border-[#0AC4E0]';
//     }
//     if (type === 'OUTPUT') {
//       return 'bg-purple-100 text-purple-700 border border-purple-300';
//     }
//     return 'bg-gray-200 text-gray-600 border border-gray-400';
//   };
//   const statusTextColor = (value) => value 
//     ? 'text-[#0AC4E0]' 
//     : 'text-gray-600';
//   const tableValueColor = (value) => value 
//     ? 'text-[#0AC4E0]' 
//     : 'text-gray-600';
//   const footerBorder = "border-gray-300";
//   const footerText = "text-gray-600";
//   const statusBarBg = "bg-white";
//   const statusBarText = "text-gray-600";

//   // Data filtering
//   const data = activeTab === "inputs" ? biSignals : boSignals;
//   const filtered = data.filter(
//     (s) =>
//       (s.tag && s.tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (s.address && s.address.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   // Statistics
//   const activeCount = filtered.filter((s) => s.value).length;
//   const inactiveCount = filtered.length - activeCount;
//   const inputCount = biSignals.length;
//   const outputCount = boSignals.length;

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-2 sm:p-3`}>
//       {/* Header */}
//       <div className="mb-3 sm:mb-4">
//         <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${connected ? 'bg-[#0AC4E0] animate-pulse' : 'bg-red-500'}`}></div>
//             <h1 className="text-base sm:text-lg font-bold tracking-wide">BINARY I/O MONITOR</h1>
//           </div>
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             <div className={`text-[10px] sm:text-xs ${statusBarText} bg-gray-200 px-2 py-0.5 sm:px-3 sm:py-1 rounded border border-gray-300`}>
//               {connected ? 'LIVE' : 'OFFLINE'}
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats - Responsive grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 sm:mb-4">
//           <div className={`${statCardBg} p-2 sm:p-3 rounded border ${statCardBorder}`}>
//             <div className={`text-[10px] sm:text-xs ${statCardText}`}>INPUTS</div>
//             <div className="text-base sm:text-lg font-bold">{inputCount}</div>
//           </div>
//           <div className={`${statCardBg} p-2 sm:p-3 rounded border ${statCardBorder}`}>
//             <div className={`text-[10px] sm:text-xs ${statCardText}`}>OUTPUTS</div>
//             <div className="text-base sm:text-lg font-bold">{outputCount}</div>
//           </div>
//           <div className={`${statCardBg} p-2 sm:p-3 rounded border ${statCardBorder}`}>
//             <div className={`text-[10px] sm:text-xs ${statCardText}`}>ACTIVE</div>
//             <div className="text-base sm:text-lg font-bold text-[#0AC4E0]">{activeCount}</div>
//           </div>
//           <div className={`${statCardBg} p-2 sm:p-3 rounded border ${statCardBorder}`}>
//             <div className={`text-[10px] sm:text-xs ${statCardText}`}>INACTIVE</div>
//             <div className="text-base sm:text-lg font-bold text-gray-500">{inactiveCount}</div>
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className={`${controlBarBg} p-2 sm:p-3 rounded-lg border ${controlBarBorder} mb-3 sm:mb-4`}>
//         <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//           {/* Tab Selection */}
//           <div className="flex space-x-1 sm:space-x-2">
//             <button
//               onClick={() => setActiveTab("inputs")}
//               className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded transition-all ${
//                 activeTab === "inputs" ? tabButtonActive : tabButtonInactive
//               }`}
//             >
//               INPUTS
//             </button>
//             <button
//               onClick={() => setActiveTab("outputs")}
//               className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded transition-all ${
//                 activeTab === "outputs" ? tabButtonActive : tabButtonInactive
//               }`}
//             >
//               OUTPUTS
//             </button>
//           </div>

//           {/* View Mode Toggle */}
//           <div className="flex space-x-1 sm:space-x-2 ml-0 sm:ml-auto">
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded transition-all ${
//                 viewMode === "grid" ? viewButtonActive : viewButtonInactive
//               }`}
//             >
//               GRID
//             </button>
//             <button
//               onClick={() => setViewMode("table")}
//               className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded transition-all ${
//                 viewMode === "table" ? viewButtonActive : viewButtonInactive
//               }`}
//             >
//               TABLE
//             </button>
//           </div>

//           {/* Search */}
//           <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
//             <input
//               type="text"
//               placeholder="Search tag or address..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 ${searchInputBg} border ${searchInputBorder} rounded text-xs sm:text-sm focus:outline-none focus:border-[#0AC4E0] focus:ring-1 focus:ring-[#0AC4E0]`}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       {viewMode === "grid" ? (
//         /* ========== GRID VIEW ========== */
//         <div className="mb-4">
//           <div className="flex flex-wrap items-center justify-between gap-2 mb-2 px-1">
//             <h2 className={`text-xs sm:text-sm font-semibold uppercase tracking-wide ${sectionTitle}`}>
//               {activeTab === "inputs" ? "DIGITAL INPUTS" : "DIGITAL OUTPUTS"}
//             </h2>
//             <span className={`text-[10px] sm:text-xs ${sectionSubtitle}`}>{filtered.length} SIGNALS</span>
//           </div>

//           <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
//             {filtered.map((s) => {
//               const type = getSignalType(s.address);
//               const statusColor = getStatusColor(s.value, type);
//               const statusText = getStatusText(s.value, type);
              
//               return (
//                 <div
//                   key={s.address || s.tag}
//                   className={`p-2 sm:p-3 rounded border transition-all ${statusColor} hover:shadow-md`}
//                 >
//                   <div className="mb-1 sm:mb-2">
//                     <div className={`text-[10px] sm:text-xs font-medium truncate mb-0.5 sm:mb-1 ${gridCardText}`}>
//                       {formatName(s.tag)}
//                     </div>
//                     <div className={`text-[8px] sm:text-[10px] font-mono ${gridCardAddressText} ${gridCardAddressBg} px-1 sm:px-1.5 py-0.5 rounded inline-block`}>
//                       {s.address || 'No Address'}
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div className={`text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded ${gridCardValueBg(s.value)}`}>
//                       {s.value ? '1' : '0'}
//                     </div>
//                     <div className={`text-[8px] sm:text-[10px] font-medium ${cardText}`}>
//                       {statusText}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ) : (
//         /* ========== TABLE VIEW ========== */
//         <div className="mb-4">
//           <div className={`${cardBgClass} rounded-lg border ${cardBorderClass} overflow-x-auto`}>
//             <table className="w-full min-w-[500px]">
//               <thead className={tableHeaderBg}>
//                 <tr className="text-[10px] sm:text-xs uppercase tracking-wide">
//                   <th className={`p-2 sm:p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>SIGNAL</th>
//                   <th className={`p-2 sm:p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>ADDRESS</th>
//                   <th className={`p-2 sm:p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>TYPE</th>
//                   <th className={`p-2 sm:p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>STATUS</th>
//                   <th className={`p-2 sm:p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>VALUE</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((s) => {
//                   const type = getSignalType(s.address);
//                   const statusText = getStatusText(s.value, type);
                  
//                   return (
//                     <tr
//                       key={s.address || s.tag}
//                       className={`border-b ${tableBorder} ${tableRowHover} ${tableRowBg(s.value)}`}
//                     >
//                       <td className="p-2 sm:p-3">
//                         <div className="font-medium text-xs sm:text-sm">{formatName(s.tag)}</div>
//                       </td>
//                       <td className="p-2 sm:p-3">
//                         <div className="font-mono text-[10px] sm:text-xs text-gray-500">{s.address || 'No Address'}</div>
//                       </td>
//                       <td className="p-2 sm:p-3">
//                         <div className={`text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded inline-block ${typeBadge(type)}`}>
//                           {type}
//                         </div>
//                       </td>
//                       <td className="p-2 sm:p-3">
//                         <div className="flex items-center">
//                           <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1 sm:mr-2 ${s.value ? 'bg-[#0AC4E0]' : 'bg-gray-400'}`}></div>
//                           <span className={`text-xs sm:text-sm font-medium ${statusTextColor(s.value)}`}>
//                             {statusText}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="p-2 sm:p-3">
//                         <div className={`text-base sm:text-lg font-bold font-mono ${tableValueColor(s.value)}`}>
//                           {s.value ? '1' : '0'}
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
            
//             {filtered.length === 0 && (
//               <div className="p-6 sm:p-8 text-center text-gray-500">
//                 <div className="text-sm sm:text-lg mb-1 sm:mb-2">No signals found</div>
//                 <div className="text-xs sm:text-sm">Try a different search term or check connection</div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <div className={`mt-3 sm:mt-4 pt-2 sm:pt-3 border-t ${footerBorder}`}>
//         <div className={`flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-xs ${footerText}`}>
//           <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-1 sm:mb-0">
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0AC4E0]"></div>
//               <span>ACTIVE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-400"></div>
//               <span>INACTIVE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0AC4E0]"></div>
//               <span>INPUT</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></div>
//               <span>OUTPUT</span>
//             </div>
//           </div>
//           <div className="text-center sm:text-right">
//             <div className="flex flex-wrap justify-center sm:justify-end gap-1">
//               <span>MODE: {viewMode.toUpperCase()}</span>
//               <span className="hidden xs:inline">•</span>
//               <span>{activeTab.toUpperCase()}</span>
//             </div>
//             <div className="text-gray-500 text-[8px] sm:text-[10px]">BINARY I/O v1.0</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";

const API_BASE = import.meta.env.DEV ? "http://localhost:8000" : "https://mqtt-testing-2.onrender.com";

export default function BinaryIO() {
  const [activeTab, setActiveTab] = useState("inputs");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
  const [searchTerm, setSearchTerm] = useState("");
  const [connected, setConnected] = useState(false);
  const [biSignals, setBiSignals] = useState([]);
  const [boSignals, setBoSignals] = useState([]);
  const [authError, setAuthError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper function to get auth token
  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  // Check authentication status
  useEffect(() => {
    const token = getAuthToken();
    setIsAuthenticated(!!token);
  }, []);

  // Single SSE Stream for both BI and BO with authentication
  useEffect(() => {
    let source = null;
    let reconnectTimeout = null;

    const connectSSE = () => {
      // Check authentication first
      const token = getAuthToken();
      if (!token) {
        setAuthError(true);
        setConnected(false);
        return;
      }

      // Add token to SSE URL as query parameter
      const url = `${API_BASE}/api/v1/stream/bi-bo?token=${token}`;
      source = new EventSource(url);

      source.onopen = () => {
        setConnected(true);
        setAuthError(false);
      };

      source.onerror = () => {
        setConnected(false);
        
        // Check if it's an authentication error
        if (source && source.readyState === EventSource.CLOSED) {
          setAuthError(true);
        }
        
        // Attempt to reconnect after 3 seconds
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
        }
        reconnectTimeout = setTimeout(() => {
          connectSSE();
        }, 3000);
      };

      source.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          
          // Handle both BI and BO data from single stream
          if (data.bi && Array.isArray(data.bi)) {
            setBiSignals(data.bi);
          }
          
          if (data.bo && Array.isArray(data.bo)) {
            setBoSignals(data.bo);
          }
          
          // Handle combined format if both are in one array
          if (data.signals && Array.isArray(data.signals)) {
            // Separate BI and BO signals
            const bi = data.signals.filter(s => 
              s.address && s.address.includes('I') || 
              s.type === 'INPUT' || 
              (s.tag && s.tag.toLowerCase().includes('input'))
            );
            const bo = data.signals.filter(s => 
              s.address && s.address.includes('O') || 
              s.type === 'OUTPUT' || 
              (s.tag && s.tag.toLowerCase().includes('output'))
            );
            
            if (bi.length > 0) setBiSignals(bi);
            if (bo.length > 0) setBoSignals(bo);
          }
          
          // Handle alternative format
          if (data.data && Array.isArray(data.data)) {
            const bi = [];
            const bo = [];
            
            data.data.forEach(item => {
              if (item.address && item.address.includes('I')) {
                bi.push(item);
              } else if (item.address && item.address.includes('O')) {
                bo.push(item);
              }
            });
            
            if (bi.length > 0) setBiSignals(bi);
            if (bo.length > 0) setBoSignals(bo);
          }
          
        } catch (err) {
          console.error("SSE parse error:", err);
        }
      };
    };

    // Only connect if authenticated
    if (isAuthenticated) {
      connectSSE();
    } else {
      setAuthError(true);
      setConnected(false);
    }

    return () => {
      if (source) {
        source.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [isAuthenticated]);

  // Helper functions
  const formatName = (tag) => {
    if (!tag) return 'Untagged';
    return tag
      .replace(/_/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const getSignalType = (address) => {
    if (!address) return 'UNKNOWN';
    if (address.includes('I')) return 'INPUT';
    if (address.includes('O')) return 'OUTPUT';
    if (address.includes('M')) return 'MEMORY';
    return 'INTERNAL';
  };

  const getStatusColor = (value, type) => {
    if (type === 'INPUT') {
      return value
        ? 'bg-emerald-900/30 border-emerald-600/60'
        : 'bg-slate-800/50 border-slate-700';
    }
    if (type === 'OUTPUT') {
      return value
        ? 'bg-purple-900/30 border-purple-600/60'
        : 'bg-slate-800/50 border-slate-700';
    }
    return value
      ? 'bg-amber-900/30 border-amber-600/60'
      : 'bg-slate-800/50 border-slate-700';
  };

  const getStatusText = (value, type) => {
    if (type === 'INPUT') {
      return value ? 'ACTIVE' : 'INACTIVE';
    }
    if (type === 'OUTPUT') {
      return value ? 'ON' : 'OFF';
    }
    return value ? 'TRUE' : 'FALSE';
  };

  // Dark industrial theme classes
  const bgClass = "bg-slate-950";
  const textClass = "text-slate-200";
  const cardBgClass = "bg-slate-900";
  const cardBorderClass = "border-slate-800";
  const cardText = "text-slate-400";
  const cardTitle = "text-slate-300";
  const statCardBg = "bg-slate-900";
  const statCardBorder = "border-slate-800";
  const statCardText = "text-slate-500";
  const controlBarBg = "bg-slate-900";
  const controlBarBorder = "border-slate-800";
  const tabButtonActive = "bg-amber-500 text-slate-950 border border-amber-400";
  const tabButtonInactive = "bg-slate-800 text-slate-300 hover:bg-slate-700";
  const viewButtonActive = "bg-slate-700 text-white border border-slate-600";
  const viewButtonInactive = "bg-slate-800 text-slate-400 hover:bg-slate-700";
  const searchInputBg = "bg-slate-800";
  const searchInputBorder = "border-slate-700";
  const sectionTitle = "text-slate-300";
  const sectionSubtitle = "text-slate-500";
  const gridCardText = "text-slate-300";
  const gridCardAddressBg = "bg-slate-800";
  const gridCardAddressText = "text-slate-400";
  const gridCardValueBg = (value) => value
    ? "bg-amber-500 text-slate-950 border border-amber-400"
    : "bg-slate-800 text-slate-400 border border-slate-700";
  const tableHeaderBg = "bg-slate-900";
  const tableHeaderText = "text-slate-300";
  const tableBorder = "border-slate-800";
  const tableRowBg = (value) => value ? "bg-amber-500/5" : "";
  const tableRowHover = "hover:bg-slate-800/60";
  const typeBadge = (type) => {
    if (type === 'INPUT') {
      return 'bg-emerald-900/30 text-emerald-300 border border-emerald-600/60';
    }
    if (type === 'OUTPUT') {
      return 'bg-purple-900/30 text-purple-300 border border-purple-600/60';
    }
    return 'bg-slate-800 text-slate-400 border border-slate-700';
  };
  const statusTextColor = (value) => value
    ? 'text-amber-400'
    : 'text-slate-500';
  const tableValueColor = (value) => value
    ? 'text-amber-400'
    : 'text-slate-500';
  const footerBorder = "border-slate-800";
  const footerText = "text-slate-500";
  const statusBarBg = "bg-slate-900";
  const statusBarText = "text-slate-400";

  // Data filtering
  const data = activeTab === "inputs" ? biSignals : boSignals;
  const filtered = data.filter(
    (s) =>
      (s.tag && s.tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.address && s.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Statistics
  const activeCount = filtered.filter((s) => s.value).length;
  const inactiveCount = filtered.length - activeCount;
  const inputCount = biSignals.length;
  const outputCount = boSignals.length;

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} p-2 sm:p-3`}>
      {/* Header */}
      <div className="mb-3 sm:mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${authError ? 'bg-red-500' : (connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500')}`}></div>
            <h1 className="text-base sm:text-lg font-bold tracking-wide text-white">BINARY I/O MONITOR</h1>
            {/* Auth Status Indicator */}
            {!isAuthenticated && (
              <span className="text-[10px] sm:text-xs bg-red-950/40 text-red-400 px-2 py-0.5 rounded-md border border-red-700">
                UNAUTHENTICATED
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className={`text-[10px] sm:text-xs ${statusBarText} ${statusBarBg} px-2 py-0.5 sm:px-3 sm:py-1 rounded-md border border-slate-800`}>
              {authError ? 'AUTH ERROR' : (connected ? 'LIVE' : 'OFFLINE')}
            </div>
          </div>
        </div>

        {/* Auth Error Message */}
        {authError && (
          <div className="mb-3 p-2 bg-amber-950/40 border border-amber-700 rounded-md text-xs text-amber-300">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Authentication required. Please log in to view binary I/O data.</span>
            </div>
          </div>
        )}

        {/* Quick Stats - Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 sm:mb-4">
          <div className={`${statCardBg} p-2 sm:p-3 rounded-md border ${statCardBorder}`}>
            <div className={`text-[10px] sm:text-xs ${statCardText}`}>INPUTS</div>
            <div className="text-base sm:text-lg font-bold text-white">{inputCount}</div>
          </div>
          <div className={`${statCardBg} p-2 sm:p-3 rounded-md border ${statCardBorder}`}>
            <div className={`text-[10px] sm:text-xs ${statCardText}`}>OUTPUTS</div>
            <div className="text-base sm:text-lg font-bold text-white">{outputCount}</div>
          </div>
          <div className={`${statCardBg} p-2 sm:p-3 rounded-md border ${statCardBorder}`}>
            <div className={`text-[10px] sm:text-xs ${statCardText}`}>ACTIVE</div>
            <div className="text-base sm:text-lg font-bold text-amber-400">{activeCount}</div>
          </div>
          <div className={`${statCardBg} p-2 sm:p-3 rounded-md border ${statCardBorder}`}>
            <div className={`text-[10px] sm:text-xs ${statCardText}`}>INACTIVE</div>
            <div className="text-base sm:text-lg font-bold text-slate-500">{inactiveCount}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`${controlBarBg} p-2 sm:p-3 rounded-lg border ${controlBarBorder} mb-3 sm:mb-4`}>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Tab Selection */}
          <div className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab("inputs")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-md transition-colors ${
                activeTab === "inputs" ? tabButtonActive : tabButtonInactive
              }`}
            >
              INPUTS
            </button>
            <button
              onClick={() => setActiveTab("outputs")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-md transition-colors ${
                activeTab === "outputs" ? tabButtonActive : tabButtonInactive
              }`}
            >
              OUTPUTS
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex space-x-1 sm:space-x-2 ml-0 sm:ml-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md transition-colors ${
                viewMode === "grid" ? viewButtonActive : viewButtonInactive
              }`}
            >
              GRID
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md transition-colors ${
                viewMode === "table" ? viewButtonActive : viewButtonInactive
              }`}
            >
              TABLE
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
            <input
              type="text"
              placeholder="Search tag or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 ${searchInputBg} border ${searchInputBorder} rounded-md text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50`}
            />
          </div>
        </div>
      </div>

      {/* Content - Only show if authenticated and no auth error */}
      {!authError && isAuthenticated ? (
        viewMode === "grid" ? (
          /* ========== GRID VIEW ========== */
          <div className="mb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 px-1">
              <h2 className={`text-xs sm:text-sm font-semibold uppercase tracking-wide ${sectionTitle}`}>
                {activeTab === "inputs" ? "DIGITAL INPUTS" : "DIGITAL OUTPUTS"}
              </h2>
              <span className={`text-[10px] sm:text-xs ${sectionSubtitle}`}>{filtered.length} SIGNALS</span>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {filtered.map((s) => {
                const type = getSignalType(s.address);
                const statusColor = getStatusColor(s.value, type);
                const statusText = getStatusText(s.value, type);
                
                return (
                  <div
                    key={s.address || s.tag}
                    className={`p-2 sm:p-3 rounded-md border transition-colors ${statusColor} hover:border-amber-500/50`}
                  >
                    <div className="mb-1 sm:mb-2">
                      <div className={`text-[10px] sm:text-xs font-medium truncate mb-0.5 sm:mb-1 ${gridCardText}`}>
                        {formatName(s.tag)}
                      </div>
                      <div className={`text-[8px] sm:text-[10px] font-mono ${gridCardAddressText} ${gridCardAddressBg} px-1 sm:px-1.5 py-0.5 rounded-md inline-block`}>
                        {s.address || 'No Address'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md ${gridCardValueBg(s.value)}`}>
                        {s.value ? '1' : '0'}
                      </div>
                      <div className={`text-[8px] sm:text-[10px] font-medium ${cardText}`}>
                        {statusText}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ========== TABLE VIEW ========== */
          <div className="mb-4">
            <div className={`${cardBgClass} rounded-lg border ${cardBorderClass} overflow-x-auto`}>
              <table className="w-full min-w-[500px]">
                <thead className={tableHeaderBg}>
                  <tr className="text-[10px] sm:text-xs uppercase tracking-wide">
                    <th className={`p-2 sm:p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>SIGNAL</th>
                    <th className={`p-2 sm:p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>ADDRESS</th>
                    <th className={`p-2 sm:p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>TYPE</th>
                    <th className={`p-2 sm:p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>STATUS</th>
                    <th className={`p-2 sm:p-3 text-left font-medium ${tableHeaderText} border-b ${tableBorder}`}>VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => {
                    const type = getSignalType(s.address);
                    const statusText = getStatusText(s.value, type);
                    
                    return (
                      <tr
                        key={s.address || s.tag}
                        className={`border-b ${tableBorder} ${tableRowHover} ${tableRowBg(s.value)}`}
                      >
                        <td className="p-2 sm:p-3">
                          <div className="font-medium text-xs sm:text-sm text-slate-200">{formatName(s.tag)}</div>
                        </td>
                        <td className="p-2 sm:p-3">
                          <div className="font-mono text-[10px] sm:text-xs text-slate-500">{s.address || 'No Address'}</div>
                        </td>
                        <td className="p-2 sm:p-3">
                          <div className={`text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md inline-block ${typeBadge(type)}`}>
                            {type}
                          </div>
                        </td>
                        <td className="p-2 sm:p-3">
                          <div className="flex items-center">
                            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1 sm:mr-2 ${s.value ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                            <span className={`text-xs sm:text-sm font-medium ${statusTextColor(s.value)}`}>
                              {statusText}
                            </span>
                          </div>
                        </td>
                        <td className="p-2 sm:p-3">
                          <div className={`text-base sm:text-lg font-bold font-mono ${tableValueColor(s.value)}`}>
                            {s.value ? '1' : '0'}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {filtered.length === 0 && (
                <div className="p-6 sm:p-8 text-center text-slate-500">
                  <div className="text-sm sm:text-lg mb-1 sm:mb-2">No signals found</div>
                  <div className="text-xs sm:text-sm">Try a different search term or check connection</div>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        /* Authentication Required Message */
        <div className={`rounded-lg border border-amber-700 p-8 sm:p-12 text-center bg-amber-950/20`}>
          <div className="flex flex-col items-center justify-center">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div className={`text-base sm:text-xl text-white mb-2 sm:mb-3 font-bold`}>Authentication Required</div>
            <div className={`text-xs sm:text-sm ${footerText} max-w-md mx-auto`}>
              Please log in to view binary I/O data. This page requires valid authentication credentials.
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className={`mt-3 sm:mt-4 pt-2 sm:pt-3 border-t ${footerBorder}`}>
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-xs ${footerText}`}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-1 sm:mb-0">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500"></div>
              <span>ACTIVE</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-600"></div>
              <span>INACTIVE</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-600"></div>
              <span>INPUT</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></div>
              <span>OUTPUT</span>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <div className="flex flex-wrap justify-center sm:justify-end gap-1">
              <span>MODE: {viewMode.toUpperCase()}</span>
              <span className="hidden xs:inline">•</span>
              <span>{activeTab.toUpperCase()}</span>
            </div>
            <div className="text-slate-600 text-[8px] sm:text-[10px]">BINARY I/O v1.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}