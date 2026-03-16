// // import { useState } from "react";

// // /* ================= CONFIG ================= */
// // const API_BASE = "http://localhost:8000/api/v1/history";

// // /* ================= CSV UTILS ================= */
// // function convertToCSV(rows, type) {
// //   if (!rows || !rows.length) return "";

// //   const csvRows = [];
// //   if (type === "analog") {
// //     csvRows.push("timestamp,tag,address,value,error");
// //     rows.forEach((entry) => {
// //       entry.analog?.forEach((a) => {
// //         csvRows.push(
// //           [
// //             new Date(entry.timestamp).toISOString(),
// //             a.tag,
// //             a.address,
// //             a.value ?? "",
// //             a.error ?? "",
// //           ].join(",")
// //         );
// //       });
// //     });
// //   } else if (type === "bi" || type === "bo") {
// //     csvRows.push("timestamp,tag,address,value");
// //     rows.forEach((entry) => {
// //       entry[type]?.forEach((b) => {
// //         csvRows.push(
// //           [
// //             new Date(entry.timestamp).toISOString(),
// //             b.tag,
// //             b.address,
// //             b.value,
// //           ].join(",")
// //         );
// //       });
// //     });
// //   }

// //   return csvRows.join("\n");
// // }

// // function downloadCSV(csv, filename) {
// //   const blob = new Blob([csv], { type: "text/csv" });
// //   const url = URL.createObjectURL(blob);
// //   const a = document.createElement("a");
// //   a.href = url;
// //   a.download = filename;
// //   a.click();
// //   URL.revokeObjectURL(url);
// // }

