// import { useEffect, useState, useCallback, useRef } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const STREAM_URL = "https://mqtt-testing-2.onrender.com/api/v1/stream/analog";
// const MAX_POINTS = 40;
// const UPDATE_THROTTLE_MS = 200;

// export default function AnalogStream() {
//   const [connected, setConnected] = useState(false);
//   const [latest, setLatest] = useState([]);
//   const [history, setHistory] = useState({});
//   const [stats, setStats] = useState({});
//   const [isDarkMode, setIsDarkMode] = useState(true); // Added theme state
//   const lastUpdateRef = useRef(Date.now());
//   const updateTimeoutRef = useRef(null);
//   const eventSourceRef = useRef(null);

//   // Professional color schemes for both themes
//   const darkThemeColors = {
//     primary: '#3b82f6',     // Blue
//     secondary: '#10b981',   // Green
//     tertiary: '#8b5cf6',    // Purple
//     warning: '#f59e0b',     // Amber
//     danger: '#ef4444',      // Red
//     success: '#06b6d4',     // Cyan
//     accent: '#84cc16',      // Lime
//     highlight: '#ec4899'    // Pink
//   };

//   const lightThemeColors = {
//     primary: '#2563eb',     // Deeper Blue
//     secondary: '#059669',   // Deeper Green
//     tertiary: '#7c3aed',    // Deeper Purple
//     warning: '#d97706',     // Deeper Amber
//     danger: '#dc2626',      // Deeper Red
//     success: '#0891b2',     // Deeper Cyan
//     accent: '#65a30d',      // Deeper Lime
//     highlight: '#db2777'    // Deeper Pink
//   };

//   // Theme-based signal colors
//   const signalColors = Object.values(isDarkMode ? darkThemeColors : lightThemeColors);

//   // Theme-based styling
//   const themeStyles = {
//     // Backgrounds
//     bg: {
//       primary: isDarkMode ? 'bg-gray-900' : 'bg-gray-300',
//       secondary: isDarkMode ? 'bg-gray-800' : 'bg-white',
//       card: isDarkMode ? 'bg-gray-800/90' : 'bg-white/90',
//       hover: isDarkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-600',
//     },
    
//     // Text
//     text: {
//       primary: isDarkMode ? 'text-gray-200' : 'text-gray-900',
//       secondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
//       tertiary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
//       muted: isDarkMode ? 'text-gray-500' : 'text-gray-500',
//       accent: isDarkMode ? 'text-blue-400' : 'text-blue-600',
//       success: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
//       warning: isDarkMode ? 'text-amber-400' : 'text-amber-600',
//       danger: isDarkMode ? 'text-red-400' : 'text-red-600',
//     },
    
//     // Borders
//     border: {
//       primary: isDarkMode ? 'border-gray-700' : 'border-gray-300',
//       secondary: isDarkMode ? 'border-gray-600' : 'border-gray-400',
//       accent: isDarkMode ? 'border-blue-500' : 'border-blue-400',
//       success: isDarkMode ? 'border-emerald-500' : 'border-emerald-400',
//       warning: isDarkMode ? 'border-amber-500' : 'border-amber-400',
//       danger: isDarkMode ? 'border-red-500' : 'border-red-400',
//     },
    
//     // Status Indicators
//     status: {
//       connected: isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400',
//       disconnected: isDarkMode ? 'bg-red-500' : 'bg-red-400',
//       stable: isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400',
//       warning: isDarkMode ? 'bg-amber-500' : 'bg-amber-400',
//       critical: isDarkMode ? 'bg-red-500' : 'bg-red-400',
//     },
    
//     // Cards and Panels
//     card: {
//       bg: isDarkMode ? 'bg-gray-800/80' : 'bg-white/80 backdrop-blur-sm',
//       border: isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50',
//       // shadow: isDarkMode ? 'shadow-lg shadow-black/20' : 'shadow-lg shadow-gray-200/50',
//     },
//   };

//   // Toggle theme function
//   const toggleTheme = () => {
//     setIsDarkMode(prev => !prev);
//   };

//   // Memoized statistics calculation
//   const calculateStats = useCallback((data) => {
//     const validValues = data.map(d => d.value).filter(v => v !== null && !isNaN(v));
//     if (validValues.length === 0) return null;
    
//     const { min, max, sum } = validValues.reduce((acc, val) => {
//       if (val < acc.min) acc.min = val;
//       if (val > acc.max) acc.max = val;
//       acc.sum += val;
//       return acc;
//     }, { min: Infinity, max: -Infinity, sum: 0 });
    
//     return { 
//       min: Number(min.toFixed(2)), 
//       max: Number(max.toFixed(2)), 
//       avg: Number((sum / validValues.length).toFixed(2)),
//       count: validValues.length
//     };
//   }, []);

//   // Calculate percentage change
//   const calculateChange = useCallback((current, avg, min, max) => {
//     if (current === null || avg === null || avg === undefined) return 0;
//     const range = max - min;
//     if (range === 0) return 0;
//     return Number(((current - avg) / range * 100).toFixed(1));
//   }, []);

//   // Optimized stream data processing with throttling
//   const processStreamData = useCallback((data) => {
//     if (!data.analog?.length) return;

//     const now = Date.now();
    
//     if (now - lastUpdateRef.current < UPDATE_THROTTLE_MS) {
//       return;
//     }
    
//     lastUpdateRef.current = now;

//     if (updateTimeoutRef.current) {
//       clearTimeout(updateTimeoutRef.current);
//     }

//     updateTimeoutRef.current = requestAnimationFrame(() => {
//       const ts = data.timestamp || now;
//       const newLatest = data.analog;
      
//       setLatest(newLatest);
      
//       setHistory(prev => {
//         const updated = { ...prev };
//         const newStats = {};

//         newLatest.forEach((sig, index) => {
//           const tag = sig.tag;
//           if (!updated[tag]) {
//             updated[tag] = [];
//           }
          
//           updated[tag] = [
//             ...updated[tag],
//             { 
//               time: ts, 
//               value: sig.value !== null ? Number(sig.value.toFixed(3)) : null 
//             }
//           ].slice(-MAX_POINTS);

//           const signalStats = calculateStats(updated[tag]);
//           if (signalStats) {
//             newStats[tag] = signalStats;
//           }
//         });

//         setStats(prev => ({ ...prev, ...newStats }));
//         return updated;
//       });
//     });
//   }, [calculateStats]);

//   // Format time with memoization
//   const formatTime = useCallback((timestamp) => {
//     const date = new Date(timestamp);
//     return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
//   }, []);

//   // Get color for signal
//   const getSignalColor = useCallback((index) => 
//     signalColors[index % signalColors.length], 
//     [signalColors]
//   );

//   // Custom tooltip component
//   const CustomTooltip = useCallback(({ active, payload, label }) => {
//     if (!active || !payload || !payload.length) return null;
    
//     const tooltipBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
//     const tooltipBorder = isDarkMode ? 'border-gray-700' : 'border-gray-300';
//     const textMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500';
//     const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
    
//     return (
//       <div className={`${tooltipBg} border ${tooltipBorder} rounded-lg p-3 shadow-xl backdrop-blur-sm`}>
//         <p className={`text-xs ${textMuted} mb-2 font-medium`}>{formatTime(label)}</p>
//         {payload.map((pld, index) => (
//           <p key={index} className="text-sm font-medium" style={{ color: pld.color }}>
//             {pld.dataKey}: <span className={`font-bold ${textPrimary}`}>{pld.value?.toFixed(3) ?? '--'}</span>
//           </p>
//         ))}
//       </div>
//     );
//   }, [formatTime, isDarkMode]);

//   // Optimized SSE connection
//   useEffect(() => {
//     let reconnectTimeout;
//     let isMounted = true;

//     const connect = () => {
//       try {
//         if (eventSourceRef.current) {
//           eventSourceRef.current.close();
//         }

//         eventSourceRef.current = new EventSource(STREAM_URL);

//         eventSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setConnected(true);
//         };

//         eventSourceRef.current.onmessage = (event) => {
//           if (!isMounted) return;
//           try {
//             const data = JSON.parse(event.data);
//             processStreamData(data);
//           } catch (err) {
//             console.error("Parse error:", err);
//           }
//         };

//         eventSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           console.error('SSE Error:', error);
//           setConnected(false);
          
//           if (eventSourceRef.current) {
//             eventSourceRef.current.close();
//             eventSourceRef.current = null;
//           }
          
//           if (isMounted) {
//             reconnectTimeout = setTimeout(() => {
//               if (isMounted) connect();
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("Connection error:", err);
//         setConnected(false);
//       }
//     };

//     connect();

//     return () => {
//       isMounted = false;
      
//       if (reconnectTimeout) {
//         clearTimeout(reconnectTimeout);
//       }
      
//       if (eventSourceRef.current) {
//         eventSourceRef.current.close();
//         eventSourceRef.current = null;
//       }
      
//       if (updateTimeoutRef.current) {
//         cancelAnimationFrame(updateTimeoutRef.current);
//       }
//     };
//   }, [processStreamData]);

//   return (
//     <div className={`min-h-screen ${themeStyles.bg.primary} ${themeStyles.text.primary} transition-colors duration-300 p-3 md:p-4`}>
      
//       {/* Status Bar with Theme Toggle */}
//       <div className={`mb-4 p-4 rounded-xl ${themeStyles.card.bg} ${themeStyles.card.border} ${themeStyles.card.shadow} backdrop-blur-sm`}>
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//           <div className="flex items-center space-x-3">
//             <div className={`w-3 h-3 rounded-full ${connected ? themeStyles.status.connected : themeStyles.status.disconnected} ${connected ? 'animate-pulse' : ''}`}></div>
//             <h1 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
//               ANALOG SIGNAL MONITOR
//             </h1>
//             <span className={`text-xs ${themeStyles.text.tertiary} ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} px-2 py-1 rounded`}>
//               {Object.keys(history).length} ACTIVE SIGNALS
//             </span>
//           </div>
          
