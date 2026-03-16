// import { useEffect, useState, useRef } from "react";

// const API_BASE = "https://mqtt-testing-2.onrender.com";

// /* ---------------- DATA STRUCTURES ---------------- */
// const actions = [
//   {
//     title: "BTS Control",
//     buttons: [
//       {
//         label: "BTS IN",
//         endpoint: "/api/v1/bts/in",
//         color: "green",
//         type: "immediate",
//       },
//       {
//         label: "BTS OUT",
//         endpoint: "/api/v1/bts/out",
//         color: "red",
//         type: "immediate",
//       },
//       {
//         label: "BTS RESET",
//         endpoint: "/api/v1/reset-bts",
//         color: "yellow",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Remote Test",
//     buttons: [
//       {
//         label: "Remote Test IN",
//         endpoint: "/api/v1/remote-test/in",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test OUT",
//         endpoint: "/api/v1/remote-test/out",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test Transfer",
//         endpoint: "/api/v1/remote-test/transfer",
//         color: "purple",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Bus to Source",
//     buttons: [
//       {
//         label: "BusA to Src1",
//         endpoint: "/api/v1/bus1/source1",
//         color: "gray",
//         directionTag: "b1_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA to Src2",
//         endpoint: "/api/v1/bus1/source2",
//         color: "gray",
//         directionTag: "b1_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src1",
//         endpoint: "/api/v1/bus2/source1",
//         color: "gray",
//         directionTag: "b2_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src2",
//         endpoint: "/api/v1/bus2/source2",
//         color: "gray",
//         directionTag: "b2_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src1",
//         endpoint: "/api/v1/bus12/source1",
//         color: "gray",
//         directionTag: "b1_2_to_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src2",
//         endpoint: "/api/v1/bus12/source2",
//         color: "gray",
//         directionTag: "b1_2_to_s2_available",
//         type: "direction",
//       },
//     ],
//   },
//   {
//     title: "Remote Mode",
//     buttons: [
//       {
//         label: "FAST",
//         endpoint: "/api/v1/mode/fast",
//         color: "blue",
//         modeTag: "fastModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-SLOW",
//         endpoint: "/api/v1/mode/fasl",
//         color: "blue",
//         modeTag: "fastSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-INPHASE-SLOW",
//         endpoint: "/api/v1/mode/fainsl",
//         color: "blue",
//         modeTag: "fastInPhaseSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "PARALLEL",
//         endpoint: "/api/v1/mode/parallel",
//         color: "blue",
//         modeTag: "parallelModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "SLOW",
//         endpoint: "/api/v1/mode/slow",
//         color: "blue",
//         modeTag: "slowModeSelected",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Live Transfer",
//     buttons: [
//       {
//         label: "Operate Breaker",
//         endpoint: "/api/v1/breaker/operate",
//         color: "orange",
//         type: "breaker",
//       },
//     ],
//   },
// ];

// export default function ModbusControlPanel() {
//   const [loading, setLoading] = useState(false);
//   const [logs, setLogs] = useState([]);
//   const [biData, setBiData] = useState([]);
//   const [modeData, setModeData] = useState([]);
//   const [sseStatus, setSseStatus] = useState("CONNECTING");
//   const [modeSseStatus, setModeSseStatus] = useState("CONNECTING");
//   const [activeCommand, setActiveCommand] = useState(null);

//   const biDataRef = useRef([]);
//   const modeDataRef = useRef([]);
//   const evtSourceRef = useRef(null);
//   const modeEvtSourceRef = useRef(null);
//   const reconnectTimeoutRef = useRef(null);
//   const modeReconnectTimeoutRef = useRef(null);

//   // Track previous states to detect changes
//   const prevBiDataRef = useRef([]);
//   const prevModeDataRef = useRef([]);

//   /* ---------------- LOGGING ---------------- */
//   const addLog = (msg, type = "INFO") => {
//     const allowedTypes = [
//       "CMD",
//       "DIRECTION",
//       "BREAKER",
//       "SUCCESS",
//       "ERROR",
//       "MODE_CHANGE",
//       "STATUS_CHANGE",
//       "CONNECTION",
//     ];

//     if (!allowedTypes.includes(type)) {
//       return;
//     }

//     const timestamp = new Date().toLocaleTimeString();
//     setLogs((prev) => [{ timestamp, msg, type }, ...prev].slice(0, 50));
//   };

//   /* ---------------- CONTROL CALL (INDEPENDENT OPERATIONS) ---------------- */
//   const callApi = async (label, endpoint, buttonType = "immediate") => {
//     try {
//       setLoading(true);
//       setActiveCommand(label);
//       addLog(`${label}`, "CMD");

//       /* 1️⃣ DIRECTION BUTTONS - IMMEDIATE API CALL (NO ARMING) */
//       if (buttonType === "direction") {
//         addLog(`Setting direction: ${label}`, "DIRECTION");
        
//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
          
//         });

//         if (!response.ok) {
//           throw new Error(`Direction setup failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Direction set: ${label}`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       /* 2️⃣ BREAKER BUTTON - INDEPENDENT OPERATION (NO DIRECTION REQUIRED) */
//       if (buttonType === "breaker") {
//         addLog(`Operating breaker`, "BREAKER");

//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error(`Breaker operation failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Breaker operation completed`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       /* 3️⃣ OTHER COMMANDS (BTS, REMOTE TEST, MODES) */
//       const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Operation failed");

//       addLog(`${label} successful`, "SUCCESS");
//     } catch (err) {
//       addLog(`${label} failed: ${err.message}`, "ERROR");
//     } finally {
//       setLoading(false);
//       setTimeout(() => setActiveCommand(null), 1000);
//     }
//   };

//   /* ---------------- SSE LIVE DATA ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectSSE = () => {
//       try {
//         if (evtSourceRef.current) {
//           evtSourceRef.current.close();
//           evtSourceRef.current = null;
//         }

//         evtSourceRef.current = new EventSource(
//           `${API_BASE}/api/v1/stream/bi-available`,
//         );

//         evtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setSseStatus("CONNECTED");
//           addLog("Direction stream connected", "CONNECTION");
//         };

//         evtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             if (parsed.bi && Array.isArray(parsed.bi)) {
//               const transformedData = parsed.bi.map((item) => ({
//                 tag: item.tag,
//                 value: item.value,
//                 description: getDirectionDescription(item.tag),
//               }));

//               // Check for changes in system status
//               if (prevBiDataRef.current.length > 0) {
//                 const changedItems = [];
//                 transformedData.forEach((item, index) => {
//                   if (index < prevBiDataRef.current.length) {
//                     const prevItem = prevBiDataRef.current[index];
//                     if (prevItem && prevItem.value !== item.value) {
//                       changedItems.push(item);
//                     }
//                   }
//                 });

//                 // Log any status changes
//                 if (changedItems.length > 0) {
//                   changedItems.forEach((item) => {
//                     const statusText =
//                       item.tag === "btsNotReadyStatus"
//                         ? item.value
//                           ? "NOT READY"
//                           : "READY"
//                         : item.value
//                           ? "AVAILABLE"
//                           : "UNAVAILABLE";
//                     addLog(
//                       `${getDirectionDescription(item.tag)}: ${statusText}`,
//                       "STATUS_CHANGE",
//                     );
//                   });
//                 }
//               }

//               // Update data immediately
//               biDataRef.current = transformedData;
//               setBiData(transformedData);
//               prevBiDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("SSE parse error:", err);
//           }
//         };

//         evtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setSseStatus("DISCONNECTED");

//           if (evtSourceRef.current) {
//             evtSourceRef.current.close();
//             evtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(reconnectTimeoutRef.current);
//             reconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setSseStatus("RECONNECTING");
//                 connectSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("SSE connection error:", err);
//         if (isMounted) {
//           setSseStatus("ERROR");

//           clearTimeout(reconnectTimeoutRef.current);
//           reconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setSseStatus("RECONNECTING");
//               connectSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectSSE();

//     // Cleanup function
//     return () => {
//       isMounted = false;

//       if (evtSourceRef.current) {
//         evtSourceRef.current.close();
//         evtSourceRef.current = null;
//       }

//       if (reconnectTimeoutRef.current) {
//         clearTimeout(reconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- MODE SELECTION SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectModeSSE = () => {
//       try {
//         if (modeEvtSourceRef.current) {
//           modeEvtSourceRef.current.close();
//           modeEvtSourceRef.current = null;
//         }

//         modeEvtSourceRef.current = new EventSource(
//           `${API_BASE}/api/v1/stream/mode-selected`,
//         );

//         modeEvtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setModeSseStatus("CONNECTED");
//           addLog("Mode selection stream connected", "CONNECTION");
//         };

//         modeEvtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             let modeArray = [];

//             if (parsed.bo && Array.isArray(parsed.bo)) {
//               modeArray = parsed.bo;
//             } else if (parsed.data && Array.isArray(parsed.data)) {
//               modeArray = parsed.data;
//             } else if (Array.isArray(parsed)) {
//               modeArray = parsed;
//             }

//             if (modeArray.length > 0) {
//               const transformedData = modeArray.map((item) => ({
//                 tag: item.tag || item.name || item.address,
//                 value: item.value,
//                 address: item.address || item.tag || "N/A",
//                 description: getModeDescription(
//                   item.tag || item.name || item.address,
//                 ),
//               }));

//               // Check for mode changes
//               if (prevModeDataRef.current.length > 0) {
//                 const prevActiveMode = prevModeDataRef.current.find(
//                   (item) => item.value === true,
//                 );
//                 const currentActiveMode = transformedData.find(
//                   (item) => item.value === true,
//                 );

//                 if (
//                   prevActiveMode &&
//                   currentActiveMode &&
//                   prevActiveMode.tag !== currentActiveMode.tag
//                 ) {
//                   addLog(
//                     `Mode changed from ${prevActiveMode.description} to ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (!prevActiveMode && currentActiveMode) {
//                   addLog(
//                     `Mode selected: ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (prevActiveMode && !currentActiveMode) {
//                   addLog(
//                     `Mode deselected: ${prevActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 }
//               }

//               // Update data immediately
//               modeDataRef.current = transformedData;
//               setModeData(transformedData);
//               prevModeDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("Mode SSE parse error:", err);
//           }
//         };

//         modeEvtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setModeSseStatus("DISCONNECTED");

//           if (modeEvtSourceRef.current) {
//             modeEvtSourceRef.current.close();
//             modeEvtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(modeReconnectTimeoutRef.current);
//             modeReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setModeSseStatus("RECONNECTING");
//                 connectModeSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("Mode SSE connection error:", err);
//         if (isMounted) {
//           setModeSseStatus("ERROR");

//           clearTimeout(modeReconnectTimeoutRef.current);
//           modeReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setModeSseStatus("RECONNECTING");
//               connectModeSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectModeSSE();

//     // Cleanup function
//     return () => {
//       isMounted = false;

//       if (modeEvtSourceRef.current) {
//         modeEvtSourceRef.current.close();
//         modeEvtSourceRef.current = null;
//       }

//       if (modeReconnectTimeoutRef.current) {
//         clearTimeout(modeReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- HELPER FUNCTIONS ---------------- */
//   const getModeDescription = (tag) => {
//     const descriptions = {
//       fastModeSelected: "Fast Mode",
//       fastSlowModeSelected: "Fast-Slow Mode",
//       fastInPhaseSlowModeSelected: "Fast In-Phase Slow Mode",
//       parallelModeSelected: "Parallel Mode",
//       slowModeSelected: "Slow Mode",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getDirectionDescription = (tag) => {
//     const descriptions = {
//       b1_s1_available: "BusA to Src1",
//       b1_s2_available: "BusA to Src2",
//       b2_s1_available: "BusB to Src1",
//       b2_s2_available: "BusB to Src2",
//       b1_2_to_s1_available: "BusA&B to Src1",
//       b1_2_to_s2_available: "BusA&B to Src2",
//       btsNotReadyStatus: "BTS Ready Status",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getActiveMode = () => {
//     const activeMode = modeData.find((item) => item.value === true);
//     return activeMode ? activeMode.description : "No Mode Selected";
//   };

//   // Get BTS Ready Status
//   const getBTSReadyStatus = () => {
//     const btsNotReady = biData.find((item) => item.tag === "btsNotReadyStatus");
//     return btsNotReady ? !btsNotReady.value : false;
//   };

//   // Get direction availability
//   const getDirectionAvailability = (directionTag) => {
//     if (!directionTag) return false;
//     const direction = biData.find((item) => item.tag === directionTag);
//     return direction ? direction.value : false;
//   };

//   // Get mode active status
//   const getModeActiveStatus = (modeTag) => {
//     if (!modeTag) return false;
//     const mode = modeData.find((item) => item.tag === modeTag);
//     return mode ? mode.value : false;
//   };

//   // Clear event log
//   const clearLogs = () => {
//     setLogs([]);
//   };

//   // Light theme color classes with #0AC4E0 as primary accent
//   const colorClasses = {
//     green: "bg-green-500 border-green-600 hover:bg-green-600 hover:border-green-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     red: "bg-red-500 border-red-600 hover:bg-red-600 hover:border-red-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     yellow: "bg-yellow-400 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     blue: "bg-[#0AC4E0] border-[#0A8B9F] hover:bg-[#0A8B9F] hover:border-[#0A6B7F] text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     purple: "bg-purple-500 border-purple-600 hover:bg-purple-600 hover:border-purple-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     gray: "bg-gray-600 border-gray-700 hover:bg-gray-700 hover:border-gray-800 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     orange: "bg-orange-400 border-orange-500 hover:bg-orange-500 hover:border-orange-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//   };

//   // Get direction availability class
//   const getDirectionClass = (available) => {
//     if (available) {
//       return "bg-green-100 border-[#0AC4E0] hover:bg-green-200 text-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3";
//   };

//   // Get mode active class
//   const getModeActiveClass = (active) => {
//     if (active) {
//       return "bg-purple-100 border-[#0AC4E0] hover:bg-purple-200 text-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3";
//   };

//   // Light theme background classes
//   const bgClass = "bg-gray-100";
//   const textClass = "text-gray-800";
//   const cardBgClass = "bg-white";
//   const cardBorderClass = "border-gray-300";
//   const statusCardBg = "bg-white";
//   const statusCardText = "text-gray-600";
//   const statusValueText = (condition, darkColor, lightColor) => 
//     condition ? lightColor : "text-gray-500";
  
//   const systemStatusBg = (value, isBTS = false) => {
//     if (isBTS) {
//       return value
//         ? "bg-red-100 border-red-300"
//         : "bg-green-100 border-green-300";
//     }
//     return value
//       ? "bg-green-100 border-green-300"
//       : "bg-gray-100 border-gray-300";
//   };
  
//   const systemStatusText = (value, isBTS = false) => {
//     if (isBTS) {
//       return value
//         ? "text-red-600"
//         : "text-green-600";
//     }
//     return value
//       ? "text-green-600"
//       : "text-gray-600";
//   };
  
//   const modeStatusBg = (value) =>
//     value
//       ? "bg-purple-100 border-purple-300"
//       : "bg-gray-100 border-gray-300";
  
//   const modeStatusText = (value) =>
//     value
//       ? "text-purple-600"
//       : "text-gray-600";
  
//   const logBgClass = (type) => {
//     switch(type) {
//       case "ERROR": return "bg-red-50 border-red-200";
//       case "SUCCESS": return "bg-green-50 border-green-200";
//       case "CMD": return "bg-blue-50 border-blue-200";
//       case "DIRECTION": return "bg-orange-50 border-orange-200";
//       case "BREAKER": return "bg-yellow-50 border-yellow-200";
//       case "MODE_CHANGE": return "bg-purple-50 border-purple-200";
//       case "STATUS_CHANGE": return "bg-indigo-50 border-indigo-200";
//       case "CONNECTION": return "bg-gray-50 border-gray-200";
//       default: return "bg-white border-gray-200";
//     }
//   };
  
//   const logTextClass = (type) => {
//     switch(type) {
//       case "ERROR": return "text-red-600";
//       case "SUCCESS": return "text-green-600";
//       case "CMD": return "text-blue-600";
//       case "DIRECTION": return "text-orange-600";
//       case "BREAKER": return "text-yellow-600";
//       case "MODE_CHANGE": return "text-purple-600";
//       case "STATUS_CHANGE": return "text-indigo-600";
//       case "CONNECTION": return "text-gray-600";
//       default: return "text-gray-700";
//     }
//   };

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-2 sm:p-3 md:p-4`}>
//       {/* Header */}
//       <div className="mb-3 sm:mb-4">
//         <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-0 mb-3">
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             <div
//               className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${sseStatus === "CONNECTED" ? "bg-green-500 animate-pulse" : sseStatus === "RECONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`}
//             ></div>
//             <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-wide text-gray-800 truncate">
//               RELAY CONTROL PANEL
//             </h1>
//           </div>
//         </div>

//         {/* Status Indicators - Responsive grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
//           <div
//             className={`${statusCardBg} p-2 sm:p-3 overflow-hidden rounded border ${cardBorderClass}`}
//           >
//             <div className={`text-[10px] sm:text-xs ${statusCardText} truncate`}>ACTIVE COMMAND</div>
//             <div
//               className={`text-xs sm:text-sm font-bold truncate ${activeCommand ? "text-[#0AC4E0]" : "text-gray-600"}`}
//             >
//               {activeCommand || "IDLE"}
//             </div>
//           </div>
//           <div
//             className={`${statusCardBg} p-2 sm:p-3 rounded border ${cardBorderClass}`}
//           >
//             <div className={`text-[10px] sm:text-xs ${statusCardText} truncate`}>ACTIVE MODE</div>
//             <div
//               className={`text-xs sm:text-sm font-bold truncate ${getActiveMode() !== "No Mode Selected" ? "text-purple-600" : "text-gray-600"}`}
//             >
//               {getActiveMode().length > 15 ? `${getActiveMode().substring(0, 12)}...` : getActiveMode()}
//             </div>
//           </div>
//           <div
//             className={`${statusCardBg} p-2 sm:p-3 rounded border ${cardBorderClass}`}
//           >
//             <div className={`text-[10px] sm:text-xs ${statusCardText} truncate`}>ANALOG</div>
//             <div
//               className={`text-xs sm:text-sm font-bold ${getBTSReadyStatus() ? "text-green-600" : "text-red-600"}`}
//             >
//               {getBTSReadyStatus() ? "CONNECTED" : "NOT CONNECTED"}
//             </div>
//           </div>
//           <div
//             className={`${statusCardBg} p-2 sm:p-3 rounded border ${cardBorderClass}`}
//           >
//             <div className={`text-[10px] sm:text-xs ${statusCardText} truncate`}>ONLINE STATUS</div>
//             <div
//               className={`text-xs sm:text-sm font-bold ${loading ? "text-yellow-600" : "text-green-600"}`}
//             >
//               {loading ? "BUSY" : "READY"}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//         {/* LEFT: CONTROL PANELS */}
//         <div className="space-y-3 sm:space-y-4">
//           {actions.map((section, idx) => (
//             <div
//               key={idx}
//               className={`${cardBgClass} p-3 sm:p-4 rounded-lg border ${cardBorderClass}`}
//             >
//               <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//                 <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700 truncate">
//                   {section.title}
//                 </h3>
//                 <div className="text-[10px] sm:text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
//                   {section.buttons.length} CMDs
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-2">
//                 {section.buttons.map((btn, i) => {
//                   const isBreaker = btn.type === "breaker";
//                   const isDirection = btn.type === "direction";
//                   const disabled = loading;
//                   const isActive = activeCommand === btn.label;
//                   const directionAvailable = isDirection
//                     ? getDirectionAvailability(btn.directionTag)
//                     : false;
//                   const modeActive =
//                     section.title === "Remote Mode"
//                       ? getModeActiveStatus(btn.modeTag)
//                       : false;

//                   return (
//                     <div key={i} className="relative">
//                       <button
//                         disabled={disabled}
//                         onClick={() =>
//                           callApi(btn.label, btn.endpoint, btn.type)
//                         }
//                         className={`relative w-full rounded border font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                           isDirection 
//                             ? getDirectionClass(directionAvailable) 
//                             : section.title === "Remote Mode" 
//                               ? getModeActiveClass(modeActive) 
//                               : colorClasses[btn.color]
//                         } ${isActive ? "ring-2 ring-offset-2 ring-offset-white ring-[#0AC4E0]" : ""}`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span className="truncate pr-1">{btn.label}</span>

//                           {/* Visual indicators */}
//                           {isDirection && (
//                             <div className="flex items-center space-x-1 flex-shrink-0">
//                               <div
//                                 className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${directionAvailable ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
//                               ></div>
//                             </div>
//                           )}

//                           {section.title === "Remote Mode" && (
//                             <div className="flex items-center space-x-1 flex-shrink-0">
//                               <div
//                                 className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${modeActive ? "bg-purple-500 animate-pulse" : "bg-gray-400"}`}
//                               ></div>
//                             </div>
//                           )}
//                         </div>

//                         {isActive && (
//                           <div className="absolute -top-1 -right-1">
//                             <div className="animate-ping absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#0AC4E0]"></div>
//                             <div className="relative w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0AC4E0]"></div>
//                           </div>
//                         )}
//                       </button>

//                       {/* Status indicator */}
//                       {(isDirection || section.title === "Remote Mode") && (
//                         <div className="absolute -top-1 -right-1">
//                           {isDirection && directionAvailable && (
//                             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
//                           )}
//                           {section.title === "Remote Mode" && modeActive && (
//                             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 animate-pulse shadow-lg shadow-purple-500/50"></div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* RIGHT: MONITORING */}
//         <div className="space-y-3 sm:space-y-4">
//           {/* System Status */}
//           <div
//             className={`${cardBgClass} p-3 sm:p-4 rounded-lg border ${cardBorderClass}`}
//           >
//             <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//               <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700">
//                 SYSTEM STATUS
//               </h2>
//               <div className="flex items-center space-x-2">
//                 <div className="text-[10px] sm:text-xs text-gray-600">
//                   LIVE FEED
//                 </div>
//                 <div
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${sseStatus === "CONNECTED" ? "bg-green-500 animate-pulse" : sseStatus === "RECONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`}
//                 ></div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//               {biData.map((item, index) => (
//                 <div
//                   key={item.tag || index}
//                   className={`p-2 sm:p-3 rounded border flex items-center justify-between ${systemStatusBg(item.value, item.tag === "btsNotReadyStatus")}`}
//                 >
//                   <div className="flex-1 min-w-0">
//                     <div className="text-[10px] sm:text-xs font-medium truncate text-gray-700">
//                       {getDirectionDescription(item.tag)}
//                     </div>
//                     <div className="text-[8px] sm:text-[10px] font-mono truncate text-gray-600">
//                       {item.tag === "btsNotReadyStatus"
//                         ? "BTS STATUS"
//                         : "DIRECTION STATUS"}
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
//                     <div
//                       className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
//                         item.tag === "btsNotReadyStatus"
//                           ? item.value
//                             ? "bg-red-500 animate-pulse"
//                             : "bg-green-500 animate-pulse"
//                           : item.value
//                             ? "bg-green-500 animate-pulse"
//                             : "bg-red-500"
//                       }`}
//                     ></div>
//                     <div
//                       className={`text-[10px] sm:text-sm font-bold font-mono ${systemStatusText(item.value, item.tag === "btsNotReadyStatus")}`}
//                     >
//                       {item.tag === "btsNotReadyStatus"
//                         ? item.value
//                           ? "NOT READY"
//                           : "READY"
//                         : item.value
//                           ? "AVAILABLE"
//                           : "UNAVAILABLE"}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {biData.length === 0 && (
//               <div className="text-center py-3 sm:py-4 text-[10px] sm:text-sm text-gray-600">
//                 <div className="flex items-center justify-center space-x-2">
//                   <div
//                     className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${sseStatus === "CONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`}
//                   ></div>
//                   <span>
//                     {sseStatus === "CONNECTING"
//                       ? "Connecting to data stream..."
//                       : sseStatus === "RECONNECTING"
//                         ? "Reconnecting..."
//                         : "No data received"}
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Event Log */}
//           <div
//             className={`bg-gray-50 p-3 sm:p-4 rounded-lg border ${cardBorderClass} flex-1`}
//           >
//             <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//               <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700">
//                 EVENT LOG
//               </h2>
//               <div className="flex items-center space-x-2">
//                 <div className="text-[10px] sm:text-xs text-gray-600">
//                   IMPORTANT EVENTS
//                 </div>
//                 <button
//                   onClick={clearLogs}
//                   className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-200 hover:bg-gray-300 rounded border border-gray-300"
//                 >
//                   Clear
//                 </button>
//               </div>
//             </div>

//             <div className="h-48 sm:h-56 md:h-64 overflow-y-auto font-mono text-[10px] sm:text-xs">
//               {logs.length === 0 ? (
//                 <div className="text-center py-6 sm:py-8 text-gray-500">
//                   <div className="mb-1 sm:mb-2">No important events recorded</div>
//                   <div className="text-[8px] sm:text-xs">
//                     Events will appear when commands are executed or system
//                     status changes
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-1 pr-1 sm:pr-2">
//                   {logs.map((log, i) => (
//                     <div
//                       key={i}
//                       className={`p-1.5 sm:p-2 rounded border ${logBgClass(log.type)}`}
//                     >
//                       <div className="flex flex-col xs:flex-row xs:items-start gap-1 xs:gap-0">
//                         <div className="w-full xs:w-16 flex-shrink-0 text-[8px] sm:text-[10px] text-gray-600">
//                           [{log.timestamp}]
//                         </div>
//                         <div
//                           className={`text-[9px] sm:text-[11px] font-medium ${logTextClass(log.type)} break-words`}
//                         >
//                           {log.msg}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Log Legend */}
//             <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-300">
//               <div className="flex flex-wrap gap-2 sm:gap-3 text-[8px] sm:text-[10px]">
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0AC4E0]"></div>
//                   <span className="text-gray-600">CMD</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500"></div>
//                   <span className="text-gray-600">DIR</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500"></div>
//                   <span className="text-gray-600">BRKR</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
//                   <span className="text-gray-600">SUC</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"></div>
//                   <span className="text-gray-600">ERR</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></div>
//                   <span className="text-gray-600">MODE</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-500"></div>
//                   <span className="text-gray-600">STAT</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-300">
//         <div className="flex flex-col xs:flex-row justify-between items-center gap-2 xs:gap-0 text-[8px] sm:text-xs text-gray-600">
//           <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-1 xs:mb-0">
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
//               <span className="whitespace-nowrap">AVAILABLE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"></div>
//               <span className="whitespace-nowrap">UNAVAILABLE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></div>
//               <span className="whitespace-nowrap">ACTIVE MODE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500 animate-pulse"></div>
//               <span className="whitespace-nowrap">RECONNECT</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex flex-wrap justify-center xs:justify-end gap-1">
//               <span>STATUS: {loading ? "EXEC" : "STDBY"}</span>
//               <span className="hidden xs:inline">•</span>
//               <span>BI: {sseStatus === "CONNECTED" ? "CONN" : sseStatus}</span>
//               <span className="hidden xs:inline">•</span>
//               <span>MODE: {modeSseStatus === "CONNECTED" ? "CONN" : modeSseStatus}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







// import { useEffect, useState, useRef } from "react";

// const API_BASE = "https://mqtt-testing-2.onrender.com";

// /* ---------------- DATA STRUCTURES ---------------- */
// const actions = [
//   {
//     title: "BTS Control",
//     buttons: [
//       {
//         label: "BTS IN",
//         endpoint: "/api/v1/bts/in",
//         color: "green",
//         type: "immediate",
//       },
//       {
//         label: "BTS OUT",
//         endpoint: "/api/v1/bts/out",
//         color: "red",
//         type: "immediate",
//       },
//       {
//         label: "BTS RESET",
//         endpoint: "/api/v1/reset-bts",
//         color: "yellow",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Remote Test",
//     buttons: [
//       {
//         label: "Remote Test IN",
//         endpoint: "/api/v1/remote-test/in",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test OUT",
//         endpoint: "/api/v1/remote-test/out",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test Transfer",
//         endpoint: "/api/v1/remote-test/transfer",
//         color: "purple",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Bus to Source",
//     buttons: [
//       {
//         label: "BusA to Src1",
//         endpoint: "/api/v1/bus1/source1",
//         color: "gray",
//         directionTag: "b1_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA to Src2",
//         endpoint: "/api/v1/bus1/source2",
//         color: "gray",
//         directionTag: "b1_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src1",
//         endpoint: "/api/v1/bus2/source1",
//         color: "gray",
//         directionTag: "b2_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src2",
//         endpoint: "/api/v1/bus2/source2",
//         color: "gray",
//         directionTag: "b2_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src1",
//         endpoint: "/api/v1/bus12/source1",
//         color: "gray",
//         directionTag: "b1_2_to_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src2",
//         endpoint: "/api/v1/bus12/source2",
//         color: "gray",
//         directionTag: "b1_2_to_s2_available",
//         type: "direction",
//       },
//     ],
//   },
//   {
//     title: "Remote Mode",
//     buttons: [
//       {
//         label: "FAST",
//         endpoint: "/api/v1/mode/fast",
//         color: "blue",
//         modeTag: "fastModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-SLOW",
//         endpoint: "/api/v1/mode/fasl",
//         color: "blue",
//         modeTag: "fastSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-INPHASE-SLOW",
//         endpoint: "/api/v1/mode/fainsl",
//         color: "blue",
//         modeTag: "fastInPhaseSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "PARALLEL",
//         endpoint: "/api/v1/mode/parallel",
//         color: "blue",
//         modeTag: "parallelModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "SLOW",
//         endpoint: "/api/v1/mode/slow",
//         color: "blue",
//         modeTag: "slowModeSelected",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Live Transfer",
//     buttons: [
//       {
//         label: "Operate Breaker",
//         endpoint: "/api/v1/breaker/operate",
//         color: "orange",
//         type: "breaker",
//       },
//     ],
//   },
// ];

// export default function ModbusControlPanel() {
//   const [loading, setLoading] = useState(false);
//   const [logs, setLogs] = useState([]);
//   const [biData, setBiData] = useState([]);
//   const [modeData, setModeData] = useState([]);
//   const [sseStatus, setSseStatus] = useState("CONNECTING");
//   const [modeSseStatus, setModeSseStatus] = useState("CONNECTING");
//   const [activeCommand, setActiveCommand] = useState(null);
//   const [authError, setAuthError] = useState(false);
  
//   // Confirmation dialog state
//   const [confirmDialog, setConfirmDialog] = useState({
//     isOpen: false,
//     command: null,
//     endpoint: null,
//     buttonType: null,
//     label: null
//   });

//   const biDataRef = useRef([]);
//   const modeDataRef = useRef([]);
//   const evtSourceRef = useRef(null);
//   const modeEvtSourceRef = useRef(null);
//   const reconnectTimeoutRef = useRef(null);
//   const modeReconnectTimeoutRef = useRef(null);

//   // Track previous states to detect changes
//   const prevBiDataRef = useRef([]);
//   const prevModeDataRef = useRef([]);

//   // Helper function to get auth token
//   const getAuthToken = () => {
//     return localStorage.getItem("token") || sessionStorage.getItem("token");
//   };

//   // Helper function to check if user is authenticated
//   const isAuthenticated = () => {
//     return !!getAuthToken();
//   };

//   // Helper function to create headers with auth token
//   const getAuthHeaders = () => {
//     const token = getAuthToken();
//     return {
//       "Content-Type": "application/json",
//       ...(token ? { "Authorization": `Bearer ${token}` } : {})
//     };
//   };

//   /* ---------------- LOGGING ---------------- */
//   const addLog = (msg, type = "INFO") => {
//     const allowedTypes = [
//       "CMD",
//       "DIRECTION",
//       "BREAKER",
//       "SUCCESS",
//       "ERROR",
//       "MODE_CHANGE",
//       "STATUS_CHANGE",
//       "CONNECTION",
//       "AUTH_ERROR",
//       "CONFIRMATION",
//     ];

//     if (!allowedTypes.includes(type)) {
//       return;
//     }

//     const timestamp = new Date().toLocaleTimeString();
//     setLogs((prev) => [{ timestamp, msg, type }, ...prev].slice(0, 50));
//   };

//   /* ---------------- CONFIRMATION DIALOG ---------------- */
//   const openConfirmDialog = (label, endpoint, buttonType) => {
//     setConfirmDialog({
//       isOpen: true,
//       command: label,
//       endpoint: endpoint,
//       buttonType: buttonType,
//       label: label
//     });
//   };

//   const closeConfirmDialog = () => {
//     setConfirmDialog({
//       isOpen: false,
//       command: null,
//       endpoint: null,
//       buttonType: null,
//       label: null
//     });
//   };

//   const handleConfirm = () => {
//     const { label, endpoint, buttonType } = confirmDialog;
//     addLog(`Command confirmed: ${label}`, "CONFIRMATION");
//     closeConfirmDialog();
//     // Execute the command
//     executeCommand(label, endpoint, buttonType);
//   };

//   const handleCancel = () => {
//     if (confirmDialog.label) {
//       addLog(`Command cancelled: ${confirmDialog.label}`, "CONFIRMATION");
//     }
//     closeConfirmDialog();
//   };

//   /* ---------------- CONTROL CALL (INDEPENDENT OPERATIONS) ---------------- */
//   const executeCommand = async (label, endpoint, buttonType = "immediate") => {
//     // Check authentication first
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }

//     try {
//       setLoading(true);
//       setActiveCommand(label);
//       addLog(`${label}`, "CMD");

//       const headers = getAuthHeaders();