// // /* ================= COMPONENT ================= */
// // export default function HistoryDownload() {
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleDownload = async (type) => {
// //     try {
// //       setError("");
// //       setLoading(true);

// //       const res = await fetch(`${API_BASE}/${type}`);
// //       const json = await res.json();

// //       if (!json.success || !json.data.length) {
// //         throw new Error("No data available");
// //       }

// //       const csv = convertToCSV(json.data, type);
// //       downloadCSV(csv, `${type}_all_data.csv`);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 space-y-6">
// //       <h1 className="text-2xl font-semibold">Download History Data</h1>

// //       {error && (
// //         <div className="text-red-400 text-sm bg-red-950/40 p-2 rounded">
// //           {error}
// //         </div>
// //       )}

// //       <button
// //         onClick={() => handleDownload("analog")}
// //         disabled={loading}
// //         className="w-64 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 px-4 py-2 rounded font-medium transition"
// //       >
// //         {loading ? "Downloading..." : "Download Analog Data"}
// //       </button>

// //       <button
// //         onClick={() => handleDownload("bi")}
// //         disabled={loading}
// //         className="w-64 bg-green-600 hover:bg-green-700 disabled:bg-green-900 px-4 py-2 rounded font-medium transition"
// //       >
// //         {loading ? "Downloading..." : "Download BI Data"}
// //       </button>

// //       <button
// //         onClick={() => handleDownload("bo")}
// //         disabled={loading}
// //         className="w-64 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 px-4 py-2 rounded font-medium transition"
// //       >
// //         {loading ? "Downloading..." : "Download BO Data"}
// //       </button>
// //     </div>
// //   );
// // }








// // components/DownloadPage.jsx
// import React, { useState } from 'react';

// const DownloadPage = () => {
//   const [loading, setLoading] = useState({
//     commandLog: false,
//     bibo: false,
//     analog: false
//   });

//   const [status, setStatus] = useState({
//     commandLog: '',
//     bibo: '',
//     analog: ''
//   });

//   const apiEndpoints = [
//     {
//       id: 'commandLog',
//       name: 'Command Log',
//       endpoint: 'http://localhost:8000/api/v1/download/command/log'
//     },
//     {
//       id: 'bibo',
//       name: 'BIBO Data',
//       endpoint: 'http://localhost:8000/api/v1/download/bibo'
//     },
//     {
//       id: 'analog',
//       name: 'Analog Data',
//       endpoint: 'http://localhost:8000/api/v1/download/analog'
//     }
//   ];

//   const downloadCSV = async (endpoint, dataType) => {
//     try {
//       setLoading(prev => ({ ...prev, [dataType]: true }));
//       setStatus(prev => ({ ...prev, [dataType]: 'Downloading...' }));
      
//       const response = await fetch(endpoint);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error: ${response.status}`);
//       }
      
//       const csvData = await response.text();
//       const blob = new Blob([csvData], { type: 'text/csv' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `${dataType}_${new Date().getTime()}.csv`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
      
//       setStatus(prev => ({ ...prev, [dataType]: '✓ Downloaded' }));
      
//       setTimeout(() => {
//         setStatus(prev => ({ ...prev, [dataType]: '' }));
//       }, 3000);
      
//     } catch (error) {
//       console.error('Error:', error);
//       setStatus(prev => ({ ...prev, [dataType]: '✗ Failed' }));
//     } finally {
//       setLoading(prev => ({ ...prev, [dataType]: false }));
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Download CSV Data</h1>
      
//       <div className="grid gap-4">
//         {apiEndpoints.map((data) => (
//           <div key={data.id} className="border rounded-lg p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="font-medium">{data.name}</h3>
//                 <p className="text-sm text-gray-600 truncate">{data.endpoint}</p>
//               </div>
              
//               <div className="flex items-center gap-4">
//                 <span className="text-sm">
//                   {status[data.id] || ''}
//                 </span>
                
//                 <button
//                   onClick={() => downloadCSV(data.endpoint, data.id)}
//                   disabled={loading[data.id]}
//                   className={`px-4 py-2 rounded ${
//                     loading[data.id] 
//                       ? 'bg-gray-300 cursor-not-allowed' 
//                       : 'bg-blue-500 hover:bg-blue-600 text-white'
//                   }`}
//                 >
//                   {loading[data.id] ? '...' : 'Download'}
//                 </button>
//               </div>
//             </div>
            
//             {loading[data.id] && (
//               <div className="mt-2">
//                 <div className="h-1 w-full bg-gray-200 rounded overflow-hidden">
//                   <div className="h-full bg-blue-500 animate-pulse"></div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
      
//       <div className="mt-8 p-4 bg-gray-50 rounded">
//         <p className="text-sm text-gray-600">
//           Note: Downloads CSV files from localhost:8000. Check browser console for errors.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DownloadPage;













// import React, { useState } from 'react';

// const DownloadPage = () => {
//   const [loading, setLoading] = useState({
//     commandLog: false,
//     bibo: false,
//     analog: false
//   });

//   const [status, setStatus] = useState({
//     commandLog: '',
//     bibo: '',
//     analog: ''
//   });

//   const apiEndpoints = [
//     {
//       id: 'commandLog',
//       name: 'Command Log',
//       // endpoint: 'http://localhost:8000/api/v1/download/command/log',
//       color: '#0AC4E0',
//       description: 'Download command execution history'
//     },
//     {
//       id: 'bibo',
//       name: 'BIBO Data',
//       // endpoint: 'http://localhost:8000/api/v1/download/bibo',
//       color: '#0A8B9F',
//       description: 'Download Binary Input/Output data'
//     },
//     {
//       id: 'analog',
//       name: 'Analog Data',
//       // endpoint: 'http://localhost:8000/api/v1/download/analog',
//       color: '#0891b2',
//       description: 'Download analog signal measurements'
//     }
//   ];

//   const downloadCSV = async (endpoint, dataType) => {
//     try {
//       setLoading(prev => ({ ...prev, [dataType]: true }));
//       setStatus(prev => ({ ...prev, [dataType]: 'Downloading...' }));
      
//       const response = await fetch(endpoint);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error: ${response.status}`);
//       }
      
//       const csvData = await response.text();
//       const blob = new Blob([csvData], { type: 'text/csv' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `${dataType}_${new Date().getTime()}.csv`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
      
//       setStatus(prev => ({ ...prev, [dataType]: '✓ Downloaded' }));
      
//       setTimeout(() => {
//         setStatus(prev => ({ ...prev, [dataType]: '' }));
//       }, 3000);
      
//     } catch (error) {
//       console.error('Error:', error);
//       setStatus(prev => ({ ...prev, [dataType]: '✗ Failed' }));
//     } finally {
//       setLoading(prev => ({ ...prev, [dataType]: false }));
//     }
//   };

//   // Light theme classes
//   const bgClass = "bg-gray-100";
//   const textClass = "text-gray-800";
//   const cardBgClass = "bg-white";
//   const cardBorderClass = "border-gray-300";
//   const cardHoverClass = "hover:border-[#0AC4E0]/50 hover:shadow-lg";
//   const titleClass = "text-gray-900";
//   const subtitleClass = "text-gray-600";
//   const noteBgClass = "bg-gray-50";
//   const noteTextClass = "text-gray-600";
//   const buttonBaseClass = "px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
//   const statusSuccessClass = "text-emerald-600";
//   const statusErrorClass = "text-red-600";
//   const statusDownloadingClass = "text-[#0AC4E0]";

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-3 sm:p-4 md:p-6`}>
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-6 sm:mb-8">
//           <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${titleClass} mb-2`}>
//             Download CSV Data
//           </h1>
//           <p className={`text-xs sm:text-sm ${subtitleClass}`}>
//             Export your data in CSV format for analysis and reporting
//           </p>
//           <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] rounded-full mt-3"></div>
//         </div>
        