//           <div className="flex items-center gap-3">
//             {/* Theme Toggle Button */}
//             <button
//               onClick={toggleTheme}
//               className={`p-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${
//                 isDarkMode 
//                   ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' 
//                   : 'bg-blue-50 hover:bg-blue-100 border border-blue-200'
//               }`}
//               aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
//             >
//               {isDarkMode ? (
//                 <div className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//                   </svg>
//                   {/* <span className="text-xs text-gray-300 hidden sm:inline">Light Mode</span> */}
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//                   </svg>
//                   {/* <span className="text-xs text-blue-700 hidden sm:inline">Dark Mode</span> */}
//                 </div>
//               )}
//             </button>
            
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs">
//               <div className="flex items-center gap-3">
//                 <span className={themeStyles.text.muted}>{MAX_POINTS} SAMPLES</span>
//                 <span className={`px-2.5 py-1 rounded-full font-medium ${
//                   connected 
//                     ? (isDarkMode ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-300') 
//                     : (isDarkMode ? 'bg-red-900/30 text-red-300 border border-red-700/30' : 'bg-red-100 text-red-700 border border-red-300')
//                 }`}>
//                   {connected ? 'LIVE STREAM' : 'OFFLINE'}
//                 </span>
//               </div>
//               <span className={`${themeStyles.text.muted} hidden sm:block`}>200ms INTERVAL</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Current Values - Compact Overview */}
//       {latest.length > 0 && (
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className={`text-sm font-semibold ${themeStyles.text.secondary} uppercase tracking-wide`}>
//               LIVE SIGNAL VALUES
//             </h2>
//             <span className={`text-xs ${themeStyles.text.muted}`}>Updated every 200ms</span>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//             {latest.map((item, index) => {
//               const signalStats = stats[item.tag];
//               const change = signalStats ? calculateChange(
//                 item.value, 
//                 signalStats.avg, 
//                 signalStats.min, 
//                 signalStats.max
//               ) : 0;

//               return (
//                 <div
//                   key={`live-${item.tag}`}
//                   className={`p-3.5 rounded-xl border transition-all duration-300 ${themeStyles.card.shadow} ${
//                     isDarkMode 
//                       ? 'bg-gray-800/80 border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800' 
//                       : 'bg-gray-50 border-gray-300/50 hover:border-blue-400/50 hover:bg-gray-300'
//                   }`}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex-1 min-w-0">
//                       <div className={`text-xs font-semibold ${themeStyles.text.secondary} truncate`} title={item.tag}>
//                         {item.tag}
//                       </div>
//                       <div className={`text-[10px] ${themeStyles.text.muted} font-mono truncate mt-0.5`}>
//                         {item.address}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className={`text-lg font-bold font-mono ${themeStyles.text.primary} mb-2`}>
//                     {item.value !== null ? item.value.toFixed(2) : '--'}
//                   </div>

//                   {signalStats && (
//                     <div className="pt-2.5 border-t border-gray-700/30">
//                       <div className="grid grid-cols-3 gap-2 text-[10px]">
//                         <div className="text-center">
//                           <div className={`${themeStyles.text.muted} mb-1`}>MIN</div>
//                           <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.min}>
//                             {signalStats.min}
//                           </div>
//                         </div>
//                         <div className="text-center">
//                           <div className={`${themeStyles.text.muted} mb-1`}>AVG</div>
//                           <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.avg}>
//                             {signalStats.avg}
//                           </div>
//                         </div>
//                         <div className="text-center">
//                           <div className={`${themeStyles.text.muted} mb-1`}>MAX</div>
//                           <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.max}>
//                             {signalStats.max}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Full-Width Charts */}
//       <div className="space-y-5">
//         <div className="flex items-center justify-between mb-3">
//           <h2 className={`text-sm font-semibold ${themeStyles.text.secondary} uppercase tracking-wide`}>
//             SIGNAL TRENDS
//           </h2>
//           <span className={`text-xs ${themeStyles.text.muted}`}>
//             {Object.keys(history).length} charts • {MAX_POINTS} samples each
//           </span>
//         </div>

//         {Object.entries(history).map(([tag, data], index) => {
//           const signalStats = stats[tag];
//           const currentValue = latest.find(sig => sig.tag === tag)?.value;
//           const color = getSignalColor(index);
//           const change = signalStats ? calculateChange(
//             currentValue, 
//             signalStats.avg, 
//             signalStats.min, 
//             signalStats.max
//           ) : 0;

//           const getTrendStatus = () => {
//             const absChange = Math.abs(change);
//             if (absChange > 15) return { 
//               text: 'CRITICAL', 
//               color: isDarkMode ? 'text-red-300' : 'text-red-600', 
//               bg: isDarkMode ? 'bg-red-900/20' : 'bg-red-100', 
//               border: isDarkMode ? 'border-red-700/50' : 'border-red-300' 
//             };
//             if (absChange > 5) return { 
//               text: 'WARNING', 
//               color: isDarkMode ? 'text-amber-300' : 'text-amber-600', 
//               bg: isDarkMode ? 'bg-amber-900/20' : 'bg-amber-100', 
//               border: isDarkMode ? 'border-amber-700/50' : 'border-amber-300' 
//             };
//             if (change > 0) return { 
//               text: 'RISING', 
//               color: isDarkMode ? 'text-emerald-300' : 'text-emerald-600', 
//               bg: isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-100', 
//               border: isDarkMode ? 'border-emerald-700/50' : 'border-emerald-300' 
//             };
//             if (change < 0) return { 
//               text: 'FALLING', 
//               color: isDarkMode ? 'text-blue-300' : 'text-blue-600', 
//               bg: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100', 
//               border: isDarkMode ? 'border-blue-700/50' : 'border-blue-300' 
//             };
//             return { 
//               text: 'STABLE', 
//               color: isDarkMode ? 'text-gray-400' : 'text-gray-600', 
//               bg: isDarkMode ? 'bg-gray-800' : 'bg-gray-200', 
//               border: isDarkMode ? 'border-gray-700' : 'border-gray-400' 
//             };
//           };

//           const trendStatus = getTrendStatus();

//           return (
//             <div
//               key={`chart-${tag}`}
//               className={`rounded-xl border ${trendStatus.border} transition-all duration-300 ${
//                 isDarkMode 
//                   ? 'bg-gray-800/80 backdrop-blur-sm' 
//                   : 'bg-white/90 backdrop-blur-sm'
//               } ${themeStyles.card.shadow}`}
//             >
//               {/* Chart Header */}
//               <div className="p-5 border-b border-gray-700/30">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                   <div className="flex items-center space-x-4">
//                     <div
//                       className="w-4 h-4 rounded-full shadow-lg"
//                       style={{ backgroundColor: color }}
//                     ></div>
//                     <div>
//                       <div className={`text-lg font-bold ${themeStyles.text.primary} truncate max-w-md`} title={tag}>
//                         {tag}
//                       </div>
//                       <div className={`text-xs ${themeStyles.text.muted} font-mono mt-1`}>
//                         Address: {latest.find(sig => sig.tag === tag)?.address || 'N/A'}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-4">
//                     <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${trendStatus.bg} ${trendStatus.color} border ${trendStatus.border} backdrop-blur-sm`}>
//                       {trendStatus.text}
//                     </div>
//                     <div className="text-right">
//                       <div className={`text-xs ${themeStyles.text.muted}`}>CURRENT VALUE</div>
//                       <div className={`text-xl font-bold font-mono ${themeStyles.text.primary}`}>
//                         {currentValue !== null ? currentValue.toFixed(3) : '--'}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quick Stats Row */}
//                 {signalStats && (
//                   <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="text-center">
//                       <div className={`text-xs ${themeStyles.text.muted} mb-1.5`}>MINIMUM</div>
//                       <div className={`text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
//                         {signalStats.min}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className={`text-xs ${themeStyles.text.muted} mb-1.5`}>AVERAGE</div>
//                       <div className={`text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
//                         {signalStats.avg}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className={`text-xs ${themeStyles.text.muted} mb-1.5`}>MAXIMUM</div>
//                       <div className={`text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
//                         {signalStats.max}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className={`text-xs ${themeStyles.text.muted} mb-1.5`}>DEVIATION</div>
//                       <div className={`text-sm font-bold font-mono ${trendStatus.color}`}>
//                         {change}%
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Full-Width Chart */}
//               <div className="p-5">
//                 <div className="h-72">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart
//                       data={[...data].reverse()}
//                       margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
//                     >
//                       <CartesianGrid 
//                         strokeDasharray="3 3" 
//                         stroke={isDarkMode ? '#374151' : '#e5e7eb'} 
//                         strokeOpacity={isDarkMode ? 0.5 : 0.3}
//                       />
//                       <XAxis
//                         dataKey="time"
//                         tickFormatter={formatTime}
//                         fontSize={10}
//                         tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
//                         axisLine={{ stroke: isDarkMode ? '#4b5563' : '#d1d5db' }}
//                         tickLine={{ stroke: isDarkMode ? '#4b5563' : '#d1d5db' }}
//                         minTickGap={20}
//                       />
//                       <YAxis
//                         fontSize={10}
//                         tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
//                         axisLine={{ stroke: isDarkMode ? '#4b5563' : '#d1d5db' }}
//                         tickLine={{ stroke: isDarkMode ? '#4b5563' : '#d1d5db' }}
//                         width={50}
//                         tickFormatter={(v) => v?.toFixed(2)}
//                       />
//                       <Tooltip
//                         content={<CustomTooltip />}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="value"
//                         stroke={color}
//                         strokeWidth={2}
//                         dot={false}
//                         activeDot={{
//                           r: 5,
//                           fill: color,
//                           stroke: isDarkMode ? '#ffffff' : '#1f2937',
//                           strokeWidth: 2
//                         }}
//                         isAnimationActive={false}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Chart Footer */}
//               <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700/50 bg-gray-900/50' : 'border-gray-300/50 bg-gray-50/50'} rounded-b-xl`}>
//                 <div className={`text-xs ${themeStyles.text.muted} flex flex-col sm:flex-row justify-between items-center gap-2`}>
//                   <span>Samples: {data.length} / {MAX_POINTS}</span>
//                   <span>Range: {signalStats ? (signalStats.max - signalStats.min).toFixed(3) : '--'}</span>
//                   <span>Updated: {data.length > 0 ? formatTime(data[data.length - 1].time) : '--'}</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         {Object.keys(history).length === 0 && (
//           <div className={`rounded-xl border ${themeStyles.border.primary} p-10 text-center backdrop-blur-sm ${
//             isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
//           }`}>
//             <div className={`text-lg ${themeStyles.text.secondary} mb-3`}>No signal data available</div>
//             <div className={`text-sm ${themeStyles.text.muted}`}>
//               {connected ? 'Waiting for data stream...' : 'Connecting to data source...'}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* System Status Footer */}
//       <div className={`mt-7 pt-5 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center space-x-2">
//               <div className={`w-2.5 h-2.5 rounded-full ${themeStyles.status.stable}`}></div>
//               <span className={themeStyles.text.tertiary}>STABLE (±5%)</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className={`w-2.5 h-2.5 rounded-full ${themeStyles.status.warning}`}></div>
//               <span className={themeStyles.text.tertiary}>WARNING (±5-15%)</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className={`w-2.5 h-2.5 rounded-full ${themeStyles.status.critical}`}></div>
//               <span className={themeStyles.text.tertiary}>CRITICAL (&gt;±15%)</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center gap-2 mb-1">
//               <div className={`w-2.5 h-2.5 rounded-full ${connected ? themeStyles.status.connected : themeStyles.status.disconnected} ${connected ? 'animate-pulse' : ''}`}></div>
//               <span className={themeStyles.text.tertiary}>
//                 STREAM: {connected ? 'ACTIVE' : 'DISCONNECTED'}
//               </span>
//             </div>
//             <div className={`${themeStyles.text.muted} flex items-center gap-2`}>
//               <span>INDUSTRIAL ANALYTICS v1.0</span>
//               <span>•</span>
//               <span className="flex items-center gap-1">
//                 <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-blue-500'}`}></span>
//                 {isDarkMode ? 'Dark' : 'Light'} Theme
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