//       /* 1️⃣ DIRECTION BUTTONS - IMMEDIATE API CALL (NO ARMING) */
//       if (buttonType === "direction") {
//         addLog(`Setting direction: ${label}`, "DIRECTION");
        
//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Direction setup failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Direction set: ${label}`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       /* 2️⃣ BREAKER BUTTON - INDEPENDENT OPERATION (NO DIRECTION REQUIRED) */
//       if (buttonType === "breaker") {
//         addLog(`Operating breaker`, "BREAKER");

//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Breaker operation failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Breaker operation completed`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       /* 3️⃣ OTHER COMMANDS (BTS, REMOTE TEST, MODES) */
//       const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: headers,
//       });

//       if (res.status === 401 || res.status === 403) {
//         throw new Error("Authentication failed. Please log in again.");
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Operation failed");

//       addLog(`${label} successful`, "SUCCESS");
//     } catch (err) {
//       addLog(`${label} failed: ${err.message}`, "ERROR");
//       if (err.message.includes("Authentication failed")) {
//         setAuthError(true);
//         setTimeout(() => setAuthError(false), 3000);
//       }
//     } finally {
//       setLoading(false);
//       setTimeout(() => setActiveCommand(null), 1000);
//     }
//   };

//   // Wrapper function to show confirmation dialog
//   const callApi = (label, endpoint, buttonType = "immediate") => {
//     // Check authentication first
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }

//     // Open confirmation dialog
//     openConfirmDialog(label, endpoint, buttonType);
//   };

//   /* ---------------- SSE LIVE DATA ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectSSE = () => {
//       try {
//         if (evtSourceRef.current) {
//           evtSourceRef.current.close();
//           evtSourceRef.current = null;
//         }

//         // Add token to SSE URL if needed (some SSE implementations support query params)
//         const token = getAuthToken();
//         const url = token 
//           ? `${API_BASE}/api/v1/stream/bi-available?token=${token}`
//           : `${API_BASE}/api/v1/stream/bi-available`;

//         evtSourceRef.current = new EventSource(url);

//         evtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setSseStatus("CONNECTED");
//           // addLog("Direction stream connected", "CONNECTION");
//         };

//         evtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             if (parsed.bi && Array.isArray(parsed.bi)) {
//               const transformedData = parsed.bi.map((item) => ({
//                 tag: item.tag,
//                 value: item.value,
//                 description: getDirectionDescription(item.tag),
//               }));

//               // Check for changes in system status
//               if (prevBiDataRef.current.length > 0) {
//                 const changedItems = [];
//                 transformedData.forEach((item, index) => {
//                   if (index < prevBiDataRef.current.length) {
//                     const prevItem = prevBiDataRef.current[index];
//                     if (prevItem && prevItem.value !== item.value) {
//                       changedItems.push(item);
//                     }
//                   }
//                 });

//                 // Log any status changes
//                 if (changedItems.length > 0) {
//                   changedItems.forEach((item) => {
//                     const statusText =
//                       item.tag === "btsNotReadyStatus"
//                         ? item.value
//                           ? "NOT READY"
//                           : "READY"
//                         : item.value
//                           ? "AVAILABLE"
//                           : "UNAVAILABLE";
//                     addLog(
//                       `${getDirectionDescription(item.tag)}: ${statusText}`,
//                       "STATUS_CHANGE",
//                     );
//                   });
//                 }
//               }

//               // Update data immediately
//               biDataRef.current = transformedData;
//               setBiData(transformedData);
//               prevBiDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("SSE parse error:", err);
//           }
//         };

//         evtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setSseStatus("DISCONNECTED");

//           if (evtSourceRef.current) {
//             evtSourceRef.current.close();
//             evtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(reconnectTimeoutRef.current);
//             reconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setSseStatus("RECONNECTING");
//                 connectSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("SSE connection error:", err);
//         if (isMounted) {
//           setSseStatus("ERROR");

//           clearTimeout(reconnectTimeoutRef.current);
//           reconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setSseStatus("RECONNECTING");
//               connectSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectSSE();

//     // Cleanup function
//     return () => {
//       isMounted = false;

//       if (evtSourceRef.current) {
//         evtSourceRef.current.close();
//         evtSourceRef.current = null;
//       }

//       if (reconnectTimeoutRef.current) {
//         clearTimeout(reconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- MODE SELECTION SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectModeSSE = () => {
//       try {
//         if (modeEvtSourceRef.current) {
//           modeEvtSourceRef.current.close();
//           modeEvtSourceRef.current = null;
//         }

//         // Add token to SSE URL if needed
//         const token = getAuthToken();
//         const url = token
//           ? `${API_BASE}/api/v1/stream/mode-selected?token=${token}`
//           : `${API_BASE}/api/v1/stream/mode-selected`;

//         modeEvtSourceRef.current = new EventSource(url);

//         modeEvtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setModeSseStatus("CONNECTED");
//           // addLog("Mode selection stream connected", "CONNECTION");
//         };

//         modeEvtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             let modeArray = [];

//             if (parsed.bo && Array.isArray(parsed.bo)) {
//               modeArray = parsed.bo;
//             } else if (parsed.data && Array.isArray(parsed.data)) {
//               modeArray = parsed.data;
//             } else if (Array.isArray(parsed)) {
//               modeArray = parsed;
//             }

//             if (modeArray.length > 0) {
//               const transformedData = modeArray.map((item) => ({
//                 tag: item.tag || item.name || item.address,
//                 value: item.value,
//                 address: item.address || item.tag || "N/A",
//                 description: getModeDescription(
//                   item.tag || item.name || item.address,
//                 ),
//               }));

//               // Check for mode changes
//               if (prevModeDataRef.current.length > 0) {
//                 const prevActiveMode = prevModeDataRef.current.find(
//                   (item) => item.value === true,
//                 );
//                 const currentActiveMode = transformedData.find(
//                   (item) => item.value === true,
//                 );

//                 if (
//                   prevActiveMode &&
//                   currentActiveMode &&
//                   prevActiveMode.tag !== currentActiveMode.tag
//                 ) {
//                   addLog(
//                     `Mode changed from ${prevActiveMode.description} to ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (!prevActiveMode && currentActiveMode) {
//                   addLog(
//                     `Mode selected: ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (prevActiveMode && !currentActiveMode) {
//                   addLog(
//                     `Mode deselected: ${prevActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 }
//               }

//               // Update data immediately
//               modeDataRef.current = transformedData;
//               setModeData(transformedData);
//               prevModeDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("Mode SSE parse error:", err);
//           }
//         };

//         modeEvtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setModeSseStatus("DISCONNECTED");

//           if (modeEvtSourceRef.current) {
//             modeEvtSourceRef.current.close();
//             modeEvtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(modeReconnectTimeoutRef.current);
//             modeReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setModeSseStatus("RECONNECTING");
//                 connectModeSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("Mode SSE connection error:", err);
//         if (isMounted) {
//           setModeSseStatus("ERROR");

//           clearTimeout(modeReconnectTimeoutRef.current);
//           modeReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setModeSseStatus("RECONNECTING");
//               connectModeSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectModeSSE();

//     // Cleanup function
//     return () => {
//       isMounted = false;

//       if (modeEvtSourceRef.current) {
//         modeEvtSourceRef.current.close();
//         modeEvtSourceRef.current = null;
//       }

//       if (modeReconnectTimeoutRef.current) {
//         clearTimeout(modeReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- HELPER FUNCTIONS ---------------- */
//   const getModeDescription = (tag) => {
//     const descriptions = {
//       fastModeSelected: "Fast Mode",
//       fastSlowModeSelected: "Fast-Slow Mode",
//       fastInPhaseSlowModeSelected: "Fast In-Phase Slow Mode",
//       parallelModeSelected: "Parallel Mode",
//       slowModeSelected: "Slow Mode",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getDirectionDescription = (tag) => {
//     const descriptions = {
//       b1_s1_available: "BusA to Src1",
//       b1_s2_available: "BusA to Src2",
//       b2_s1_available: "BusB to Src1",
//       b2_s2_available: "BusB to Src2",
//       b1_2_to_s1_available: "BusA&B to Src1",
//       b1_2_to_s2_available: "BusA&B to Src2",
//       btsNotReadyStatus: "BTS Ready Status",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getActiveMode = () => {
//     const activeMode = modeData.find((item) => item.value === true);
//     return activeMode ? activeMode.description : "No Mode Selected";
//   };

//   // Get BTS Ready Status
//   const getBTSReadyStatus = () => {
//     const btsNotReady = biData.find((item) => item.tag === "btsNotReadyStatus");
//     return btsNotReady ? !btsNotReady.value : false;
//   };

//   // Get direction availability
//   const getDirectionAvailability = (directionTag) => {
//     if (!directionTag) return false;
//     const direction = biData.find((item) => item.tag === directionTag);
//     return direction ? direction.value : false;
//   };

//   // Get mode active status
//   const getModeActiveStatus = (modeTag) => {
//     if (!modeTag) return false;
//     const mode = modeData.find((item) => item.tag === modeTag);
//     return mode ? mode.value : false;
//   };

//   // Clear event log
//   const clearLogs = () => {
//     setLogs([]);
//   };

//   // Light theme color classes with #0AC4E0 as primary accent
//   const colorClasses = {
//     green: "bg-green-500 border-green-600 hover:bg-green-600 hover:border-green-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     red: "bg-red-500 border-red-600 hover:bg-red-600 hover:border-red-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     yellow: "bg-yellow-400 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     blue: "bg-[#0AC4E0] border-[#0A8B9F] hover:bg-[#0A8B9F] hover:border-[#0A6B7F] text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     purple: "bg-purple-500 border-purple-600 hover:bg-purple-600 hover:border-purple-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     gray: "bg-gray-600 border-gray-700 hover:bg-gray-700 hover:border-gray-800 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//     orange: "bg-orange-400 border-orange-500 hover:bg-orange-500 hover:border-orange-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3",
//   };

//   // Get direction availability class
//   const getDirectionClass = (available) => {
//     if (available) {
//       return "bg-green-100 border-[#0AC4E0] hover:bg-green-200 text-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3";
//   };

//   // Get mode active class
//   const getModeActiveClass = (active) => {
//     if (active) {
//       return "bg-purple-100 border-[#0AC4E0] hover:bg-purple-200 text-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3";
//   };

//   // Light theme background classes
//   const bgClass = "bg-gray-100";
//   const textClass = "text-gray-800";
//   const cardBgClass = "bg-white";
//   const cardBorderClass = "border-gray-300";
//   const statusCardBg = "bg-white";
//   const statusCardText = "text-gray-600";
//   const statusValueText = (condition, darkColor, lightColor) => 
//     condition ? lightColor : "text-gray-500";
  
//   const systemStatusBg = (value, isBTS = false) => {
//     if (isBTS) {
//       return value
//         ? "bg-red-100 border-red-300"
//         : "bg-green-100 border-green-300";
//     }
//     return value
//       ? "bg-green-100 border-green-300"
//       : "bg-gray-100 border-gray-300";
//   };
  
//   const systemStatusText = (value, isBTS = false) => {
//     if (isBTS) {
//       return value
//         ? "text-red-600"
//         : "text-green-600";
//     }
//     return value
//       ? "text-green-600"
//       : "text-gray-600";
//   };
  
//   const modeStatusBg = (value) =>
//     value
//       ? "bg-purple-100 border-purple-300"
//       : "bg-gray-100 border-gray-300";
  
//   const modeStatusText = (value) =>
//     value
//       ? "text-purple-600"
//       : "text-gray-600";
  
//   const logBgClass = (type) => {
//     switch(type) {
//       case "ERROR": return "bg-red-50 border-red-200";
//       case "SUCCESS": return "bg-green-50 border-green-200";
//       case "CMD": return "bg-blue-50 border-blue-200";
//       case "DIRECTION": return "bg-orange-50 border-orange-200";
//       case "BREAKER": return "bg-yellow-50 border-yellow-200";
//       case "MODE_CHANGE": return "bg-purple-50 border-purple-200";
//       case "STATUS_CHANGE": return "bg-indigo-50 border-indigo-200";
//       case "CONNECTION": return "bg-gray-50 border-gray-200";
//       case "AUTH_ERROR": return "bg-red-50 border-red-200";
//       case "CONFIRMATION": return "bg-blue-50 border-blue-200";
//       default: return "bg-white border-gray-200";
//     }
//   };
  
//   const logTextClass = (type) => {
//     switch(type) {
//       case "ERROR": return "text-red-600";
//       case "SUCCESS": return "text-green-600";
//       case "CMD": return "text-blue-600";
//       case "DIRECTION": return "text-orange-600";
//       case "BREAKER": return "text-yellow-600";
//       case "MODE_CHANGE": return "text-purple-600";
//       case "STATUS_CHANGE": return "text-indigo-600";
//       case "CONNECTION": return "text-gray-600";
//       case "AUTH_ERROR": return "text-red-600 font-bold";
//       case "CONFIRMATION": return "text-blue-600";
//       default: return "text-gray-700";
//     }
//   };

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-2 sm:p-3 md:p-4`}>
//       {/* Header */}
//       <div className="mb-3 sm:mb-4">
//         <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-0 mb-3">
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             <div
//               className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${sseStatus === "CONNECTED" ? "bg-green-500 animate-pulse" : sseStatus === "RECONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`}
//             ></div>
//             <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-wide text-gray-800 truncate">
//               RELAY CONTROL PANEL
//             </h1>
//             {/* Auth Status Indicator */}
//             {!isAuthenticated() && (
//               <div className="flex items-center space-x-1 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[10px] sm:text-xs border border-red-300">
//                 <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
//                 <span>UNAUTHENTICATED</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Status Indicators - Responsive grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
//           <div
//             className={`${statusCardBg} p-2 sm:p-3 overflow-hidden rounded border ${cardBorderClass}`}
//           >
//             <div className={`text-[10px] sm:text-xs ${statusCardText} truncate`}>ACTIVE COMMAND</div>
//             <div
//               className={`text-xs sm:text-sm font-bold truncate ${activeCommand ? "text-[#0AC4E0]" : "text-gray-600"}`}
//             >
//               {activeCommand || "IDLE"}
//             </div>
//           </div>
//           <div
//             className={`${statusCardBg} p-2 sm:p-3 rounded border ${cardBorderClass}`}
//           >
//             <div className={`text-[10px] sm:text-xs ${statusCardText} truncate`}>ACTIVE MODE</div>
//             <div
//               className={`text-xs sm:text-sm font-bold truncate ${getActiveMode() !== "No Mode Selected" ? "text-purple-600" : "text-gray-600"}`}
//             >
//               {getActiveMode().length > 15 ? `${getActiveMode().substring(0, 12)}...` : getActiveMode()}
//             </div>
//           </div>
//           <div
//             className={`${statusCardBg} p-2 sm:p-3 rounded border ${cardBorderClass}`}
//           >
//             <div className={`text-[10px] sm:text-xs ${statusCardText} truncate`}>ANALOG</div>
//             <div
//               className={`text-xs sm:text-sm font-bold ${getBTSReadyStatus() ? "text-green-600" : "text-red-600"}`}
//             >
//               {getBTSReadyStatus() ? "CONNECTED" : "NOT CONNECTED"}
//             </div>
//           </div>
//           <div
//             className={`${statusCardBg} p-2 sm:p-3 rounded border ${cardBorderClass}`}
//           >
//             <div className={`text-[10px] sm:text-xs ${statusCardText} truncate`}>ONLINE STATUS</div>
//             <div
//               className={`text-xs sm:text-sm font-bold ${loading ? "text-yellow-600" : isAuthenticated() ? "text-green-600" : "text-red-600"}`}
//             >
//               {loading ? "BUSY" : isAuthenticated() ? "READY" : "NO AUTH"}
//             </div>
//           </div>
//         </div>

//         {/* Auth Error Message */}
//         {authError && (
//           <div className="mb-3 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-600 animate-fade-in">
//             <div className="flex items-center">
//               <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//               </svg>
//               <span>Authentication failed. Please log in again.</span>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
//         {/* LEFT: CONTROL PANELS */}
//         <div className="space-y-3 sm:space-y-4">
//           {actions.map((section, idx) => (
//             <div
//               key={idx}
//               className={`${cardBgClass} p-3 sm:p-4 rounded-lg border ${cardBorderClass}`}
//             >
//               <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//                 <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700 truncate">
//                   {section.title}
//                 </h3>
//                 <div className="text-[10px] sm:text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
//                   {section.buttons.length} CMDs
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-2">
//                 {section.buttons.map((btn, i) => {
//                   const isBreaker = btn.type === "breaker";
//                   const isDirection = btn.type === "direction";
//                   const disabled = loading || !isAuthenticated();
//                   const isActive = activeCommand === btn.label;
//                   const directionAvailable = isDirection
//                     ? getDirectionAvailability(btn.directionTag)
//                     : false;
//                   const modeActive =
//                     section.title === "Remote Mode"
//                       ? getModeActiveStatus(btn.modeTag)
//                       : false;

//                   return (
//                     <div key={i} className="relative">
//                       <button
//                         disabled={disabled}
//                         onClick={() =>
//                           callApi(btn.label, btn.endpoint, btn.type)
//                         }
//                         className={`relative w-full rounded border font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                           isDirection 
//                             ? getDirectionClass(directionAvailable) 
//                             : section.title === "Remote Mode" 
//                               ? getModeActiveClass(modeActive) 
//                               : colorClasses[btn.color]
//                         } ${isActive ? "ring-2 ring-offset-2 ring-offset-white ring-[#0AC4E0]" : ""} ${!isAuthenticated() ? "opacity-50" : ""}`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span className="truncate pr-1">{btn.label}</span>

//                           {/* Visual indicators */}
//                           {isDirection && (
//                             <div className="flex items-center space-x-1 flex-shrink-0">
//                               <div
//                                 className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${directionAvailable ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
//                               ></div>
//                             </div>
//                           )}

//                           {section.title === "Remote Mode" && (
//                             <div className="flex items-center space-x-1 flex-shrink-0">
//                               <div
//                                 className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${modeActive ? "bg-purple-500 animate-pulse" : "bg-gray-400"}`}
//                               ></div>
//                             </div>
//                           )}
//                         </div>

//                         {isActive && (
//                           <div className="absolute -top-1 -right-1">
//                             <div className="animate-ping absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#0AC4E0]"></div>
//                             <div className="relative w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0AC4E0]"></div>
//                           </div>
//                         )}
//                       </button>

//                       {/* Status indicator */}
//                       {(isDirection || section.title === "Remote Mode") && (
//                         <div className="absolute -top-1 -right-1">
//                           {isDirection && directionAvailable && (
//                             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
//                           )}
//                           {section.title === "Remote Mode" && modeActive && (
//                             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 animate-pulse shadow-lg shadow-purple-500/50"></div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* RIGHT: MONITORING */}
//         <div className="space-y-3 sm:space-y-4">
//           {/* System Status */}
//           <div
//             className={`${cardBgClass} p-3 sm:p-4 rounded-lg border ${cardBorderClass}`}
//           >
//             <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//               <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700">
//                 SYSTEM STATUS
//               </h2>
//               <div className="flex items-center space-x-2">
//                 <div className="text-[10px] sm:text-xs text-gray-600">
//                   LIVE FEED
//                 </div>
//                 <div
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${sseStatus === "CONNECTED" ? "bg-green-500 animate-pulse" : sseStatus === "RECONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`}
//                 ></div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//               {biData.map((item, index) => (
//                 <div
//                   key={item.tag || index}
//                   className={`p-2 sm:p-3 rounded border flex items-center justify-between ${systemStatusBg(item.value, item.tag === "btsNotReadyStatus")}`}
//                 >
//                   <div className="flex-1 min-w-0">
//                     <div className="text-[10px] sm:text-xs font-medium truncate text-gray-700">
//                       {getDirectionDescription(item.tag)}
//                     </div>
//                     <div className="text-[8px] sm:text-[10px] font-mono truncate text-gray-600">
//                       {item.tag === "btsNotReadyStatus"
//                         ? "BTS STATUS"
//                         : "DIRECTION STATUS"}
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
//                     <div
//                       className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
//                         item.tag === "btsNotReadyStatus"
//                           ? item.value
//                             ? "bg-red-500 animate-pulse"
//                             : "bg-green-500 animate-pulse"
//                           : item.value
//                             ? "bg-green-500 animate-pulse"
//                             : "bg-red-500"
//                       }`}
//                     ></div>
//                     <div
//                       className={`text-[10px] sm:text-sm font-bold font-mono ${systemStatusText(item.value, item.tag === "btsNotReadyStatus")}`}
//                     >
//                       {item.tag === "btsNotReadyStatus"
//                         ? item.value
//                           ? "NOT READY"
//                           : "READY"
//                         : item.value
//                           ? "AVAILABLE"
//                           : "UNAVAILABLE"}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {biData.length === 0 && (
//               <div className="text-center py-3 sm:py-4 text-[10px] sm:text-sm text-gray-600">
//                 <div className="flex items-center justify-center space-x-2">
//                   <div
//                     className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${sseStatus === "CONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`}
//                   ></div>
//                   <span>
//                     {sseStatus === "CONNECTING"
//                       ? "Connecting to data stream..."
//                       : sseStatus === "RECONNECTING"
//                         ? "Reconnecting..."
//                         : "No data received"}
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Event Log */}
//           <div
//             className={`bg-gray-50 p-3 sm:p-4 rounded-lg border ${cardBorderClass} flex-1`}
//           >
//             <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//               <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700">
//                 EVENT LOG
//               </h2>
//               <div className="flex items-center space-x-2">
//                 <div className="text-[10px] sm:text-xs text-gray-600">
//                   IMPORTANT EVENTS
//                 </div>
//                 <button
//                   onClick={clearLogs}
//                   className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-200 hover:bg-gray-300 rounded border border-gray-300"
//                 >
//                   Clear
//                 </button>
//               </div>
//             </div>

//             <div className="h-48 sm:h-56 md:h-64 overflow-y-auto font-mono text-[10px] sm:text-xs">
//               {logs.length === 0 ? (
//                 <div className="text-center py-6 sm:py-8 text-gray-500">
//                   <div className="mb-1 sm:mb-2">No important events recorded</div>
//                   <div className="text-[8px] sm:text-xs">
//                     Events will appear when commands are executed or system
//                     status changes
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-1 pr-1 sm:pr-2">
//                   {logs.map((log, i) => (
//                     <div
//                       key={i}
//                       className={`p-1.5 sm:p-2 rounded border ${logBgClass(log.type)}`}
//                     >
//                       <div className="flex flex-col xs:flex-row xs:items-start gap-1 xs:gap-0">
//                         <div className="w-full xs:w-16 flex-shrink-0 text-[8px] sm:text-[10px] text-gray-600">
//                           [{log.timestamp}]
//                         </div>
//                         <div
//                           className={`text-[9px] sm:text-[11px] font-medium ${logTextClass(log.type)} break-words`}
//                         >
//                           {log.msg}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Log Legend */}
//             <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-300">
//               <div className="flex flex-wrap gap-2 sm:gap-3 text-[8px] sm:text-[10px]">
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0AC4E0]"></div>
//                   <span className="text-gray-600">CMD</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500"></div>
//                   <span className="text-gray-600">DIR</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500"></div>
//                   <span className="text-gray-600">BRKR</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
//                   <span className="text-gray-600">SUC</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"></div>
//                   <span className="text-gray-600">ERR</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></div>
//                   <span className="text-gray-600">MODE</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-500"></div>
//                   <span className="text-gray-600">STAT</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"></div>
//                   <span className="text-gray-600 font-bold">AUTH</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500"></div>
//                   <span className="text-gray-600">CONF</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-300">
//         <div className="flex flex-col xs:flex-row justify-between items-center gap-2 xs:gap-0 text-[8px] sm:text-xs text-gray-600">
//           <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-1 xs:mb-0">
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
//               <span className="whitespace-nowrap">AVAILABLE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"></div>
//               <span className="whitespace-nowrap">UNAVAILABLE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></div>
//               <span className="whitespace-nowrap">ACTIVE MODE</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500 animate-pulse"></div>
//               <span className="whitespace-nowrap">RECONNECT</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse"></div>
//               <span className="whitespace-nowrap">AUTH ERROR</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex flex-wrap justify-center xs:justify-end gap-1">
//               <span>STATUS: {loading ? "EXEC" : isAuthenticated() ? "STDBY" : "NO AUTH"}</span>
//               <span className="hidden xs:inline">•</span>
//               <span>BI: {sseStatus === "CONNECTED" ? "CONN" : sseStatus}</span>
//               <span className="hidden xs:inline">•</span>
//               <span>MODE: {modeSseStatus === "CONNECTED" ? "CONN" : modeSseStatus}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog */}
//       {confirmDialog.isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
//           <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-300 overflow-hidden">
//             {/* Dialog Header */}
//             <div className="bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] p-4">
//               <h3 className="text-white font-bold text-lg flex items-center">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//                 Confirm Command
//               </h3>
//             </div>
            
//             {/* Dialog Body */}
//             <div className="p-6">
//               <p className="text-gray-700 mb-2">
//                 Are you sure you want to execute:
//               </p>
//               <p className="text-lg font-bold text-[#0AC4E0] mb-4">
//                 {confirmDialog.command}
//               </p>
//               <p className="text-sm text-gray-500 mb-6">
//                 This action will send a command to the industrial control system. Please verify before proceeding.
//               </p>
              
//               {/* Dialog Actions */}
//               <div className="flex flex-col sm:flex-row gap-3 justify-end">
//                 <button
//                   onClick={handleCancel}
//                   className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-all duration-200 order-2 sm:order-1"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirm}
//                   className="px-4 py-2 bg-[#0AC4E0] hover:bg-[#0A8B9F] text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg order-1 sm:order-2"
//                 >
//                   Confirm & Execute
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










// import { useEffect, useState, useRef } from "react";

// const API_BASE = "https://mqtt-testing-2.onrender.com";

// /* ---------------- DATA STRUCTURES ---------------- */
// const actions = [
//   {
//     title: "BTS Service Selection",
//     buttons: [
//       {
//         label: "BTS IN",
//         endpoint: "/api/v1/bts/in",
//         color: "green",
//         type: "immediate",
//       },
//       {
//         label: "BTS OUT",
//         endpoint: "/api/v1/bts/out",
//         color: "red",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "BTS Reset",
//     buttons: [
//       {
//         label: "BTS RESET",
//         endpoint: "/api/v1/reset-bts",
//         color: "yellow",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Test Mode Selection",
//     buttons: [
//       {
//         label: "Test Mode IN",
//         endpoint: "/api/v1/remote-test/in",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Test Mode OUT",
//         endpoint: "/api/v1/remote-test/out",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Test Transfer",
//         endpoint: "/api/v1/remote-test/transfer",
//         color: "purple",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Direction Selection",
//     buttons: [
//       {
//         label: "BusA to Src1",
//         endpoint: "/api/v1/bus1/source1",
//         color: "gray",
//         directionTag: "b1_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA to Src2",
//         endpoint: "/api/v1/bus1/source2",
//         color: "gray",
//         directionTag: "b1_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src1",
//         endpoint: "/api/v1/bus2/source1",
//         color: "gray",
//         directionTag: "b2_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src2",
//         endpoint: "/api/v1/bus2/source2",
//         color: "gray",
//         directionTag: "b2_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src1",
//         endpoint: "/api/v1/bus12/source1",
//         color: "gray",
//         directionTag: "b1_2_to_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src2",
//         endpoint: "/api/v1/bus12/source2",
//         color: "gray",
//         directionTag: "b1_2_to_s2_available",
//         type: "direction",
//       },
//     ],
//   },
//   {
//     title: "Mode Selection",
//     buttons: [
//       {
//         label: "FAST",
//         endpoint: "/api/v1/mode/fast",
//         color: "blue",
//         modeTag: "fastModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-SLOW",
//         endpoint: "/api/v1/mode/fasl",
//         color: "blue",
//         modeTag: "fastSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-INPHASE-SLOW",
//         endpoint: "/api/v1/mode/fainsl",
//         color: "blue",
//         modeTag: "fastInPhaseSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "PARALLEL",
//         endpoint: "/api/v1/mode/parallel",
//         color: "blue",
//         modeTag: "parallelModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "SLOW",
//         endpoint: "/api/v1/mode/slow",
//         color: "blue",
//         modeTag: "slowModeSelected",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Live Transfer",
//     buttons: [
//       {
//         label: "Operate Breaker",
//         endpoint: "/api/v1/breaker/operate",
//         color: "orange",
//         type: "breaker",
//       },
//     ],
//   },
// ];

// export default function IntegratedDashboard() {
//   const [loading, setLoading] = useState(false);
//   const [logs, setLogs] = useState([]);
//   const [biData, setBiData] = useState([]);
//   const [modeData, setModeData] = useState([]);
//   const [sseStatus, setSseStatus] = useState("CONNECTING");
//   const [modeSseStatus, setModeSseStatus] = useState("CONNECTING");
//   const [activeCommand, setActiveCommand] = useState(null);
//   const [authError, setAuthError] = useState(false);
  
//   // Binary I/O States
//   const [biSignals, setBiSignals] = useState([]);
//   const [boSignals, setBoSignals] = useState([]);
//   const [binaryConnected, setBinaryConnected] = useState(false);
  
//   // Analog States
//   const [analogConnected, setAnalogConnected] = useState(false);
//   const [analogSignals, setAnalogSignals] = useState([]);
  
//   // Confirmation dialog state
//   const [confirmDialog, setConfirmDialog] = useState({
//     isOpen: false,
//     command: null,
//     endpoint: null,
//     buttonType: null,
//     label: null
//   });

//   const biDataRef = useRef([]);
//   const modeDataRef = useRef([]);
//   const evtSourceRef = useRef(null);
//   const modeEvtSourceRef = useRef(null);
//   const biBoSourceRef = useRef(null);
//   const analogSourceRef = useRef(null);
//   const reconnectTimeoutRef = useRef(null);
//   const modeReconnectTimeoutRef = useRef(null);
//   const binaryReconnectTimeoutRef = useRef(null);
//   const analogReconnectTimeoutRef = useRef(null);

//   // Track previous states to detect changes
//   const prevBiDataRef = useRef([]);
//   const prevModeDataRef = useRef([]);

//   // Helper function to get auth token
//   const getAuthToken = () => {
//     return localStorage.getItem("token") || sessionStorage.getItem("token");
//   };

//   // Helper function to check if user is authenticated
//   const isAuthenticated = () => {
//     return !!getAuthToken();
//   };

//   // Helper function to create headers with auth token
//   const getAuthHeaders = () => {
//     const token = getAuthToken();
//     return {
//       "Content-Type": "application/json",
//       ...(token ? { "Authorization": `Bearer ${token}` } : {})
//     };
//   };

//   /* ---------------- LOGGING ---------------- */
//   const addLog = (msg, type = "INFO") => {
//     const allowedTypes = [
//       "CMD",
//       "DIRECTION",
//       "BREAKER",
//       "SUCCESS",
//       "ERROR",
//       "MODE_CHANGE",
//       "STATUS_CHANGE",
//       "CONNECTION",
//       "AUTH_ERROR",
//       "CONFIRMATION",
//     ];

//     if (!allowedTypes.includes(type)) {
//       return;
//     }

//     const timestamp = new Date().toLocaleTimeString();
//     setLogs((prev) => [{ timestamp, msg, type }, ...prev].slice(0, 50));
//   };

//   /* ---------------- CONFIRMATION DIALOG ---------------- */
//   const openConfirmDialog = (label, endpoint, buttonType) => {
//     setConfirmDialog({
//       isOpen: true,
//       command: label,
//       endpoint: endpoint,
//       buttonType: buttonType,
//       label: label
//     });
//   };

//   const closeConfirmDialog = () => {
//     setConfirmDialog({
//       isOpen: false,
//       command: null,
//       endpoint: null,
//       buttonType: null,
//       label: null
//     });
//   };

//   const handleConfirm = () => {
//     const { label, endpoint, buttonType } = confirmDialog;
//     addLog(`Command confirmed: ${label}`, "CONFIRMATION");
//     closeConfirmDialog();
//     executeCommand(label, endpoint, buttonType);
//   };

//   const handleCancel = () => {
//     if (confirmDialog.label) {
//       addLog(`Command cancelled: ${confirmDialog.label}`, "CONFIRMATION");
//     }
//     closeConfirmDialog();
//   };

//   /* ---------------- CONTROL CALL (INDEPENDENT OPERATIONS) ---------------- */
//   const executeCommand = async (label, endpoint, buttonType = "immediate") => {
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }

//     try {
//       setLoading(true);
//       setActiveCommand(label);
//       addLog(`${label}`, "CMD");

//       const headers = getAuthHeaders();

//       if (buttonType === "direction") {
//         addLog(`Setting direction: ${label}`, "DIRECTION");
        
//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Direction setup failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Direction set: ${label}`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       if (buttonType === "breaker") {
//         addLog(`Operating breaker`, "BREAKER");

//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Breaker operation failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Breaker operation completed`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: headers,
//       });

//       if (res.status === 401 || res.status === 403) {
//         throw new Error("Authentication failed. Please log in again.");
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Operation failed");

//       addLog(`${label} successful`, "SUCCESS");
//     } catch (err) {
//       addLog(`${label} failed: ${err.message}`, "ERROR");
//       if (err.message.includes("Authentication failed")) {
//         setAuthError(true);
//         setTimeout(() => setAuthError(false), 3000);
//       }
//     } finally {
//       setLoading(false);
//       setTimeout(() => setActiveCommand(null), 1000);
//     }
//   };

//   const callApi = (label, endpoint, buttonType = "immediate") => {
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }
//     openConfirmDialog(label, endpoint, buttonType);
//   };