//         {/* Download Cards Grid */}
//         <div className="grid gap-3 sm:gap-4">
//           {apiEndpoints.map((data) => (
//             <div
//               key={data.id}
//               className={`${cardBgClass} border ${cardBorderClass} ${cardHoverClass} rounded-lg sm:rounded-xl p-4 sm:p-5 transition-all duration-300 shadow-sm`}
//             >
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
//                 {/* Left side - Info */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 mb-1">
//                     {/* Color indicator */}
//                     <div
//                       className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
//                       style={{ backgroundColor: data.color }}
//                     ></div>
//                     <h3 className="text-sm sm:text-base font-semibold text-gray-800">
//                       {data.name}
//                     </h3>
//                   </div>
//                   <p className={`text-xs ${subtitleClass} mb-1 sm:mb-2`}>
//                     {data.description}
//                   </p>
//                   <p className={`text-[10px] sm:text-xs font-mono ${subtitleClass} bg-gray-100 px-2 py-1 rounded inline-block truncate max-w-full`}>
//                     {data.endpoint}
//                   </p>
//                 </div>
                
//                 {/* Right side - Status & Button */}
//                 <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3">
//                   {/* Status message */}
//                   {status[data.id] && (
//                     <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
//                       status[data.id].includes('✓') 
//                         ? statusSuccessClass 
//                         : status[data.id].includes('✗') 
//                           ? statusErrorClass 
//                           : statusDownloadingClass
//                     }`}>
//                       {status[data.id]}
//                     </span>
//                   )}
                  
//                   {/* Download button */}
//                   <button
//                     onClick={() => downloadCSV(data.endpoint, data.id)}
//                     disabled={loading[data.id]}
//                     className={`${buttonBaseClass} ${
//                       loading[data.id] 
//                         ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
//                         : 'bg-[#0AC4E0] hover:bg-[#0A8B9F] text-white focus:ring-[#0AC4E0]'
//                     }`}
//                   >
//                     {loading[data.id] ? (
//                       <span className="flex items-center gap-1 sm:gap-2">
//                         <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         <span className="text-xs sm:text-sm">Downloading</span>
//                       </span>
//                     ) : (
//                       <span className="flex items-center gap-1 sm:gap-2">
//                         <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                         </svg>
//                         <span className="text-xs sm:text-sm">Download</span>
//                       </span>
//                     )}
//                   </button>
//                 </div>
//               </div>
              