// import { useEffect, useState, useCallback, useRef } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const STREAM_URL = "https://mqtt-testing-2.onrender.com/api/v1/stream/analog";
// const MAX_POINTS = 40;
// const UPDATE_THROTTLE_MS = 200;

// export default function AnalogStream() {
//   const [connected, setConnected] = useState(false);
//   const [latest, setLatest] = useState([]);
//   const [history, setHistory] = useState({});
//   const [stats, setStats] = useState({});
//   const lastUpdateRef = useRef(Date.now());
//   const updateTimeoutRef = useRef(null);
//   const eventSourceRef = useRef(null);

//   // Light theme colors with #0AC4E0 as primary
//   const themeColors = {
//     primary: '#0AC4E0',     // Cyan primary
//     secondary: '#059669',   // Green
//     tertiary: '#7c3aed',    // Purple
//     warning: '#d97706',     // Amber
//     danger: '#dc2626',      // Red
//     success: '#0891b2',     // Cyan/Blue
//     accent: '#65a30d',      // Lime
//     highlight: '#db2777'    // Pink
//   };

//   // Theme-based signal colors
//   const signalColors = Object.values(themeColors);

//   // Light theme styling
//   const themeStyles = {
//     // Backgrounds
//     bg: {
//       primary: 'bg-gray-100',
//       secondary: 'bg-white',
//       card: 'bg-white/90 backdrop-blur-sm',
//       hover: 'hover:bg-gray-200',
//     },
    
//     // Text
//     text: {
//       primary: 'text-gray-900',
//       secondary: 'text-gray-700',
//       tertiary: 'text-gray-600',
//       muted: 'text-gray-500',
//       accent: 'text-[#0AC4E0]',
//       success: 'text-emerald-600',
//       warning: 'text-amber-600',
//       danger: 'text-red-600',
//     },
    
//     // Borders
//     border: {
//       primary: 'border-gray-300',
//       secondary: 'border-gray-400',
//       accent: 'border-[#0AC4E0]',
//       success: 'border-emerald-400',
//       warning: 'border-amber-400',
//       danger: 'border-red-400',
//     },
    
//     // Status Indicators
//     status: {
//       connected: 'bg-[#0AC4E0]',
//       disconnected: 'bg-red-500',
//       stable: 'bg-emerald-500',
//       warning: 'bg-amber-500',
//       critical: 'bg-red-500',
//     },
    
//     // Cards and Panels
//     card: {
//       bg: 'bg-white/80 backdrop-blur-sm',
//       border: 'border-gray-300/50',
//       shadow: 'shadow-lg shadow-gray-200/50',
//     },
//   };

//   // Memoized statistics calculation
//   const calculateStats = useCallback((data) => {
//     const validValues = data.map(d => d.value).filter(v => v !== null && !isNaN(v));
//     if (validValues.length === 0) return null;
    
//     const { min, max, sum } = validValues.reduce((acc, val) => {
//       if (val < acc.min) acc.min = val;
//       if (val > acc.max) acc.max = val;
//       acc.sum += val;
//       return acc;
//     }, { min: Infinity, max: -Infinity, sum: 0 });
    
//     return { 
//       min: Number(min.toFixed(2)), 
//       max: Number(max.toFixed(2)), 
//       avg: Number((sum / validValues.length).toFixed(2)),
//       count: validValues.length
//     };
//   }, []);

//   // Calculate percentage change
//   const calculateChange = useCallback((current, avg, min, max) => {
//     if (current === null || avg === null || avg === undefined) return 0;
//     const range = max - min;
//     if (range === 0) return 0;
//     return Number(((current - avg) / range * 100).toFixed(1));
//   }, []);

//   // Optimized stream data processing with throttling
//   const processStreamData = useCallback((data) => {
//     if (!data.analog?.length) return;

//     const now = Date.now();
    
//     if (now - lastUpdateRef.current < UPDATE_THROTTLE_MS) {
//       return;
//     }
    
//     lastUpdateRef.current = now;

//     if (updateTimeoutRef.current) {
//       clearTimeout(updateTimeoutRef.current);
//     }

//     updateTimeoutRef.current = requestAnimationFrame(() => {
//       const ts = data.timestamp || now;
//       const newLatest = data.analog;
      
//       setLatest(newLatest);
      
//       setHistory(prev => {
//         const updated = { ...prev };
//         const newStats = {};

//         newLatest.forEach((sig, index) => {
//           const tag = sig.tag;
//           if (!updated[tag]) {
//             updated[tag] = [];
//           }
          
//           updated[tag] = [
//             ...updated[tag],
//             { 
//               time: ts, 
//               value: sig.value !== null ? Number(sig.value.toFixed(3)) : null 
//             }
//           ].slice(-MAX_POINTS);

//           const signalStats = calculateStats(updated[tag]);
//           if (signalStats) {
//             newStats[tag] = signalStats;
//           }
//         });

//         setStats(prev => ({ ...prev, ...newStats }));
//         return updated;
//       });
//     });
//   }, [calculateStats]);

//   // Format time with memoization
//   const formatTime = useCallback((timestamp) => {
//     const date = new Date(timestamp);
//     return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
//   }, []);

//   // Get color for signal
//   const getSignalColor = useCallback((index) => 
//     signalColors[index % signalColors.length], 
//     [signalColors]
//   );

//   // Custom tooltip component
//   const CustomTooltip = useCallback(({ active, payload, label }) => {
//     if (!active || !payload || !payload.length) return null;
    
//     return (
//       <div className={`bg-white border border-gray-300 rounded-lg p-2 sm:p-3 shadow-xl`}>
//         <p className="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2 font-medium">{formatTime(label)}</p>
//         {payload.map((pld, index) => (
//           <p key={index} className="text-xs sm:text-sm font-medium" style={{ color: pld.color }}>
//             {pld.dataKey}: <span className="font-bold text-gray-900">{pld.value?.toFixed(3) ?? '--'}</span>
//           </p>
//         ))}
//       </div>
//     );
//   }, [formatTime]);

//   // Optimized SSE connection
//   useEffect(() => {
//     let reconnectTimeout;
//     let isMounted = true;

//     const connect = () => {
//       try {
//         if (eventSourceRef.current) {
//           eventSourceRef.current.close();
//         }

//         eventSourceRef.current = new EventSource(STREAM_URL);

//         eventSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setConnected(true);
//         };

//         eventSourceRef.current.onmessage = (event) => {
//           if (!isMounted) return;
//           try {
//             const data = JSON.parse(event.data);
//             processStreamData(data);
//           } catch (err) {
//             console.error("Parse error:", err);
//           }
//         };

//         eventSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           console.error('SSE Error:', error);
//           setConnected(false);
          
//           if (eventSourceRef.current) {
//             eventSourceRef.current.close();
//             eventSourceRef.current = null;
//           }
          
//           if (isMounted) {
//             reconnectTimeout = setTimeout(() => {
//               if (isMounted) connect();
//             }, 1000);
//           }
//         };
//       } catch (err) {
//         console.error("Connection error:", err);
//         setConnected(false);
//       }
//     };

//     connect();

//     return () => {
//       isMounted = false;
      
//       if (reconnectTimeout) {
//         clearTimeout(reconnectTimeout);
//       }
      
//       if (eventSourceRef.current) {
//         eventSourceRef.current.close();
//         eventSourceRef.current = null;
//       }
      
//       if (updateTimeoutRef.current) {
//         cancelAnimationFrame(updateTimeoutRef.current);
//       }
//     };
//   }, [processStreamData]);

//   return (
//     <div className={`min-h-screen ${themeStyles.bg.primary} ${themeStyles.text.primary} p-2 sm:p-3 md:p-4`}>
      