//   /* ---------------- SSE LIVE DATA ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectSSE = () => {
//       try {
//         if (evtSourceRef.current) {
//           evtSourceRef.current.close();
//           evtSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         const url = token 
//           ? `${API_BASE}/api/v1/stream/bi-available?token=${token}`
//           : `${API_BASE}/api/v1/stream/bi-available`;

//         evtSourceRef.current = new EventSource(url);

//         evtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setSseStatus("CONNECTED");
//         };

//         evtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             if (parsed.bi && Array.isArray(parsed.bi)) {
//               const transformedData = parsed.bi.map((item) => ({
//                 tag: item.tag,
//                 value: item.value,
//                 description: getDirectionDescription(item.tag),
//               }));

//               if (prevBiDataRef.current.length > 0) {
//                 const changedItems = [];
//                 transformedData.forEach((item, index) => {
//                   if (index < prevBiDataRef.current.length) {
//                     const prevItem = prevBiDataRef.current[index];
//                     if (prevItem && prevItem.value !== item.value) {
//                       changedItems.push(item);
//                     }
//                   }
//                 });

//                 if (changedItems.length > 0) {
//                   changedItems.forEach((item) => {
//                     const statusText =
//                       item.tag === "btsNotReadyStatus"
//                         ? item.value
//                           ? "NOT READY"
//                           : "READY"
//                         : item.value
//                           ? "AVAILABLE"
//                           : "UNAVAILABLE";
//                     addLog(
//                       `${getDirectionDescription(item.tag)}: ${statusText}`,
//                       "STATUS_CHANGE",
//                     );
//                   });
//                 }
//               }

//               biDataRef.current = transformedData;
//               setBiData(transformedData);
//               prevBiDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("SSE parse error:", err);
//           }
//         };

//         evtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setSseStatus("DISCONNECTED");

//           if (evtSourceRef.current) {
//             evtSourceRef.current.close();
//             evtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(reconnectTimeoutRef.current);
//             reconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setSseStatus("RECONNECTING");
//                 connectSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("SSE connection error:", err);
//         if (isMounted) {
//           setSseStatus("ERROR");

//           clearTimeout(reconnectTimeoutRef.current);
//           reconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setSseStatus("RECONNECTING");
//               connectSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectSSE();

//     return () => {
//       isMounted = false;

//       if (evtSourceRef.current) {
//         evtSourceRef.current.close();
//         evtSourceRef.current = null;
//       }

//       if (reconnectTimeoutRef.current) {
//         clearTimeout(reconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- MODE SELECTION SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectModeSSE = () => {
//       try {
//         if (modeEvtSourceRef.current) {
//           modeEvtSourceRef.current.close();
//           modeEvtSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         const url = token
//           ? `${API_BASE}/api/v1/stream/mode-selected?token=${token}`
//           : `${API_BASE}/api/v1/stream/mode-selected`;

//         modeEvtSourceRef.current = new EventSource(url);

//         modeEvtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setModeSseStatus("CONNECTED");
//         };

//         modeEvtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             let modeArray = [];

//             if (parsed.bo && Array.isArray(parsed.bo)) {
//               modeArray = parsed.bo;
//             } else if (parsed.data && Array.isArray(parsed.data)) {
//               modeArray = parsed.data;
//             } else if (Array.isArray(parsed)) {
//               modeArray = parsed;
//             }

//             if (modeArray.length > 0) {
//               const transformedData = modeArray.map((item) => ({
//                 tag: item.tag || item.name || item.address,
//                 value: item.value,
//                 address: item.address || item.tag || "N/A",
//                 description: getModeDescription(
//                   item.tag || item.name || item.address,
//                 ),
//               }));

//               if (prevModeDataRef.current.length > 0) {
//                 const prevActiveMode = prevModeDataRef.current.find(
//                   (item) => item.value === true,
//                 );
//                 const currentActiveMode = transformedData.find(
//                   (item) => item.value === true,
//                 );

//                 if (
//                   prevActiveMode &&
//                   currentActiveMode &&
//                   prevActiveMode.tag !== currentActiveMode.tag
//                 ) {
//                   addLog(
//                     `Mode changed from ${prevActiveMode.description} to ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (!prevActiveMode && currentActiveMode) {
//                   addLog(
//                     `Mode selected: ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (prevActiveMode && !currentActiveMode) {
//                   addLog(
//                     `Mode deselected: ${prevActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 }
//               }

//               modeDataRef.current = transformedData;
//               setModeData(transformedData);
//               prevModeDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("Mode SSE parse error:", err);
//           }
//         };

//         modeEvtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setModeSseStatus("DISCONNECTED");

//           if (modeEvtSourceRef.current) {
//             modeEvtSourceRef.current.close();
//             modeEvtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(modeReconnectTimeoutRef.current);
//             modeReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setModeSseStatus("RECONNECTING");
//                 connectModeSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("Mode SSE connection error:", err);
//         if (isMounted) {
//           setModeSseStatus("ERROR");

//           clearTimeout(modeReconnectTimeoutRef.current);
//           modeReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setModeSseStatus("RECONNECTING");
//               connectModeSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectModeSSE();

//     return () => {
//       isMounted = false;

//       if (modeEvtSourceRef.current) {
//         modeEvtSourceRef.current.close();
//         modeEvtSourceRef.current = null;
//       }

//       if (modeReconnectTimeoutRef.current) {
//         clearTimeout(modeReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- BINARY I/O SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectBinarySSE = () => {
//       try {
//         if (biBoSourceRef.current) {
//           biBoSourceRef.current.close();
//           biBoSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           setBinaryConnected(false);
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/bi-bo?token=${token}`;
//         biBoSourceRef.current = new EventSource(url);

//         biBoSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setBinaryConnected(true);
//         };

//         biBoSourceRef.current.onerror = () => {
//           if (!isMounted) return;
//           setBinaryConnected(false);
          
//           if (biBoSourceRef.current && biBoSourceRef.current.readyState === EventSource.CLOSED) {
//             setAuthError(true);
//           }
          
//           if (isMounted) {
//             clearTimeout(binaryReconnectTimeoutRef.current);
//             binaryReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 connectBinarySSE();
//               }
//             }, 3000);
//           }
//         };

//         biBoSourceRef.current.onmessage = (e) => {
//           try {
//             const data = JSON.parse(e.data);
            
//             if (data.bi && Array.isArray(data.bi)) {
//               setBiSignals(data.bi);
//             }
            
//             if (data.bo && Array.isArray(data.bo)) {
//               setBoSignals(data.bo);
//             }
//           } catch (err) {
//             console.error("Binary SSE parse error:", err);
//           }
//         };
//       } catch (err) {
//         console.error("Binary SSE connection error:", err);
//         if (isMounted) {
//           setBinaryConnected(false);
          
//           clearTimeout(binaryReconnectTimeoutRef.current);
//           binaryReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectBinarySSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectBinarySSE();
//     }

//     return () => {
//       isMounted = false;
//       if (biBoSourceRef.current) {
//         biBoSourceRef.current.close();
//         biBoSourceRef.current = null;
//       }
//       if (binaryReconnectTimeoutRef.current) {
//         clearTimeout(binaryReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- ANALOG SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectAnalogSSE = () => {
//       try {
//         if (analogSourceRef.current) {
//           analogSourceRef.current.close();
//           analogSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           setAnalogConnected(false);
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/analog?token=${token}`;
//         analogSourceRef.current = new EventSource(url);

//         analogSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setAnalogConnected(true);
//         };

//         analogSourceRef.current.onerror = () => {
//           if (!isMounted) return;
//           setAnalogConnected(false);
          
//           if (isMounted) {
//             clearTimeout(analogReconnectTimeoutRef.current);
//             analogReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 connectAnalogSSE();
//               }
//             }, 3000);
//           }
//         };

//         analogSourceRef.current.onmessage = (e) => {
//           try {
//             const data = JSON.parse(e.data);
            
//             if (data.analog && Array.isArray(data.analog)) {
//               setAnalogSignals(data.analog);
//             }
//           } catch (err) {
//             console.error("Analog SSE parse error:", err);
//           }
//         };
//       } catch (err) {
//         console.error("Analog SSE connection error:", err);
//         if (isMounted) {
//           setAnalogConnected(false);
          
//           clearTimeout(analogReconnectTimeoutRef.current);
//           analogReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectAnalogSSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectAnalogSSE();
//     }

//     return () => {
//       isMounted = false;
//       if (analogSourceRef.current) {
//         analogSourceRef.current.close();
//         analogSourceRef.current = null;
//       }
//       if (analogReconnectTimeoutRef.current) {
//         clearTimeout(analogReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- HELPER FUNCTIONS ---------------- */
//   const getModeDescription = (tag) => {
//     const descriptions = {
//       fastModeSelected: "Fast Mode",
//       fastSlowModeSelected: "Fast-Slow Mode",
//       fastInPhaseSlowModeSelected: "Fast In-Phase Slow Mode",
//       parallelModeSelected: "Parallel Mode",
//       slowModeSelected: "Slow Mode",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getDirectionDescription = (tag) => {
//     const descriptions = {
//       b1_s1_available: "BusA to Src1",
//       b1_s2_available: "BusA to Src2",
//       b2_s1_available: "BusB to Src1",
//       b2_s2_available: "BusB to Src2",
//       b1_2_to_s1_available: "BusA&B to Src1",
//       b1_2_to_s2_available: "BusA&B to Src2",
//       btsNotReadyStatus: "BTS Ready Status",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getActiveMode = () => {
//     const activeMode = modeData.find((item) => item.value === true);
//     return activeMode ? activeMode.description : "No Mode Selected";
//   };

//   const getBTSReadyStatus = () => {
//     const btsNotReady = biData.find((item) => item.tag === "btsNotReadyStatus");
//     return btsNotReady ? !btsNotReady.value : false;
//   };

//   const getDirectionAvailability = (directionTag) => {
//     if (!directionTag) return false;
//     const direction = biData.find((item) => item.tag === directionTag);
//     return direction ? direction.value : false;
//   };

//   const getModeActiveStatus = (modeTag) => {
//     if (!modeTag) return false;
//     const mode = modeData.find((item) => item.tag === modeTag);
//     return mode ? mode.value : false;
//   };

//   const clearLogs = () => {
//     setLogs([]);
//   };

//   // Binary I/O Helper functions
//   const formatName = (tag) => {
//     if (!tag) return 'Untagged';
//     return tag
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, l => l.toUpperCase());
//   };

//   const getSignalAddress = (signal) => {
//     return signal.address || 'N/A';
//   };

//   // Light theme color classes
//   const colorClasses = {
//     green: "bg-green-500 border-green-600 hover:bg-green-600 hover:border-green-700 text-white text-xs px-2 py-1.5",
//     red: "bg-red-500 border-red-600 hover:bg-red-600 hover:border-red-700 text-white text-xs px-2 py-1.5",
//     yellow: "bg-yellow-400 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 text-white text-xs px-2 py-1.5",
//     blue: "bg-[#0AC4E0] border-[#0A8B9F] hover:bg-[#0A8B9F] hover:border-[#0A6B7F] text-white text-xs px-2 py-1.5",
//     purple: "bg-purple-500 border-purple-600 hover:bg-purple-600 hover:border-purple-700 text-white text-xs px-2 py-1.5",
//     gray: "bg-gray-600 border-gray-700 hover:bg-gray-700 hover:border-gray-800 text-white text-xs px-2 py-1.5",
//     orange: "bg-orange-400 border-orange-500 hover:bg-orange-500 hover:border-orange-600 text-white text-xs px-2 py-1.5",
//   };

//   const getDirectionClass = (available) => {
//     if (available) {
//       return "bg-green-100 border-[#0AC4E0] hover:bg-green-200 text-gray-800 text-xs px-2 py-1.5";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
//   };

//   const getModeActiveClass = (active) => {
//     if (active) {
//       return "bg-purple-100 border-[#0AC4E0] hover:bg-purple-200 text-gray-800 text-xs px-2 py-1.5";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
//   };