//               {/* Progress indicator */}
//               {loading[data.id] && (
//                 <div className="mt-3 sm:mt-4">
//                   <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
//                     <div className="h-full bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] rounded-full animate-pulse" style={{ width: '60%' }}></div>
//                   </div>
//                   <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
//                     Preparing your download...
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Quick Stats */}
//         <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
//           <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-300 text-center">
//             <div className="text-[10px] sm:text-xs text-gray-600">Total Types</div>
//             <div className="text-base sm:text-lg font-bold text-[#0AC4E0]">3</div>
//           </div>
//           <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-300 text-center">
//             <div className="text-[10px] sm:text-xs text-gray-600">Format</div>
//             <div className="text-base sm:text-lg font-bold text-[#0A8B9F]">CSV</div>
//           </div>
//           <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-300 text-center col-span-2 sm:col-span-1">
//             <div className="text-[10px] sm:text-xs text-gray-600">Server</div>
//             <div className="text-xs sm:text-sm font-bold text-gray-700 truncate">www.aartecbts.com</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DownloadPage;







import React, { useState, useEffect } from 'react';

const DownloadPage = () => {
  const [loading, setLoading] = useState({
    commandLog: false,
    bibo: false,
    analog: false
  });

  const [status, setStatus] = useState({
    commandLog: '',
    bibo: '',
    analog: ''
  });

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

  const apiEndpoints = [
    {
      id: 'commandLog',
      name: 'Command Log',
      endpoint: 'http://localhost:8000/api/v1/download/command/log',
      color: '#0AC4E0',
      description: 'Download command execution history'
    },
    {
      id: 'bibo',
      name: 'BIBO Data',
      endpoint: 'http://localhost:8000/api/v1/download/bibo',
      color: '#0A8B9F',
      description: 'Download Binary Input/Output data'
    },
    {
      id: 'analog',
      name: 'Analog Data',
      endpoint: 'http://localhost:8000/api/v1/download/analog',
      color: '#0891b2',
      description: 'Download analog signal measurements'
    }
  ];

  const downloadCSV = async (endpoint, dataType) => {
    try {
      // Check authentication first
      const token = getAuthToken();
      if (!token) {
        setAuthError(true);
        setStatus(prev => ({ ...prev, [dataType]: '✗ Authentication required' }));
        return;
      }

      setLoading(prev => ({ ...prev, [dataType]: true }));
      setStatus(prev => ({ ...prev, [dataType]: 'Downloading...' }));
      
      // Add authorization header
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401 || response.status === 403) {
        setAuthError(true);
        throw new Error('Authentication failed. Please log in again.');
      }

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const csvData = await response.text();
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${dataType}_${new Date().getTime()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setStatus(prev => ({ ...prev, [dataType]: '✓ Downloaded' }));
      
      setTimeout(() => {
        setStatus(prev => ({ ...prev, [dataType]: '' }));
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setStatus(prev => ({ ...prev, [dataType]: '✗ Failed' }));
      
      if (error.message.includes('Authentication')) {
        setAuthError(true);
      }
    } finally {
      setLoading(prev => ({ ...prev, [dataType]: false }));
    }
  };

  // Light theme classes
  const bgClass = "bg-gray-100";
  const textClass = "text-gray-800";
  const cardBgClass = "bg-white";
  const cardBorderClass = "border-gray-300";
  const cardHoverClass = "hover:border-[#0AC4E0]/50 hover:shadow-lg";
  const titleClass = "text-gray-900";
  const subtitleClass = "text-gray-600";
  const noteBgClass = "bg-gray-50";
  const noteTextClass = "text-gray-600";
  const buttonBaseClass = "px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const statusSuccessClass = "text-emerald-600";
  const statusErrorClass = "text-red-600";
  const statusDownloadingClass = "text-[#0AC4E0]";

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} p-3 sm:p-4 md:p-6`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${titleClass}`}>
              Download CSV Data
            </h1>
            {/* Auth Status Indicator */}
            {!isAuthenticated && (
              <span className="text-[10px] sm:text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full border border-red-300">
                UNAUTHENTICATED
              </span>
            )}
          </div>
          <p className={`text-xs sm:text-sm ${subtitleClass}`}>
            Export your data in CSV format for analysis and reporting
          </p>
          <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] rounded-full mt-3"></div>
        </div>

        {/* Auth Error Message */}
        {authError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-xs sm:text-sm text-red-600 animate-fade-in">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Authentication required. Please log in to download data.</span>
            </div>
          </div>
        )}
        
        {/* Download Cards Grid */}
        <div className="grid gap-3 sm:gap-4">
          {apiEndpoints.map((data) => (
            <div
              key={data.id}
              className={`${cardBgClass} border ${cardBorderClass} ${cardHoverClass} rounded-lg sm:rounded-xl p-4 sm:p-5 transition-all duration-300 shadow-sm ${!isAuthenticated ? 'opacity-75' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                {/* Left side - Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {/* Color indicator */}
                    <div
                      className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: data.color }}
                    ></div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                      {data.name}
                    </h3>
                  </div>
                  <p className={`text-xs ${subtitleClass} mb-1 sm:mb-2`}>
                    {data.description}
                  </p>
                  <p className={`text-[10px] sm:text-xs font-mono ${subtitleClass} bg-gray-100 px-2 py-1 rounded inline-block truncate max-w-full`}>
                    {data.endpoint}
                  </p>
                </div>
                
                {/* Right side - Status & Button */}
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3">
                  {/* Status message */}
                  {status[data.id] && (
                    <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                      status[data.id].includes('✓') 
                        ? statusSuccessClass 
                        : status[data.id].includes('✗') 
                          ? statusErrorClass 
                          : statusDownloadingClass
                    }`}>
                      {status[data.id]}
                    </span>
                  )}
                  
                  {/* Download button */}
                  <button
                    onClick={() => downloadCSV(data.endpoint, data.id)}
                    disabled={loading[data.id] || !isAuthenticated}
                    className={`${buttonBaseClass} ${
                      loading[data.id] || !isAuthenticated
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-[#0AC4E0] hover:bg-[#0A8B9F] text-white focus:ring-[#0AC4E0]'
                    }`}
                    title={!isAuthenticated ? 'Login required to download' : ''}
                  >
                    {loading[data.id] ? (
                      <span className="flex items-center gap-1 sm:gap-2">
                        <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xs sm:text-sm">Downloading</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 sm:gap-2">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="text-xs sm:text-sm">Download</span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Progress indicator */}
              {loading[data.id] && (
                <div className="mt-3 sm:mt-4">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                    Preparing your download...
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Authentication Required Message (when not authenticated and no cards are loading) */}
        {!isAuthenticated && !authError && (
          <div className="mt-6 p-6 sm:p-8 bg-white/80 border border-red-300 rounded-lg text-center">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div className={`text-base sm:text-xl ${titleClass} mb-2 sm:mb-3 font-bold`}>Authentication Required</div>
              <div className={`text-xs sm:text-sm ${subtitleClass} max-w-md mx-auto`}>
                Please log in to download CSV data. This page requires valid authentication credentials.
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-300 text-center">
            <div className="text-[10px] sm:text-xs text-gray-600">Total Types</div>
            <div className="text-base sm:text-lg font-bold text-[#0AC4E0]">3</div>
          </div>
          <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-300 text-center">
            <div className="text-[10px] sm:text-xs text-gray-600">Format</div>
            <div className="text-base sm:text-lg font-bold text-[#0A8B9F]">CSV</div>
          </div>
          <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-300 text-center col-span-2 sm:col-span-1">
            <div className="text-[10px] sm:text-xs text-gray-600">Server</div>
            <div className="text-xs sm:text-sm font-bold text-gray-700 truncate">www.aartecbts.com</div>
          </div>
        </div>

        {/* Note Section */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-300">
          <p className="text-xs sm:text-sm text-gray-600">
            <span className="font-semibold">Note:</span> All downloads require authentication. 
            Files are saved with timestamps to prevent overwrites. Check browser console for any errors.
          </p>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DownloadPage;