//       {/* Status Bar */}
//       <div className={`mb-3 sm:mb-4 p-3 sm:p-4 rounded-xl ${themeStyles.card.bg} ${themeStyles.card.border} ${themeStyles.card.shadow} backdrop-blur-sm`}>
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
//           <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//             <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${connected ? themeStyles.status.connected : themeStyles.status.disconnected} ${connected ? 'animate-pulse' : ''}`}></div>
//             <h1 className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-[#0AC4E0] to-emerald-500 bg-clip-text text-transparent">
//               ANALOG SIGNAL MONITOR
//             </h1>
//             <span className={`text-[10px] sm:text-xs ${themeStyles.text.tertiary} bg-gray-200 px-2 py-0.5 sm:py-1 rounded-full`}>
//               {Object.keys(history).length} SIGNALS
//             </span>
//           </div>
          
//           <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//             <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2 text-[10px] sm:text-xs">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 {/* <span className={themeStyles.text.muted}>{MAX_POINTS} SAMPLES</span> */}
//                 <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium ${
//                   connected 
//                     ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
//                     : 'bg-red-100 text-red-700 border border-red-300'
//                 }`}>
//                   {connected ? 'LIVE' : 'OFFLINE'}
//                 </span>
//               </div>
//               <span className={`${themeStyles.text.muted} hidden xs:inline`}>200ms</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Current Values - Compact Overview */}
//       {latest.length > 0 && (
//         <div className="mb-4 sm:mb-6">
//           <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
//             <h2 className={`text-xs sm:text-sm font-semibold ${themeStyles.text.secondary} uppercase tracking-wide`}>
//               LIVE SIGNAL VALUES
//             </h2>
//             <span className={`text-[10px] sm:text-xs ${themeStyles.text.muted}`}>Updated every 200ms</span>
//           </div>
          
//           <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
//             {latest.map((item, index) => {
//               const signalStats = stats[item.tag];
//               const change = signalStats ? calculateChange(
//                 item.value, 
//                 signalStats.avg, 
//                 signalStats.min, 
//                 signalStats.max
//               ) : 0;

//               return (
//                 <div
//                   key={`live-${item.tag}`}
//                   className={`p-2 sm:p-3 rounded-lg border transition-all duration-300 ${themeStyles.card.shadow} bg-gray-50 border-gray-300/50 hover:border-[#0AC4E0]/50 hover:bg-gray-200`}
//                 >
//                   <div className="flex justify-between items-start mb-1 sm:mb-2">
//                     <div className="flex-1 min-w-0">
//                       <div className={`text-[10px] sm:text-xs font-semibold ${themeStyles.text.secondary} truncate`} title={item.tag}>
//                         {item.tag}
//                       </div>
//                       <div className={`text-[8px] sm:text-[10px] ${themeStyles.text.muted} font-mono truncate mt-0.5`}>
//                         {item.address}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className={`text-base sm:text-lg font-bold font-mono ${themeStyles.text.primary} mb-1 sm:mb-2`}>
//                     {item.value !== null ? item.value.toFixed(2) : '--'}
//                   </div>

//                   {signalStats && (
//                     <div className="pt-1.5 sm:pt-2 border-t border-gray-300/50">
//                       <div className="grid grid-cols-3 gap-1 sm:gap-2 text-[8px] sm:text-[10px]">
//                         <div className="text-center">
//                           <div className={`${themeStyles.text.muted} mb-0.5`}>MIN</div>
//                           <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.min}>
//                             {signalStats.min}
//                           </div>
//                         </div>
//                         <div className="text-center">
//                           <div className={`${themeStyles.text.muted} mb-0.5`}>AVG</div>
//                           <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.avg}>
//                             {signalStats.avg}
//                           </div>
//                         </div>
//                         <div className="text-center">
//                           <div className={`${themeStyles.text.muted} mb-0.5`}>MAX</div>
//                           <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.max}>
//                             {signalStats.max}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Full-Width Charts */}
//       <div className="space-y-4 sm:space-y-5">
//         {/* <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-3">
//           <h2 className={`text-xs sm:text-sm font-semibold ${themeStyles.text.secondary} uppercase tracking-wide`}>
//             SIGNAL TRENDS
//           </h2>
//           <span className={`text-[10px] sm:text-xs ${themeStyles.text.muted}`}>
//             {Object.keys(history).length} charts • {MAX_POINTS} samples
//           </span>
//         </div> */}

//         {Object.entries(history).map(([tag, data], index) => {
//           const signalStats = stats[tag];
//           const currentValue = latest.find(sig => sig.tag === tag)?.value;
//           const color = getSignalColor(index);
//           const change = signalStats ? calculateChange(
//             currentValue, 
//             signalStats.avg, 
//             signalStats.min, 
//             signalStats.max
//           ) : 0;

//           const getTrendStatus = () => {
//             const absChange = Math.abs(change);
//             if (absChange > 15) return { 
//               text: 'CRITICAL', 
//               color: 'text-red-600', 
//               bg: 'bg-red-100', 
//               border: 'border-red-300' 
//             };
//             if (absChange > 5) return { 
//               text: 'WARNING', 
//               color: 'text-amber-600', 
//               bg: 'bg-amber-100', 
//               border: 'border-amber-300' 
//             };
//             if (change > 0) return { 
//               text: 'RISING', 
//               color: 'text-emerald-600', 
//               bg: 'bg-emerald-100', 
//               border: 'border-emerald-300' 
//             };
//             if (change < 0) return { 
//               text: 'FALLING', 
//               color: 'text-[#0AC4E0]', 
//               bg: 'bg-cyan-100', 
//               border: 'border-[#0AC4E0]' 
//             };
//             return { 
//               text: 'STABLE', 
//               color: 'text-gray-600', 
//               bg: 'bg-gray-200', 
//               border: 'border-gray-400' 
//             };
//           };

//           const trendStatus = getTrendStatus();

//           return (
//             <div
//               key={`chart-${tag}`}
//               className={`rounded-lg sm:rounded-xl border ${trendStatus.border} transition-all duration-300 bg-white/90 backdrop-blur-sm ${themeStyles.card.shadow}`}
//             >
//               {/* Chart Header */}
//               <div className="p-3 sm:p-4 border-b border-gray-300/50">
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
//                   <div className="flex items-center space-x-2 sm:space-x-3">
//                     <div
//                       className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-lg flex-shrink-0"
//                       style={{ backgroundColor: color }}
//                     ></div>
//                     <div className="min-w-0">
//                       <div className={`text-sm sm:text-base font-bold ${themeStyles.text.primary} truncate max-w-[150px] sm:max-w-md`} title={tag}>
//                         {tag}
//                       </div>
//                       <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} font-mono mt-0.5`}>
//                         Address: {latest.find(sig => sig.tag === tag)?.address || 'N/A'}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//                     <div className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${trendStatus.bg} ${trendStatus.color} border ${trendStatus.border} backdrop-blur-sm`}>
//                       {trendStatus.text}
//                     </div>
//                     <div className="text-right">
//                       <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted}`}>CURRENT</div>
//                       <div className={`text-sm sm:text-base font-bold font-mono ${themeStyles.text.primary}`}>
//                         {currentValue !== null ? currentValue.toFixed(3) : '--'}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quick Stats Row */}
//                 {signalStats && (
//                   <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
//                     <div className="text-center">
//                       <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>MIN</div>
//                       <div className={`text-xs sm:text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
//                         {signalStats.min}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>AVG</div>
//                       <div className={`text-xs sm:text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
//                         {signalStats.avg}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>MAX</div>
//                       <div className={`text-xs sm:text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
//                         {signalStats.max}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>DEV</div>
//                       <div className={`text-xs sm:text-sm font-bold font-mono ${trendStatus.color}`}>
//                         {change}%
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Responsive Chart */}
//               <div className="p-3 sm:p-4">
//                 <div className="h-48 xs:h-56 sm:h-64 md:h-72">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart
//                       data={[...data].reverse()}
//                       margin={{ top: 5, right: 10, left: 0, bottom: 10 }}
//                     >
//                       <CartesianGrid 
//                         strokeDasharray="3 3" 
//                         stroke="#e5e7eb" 
//                         strokeOpacity={0.5}
//                       />
//                       <XAxis
//                         dataKey="time"
//                         tickFormatter={formatTime}
//                         fontSize={8}
//                         tick={{ fill: '#6b7280' }}
//                         axisLine={{ stroke: '#d1d5db' }}
//                         tickLine={{ stroke: '#d1d5db' }}
//                         minTickGap={15}
//                         height={30}
//                       />
//                       <YAxis
//                         fontSize={8}
//                         tick={{ fill: '#6b7280' }}
//                         axisLine={{ stroke: '#d1d5db' }}
//                         tickLine={{ stroke: '#d1d5db' }}
//                         width={35}
//                         tickFormatter={(v) => v?.toFixed(1)}
//                       />
//                       <Tooltip
//                         content={<CustomTooltip />}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="value"
//                         stroke={color}
//                         strokeWidth={1.5}
//                         dot={false}
//                         activeDot={{
//                           r: 3,
//                           fill: color,
//                           stroke: '#ffffff',
//                           strokeWidth: 2
//                         }}
//                         isAnimationActive={false}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Chart Footer */}
//               <div className={`p-2 sm:p-3 border-t border-gray-300/50 bg-gray-50/50 rounded-b-lg sm:rounded-b-xl`}>
//                 <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} flex flex-col xs:flex-row justify-between items-center gap-1 xs:gap-2`}>
//                   <span>Samples: {data.length} / {MAX_POINTS}</span>
//                   <span>Range: {signalStats ? (signalStats.max - signalStats.min).toFixed(3) : '--'}</span>
//                   <span>Updated: {data.length > 0 ? formatTime(data[data.length - 1].time) : '--'}</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         {Object.keys(history).length === 0 && (
//           <div className={`rounded-lg sm:rounded-xl border ${themeStyles.border.primary} p-6 sm:p-10 text-center backdrop-blur-sm bg-white/80`}>
//             <div className={`text-sm sm:text-lg ${themeStyles.text.secondary} mb-2 sm:mb-3`}>No signal data available</div>
//             <div className={`text-xs sm:text-sm ${themeStyles.text.muted}`}>
//               {connected ? 'Waiting for data stream...' : 'Connecting to data source...'}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* System Status Footer */}
//       <div className={`mt-5 sm:mt-7 pt-4 sm:pt-5 border-t border-gray-300`}>
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
//           {/* <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
//             <div className="flex items-center space-x-1.5 sm:space-x-2">
//               <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${themeStyles.status.stable}`}></div>
//               <span className={themeStyles.text.tertiary}>STABLE</span>
//             </div>
//             <div className="flex items-center space-x-1.5 sm:space-x-2">
//               <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${themeStyles.status.warning}`}></div>
//               <span className={themeStyles.text.tertiary}>WARNING</span>
//             </div>
//             <div className="flex items-center space-x-1.5 sm:space-x-2">
//               <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${themeStyles.status.critical}`}></div>
//               <span className={themeStyles.text.tertiary}>CRITICAL</span>
//             </div>
//           </div> */}
//           {/* <div className="text-center sm:text-right">
//             <div className="flex items-center justify-center sm:justify-end gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
//               <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${connected ? themeStyles.status.connected : themeStyles.status.disconnected} ${connected ? 'animate-pulse' : ''}`}></div>
//               <span className={themeStyles.text.tertiary}>
//                 {connected ? 'ACTIVE' : 'OFFLINE'}
//               </span>
//             </div>
//             <div className={`${themeStyles.text.muted} flex items-center justify-center sm:justify-end gap-1 sm:gap-2`}>
//               <span>ANALYTICS v1.0</span>
//               <span>•</span>
//               <span className="flex items-center gap-1">
//                 <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0AC4E0]"></span>
//                 Light Theme
//               </span>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }








// import { useEffect, useState, useCallback, useRef } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const STREAM_URL = "https://mqtt-testing-2.onrender.com/api/v1/stream/analog";
// const MAX_POINTS = 40;
// const UPDATE_THROTTLE_MS = 200;

// export default function AnalogStream() {
//   const [connected, setConnected] = useState(false);
//   const [latest, setLatest] = useState([]);
//   const [history, setHistory] = useState({});
//   const [stats, setStats] = useState({});
//   const [authError, setAuthError] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const lastUpdateRef = useRef(Date.now());
//   const updateTimeoutRef = useRef(null);
//   const eventSourceRef = useRef(null);
//   const reconnectTimeoutRef = useRef(null);

//   // Helper function to get auth token
//   const getAuthToken = () => {
//     return localStorage.getItem("token") || sessionStorage.getItem("token");
//   };

//   // Check authentication status
//   useEffect(() => {
//     const token = getAuthToken();
//     setIsAuthenticated(!!token);
//   }, []);

//   // Light theme colors with #0AC4E0 as primary
//   const themeColors = {
//     primary: '#0AC4E0',     // Cyan primary
//     secondary: '#059669',   // Green
//     tertiary: '#7c3aed',    // Purple
//     warning: '#d97706',     // Amber
//     danger: '#dc2626',      // Red
//     success: '#0891b2',     // Cyan/Blue
//     accent: '#65a30d',      // Lime
//     highlight: '#db2777'    // Pink
//   };

//   // Theme-based signal colors
//   const signalColors = Object.values(themeColors);

//   // Light theme styling
//   const themeStyles = {
//     // Backgrounds
//     bg: {
//       primary: 'bg-gray-100',
//       secondary: 'bg-white',
//       card: 'bg-white/90 backdrop-blur-sm',
//       hover: 'hover:bg-gray-200',
//     },
    
//     // Text
//     text: {
//       primary: 'text-gray-900',
//       secondary: 'text-gray-700',
//       tertiary: 'text-gray-600',
//       muted: 'text-gray-500',
//       accent: 'text-[#0AC4E0]',
//       success: 'text-emerald-600',
//       warning: 'text-amber-600',
//       danger: 'text-red-600',
//     },
    
//     // Borders
//     border: {
//       primary: 'border-gray-300',
//       secondary: 'border-gray-400',
//       accent: 'border-[#0AC4E0]',
//       success: 'border-emerald-400',
//       warning: 'border-amber-400',
//       danger: 'border-red-400',
//     },
    
//     // Status Indicators
//     status: {
//       connected: 'bg-[#0AC4E0]',
//       disconnected: 'bg-red-500',
//       stable: 'bg-emerald-500',
//       warning: 'bg-amber-500',
//       critical: 'bg-red-500',
//     },
    
//     // Cards and Panels
//     card: {
//       bg: 'bg-white/80 backdrop-blur-sm',
//       border: 'border-gray-300/50',
//       shadow: 'shadow-lg shadow-gray-200/50',
//     },
//   };

//   // Memoized statistics calculation
//   const calculateStats = useCallback((data) => {
//     const validValues = data.map(d => d.value).filter(v => v !== null && !isNaN(v));
//     if (validValues.length === 0) return null;
    
//     const { min, max, sum } = validValues.reduce((acc, val) => {
//       if (val < acc.min) acc.min = val;
//       if (val > acc.max) acc.max = val;
//       acc.sum += val;
//       return acc;
//     }, { min: Infinity, max: -Infinity, sum: 0 });
    
//     return { 
//       min: Number(min.toFixed(2)), 
//       max: Number(max.toFixed(2)), 
//       avg: Number((sum / validValues.length).toFixed(2)),
//       count: validValues.length
//     };
//   }, []);

//   // Calculate percentage change
//   const calculateChange = useCallback((current, avg, min, max) => {
//     if (current === null || avg === null || avg === undefined) return 0;
//     const range = max - min;
//     if (range === 0) return 0;
//     return Number(((current - avg) / range * 100).toFixed(1));
//   }, []);

//   // Optimized stream data processing with throttling
//   const processStreamData = useCallback((data) => {
//     if (!data.analog?.length) return;

//     const now = Date.now();
    
//     if (now - lastUpdateRef.current < UPDATE_THROTTLE_MS) {
//       return;
//     }
    
//     lastUpdateRef.current = now;

//     if (updateTimeoutRef.current) {
//       clearTimeout(updateTimeoutRef.current);
//     }

//     updateTimeoutRef.current = requestAnimationFrame(() => {
//       const ts = data.timestamp || now;
//       const newLatest = data.analog;
      
//       setLatest(newLatest);
      
//       setHistory(prev => {
//         const updated = { ...prev };
//         const newStats = {};

//         newLatest.forEach((sig, index) => {
//           const tag = sig.tag;
//           if (!updated[tag]) {
//             updated[tag] = [];
//           }
          
//           updated[tag] = [
//             ...updated[tag],
//             { 
//               time: ts, 
//               value: sig.value !== null ? Number(sig.value.toFixed(3)) : null 
//             }
//           ].slice(-MAX_POINTS);

//           const signalStats = calculateStats(updated[tag]);
//           if (signalStats) {
//             newStats[tag] = signalStats;
//           }
//         });

//         setStats(prev => ({ ...prev, ...newStats }));
//         return updated;
//       });
//     });
//   }, [calculateStats]);

//   // Format time with memoization
//   const formatTime = useCallback((timestamp) => {
//     const date = new Date(timestamp);
//     return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
//   }, []);

//   // Get color for signal
//   const getSignalColor = useCallback((index) => 
//     signalColors[index % signalColors.length], 
//     [signalColors]
//   );

//   // Custom tooltip component
//   const CustomTooltip = useCallback(({ active, payload, label }) => {
//     if (!active || !payload || !payload.length) return null;
    
//     return (
//       <div className={`bg-white border border-gray-300 rounded-lg p-2 sm:p-3 shadow-xl`}>
//         <p className="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2 font-medium">{formatTime(label)}</p>
//         {payload.map((pld, index) => (
//           <p key={index} className="text-xs sm:text-sm font-medium" style={{ color: pld.color }}>
//             {pld.dataKey}: <span className="font-bold text-gray-900">{pld.value?.toFixed(3) ?? '--'}</span>
//           </p>
//         ))}
//       </div>
//     );
//   }, [formatTime]);

//   // Optimized SSE connection with authentication
//   useEffect(() => {
//     let isMounted = true;

//     const connectSSE = () => {
//       try {
//         if (eventSourceRef.current) {
//           eventSourceRef.current.close();
//           eventSourceRef.current = null;
//         }

//         // Check authentication first
//         const token = getAuthToken();
//         if (!token) {
//           setAuthError(true);
//           setConnected(false);
//           return;
//         }

//         // Add token to SSE URL as query parameter
//         const url = `${STREAM_URL}?token=${token}`;
//         eventSourceRef.current = new EventSource(url);

//         eventSourceRef.current.onopen = () => {
//           if (!isMounted) return;
//           setConnected(true);
//           setAuthError(false);
//         };

//         eventSourceRef.current.onmessage = (event) => {
//           if (!isMounted) return;
//           try {
//             const data = JSON.parse(event.data);
//             processStreamData(data);
//           } catch (err) {
//             console.error("Parse error:", err);
//           }
//         };

//         eventSourceRef.current.onerror = (error) => {
//           if (!isMounted) return;
//           console.error('SSE Error:', error);
//           setConnected(false);
          
//           // Check if it's an authentication error
//           if (eventSourceRef.current && eventSourceRef.current.readyState === EventSource.CLOSED) {
//             setAuthError(true);
//           }
          
//           if (eventSourceRef.current) {
//             eventSourceRef.current.close();
//             eventSourceRef.current = null;
//           }
          
//           if (isMounted) {
//             clearTimeout(reconnectTimeoutRef.current);
//             reconnectTimeoutRef.current = setTimeout(() => {
//               if (isMounted) {
//                 connectSSE();
//               }
//             }, 3000);
//           }
//         };
//       } catch (err) {
//         console.error("SSE connection error:", err);
//         if (isMounted) {
//           setConnected(false);
//           setAuthError(true);
          
//           clearTimeout(reconnectTimeoutRef.current);
//           reconnectTimeoutRef.current = setTimeout(() => {
//             if (isMounted) {
//               connectSSE();
//             }
//           }, 3000);
//         }
//       }
//     };