//   const bgClass = "bg-gray-100";
//   const textClass = "text-gray-800";
//   const cardBgClass = "bg-white";
//   const cardBorderClass = "border-gray-300";

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-2`}>
//       {/* Header with Auth Status */}
//       <div className="mb-2 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <div className={`w-2 h-2 rounded-full ${isAuthenticated() ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//           <h1 className="text-sm font-bold">INDUSTRIAL CONTROL DASHBOARD</h1>
//         </div>
//         {!isAuthenticated() && (
//           <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded border border-red-300">
//             UNAUTHENTICATED
//           </div>
//         )}
//       </div>

//       {/* Auth Error Message */}
//       {authError && (
//         <div className="mb-2 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-600">
//           <div className="flex items-center">
//             <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             <span>Authentication failed. Please log in again.</span>
//           </div>
//         </div>
//       )}

//       {/* Four Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
//         {/* COLUMN 1: ANALOG SIGNALS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">ANALOG SIGNALS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${analogConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{analogConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : analogSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No analog data
//               </div>
//             ) : (
//               <div className="space-y-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {analogSignals.map((signal, idx) => (
//                   <div 
//                     key={idx}
//                     className="p-1.5 bg-gray-50 rounded border border-gray-200 hover:border-[#0AC4E0] transition-all"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1 min-w-0">
//                         <div className="text-[10px] font-medium truncate">{signal.tag}</div>
//                         <div className="text-[7px] text-gray-500 font-mono truncate">{signal.address || 'N/A'}</div>
//                       </div>
//                       <div className="flex items-center space-x-1.5">
//                         <div className={`w-2 h-2 rounded-full ${signal.value !== null && signal.value > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                         <div className="text-xs font-bold font-mono text-[#0AC4E0]">
//                           {signal.value !== null ? signal.value.toFixed(2) : '--'}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 2: BINARY INPUTS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">BINARY INPUTS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : biSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No input signals
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {biSignals.map((signal) => (
//                   <div
//                     key={signal.address || signal.tag}
//                     className={`p-1.5 rounded border transition-all ${
//                       signal.value 
//                         ? 'bg-[#0AC4E0]/10 border-[#0AC4E0]' 
//                         : 'bg-gray-50 border-gray-200'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="text-[9px] font-medium truncate max-w-[70px]">
//                         {formatName(signal.tag)}
//                       </div>
//                       <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                     </div>
//                     <div className="flex items-center justify-between mt-0.5">
//                       <div className="text-[6px] text-gray-500 font-mono truncate">
//                         {getSignalAddress(signal)}
//                       </div>
//                       <div className={`text-[9px] font-bold ${signal.value ? 'text-[#0AC4E0]' : 'text-gray-500'}`}>
//                         {signal.value ? '1' : '0'}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 3: BINARY OUTPUTS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">BINARY OUTPUTS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : boSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No output signals
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {boSignals.map((signal) => (
//                   <div
//                     key={signal.address || signal.tag}
//                     className={`p-1.5 rounded border transition-all ${
//                       signal.value 
//                         ? 'bg-purple-100 border-purple-400' 
//                         : 'bg-gray-50 border-gray-200'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="text-[9px] font-medium truncate max-w-[70px]">
//                         {formatName(signal.tag)}
//                       </div>
//                       <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-purple-500' : 'bg-gray-400'}`}></div>
//                     </div>
//                     <div className="flex items-center justify-between mt-0.5">
//                       <div className="text-[6px] text-gray-500 font-mono truncate">
//                         {getSignalAddress(signal)}
//                       </div>
//                       <div className={`text-[9px] font-bold ${signal.value ? 'text-purple-600' : 'text-gray-500'}`}>
//                         {signal.value ? '1' : '0'}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 4: CONTROL PANEL (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">BTS CONTROL SYSTEM</h2>
//               <div className="flex items-center space-x-2">
//                 <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
//                 <span className="text-[9px] text-gray-600">{loading ? 'BUSY' : 'READY'}</span>
//               </div>
//             </div>

//             {/* Quick Status */}
//             <div className="grid grid-cols-2 gap-1 mb-2">
//               <div className="p-1 bg-gray-50 rounded border border-gray-200">
//                 <div className="text-[7px] text-gray-500">ACTIVE MODE</div>
//                 <div className="text-[9px] font-bold truncate">{getActiveMode()}</div>
//               </div>
//               <div className="p-1 bg-gray-50 rounded border border-gray-200">
//                 <div className="text-[7px] text-gray-500">ANALOG</div>
//                 <div className={`text-[9px] font-bold ${getBTSReadyStatus() ? 'text-green-600' : 'text-red-600'}`}>
//                   {getBTSReadyStatus() ? 'CONNECTED' : 'NOT CONNECTED'}
//                 </div>
//               </div>
//             </div>

//             {/* Control Buttons */}
//             <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
//               {actions.map((section, idx) => (
//                 <div key={idx}>
//                   <h3 className="text-[9px] font-bold mb-1 text-gray-600">{section.title}</h3>
//                   <div className="grid grid-cols-2 gap-1">
//                     {section.buttons.map((btn, i) => {
//                       const isDirection = btn.type === "direction";
//                       const directionAvailable = isDirection
//                         ? getDirectionAvailability(btn.directionTag)
//                         : false;
//                       const modeActive = section.title === "Mode Selection"
//                         ? getModeActiveStatus(btn.modeTag)
//                         : false;

//                       return (
//                         <button
//                           key={i}
//                           disabled={loading || !isAuthenticated()}
//                           onClick={() => callApi(btn.label, btn.endpoint, btn.type)}
//                           className={`relative w-full rounded border text-[8px] font-medium p-1 transition-all disabled:opacity-50 ${
//                             isDirection 
//                               ? getDirectionClass(directionAvailable)
//                               : section.title === "Mode Selection"
//                                 ? getModeActiveClass(modeActive)
//                                 : colorClasses[btn.color]
//                           }`}
//                         >
//                           <span className="truncate block">{btn.label}</span>
//                           {(isDirection || section.title === "Mode Selection") && (
//                             <div className="absolute -top-1 -right-1">
//                               <div className={`w-1.5 h-1.5 rounded-full ${
//                                 isDirection 
//                                   ? directionAvailable ? 'bg-green-500' : 'bg-gray-400'
//                                   : modeActive ? 'bg-purple-500' : 'bg-gray-400'
//                               }`}></div>
//                             </div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Event Log */}
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-1">
//               <h3 className="text-[9px] font-bold uppercase">EVENT LOG</h3>
//               <button
//                 onClick={clearLogs}
//                 className="text-[7px] px-1 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
//               >
//                 Clear
//               </button>
//             </div>
//             <div className="h-20 overflow-y-auto text-[7px] font-mono space-y-1">
//               {logs.length === 0 ? (
//                 <div className="text-center text-gray-500 py-2">No events</div>
//               ) : (
//                 logs.map((log, i) => (
//                   <div key={i} className="p-1 bg-gray-50 rounded border border-gray-200">
//                     <span className="text-gray-500">[{log.timestamp}]</span>{' '}
//                     <span className={log.type === 'ERROR' ? 'text-red-600' : 'text-gray-700'}>
//                       {log.msg}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-2 pt-2 border-t border-gray-300">
//         <div className="flex justify-between text-[7px] text-gray-600">
//           <div className="flex space-x-2">
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span> ACTIVE</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1"></span> INACTIVE</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-[#0AC4E0] rounded-full mr-1"></span> INPUT</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span> OUTPUT</span>
//           </div>
//           <div>
//             <span>ANALOG: {analogSignals.length} • </span>
//             <span>IN: {biSignals.length} • </span>
//             <span>OUT: {boSignals.length} • </span>
//             <span>CTRL: {loading ? 'EXEC' : 'STDBY'}</span>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog */}
//       {confirmDialog.isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full border border-gray-300">
//             <div className="bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] p-3 rounded-t-xl">
//               <h3 className="text-white font-bold text-sm">Confirm Command</h3>
//             </div>
//             <div className="p-4">
//               <p className="text-xs text-gray-700 mb-2">Execute: <span className="font-bold text-[#0AC4E0]">{confirmDialog.command}</span></p>
//               <p className="text-[9px] text-gray-500 mb-3">This will send a command to the control system.</p>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={handleCancel}
//                   className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirm}
//                   className="px-3 py-1 text-xs bg-[#0AC4E0] hover:bg-[#0A8B9F] text-white rounded"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// import { useEffect, useState, useRef } from "react";

// const API_BASE = "https://mqtt-testing-2.onrender.com";

// /* ---------------- DATA STRUCTURES ---------------- */
// const actions = [
//   {
//     title: "BTS Control",
//     buttons: [
//       {
//         label: "BTS IN",
//         endpoint: "/api/v1/bts/in",
//         color: "green",
//         type: "immediate",
//       },
//       {
//         label: "BTS OUT",
//         endpoint: "/api/v1/bts/out",
//         color: "red",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "BTS Reset",
//     buttons: [
//       {
//         label: "BTS RESET",
//         endpoint: "/api/v1/reset-bts",
//         color: "yellow",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Remote Test",
//     buttons: [
//       {
//         label: "Remote Test IN",
//         endpoint: "/api/v1/remote-test/in",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test OUT",
//         endpoint: "/api/v1/remote-test/out",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test Transfer",
//         endpoint: "/api/v1/remote-test/transfer",
//         color: "purple",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Bus to Source",
//     buttons: [
//       {
//         label: "BusA to Src1",
//         endpoint: "/api/v1/bus1/source1",
//         color: "gray",
//         directionTag: "b1_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA to Src2",
//         endpoint: "/api/v1/bus1/source2",
//         color: "gray",
//         directionTag: "b1_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src1",
//         endpoint: "/api/v1/bus2/source1",
//         color: "gray",
//         directionTag: "b2_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src2",
//         endpoint: "/api/v1/bus2/source2",
//         color: "gray",
//         directionTag: "b2_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src1",
//         endpoint: "/api/v1/bus12/source1",
//         color: "gray",
//         directionTag: "b1_2_to_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src2",
//         endpoint: "/api/v1/bus12/source2",
//         color: "gray",
//         directionTag: "b1_2_to_s2_available",
//         type: "direction",
//       },
//     ],
//   },
//   {
//     title: "Remote Mode",
//     buttons: [
//       {
//         label: "FAST",
//         endpoint: "/api/v1/mode/fast",
//         color: "blue",
//         modeTag: "fastModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-SLOW",
//         endpoint: "/api/v1/mode/fasl",
//         color: "blue",
//         modeTag: "fastSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-INPHASE-SLOW",
//         endpoint: "/api/v1/mode/fainsl",
//         color: "blue",
//         modeTag: "fastInPhaseSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "PARALLEL",
//         endpoint: "/api/v1/mode/parallel",
//         color: "blue",
//         modeTag: "parallelModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "SLOW",
//         endpoint: "/api/v1/mode/slow",
//         color: "blue",
//         modeTag: "slowModeSelected",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Live Transfer",
//     buttons: [
//       {
//         label: "Operate Breaker",
//         endpoint: "/api/v1/breaker/operate",
//         color: "orange",
//         type: "breaker",
//       },
//     ],
//   },
// ];

// export default function IntegratedDashboard() {
//   const [loading, setLoading] = useState(false);
//   const [logs, setLogs] = useState([]);
//   const [biData, setBiData] = useState([]);
//   const [modeData, setModeData] = useState([]);
//   const [sseStatus, setSseStatus] = useState("CONNECTING");
//   const [modeSseStatus, setModeSseStatus] = useState("CONNECTING");
//   const [activeCommand, setActiveCommand] = useState(null);
//   const [authError, setAuthError] = useState(false);
  
//   // Binary I/O States
//   const [biSignals, setBiSignals] = useState([]);
//   const [boSignals, setBoSignals] = useState([]);
//   const [binaryConnected, setBinaryConnected] = useState(false);
  
//   // Analog States
//   const [analogConnected, setAnalogConnected] = useState(false);
//   const [analogSignals, setAnalogSignals] = useState([]);
  
//   // Confirmation dialog state
//   const [confirmDialog, setConfirmDialog] = useState({
//     isOpen: false,
//     command: null,
//     endpoint: null,
//     buttonType: null,
//     label: null
//   });

//   const biDataRef = useRef([]);
//   const modeDataRef = useRef([]);
//   const evtSourceRef = useRef(null);
//   const modeEvtSourceRef = useRef(null);
//   const biBoSourceRef = useRef(null);
//   const analogSourceRef = useRef(null);
//   const reconnectTimeoutRef = useRef(null);
//   const modeReconnectTimeoutRef = useRef(null);
//   const binaryReconnectTimeoutRef = useRef(null);
//   const analogReconnectTimeoutRef = useRef(null);

//   // Track previous states to detect changes
//   const prevBiDataRef = useRef([]);
//   const prevModeDataRef = useRef([]);

//   // Helper function to get auth token
//   const getAuthToken = () => {
//     return localStorage.getItem("token") || sessionStorage.getItem("token");
//   };

//   // Helper function to check if user is authenticated
//   const isAuthenticated = () => {
//     return !!getAuthToken();
//   };

//   // Helper function to create headers with auth token
//   const getAuthHeaders = () => {
//     const token = getAuthToken();
//     return {
//       "Content-Type": "application/json",
//       ...(token ? { "Authorization": `Bearer ${token}` } : {})
//     };
//   };

//   /* ---------------- LOGGING ---------------- */
//   const addLog = (msg, type = "INFO") => {
//     const allowedTypes = [
//       "CMD",
//       "DIRECTION",
//       "BREAKER",
//       "SUCCESS",
//       "ERROR",
//       "MODE_CHANGE",
//       "STATUS_CHANGE",
//       "CONNECTION",
//       "AUTH_ERROR",
//       "CONFIRMATION",
//     ];

//     if (!allowedTypes.includes(type)) {
//       return;
//     }

//     const timestamp = new Date().toLocaleTimeString();
//     setLogs((prev) => [{ timestamp, msg, type }, ...prev].slice(0, 50));
//   };

//   /* ---------------- CONFIRMATION DIALOG ---------------- */
//   const openConfirmDialog = (label, endpoint, buttonType) => {
//     setConfirmDialog({
//       isOpen: true,
//       command: label,
//       endpoint: endpoint,
//       buttonType: buttonType,
//       label: label
//     });
//   };

//   const closeConfirmDialog = () => {
//     setConfirmDialog({
//       isOpen: false,
//       command: null,
//       endpoint: null,
//       buttonType: null,
//       label: null
//     });
//   };

//   const handleConfirm = () => {
//     const { label, endpoint, buttonType } = confirmDialog;
//     addLog(`Command confirmed: ${label}`, "CONFIRMATION");
//     closeConfirmDialog();
//     executeCommand(label, endpoint, buttonType);
//   };

//   const handleCancel = () => {
//     if (confirmDialog.label) {
//       addLog(`Command cancelled: ${confirmDialog.label}`, "CONFIRMATION");
//     }
//     closeConfirmDialog();
//   };

//   /* ---------------- CONTROL CALL (INDEPENDENT OPERATIONS) ---------------- */
//   const executeCommand = async (label, endpoint, buttonType = "immediate") => {
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }

//     try {
//       setLoading(true);
//       setActiveCommand(label);
//       addLog(`${label}`, "CMD");

//       const headers = getAuthHeaders();

//       if (buttonType === "direction") {
//         addLog(`Setting direction: ${label}`, "DIRECTION");
        
//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Direction setup failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Direction set: ${label}`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       if (buttonType === "breaker") {
//         addLog(`Operating breaker`, "BREAKER");

//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Breaker operation failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Breaker operation completed`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: headers,
//       });

//       if (res.status === 401 || res.status === 403) {
//         throw new Error("Authentication failed. Please log in again.");
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Operation failed");

//       addLog(`${label} successful`, "SUCCESS");
//     } catch (err) {
//       addLog(`${label} failed: ${err.message}`, "ERROR");
//       if (err.message.includes("Authentication failed")) {
//         setAuthError(true);
//         setTimeout(() => setAuthError(false), 3000);
//       }
//     } finally {
//       setLoading(false);
//       setTimeout(() => setActiveCommand(null), 1000);
//     }
//   };

//   const callApi = (label, endpoint, buttonType = "immediate") => {
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }
//     openConfirmDialog(label, endpoint, buttonType);
//   };

//   /* ---------------- SSE LIVE DATA ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectSSE = () => {
//       try {
//         if (evtSourceRef.current) {
//           evtSourceRef.current.close();
//           evtSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         const url = token 
//           ? `${API_BASE}/api/v1/stream/bi-available?token=${token}`
//           : `${API_BASE}/api/v1/stream/bi-available`;

//         evtSourceRef.current = new EventSource(url);

//         evtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setSseStatus("CONNECTED");
//         };

//         evtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             if (parsed.bi && Array.isArray(parsed.bi)) {
//               const transformedData = parsed.bi.map((item) => ({
//                 tag: item.tag,
//                 value: item.value,
//                 description: getDirectionDescription(item.tag),
//               }));

//               if (prevBiDataRef.current.length > 0) {
//                 const changedItems = [];
//                 transformedData.forEach((item, index) => {
//                   if (index < prevBiDataRef.current.length) {
//                     const prevItem = prevBiDataRef.current[index];
//                     if (prevItem && prevItem.value !== item.value) {
//                       changedItems.push(item);
//                     }
//                   }
//                 });

//                 if (changedItems.length > 0) {
//                   changedItems.forEach((item) => {
//                     const statusText =
//                       item.tag === "btsNotReadyStatus"
//                         ? item.value
//                           ? "NOT READY"
//                           : "READY"
//                         : item.value
//                           ? "AVAILABLE"
//                           : "UNAVAILABLE";
//                     addLog(
//                       `${getDirectionDescription(item.tag)}: ${statusText}`,
//                       "STATUS_CHANGE",
//                     );
//                   });
//                 }
//               }

//               biDataRef.current = transformedData;
//               setBiData(transformedData);
//               prevBiDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("SSE parse error:", err);
//           }
//         };

//         evtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setSseStatus("DISCONNECTED");

//           if (evtSourceRef.current) {
//             evtSourceRef.current.close();
//             evtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(reconnectTimeoutRef.current);
//             reconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setSseStatus("RECONNECTING");
//                 connectSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("SSE connection error:", err);
//         if (isMounted) {
//           setSseStatus("ERROR");

//           clearTimeout(reconnectTimeoutRef.current);
//           reconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setSseStatus("RECONNECTING");
//               connectSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectSSE();

//     return () => {
//       isMounted = false;

//       if (evtSourceRef.current) {
//         evtSourceRef.current.close();
//         evtSourceRef.current = null;
//       }

//       if (reconnectTimeoutRef.current) {
//         clearTimeout(reconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- MODE SELECTION SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectModeSSE = () => {
//       try {
//         if (modeEvtSourceRef.current) {
//           modeEvtSourceRef.current.close();
//           modeEvtSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         const url = token
//           ? `${API_BASE}/api/v1/stream/mode-selected?token=${token}`
//           : `${API_BASE}/api/v1/stream/mode-selected`;

//         modeEvtSourceRef.current = new EventSource(url);

//         modeEvtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setModeSseStatus("CONNECTED");
//         };

//         modeEvtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             let modeArray = [];

//             if (parsed.bo && Array.isArray(parsed.bo)) {
//               modeArray = parsed.bo;
//             } else if (parsed.data && Array.isArray(parsed.data)) {
//               modeArray = parsed.data;
//             } else if (Array.isArray(parsed)) {
//               modeArray = parsed;
//             }

//             if (modeArray.length > 0) {
//               const transformedData = modeArray.map((item) => ({
//                 tag: item.tag || item.name || item.address,
//                 value: item.value,
//                 address: item.address || item.tag || "N/A",
//                 description: getModeDescription(
//                   item.tag || item.name || item.address,
//                 ),
//               }));

//               if (prevModeDataRef.current.length > 0) {
//                 const prevActiveMode = prevModeDataRef.current.find(
//                   (item) => item.value === true,
//                 );
//                 const currentActiveMode = transformedData.find(
//                   (item) => item.value === true,
//                 );

//                 if (
//                   prevActiveMode &&
//                   currentActiveMode &&
//                   prevActiveMode.tag !== currentActiveMode.tag
//                 ) {
//                   addLog(
//                     `Mode changed from ${prevActiveMode.description} to ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (!prevActiveMode && currentActiveMode) {
//                   addLog(
//                     `Mode selected: ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (prevActiveMode && !currentActiveMode) {
//                   addLog(
//                     `Mode deselected: ${prevActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 }
//               }

//               modeDataRef.current = transformedData;
//               setModeData(transformedData);
//               prevModeDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("Mode SSE parse error:", err);
//           }
//         };

//         modeEvtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setModeSseStatus("DISCONNECTED");

//           if (modeEvtSourceRef.current) {
//             modeEvtSourceRef.current.close();
//             modeEvtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(modeReconnectTimeoutRef.current);
//             modeReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setModeSseStatus("RECONNECTING");
//                 connectModeSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("Mode SSE connection error:", err);
//         if (isMounted) {
//           setModeSseStatus("ERROR");

//           clearTimeout(modeReconnectTimeoutRef.current);
//           modeReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setModeSseStatus("RECONNECTING");
//               connectModeSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectModeSSE();

//     return () => {
//       isMounted = false;

//       if (modeEvtSourceRef.current) {
//         modeEvtSourceRef.current.close();
//         modeEvtSourceRef.current = null;
//       }

//       if (modeReconnectTimeoutRef.current) {
//         clearTimeout(modeReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- BINARY I/O SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectBinarySSE = () => {
//       try {
//         if (biBoSourceRef.current) {
//           biBoSourceRef.current.close();
//           biBoSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           setBinaryConnected(false);
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/bi-bo?token=${token}`;
//         biBoSourceRef.current = new EventSource(url);

//         biBoSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setBinaryConnected(true);
//         };

//         biBoSourceRef.current.onerror = () => {
//           if (!isMounted) return;
//           setBinaryConnected(false);
          
//           if (biBoSourceRef.current && biBoSourceRef.current.readyState === EventSource.CLOSED) {
//             setAuthError(true);
//           }
          
//           if (isMounted) {
//             clearTimeout(binaryReconnectTimeoutRef.current);
//             binaryReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 connectBinarySSE();
//               }
//             }, 3000);
//           }
//         };

//         biBoSourceRef.current.onmessage = (e) => {
//           try {
//             const data = JSON.parse(e.data);
            
//             if (data.bi && Array.isArray(data.bi)) {
//               setBiSignals(data.bi);
//             }
            
//             if (data.bo && Array.isArray(data.bo)) {
//               setBoSignals(data.bo);
//             }
//           } catch (err) {
//             console.error("Binary SSE parse error:", err);
//           }
//         };
//       } catch (err) {
//         console.error("Binary SSE connection error:", err);
//         if (isMounted) {
//           setBinaryConnected(false);
          
//           clearTimeout(binaryReconnectTimeoutRef.current);
//           binaryReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectBinarySSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectBinarySSE();
//     }

//     return () => {
//       isMounted = false;
//       if (biBoSourceRef.current) {
//         biBoSourceRef.current.close();
//         biBoSourceRef.current = null;
//       }
//       if (binaryReconnectTimeoutRef.current) {
//         clearTimeout(binaryReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- ANALOG SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectAnalogSSE = () => {
//       try {
//         if (analogSourceRef.current) {
//           analogSourceRef.current.close();
//           analogSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           setAnalogConnected(false);
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/analog?token=${token}`;
//         analogSourceRef.current = new EventSource(url);

//         analogSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setAnalogConnected(true);
//         };

//         analogSourceRef.current.onerror = () => {
//           if (!isMounted) return;
//           setAnalogConnected(false);
          
//           if (isMounted) {
//             clearTimeout(analogReconnectTimeoutRef.current);
//             analogReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 connectAnalogSSE();
//               }
//             }, 3000);
//           }
//         };

//         analogSourceRef.current.onmessage = (e) => {
//           try {
//             const data = JSON.parse(e.data);
            
//             if (data.analog && Array.isArray(data.analog)) {
//               setAnalogSignals(data.analog);
//             }
//           } catch (err) {
//             console.error("Analog SSE parse error:", err);
//           }
//         };
//       } catch (err) {
//         console.error("Analog SSE connection error:", err);
//         if (isMounted) {
//           setAnalogConnected(false);
          
//           clearTimeout(analogReconnectTimeoutRef.current);
//           analogReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectAnalogSSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectAnalogSSE();
//     }

//     return () => {
//       isMounted = false;
//       if (analogSourceRef.current) {
//         analogSourceRef.current.close();
//         analogSourceRef.current = null;
//       }
//       if (analogReconnectTimeoutRef.current) {
//         clearTimeout(analogReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- HELPER FUNCTIONS ---------------- */
//   const getModeDescription = (tag) => {
//     const descriptions = {
//       fastModeSelected: "Fast Mode",
//       fastSlowModeSelected: "Fast-Slow Mode",
//       fastInPhaseSlowModeSelected: "Fast In-Phase Slow Mode",
//       parallelModeSelected: "Parallel Mode",
//       slowModeSelected: "Slow Mode",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getDirectionDescription = (tag) => {
//     const descriptions = {
//       b1_s1_available: "BusA to Src1",
//       b1_s2_available: "BusA to Src2",
//       b2_s1_available: "BusB to Src1",
//       b2_s2_available: "BusB to Src2",
//       b1_2_to_s1_available: "BusA&B to Src1",
//       b1_2_to_s2_available: "BusA&B to Src2",
//       btsNotReadyStatus: "BTS Ready Status",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getActiveMode = () => {
//     const activeMode = modeData.find((item) => item.value === true);
//     return activeMode ? activeMode.description : "No Mode Selected";
//   };

//   const getBTSReadyStatus = () => {
//     const btsNotReady = biData.find((item) => item.tag === "btsNotReadyStatus");
//     return btsNotReady ? !btsNotReady.value : false;
//   };

//   const getDirectionAvailability = (directionTag) => {
//     if (!directionTag) return false;
//     const direction = biData.find((item) => item.tag === directionTag);
//     return direction ? direction.value : false;
//   };

//   const getModeActiveStatus = (modeTag) => {
//     if (!modeTag) return false;
//     const mode = modeData.find((item) => item.tag === modeTag);
//     return mode ? mode.value : false;
//   };

//   const clearLogs = () => {
//     setLogs([]);
//   };

//   // Binary I/O Helper functions - REMOVED formatting, now returns original tag
//   const getSignalName = (signal) => {
//     return signal.tag || 'Untagged';
//   };

//   const getSignalAddress = (signal) => {
//     return signal.address || 'N/A';
//   };

//   // Light theme color classes
//   const colorClasses = {
//     green: "bg-green-500 border-green-600 hover:bg-green-600 hover:border-green-700 text-white text-xs px-2 py-1.5",
//     red: "bg-red-500 border-red-600 hover:bg-red-600 hover:border-red-700 text-white text-xs px-2 py-1.5",
//     yellow: "bg-yellow-400 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 text-white text-xs px-2 py-1.5",
//     blue: "bg-[#0AC4E0] border-[#0A8B9F] hover:bg-[#0A8B9F] hover:border-[#0A6B7F] text-white text-xs px-2 py-1.5",
//     purple: "bg-purple-500 border-purple-600 hover:bg-purple-600 hover:border-purple-700 text-white text-xs px-2 py-1.5",
//     gray: "bg-gray-600 border-gray-700 hover:bg-gray-700 hover:border-gray-800 text-white text-xs px-2 py-1.5",
//     orange: "bg-orange-400 border-orange-500 hover:bg-orange-500 hover:border-orange-600 text-white text-xs px-2 py-1.5",
//   };

//   const getDirectionClass = (available) => {
//     if (available) {
//       return "bg-green-100 border-[#0AC4E0] hover:bg-green-200 text-gray-800 text-xs px-2 py-1.5";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
//   };

//   const getModeActiveClass = (active) => {
//     if (active) {
//       return "bg-purple-100 border-[#0AC4E0] hover:bg-purple-200 text-gray-800 text-xs px-2 py-1.5";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
//   };

//   const bgClass = "bg-gray-100";
//   const textClass = "text-gray-800";
//   const cardBgClass = "bg-white";
//   const cardBorderClass = "border-gray-300";

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-2`}>
//       {/* Header with Auth Status */}
//       <div className="mb-2 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <div className={`w-2 h-2 rounded-full ${isAuthenticated() ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//           <h1 className="text-sm font-bold">INDUSTRIAL CONTROL DASHBOARD</h1>
//         </div>
//         {!isAuthenticated() && (
//           <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded border border-red-300">
//             UNAUTHENTICATED
//           </div>
//         )}
//       </div>

//       {/* Auth Error Message */}
//       {authError && (
//         <div className="mb-2 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-600">
//           <div className="flex items-center">
//             <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             <span>Authentication failed. Please log in again.</span>
//           </div>
//         </div>
//       )}

//       {/* Four Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
//         {/* COLUMN 1: ANALOG SIGNALS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">ANALOG SIGNALS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${analogConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{analogConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : analogSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No analog data
//               </div>
//             ) : (
//               <div className="space-y-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {analogSignals.map((signal, idx) => (
//                   <div 
//                     key={idx}
//                     className="p-1.5 bg-gray-50 rounded border border-gray-200 hover:border-[#0AC4E0] transition-all"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1 min-w-0">
//                         {/* Original signal name from API - no formatting */}
//                         <div className="text-[10px] font-medium truncate">{signal.tag}</div>
//                         <div className="text-[7px] text-gray-500 font-mono truncate">{signal.address || 'N/A'}</div>
//                       </div>
//                       <div className="flex items-center space-x-1.5">
//                         <div className={`w-2 h-2 rounded-full ${signal.value !== null && signal.value > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                         <div className="text-xs font-bold font-mono text-[#0AC4E0]">
//                           {signal.value !== null ? signal.value.toFixed(2) : '--'}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 2: BINARY INPUTS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">BINARY INPUTS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : biSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No input signals
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {biSignals.map((signal) => (
//                   <div
//                     key={signal.address || signal.tag}
//                     className={`p-1.5 rounded border transition-all ${
//                       signal.value 
//                         ? 'bg-[#0AC4E0]/10 border-[#0AC4E0]' 
//                         : 'bg-gray-50 border-gray-200'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       {/* Original signal name from API - no formatting */}
//                       <div className="text-[9px] font-medium truncate max-w-[70px]" title={signal.tag}>
//                         {signal.tag}
//                       </div>
//                       <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                     </div>
//                     <div className="flex items-center justify-between mt-0.5">
//                       <div className="text-[6px] text-gray-500 font-mono truncate">
//                         {getSignalAddress(signal)}
//                       </div>
//                       <div className={`text-[9px] font-bold ${signal.value ? 'text-[#0AC4E0]' : 'text-gray-500'}`}>
//                         {signal.value ? '1' : '0'}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 3: BINARY OUTPUTS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">BINARY OUTPUTS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : boSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No output signals
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {boSignals.map((signal) => (
//                   <div
//                     key={signal.address || signal.tag}
//                     className={`p-1.5 rounded border transition-all ${
//                       signal.value 
//                         ? 'bg-purple-100 border-purple-400' 
//                         : 'bg-gray-50 border-gray-200'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       {/* Original signal name from API - no formatting */}
//                       <div className="text-[9px] font-medium truncate max-w-[70px]" title={signal.tag}>
//                         {signal.tag}
//                       </div>
//                       <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-purple-500' : 'bg-gray-400'}`}></div>
//                     </div>
//                     <div className="flex items-center justify-between mt-0.5">
//                       <div className="text-[6px] text-gray-500 font-mono truncate">
//                         {getSignalAddress(signal)}
//                       </div>
//                       <div className={`text-[9px] font-bold ${signal.value ? 'text-purple-600' : 'text-gray-500'}`}>
//                         {signal.value ? '1' : '0'}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 4: CONTROL PANEL (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">CONTROL PANEL</h2>
//               <div className="flex items-center space-x-2">
//                 <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
//                 <span className="text-[9px] text-gray-600">{loading ? 'BUSY' : 'READY'}</span>
//               </div>
//             </div>

//             {/* Quick Status */}
//             <div className="grid grid-cols-2 gap-1 mb-2">
//               <div className="p-1 bg-gray-50 rounded border border-gray-200">
//                 <div className="text-[7px] text-gray-500">ACTIVE MODE</div>
//                 <div className="text-[9px] font-bold truncate">{getActiveMode()}</div>
//               </div>
//               <div className="p-1 bg-gray-50 rounded border border-gray-200">
//                 <div className="text-[7px] text-gray-500">ANALOG</div>
//                 <div className={`text-[9px] font-bold ${getBTSReadyStatus() ? 'text-green-600' : 'text-red-600'}`}>
//                   {getBTSReadyStatus() ? 'CONNECTED' : 'NOT CONNECTED'}
//                 </div>
//               </div>
//             </div>

//             {/* Control Buttons */}
//             <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
//               {actions.map((section, idx) => (
//                 <div key={idx}>
//                   <h3 className="text-[9px] font-bold mb-1 text-gray-600">{section.title}</h3>
//                   <div className="grid grid-cols-2 gap-1">
//                     {section.buttons.map((btn, i) => {
//                       const isDirection = btn.type === "direction";
//                       const directionAvailable = isDirection
//                         ? getDirectionAvailability(btn.directionTag)
//                         : false;
//                       const modeActive = section.title === "Remote Mode"
//                         ? getModeActiveStatus(btn.modeTag)
//                         : false;

//                       return (
//                         <button
//                           key={i}
//                           disabled={loading || !isAuthenticated()}
//                           onClick={() => callApi(btn.label, btn.endpoint, btn.type)}
//                           className={`relative w-full rounded border text-[8px] font-medium p-1 transition-all disabled:opacity-50 ${
//                             isDirection 
//                               ? getDirectionClass(directionAvailable)
//                               : section.title === "Remote Mode"
//                                 ? getModeActiveClass(modeActive)
//                                 : colorClasses[btn.color]
//                           }`}
//                         >
//                           <span className="truncate block">{btn.label}</span>
//                           {(isDirection || section.title === "Remote Mode") && (
//                             <div className="absolute -top-1 -right-1">
//                               <div className={`w-1.5 h-1.5 rounded-full ${
//                                 isDirection 
//                                   ? directionAvailable ? 'bg-green-500' : 'bg-gray-400'
//                                   : modeActive ? 'bg-purple-500' : 'bg-gray-400'
//                               }`}></div>
//                             </div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Event Log */}
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-1">
//               <h3 className="text-[9px] font-bold uppercase">EVENT LOG</h3>
//               <button
//                 onClick={clearLogs}
//                 className="text-[7px] px-1 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
//               >
//                 Clear
//               </button>
//             </div>
//             <div className="h-20 overflow-y-auto text-[7px] font-mono space-y-1">
//               {logs.length === 0 ? (
//                 <div className="text-center text-gray-500 py-2">No events</div>
//               ) : (
//                 logs.map((log, i) => (
//                   <div key={i} className="p-1 bg-gray-50 rounded border border-gray-200">
//                     <span className="text-gray-500">[{log.timestamp}]</span>{' '}
//                     <span className={log.type === 'ERROR' ? 'text-red-600' : 'text-gray-700'}>
//                       {log.msg}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-2 pt-2 border-t border-gray-300">
//         <div className="flex justify-between text-[7px] text-gray-600">
//           <div className="flex space-x-2">
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span> ACTIVE</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1"></span> INACTIVE</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-[#0AC4E0] rounded-full mr-1"></span> INPUT</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span> OUTPUT</span>
//           </div>
//           <div>
//             <span>ANALOG: {analogSignals.length} • </span>
//             <span>IN: {biSignals.length} • </span>
//             <span>OUT: {boSignals.length} • </span>
//             <span>CTRL: {loading ? 'EXEC' : 'STDBY'}</span>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog */}
//       {confirmDialog.isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full border border-gray-300">
//             <div className="bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] p-3 rounded-t-xl">
//               <h3 className="text-white font-bold text-sm">Confirm Command</h3>
//             </div>
//             <div className="p-4">
//               <p className="text-xs text-gray-700 mb-2">Execute: <span className="font-bold text-[#0AC4E0]">{confirmDialog.command}</span></p>
//               <p className="text-[9px] text-gray-500 mb-3">This will send a command to the control system.</p>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={handleCancel}
//                   className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirm}
//                   className="px-3 py-1 text-xs bg-[#0AC4E0] hover:bg-[#0A8B9F] text-white rounded"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }











// import { useEffect, useState, useRef } from "react";

// const API_BASE = "https://mqtt-testing-2.onrender.com";

// /* ---------------- SIGNAL NAME MAPPINGS ---------------- */
// // You can change these names to whatever you want to display on screen

// // Analog Signal Names - Edit these to change what shows on screen
// const ANALOG_SIGNAL_NAMES = {
//   "IC1_LN_PT_V": "I/C-1 LINE PT VOLTAGE",
//   "BUS1_PT_V": "BUS-1 PT VOLTAGE",
//   "BUS2_PT_V": "BUS-2 PT VOLTAGE",
//   "IC2_LN_PT_V": "I/C-2 LINE PT VOLTAGE",
//   "IC1_LN_Freq": "I/C-1 LINE FREQUENCY",
//   "BUS1_Freq": "BUS-1 FREQUENCY",
//   "BUS2_Freq": "BUS-2 FREQUENCY",
//   "IC2_LN_Freq": "I/C-2 LINE FREQUENCY",
//   "IC1_Ph_Diff": "I/C-1 PHASE DIFFERENCE",
//   "BC_Ph_Diff": "B/C PHASE DIFFERENCE",
//   "IC2_Ph_Diff": "I/C-2 PHASE DIFFERENCE",
// };

// // Binary Input Signal Names - Edit these to change what shows on screen
// const BINARY_INPUT_NAMES = {
//   // BTS Status
//   "bts_not_ready": "BTS NOT READY",
//   "bts_ready": "BTS READY",
//   "bts_blocked": "BTS BLOCKED",
//   "bts_not_blocked": "BTS NOT BLOCKED",
  
//   // Source 1 Status
//   "src1_not_healthy": "SRC-1 NOT HEALTHY",
//   "src1_healthy": "SRC-1 HEALTHY",
  
//   // I/C-1 Breaker
//   "ic1_bkr_on": "I/C-1 BKR ON",
//   "ic1_bkr_off": "I/C-1 BKR OFF",
  
//   // B/C Breaker
//   "bc_bkr_on": "B/C BKR ON",
//   "bc_bkr_off": "B/C BKR OFF",
  
//   // I/C-2 Breaker
//   "ic2_bkr_on": "I/C-2 BKR ON",
//   "ic2_bkr_off": "I/C-2 BKR OFF",
  
//   // Source 2 Status
//   "src2_not_healthy": "SRC-2 NOT HEALTHY",
//   "src2_healthy": "SRC-2 HEALTHY",
  
//   // Fast Transfer Status
//   "fast_transfer_condition_ok": "FAST TRANSFER CONDITION OK",
//   "fast_transfer_bus_healthy": "FAST TRANSFER BUS HEALTHY",
//   "new_source_bus_delta_phase_ok": "NEW SOURCE BUS Δ PHASE OK",
//   "new_source_bus_delta_volt_ok": "NEW SOURCE BUS Δ VOLT OK",
  
//   // ANSI Status
//   "ansi_c50_41_vf_ok": "ANSI C50.41 (V/F) OK",
  
//   // I/C-1 Breaker Ready
//   "ic1_bkr_not_ready": "I/C-1 BKR NOT READY",
//   "ic1_bkr_ready": "I/C-1 BKR READY",
  
//   // B/C Breaker Ready
//   "bc_bkr_not_ready": "B/C BKR NOT READY",
//   "bc_bkr_ready": "B/C BKR READY",
  
//   // I/C-2 Breaker Ready
//   "ic2_bkr_not_ready": "I/C-2 BKR NOT READY",
//   "ic2_bkr_ready": "I/C-2 BKR READY",
  
//   // Operation Status
//   "bkr_operation_fail": "BKR OPERATION FAIL",
//   "bkr_operation_healthy": "BKR OPER. HEALTHY",
//   "previous_txr_fail": "PREVIOUS TXR. FAIL",
//   "previous_txr_ok": "PREVIOUS TXR. OK",
  
//   // Auxiliaries
//   "auxiliaries_trip": "AUXILIARIES TRIP",
  
//   // Test Transfer
//   "test_transfer_fail": "TEST TRANSFER FAIL",
//   "test_transfer_ok": "TEST TRANSFER OK",
  
//   // Alarm
//   "alarm": "ALARM",
// };

// // Binary Output Signal Names - Edit these to change what shows on screen
// const BINARY_OUTPUT_NAMES = {
//   "bts_out": "BTS OUT",
//   "bts_in": "BTS IN",
//   "fast_mode": "FAST MODE",
//   "fast_inphase_slow_mode": "FAST INPHASE SLOW MODE",
//   "fast_slow_mode": "FAST SLOW MODE",
//   "slow_mode": "SLOW MODE",
//   "momentary_parallel_mode": "MOMENTARY PARALLELING MODE",
//   "bus_a_to_src1": "BUS A => SRC-1",
//   "bus_a_to_src2": "BUS A => SRC-2",
//   "bus_b_to_src1": "BUS B => SRC-1",
//   "bus_b_to_src2": "BUS B => SRC-2",
//   "bus_ab_to_src1": "BUS A+B => SRC-1",
//   "bus_ab_to_src2": "BUS A+B => SRC-2",
// };

// /* ---------------- DATA STRUCTURES ---------------- */
// const actions = [
//   {
//     title: "BTS Control",
//     buttons: [
//       {
//         label: "BTS IN",
//         endpoint: "/api/v1/bts/in",
//         color: "green",
//         type: "immediate",
//       },
//       {
//         label: "BTS OUT",
//         endpoint: "/api/v1/bts/out",
//         color: "red",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "BTS Reset",
//     buttons: [
//       {
//         label: "BTS RESET",
//         endpoint: "/api/v1/reset-bts",
//         color: "yellow",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Remote Test",
//     buttons: [
//       {
//         label: "Remote Test IN",
//         endpoint: "/api/v1/remote-test/in",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test OUT",
//         endpoint: "/api/v1/remote-test/out",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test Transfer",
//         endpoint: "/api/v1/remote-test/transfer",
//         color: "purple",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Bus to Source",
//     buttons: [
//       {
//         label: "BusA to Src1",
//         endpoint: "/api/v1/bus1/source1",
//         color: "gray",
//         directionTag: "b1_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA to Src2",
//         endpoint: "/api/v1/bus2/source2",
//         color: "gray",
//         directionTag: "b1_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src1",
//         endpoint: "/api/v1/bus3/source1",
//         color: "gray",
//         directionTag: "b2_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src2",
//         endpoint: "/api/v1/bus4/source2",
//         color: "gray",
//         directionTag: "b2_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src1",
//         endpoint: "/api/v1/bus12/source1",
//         color: "gray",
//         directionTag: "b1_2_to_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src2",
//         endpoint: "/api/v1/bus12/source2",
//         color: "gray",
//         directionTag: "b1_2_to_s2_available",
//         type: "direction",
//       },
//     ],
//   },
//   {
//     title: "Remote Mode",
//     buttons: [
//       {
//         label: "FAST",
//         endpoint: "/api/v1/mode/fast",
//         color: "blue",
//         modeTag: "fastModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-SLOW",
//         endpoint: "/api/v1/mode/fasl",
//         color: "blue",
//         modeTag: "fastSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-INPHASE-SLOW",
//         endpoint: "/api/v1/mode/fainsl",
//         color: "blue",
//         modeTag: "fastInPhaseSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "PARALLEL",
//         endpoint: "/api/v1/mode/parallel",
//         color: "blue",
//         modeTag: "parallelModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "SLOW",
//         endpoint: "/api/v1/mode/slow",
//         color: "blue",
//         modeTag: "slowModeSelected",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Live Transfer",
//     buttons: [
//       {
//         label: "Operate Breaker",
//         endpoint: "/api/v1/breaker/operate",
//         color: "orange",
//         type: "breaker",
//       },
//     ],
//   },
// ];

// export default function IntegratedDashboard() {
//   const [loading, setLoading] = useState(false);
//   const [logs, setLogs] = useState([]);
//   const [biData, setBiData] = useState([]);
//   const [modeData, setModeData] = useState([]);
//   const [sseStatus, setSseStatus] = useState("CONNECTING");
//   const [modeSseStatus, setModeSseStatus] = useState("CONNECTING");
//   const [activeCommand, setActiveCommand] = useState(null);
//   const [authError, setAuthError] = useState(false);
  
//   // Binary I/O States
//   const [biSignals, setBiSignals] = useState([]);
//   const [boSignals, setBoSignals] = useState([]);
//   const [binaryConnected, setBinaryConnected] = useState(false);
  
//   // Analog States
//   const [analogConnected, setAnalogConnected] = useState(false);
//   const [analogSignals, setAnalogSignals] = useState([]);
  
//   // Confirmation dialog state
//   const [confirmDialog, setConfirmDialog] = useState({
//     isOpen: false,
//     command: null,
//     endpoint: null,
//     buttonType: null,
//     label: null
//   });

//   const biDataRef = useRef([]);
//   const modeDataRef = useRef([]);
//   const evtSourceRef = useRef(null);
//   const modeEvtSourceRef = useRef(null);
//   const biBoSourceRef = useRef(null);
//   const analogSourceRef = useRef(null);
//   const reconnectTimeoutRef = useRef(null);
//   const modeReconnectTimeoutRef = useRef(null);
//   const binaryReconnectTimeoutRef = useRef(null);
//   const analogReconnectTimeoutRef = useRef(null);

//   // Track previous states to detect changes
//   const prevBiDataRef = useRef([]);
//   const prevModeDataRef = useRef([]);

//   // Helper function to get auth token
//   const getAuthToken = () => {
//     return localStorage.getItem("token") || sessionStorage.getItem("token");
//   };

//   // Helper function to check if user is authenticated
//   const isAuthenticated = () => {
//     return !!getAuthToken();
//   };

//   // Helper function to create headers with auth token
//   const getAuthHeaders = () => {
//     const token = getAuthToken();
//     return {
//       "Content-Type": "application/json",
//       ...(token ? { "Authorization": `Bearer ${token}` } : {})
//     };
//   };

//   /* ---------------- NAME MAPPING FUNCTIONS ---------------- */
//   const getAnalogDisplayName = (tag) => {
//     return ANALOG_SIGNAL_NAMES[tag] || tag;
//   };

//   const getBinaryInputDisplayName = (tag) => {
//     return BINARY_INPUT_NAMES[tag] || tag;
//   };

//   const getBinaryOutputDisplayName = (tag) => {
//     return BINARY_OUTPUT_NAMES[tag] || tag;
//   };

//   /* ---------------- LOGGING ---------------- */
//   const addLog = (msg, type = "INFO") => {
//     const allowedTypes = [
//       "CMD",
//       "DIRECTION",
//       "BREAKER",
//       "SUCCESS",
//       "ERROR",
//       "MODE_CHANGE",
//       "STATUS_CHANGE",
//       "CONNECTION",
//       "AUTH_ERROR",
//       "CONFIRMATION",
//     ];

//     if (!allowedTypes.includes(type)) {
//       return;
//     }

//     const timestamp = new Date().toLocaleTimeString();
//     setLogs((prev) => [{ timestamp, msg, type }, ...prev].slice(0, 50));
//   };

//   /* ---------------- CONFIRMATION DIALOG ---------------- */
//   const openConfirmDialog = (label, endpoint, buttonType) => {
//     setConfirmDialog({
//       isOpen: true,
//       command: label,
//       endpoint: endpoint,
//       buttonType: buttonType,
//       label: label
//     });
//   };

//   const closeConfirmDialog = () => {
//     setConfirmDialog({
//       isOpen: false,
//       command: null,
//       endpoint: null,
//       buttonType: null,
//       label: null
//     });
//   };

//   const handleConfirm = () => {
//     const { label, endpoint, buttonType } = confirmDialog;
//     addLog(`Command confirmed: ${label}`, "CONFIRMATION");
//     closeConfirmDialog();
//     executeCommand(label, endpoint, buttonType);
//   };

//   const handleCancel = () => {
//     if (confirmDialog.label) {
//       addLog(`Command cancelled: ${confirmDialog.label}`, "CONFIRMATION");
//     }
//     closeConfirmDialog();
//   };

//   /* ---------------- CONTROL CALL (INDEPENDENT OPERATIONS) ---------------- */
//   const executeCommand = async (label, endpoint, buttonType = "immediate") => {
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }

//     try {
//       setLoading(true);
//       setActiveCommand(label);
//       addLog(`${label}`, "CMD");

//       const headers = getAuthHeaders();

//       if (buttonType === "direction") {
//         addLog(`Setting direction: ${label}`, "DIRECTION");
        
//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Direction setup failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Direction set: ${label}`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       if (buttonType === "breaker") {
//         addLog(`Operating breaker`, "BREAKER");

//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Breaker operation failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Breaker operation completed`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: headers,
//       });

//       if (res.status === 401 || res.status === 403) {
//         throw new Error("Authentication failed. Please log in again.");
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Operation failed");

//       addLog(`${label} successful`, "SUCCESS");
//     } catch (err) {
//       addLog(`${label} failed: ${err.message}`, "ERROR");
//       if (err.message.includes("Authentication failed")) {
//         setAuthError(true);
//         setTimeout(() => setAuthError(false), 3000);
//       }
//     } finally {
//       setLoading(false);
//       setTimeout(() => setActiveCommand(null), 1000);
//     }
//   };

//   const callApi = (label, endpoint, buttonType = "immediate") => {
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }
//     openConfirmDialog(label, endpoint, buttonType);
//   };

//   /* ---------------- SSE LIVE DATA ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectSSE = () => {
//       try {
//         if (evtSourceRef.current) {
//           evtSourceRef.current.close();
//           evtSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         const url = token 
//           ? `${API_BASE}/api/v1/stream/bi-available?token=${token}`
//           : `${API_BASE}/api/v1/stream/bi-available`;

//         evtSourceRef.current = new EventSource(url);

//         evtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setSseStatus("CONNECTED");
//         };

//         evtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             if (parsed.bi && Array.isArray(parsed.bi)) {
//               const transformedData = parsed.bi.map((item) => ({
//                 tag: item.tag,
//                 value: item.value,
//                 description: getBinaryInputDisplayName(item.tag),
//               }));

//               if (prevBiDataRef.current.length > 0) {
//                 const changedItems = [];
//                 transformedData.forEach((item, index) => {
//                   if (index < prevBiDataRef.current.length) {
//                     const prevItem = prevBiDataRef.current[index];
//                     if (prevItem && prevItem.value !== item.value) {
//                       changedItems.push(item);
//                     }
//                   }
//                 });

//                 if (changedItems.length > 0) {
//                   changedItems.forEach((item) => {
//                     const statusText =
//                       item.tag === "bts_not_ready"
//                         ? item.value
//                           ? "NOT READY"
//                           : "READY"
//                         : item.value
//                           ? "AVAILABLE"
//                           : "UNAVAILABLE";
//                     addLog(
//                       `${getBinaryInputDisplayName(item.tag)}: ${statusText}`,
//                       "STATUS_CHANGE",
//                     );
//                   });
//                 }
//               }

//               biDataRef.current = transformedData;
//               setBiData(transformedData);
//               prevBiDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("SSE parse error:", err);
//           }
//         };

//         evtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setSseStatus("DISCONNECTED");

//           if (evtSourceRef.current) {
//             evtSourceRef.current.close();
//             evtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(reconnectTimeoutRef.current);
//             reconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setSseStatus("RECONNECTING");
//                 connectSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("SSE connection error:", err);
//         if (isMounted) {
//           setSseStatus("ERROR");

//           clearTimeout(reconnectTimeoutRef.current);
//           reconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setSseStatus("RECONNECTING");
//               connectSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectSSE();

//     return () => {
//       isMounted = false;

//       if (evtSourceRef.current) {
//         evtSourceRef.current.close();
//         evtSourceRef.current = null;
//       }

//       if (reconnectTimeoutRef.current) {
//         clearTimeout(reconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- MODE SELECTION SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectModeSSE = () => {
//       try {
//         if (modeEvtSourceRef.current) {
//           modeEvtSourceRef.current.close();
//           modeEvtSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         const url = token
//           ? `${API_BASE}/api/v1/stream/mode-selected?token=${token}`
//           : `${API_BASE}/api/v1/stream/mode-selected`;

//         modeEvtSourceRef.current = new EventSource(url);

//         modeEvtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setModeSseStatus("CONNECTED");
//         };

//         modeEvtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             let modeArray = [];

//             if (parsed.bo && Array.isArray(parsed.bo)) {
//               modeArray = parsed.bo;
//             } else if (parsed.data && Array.isArray(parsed.data)) {
//               modeArray = parsed.data;
//             } else if (Array.isArray(parsed)) {
//               modeArray = parsed;
//             }

//             if (modeArray.length > 0) {
//               const transformedData = modeArray.map((item) => ({
//                 tag: item.tag || item.name || item.address,
//                 value: item.value,
//                 address: item.address || item.tag || "N/A",
//                 description: getBinaryOutputDisplayName(
//                   item.tag || item.name || item.address,
//                 ),
//               }));

//               if (prevModeDataRef.current.length > 0) {
//                 const prevActiveMode = prevModeDataRef.current.find(
//                   (item) => item.value === true,
//                 );
//                 const currentActiveMode = transformedData.find(
//                   (item) => item.value === true,
//                 );

//                 if (
//                   prevActiveMode &&
//                   currentActiveMode &&
//                   prevActiveMode.tag !== currentActiveMode.tag
//                 ) {
//                   addLog(
//                     `Mode changed from ${prevActiveMode.description} to ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (!prevActiveMode && currentActiveMode) {
//                   addLog(
//                     `Mode selected: ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (prevActiveMode && !currentActiveMode) {
//                   addLog(
//                     `Mode deselected: ${prevActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 }
//               }

//               modeDataRef.current = transformedData;
//               setModeData(transformedData);
//               prevModeDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("Mode SSE parse error:", err);
//           }
//         };

//         modeEvtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setModeSseStatus("DISCONNECTED");

//           if (modeEvtSourceRef.current) {
//             modeEvtSourceRef.current.close();
//             modeEvtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(modeReconnectTimeoutRef.current);
//             modeReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setModeSseStatus("RECONNECTING");
//                 connectModeSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("Mode SSE connection error:", err);
//         if (isMounted) {
//           setModeSseStatus("ERROR");

//           clearTimeout(modeReconnectTimeoutRef.current);
//           modeReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setModeSseStatus("RECONNECTING");
//               connectModeSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectModeSSE();

//     return () => {
//       isMounted = false;

//       if (modeEvtSourceRef.current) {
//         modeEvtSourceRef.current.close();
//         modeEvtSourceRef.current = null;
//       }

//       if (modeReconnectTimeoutRef.current) {
//         clearTimeout(modeReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- BINARY I/O SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectBinarySSE = () => {
//       try {
//         if (biBoSourceRef.current) {
//           biBoSourceRef.current.close();
//           biBoSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           setBinaryConnected(false);
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/bi-bo?token=${token}`;
//         biBoSourceRef.current = new EventSource(url);

//         biBoSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setBinaryConnected(true);
//         };

//         biBoSourceRef.current.onerror = () => {
//           if (!isMounted) return;
//           setBinaryConnected(false);
          
//           if (biBoSourceRef.current && biBoSourceRef.current.readyState === EventSource.CLOSED) {
//             setAuthError(true);
//           }
          
//           if (isMounted) {
//             clearTimeout(binaryReconnectTimeoutRef.current);
//             binaryReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 connectBinarySSE();
//               }
//             }, 3000);
//           }
//         };

//         biBoSourceRef.current.onmessage = (e) => {
//           try {
//             const data = JSON.parse(e.data);
            
//             // Debug: Log the raw data to see what's coming from the API
//             console.log("Binary SSE Data:", data);
            
//             // Handle different possible data structures
//             if (data.bi && Array.isArray(data.bi)) {
//               console.log("BI Signals:", data.bi);
//               setBiSignals(data.bi);
//             } else if (data.inputs && Array.isArray(data.inputs)) {
//               console.log("Inputs Signals:", data.inputs);
//               setBiSignals(data.inputs);
//             } else if (data.data && Array.isArray(data.data)) {
//               // Try to separate inputs and outputs based on address or type
//               const inputs = data.data.filter(item => 
//                 item.address?.includes('I') || item.type === 'input'
//               );
//               const outputs = data.data.filter(item => 
//                 item.address?.includes('O') || item.type === 'output'
//               );
              
//               if (inputs.length > 0) {
//                 console.log("Filtered Inputs:", inputs);
//                 setBiSignals(inputs);
//               }
//               if (outputs.length > 0) {
//                 console.log("Filtered Outputs:", outputs);
//                 setBoSignals(outputs);
//               }
//             }
            
//             if (data.bo && Array.isArray(data.bo)) {
//               console.log("BO Signals:", data.bo);
//               setBoSignals(data.bo);
//             } else if (data.outputs && Array.isArray(data.outputs)) {
//               console.log("Outputs Signals:", data.outputs);
//               setBoSignals(data.outputs);
//             }
//           } catch (err) {
//             console.error("Binary SSE parse error:", err);
//           }
//         };
//       } catch (err) {
//         console.error("Binary SSE connection error:", err);
//         if (isMounted) {
//           setBinaryConnected(false);
          
//           clearTimeout(binaryReconnectTimeoutRef.current);
//           binaryReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectBinarySSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectBinarySSE();
//     }

//     return () => {
//       isMounted = false;
//       if (biBoSourceRef.current) {
//         biBoSourceRef.current.close();
//         biBoSourceRef.current = null;
//       }
//       if (binaryReconnectTimeoutRef.current) {
//         clearTimeout(binaryReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- ANALOG SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectAnalogSSE = () => {
//       try {
//         if (analogSourceRef.current) {
//           analogSourceRef.current.close();
//           analogSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           setAnalogConnected(false);
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/analog?token=${token}`;
//         analogSourceRef.current = new EventSource(url);

//         analogSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setAnalogConnected(true);
//         };

//         analogSourceRef.current.onerror = () => {
//           if (!isMounted) return;
//           setAnalogConnected(false);
          
//           if (isMounted) {
//             clearTimeout(analogReconnectTimeoutRef.current);
//             analogReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 connectAnalogSSE();
//               }
//             }, 3000);
//           }
//         };

//         analogSourceRef.current.onmessage = (e) => {
//           try {
//             const data = JSON.parse(e.data);
            
//             if (data.analog && Array.isArray(data.analog)) {
//               setAnalogSignals(data.analog);
//             }
//           } catch (err) {
//             console.error("Analog SSE parse error:", err);
//           }
//         };
//       } catch (err) {
//         console.error("Analog SSE connection error:", err);
//         if (isMounted) {
//           setAnalogConnected(false);
          
//           clearTimeout(analogReconnectTimeoutRef.current);
//           analogReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectAnalogSSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectAnalogSSE();
//     }

//     return () => {
//       isMounted = false;
//       if (analogSourceRef.current) {
//         analogSourceRef.current.close();
//         analogSourceRef.current = null;
//       }
//       if (analogReconnectTimeoutRef.current) {
//         clearTimeout(analogReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- HELPER FUNCTIONS ---------------- */
//   const getModeDescription = (tag) => {
//     const descriptions = {
//       fastModeSelected: "Fast Mode",
//       fastSlowModeSelected: "Fast-Slow Mode",
//       fastInPhaseSlowModeSelected: "Fast In-Phase Slow Mode",
//       parallelModeSelected: "Parallel Mode",
//       slowModeSelected: "Slow Mode",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getDirectionDescription = (tag) => {
//     const descriptions = {
//       b1_s1_available: "BusA to Src1",
//       b1_s2_available: "BusA to Src2",
//       b2_s1_available: "BusB to Src1",
//       b2_s2_available: "BusB to Src2",
//       b1_2_to_s1_available: "BusA&B to Src1",
//       b1_2_to_s2_available: "BusA&B to Src2",
//       bts_not_ready: "BTS Ready Status",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getActiveMode = () => {
//     const activeMode = modeData.find((item) => item.value === true);
//     return activeMode ? activeMode.description : "No Mode Selected";
//   };

//   const getBTSReadyStatus = () => {
//     const btsNotReady = biData.find((item) => item.tag === "bts_not_ready");
//     return btsNotReady ? !btsNotReady.value : false;
//   };

//   const getDirectionAvailability = (directionTag) => {
//     if (!directionTag) return false;
//     const direction = biData.find((item) => item.tag === directionTag);
//     return direction ? direction.value : false;
//   };

//   const getModeActiveStatus = (modeTag) => {
//     if (!modeTag) return false;
//     const mode = modeData.find((item) => item.tag === modeTag);
//     return mode ? mode.value : false;
//   };

//   const clearLogs = () => {
//     setLogs([]);
//   };

//   // Binary I/O Helper functions
//   const getSignalAddress = (signal) => {
//     return signal.address || signal.addr || 'N/A';
//   };

//   // Light theme color classes
//   const colorClasses = {
//     green: "bg-green-500 border-green-600 hover:bg-green-600 hover:border-green-700 text-white text-xs px-2 py-1.5",
//     red: "bg-red-500 border-red-600 hover:bg-red-600 hover:border-red-700 text-white text-xs px-2 py-1.5",
//     yellow: "bg-yellow-400 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 text-white text-xs px-2 py-1.5",
//     blue: "bg-[#0AC4E0] border-[#0A8B9F] hover:bg-[#0A8B9F] hover:border-[#0A6B7F] text-white text-xs px-2 py-1.5",
//     purple: "bg-purple-500 border-purple-600 hover:bg-purple-600 hover:border-purple-700 text-white text-xs px-2 py-1.5",
//     gray: "bg-gray-600 border-gray-700 hover:bg-gray-700 hover:border-gray-800 text-white text-xs px-2 py-1.5",
//     orange: "bg-orange-400 border-orange-500 hover:bg-orange-500 hover:border-orange-600 text-white text-xs px-2 py-1.5",
//   };

//   const getDirectionClass = (available) => {
//     if (available) {
//       return "bg-green-100 border-[#0AC4E0] hover:bg-green-200 text-gray-800 text-xs px-2 py-1.5";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
//   };

//   const getModeActiveClass = (active) => {
//     if (active) {
//       return "bg-purple-100 border-[#0AC4E0] hover:bg-purple-200 text-gray-800 text-xs px-2 py-1.5";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
//   };

//   const bgClass = "bg-gray-100";
//   const textClass = "text-gray-800";
//   const cardBgClass = "bg-white";
//   const cardBorderClass = "border-gray-300";

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-2`}>
//       {/* Header with Auth Status */}
//       <div className="mb-2 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <div className={`w-2 h-2 rounded-full ${isAuthenticated() ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//           <h1 className="text-sm font-bold">INDUSTRIAL CONTROL DASHBOARD</h1>
//         </div>
//         {!isAuthenticated() && (
//           <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded border border-red-300">
//             UNAUTHENTICATED
//           </div>
//         )}
//       </div>

//       {/* Auth Error Message */}
//       {authError && (
//         <div className="mb-2 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-600">
//           <div className="flex items-center">
//             <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             <span>Authentication failed. Please log in again.</span>
//           </div>
//         </div>
//       )}

//       {/* Four Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
//         {/* COLUMN 1: ANALOG SIGNALS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">ANALOG SIGNALS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${analogConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{analogConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : analogSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No analog data
//               </div>
//             ) : (
//               <div className="space-y-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {analogSignals.map((signal, idx) => {
//                   const displayName = getAnalogDisplayName(signal.tag);
//                   return (
//                     <div 
//                       key={idx}
//                       className="p-1.5 bg-gray-50 rounded border border-gray-200 hover:border-[#0AC4E0] transition-all"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex-1 min-w-0">
//                           {/* Custom display name from mapping */}
//                           <div className="text-[10px] font-medium truncate" title={displayName}>
//                             {displayName}
//                           </div>
//                           <div className="text-[7px] text-gray-500 font-mono truncate">
//                             {signal.address || 'N/A'} | {signal.tag}
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-1.5">
//                           <div className={`w-2 h-2 rounded-full ${signal.value !== null && signal.value > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                           <div className="text-xs font-bold font-mono text-[#0AC4E0]">
//                             {signal.value !== null ? signal.value.toFixed(2) : '--'}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 2: BINARY INPUTS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">BINARY INPUTS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : biSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No input signals
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {biSignals.map((signal) => {
//                   const displayName = getBinaryInputDisplayName(signal.tag);
//                   return (
//                     <div
//                       key={signal.address || signal.tag || Math.random()}
//                       className={`p-1.5 rounded border transition-all ${
//                         signal.value 
//                           ? 'bg-[#0AC4E0]/10 border-[#0AC4E0]' 
//                           : 'bg-gray-50 border-gray-200'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         {/* Custom display name from mapping */}
//                         <div className="text-[9px] font-medium truncate max-w-[70px]" title={displayName}>
//                           {displayName}
//                         </div>
//                         <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                       </div>
//                       <div className="flex items-center justify-between mt-0.5">
//                         <div className="text-[6px] text-gray-500 font-mono truncate">
//                           {getSignalAddress(signal)}
//                         </div>
//                         <div className={`text-[9px] font-bold ${signal.value ? 'text-[#0AC4E0]' : 'text-gray-500'}`}>
//                           {signal.value ? '1' : '0'}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 3: BINARY OUTPUTS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">BINARY OUTPUTS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : boSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No output signals
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {boSignals.map((signal) => {
//                   const displayName = getBinaryOutputDisplayName(signal.tag);
//                   return (
//                     <div
//                       key={signal.address || signal.tag || Math.random()}
//                       className={`p-1.5 rounded border transition-all ${
//                         signal.value 
//                           ? 'bg-purple-100 border-purple-400' 
//                           : 'bg-gray-50 border-gray-200'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         {/* Custom display name from mapping */}
//                         <div className="text-[9px] font-medium truncate max-w-[70px]" title={displayName}>
//                           {displayName}
//                         </div>
//                         <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-purple-500' : 'bg-gray-400'}`}></div>
//                       </div>
//                       <div className="flex items-center justify-between mt-0.5">
//                         <div className="text-[6px] text-gray-500 font-mono truncate">
//                           {getSignalAddress(signal)}
//                         </div>
//                         <div className={`text-[9px] font-bold ${signal.value ? 'text-purple-600' : 'text-gray-500'}`}>
//                           {signal.value ? '1' : '0'}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 4: CONTROL PANEL (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">CONTROL PANEL</h2>
//               <div className="flex items-center space-x-2">
//                 <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
//                 <span className="text-[9px] text-gray-600">{loading ? 'BUSY' : 'READY'}</span>
//               </div>
//             </div>

//             {/* Quick Status */}
//             <div className="grid grid-cols-2 gap-1 mb-2">
//               <div className="p-1 bg-gray-50 rounded border border-gray-200">
//                 <div className="text-[7px] text-gray-500">ACTIVE MODE</div>
//                 <div className="text-[9px] font-bold truncate">{getActiveMode()}</div>
//               </div>
//               <div className="p-1 bg-gray-50 rounded border border-gray-200">
//                 <div className="text-[7px] text-gray-500">ANALOG</div>
//                 <div className={`text-[9px] font-bold ${getBTSReadyStatus() ? 'text-green-600' : 'text-red-600'}`}>
//                   {getBTSReadyStatus() ? 'CONNECTED' : 'NOT CONNECTED'}
//                 </div>
//               </div>
//             </div>

//             {/* Control Buttons */}
//             <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
//               {actions.map((section, idx) => (
//                 <div key={idx}>
//                   <h3 className="text-[9px] font-bold mb-1 text-gray-600">{section.title}</h3>
//                   <div className="grid grid-cols-2 gap-1">
//                     {section.buttons.map((btn, i) => {
//                       const isDirection = btn.type === "direction";
//                       const directionAvailable = isDirection
//                         ? getDirectionAvailability(btn.directionTag)
//                         : false;
//                       const modeActive = section.title === "Remote Mode"
//                         ? getModeActiveStatus(btn.modeTag)
//                         : false;

//                       return (
//                         <button
//                           key={i}
//                           disabled={loading || !isAuthenticated()}
//                           onClick={() => callApi(btn.label, btn.endpoint, btn.type)}
//                           className={`relative w-full rounded border text-[8px] font-medium p-1 transition-all disabled:opacity-50 ${
//                             isDirection 
//                               ? getDirectionClass(directionAvailable)
//                               : section.title === "Remote Mode"
//                                 ? getModeActiveClass(modeActive)
//                                 : colorClasses[btn.color]
//                           }`}
//                         >
//                           <span className="truncate block">{btn.label}</span>
//                           {(isDirection || section.title === "Remote Mode") && (
//                             <div className="absolute -top-1 -right-1">
//                               <div className={`w-1.5 h-1.5 rounded-full ${
//                                 isDirection 
//                                   ? directionAvailable ? 'bg-green-500' : 'bg-gray-400'
//                                   : modeActive ? 'bg-purple-500' : 'bg-gray-400'
//                               }`}></div>
//                             </div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Event Log */}
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-1">
//               <h3 className="text-[9px] font-bold uppercase">EVENT LOG</h3>
//               <button
//                 onClick={clearLogs}
//                 className="text-[7px] px-1 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
//               >
//                 Clear
//               </button>
//             </div>
//             <div className="h-20 overflow-y-auto text-[7px] font-mono space-y-1">
//               {logs.length === 0 ? (
//                 <div className="text-center text-gray-500 py-2">No events</div>
//               ) : (
//                 logs.map((log, i) => (
//                   <div key={i} className="p-1 bg-gray-50 rounded border border-gray-200">
//                     <span className="text-gray-500">[{log.timestamp}]</span>{' '}
//                     <span className={log.type === 'ERROR' ? 'text-red-600' : 'text-gray-700'}>
//                       {log.msg}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-2 pt-2 border-t border-gray-300">
//         <div className="flex justify-between text-[7px] text-gray-600">
//           <div className="flex space-x-2">
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span> ACTIVE</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1"></span> INACTIVE</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-[#0AC4E0] rounded-full mr-1"></span> INPUT</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span> OUTPUT</span>
//           </div>
//           <div>
//             <span>ANALOG: {analogSignals.length} • </span>
//             <span>IN: {biSignals.length} • </span>
//             <span>OUT: {boSignals.length} • </span>
//             <span>CTRL: {loading ? 'EXEC' : 'STDBY'}</span>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog */}
//       {confirmDialog.isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full border border-gray-300">
//             <div className="bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] p-3 rounded-t-xl">
//               <h3 className="text-white font-bold text-sm">Confirm Command</h3>
//             </div>
//             <div className="p-4">
//               <p className="text-xs text-gray-700 mb-2">Execute: <span className="font-bold text-[#0AC4E0]">{confirmDialog.command}</span></p>
//               <p className="text-[9px] text-gray-500 mb-3">This will send a command to the control system.</p>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={handleCancel}
//                   className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirm}
//                   className="px-3 py-1 text-xs bg-[#0AC4E0] hover:bg-[#0A8B9F] text-white rounded"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// import { useEffect, useState, useRef } from "react";

// const API_BASE = "https://mqtt-testing-2.onrender.com";

// /* ---------------- SIGNAL NAME MAPPINGS ---------------- */
// // You can change these names to whatever you want to display on screen

// // Analog Signal Names - Edit these to change what shows on screen
// const ANALOG_SIGNAL_NAMES = {
//   "IC1_LN_PT_V": "I/C-1 LINE PT VOLTAGE",
//   "BUS1_PT_V": "BUS-1 PT VOLTAGE",
//   "BUS2_PT_V": "BUS-2 PT VOLTAGE",
//   "IC2_LN_PT_V": "I/C-2 LINE PT VOLTAGE",
//   "IC1_LN_Freq": "I/C-1 LINE FREQUENCY",
//   "BUS1_Freq": "BUS-1 FREQUENCY",
//   "BUS2_Freq": "BUS-2 FREQUENCY",
//   "IC2_LN_Freq": "I/C-2 LINE FREQUENCY",
//   "IC1_Ph_Diff": "I/C-1 PHASE DIFFERENCE",
//   "BC_Ph_Diff": "B/C PHASE DIFFERENCE",
//   "IC2_Ph_Diff": "I/C-2 PHASE DIFFERENCE",
// };

// // Binary Input Signal Names - Edit these to change what shows on screen
// const BINARY_INPUT_NAMES = {
//   // BTS Status
//   "bts_not_ready": "BTS NOT READY",
//   "bts_ready": "BTS READY",
//   "bts_blocked": "BTS BLOCKED",
//   "bts_not_blocked": "BTS NOT BLOCKED",
  
//   // Source 1 Status
//   "src1_not_healthy": "SRC-1 NOT HEALTHY",
//   "src1_healthy": "SRC-1 HEALTHY",
  
//   // I/C-1 Breaker
//   "ic1_bkr_on": "I/C-1 BKR ON",
//   "ic1_bkr_off": "I/C-1 BKR OFF",
  
//   // B/C Breaker
//   "bc_bkr_on": "B/C BKR ON",
//   "bc_bkr_off": "B/C BKR OFF",
  
//   // I/C-2 Breaker
//   "ic2_bkr_on": "I/C-2 BKR ON",
//   "ic2_bkr_off": "I/C-2 BKR OFF",
  
//   // Source 2 Status
//   "src2_not_healthy": "SRC-2 NOT HEALTHY",
//   "src2_healthy": "SRC-2 HEALTHY",
  
//   // Fast Transfer Status
//   "fast_transfer_condition_ok": "FAST TRANSFER CONDITION OK",
//   "fast_transfer_bus_healthy": "FAST TRANSFER BUS HEALTHY",
//   "new_source_bus_delta_phase_ok": "NEW SOURCE BUS Δ PHASE OK",
//   "new_source_bus_delta_volt_ok": "NEW SOURCE BUS Δ VOLT OK",
  
//   // ANSI Status
//   "ansi_c50_41_vf_ok": "ANSI C50.41 (V/F) OK",
  
//   // I/C-1 Breaker Ready
//   "ic1_bkr_not_ready": "I/C-1 BKR NOT READY",
//   "ic1_bkr_ready": "I/C-1 BKR READY",
  
//   // B/C Breaker Ready
//   "bc_bkr_not_ready": "B/C BKR NOT READY",
//   "bc_bkr_ready": "B/C BKR READY",
  
//   // I/C-2 Breaker Ready
//   "ic2_bkr_not_ready": "I/C-2 BKR NOT READY",
//   "ic2_bkr_ready": "I/C-2 BKR READY",
  
//   // Operation Status
//   "bkr_operation_fail": "BKR OPERATION FAIL",
//   "bkr_operation_healthy": "BKR OPER. HEALTHY",
//   "previous_txr_fail": "PREVIOUS TXR. FAIL",
//   "previous_txr_ok": "PREVIOUS TXR. OK",
  
//   // Auxiliaries
//   "auxiliaries_trip": "AUXILIARIES TRIP",
  
//   // Test Transfer
//   "test_transfer_fail": "TEST TRANSFER FAIL",
//   "test_transfer_ok": "TEST TRANSFER OK",
  
//   // Alarm
//   "alarm": "ALARM",
// };

// // Binary Output Signal Names - Edit these to change what shows on screen
// const BINARY_OUTPUT_NAMES = {
//   "bts_out": "BTS OUT",
//   "bts_in": "BTS IN",
//   "fast_mode": "FAST MODE",
//   "fast_inphase_slow_mode": "FAST INPHASE SLOW MODE",
//   "fast_slow_mode": "FAST SLOW MODE",
//   "slow_mode": "SLOW MODE",
//   "momentary_parallel_mode": "MOMENTARY PARALLELING MODE",
//   "bus_a_to_src1": "BUS A => SRC-1",
//   "bus_a_to_src2": "BUS A => SRC-2",
//   "bus_b_to_src1": "BUS B => SRC-1",
//   "bus_b_to_src2": "BUS B => SRC-2",
//   "bus_ab_to_src1": "BUS A+B => SRC-1",
//   "bus_ab_to_src2": "BUS A+B => SRC-2",
// };

// /* ---------------- DATA STRUCTURES ---------------- */
// const actions = [
//   {
//     title: "BTS Control",
//     buttons: [
//       {
//         label: "BTS IN",
//         endpoint: "/api/v1/bts/in",
//         color: "green",
//         type: "immediate",
//       },
//       {
//         label: "BTS OUT",
//         endpoint: "/api/v1/bts/out",
//         color: "red",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "BTS Reset",
//     buttons: [
//       {
//         label: "BTS RESET",
//         endpoint: "/api/v1/reset-bts",
//         color: "yellow",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Remote Test",
//     buttons: [
//       {
//         label: "Remote Test IN",
//         endpoint: "/api/v1/remote-test/in",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test OUT",
//         endpoint: "/api/v1/remote-test/out",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test Transfer",
//         endpoint: "/api/v1/remote-test/transfer",
//         color: "purple",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Bus to Source",
//     buttons: [
//       {
//         label: "BusA to Src1",
//         endpoint: "/api/v1/bus1/source1",
//         color: "gray",
//         directionTag: "b1_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA to Src2",
//         endpoint: "/api/v1/bus2/source2",
//         color: "gray",
//         directionTag: "b1_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src1",
//         endpoint: "/api/v1/bus3/source1",
//         color: "gray",
//         directionTag: "b2_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src2",
//         endpoint: "/api/v1/bus4/source2",
//         color: "gray",
//         directionTag: "b2_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src1",
//         endpoint: "/api/v1/bus12/source1",
//         color: "gray",
//         directionTag: "b1_2_to_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src2",
//         endpoint: "/api/v1/bus12/source2",
//         color: "gray",
//         directionTag: "b1_2_to_s2_available",
//         type: "direction",
//       },
//     ],
//   },
//   {
//     title: "Remote Mode",
//     buttons: [
//       {
//         label: "FAST",
//         endpoint: "/api/v1/mode/fast",
//         color: "blue",
//         modeTag: "fastModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-SLOW",
//         endpoint: "/api/v1/mode/fasl",
//         color: "blue",
//         modeTag: "fastSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-INPHASE-SLOW",
//         endpoint: "/api/v1/mode/fainsl",
//         color: "blue",
//         modeTag: "fastInPhaseSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "PARALLEL",
//         endpoint: "/api/v1/mode/parallel",
//         color: "blue",
//         modeTag: "parallelModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "SLOW",
//         endpoint: "/api/v1/mode/slow",
//         color: "blue",
//         modeTag: "slowModeSelected",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Live Transfer",
//     buttons: [
//       {
//         label: "Operate Breaker",
//         endpoint: "/api/v1/breaker/operate",
//         color: "orange",
//         type: "breaker",
//       },
//     ],
//   },
// ];

// export default function IntegratedDashboard() {
//   const [loading, setLoading] = useState(false);
//   const [logs, setLogs] = useState([]);
//   const [biData, setBiData] = useState([]);
//   const [modeData, setModeData] = useState([]);
//   const [sseStatus, setSseStatus] = useState("CONNECTING");
//   const [modeSseStatus, setModeSseStatus] = useState("CONNECTING");
//   const [activeCommand, setActiveCommand] = useState(null);
//   const [authError, setAuthError] = useState(false);
  
//   // Binary I/O States
//   const [biSignals, setBiSignals] = useState([]);
//   const [boSignals, setBoSignals] = useState([]);
//   const [binaryConnected, setBinaryConnected] = useState(false);
  
//   // Analog States
//   const [analogConnected, setAnalogConnected] = useState(false);
//   const [analogSignals, setAnalogSignals] = useState([]);
  
//   // Confirmation dialog state
//   const [confirmDialog, setConfirmDialog] = useState({
//     isOpen: false,
//     command: null,
//     endpoint: null,
//     buttonType: null,
//     label: null
//   });

//   const biDataRef = useRef([]);
//   const modeDataRef = useRef([]);
//   const evtSourceRef = useRef(null);
//   const modeEvtSourceRef = useRef(null);
//   const biBoSourceRef = useRef(null);
//   const analogSourceRef = useRef(null);
//   const reconnectTimeoutRef = useRef(null);
//   const modeReconnectTimeoutRef = useRef(null);
//   const binaryReconnectTimeoutRef = useRef(null);
//   const analogReconnectTimeoutRef = useRef(null);

//   // Track previous states to detect changes
//   const prevBiDataRef = useRef([]);
//   const prevModeDataRef = useRef([]);

//   // Helper function to get auth token
//   const getAuthToken = () => {
//     return localStorage.getItem("token") || sessionStorage.getItem("token");
//   };

//   // Helper function to check if user is authenticated
//   const isAuthenticated = () => {
//     return !!getAuthToken();
//   };

//   // Helper function to create headers with auth token
//   const getAuthHeaders = () => {
//     const token = getAuthToken();
//     return {
//       "Content-Type": "application/json",
//       ...(token ? { "Authorization": `Bearer ${token}` } : {})
//     };
//   };

//   /* ---------------- NAME MAPPING FUNCTIONS ---------------- */
//   const getAnalogDisplayName = (tag) => {
//     return ANALOG_SIGNAL_NAMES[tag] || tag;
//   };

//   const getBinaryInputDisplayName = (tag) => {
//     return BINARY_INPUT_NAMES[tag] || tag;
//   };

//   const getBinaryOutputDisplayName = (tag) => {
//     return BINARY_OUTPUT_NAMES[tag] || tag;
//   };

//   /* ---------------- LOGGING ---------------- */
//   const addLog = (msg, type = "INFO") => {
//     const allowedTypes = [
//       "CMD",
//       "DIRECTION",
//       "BREAKER",
//       "SUCCESS",
//       "ERROR",
//       "MODE_CHANGE",
//       "STATUS_CHANGE",
//       "CONNECTION",
//       "AUTH_ERROR",
//       "CONFIRMATION",
//     ];

//     if (!allowedTypes.includes(type)) {
//       return;
//     }

//     const timestamp = new Date().toLocaleTimeString();
//     setLogs((prev) => [{ timestamp, msg, type }, ...prev].slice(0, 50));
//   };

//   /* ---------------- CONFIRMATION DIALOG ---------------- */
//   const openConfirmDialog = (label, endpoint, buttonType) => {
//     setConfirmDialog({
//       isOpen: true,
//       command: label,
//       endpoint: endpoint,
//       buttonType: buttonType,
//       label: label
//     });
//   };

//   const closeConfirmDialog = () => {
//     setConfirmDialog({
//       isOpen: false,
//       command: null,
//       endpoint: null,
//       buttonType: null,
//       label: null
//     });
//   };

//   const handleConfirm = () => {
//     const { label, endpoint, buttonType } = confirmDialog;
//     addLog(`Command confirmed: ${label}`, "CONFIRMATION");
//     closeConfirmDialog();
//     executeCommand(label, endpoint, buttonType);
//   };

//   const handleCancel = () => {
//     if (confirmDialog.label) {
//       addLog(`Command cancelled: ${confirmDialog.label}`, "CONFIRMATION");
//     }
//     closeConfirmDialog();
//   };

//   /* ---------------- CONTROL CALL (INDEPENDENT OPERATIONS) ---------------- */
//   const executeCommand = async (label, endpoint, buttonType = "immediate") => {
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }

//     try {
//       setLoading(true);
//       setActiveCommand(label);
//       addLog(`${label}`, "CMD");

//       const headers = getAuthHeaders();

//       if (buttonType === "direction") {
//         addLog(`Setting direction: ${label}`, "DIRECTION");
        
//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Direction setup failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Direction set: ${label}`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       if (buttonType === "breaker") {
//         addLog(`Operating breaker`, "BREAKER");

//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Breaker operation failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Breaker operation completed`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: headers,
//       });

//       if (res.status === 401 || res.status === 403) {
//         throw new Error("Authentication failed. Please log in again.");
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Operation failed");

//       addLog(`${label} successful`, "SUCCESS");
//     } catch (err) {
//       addLog(`${label} failed: ${err.message}`, "ERROR");
//       if (err.message.includes("Authentication failed")) {
//         setAuthError(true);
//         setTimeout(() => setAuthError(false), 3000);
//       }
//     } finally {
//       setLoading(false);
//       setTimeout(() => setActiveCommand(null), 1000);
//     }
//   };

//   const callApi = (label, endpoint, buttonType = "immediate") => {
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }
//     openConfirmDialog(label, endpoint, buttonType);
//   };

//   /* ---------------- SSE LIVE DATA ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectSSE = () => {
//       try {
//         if (evtSourceRef.current) {
//           evtSourceRef.current.close();
//           evtSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         const url = token 
//           ? `${API_BASE}/api/v1/stream/bi-available?token=${token}`
//           : `${API_BASE}/api/v1/stream/bi-available`;

//         evtSourceRef.current = new EventSource(url);

//         evtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setSseStatus("CONNECTED");
//         };

//         evtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             if (parsed.bi && Array.isArray(parsed.bi)) {
//               const transformedData = parsed.bi.map((item) => ({
//                 tag: item.tag,
//                 value: item.value,
//                 description: getBinaryInputDisplayName(item.tag),
//               }));

//               if (prevBiDataRef.current.length > 0) {
//                 const changedItems = [];
//                 transformedData.forEach((item, index) => {
//                   if (index < prevBiDataRef.current.length) {
//                     const prevItem = prevBiDataRef.current[index];
//                     if (prevItem && prevItem.value !== item.value) {
//                       changedItems.push(item);
//                     }
//                   }
//                 });

//                 if (changedItems.length > 0) {
//                   changedItems.forEach((item) => {
//                     const statusText =
//                       item.tag === "bts_not_ready"
//                         ? item.value
//                           ? "NOT READY"
//                           : "READY"
//                         : item.value
//                           ? "AVAILABLE"
//                           : "UNAVAILABLE";
//                     addLog(
//                       `${getBinaryInputDisplayName(item.tag)}: ${statusText}`,
//                       "STATUS_CHANGE",
//                     );
//                   });
//                 }
//               }

//               biDataRef.current = transformedData;
//               setBiData(transformedData);
//               prevBiDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("SSE parse error:", err);
//           }
//         };

//         evtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setSseStatus("DISCONNECTED");

//           if (evtSourceRef.current) {
//             evtSourceRef.current.close();
//             evtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(reconnectTimeoutRef.current);
//             reconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setSseStatus("RECONNECTING");
//                 connectSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("SSE connection error:", err);
//         if (isMounted) {
//           setSseStatus("ERROR");

//           clearTimeout(reconnectTimeoutRef.current);
//           reconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setSseStatus("RECONNECTING");
//               connectSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectSSE();

//     return () => {
//       isMounted = false;

//       if (evtSourceRef.current) {
//         evtSourceRef.current.close();
//         evtSourceRef.current = null;
//       }

//       if (reconnectTimeoutRef.current) {
//         clearTimeout(reconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- MODE SELECTION SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectModeSSE = () => {
//       try {
//         if (modeEvtSourceRef.current) {
//           modeEvtSourceRef.current.close();
//           modeEvtSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         const url = token
//           ? `${API_BASE}/api/v1/stream/mode-selected?token=${token}`
//           : `${API_BASE}/api/v1/stream/mode-selected`;

//         modeEvtSourceRef.current = new EventSource(url);

//         modeEvtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setModeSseStatus("CONNECTED");
//         };

//         modeEvtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             let modeArray = [];

//             if (parsed.bo && Array.isArray(parsed.bo)) {
//               modeArray = parsed.bo;
//             } else if (parsed.data && Array.isArray(parsed.data)) {
//               modeArray = parsed.data;
//             } else if (Array.isArray(parsed)) {
//               modeArray = parsed;
//             }

//             if (modeArray.length > 0) {
//               const transformedData = modeArray.map((item) => ({
//                 tag: item.tag || item.name || item.address,
//                 value: item.value,
//                 address: item.address || item.tag || "N/A",
//                 description: getBinaryOutputDisplayName(
//                   item.tag || item.name || item.address,
//                 ),
//               }));

//               if (prevModeDataRef.current.length > 0) {
//                 const prevActiveMode = prevModeDataRef.current.find(
//                   (item) => item.value === true,
//                 );
//                 const currentActiveMode = transformedData.find(
//                   (item) => item.value === true,
//                 );

//                 if (
//                   prevActiveMode &&
//                   currentActiveMode &&
//                   prevActiveMode.tag !== currentActiveMode.tag
//                 ) {
//                   addLog(
//                     `Mode changed from ${prevActiveMode.description} to ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (!prevActiveMode && currentActiveMode) {
//                   addLog(
//                     `Mode selected: ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (prevActiveMode && !currentActiveMode) {
//                   addLog(
//                     `Mode deselected: ${prevActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 }
//               }

//               modeDataRef.current = transformedData;
//               setModeData(transformedData);
//               prevModeDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("Mode SSE parse error:", err);
//           }
//         };

//         modeEvtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setModeSseStatus("DISCONNECTED");

//           if (modeEvtSourceRef.current) {
//             modeEvtSourceRef.current.close();
//             modeEvtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(modeReconnectTimeoutRef.current);
//             modeReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setModeSseStatus("RECONNECTING");
//                 connectModeSSE();
//               }
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("Mode SSE connection error:", err);
//         if (isMounted) {
//           setModeSseStatus("ERROR");

//           clearTimeout(modeReconnectTimeoutRef.current);
//           modeReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setModeSseStatus("RECONNECTING");
//               connectModeSSE();
//             }
//           }, 1000);
//         }
//       }
//     };

//     connectModeSSE();

//     return () => {
//       isMounted = false;

//       if (modeEvtSourceRef.current) {
//         modeEvtSourceRef.current.close();
//         modeEvtSourceRef.current = null;
//       }

//       if (modeReconnectTimeoutRef.current) {
//         clearTimeout(modeReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- BINARY I/O SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectBinarySSE = () => {
//       try {
//         if (biBoSourceRef.current) {
//           biBoSourceRef.current.close();
//           biBoSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           setBinaryConnected(false);
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/bi-bo?token=${token}`;
//         biBoSourceRef.current = new EventSource(url);

//         biBoSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setBinaryConnected(true);
//         };

//         biBoSourceRef.current.onerror = () => {
//           if (!isMounted) return;
//           setBinaryConnected(false);
          
//           if (biBoSourceRef.current && biBoSourceRef.current.readyState === EventSource.CLOSED) {
//             setAuthError(true);
//           }
          
//           if (isMounted) {
//             clearTimeout(binaryReconnectTimeoutRef.current);
//             binaryReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 connectBinarySSE();
//               }
//             }, 3000);
//           }
//         };

//         biBoSourceRef.current.onmessage = (e) => {
//           try {
//             const data = JSON.parse(e.data);
            
//             // Debug: Log the raw data to see what's coming from the API
//             console.log("Binary SSE Data:", data);
            
//             // Handle different possible data structures
//             if (data.bi && Array.isArray(data.bi)) {
//               console.log("BI Signals:", data.bi);
//               setBiSignals(data.bi);
//             } else if (data.inputs && Array.isArray(data.inputs)) {
//               console.log("Inputs Signals:", data.inputs);
//               setBiSignals(data.inputs);
//             } else if (data.data && Array.isArray(data.data)) {
//               // Try to separate inputs and outputs based on address or type
//               const inputs = data.data.filter(item => 
//                 item.address?.includes('I') || item.type === 'input'
//               );
//               const outputs = data.data.filter(item => 
//                 item.address?.includes('O') || item.type === 'output'
//               );
              
//               if (inputs.length > 0) {
//                 console.log("Filtered Inputs:", inputs);
//                 setBiSignals(inputs);
//               }
//               if (outputs.length > 0) {
//                 console.log("Filtered Outputs:", outputs);
//                 setBoSignals(outputs);
//               }
//             }
            
//             if (data.bo && Array.isArray(data.bo)) {
//               console.log("BO Signals:", data.bo);
//               setBoSignals(data.bo);
//             } else if (data.outputs && Array.isArray(data.outputs)) {
//               console.log("Outputs Signals:", data.outputs);
//               setBoSignals(data.outputs);
//             }
//           } catch (err) {
//             console.error("Binary SSE parse error:", err);
//           }
//         };
//       } catch (err) {
//         console.error("Binary SSE connection error:", err);
//         if (isMounted) {
//           setBinaryConnected(false);
          
//           clearTimeout(binaryReconnectTimeoutRef.current);
//           binaryReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectBinarySSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectBinarySSE();
//     }

//     return () => {
//       isMounted = false;
//       if (biBoSourceRef.current) {
//         biBoSourceRef.current.close();
//         biBoSourceRef.current = null;
//       }
//       if (binaryReconnectTimeoutRef.current) {
//         clearTimeout(binaryReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- ANALOG SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectAnalogSSE = () => {
//       try {
//         if (analogSourceRef.current) {
//           analogSourceRef.current.close();
//           analogSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           setAnalogConnected(false);
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/analog?token=${token}`;
//         analogSourceRef.current = new EventSource(url);

//         analogSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setAnalogConnected(true);
//         };

//         analogSourceRef.current.onerror = () => {
//           if (!isMounted) return;
//           setAnalogConnected(false);
          
//           if (isMounted) {
//             clearTimeout(analogReconnectTimeoutRef.current);
//             analogReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 connectAnalogSSE();
//               }
//             }, 3000);
//           }
//         };

//         analogSourceRef.current.onmessage = (e) => {
//           try {
//             const data = JSON.parse(e.data);
            
//             if (data.analog && Array.isArray(data.analog)) {
//               setAnalogSignals(data.analog);
//             }
//           } catch (err) {
//             console.error("Analog SSE parse error:", err);
//           }
//         };
//       } catch (err) {
//         console.error("Analog SSE connection error:", err);
//         if (isMounted) {
//           setAnalogConnected(false);
          
//           clearTimeout(analogReconnectTimeoutRef.current);
//           analogReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectAnalogSSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectAnalogSSE();
//     }

//     return () => {
//       isMounted = false;
//       if (analogSourceRef.current) {
//         analogSourceRef.current.close();
//         analogSourceRef.current = null;
//       }
//       if (analogReconnectTimeoutRef.current) {
//         clearTimeout(analogReconnectTimeoutRef.current);
//       }
//     };
//   }, []);

//   /* ---------------- HELPER FUNCTIONS ---------------- */
//   const getModeDescription = (tag) => {
//     const descriptions = {
//       fastModeSelected: "Fast Mode",
//       fastSlowModeSelected: "Fast-Slow Mode",
//       fastInPhaseSlowModeSelected: "Fast In-Phase Slow Mode",
//       parallelModeSelected: "Parallel Mode",
//       slowModeSelected: "Slow Mode",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getDirectionDescription = (tag) => {
//     const descriptions = {
//       b1_s1_available: "BusA to Src1",
//       b1_s2_available: "BusA to Src2",
//       b2_s1_available: "BusB to Src1",
//       b2_s2_available: "BusB to Src2",
//       b1_2_to_s1_available: "BusA&B to Src1",
//       b1_2_to_s2_available: "BusA&B to Src2",
//       bts_not_ready: "BTS Ready Status",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getActiveMode = () => {
//     const activeMode = modeData.find((item) => item.value === true);
//     return activeMode ? activeMode.description : "No Mode Selected";
//   };

//   const getBTSReadyStatus = () => {
//     const btsNotReady = biData.find((item) => item.tag === "bts_not_ready");
//     return btsNotReady ? !btsNotReady.value : false;
//   };

//   const getDirectionAvailability = (directionTag) => {
//     if (!directionTag) return false;
//     const direction = biData.find((item) => item.tag === directionTag);
//     return direction ? direction.value : false;
//   };

//   const getModeActiveStatus = (modeTag) => {
//     if (!modeTag) return false;
//     const mode = modeData.find((item) => item.tag === modeTag);
//     return mode ? mode.value : false;
//   };

//   const clearLogs = () => {
//     setLogs([]);
//   };

//   // Binary I/O Helper functions
//   const getSignalAddress = (signal) => {
//     return signal.address || signal.addr || 'N/A';
//   };

//   // Light theme color classes
//   const colorClasses = {
//     green: "bg-green-500 border-green-600 hover:bg-green-600 hover:border-green-700 text-white text-xs px-2 py-1.5",
//     red: "bg-red-500 border-red-600 hover:bg-red-600 hover:border-red-700 text-white text-xs px-2 py-1.5",
//     yellow: "bg-yellow-400 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 text-white text-xs px-2 py-1.5",
//     blue: "bg-[#0AC4E0] border-[#0A8B9F] hover:bg-[#0A8B9F] hover:border-[#0A6B7F] text-white text-xs px-2 py-1.5",
//     purple: "bg-purple-500 border-purple-600 hover:bg-purple-600 hover:border-purple-700 text-white text-xs px-2 py-1.5",
//     gray: "bg-gray-600 border-gray-700 hover:bg-gray-700 hover:border-gray-800 text-white text-xs px-2 py-1.5",
//     orange: "bg-orange-400 border-orange-500 hover:bg-orange-500 hover:border-orange-600 text-white text-xs px-2 py-1.5",
//   };

//   const getDirectionClass = (available) => {
//     if (available) {
//       return "bg-green-100 border-[#0AC4E0] hover:bg-green-200 text-gray-800 text-xs px-2 py-1.5";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
//   };

//   const getModeActiveClass = (active) => {
//     if (active) {
//       return "bg-purple-100 border-[#0AC4E0] hover:bg-purple-200 text-gray-800 text-xs px-2 py-1.5";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
//   };

//   const bgClass = "bg-gray-100";
//   const textClass = "text-gray-800";
//   const cardBgClass = "bg-white";
//   const cardBorderClass = "border-gray-300";

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-2`}>
//       {/* Header with Auth Status */}
//       <div className="mb-2 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <div className={`w-2 h-2 rounded-full ${isAuthenticated() ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//           <h1 className="text-sm font-bold">INDUSTRIAL CONTROL DASHBOARD</h1>
//         </div>
//         {!isAuthenticated() && (
//           <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded border border-red-300">
//             UNAUTHENTICATED
//           </div>
//         )}
//       </div>

//       {/* Auth Error Message */}
//       {authError && (
//         <div className="mb-2 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-600">
//           <div className="flex items-center">
//             <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             <span>Authentication failed. Please log in again.</span>
//           </div>
//         </div>
//       )}

//       {/* Four Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
//         {/* COLUMN 1: ANALOG SIGNALS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">ANALOG SIGNALS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${analogConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{analogConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : analogSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No analog data
//               </div>
//             ) : (
//               <div className="space-y-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {analogSignals.map((signal, idx) => {
//                   const displayName = getAnalogDisplayName(signal.tag);
//                   return (
//                     <div 
//                       key={idx}
//                       className="p-1.5 bg-gray-50 rounded border border-gray-200 hover:border-[#0AC4E0] transition-all"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex-1 min-w-0">
//                           {/* Custom display name from mapping */}
//                           <div className="text-[10px] font-medium truncate" title={displayName}>
//                             {displayName}
//                           </div>
//                           <div className="text-[7px] text-gray-500 font-mono truncate">
//                             {signal.address || 'N/A'} | {signal.tag}
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-1.5">
//                           <div className={`w-2 h-2 rounded-full ${signal.value !== null && signal.value > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                           <div className="text-xs font-bold font-mono text-[#0AC4E0]">
//                             {signal.value !== null ? signal.value.toFixed(2) : '--'}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 2: BINARY INPUTS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">BINARY INPUTS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : biSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No input signals
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {biSignals.map((signal) => {
//                   const displayName = getBinaryInputDisplayName(signal.tag);
//                   return (
//                     <div
//                       key={signal.address || signal.tag || Math.random()}
//                       className={`p-1.5 rounded border transition-all ${
//                         signal.value 
//                           ? 'bg-[#0AC4E0]/10 border-[#0AC4E0]' 
//                           : 'bg-gray-50 border-gray-200'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         {/* Custom display name from mapping */}
//                         <div className="text-[9px] font-medium truncate max-w-[70px]" title={displayName}>
//                           {displayName}
//                         </div>
//                         <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                       </div>
//                       <div className="flex items-center justify-between mt-0.5">
//                         <div className="text-[6px] text-gray-500 font-mono truncate">
//                           {getSignalAddress(signal)}
//                         </div>
//                         <div className={`text-[9px] font-bold ${signal.value ? 'text-[#0AC4E0]' : 'text-gray-500'}`}>
//                           {signal.value ? '1' : '0'}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 3: BINARY OUTPUTS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">BINARY OUTPUTS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : boSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No output signals
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {boSignals.map((signal) => {
//                   const displayName = getBinaryOutputDisplayName(signal.tag);
//                   return (
//                     <div
//                       key={signal.address || signal.tag || Math.random()}
//                       className={`p-1.5 rounded border transition-all ${
//                         signal.value 
//                           ? 'bg-purple-100 border-purple-400' 
//                           : 'bg-gray-50 border-gray-200'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         {/* Custom display name from mapping */}
//                         <div className="text-[9px] font-medium truncate max-w-[70px]" title={displayName}>
//                           {displayName}
//                         </div>
//                         <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-purple-500' : 'bg-gray-400'}`}></div>
//                       </div>
//                       <div className="flex items-center justify-between mt-0.5">
//                         <div className="text-[6px] text-gray-500 font-mono truncate">
//                           {getSignalAddress(signal)}
//                         </div>
//                         <div className={`text-[9px] font-bold ${signal.value ? 'text-purple-600' : 'text-gray-500'}`}>
//                           {signal.value ? '1' : '0'}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 4: CONTROL PANEL (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">CONTROL PANEL</h2>
//               <div className="flex items-center space-x-2">
//                 <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
//                 <span className="text-[9px] text-gray-600">{loading ? 'BUSY' : 'READY'}</span>
//               </div>
//             </div>

//             {/* Quick Status */}
//             <div className="grid grid-cols-2 gap-1 mb-2">
//               <div className="p-1 bg-gray-50 rounded border border-gray-200">
//                 <div className="text-[7px] text-gray-500">ACTIVE MODE</div>
//                 <div className="text-[9px] font-bold truncate">{getActiveMode()}</div>
//               </div>
//               <div className="p-1 bg-gray-50 rounded border border-gray-200">
//                 <div className="text-[7px] text-gray-500">ANALOG</div>
//                 <div className={`text-[9px] font-bold ${getBTSReadyStatus() ? 'text-green-600' : 'text-red-600'}`}>
//                   {getBTSReadyStatus() ? 'CONNECTED' : 'NOT CONNECTED'}
//                 </div>
//               </div>
//             </div>

//             {/* Control Buttons */}
//             <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
//               {actions.map((section, idx) => (
//                 <div key={idx}>
//                   <h3 className="text-[9px] font-bold mb-1 text-gray-600">{section.title}</h3>
//                   <div className="grid grid-cols-2 gap-1">
//                     {section.buttons.map((btn, i) => {
//                       const isDirection = btn.type === "direction";
//                       const directionAvailable = isDirection
//                         ? getDirectionAvailability(btn.directionTag)
//                         : false;
//                       const modeActive = section.title === "Remote Mode"
//                         ? getModeActiveStatus(btn.modeTag)
//                         : false;

//                       return (
//                         <button
//                           key={i}
//                           disabled={loading || !isAuthenticated()}
//                           onClick={() => callApi(btn.label, btn.endpoint, btn.type)}
//                           className={`relative w-full rounded border text-[8px] font-medium p-1 transition-all disabled:opacity-50 ${
//                             isDirection 
//                               ? getDirectionClass(directionAvailable)
//                               : section.title === "Remote Mode"
//                                 ? getModeActiveClass(modeActive)
//                                 : colorClasses[btn.color]
//                           }`}
//                         >
//                           <span className="truncate block">{btn.label}</span>
//                           {(isDirection || section.title === "Remote Mode") && (
//                             <div className="absolute -top-1 -right-1">
//                               <div className={`w-1.5 h-1.5 rounded-full ${
//                                 isDirection 
//                                   ? directionAvailable ? 'bg-green-500' : 'bg-gray-400'
//                                   : modeActive ? 'bg-purple-500' : 'bg-gray-400'
//                               }`}></div>
//                             </div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Event Log */}
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-1">
//               <h3 className="text-[9px] font-bold uppercase">EVENT LOG</h3>
//               <button
//                 onClick={clearLogs}
//                 className="text-[7px] px-1 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
//               >
//                 Clear
//               </button>
//             </div>
//             <div className="h-20 overflow-y-auto text-[7px] font-mono space-y-1">
//               {logs.length === 0 ? (
//                 <div className="text-center text-gray-500 py-2">No events</div>
//               ) : (
//                 logs.map((log, i) => (
//                   <div key={i} className="p-1 bg-gray-50 rounded border border-gray-200">
//                     <span className="text-gray-500">[{log.timestamp}]</span>{' '}
//                     <span className={log.type === 'ERROR' ? 'text-red-600' : 'text-gray-700'}>
//                       {log.msg}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-2 pt-2 border-t border-gray-300">
//         <div className="flex justify-between text-[7px] text-gray-600">
//           <div className="flex space-x-2">
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span> ACTIVE</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1"></span> INACTIVE</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-[#0AC4E0] rounded-full mr-1"></span> INPUT</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span> OUTPUT</span>
//           </div>
//           <div>
//             <span>ANALOG: {analogSignals.length} • </span>
//             <span>IN: {biSignals.length} • </span>
//             <span>OUT: {boSignals.length} • </span>
//             <span>CTRL: {loading ? 'EXEC' : 'STDBY'}</span>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog */}
//       {confirmDialog.isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full border border-gray-300">
//             <div className="bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] p-3 rounded-t-xl">
//               <h3 className="text-white font-bold text-sm">Confirm Command</h3>
//             </div>
//             <div className="p-4">
//               <p className="text-xs text-gray-700 mb-2">Execute: <span className="font-bold text-[#0AC4E0]">{confirmDialog.command}</span></p>
//               <p className="text-[9px] text-gray-500 mb-3">This will send a command to the control system.</p>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={handleCancel}
//                   className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirm}
//                   className="px-3 py-1 text-xs bg-[#0AC4E0] hover:bg-[#0A8B9F] text-white rounded"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// final code ////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { useEffect, useState, useRef } from "react";

// const API_BASE = "https://mqtt-testing-2.onrender.com";

// /* ======================================================
//    SIGNAL NAME MAPPINGS - EDIT THESE TO RENAME DISPLAY NAMES
//    ====================================================== */

// // ===== ANALOG SIGNALS - Edit the text after the colon (:) =====
// const ANALOG_SIGNAL_NAMES = {
//   // Voltage signals
//   "IC1_LN_PT_V": "I/C-1 LINE PT VOLTAGE",
//   "BUS1_PT_V": "BUS-1 PT VOLTAGE",
//   "BUS2_PT_V": "BUS-2 PT VOLTAGE",
//   "IC2_LN_PT_V": "I/C-2 LINE PT VOLTAGE",
  
//   // Frequency signals
//   "IC1_LN_Freq": "I/C-1 LINE FREQUENCY",
//   "BUS1_Freq": "BUS-1 FREQUENCY",
//   "BUS2_Freq": "BUS-2 FREQUENCY",
//   "IC2_LN_Freq": "I/C-2 LINE FREQUENCY",
  
//   // Phase difference signals
//   "IC1_Ph_Diff": "I/C-1 PHASE DIFFERENCE",
//   "BC_Ph_Diff": "B/C PHASE DIFFERENCE",
//   "IC2_Ph_Diff": "I/C-2 PHASE DIFFERENCE",
// };

// // ===== BINARY INPUTS - Edit the text after the colon (:) =====
// const BINARY_INPUT_NAMES = {
//   // Test Transfer Status (0x8017)
//   "test_transfer": "TEST TRANSFER",
  
//   // Previous Transfer Status (0x8018)
//   "previous_transfer": "PREVIOUS TRANSFER",
  
//   // Selected States (0x8019 - 0x801e)
//   "b1_s1_selected": "B1 S1 SELECTED",
//   "b1_s2_selected": "B1 S2 SELECTED",
//   "b2_s2_selected": "B2 S2 SELECTED",
//   "b2_s1_selected": "B2 S1 SELECTED",
//   "b1_2_to_s1_selected": "B1+B2 TO S1 SELECTED",
//   "b1_2_to_s2_selected": "B1+B2 TO S2 SELECTED",
  
//   // Breaker Status (0x8021 - 0x8026)
//   "bkr1_closed": "BKR1 CLOSED",
//   "bkr2_closed": "BKR2 CLOSED",
//   "bkr3_closed": "BKR3 CLOSED",
//   "bkr1_open": "BKR1 OPEN",
//   "bkr2_open": "BKR2 OPEN",
//   "bkr3_open": "BKR3 OPEN",
  
//   // Trip/Close Fail Status (0x8027 - 0x802c)
//   "ic1_trip_fail": "IC1 TRIP FAIL",
//   "ic1_close_fail": "IC1 CLOSE FAIL",
//   "bc_trip_fail": "BC TRIP FAIL",
//   "bc_close_fail": "BC CLOSE FAIL",
//   "ic2_trip_fail": "IC2 TRIP FAIL",
//   "ic2_close_fail": "IC2 CLOSE FAIL",
  
//   // Availability Status (0x802d - 0x8031) - THESE ARE CRITICAL FOR DIRECTION BUTTONS
//   "b1_s1_available": "B1 S1 AVAILABLE",
//   "b1_s2_available": "B1 S2 AVAILABLE",
//   "b2_s1_available": "B2 S1 AVAILABLE",
//   "b2_s2_available": "B2 S2 AVAILABLE",
//   "b1_2_to_s1_available": "B1+B2 TO S1 AVAILABLE",
//   "b1_2_to_s2_available": "B1+B2 TO S2 AVAILABLE",
  
//   // IC1 Trip/Close Commands (0x8031 - 0x8032)
//   "ic1_trip": "IC1 TRIP",
//   "ic1_close": "IC1 CLOSE",
  
//   // BC Trip/Close (0x8033 - 0x8034)
//   "bc_trip": "BC TRIP",
//   "bc_close": "BC CLOSE",
  
//   // IC2 Trip/Close (0x8035 - 0x8036)
//   "ic2_trip": "IC2 TRIP",
//   "ic2_close": "IC2 CLOSE",
  
//   // Motor/Supply Status (0x8037 - 0x8039, 0x8D37 - 0x8D39)
//   "bus1_motor": "BUS1 MOTOR",
//   "bus2_motor": "BUS2 MOTOR",
//   "closing_supply": "CLOSING SUPPLY",
  
//   // Test Mode (0x804a, 0x8D3a)
//   "test_mode": "TEST MODE",
  
//   // Auto Protection (0x8D3b)
//   "auto_protection": "AUTO PROTECTION",
  
//   // Mode Selections (0x8D3c - 0x8D3f, 0x9001)
//   "fast_mode": "FAST MODE",
//   "fast_slow_mode": "FAST SLOW MODE",
//   "fast_in_phase_mode": "FAST IN PHASE MODE",
//   "slow_mode": "SLOW MODE",
//   "parallel_mode": "PARALLEL MODE",
  
//   // BTS Status
//   "bts_not_ready": "BTS NOT READY",
//   "bts_ready": "BTS READY",
//   "bts_blocked": "BTS BLOCKED",
//   "bts_not_blocked": "BTS NOT BLOCKED",
  
//   // Source 1 Status
//   "src1_not_healthy": "SRC-1 NOT HEALTHY",
//   "src1_healthy": "SRC-1 HEALTHY",
  
//   // I/C-1 Breaker
//   "ic1_bkr_on": "I/C-1 BKR ON",
//   "ic1_bkr_off": "I/C-1 BKR OFF",
  
//   // B/C Breaker
//   "bc_bkr_on": "B/C BKR ON",
//   "bc_bkr_off": "B/C BKR OFF",
  
//   // I/C-2 Breaker
//   "ic2_bkr_on": "I/C-2 BKR ON",
//   "ic2_bkr_off": "I/C-2 BKR OFF",
  
//   // Source 2 Status
//   "src2_not_healthy": "SRC-2 NOT HEALTHY",
//   "src2_healthy": "SRC-2 HEALTHY",
  
//   // Fast Transfer Status
//   "fast_transfer_condition_ok": "FAST TRANSFER CONDITION OK",
//   "fast_transfer_bus_healthy": "FAST TRANSFER BUS HEALTHY",
//   "new_source_bus_delta_phase_ok": "NEW SOURCE BUS Δ PHASE OK",
//   "new_source_bus_delta_volt_ok": "NEW SOURCE BUS Δ VOLT OK",
  
//   // ANSI Status
//   "ansi_c50_41_vf_ok": "ANSI C50.41 (V/F) OK",
  
//   // I/C-1 Breaker Ready
//   "ic1_bkr_not_ready": "I/C-1 BKR NOT READY",
//   "ic1_bkr_ready": "I/C-1 BKR READY",
  
//   // B/C Breaker Ready
//   "bc_bkr_not_ready": "B/C BKR NOT READY",
//   "bc_bkr_ready": "B/C BKR READY",
  
//   // I/C-2 Breaker Ready
//   "ic2_bkr_not_ready": "I/C-2 BKR NOT READY",
//   "ic2_bkr_ready": "I/C-2 BKR READY",
  
//   // Operation Status
//   "bkr_operation_fail": "BKR OPERATION FAIL",
//   "bkr_operation_healthy": "BKR OPER. HEALTHY",
//   "previous_txr_fail": "PREVIOUS TXR. FAIL",
//   "previous_txr_ok": "PREVIOUS TXR. OK",
  
//   // Auxiliaries
//   "auxiliaries_trip": "AUXILIARIES TRIP",
  
//   // Test Transfer
//   "test_transfer_fail": "TEST TRANSFER FAIL",
//   "test_transfer_ok": "TEST TRANSFER OK",
  
//   // Alarm
//   "alarm": "ALARM",
// };

// // ===== BINARY OUTPUTS - Edit the text after the colon (:) =====
// const BINARY_OUTPUT_NAMES = {
//   "bts_out": "BTS OUT",
//   "bts_in": "BTS IN",
//   "fast_mode": "FAST MODE",
//   "fast_inphase_slow_mode": "FAST INPHASE SLOW MODE",
//   "fast_slow_mode": "FAST SLOW MODE",
//   "slow_mode": "SLOW MODE",
//   "momentary_parallel_mode": "MOMENTARY PARALLELING MODE",
//   "bus_a_to_src1": "BUS A => SRC-1",
//   "bus_a_to_src2": "BUS A => SRC-2",
//   "bus_b_to_src1": "BUS B => SRC-1",
//   "bus_b_to_src2": "BUS B => SRC-2",
//   "bus_ab_to_src1": "BUS A+B => SRC-1",
//   "bus_ab_to_src2": "BUS A+B => SRC-2",
// };

// /* ======================================================
//    DATA STRUCTURES - Control Panel Buttons
//    ====================================================== */
// const actions = [
//   {
//     title: "BTS Control",
//     buttons: [
//       {
//         label: "BTS IN",
//         endpoint: "/api/v1/bts/in",
//         color: "green",
//         type: "immediate",
//       },
//       {
//         label: "BTS OUT",
//         endpoint: "/api/v1/bts/out",
//         color: "red",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "BTS Reset",
//     buttons: [
//       {
//         label: "BTS RESET",
//         endpoint: "/api/v1/reset-bts",
//         color: "yellow",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Remote Test",
//     buttons: [
//       {
//         label: "Remote Test IN",
//         endpoint: "/api/v1/remote-test/in",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test OUT",
//         endpoint: "/api/v1/remote-test/out",
//         color: "blue",
//         type: "immediate",
//       },
//       {
//         label: "Remote Test Transfer",
//         endpoint: "/api/v1/remote-test/transfer",
//         color: "purple",
//         type: "immediate",
//       },
//     ],
//   },
//   // {
//   //   title: "IC1 Control",
//   //   buttons: [
//   //     {
//   //       label: "IC1 TRIP",
//   //       endpoint: "/api/v1/ic1/trip",
//   //       color: "red",
//   //       type: "immediate",
//   //     },
//   //     {
//   //       label: "IC1 CLOSE",
//   //       endpoint: "/api/v1/ic1/close",
//   //       color: "green",
//   //       type: "immediate",
//   //     },
//   //   ],
//   // },
//   // {
//   //   title: "BC Control",
//   //   buttons: [
//   //     {
//   //       label: "BC TRIP",
//   //       endpoint: "/api/v1/bc/trip",
//   //       color: "red",
//   //       type: "immediate",
//   //     },
//   //     {
//   //       label: "BC CLOSE",
//   //       endpoint: "/api/v1/bc/close",
//   //       color: "green",
//   //       type: "immediate",
//   //     },
//   //   ],
//   // },
//   // {
//   //   title: "IC2 Control",
//   //   buttons: [
//   //     {
//   //       label: "IC2 TRIP",
//   //       endpoint: "/api/v1/ic2/trip",
//   //       color: "red",
//   //       type: "immediate",
//   //     },
//   //     {
//   //       label: "IC2 CLOSE",
//   //       endpoint: "/api/v1/ic2/close",
//   //       color: "green",
//   //       type: "immediate",
//   //     },
//   //   ],
//   // },
//   {
//     title: "Bus to Source",
//     buttons: [
//       {
//         label: "BusA to Src1",
//         endpoint: "/api/v1/bus1/source1",
//         color: "gray",
//         directionTag: "b1_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA to Src2",
//         endpoint: "/api/v1/bus1/source2",
//         color: "gray",
//         directionTag: "b1_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src1",
//         endpoint: "/api/v1/bus2/source1",
//         color: "gray",
//         directionTag: "b2_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusB to Src2",
//         endpoint: "/api/v1/bus2/source2",
//         color: "gray",
//         directionTag: "b2_s2_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src1",
//         endpoint: "/api/v1/bus12/source1",
//         color: "gray",
//         directionTag: "b1_2_to_s1_available",
//         type: "direction",
//       },
//       {
//         label: "BusA & B to Src2",
//         endpoint: "/api/v1/bus12/source2",
//         color: "gray",
//         directionTag: "b1_2_to_s2_available",
//         type: "direction",
//       },
//     ],
//   },
//   {
//     title: "Remote Mode",
//     buttons: [
//       {
//         label: "FAST",
//         endpoint: "/api/v1/mode/fast",
//         color: "blue",
//         modeTag: "fastModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-SLOW",
//         endpoint: "/api/v1/mode/fasl",
//         color: "blue",
//         modeTag: "fastSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "FAST-INPHASE-SLOW",
//         endpoint: "/api/v1/mode/fainsl",
//         color: "blue",
//         modeTag: "fastInPhaseSlowModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "PARALLEL",
//         endpoint: "/api/v1/mode/parallel",
//         color: "blue",
//         modeTag: "parallelModeSelected",
//         type: "immediate",
//       },
//       {
//         label: "SLOW",
//         endpoint: "/api/v1/mode/slow",
//         color: "blue",
//         modeTag: "slowModeSelected",
//         type: "immediate",
//       },
//     ],
//   },
//   {
//     title: "Live Transfer",
//     buttons: [
//       {
//         label: "Operate Breaker",
//         endpoint: "/api/v1/breaker/operate",
//         color: "orange",
//         type: "breaker",
//       },
//     ],
//   },
// ];

// export default function IntegratedDashboard() {
//   const [loading, setLoading] = useState(false);
//   const [logs, setLogs] = useState([]);
//   const [biData, setBiData] = useState([]);
//   const [modeData, setModeData] = useState([]);
//   const [sseStatus, setSseStatus] = useState("CONNECTING");
//   const [modeSseStatus, setModeSseStatus] = useState("CONNECTING");
//   const [activeCommand, setActiveCommand] = useState(null);
//   const [authError, setAuthError] = useState(false);
  
//   // Binary I/O States
//   const [biSignals, setBiSignals] = useState([]);
//   const [boSignals, setBoSignals] = useState([]);
//   const [binaryConnected, setBinaryConnected] = useState(false);
  
//   // Analog States
//   const [analogConnected, setAnalogConnected] = useState(false);
//   const [analogSignals, setAnalogSignals] = useState([]);
  
//   // Availability Data for Direction Buttons
//   const [availabilityData, setAvailabilityData] = useState({});
  
//   // Confirmation dialog state
//   const [confirmDialog, setConfirmDialog] = useState({
//     isOpen: false,
//     command: null,
//     endpoint: null,
//     buttonType: null,
//     label: null
//   });

//   const biDataRef = useRef([]);
//   const modeDataRef = useRef([]);
//   const evtSourceRef = useRef(null);
//   const modeEvtSourceRef = useRef(null);
//   const biBoSourceRef = useRef(null);
//   const analogSourceRef = useRef(null);
//   const availabilitySourceRef = useRef(null);
//   const reconnectTimeoutRef = useRef(null);
//   const modeReconnectTimeoutRef = useRef(null);
//   const binaryReconnectTimeoutRef = useRef(null);
//   const analogReconnectTimeoutRef = useRef(null);
//   const availabilityReconnectTimeoutRef = useRef(null);

//   // Track previous states to detect changes
//   const prevBiDataRef = useRef([]);
//   const prevModeDataRef = useRef([]);

//   // Helper function to get auth token
//   const getAuthToken = () => {
//     return localStorage.getItem("token") || sessionStorage.getItem("token");
//   };

//   // Helper function to check if user is authenticated
//   const isAuthenticated = () => {
//     return !!getAuthToken();
//   };

//   // Helper function to create headers with auth token
//   const getAuthHeaders = () => {
//     const token = getAuthToken();
//     return {
//       "Content-Type": "application/json",
//       ...(token ? { "Authorization": `Bearer ${token}` } : {})
//     };
//   };

//   /* ---------------- NAME MAPPING FUNCTIONS ---------------- */
//   const getAnalogDisplayName = (tag) => {
//     return ANALOG_SIGNAL_NAMES[tag] || tag;
//   };

//   const getBinaryInputDisplayName = (tag) => {
//     return BINARY_INPUT_NAMES[tag] || tag;
//   };

//   const getBinaryOutputDisplayName = (tag) => {
//     return BINARY_OUTPUT_NAMES[tag] || tag;
//   };

//   /* ---------------- LOGGING ---------------- */
//   const addLog = (msg, type = "INFO") => {
//     const allowedTypes = [
//       "CMD",
//       "DIRECTION",
//       "BREAKER",
//       "SUCCESS",
//       "ERROR",
//       "MODE_CHANGE",
//       "STATUS_CHANGE",
//       "CONNECTION",
//       "AUTH_ERROR",
//       "CONFIRMATION",
//     ];

//     if (!allowedTypes.includes(type)) {
//       return;
//     }

//     const timestamp = new Date().toLocaleTimeString();
//     setLogs((prev) => [{ timestamp, msg, type }, ...prev].slice(0, 50));
//   };

//   /* ---------------- CONFIRMATION DIALOG ---------------- */
//   const openConfirmDialog = (label, endpoint, buttonType) => {
//     setConfirmDialog({
//       isOpen: true,
//       command: label,
//       endpoint: endpoint,
//       buttonType: buttonType,
//       label: label
//     });
//   };

//   const closeConfirmDialog = () => {
//     setConfirmDialog({
//       isOpen: false,
//       command: null,
//       endpoint: null,
//       buttonType: null,
//       label: null
//     });
//   };

//   const handleConfirm = () => {
//     const { label, endpoint, buttonType } = confirmDialog;
//     addLog(`Command confirmed: ${label}`, "CONFIRMATION");
//     closeConfirmDialog();
//     executeCommand(label, endpoint, buttonType);
//   };

//   const handleCancel = () => {
//     if (confirmDialog.label) {
//       addLog(`Command cancelled: ${confirmDialog.label}`, "CONFIRMATION");
//     }
//     closeConfirmDialog();
//   };

//   /* ---------------- CONTROL CALL (INDEPENDENT OPERATIONS) ---------------- */
//   const executeCommand = async (label, endpoint, buttonType = "immediate") => {
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }

//     try {
//       setLoading(true);
//       setActiveCommand(label);
//       addLog(`${label}`, "CMD");

//       const headers = getAuthHeaders();

//       if (buttonType === "direction") {
//         addLog(`Setting direction: ${label}`, "DIRECTION");
        
//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Direction setup failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Direction set: ${label}`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       if (buttonType === "breaker") {
//         addLog(`Operating breaker`, "BREAKER");

//         const response = await fetch(`${API_BASE}${endpoint}`, {
//           method: "POST",
//           headers: headers,
//         });

//         if (response.status === 401 || response.status === 403) {
//           throw new Error("Authentication failed. Please log in again.");
//         }

//         if (!response.ok) {
//           throw new Error(`Breaker operation failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         addLog(`Breaker operation completed`, "SUCCESS");
//         setLoading(false);
//         setTimeout(() => setActiveCommand(null), 1000);
//         return;
//       }

//       const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: headers,
//       });

//       if (res.status === 401 || res.status === 403) {
//         throw new Error("Authentication failed. Please log in again.");
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Operation failed");

//       addLog(`${label} successful`, "SUCCESS");
//     } catch (err) {
//       addLog(`${label} failed: ${err.message}`, "ERROR");
//       if (err.message.includes("Authentication failed")) {
//         setAuthError(true);
//         setTimeout(() => setAuthError(false), 3000);
//       }
//     } finally {
//       setLoading(false);
//       setTimeout(() => setActiveCommand(null), 1000);
//     }
//   };

//   const callApi = (label, endpoint, buttonType = "immediate") => {
//     if (!isAuthenticated()) {
//       addLog("Authentication required. Please log in.", "AUTH_ERROR");
//       setAuthError(true);
//       setTimeout(() => setAuthError(false), 3000);
//       return;
//     }
//     openConfirmDialog(label, endpoint, buttonType);
//   };

//   /* ---------------- AVAILABILITY DATA SSE (FOR DIRECTION BUTTONS) ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectAvailabilitySSE = () => {
//       try {
//         if (availabilitySourceRef.current) {
//           availabilitySourceRef.current.close();
//           availabilitySourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/bi-available?token=${token}`;

//         availabilitySourceRef.current = new EventSource(url);

//         availabilitySourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           console.log("Availability SSE Connected");
//         };

//         availabilitySourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);
//             console.log("Availability Data:", parsed);

//             if (parsed.bi && Array.isArray(parsed.bi)) {
//               // Create a map of availability tags
//               const availabilityMap = {};
//               parsed.bi.forEach(item => {
//                 availabilityMap[item.tag] = item.value;
//               });
//               setAvailabilityData(availabilityMap);
              
//               // Also update biData for backward compatibility
//               const transformedData = parsed.bi.map((item) => ({
//                 tag: item.tag,
//                 value: item.value,
//                 description: getBinaryInputDisplayName(item.tag),
//               }));
//               setBiData(transformedData);
//             }
//           } catch (err) {
//             console.error("Availability SSE parse error:", err);
//           }
//         };

//         availabilitySourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           console.error("Availability SSE Error:", error);

//           if (availabilitySourceRef.current) {
//             availabilitySourceRef.current.close();
//             availabilitySourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(availabilityReconnectTimeoutRef.current);
//             availabilityReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 connectAvailabilitySSE();
//               }
//             }, 3000);
//           }
//         };
//       } catch (err) {
//         console.error("Availability SSE connection error:", err);
//         if (isMounted) {
//           clearTimeout(availabilityReconnectTimeoutRef.current);
//           availabilityReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectAvailabilitySSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectAvailabilitySSE();
//     }

//     return () => {
//       isMounted = false;
//       if (availabilitySourceRef.current) {
//         availabilitySourceRef.current.close();
//         availabilitySourceRef.current = null;
//       }
//       if (availabilityReconnectTimeoutRef.current) {
//         clearTimeout(availabilityReconnectTimeoutRef.current);
//       }
//     };
//   }, [isAuthenticated]);

//   /* ---------------- MODE SELECTION SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectModeSSE = () => {
//       try {
//         if (modeEvtSourceRef.current) {
//           modeEvtSourceRef.current.close();
//           modeEvtSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           setModeSseStatus("AUTH_ERROR");
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/mode-selected?token=${token}`;

//         modeEvtSourceRef.current = new EventSource(url);

//         modeEvtSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setModeSseStatus("CONNECTED");
//         };

//         modeEvtSourceRef.current.onmessage = (e) => {
//           if (!isMounted) return;
//           try {
//             const parsed = JSON.parse(e.data);

//             let modeArray = [];

//             if (parsed.bo && Array.isArray(parsed.bo)) {
//               modeArray = parsed.bo;
//             } else if (parsed.data && Array.isArray(parsed.data)) {
//               modeArray = parsed.data;
//             } else if (Array.isArray(parsed)) {
//               modeArray = parsed;
//             }

//             if (modeArray.length > 0) {
//               const transformedData = modeArray.map((item) => ({
//                 tag: item.tag || item.name || item.address,
//                 value: item.value,
//                 address: item.address || item.tag || "N/A",
//                 description: getBinaryOutputDisplayName(
//                   item.tag || item.name || item.address,
//                 ),
//               }));

//               if (prevModeDataRef.current.length > 0) {
//                 const prevActiveMode = prevModeDataRef.current.find(
//                   (item) => item.value === true,
//                 );
//                 const currentActiveMode = transformedData.find(
//                   (item) => item.value === true,
//                 );

//                 if (
//                   prevActiveMode &&
//                   currentActiveMode &&
//                   prevActiveMode.tag !== currentActiveMode.tag
//                 ) {
//                   addLog(
//                     `Mode changed from ${prevActiveMode.description} to ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (!prevActiveMode && currentActiveMode) {
//                   addLog(
//                     `Mode selected: ${currentActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 } else if (prevActiveMode && !currentActiveMode) {
//                   addLog(
//                     `Mode deselected: ${prevActiveMode.description}`,
//                     "MODE_CHANGE",
//                   );
//                 }
//               }

//               modeDataRef.current = transformedData;
//               setModeData(transformedData);
//               prevModeDataRef.current = transformedData;
//             }
//           } catch (err) {
//             console.error("Mode SSE parse error:", err);
//           }
//         };

//         modeEvtSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           setModeSseStatus("DISCONNECTED");

//           if (modeEvtSourceRef.current) {
//             modeEvtSourceRef.current.close();
//             modeEvtSourceRef.current = null;
//           }

//           if (isMounted) {
//             clearTimeout(modeReconnectTimeoutRef.current);
//             modeReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 setModeSseStatus("RECONNECTING");
//                 connectModeSSE();
//               }
//             }, 3000);
//           }
//         };
//       } catch (err) {
//         console.error("Mode SSE connection error:", err);
//         if (isMounted) {
//           setModeSseStatus("ERROR");

//           clearTimeout(modeReconnectTimeoutRef.current);
//           modeReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               setModeSseStatus("RECONNECTING");
//               connectModeSSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectModeSSE();
//     } else {
//       setModeSseStatus("AUTH_ERROR");
//     }

//     return () => {
//       isMounted = false;

//       if (modeEvtSourceRef.current) {
//         modeEvtSourceRef.current.close();
//         modeEvtSourceRef.current = null;
//       }

//       if (modeReconnectTimeoutRef.current) {
//         clearTimeout(modeReconnectTimeoutRef.current);
//       }
//     };
//   }, [isAuthenticated]);

//   /* ---------------- BINARY I/O SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectBinarySSE = () => {
//       try {
//         if (biBoSourceRef.current) {
//           biBoSourceRef.current.close();
//           biBoSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           setBinaryConnected(false);
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/bi-bo?token=${token}`;
//         biBoSourceRef.current = new EventSource(url);

//         biBoSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setBinaryConnected(true);
//         };

//         biBoSourceRef.current.onerror = () => {
//           if (!isMounted) return;
//           setBinaryConnected(false);
          
//           if (biBoSourceRef.current && biBoSourceRef.current.readyState === EventSource.CLOSED) {
//             setAuthError(true);
//           }
          
//           if (isMounted) {
//             clearTimeout(binaryReconnectTimeoutRef.current);
//             binaryReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 connectBinarySSE();
//               }
//             }, 3000);
//           }
//         };

//         biBoSourceRef.current.onmessage = (e) => {
//           try {
//             const data = JSON.parse(e.data);
            
//             // Debug: Log the raw data to see what's coming from the API
//             console.log("Binary SSE Data:", data);
            
//             // Handle different possible data structures
//             if (data.bi && Array.isArray(data.bi)) {
//               console.log("BI Signals:", data.bi);
//               setBiSignals(data.bi);
//             }
            
//             if (data.bo && Array.isArray(data.bo)) {
//               console.log("BO Signals:", data.bo);
//               setBoSignals(data.bo);
//             }
//           } catch (err) {
//             console.error("Binary SSE parse error:", err);
//           }
//         };
//       } catch (err) {
//         console.error("Binary SSE connection error:", err);
//         if (isMounted) {
//           setBinaryConnected(false);
          
//           clearTimeout(binaryReconnectTimeoutRef.current);
//           binaryReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectBinarySSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectBinarySSE();
//     }

//     return () => {
//       isMounted = false;
//       if (biBoSourceRef.current) {
//         biBoSourceRef.current.close();
//         biBoSourceRef.current = null;
//       }
//       if (binaryReconnectTimeoutRef.current) {
//         clearTimeout(binaryReconnectTimeoutRef.current);
//       }
//     };
//   }, [isAuthenticated]);

//   /* ---------------- ANALOG SSE ---------------- */
//   useEffect(() => {
//     let isMounted = true;

//     const connectAnalogSSE = () => {
//       try {
//         if (analogSourceRef.current) {
//           analogSourceRef.current.close();
//           analogSourceRef.current = null;
//         }

//         const token = getAuthToken();
//         if (!token) {
//           setAnalogConnected(false);
//           return;
//         }

//         const url = `${API_BASE}/api/v1/stream/analog?token=${token}`;
//         analogSourceRef.current = new EventSource(url);

//         analogSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setAnalogConnected(true);
//           console.log("Analog SSE Connected");
//         };

//         analogSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           console.error("Analog SSE Error:", error);
//           setAnalogConnected(false);
          
//           if (isMounted) {
//             clearTimeout(analogReconnectTimeoutRef.current);
//             analogReconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 console.log("Reconnecting Analog SSE...");
//                 connectAnalogSSE();
//               }
//             }, 3000);
//           }
//         };

//         analogSourceRef.current.onmessage = (e) => {
//           try {
//             const data = JSON.parse(e.data);
//             console.log("Analog Data Received:", data);
            
//             if (data.analog && Array.isArray(data.analog)) {
//               setAnalogSignals(data.analog);
//             }
//           } catch (err) {
//             console.error("Analog SSE parse error:", err);
//           }
//         };
//       } catch (err) {
//         console.error("Analog SSE connection error:", err);
//         if (isMounted) {
//           setAnalogConnected(false);
          
//           clearTimeout(analogReconnectTimeoutRef.current);
//           analogReconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectAnalogSSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     if (isAuthenticated()) {
//       connectAnalogSSE();
//     } else {
//       setAnalogConnected(false);
//     }

//     return () => {
//       isMounted = false;
//       if (analogSourceRef.current) {
//         analogSourceRef.current.close();
//         analogSourceRef.current = null;
//       }
//       if (analogReconnectTimeoutRef.current) {
//         clearTimeout(analogReconnectTimeoutRef.current);
//       }
//     };
//   }, [isAuthenticated]);

//   /* ---------------- HELPER FUNCTIONS ---------------- */
//   const getModeDescription = (tag) => {
//     const descriptions = {
//       fastModeSelected: "Fast Mode",
//       fastSlowModeSelected: "Fast-Slow Mode",
//       fastInPhaseSlowModeSelected: "Fast In-Phase Slow Mode",
//       parallelModeSelected: "Parallel Mode",
//       slowModeSelected: "Slow Mode",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getDirectionDescription = (tag) => {
//     const descriptions = {
//       b1_s1_available: "B1 S1 AVAILABLE",
//       b1_s2_available: "B1 S2 AVAILABLE",
//       b2_s1_available: "B2 S1 AVAILABLE",
//       b2_s2_available: "B2 S2 AVAILABLE",
//       b1_2_to_s1_available: "B1+B2 TO S1 AVAILABLE",
//       b1_2_to_s2_available: "B1+B2 TO S2 AVAILABLE",
//       bts_not_ready: "BTS NOT READY",
//     };
//     return descriptions[tag] || tag;
//   };

//   const getActiveMode = () => {
//     const activeMode = modeData.find((item) => item.value === true);
//     return activeMode ? activeMode.description : "No Mode Selected";
//   };

//   const getBTSReadyStatus = () => {
//     const btsNotReady = biData.find((item) => item.tag === "bts_not_ready");
//     return btsNotReady ? !btsNotReady.value : false;
//   };

//   // UPDATED: Use availabilityData for direction buttons
//   const getDirectionAvailability = (directionTag) => {
//     if (!directionTag) return false;
//     // Check in availabilityData first
//     if (availabilityData[directionTag] !== undefined) {
//       return availabilityData[directionTag];
//     }
//     // Fallback to biData
//     const direction = biData.find((item) => item.tag === directionTag);
//     return direction ? direction.value : false;
//   };

//   const getModeActiveStatus = (modeTag) => {
//     if (!modeTag) return false;
//     const mode = modeData.find((item) => item.tag === modeTag);
//     return mode ? mode.value : false;
//   };

//   const clearLogs = () => {
//     setLogs([]);
//   };

//   // Binary I/O Helper functions
//   const getSignalAddress = (signal) => {
//     return signal.address || signal.addr || 'N/A';
//   };

//   // Light theme color classes
//   const colorClasses = {
//     green: "bg-green-500 border-green-600 hover:bg-green-600 hover:border-green-700 text-white text-xs px-2 py-1.5",
//     red: "bg-red-500 border-red-600 hover:bg-red-600 hover:border-red-700 text-white text-xs px-2 py-1.5",
//     yellow: "bg-yellow-400 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 text-white text-xs px-2 py-1.5",
//     blue: "bg-[#0AC4E0] border-[#0A8B9F] hover:bg-[#0A8B9F] hover:border-[#0A6B7F] text-white text-xs px-2 py-1.5",
//     purple: "bg-purple-500 border-purple-600 hover:bg-purple-600 hover:border-purple-700 text-white text-xs px-2 py-1.5",
//     gray: "bg-gray-600 border-gray-700 hover:bg-gray-700 hover:border-gray-800 text-white text-xs px-2 py-1.5",
//     orange: "bg-orange-400 border-orange-500 hover:bg-orange-500 hover:border-orange-600 text-white text-xs px-2 py-1.5",
//   };

//   const getDirectionClass = (available) => {
//     if (available) {
//       return "bg-green-100 border-[#0AC4E0] hover:bg-green-200 text-gray-800 text-xs px-2 py-1.5";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
//   };

//   const getModeActiveClass = (active) => {
//     if (active) {
//       return "bg-purple-100 border-[#0AC4E0] hover:bg-purple-200 text-gray-800 text-xs px-2 py-1.5";
//     }
//     return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
//   };

//   const bgClass = "bg-gray-100";
//   const textClass = "text-gray-800";
//   const cardBgClass = "bg-white";
//   const cardBorderClass = "border-gray-300";

//   return (
//     <div className={`min-h-screen ${bgClass} ${textClass} p-2`}>
//       {/* Header with Auth Status */}
//       <div className="mb-2 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <div className={`w-2 h-2 rounded-full ${isAuthenticated() ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//           <h1 className="text-sm font-bold">INDUSTRIAL CONTROL DASHBOARD</h1>
//         </div>
//         {!isAuthenticated() && (
//           <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded border border-red-300">
//             UNAUTHENTICATED
//           </div>
//         )}
//       </div>

//       {/* Auth Error Message */}
//       {authError && (
//         <div className="mb-2 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-600">
//           <div className="flex items-center">
//             <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             <span>Authentication failed. Please log in again.</span>
//           </div>
//         </div>
//       )}

//       {/* Four Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
//         {/* COLUMN 1: ANALOG SIGNALS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">ANALOG SIGNALS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${analogConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{analogConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : analogSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 <div>No analog data</div>
//                 <div className="text-[8px] mt-1 text-gray-400">Waiting for data stream...</div>
//               </div>
//             ) : (
//               <div className="space-y-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {analogSignals.map((signal, idx) => {
//                   const displayName = getAnalogDisplayName(signal.tag);
//                   return (
//                     <div 
//                       key={idx}
//                       className="p-1.5 bg-gray-50 rounded border border-gray-200 hover:border-[#0AC4E0] transition-all"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex-1 min-w-0">
//                           {/* Custom display name from mapping */}
//                           <div className="text-[10px] font-medium truncate" title={displayName}>
//                             {displayName}
//                           </div>
//                           <div className="text-[7px] text-gray-500 font-mono truncate">
//                             {signal.address || 'N/A'} | {signal.tag}
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-1.5">
//                           <div className={`w-2 h-2 rounded-full ${signal.value !== null && signal.value > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                           <div className="text-xs font-bold font-mono text-[#0AC4E0]">
//                             {signal.value !== null ? signal.value.toFixed(2) : '--'}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 2: BINARY INPUTS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">BINARY INPUTS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : biSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No input signals
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {biSignals.map((signal) => {
//                   const displayName = getBinaryInputDisplayName(signal.tag);
//                   return (
//                     <div
//                       key={signal.address || signal.tag || Math.random()}
//                       className={`p-1.5 rounded border transition-all ${
//                         signal.value 
//                           ? 'bg-[#0AC4E0]/10 border-[#0AC4E0]' 
//                           : 'bg-gray-50 border-gray-200'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         {/* Custom display name from mapping */}
//                         <div className="text-[9px] font-medium truncate max-w-[70px]" title={displayName}>
//                           {displayName}
//                         </div>
//                         <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                       </div>
//                       <div className="flex items-center justify-between mt-0.5">
//                         <div className="text-[6px] text-gray-500 font-mono truncate">
//                           {getSignalAddress(signal)}
//                         </div>
//                         <div className={`text-[9px] font-bold ${signal.value ? 'text-[#0AC4E0]' : 'text-gray-500'}`}>
//                           {signal.value ? '1' : '0'}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 3: BINARY OUTPUTS (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">BINARY OUTPUTS</h2>
//               <div className="flex items-center space-x-1">
//                 <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
//                 <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
//               </div>
//             </div>

//             {!isAuthenticated() ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 Authentication required
//               </div>
//             ) : boSignals.length === 0 ? (
//               <div className="text-center py-4 text-xs text-gray-500">
//                 No output signals
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
//                 {boSignals.map((signal) => {
//                   const displayName = getBinaryOutputDisplayName(signal.tag);
//                   return (
//                     <div
//                       key={signal.address || signal.tag || Math.random()}
//                       className={`p-1.5 rounded border transition-all ${
//                         signal.value 
//                           ? 'bg-purple-100 border-purple-400' 
//                           : 'bg-gray-50 border-gray-200'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         {/* Custom display name from mapping */}
//                         <div className="text-[9px] font-medium truncate max-w-[70px]" title={displayName}>
//                           {displayName}
//                         </div>
//                         <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-purple-500' : 'bg-gray-400'}`}></div>
//                       </div>
//                       <div className="flex items-center justify-between mt-0.5">
//                         <div className="text-[6px] text-gray-500 font-mono truncate">
//                           {getSignalAddress(signal)}
//                         </div>
//                         <div className={`text-[9px] font-bold ${signal.value ? 'text-purple-600' : 'text-gray-500'}`}>
//                           {signal.value ? '1' : '0'}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* COLUMN 4: CONTROL PANEL (3 columns) */}
//         <div className="lg:col-span-3 space-y-2">
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-xs font-bold uppercase">CONTROL PANEL</h2>
//               <div className="flex items-center space-x-2">
//                 <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
//                 <span className="text-[9px] text-gray-600">{loading ? 'BUSY' : 'READY'}</span>
//               </div>
//             </div>

//             {/* Quick Status */}
//             <div className="grid grid-cols-2 gap-1 mb-2">
//               <div className="p-1 bg-gray-50 rounded border border-gray-200">
//                 <div className="text-[7px] text-gray-500">ACTIVE MODE</div>
//                 <div className="text-[9px] font-bold truncate">{getActiveMode()}</div>
//               </div>
//               <div className="p-1 bg-gray-50 rounded border border-gray-200">
//                 <div className="text-[7px] text-gray-500">ANALOG</div>
//                 <div className={`text-[9px] font-bold ${analogConnected ? 'text-green-600' : 'text-red-600'}`}>
//   {analogConnected ? 'CONNECTED' : 'NOT CONNECTED'}
// </div>
//               </div>
//             </div>

//             {/* Control Buttons */}
//             <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
//               {actions.map((section, idx) => (
//                 <div key={idx}>
//                   <h3 className="text-[9px] font-bold mb-1 text-gray-600">{section.title}</h3>
//                   <div className="grid grid-cols-2 gap-1">
//                     {section.buttons.map((btn, i) => {
//                       const isDirection = btn.type === "direction";
//                       const directionAvailable = isDirection
//                         ? getDirectionAvailability(btn.directionTag)
//                         : false;
//                       const modeActive = section.title === "Remote Mode"
//                         ? getModeActiveStatus(btn.modeTag)
//                         : false;

//                       return (
//                         <button
//                           key={i}
//                           disabled={loading || !isAuthenticated()}
//                           onClick={() => callApi(btn.label, btn.endpoint, btn.type)}
//                           className={`relative w-full rounded border text-[8px] font-medium p-1 transition-all disabled:opacity-50 ${
//                             isDirection 
//                               ? getDirectionClass(directionAvailable)
//                               : section.title === "Remote Mode"
//                                 ? getModeActiveClass(modeActive)
//                                 : colorClasses[btn.color]
//                           }`}
//                         >
//                           <span className="truncate block">{btn.label}</span>
//                           {(isDirection || section.title === "Remote Mode") && (
//                             <div className="absolute -top-1 -right-1">
//                               <div className={`w-1.5 h-1.5 rounded-full ${
//                                 isDirection 
//                                   ? directionAvailable ? 'bg-green-500' : 'bg-gray-400'
//                                   : modeActive ? 'bg-purple-500' : 'bg-gray-400'
//                               }`}></div>
//                             </div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Event Log */}
//           <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
//             <div className="flex items-center justify-between mb-1">
//               <h3 className="text-[9px] font-bold uppercase">EVENT LOG</h3>
//               <button
//                 onClick={clearLogs}
//                 className="text-[7px] px-1 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
//               >
//                 Clear
//               </button>
//             </div>
//             <div className="h-20 overflow-y-auto text-[7px] font-mono space-y-1">
//               {logs.length === 0 ? (
//                 <div className="text-center text-gray-500 py-2">No events</div>
//               ) : (
//                 logs.map((log, i) => (
//                   <div key={i} className="p-1 bg-gray-50 rounded border border-gray-200">
//                     <span className="text-gray-500">[{log.timestamp}]</span>{' '}
//                     <span className={log.type === 'ERROR' ? 'text-red-600' : 'text-gray-700'}>
//                       {log.msg}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-2 pt-2 border-t border-gray-300">
//         <div className="flex justify-between text-[7px] text-gray-600">
//           <div className="flex space-x-2">
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span> ACTIVE</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1"></span> INACTIVE</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-[#0AC4E0] rounded-full mr-1"></span> INPUT</span>
//             <span className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span> OUTPUT</span>
//           </div>
//           <div>
//             <span>ANALOG: {analogSignals.length} • </span>
//             <span>IN: {biSignals.length} • </span>
//             <span>OUT: {boSignals.length} • </span>
//             <span>CTRL: {loading ? 'EXEC' : 'STDBY'}</span>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog */}
//       {confirmDialog.isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full border border-gray-300">
//             <div className="bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] p-3 rounded-t-xl">
//               <h3 className="text-white font-bold text-sm">Confirm Command</h3>
//             </div>
//             <div className="p-4">
//               <p className="text-xs text-gray-700 mb-2">Execute: <span className="font-bold text-[#0AC4E0]">{confirmDialog.command}</span></p>
//               <p className="text-[9px] text-gray-500 mb-3">This will send a command to the control system.</p>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={handleCancel}
//                   className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirm}
//                   className="px-3 py-1 text-xs bg-[#0AC4E0] hover:bg-[#0A8B9F] text-white rounded"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




































































import { useEffect, useState, useRef } from "react";

const API_BASE = "https://mqtt-testing-2.onrender.com";

/* ======================================================
   SIGNAL NAME MAPPINGS - EDIT THESE TO RENAME DISPLAY NAMES
   ====================================================== */

// ===== ANALOG SIGNALS - Edit the text after the colon (:) =====
const ANALOG_SIGNAL_NAMES = {
  // Voltage signals
  "IC1_LN_PT_V": "I/C-1 LINE PT VOLTAGE",
  "BUS1_PT_V": "BUS-1 PT VOLTAGE",
  "BUS2_PT_V": "BUS-2 PT VOLTAGE",
  "IC2_LN_PT_V": "I/C-2 LINE PT VOLTAGE",
  
  // Frequency signals
  "IC1_LN_Freq": "I/C-1 LINE FREQUENCY",
  "BUS1_Freq": "BUS-1 FREQUENCY",
  "BUS2_Freq": "BUS-2 FREQUENCY",
  "IC2_LN_Freq": "I/C-2 LINE FREQUENCY",
  
  // Phase difference signals
  "IC1_Ph_Diff": "I/C-1 PHASE DIFFERENCE",
  "BC_Ph_Diff": "B/C PHASE DIFFERENCE",
  "IC2_Ph_Diff": "I/C-2 PHASE DIFFERENCE",
};

// ===== BINARY INPUTS - Edit the text after the colon (:) =====
const BINARY_INPUT_NAMES = {
  // Test Transfer Status (0x8017)
  "test_transfer": "TEST TRANSFER",
  
  // Previous Transfer Status (0x8018)
  "previous_transfer": "PREVIOUS TRANSFER",
  
  // Selected States (0x8019 - 0x801e)
  "b1_s1_selected": "B1 S1 SELECTED",
  "b1_s2_selected": "B1 S2 SELECTED",
  "b2_s2_selected": "B2 S2 SELECTED",
  "b2_s1_selected": "B2 S1 SELECTED",
  "b1_2_to_s1_selected": "B1+B2 TO S1 SELECTED",
  "b1_2_to_s2_selected": "B1+B2 TO S2 SELECTED",
  
  // Breaker Status (0x8021 - 0x8026)
  "bkr1_closed": "BKR1 CLOSED",
  "bkr2_closed": "BKR2 CLOSED",
  "bkr3_closed": "BKR3 CLOSED",
  "bkr1_open": "BKR1 OPEN",
  "bkr2_open": "BKR2 OPEN",
  "bkr3_open": "BKR3 OPEN",
  
  // Trip/Close Fail Status (0x8027 - 0x802c)
  "ic1_trip_fail": "IC1 TRIP FAIL",
  "ic1_close_fail": "IC1 CLOSE FAIL",
  "bc_trip_fail": "BC TRIP FAIL",
  "bc_close_fail": "BC CLOSE FAIL",
  "ic2_trip_fail": "IC2 TRIP FAIL",
  "ic2_close_fail": "IC2 CLOSE FAIL",
  
  // Availability Status (0x802d - 0x8031) - THESE ARE CRITICAL FOR DIRECTION BUTTONS
  "b1_s1_available": "B1 S1 AVAILABLE",
  "b1_s2_available": "B1 S2 AVAILABLE",
  "b2_s1_available": "B2 S1 AVAILABLE",
  "b2_s2_available": "B2 S2 AVAILABLE",
  "b1_2_to_s1_available": "B1+B2 TO S1 AVAILABLE",
  "b1_2_to_s2_available": "B1+B2 TO S2 AVAILABLE",
  
  // IC1 Trip/Close Commands (0x8031 - 0x8032)
  "ic1_trip": "IC1 TRIP",
  "ic1_close": "IC1 CLOSE",
  
  // BC Trip/Close (0x8033 - 0x8034)
  "bc_trip": "BC TRIP",
  "bc_close": "BC CLOSE",
  
  // IC2 Trip/Close (0x8035 - 0x8036)
  "ic2_trip": "IC2 TRIP",
  "ic2_close": "IC2 CLOSE",
  
  // Motor/Supply Status (0x8037 - 0x8039, 0x8D37 - 0x8D39)
  "bus1_motor": "BUS1 MOTOR",
  "bus2_motor": "BUS2 MOTOR",
  "closing_supply": "CLOSING SUPPLY",
  
  // Test Mode (0x804a, 0x8D3a)
  "test_mode": "TEST MODE",
  
  // Auto Protection (0x8D3b)
  "auto_protection": "AUTO PROTECTION",
  
  // Mode Selections (0x8D3c - 0x8D3f, 0x9001)
  "fast_mode": "FAST MODE",
  "fast_slow_mode": "FAST SLOW MODE",
  "fast_in_phase_mode": "FAST IN PHASE MODE",
  "slow_mode": "SLOW MODE",
  "parallel_mode": "PARALLEL MODE",
  
  // BTS Status
  "bts_not_ready": "BTS NOT READY",
  "bts_ready": "BTS READY",
  "bts_blocked": "BTS BLOCKED",
  "bts_not_blocked": "BTS NOT BLOCKED",
  
  // Source 1 Status
  "src1_not_healthy": "SRC-1 NOT HEALTHY",
  "src1_healthy": "SRC-1 HEALTHY",
  
  // I/C-1 Breaker
  "ic1_bkr_on": "I/C-1 BKR ON",
  "ic1_bkr_off": "I/C-1 BKR OFF",
  
  // B/C Breaker
  "bc_bkr_on": "B/C BKR ON",
  "bc_bkr_off": "B/C BKR OFF",
  
  // I/C-2 Breaker
  "ic2_bkr_on": "I/C-2 BKR ON",
  "ic2_bkr_off": "I/C-2 BKR OFF",
  
  // Source 2 Status
  "src2_not_healthy": "SRC-2 NOT HEALTHY",
  "src2_healthy": "SRC-2 HEALTHY",
  
  // Fast Transfer Status
  "fast_transfer_condition_ok": "FAST TRANSFER CONDITION OK",
  "fast_transfer_bus_healthy": "FAST TRANSFER BUS HEALTHY",
  "new_source_bus_delta_phase_ok": "NEW SOURCE BUS Δ PHASE OK",
  "new_source_bus_delta_volt_ok": "NEW SOURCE BUS Δ VOLT OK",
  
  // ANSI Status
  "ansi_c50_41_vf_ok": "ANSI C50.41 (V/F) OK",
  
  // I/C-1 Breaker Ready
  "ic1_bkr_not_ready": "I/C-1 BKR NOT READY",
  "ic1_bkr_ready": "I/C-1 BKR READY",
  
  // B/C Breaker Ready
  "bc_bkr_not_ready": "B/C BKR NOT READY",
  "bc_bkr_ready": "B/C BKR READY",
  
  // I/C-2 Breaker Ready
  "ic2_bkr_not_ready": "I/C-2 BKR NOT READY",
  "ic2_bkr_ready": "I/C-2 BKR READY",
  
  // Operation Status
  "bkr_operation_fail": "BKR OPERATION FAIL",
  "bkr_operation_healthy": "BKR OPER. HEALTHY",
  "previous_txr_fail": "PREVIOUS TXR. FAIL",
  "previous_txr_ok": "PREVIOUS TXR. OK",
  
  // Auxiliaries
  "auxiliaries_trip": "AUXILIARIES TRIP",
  
  // Test Transfer
  "test_transfer_fail": "TEST TRANSFER FAIL",
  "test_transfer_ok": "TEST TRANSFER OK",
  
  // Alarm
  "alarm": "ALARM",
};

// ===== BINARY OUTPUTS - Edit the text after the colon (:) =====
const BINARY_OUTPUT_NAMES = {
  "bts_out": "BTS OUT",
  "bts_in": "BTS IN",
  "fast_mode": "FAST MODE",
  "fast_inphase_slow_mode": "FAST INPHASE SLOW MODE",
  "fast_slow_mode": "FAST SLOW MODE",
  "slow_mode": "SLOW MODE",
  "momentary_parallel_mode": "MOMENTARY PARALLELING MODE",
  "bus_a_to_src1": "BUS A => SRC-1",
  "bus_a_to_src2": "BUS A => SRC-2",
  "bus_b_to_src1": "BUS B => SRC-1",
  "bus_b_to_src2": "BUS B => SRC-2",
  "bus_ab_to_src1": "BUS A+B => SRC-1",
  "bus_ab_to_src2": "BUS A+B => SRC-2",
};

/* ======================================================
   DATA STRUCTURES - Control Panel Buttons
   ====================================================== */
const actions = [
  {
    title: "BTS Control",
    buttons: [
      {
        label: "BTS IN",
        endpoint: "/api/v1/bts/in",
        color: "green",
        type: "immediate",
      },
      {
        label: "BTS OUT",
        endpoint: "/api/v1/bts/out",
        color: "red",
        type: "immediate",
      },
    ],
  },
  {
    title: "BTS Reset",
    buttons: [
      {
        label: "BTS RESET",
        endpoint: "/api/v1/reset-bts",
        color: "yellow",
        type: "immediate",
      },
    ],
  },
  {
    title: "Remote Test",
    buttons: [
      {
        label: "Remote Test IN",
        endpoint: "/api/v1/remote-test/in",
        color: "blue",
        type: "immediate",
      },
      {
        label: "Remote Test OUT",
        endpoint: "/api/v1/remote-test/out",
        color: "blue",
        type: "immediate",
      },
      {
        label: "Remote Test Transfer",
        endpoint: "/api/v1/remote-test/transfer",
        color: "purple",
        type: "immediate",
      },
    ],
  },
  {
    title: "Bus to Source",
    buttons: [
      {
        label: "BusA to Src1",
        endpoint: "/api/v1/bus1/source1",
        color: "gray",
        directionTag: "b1_s1_available",
        type: "direction",
      },
      {
        label: "BusA to Src2",
        endpoint: "/api/v1/bus1/source2",
        color: "gray",
        directionTag: "b1_s2_available",
        type: "direction",
      },
      {
        label: "BusB to Src1",
        endpoint: "/api/v1/bus2/source1",
        color: "gray",
        directionTag: "b2_s1_available",
        type: "direction",
      },
      {
        label: "BusB to Src2",
        endpoint: "/api/v1/bus2/source2",
        color: "gray",
        directionTag: "b2_s2_available",
        type: "direction",
      },
      {
        label: "BusA & B to Src1",
        endpoint: "/api/v1/bus12/source1",
        color: "gray",
        directionTag: "b1_2_to_s1_available",
        type: "direction",
      },
      {
        label: "BusA & B to Src2",
        endpoint: "/api/v1/bus12/source2",
        color: "gray",
        directionTag: "b1_2_to_s2_available",
        type: "direction",
      },
    ],
  },
  {
    title: "Remote Mode",
    buttons: [
      {
        label: "FAST",
        endpoint: "/api/v1/mode/fast",
        color: "blue",
        modeTag: "fastModeSelected",
        type: "immediate",
      },
      {
        label: "FAST-SLOW",
        endpoint: "/api/v1/mode/fasl",
        color: "blue",
        modeTag: "fastSlowModeSelected",
        type: "immediate",
      },
      {
        label: "FAST-INPHASE-SLOW",
        endpoint: "/api/v1/mode/fainsl",
        color: "blue",
        modeTag: "fastInPhaseSlowModeSelected",
        type: "immediate",
      },
      {
        label: "PARALLEL",
        endpoint: "/api/v1/mode/parallel",
        color: "blue",
        modeTag: "parallelModeSelected",
        type: "immediate",
      },
      {
        label: "SLOW",
        endpoint: "/api/v1/mode/slow",
        color: "blue",
        modeTag: "slowModeSelected",
        type: "immediate",
      },
    ],
  },
  {
    title: "Live Transfer",
    buttons: [
      {
        label: "Operate Breaker",
        endpoint: "/api/v1/breaker/operate",
        color: "orange",
        type: "breaker",
      },
    ],
  },
];

export default function IntegratedDashboard() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [biData, setBiData] = useState([]);
  const [modeData, setModeData] = useState([]);
  const [sseStatus, setSseStatus] = useState("CONNECTING");
  const [modeSseStatus, setModeSseStatus] = useState("CONNECTING");
  const [activeCommand, setActiveCommand] = useState(null);
  const [authError, setAuthError] = useState(false);
  
  // Binary I/O States
  const [biSignals, setBiSignals] = useState([]);
  const [boSignals, setBoSignals] = useState([]);
  const [binaryConnected, setBinaryConnected] = useState(false);
  
  // Analog States
  const [analogConnected, setAnalogConnected] = useState(false);
  const [analogSignals, setAnalogSignals] = useState([]);
  
  // Availability Data for Direction Buttons
  const [availabilityData, setAvailabilityData] = useState({});
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    command: null,
    endpoint: null,
    buttonType: null,
    label: null
  });

  const biDataRef = useRef([]);
  const modeDataRef = useRef([]);
  const evtSourceRef = useRef(null);
  const modeEvtSourceRef = useRef(null);
  const biBoSourceRef = useRef(null);
  const analogSourceRef = useRef(null);
  const availabilitySourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const modeReconnectTimeoutRef = useRef(null);
  const binaryReconnectTimeoutRef = useRef(null);
  const analogReconnectTimeoutRef = useRef(null);
  const availabilityReconnectTimeoutRef = useRef(null);

  // Track previous states to detect changes
  const prevBiDataRef = useRef([]);
  const prevModeDataRef = useRef([]);

  // Helper function to get auth token
  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  // Helper function to check if user is authenticated
  const isAuthenticated = () => {
    return !!getAuthToken();
  };

  // Helper function to create headers with auth token
  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
  };

  /* ---------------- NAME MAPPING FUNCTIONS ---------------- */
  const getAnalogDisplayName = (tag) => {
    return ANALOG_SIGNAL_NAMES[tag] || tag;
  };

  const getBinaryInputDisplayName = (tag) => {
    return BINARY_INPUT_NAMES[tag] || tag;
  };

  const getBinaryOutputDisplayName = (tag) => {
    return BINARY_OUTPUT_NAMES[tag] || tag;
  };

  /* ---------------- LOGGING ---------------- */
  const addLog = (msg, type = "INFO") => {
    const allowedTypes = [
      "CMD",
      "DIRECTION",
      "BREAKER",
      "SUCCESS",
      "ERROR",
      "MODE_CHANGE",
      "STATUS_CHANGE",
      "CONNECTION",
      "AUTH_ERROR",
      "CONFIRMATION",
    ];

    if (!allowedTypes.includes(type)) {
      return;
    }

    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [{ timestamp, msg, type }, ...prev].slice(0, 50));
  };

  /* ---------------- CONFIRMATION DIALOG ---------------- */
  const openConfirmDialog = (label, endpoint, buttonType) => {
    setConfirmDialog({
      isOpen: true,
      command: label,
      endpoint: endpoint,
      buttonType: buttonType,
      label: label
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      command: null,
      endpoint: null,
      buttonType: null,
      label: null
    });
  };

  const handleConfirm = () => {
    const { label, endpoint, buttonType } = confirmDialog;
    addLog(`Command confirmed: ${label}`, "CONFIRMATION");
    closeConfirmDialog();
    executeCommand(label, endpoint, buttonType);
  };

  const handleCancel = () => {
    if (confirmDialog.label) {
      addLog(`Command cancelled: ${confirmDialog.label}`, "CONFIRMATION");
    }
    closeConfirmDialog();
  };

  /* ---------------- CONTROL CALL (INDEPENDENT OPERATIONS) ---------------- */
  const executeCommand = async (label, endpoint, buttonType = "immediate") => {
    if (!isAuthenticated()) {
      addLog("Authentication required. Please log in.", "AUTH_ERROR");
      setAuthError(true);
      setTimeout(() => setAuthError(false), 3000);
      return;
    }

    try {
      setLoading(true);
      setActiveCommand(label);
      addLog(`${label}`, "CMD");

      const headers = getAuthHeaders();

      if (buttonType === "direction") {
        addLog(`Setting direction: ${label}`, "DIRECTION");
        
        const response = await fetch(`${API_BASE}${endpoint}`, {
          method: "POST",
          headers: headers,
        });

        if (response.status === 401 || response.status === 403) {
          throw new Error("Authentication failed. Please log in again.");
        }

        if (!response.ok) {
          throw new Error(`Direction setup failed: ${response.statusText}`);
        }

        const data = await response.json();
        addLog(`Direction set: ${label}`, "SUCCESS");
        setLoading(false);
        setTimeout(() => setActiveCommand(null), 1000);
        return;
      }

      if (buttonType === "breaker") {
        addLog(`Operating breaker`, "BREAKER");

        const response = await fetch(`${API_BASE}${endpoint}`, {
          method: "POST",
          headers: headers,
        });

        if (response.status === 401 || response.status === 403) {
          throw new Error("Authentication failed. Please log in again.");
        }

        if (!response.ok) {
          throw new Error(`Breaker operation failed: ${response.statusText}`);
        }

        const data = await response.json();
        addLog(`Breaker operation completed`, "SUCCESS");
        setLoading(false);
        setTimeout(() => setActiveCommand(null), 1000);
        return;
      }

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: headers,
      });

      if (res.status === 401 || res.status === 403) {
        throw new Error("Authentication failed. Please log in again.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");

      addLog(`${label} successful`, "SUCCESS");
    } catch (err) {
      addLog(`${label} failed: ${err.message}`, "ERROR");
      if (err.message.includes("Authentication failed")) {
        setAuthError(true);
        setTimeout(() => setAuthError(false), 3000);
      }
    } finally {
      setLoading(false);
      setTimeout(() => setActiveCommand(null), 1000);
    }
  };

  const callApi = (label, endpoint, buttonType = "immediate") => {
    if (!isAuthenticated()) {
      addLog("Authentication required. Please log in.", "AUTH_ERROR");
      setAuthError(true);
      setTimeout(() => setAuthError(false), 3000);
      return;
    }
    openConfirmDialog(label, endpoint, buttonType);
  };





  const authenticated = isAuthenticated();

  /* ---------------- AVAILABILITY DATA SSE (FOR DIRECTION BUTTONS) ---------------- */
  useEffect(() => {
    let isMounted = true;

    const connectAvailabilitySSE = () => {
        if (availabilitySourceRef.current) return;
      try {
      

        const token = getAuthToken();
        if (!token) {
          return;
        }

        const url = `${API_BASE}/api/v1/stream/bi-available?token=${token}`;

        availabilitySourceRef.current = new EventSource(url);

        availabilitySourceRef.current.onopen = () => {
          if (!isMounted) return;
          console.log("Availability SSE Connected");
        };

        availabilitySourceRef.current.onmessage = (e) => {
          if (!isMounted) return;
          try {
            const parsed = JSON.parse(e.data);
            // console.log("Availability Data:", parsed);

            if (parsed.bi && Array.isArray(parsed.bi)) {
              // Create a map of availability tags
              const availabilityMap = {};
              parsed.bi.forEach(item => {
                availabilityMap[item.tag] = item.value;
              });
              setAvailabilityData(availabilityMap);
              
              // Also update biData for backward compatibility
              const transformedData = parsed.bi.map((item) => ({
                tag: item.tag,
                value: item.value,
                description: getBinaryInputDisplayName(item.tag),
              }));
              setBiData(transformedData);
            }
          } catch (err) {
            console.error("Availability SSE parse error:", err);
          }
        };

        availabilitySourceRef.current.onerror = (error) => {
          if (!isMounted) return;
          console.error("Availability SSE Error:", error);

          if (availabilitySourceRef.current) {
            availabilitySourceRef.current.close();
            availabilitySourceRef.current = null;
          }

          if (isMounted) {
            clearTimeout(availabilityReconnectTimeoutRef.current);
            availabilityReconnectTimeoutRef.current = setTimeout(() => {
              if (isMounted) {
                connectAvailabilitySSE();
              }
            }, 3000);
          }
        };
      } catch (err) {
        console.error("Availability SSE connection error:", err);
        if (isMounted) {
          clearTimeout(availabilityReconnectTimeoutRef.current);
          availabilityReconnectTimeoutRef.current = setTimeout(() => {
            if (isMounted) {
              connectAvailabilitySSE();
            }
          }, 3000);
        }
      }
    };

    if (authenticated) {
  connectAvailabilitySSE();
}

    return () => {
      isMounted = false;
      if (availabilitySourceRef.current) {
        availabilitySourceRef.current.close();
        availabilitySourceRef.current = null;
      }
      if (availabilityReconnectTimeoutRef.current) {
        clearTimeout(availabilityReconnectTimeoutRef.current);
      }
    };
  }, [authenticated]);

  /* ---------------- MODE SELECTION SSE ---------------- */
  useEffect(() => {
    let isMounted = true;

    const connectModeSSE = () => {
      if (modeEvtSourceRef.current) return;
      try {
        

        const token = getAuthToken();
        if (!token) {
          setModeSseStatus("AUTH_ERROR");
          return;
        }

        const url = `${API_BASE}/api/v1/stream/mode-selected?token=${token}`;

        modeEvtSourceRef.current = new EventSource(url);

        modeEvtSourceRef.current.onopen = () => {
          if (!isMounted) return;
          setModeSseStatus("CONNECTED");
        };

        modeEvtSourceRef.current.onmessage = (e) => {
          if (!isMounted) return;
          try {
            const parsed = JSON.parse(e.data);

            let modeArray = [];

            if (parsed.bo && Array.isArray(parsed.bo)) {
              modeArray = parsed.bo;
            } else if (parsed.data && Array.isArray(parsed.data)) {
              modeArray = parsed.data;
            } else if (Array.isArray(parsed)) {
              modeArray = parsed;
            }

            if (modeArray.length > 0) {
              const transformedData = modeArray.map((item) => ({
                tag: item.tag || item.name || item.address,
                value: item.value,
                address: item.address || item.tag || "N/A",
                description: getBinaryOutputDisplayName(
                  item.tag || item.name || item.address,
                ),
              }));

              if (prevModeDataRef.current.length > 0) {
                const prevActiveMode = prevModeDataRef.current.find(
                  (item) => item.value === true,
                );
                const currentActiveMode = transformedData.find(
                  (item) => item.value === true,
                );

                if (
                  prevActiveMode &&
                  currentActiveMode &&
                  prevActiveMode.tag !== currentActiveMode.tag
                ) {
                  addLog(
                    `Mode changed from ${prevActiveMode.description} to ${currentActiveMode.description}`,
                    "MODE_CHANGE",
                  );
                } else if (!prevActiveMode && currentActiveMode) {
                  addLog(
                    `Mode selected: ${currentActiveMode.description}`,
                    "MODE_CHANGE",
                  );
                } else if (prevActiveMode && !currentActiveMode) {
                  addLog(
                    `Mode deselected: ${prevActiveMode.description}`,
                    "MODE_CHANGE",
                  );
                }
              }

              modeDataRef.current = transformedData;
              setModeData(transformedData);
              prevModeDataRef.current = transformedData;
            }
          } catch (err) {
            console.error("Mode SSE parse error:", err);
          }
        };

        modeEvtSourceRef.current.onerror = (error) => {
          if (!isMounted) return;
          setModeSseStatus("DISCONNECTED");

          if (modeEvtSourceRef.current) {
            modeEvtSourceRef.current.close();
            modeEvtSourceRef.current = null;
          }

          if (isMounted) {
            clearTimeout(modeReconnectTimeoutRef.current);
            modeReconnectTimeoutRef.current = setTimeout(() => {
              if (isMounted) {
                setModeSseStatus("RECONNECTING");
                connectModeSSE();
              }
            }, 3000);
          }
        };
      } catch (err) {
        console.error("Mode SSE connection error:", err);
        if (isMounted) {
          setModeSseStatus("ERROR");

          clearTimeout(modeReconnectTimeoutRef.current);
          modeReconnectTimeoutRef.current = setTimeout(() => {
            if (isMounted) {
              setModeSseStatus("RECONNECTING");
              connectModeSSE();
            }
          }, 3000);
        }
      }
    };

   if (authenticated) {
  connectModeSSE();
}else {
      setModeSseStatus("AUTH_ERROR");
    }

    return () => {
      isMounted = false;

      if (modeEvtSourceRef.current) {
        modeEvtSourceRef.current.close();
        modeEvtSourceRef.current = null;
      }

      if (modeReconnectTimeoutRef.current) {
        clearTimeout(modeReconnectTimeoutRef.current);
      }
    };
  }, [authenticated]);

  /* ---------------- BINARY I/O SSE ---------------- */
  useEffect(() => {
    let isMounted = true;

    const connectBinarySSE = () => {
      if (biBoSourceRef.current) return;
      try {
        

        const token = getAuthToken();
        if (!token) {
          setBinaryConnected(false);
          return;
        }

        const url = `${API_BASE}/api/v1/stream/bi-bo?token=${token}`;
        biBoSourceRef.current = new EventSource(url);

        biBoSourceRef.current.onopen = () => {
          if (!isMounted) return;
          setBinaryConnected(true);
        };

        biBoSourceRef.current.onerror = () => {
  if (!isMounted) return;

  setBinaryConnected(false);

  if (biBoSourceRef.current) {
    biBoSourceRef.current.close();
    biBoSourceRef.current = null;
  }

  clearTimeout(binaryReconnectTimeoutRef.current);

  binaryReconnectTimeoutRef.current = setTimeout(() => {
    if (isMounted) connectBinarySSE();
  }, 3000);
};

        biBoSourceRef.current.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            
            // Debug: Log the raw data to see what's coming from the API
            // console.log("Binary SSE Data:", data);
            
            // Handle different possible data structures
            if (data.bi && Array.isArray(data.bi)) {
              // console.log("BI Signals:", data.bi);
              setBiSignals(data.bi);
            }
            
            if (data.bo && Array.isArray(data.bo)) {
              // console.log("BO Signals:", data.bo);
              setBoSignals(data.bo);
            }
          } catch (err) {
            console.error("Binary SSE parse error:", err);
          }
        };
      } catch (err) {
        console.error("Binary SSE connection error:", err);
        if (isMounted) {
          setBinaryConnected(false);
          
          clearTimeout(binaryReconnectTimeoutRef.current);
          binaryReconnectTimeoutRef.current = setTimeout(() => {
            if (isMounted) {
              connectBinarySSE();
            }
          }, 3000);
        }
      }
    };

    if (authenticated) {
  connectBinarySSE();
}

    return () => {
      isMounted = false;
      if (biBoSourceRef.current) {
        biBoSourceRef.current.close();
        biBoSourceRef.current = null;
      }
      if (binaryReconnectTimeoutRef.current) {
        clearTimeout(binaryReconnectTimeoutRef.current);
      }
    };
  }, [authenticated]);

  /* ---------------- ANALOG SSE ---------------- */
  useEffect(() => {
    let isMounted = true;

    const connectAnalogSSE = () => {
      if (analogSourceRef.current) return;
      try {
        

        const token = getAuthToken();
        if (!token) {
          setAnalogConnected(false);
          return;
        }

        const url = `${API_BASE}/api/v1/stream/analog?token=${token}`;
        analogSourceRef.current = new EventSource(url);

        analogSourceRef.current.onopen = () => {
          if (!isMounted) return;
          setAnalogConnected(true);
          console.log("Analog SSE Connected");
        };

        analogSourceRef.current.onerror = (error) => {
          if (!isMounted) return;
          console.error("Analog SSE Error:", error);
          setAnalogConnected(false);
          
          if (isMounted) {
            clearTimeout(analogReconnectTimeoutRef.current);
            analogReconnectTimeoutRef.current = setTimeout(() => {
              if (isMounted) {
                console.log("Reconnecting Analog SSE...");
                connectAnalogSSE();
              }
            }, 3000);
          }
        };

        analogSourceRef.current.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            // console.log("Analog Data Received:", data);
            
            if (data.analog && Array.isArray(data.analog)) {
              setAnalogSignals(data.analog);
            }
          } catch (err) {
            console.error("Analog SSE parse error:", err);
          }
        };
      } catch (err) {
        console.error("Analog SSE connection error:", err);
        if (isMounted) {
          setAnalogConnected(false);
          
          clearTimeout(analogReconnectTimeoutRef.current);
          analogReconnectTimeoutRef.current = setTimeout(() => {
            if (isMounted) {
              connectAnalogSSE();
            }
          }, 3000);
        }
      }
    };

    if (authenticated) {
  connectAnalogSSE();
} else {
      setAnalogConnected(false);
    }

    return () => {
      isMounted = false;
      if (analogSourceRef.current) {
        analogSourceRef.current.close();
        analogSourceRef.current = null;
      }
      if (analogReconnectTimeoutRef.current) {
        clearTimeout(analogReconnectTimeoutRef.current);
      }
    };
  }, [authenticated]);

  /* ---------------- HELPER FUNCTIONS ---------------- */
  const getModeDescription = (tag) => {
    const descriptions = {
      fastModeSelected: "Fast Mode",
      fastSlowModeSelected: "Fast-Slow Mode",
      fastInPhaseSlowModeSelected: "Fast In-Phase Slow Mode",
      parallelModeSelected: "Parallel Mode",
      slowModeSelected: "Slow Mode",
    };
    return descriptions[tag] || tag;
  };

  const getDirectionDescription = (tag) => {
    const descriptions = {
      b1_s1_available: "B1 S1 AVAILABLE",
      b1_s2_available: "B1 S2 AVAILABLE",
      b2_s1_available: "B2 S1 AVAILABLE",
      b2_s2_available: "B2 S2 AVAILABLE",
      b1_2_to_s1_available: "B1+B2 TO S1 AVAILABLE",
      b1_2_to_s2_available: "B1+B2 TO S2 AVAILABLE",
      bts_not_ready: "BTS NOT READY",
    };
    return descriptions[tag] || tag;
  };

  const getActiveMode = () => {
    const activeMode = modeData.find((item) => item.value === true);
    return activeMode ? activeMode.description : "No Mode Selected";
  };

  const getBTSReadyStatus = () => {
    const btsNotReady = biData.find((item) => item.tag === "bts_not_ready");
    return btsNotReady ? !btsNotReady.value : false;
  };

  // UPDATED: Use availabilityData for direction buttons
  const getDirectionAvailability = (directionTag) => {
    if (!directionTag) return false;
    // Check in availabilityData first
    if (availabilityData[directionTag] !== undefined) {
      return availabilityData[directionTag];
    }
    // Fallback to biData
    const direction = biData.find((item) => item.tag === directionTag);
    return direction ? direction.value : false;
  };

  const getModeActiveStatus = (modeTag) => {
    if (!modeTag) return false;
    const mode = modeData.find((item) => item.tag === modeTag);
    return mode ? mode.value : false;
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Binary I/O Helper functions
  const getSignalAddress = (signal) => {
    return signal.address || signal.addr || 'N/A';
  };

  // Light theme color classes
  const colorClasses = {
    green: "bg-green-500 border-green-600 hover:bg-green-600 hover:border-green-700 text-white text-xs px-2 py-1.5",
    red: "bg-red-500 border-red-600 hover:bg-red-600 hover:border-red-700 text-white text-xs px-2 py-1.5",
    yellow: "bg-yellow-400 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 text-white text-xs px-2 py-1.5",
    blue: "bg-[#0AC4E0] border-[#0A8B9F] hover:bg-[#0A8B9F] hover:border-[#0A6B7F] text-white text-xs px-2 py-1.5",
    purple: "bg-purple-500 border-purple-600 hover:bg-purple-600 hover:border-purple-700 text-white text-xs px-2 py-1.5",
    gray: "bg-gray-600 border-gray-700 hover:bg-gray-700 hover:border-gray-800 text-white text-xs px-2 py-1.5",
    orange: "bg-orange-400 border-orange-500 hover:bg-orange-500 hover:border-orange-600 text-white text-xs px-2 py-1.5",
  };

  const getDirectionClass = (available) => {
    if (available) {
      return "bg-green-100 border-[#0AC4E0] hover:bg-green-200 text-gray-800 text-xs px-2 py-1.5";
    }
    return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
  };

  const getModeActiveClass = (active) => {
    if (active) {
      return "bg-purple-100 border-[#0AC4E0] hover:bg-purple-200 text-gray-800 text-xs px-2 py-1.5";
    }
    return "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1.5";
  };

  const bgClass = "bg-gray-100";
  const textClass = "text-gray-800";
  const cardBgClass = "bg-white";
  const cardBorderClass = "border-gray-300";

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} p-2`}>
      {/* Header with Auth Status */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isAuthenticated() ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <h1 className="text-sm font-bold">INDUSTRIAL CONTROL DASHBOARD</h1>
        </div>
        {!isAuthenticated() && (
          <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded border border-red-300">
            UNAUTHENTICATED
          </div>
        )}
      </div>

      {/* Auth Error Message */}
      {authError && (
        <div className="mb-2 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-600">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Authentication failed. Please log in again.</span>
          </div>
        </div>
      )}

      {/* Four Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        {/* COLUMN 1: ANALOG SIGNALS (3 columns) */}
        <div className="lg:col-span-3 space-y-2">
          <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase">ANALOG SIGNALS</h2>
              <div className="flex items-center space-x-1">
                <div className={`w-1.5 h-1.5 rounded-full ${analogConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                <span className="text-[9px] text-gray-600">{analogConnected ? 'LIVE' : 'OFFLINE'}</span>
              </div>
            </div>

            {!isAuthenticated() ? (
              <div className="text-center py-4 text-xs text-gray-500">
                Authentication required
              </div>
            ) : analogSignals.length === 0 ? (
              <div className="text-center py-4 text-xs text-gray-500">
                <div>No analog data</div>
                <div className="text-[8px] mt-1 text-gray-400">Waiting for data stream...</div>
              </div>
            ) : (
              <div className="space-y-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
                {analogSignals.map((signal, idx) => {
                  const displayName = getAnalogDisplayName(signal.tag);
                  return (
                    <div 
                      key={idx}
                      className="p-1.5 bg-gray-50 rounded border border-gray-200 hover:border-[#0AC4E0] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          {/* Custom display name from mapping */}
                          <div className="text-[10px] font-medium truncate" title={displayName}>
                            {displayName}
                          </div>
                          <div className="text-[7px] text-gray-500 font-mono truncate">
                            {signal.address || 'N/A'} | {signal.tag}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <div className={`w-2 h-2 rounded-full ${signal.value !== null && signal.value > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <div className="text-xs font-bold font-mono text-[#0AC4E0]">
                            {signal.value !== null ? signal.value.toFixed(2) : '--'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 2: BINARY INPUTS (3 columns) */}
        <div className="lg:col-span-3 space-y-2">
          <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase">BINARY INPUTS</h2>
              <div className="flex items-center space-x-1">
                <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
              </div>
            </div>

            {!isAuthenticated() ? (
              <div className="text-center py-4 text-xs text-gray-500">
                Authentication required
              </div>
            ) : biSignals.length === 0 ? (
              <div className="text-center py-4 text-xs text-gray-500">
                No input signals
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
                {biSignals.map((signal) => {
                  const displayName = getBinaryInputDisplayName(signal.tag);
                  return (
                    <div
                      key={signal.address || signal.tag || Math.random()}
                      className={`p-1.5 rounded border transition-all ${
                        signal.value 
                          ? 'bg-[#0AC4E0]/10 border-[#0AC4E0]' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {/* Custom display name from mapping */}
                        <div className="text-[9px] font-medium truncate max-w-[70px]" title={displayName}>
                          {displayName}
                        </div>
                        <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <div className="text-[6px] text-gray-500 font-mono truncate">
                          {getSignalAddress(signal)}
                        </div>
                        <div className={`text-[9px] font-bold ${signal.value ? 'text-[#0AC4E0]' : 'text-gray-500'}`}>
                          {signal.value ? '1' : '0'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 3: BINARY OUTPUTS (3 columns) */}
        <div className="lg:col-span-3 space-y-2">
          <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass} h-full`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase">BINARY OUTPUTS</h2>
              <div className="flex items-center space-x-1">
                <div className={`w-1.5 h-1.5 rounded-full ${binaryConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                <span className="text-[9px] text-gray-600">{binaryConnected ? 'LIVE' : 'OFFLINE'}</span>
              </div>
            </div>

            {!isAuthenticated() ? (
              <div className="text-center py-4 text-xs text-gray-500">
                Authentication required
              </div>
            ) : boSignals.length === 0 ? (
              <div className="text-center py-4 text-xs text-gray-500">
                No output signals
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
                {boSignals.map((signal) => {
                  const displayName = getBinaryOutputDisplayName(signal.tag);
                  return (
                    <div
                      key={signal.address || signal.tag || Math.random()}
                      className={`p-1.5 rounded border transition-all ${
                        signal.value 
                          ? 'bg-purple-100 border-purple-400' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {/* Custom display name from mapping */}
                        <div className="text-[9px] font-medium truncate max-w-[70px]" title={displayName}>
                          {displayName}
                        </div>
                        <div className={`w-2 h-2 rounded-full ${signal.value ? 'bg-purple-500' : 'bg-gray-400'}`}></div>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <div className="text-[6px] text-gray-500 font-mono truncate">
                          {getSignalAddress(signal)}
                        </div>
                        <div className={`text-[9px] font-bold ${signal.value ? 'text-purple-600' : 'text-gray-500'}`}>
                          {signal.value ? '1' : '0'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 4: CONTROL PANEL (3 columns) */}
        <div className="lg:col-span-3 space-y-2">
          <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase">CONTROL PANEL</h2>
              <div className="flex items-center space-x-2">
                <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                <span className="text-[9px] text-gray-600">{loading ? 'BUSY' : 'READY'}</span>
              </div>
            </div>

            {/* Quick Status */}
            {/* <div className="grid grid-cols-2 gap-1 mb-2">
              <div className="p-1 bg-gray-50 rounded border border-gray-200">
                <div className="text-[7px] text-gray-500">ACTIVE MODE</div>
                <div className="text-[9px] font-bold truncate">{getActiveMode()}</div>
              </div>
              <div className="p-1 bg-gray-50 rounded border border-gray-200">
                <div className="text-[7px] text-gray-500">ANALOG</div>
                <div className={`text-[9px] font-bold ${analogConnected ? 'text-green-600' : 'text-red-600'}`}>
  {analogConnected ? 'CONNECTED' : 'NOT CONNECTED'}
</div>
              </div>
            </div> */}

            {/* Control Buttons */}
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
              {actions.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-[9px] font-bold mb-1 text-gray-600">{section.title}</h3>
                  <div className="grid grid-cols-2 gap-1">
                    {section.buttons.map((btn, i) => {
                      const isDirection = btn.type === "direction";
                      const directionAvailable = isDirection
                        ? getDirectionAvailability(btn.directionTag)
                        : false;
                      const modeActive = section.title === "Remote Mode"
                        ? getModeActiveStatus(btn.modeTag)
                        : false;

                      return (
                        <button
                          key={i}
                          disabled={loading || !isAuthenticated()}
                          onClick={() => callApi(btn.label, btn.endpoint, btn.type)}
                          className={`relative w-full rounded border text-[8px] font-medium p-1 transition-all disabled:opacity-50 ${
                            isDirection 
                              ? getDirectionClass(directionAvailable)
                              : section.title === "Remote Mode"
                                ? getModeActiveClass(modeActive)
                                : colorClasses[btn.color]
                          }`}
                        >
                          <span className="truncate block">{btn.label}</span>
                          {(isDirection || section.title === "Remote Mode") && (
                            <div className="absolute -top-1 -right-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                isDirection 
                                  ? directionAvailable ? 'bg-green-500' : 'bg-gray-400'
                                  : modeActive ? 'bg-purple-500' : 'bg-gray-400'
                              }`}></div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Log */}
          <div className={`${cardBgClass} p-2 rounded-lg border ${cardBorderClass}`}>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[9px] font-bold uppercase">EVENT LOG</h3>
              <button
                onClick={clearLogs}
                className="text-[7px] px-1 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Clear
              </button>
            </div>
            <div className="h-20 overflow-y-auto text-[7px] font-mono space-y-1">
              {logs.length === 0 ? (
                <div className="text-center text-gray-500 py-2">No events</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="p-1 bg-gray-50 rounded border border-gray-200">
                    <span className="text-gray-500">[{log.timestamp}]</span>{' '}
                    <span className={log.type === 'ERROR' ? 'text-red-600' : 'text-gray-700'}>
                      {log.msg}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 pt-2 border-t border-gray-300">
        <div className="flex justify-between text-[7px] text-gray-600">
          <div className="flex space-x-2">
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span> ACTIVE</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1"></span> INACTIVE</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-[#0AC4E0] rounded-full mr-1"></span> INPUT</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span> OUTPUT</span>
          </div>
          <div>
            <span>ANALOG: {analogSignals.length} • </span>
            <span>IN: {biSignals.length} • </span>
            <span>OUT: {boSignals.length} • </span>
            <span>CTRL: {loading ? 'EXEC' : 'STDBY'}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full border border-gray-300">
            <div className="bg-gradient-to-r from-[#0AC4E0] to-[#0A8B9F] p-3 rounded-t-xl">
              <h3 className="text-white font-bold text-sm">Confirm Command</h3>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-700 mb-2">Execute: <span className="font-bold text-[#0AC4E0]">{confirmDialog.command}</span></p>
              <p className="text-[9px] text-gray-500 mb-3">This will send a command to the control system.</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-3 py-1 text-xs bg-[#0AC4E0] hover:bg-[#0A8B9F] text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}