//     // Only connect if authenticated
//     if (isAuthenticated) {
//       connectSSE();
//     } else {
//       setAuthError(true);
//       setConnected(false);
//     }

//     // Cleanup function
//     return () => {
//       isMounted = false;

//       if (eventSourceRef.current) {
//         eventSourceRef.current.close();
//         eventSourceRef.current = null;
//       }

//       if (reconnectTimeoutRef.current) {
//         clearTimeout(reconnectTimeoutRef.current);
//       }
      
//       if (updateTimeoutRef.current) {
//         cancelAnimationFrame(updateTimeoutRef.current);
//       }
//     };
//   }, [processStreamData, isAuthenticated]);

//   return (
//     <div className={`min-h-screen ${themeStyles.bg.primary} ${themeStyles.text.primary} p-2 sm:p-3 md:p-4`}>
      
//       {/* Status Bar */}
//       <div className={`mb-3 sm:mb-4 p-3 sm:p-4 rounded-xl ${themeStyles.card.bg} ${themeStyles.card.border} ${themeStyles.card.shadow} backdrop-blur-sm`}>
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
//           <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//             <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${authError ? 'bg-red-500' : (connected ? themeStyles.status.connected : themeStyles.status.disconnected)} ${connected ? 'animate-pulse' : ''}`}></div>
//             <h1 className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-[#0AC4E0] to-emerald-500 bg-clip-text text-transparent">
//               ANALOG SIGNAL MONITOR
//             </h1>
//             <span className={`text-[10px] sm:text-xs ${themeStyles.text.tertiary} bg-gray-200 px-2 py-0.5 sm:py-1 rounded-full`}>
//               {Object.keys(history).length} SIGNALS
//             </span>
//             {/* Auth Status Indicator */}
//             {!isAuthenticated && (
//               <span className="text-[10px] sm:text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full border border-red-300">
//                 UNAUTHENTICATED
//               </span>
//             )}
//           </div>
          
//           <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//             <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2 text-[10px] sm:text-xs">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium ${
//                   authError 
//                     ? 'bg-red-100 text-red-700 border border-red-300'
//                     : connected 
//                       ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
//                       : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
//                 }`}>
//                   {authError ? 'AUTH ERROR' : (connected ? 'LIVE' : 'OFFLINE')}
//                 </span>
//               </div>
//               <span className={`${themeStyles.text.muted} hidden xs:inline`}>200ms</span>
//             </div>
//           </div>
//         </div>
        
//         {/* Auth Error Message */}
//         {authError && (
//           <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-600 animate-fade-in">
//             <div className="flex items-center">
//               <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//               </svg>
//               <span>Authentication required. Please log in to view analog data.</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Current Values - Compact Overview */}
//       {!authError && latest.length > 0 && (
//         <div className="mb-4 sm:mb-6">
//           <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
//             <h2 className={`text-xs sm:text-sm font-semibold ${themeStyles.text.secondary} uppercase tracking-wide`}>
//               LIVE SIGNAL VALUES
//             </h2>
//             <span className={`text-[10px] sm:text-xs ${themeStyles.text.muted}`}>Updated every 200ms</span>
//           </div>
          
//           <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
//             {latest.map((item, index) => {
//               const signalStats = stats[item.tag];
//               const change = signalStats ? calculateChange(
//                 item.value, 
//                 signalStats.avg, 
//                 signalStats.min, 
//                 signalStats.max
//               ) : 0;

//               return (
//                 <div
//                   key={`live-${item.tag}`}
//                   className={`p-2 sm:p-3 rounded-lg border transition-all duration-300 ${themeStyles.card.shadow} bg-gray-50 border-gray-300/50 hover:border-[#0AC4E0]/50 hover:bg-gray-200`}
//                 >
//                   <div className="flex justify-between items-start mb-1 sm:mb-2">
//                     <div className="flex-1 min-w-0">
//                       <div className={`text-[10px] sm:text-xs font-semibold ${themeStyles.text.secondary} truncate`} title={item.tag}>
//                         {item.tag}
//                       </div>
//                       <div className={`text-[8px] sm:text-[10px] ${themeStyles.text.muted} font-mono truncate mt-0.5`}>
//                         {item.address}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className={`text-base sm:text-lg font-bold font-mono ${themeStyles.text.primary} mb-1 sm:mb-2`}>
//                     {item.value !== null ? item.value.toFixed(2) : '--'}
//                   </div>

//                   {signalStats && (
//                     <div className="pt-1.5 sm:pt-2 border-t border-gray-300/50">
//                       <div className="grid grid-cols-3 gap-1 sm:gap-2 text-[8px] sm:text-[10px]">
//                         <div className="text-center">
//                           <div className={`${themeStyles.text.muted} mb-0.5`}>MIN</div>
//                           <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.min}>
//                             {signalStats.min}
//                           </div>
//                         </div>
//                         <div className="text-center">
//                           <div className={`${themeStyles.text.muted} mb-0.5`}>AVG</div>
//                           <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.avg}>
//                             {signalStats.avg}
//                           </div>
//                         </div>
//                         <div className="text-center">
//                           <div className={`${themeStyles.text.muted} mb-0.5`}>MAX</div>
//                           <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.max}>
//                             {signalStats.max}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Full-Width Charts */}
//       {!authError && (
//         <div className="space-y-4 sm:space-y-5">
//           {Object.entries(history).map(([tag, data], index) => {
//             const signalStats = stats[tag];
//             const currentValue = latest.find(sig => sig.tag === tag)?.value;
//             const color = getSignalColor(index);
//             const change = signalStats ? calculateChange(
//               currentValue, 
//               signalStats.avg, 
//               signalStats.min, 
//               signalStats.max
//             ) : 0;

//             const getTrendStatus = () => {
//               const absChange = Math.abs(change);
//               if (absChange > 15) return { 
//                 text: 'CRITICAL', 
//                 color: 'text-red-600', 
//                 bg: 'bg-red-100', 
//                 border: 'border-red-300' 
//               };
//               if (absChange > 5) return { 
//                 text: 'WARNING', 
//                 color: 'text-amber-600', 
//                 bg: 'bg-amber-100', 
//                 border: 'border-amber-300' 
//               };
//               if (change > 0) return { 
//                 text: 'RISING', 
//                 color: 'text-emerald-600', 
//                 bg: 'bg-emerald-100', 
//                 border: 'border-emerald-300' 
//               };
//               if (change < 0) return { 
//                 text: 'FALLING', 
//                 color: 'text-[#0AC4E0]', 
//                 bg: 'bg-cyan-100', 
//                 border: 'border-[#0AC4E0]' 
//               };
//               return { 
//                 text: 'STABLE', 
//                 color: 'text-gray-600', 
//                 bg: 'bg-gray-200', 
//                 border: 'border-gray-400' 
//               };
//             };

//             const trendStatus = getTrendStatus();

//             return (
//               <div
//                 key={`chart-${tag}`}
//                 className={`rounded-lg sm:rounded-xl border ${trendStatus.border} transition-all duration-300 bg-white/90 backdrop-blur-sm ${themeStyles.card.shadow}`}
//               >
//                 {/* Chart Header */}
//                 <div className="p-3 sm:p-4 border-b border-gray-300/50">
//                   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
//                     <div className="flex items-center space-x-2 sm:space-x-3">
//                       <div
//                         className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-lg flex-shrink-0"
//                         style={{ backgroundColor: color }}
//                       ></div>
//                       <div className="min-w-0">
//                         <div className={`text-sm sm:text-base font-bold ${themeStyles.text.primary} truncate max-w-[150px] sm:max-w-md`} title={tag}>
//                           {tag}
//                         </div>
//                         <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} font-mono mt-0.5`}>
//                           Address: {latest.find(sig => sig.tag === tag)?.address || 'N/A'}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//                       <div className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${trendStatus.bg} ${trendStatus.color} border ${trendStatus.border} backdrop-blur-sm`}>
//                         {trendStatus.text}
//                       </div>
//                       <div className="text-right">
//                         <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted}`}>CURRENT</div>
//                         <div className={`text-sm sm:text-base font-bold font-mono ${themeStyles.text.primary}`}>
//                           {currentValue !== null ? currentValue.toFixed(3) : '--'}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Quick Stats Row */}
//                   {signalStats && (
//                     <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
//                       <div className="text-center">
//                         <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>MIN</div>
//                         <div className={`text-xs sm:text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
//                           {signalStats.min}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>AVG</div>
//                         <div className={`text-xs sm:text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
//                           {signalStats.avg}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>MAX</div>
//                         <div className={`text-xs sm:text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
//                           {signalStats.max}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>DEV</div>
//                         <div className={`text-xs sm:text-sm font-bold font-mono ${trendStatus.color}`}>
//                           {change}%
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Responsive Chart */}
//                 <div className="p-3 sm:p-4">
//                   <div className="h-48 xs:h-56 sm:h-64 md:h-72">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart
//                         data={[...data].reverse()}
//                         margin={{ top: 5, right: 10, left: 0, bottom: 10 }}
//                       >
//                         <CartesianGrid 
//                           strokeDasharray="3 3" 
//                           stroke="#e5e7eb" 
//                           strokeOpacity={0.5}
//                         />
//                         <XAxis
//                           dataKey="time"
//                           tickFormatter={formatTime}
//                           fontSize={8}
//                           tick={{ fill: '#6b7280' }}
//                           axisLine={{ stroke: '#d1d5db' }}
//                           tickLine={{ stroke: '#d1d5db' }}
//                           minTickGap={15}
//                           height={30}
//                         />
//                         <YAxis
//                           fontSize={8}
//                           tick={{ fill: '#6b7280' }}
//                           axisLine={{ stroke: '#d1d5db' }}
//                           tickLine={{ stroke: '#d1d5db' }}
//                           width={35}
//                           tickFormatter={(v) => v?.toFixed(1)}
//                         />
//                         <Tooltip
//                           content={<CustomTooltip />}
//                         />
//                         <Line
//                           type="monotone"
//                           dataKey="value"
//                           stroke={color}
//                           strokeWidth={1.5}
//                           dot={false}
//                           activeDot={{
//                             r: 3,
//                             fill: color,
//                             stroke: '#ffffff',
//                             strokeWidth: 2
//                           }}
//                           isAnimationActive={false}
//                         />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 {/* Chart Footer */}
//                 <div className={`p-2 sm:p-3 border-t border-gray-300/50 bg-gray-50/50 rounded-b-lg sm:rounded-b-xl`}>
//                   <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} flex flex-col xs:flex-row justify-between items-center gap-1 xs:gap-2`}>
//                     <span>Samples: {data.length} / {MAX_POINTS}</span>
//                     <span>Range: {signalStats ? (signalStats.max - signalStats.min).toFixed(3) : '--'}</span>
//                     <span>Updated: {data.length > 0 ? formatTime(data[data.length - 1].time) : '--'}</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {Object.keys(history).length === 0 && !authError && (
//             <div className={`rounded-lg sm:rounded-xl border ${themeStyles.border.primary} p-6 sm:p-10 text-center backdrop-blur-sm bg-white/80`}>
//               <div className={`text-sm sm:text-lg ${themeStyles.text.secondary} mb-2 sm:mb-3`}>No signal data available</div>
//               <div className={`text-xs sm:text-sm ${themeStyles.text.muted}`}>
//                 {connected ? 'Waiting for data stream...' : 'Connecting to data source...'}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Authentication Required Message */}
//       {authError && (
//         <div className={`rounded-lg sm:rounded-xl border border-red-300 p-8 sm:p-12 text-center backdrop-blur-sm bg-white/80`}>
//           <div className="flex flex-col items-center justify-center">
//             <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             <div className={`text-base sm:text-xl ${themeStyles.text.secondary} mb-2 sm:mb-3 font-bold`}>Authentication Required</div>
//             <div className={`text-xs sm:text-sm ${themeStyles.text.muted} max-w-md mx-auto`}>
//               Please log in to view analog signal data. This page requires valid authentication credentials.
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







import { useEffect, useState, useCallback, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const STREAM_URL = import.meta.env.DEV ? "http://localhost:8000/api/v1/stream/analog" : "https://mqtt-testing-2.onrender.com/api/v1/stream/analog";
const MAX_POINTS = 40;
const UPDATE_THROTTLE_MS = 200;

// Analog signal mapping - API tag to Display Name
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
  
  // Add more mappings as needed
  // "API_TAG_NAME": "DISPLAY NAME",
};

// You can easily modify the display names above without changing the API endpoints

export default function AnalogStream() {
  const [connected, setConnected] = useState(false);
  const [latest, setLatest] = useState([]);
  const [history, setHistory] = useState({});
  const [stats, setStats] = useState({});
  const [authError, setAuthError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const lastUpdateRef = useRef(Date.now());
  const updateTimeoutRef = useRef(null);
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Helper function to get display name for analog signal
  const getAnalogDisplayName = (tag) => {
    return ANALOG_SIGNAL_NAMES[tag] || tag; // Fallback to tag if no mapping found
  };

  // Helper function to get auth token
  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  // Check authentication status
  useEffect(() => {
    const token = getAuthToken();
    setIsAuthenticated(!!token);
  }, []);

  // Dark industrial theme colors with amber-500 as primary accent
  const themeColors = {
    primary: '#f59e0b',     // Amber primary
    secondary: '#10b981',   // Emerald
    tertiary: '#a78bfa',    // Purple (lighter for dark bg)
    warning: '#f59e0b',     // Amber
    danger: '#ef4444',      // Red
    success: '#22d3ee',     // Cyan
    accent: '#84cc16',      // Lime
    highlight: '#f472b6'    // Pink (lighter for dark bg)
  };

  // Theme-based signal colors
  const signalColors = Object.values(themeColors);

  // Dark industrial theme styling
  const themeStyles = {
    // Backgrounds
    bg: {
      primary: 'bg-slate-950',
      secondary: 'bg-slate-900',
      card: 'bg-slate-900',
      hover: 'hover:bg-slate-800',
    },

    // Text
    text: {
      primary: 'text-white',
      secondary: 'text-slate-200',
      tertiary: 'text-slate-400',
      muted: 'text-slate-500',
      accent: 'text-amber-400',
      success: 'text-emerald-400',
      warning: 'text-amber-400',
      danger: 'text-red-400',
    },

    // Borders
    border: {
      primary: 'border-slate-700',
      secondary: 'border-slate-600',
      accent: 'border-amber-500',
      success: 'border-emerald-500',
      warning: 'border-amber-500',
      danger: 'border-red-500',
    },

    // Status Indicators
    status: {
      connected: 'bg-amber-500',
      disconnected: 'bg-red-500',
      stable: 'bg-emerald-500',
      warning: 'bg-amber-500',
      critical: 'bg-red-500',
    },

    // Cards and Panels
    card: {
      bg: 'bg-slate-900',
      border: 'border-slate-800',
      shadow: '',
    },
  };

  // Memoized statistics calculation
  const calculateStats = useCallback((data) => {
    const validValues = data.map(d => d.value).filter(v => v !== null && !isNaN(v));
    if (validValues.length === 0) return null;
    
    const { min, max, sum } = validValues.reduce((acc, val) => {
      if (val < acc.min) acc.min = val;
      if (val > acc.max) acc.max = val;
      acc.sum += val;
      return acc;
    }, { min: Infinity, max: -Infinity, sum: 0 });
    
    return { 
      min: Number(min.toFixed(2)), 
      max: Number(max.toFixed(2)), 
      avg: Number((sum / validValues.length).toFixed(2)),
      count: validValues.length
    };
  }, []);

  // Calculate percentage change
  const calculateChange = useCallback((current, avg, min, max) => {
    if (current === null || avg === null || avg === undefined) return 0;
    const range = max - min;
    if (range === 0) return 0;
    return Number(((current - avg) / range * 100).toFixed(1));
  }, []);

  // Optimized stream data processing with throttling
  const processStreamData = useCallback((data) => {
    if (!data.analog?.length) return;

    const now = Date.now();
    
    if (now - lastUpdateRef.current < UPDATE_THROTTLE_MS) {
      return;
    }
    
    lastUpdateRef.current = now;

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = requestAnimationFrame(() => {
      const ts = data.timestamp || now;
      const newLatest = data.analog;
      
      setLatest(newLatest);
      
      setHistory(prev => {
        const updated = { ...prev };
        const newStats = {};

        newLatest.forEach((sig, index) => {
          const tag = sig.tag;
          if (!updated[tag]) {
            updated[tag] = [];
          }
          
          updated[tag] = [
            ...updated[tag],
            { 
              time: ts, 
              value: sig.value !== null ? Number(sig.value.toFixed(3)) : null 
            }
          ].slice(-MAX_POINTS);

          const signalStats = calculateStats(updated[tag]);
          if (signalStats) {
            newStats[tag] = signalStats;
          }
        });

        setStats(prev => ({ ...prev, ...newStats }));
        return updated;
      });
    });
  }, [calculateStats]);

  // Format time with memoization
  const formatTime = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  }, []);

  // Get color for signal
  const getSignalColor = useCallback((index) => 
    signalColors[index % signalColors.length], 
    [signalColors]
  );

  // Custom tooltip component
  const CustomTooltip = useCallback(({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    
    return (
      <div className={`bg-slate-900 border border-slate-700 rounded-lg p-2 sm:p-3 shadow-xl`}>
        <p className="text-[10px] sm:text-xs text-slate-400 mb-1 sm:mb-2 font-medium">{formatTime(label)}</p>
        {payload.map((pld, index) => {
          const displayName = getAnalogDisplayName(pld.dataKey);
          return (
            <p key={index} className="text-xs sm:text-sm font-medium" style={{ color: pld.color }}>
              {displayName}: <span className="font-bold text-white">{pld.value?.toFixed(3) ?? '--'}</span>
            </p>
          );
        })}
      </div>
    );
  }, [formatTime]);

  // Optimized SSE connection with authentication
  useEffect(() => {
    let isMounted = true;

    const connectSSE = () => {
      try {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }

        // Check authentication first
        const token = getAuthToken();
        if (!token) {
          setAuthError(true);
          setConnected(false);
          return;
        }

        // Add token to SSE URL as query parameter
        const url = `${STREAM_URL}?token=${token}`;
        eventSourceRef.current = new EventSource(url);

        eventSourceRef.current.onopen = () => {
          if (!isMounted) return;
          setConnected(true);
          setAuthError(false);
        };

        eventSourceRef.current.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const data = JSON.parse(event.data);
            processStreamData(data);
          } catch (err) {
            console.error("Parse error:", err);
          }
        };

        eventSourceRef.current.onerror = (error) => {
          if (!isMounted) return;
          console.error('SSE Error:', error);
          setConnected(false);
          
          // Check if it's an authentication error
          if (eventSourceRef.current && eventSourceRef.current.readyState === EventSource.CLOSED) {
            setAuthError(true);
          }
          
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }
          
          if (isMounted) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = setTimeout(() => {
              if (isMounted) {
                connectSSE();
              }
            }, 3000);
          }
        };
      } catch (err) {
        console.error("SSE connection error:", err);
        if (isMounted) {
          setConnected(false);
          setAuthError(true);
          
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = setTimeout(() => {
            if (isMounted) {
              connectSSE();
            }
          }, 3000);
        }
      }
    };

    // Only connect if authenticated
    if (isAuthenticated) {
      connectSSE();
    } else {
      setAuthError(true);
      setConnected(false);
    }

    // Cleanup function
    return () => {
      isMounted = false;

      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (updateTimeoutRef.current) {
        cancelAnimationFrame(updateTimeoutRef.current);
      }
    };
  }, [processStreamData, isAuthenticated]);

  return (
    <div className={`min-h-screen ${themeStyles.bg.primary} ${themeStyles.text.primary} p-2 sm:p-3 md:p-4`}>
      
      {/* Status Bar */}
      <div className={`mb-3 sm:mb-4 p-3 sm:p-4 rounded-lg border ${themeStyles.card.bg} ${themeStyles.card.border}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${authError ? 'bg-red-500' : (connected ? themeStyles.status.connected : themeStyles.status.disconnected)} ${connected ? 'animate-pulse' : ''}`}></div>
            <h1 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide">
              ANALOG SIGNAL MONITOR
            </h1>
            <span className={`text-[10px] sm:text-xs ${themeStyles.text.tertiary} bg-slate-800 border border-slate-700 px-2 py-0.5 sm:py-1 rounded-md`}>
              {Object.keys(history).length} SIGNALS
            </span>
            {/* Auth Status Indicator */}
            {!isAuthenticated && (
              <span className="text-[10px] sm:text-xs bg-red-950/60 text-red-400 px-2 py-0.5 rounded-md border border-red-800">
                UNAUTHENTICATED
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2 text-[10px] sm:text-xs">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium ${
                  authError
                    ? 'bg-red-950/60 text-red-400 border border-red-800'
                    : connected
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                      : 'bg-amber-950/60 text-amber-400 border border-amber-800'
                }`}>
                  {authError ? 'AUTH ERROR' : (connected ? 'LIVE' : 'OFFLINE')}
                </span>
              </div>
              <span className={`${themeStyles.text.muted} hidden xs:inline`}>200ms</span>
            </div>
          </div>
        </div>

        {/* Auth Error Message */}
        {authError && (
          <div className="mt-3 p-2 bg-red-950/60 border border-red-800 rounded text-xs text-red-400">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Authentication required. Please log in to view analog data.</span>
            </div>
          </div>
        )}
      </div>

      {/* Current Values - Compact Overview */}
      {!authError && latest.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
            <h2 className={`text-xs sm:text-sm font-semibold ${themeStyles.text.secondary} uppercase tracking-wide`}>
              LIVE SIGNAL VALUES
            </h2>
            <span className={`text-[10px] sm:text-xs ${themeStyles.text.muted}`}>Updated every 200ms</span>
          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {latest.map((item, index) => {
              const signalStats = stats[item.tag];
              const change = signalStats ? calculateChange(
                item.value, 
                signalStats.avg, 
                signalStats.min, 
                signalStats.max
              ) : 0;
              const displayName = getAnalogDisplayName(item.tag);

              return (
                <div
                  key={`live-${item.tag}`}
                  className={`p-2 sm:p-3 rounded-lg border transition-colors bg-slate-800/50 border-slate-700 hover:border-amber-500/50`}
                >
                  <div className="flex justify-between items-start mb-1 sm:mb-2">
                    <div className="flex-1 min-w-0">
                      {/* Display custom name instead of API tag */}
                      <div className={`text-[10px] sm:text-xs font-semibold ${themeStyles.text.secondary} truncate`} title={displayName}>
                        {displayName}
                      </div>
                      {/* Show original API tag in smaller text for reference */}
                      <div className={`text-[8px] sm:text-[10px] ${themeStyles.text.muted} font-mono truncate mt-0.5`}>
                        {item.address} | {item.tag}
                      </div>
                    </div>
                  </div>

                  <div className={`text-base sm:text-lg font-bold font-mono ${themeStyles.text.primary} mb-1 sm:mb-2`}>
                    {item.value !== null ? item.value.toFixed(2) : '--'}
                  </div>

                  {signalStats && (
                    <div className="pt-1.5 sm:pt-2 border-t border-slate-700">
                      <div className="grid grid-cols-3 gap-1 sm:gap-2 text-[8px] sm:text-[10px]">
                        <div className="text-center">
                          <div className={`${themeStyles.text.muted} mb-0.5`}>MIN</div>
                          <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.min}>
                            {signalStats.min}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`${themeStyles.text.muted} mb-0.5`}>AVG</div>
                          <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.avg}>
                            {signalStats.avg}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`${themeStyles.text.muted} mb-0.5`}>MAX</div>
                          <div className={`font-semibold ${themeStyles.text.secondary}`} title={signalStats.max}>
                            {signalStats.max}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full-Width Charts */}
      {!authError && (
        <div className="space-y-4 sm:space-y-5">
          {Object.entries(history).map(([tag, data], index) => {
            const signalStats = stats[tag];
            const currentValue = latest.find(sig => sig.tag === tag)?.value;
            const color = getSignalColor(index);
            const change = signalStats ? calculateChange(
              currentValue, 
              signalStats.avg, 
              signalStats.min, 
              signalStats.max
            ) : 0;
            const displayName = getAnalogDisplayName(tag);

            const getTrendStatus = () => {
              const absChange = Math.abs(change);
              if (absChange > 15) return {
                text: 'CRITICAL',
                color: 'text-red-400',
                bg: 'bg-red-950/60',
                border: 'border-red-800'
              };
              if (absChange > 5) return {
                text: 'WARNING',
                color: 'text-amber-400',
                bg: 'bg-amber-950/60',
                border: 'border-amber-800'
              };
              if (change > 0) return {
                text: 'RISING',
                color: 'text-emerald-400',
                bg: 'bg-emerald-950/60',
                border: 'border-emerald-800'
              };
              if (change < 0) return {
                text: 'FALLING',
                color: 'text-amber-400',
                bg: 'bg-amber-950/60',
                border: 'border-amber-700'
              };
              return {
                text: 'STABLE',
                color: 'text-slate-400',
                bg: 'bg-slate-800',
                border: 'border-slate-700'
              };
            };

            const trendStatus = getTrendStatus();

            return (
              <div
                key={`chart-${tag}`}
                className={`rounded-lg border ${trendStatus.border} transition-colors ${themeStyles.card.bg}`}
              >
                {/* Chart Header */}
                <div className="p-3 sm:p-4 border-b border-slate-800">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: color }}
                      ></div>
                      <div className="min-w-0">
                        {/* Display custom name instead of API tag */}
                        <div className={`text-sm sm:text-base font-bold ${themeStyles.text.primary} truncate max-w-[150px] sm:max-w-md`} title={displayName}>
                          {displayName}
                        </div>
                        <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} font-mono mt-0.5`}>
                          Address: {latest.find(sig => sig.tag === tag)?.address || 'N/A'} | Tag: {tag}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <div className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold ${trendStatus.bg} ${trendStatus.color} border ${trendStatus.border}`}>
                        {trendStatus.text}
                      </div>
                      <div className="text-right">
                        <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted}`}>CURRENT</div>
                        <div className={`text-sm sm:text-base font-bold font-mono ${themeStyles.text.primary}`}>
                          {currentValue !== null ? currentValue.toFixed(3) : '--'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats Row */}
                  {signalStats && (
                    <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      <div className="text-center">
                        <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>MIN</div>
                        <div className={`text-xs sm:text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
                          {signalStats.min}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>AVG</div>
                        <div className={`text-xs sm:text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
                          {signalStats.avg}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>MAX</div>
                        <div className={`text-xs sm:text-sm font-bold font-mono ${themeStyles.text.secondary}`}>
                          {signalStats.max}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} mb-0.5 sm:mb-1`}>DEV</div>
                        <div className={`text-xs sm:text-sm font-bold font-mono ${trendStatus.color}`}>
                          {change}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Responsive Chart */}
                <div className="p-3 sm:p-4">
                  <div className="h-48 xs:h-56 sm:h-64 md:h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[...data].reverse()}
                        margin={{ top: 5, right: 10, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1e293b"
                          strokeOpacity={0.8}
                        />
                        <XAxis
                          dataKey="time"
                          tickFormatter={formatTime}
                          fontSize={8}
                          tick={{ fill: '#94a3b8' }}
                          axisLine={{ stroke: '#334155' }}
                          tickLine={{ stroke: '#334155' }}
                          minTickGap={15}
                          height={30}
                        />
                        <YAxis
                          fontSize={8}
                          tick={{ fill: '#94a3b8' }}
                          axisLine={{ stroke: '#334155' }}
                          tickLine={{ stroke: '#334155' }}
                          width={35}
                          tickFormatter={(v) => v?.toFixed(1)}
                        />
                        <Tooltip
                          content={<CustomTooltip />}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={color}
                          strokeWidth={1.5}
                          dot={false}
                          activeDot={{
                            r: 3,
                            fill: color,
                            stroke: '#0f172a',
                            strokeWidth: 2
                          }}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart Footer */}
                <div className={`p-2 sm:p-3 border-t border-slate-800 bg-slate-900/50 rounded-b-lg`}>
                  <div className={`text-[8px] sm:text-xs ${themeStyles.text.muted} flex flex-col xs:flex-row justify-between items-center gap-1 xs:gap-2`}>
                    <span>Samples: {data.length} / {MAX_POINTS}</span>
                    <span>Range: {signalStats ? (signalStats.max - signalStats.min).toFixed(3) : '--'}</span>
                    <span>Updated: {data.length > 0 ? formatTime(data[data.length - 1].time) : '--'}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {Object.keys(history).length === 0 && !authError && (
            <div className={`rounded-lg border ${themeStyles.border.primary} p-6 sm:p-10 text-center bg-slate-900`}>
              <div className={`text-sm sm:text-lg ${themeStyles.text.secondary} mb-2 sm:mb-3`}>No signal data available</div>
              <div className={`text-xs sm:text-sm ${themeStyles.text.muted}`}>
                {connected ? 'Waiting for data stream...' : 'Connecting to data source...'}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Authentication Required Message */}
      {authError && (
        <div className={`rounded-lg border border-red-800 p-8 sm:p-12 text-center bg-slate-900`}>
          <div className="flex flex-col items-center justify-center">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div className={`text-base sm:text-xl ${themeStyles.text.secondary} mb-2 sm:mb-3 font-bold`}>Authentication Required</div>
            <div className={`text-xs sm:text-sm ${themeStyles.text.muted} max-w-md mx-auto`}>
              Please log in to view analog signal data. This page requires valid authentication credentials.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}