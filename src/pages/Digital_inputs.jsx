// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const DigitalInputsTable = () => {
//   const [digitalInputs, setDigitalInputs] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   useEffect(() => {
//     fetchDigitalInputs();
//   }, []);

//   // Fetch data from backend
//   const fetchDigitalInputs = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8000/api/di_bi");
//       setDigitalInputs(response.data);
//       setLastUpdated(new Date());
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching digital inputs:", err);
//       setError("Failed to fetch digital inputs data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Convert data to CSV and download
//   const downloadCSV = () => {
//     if (!digitalInputs?.data) return;

//     const data = digitalInputs.data;
//     const headers = ["Signal Name", "Status", "Value", "Timestamp"];
//     const timestamp = new Date().toLocaleString();
    
//     const rows = Object.entries(data).map(([key, value]) => [
//       key,
//       value === 1 ? "ACTIVE" : "INACTIVE",
//       value,
//       timestamp
//     ]);

//     // Build CSV string
//     const csvContent = [
//       headers.join(","),
//       ...rows.map(row => row.map(field => `"${field}"`).join(","))
//     ].join("\n");

//     // Create blob and trigger download
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", `DigitalInputs_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   // Format key for better display
//   const formatKey = (key) => {
//     return key
//       .replace(/_/g, " ")
//       .replace(/\b(\w)/g, (char) => char.toUpperCase())
//       .replace(/\b(I\/C)\b/gi, "Incomer")
//       .replace(/\b(TIE)\b/gi, "Tie")
//       .replace(/\b(STN)\b/gi, "Station")
//       .replace(/\b(BTS)\b/gi, "Bypass Transfer")
//       .replace(/\b(PREM)\b/gi, "Premium")
//       .replace(/\b(IL)\b/gi, "Interlock");
//   };

//   // Group signals
//   const groupSignals = (data) => {
//     const groups = {
//       "🔍 Circuit Monitoring": [],
//       "❤️ System Health": [],
//       "⚡ Breaker Status": [],
//       "🎮 Control Operations": [],
//       "🔄 Transfer Scheme": [],
//     };

//     Object.entries(data).forEach(([key, value]) => {
//       const formattedKey = formatKey(key);
//       const signalData = { key: formattedKey, value, originalKey: key };

//       if (key.includes("TripCkt") || key.includes("CloseCkt") || key.includes("CKT MON")) {
//         groups["🔍 Circuit Monitoring"].push(signalData);
//       } else if (key.includes("FAIL") || key.includes("OK") || key.includes("PREM") || key.includes("Healthy")) {
//         groups["❤️ System Health"].push(signalData);
//       } else if (key.includes("NO") || key.includes("NC")) {
//         groups["⚡ Breaker Status"].push(signalData);
//       } else if (key.includes("KEY") || key.includes("Selected") || key.includes("MODE") || key.includes("Ready") || key.includes("Local")) {
//         groups["🎮 Control Operations"].push(signalData);
//       } else if (key.includes("TRANSFER") || key.includes("TO") || key.includes("BTS") || key.includes("BUS")) {
//         groups["🔄 Transfer Scheme"].push(signalData);
//       } else {
//         groups["🔍 Circuit Monitoring"].push(signalData);
//       }
//     });

//     // Sort each group alphabetically
//     Object.keys(groups).forEach(group => {
//       groups[group].sort((a, b) => a.key.localeCompare(b.key));
//     });

//     return groups;
//   };

//   // Get status display component
//   const StatusBadge = ({ value }) => (
//     <div className="flex items-center space-x-2">
//       <div className={`w-3 h-3 rounded-full ${value === 1 ? 'bg-green-500' : 'bg-red-500'} shadow-sm`}></div>
//       <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
//         value === 1 
//           ? "bg-green-50 text-green-700 border border-green-200" 
//           : "bg-red-50 text-red-700 border border-red-200"
//       }`}>
//         {value === 1 ? "ACTIVE" : "INACTIVE"}
//       </span>
//     </div>
//   );

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4">
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-gray-100">
//           <div className="flex justify-center mb-6">
//             <div className="relative">
//               <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
//               <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
//             </div>
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Digital Inputs</h3>
//           <p className="text-gray-600">Fetching real-time data from control system...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4">
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-gray-100 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800 mb-3">Connection Error</h3>
//           <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
//           <button
//             onClick={fetchDigitalInputs}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!digitalInputs) return null;

//   const signalGroups = groupSignals(digitalInputs.data);
//   const activeSignals = Object.values(digitalInputs.data).filter(val => val === 1).length;
//   const totalSignals = Object.keys(digitalInputs.data).length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header Section */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//             <div className="flex items-center space-x-4">
//               <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Digital Inputs Monitor</h1>
//                 <p className="text-gray-600 mt-2 flex items-center space-x-2">
//                   <span>Real-time system monitoring</span>
//                   <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
//                   <span>Address: {digitalInputs.startAddress}</span>
//                 </p>
//               </div>
//             </div>
            
//             {/* Stats Overview */}
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 min-w-[280px]">
//               <div className="grid grid-cols-3 gap-6 text-center">
//                 <div>
//                   <div className="text-2xl font-bold text-blue-600">{totalSignals}</div>
//                   <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Total</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-green-600">{activeSignals}</div>
//                   <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Active</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-gray-600">{totalSignals - activeSignals}</div>
//                   <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Inactive</div>
//                 </div>
//               </div>
//               {lastUpdated && (
//                 <div className="text-xs text-gray-500 text-center mt-3 font-medium">
//                   Updated: {lastUpdated.toLocaleTimeString()}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Action Bar */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
//               <span className="text-sm font-semibold text-gray-700">Total Signals: </span>
//               <span className="text-blue-600 font-bold">{digitalInputs.totalSignals}</span>
//             </div>
//           </div>
          
//           <div className="flex space-x-3">
//             <button
//               onClick={downloadCSV}
//               className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl transition-all duration-200 font-semibold border border-gray-300 shadow-sm hover:shadow-md flex items-center space-x-2 hover:-translate-y-0.5"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4" />
//               </svg>
//               <span>Export CSV</span>
//             </button>

//             <button
//               onClick={fetchDigitalInputs}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2 hover:-translate-y-0.5"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//               <span>Refresh Data</span>
//             </button>
//           </div>
//         </div>

//         {/* Signal Groups */}
//         {Object.entries(signalGroups).map(([groupName, signals]) => (
//           signals.length > 0 && (
//             <div
//               key={groupName}
//               className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden"
//             >
//               <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50/80 to-white/80">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="text-2xl">{groupName.split(' ')[0]}</div>
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-900">{groupName.replace(/^.[^\s]*\s/, '')}</h2>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {signals.length} signal{signals.length !== 1 ? 's' : ''} • {signals.filter(s => s.value === 1).length} active
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-sm font-semibold text-gray-700">
//                       {((signals.filter(s => s.value === 1).length / signals.length) * 100).toFixed(0)}% Active
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="overflow-hidden">
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8">
//                   {signals.map((signal, index) => (
//                     <div
//                       key={index}
//                       className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group"
//                     >
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex-1">
//                           <h3 className="font-bold text-gray-900 text-sm leading-tight mb-2 group-hover:text-blue-600 transition-colors">
//                             {signal.key}
//                           </h3>
//                           <p className="text-xs text-gray-500 font-mono truncate bg-gray-100 px-2 py-1 rounded">
//                             {signal.originalKey}
//                           </p>
//                         </div>
//                         <StatusBadge value={signal.value} />
//                       </div>
//                       <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                         <span className="text-xs font-semibold text-gray-600">Digital Value</span>
//                         <span className={`text-lg font-bold ${
//                           signal.value === 1 ? 'text-green-600' : 'text-red-600'
//                         }`}>
//                           {signal.value}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )
//         ))}

//         {/* Footer */}
//         <div className="text-center text-gray-500 text-sm mt-12">
//           <p>Digital Inputs Monitoring System • Auto-refresh available • Data export enabled</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DigitalInputsTable;

















import React, { useState, useEffect } from 'react';

const DIDigitalInput = () => {
  const [digitalInputs, setDigitalInputs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInput, setSelectedInput] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [alarmFilter, setAlarmFilter] = useState('all'); // 'all', 'alarm', 'normal'
  const [groupFilter, setGroupFilter] = useState('all'); // 'all', 'protection', 'status', 'control', 'safety'

  // Mock data for digital inputs
  const mockDigitalInputs = [
    {
      id: 'DI-001',
      name: 'BREAKER 52A STATUS',
      description: 'Main circuit breaker A status contact',
      address: 'DI0101',
      group: 'protection',
      type: 'breaker_status',
      status: true,
      alarm: false,
      timestamp: '2024-03-15T14:23:45.123Z',
      location: 'Bus A Panel',
      module: 'RTU-01',
      channel: 'CH-01',
      normalState: 0,
      currentState: 1,
      quality: 'good',
      trend: 'stable',
      tags: ['critical', 'protection', 'main']
    },
    {
      id: 'DI-002',
      name: 'BREAKER 52B STATUS',
      description: 'Main circuit breaker B status contact',
      address: 'DI0102',
      group: 'protection',
      type: 'breaker_status',
      status: true,
      alarm: false,
      timestamp: '2024-03-15T14:23:45.123Z',
      location: 'Bus B Panel',
      module: 'RTU-01',
      channel: 'CH-02',
      normalState: 0,
      currentState: 1,
      quality: 'good',
      trend: 'stable',
      tags: ['critical', 'protection', 'main']
    },
    {
      id: 'DI-003',
      name: 'TRANSFORMER OL TRIP',
      description: 'Transformer overload protection trip',
      address: 'DI0103',
      group: 'protection',
      type: 'protection_trip',
      status: false,
      alarm: false,
      timestamp: '2024-03-15T14:23:45.123Z',
      location: 'Transformer T-104',
      module: 'RTU-01',
      channel: 'CH-03',
      normalState: 0,
      currentState: 0,
      quality: 'good',
      trend: 'stable',
      tags: ['protection', 'transformer']
    },
    {
      id: 'DI-004',
      name: 'BUS DIFFERENTIAL TRIP',
      description: 'Bus differential protection operated',
      address: 'DI0104',
      group: 'protection',
      type: 'protection_trip',
      status: false,
      alarm: false,
      timestamp: '2024-03-15T14:23:45.123Z',
      location: 'Bus Differential Relay',
      module: 'RTU-01',
      channel: 'CH-04',
      normalState: 0,
      currentState: 0,
      quality: 'good',
      trend: 'stable',
      tags: ['critical', 'protection', 'bus']
    },
    {
      id: 'DI-005',
      name: 'UNDER VOLTAGE ALARM',
      description: 'System under voltage condition detected',
      address: 'DI0201',
      group: 'status',
      type: 'voltage_alarm',
      status: true,
      alarm: true,
      timestamp: '2024-03-15T14:20:15.456Z',
      location: 'Voltage Relay 27',
      module: 'RTU-02',
      channel: 'CH-01',
      normalState: 0,
      currentState: 1,
      quality: 'good',
      trend: 'rising',
      tags: ['alarm', 'voltage']
    },
    {
      id: 'DI-006',
      name: 'OVER FREQUENCY ALARM',
      description: 'System over frequency condition',
      address: 'DI0202',
      group: 'status',
      type: 'frequency_alarm',
      status: false,
      alarm: false,
      timestamp: '2024-03-15T14:23:45.123Z',
      location: 'Frequency Relay 81',
      module: 'RTU-02',
      channel: 'CH-02',
      normalState: 0,
      currentState: 0,
      quality: 'good',
      trend: 'stable',
      tags: ['frequency']
    },
    {
      id: 'DI-007',
      name: 'EARTH FAULT INDICATION',
      description: 'Earth fault detected in system',
      address: 'DI0203',
      group: 'protection',
      type: 'earth_fault',
      status: true,
      alarm: true,
      timestamp: '2024-03-15T14:15:30.789Z',
      location: 'Earth Fault Relay 64',
      module: 'RTU-02',
      channel: 'CH-03',
      normalState: 0,
      currentState: 1,
      quality: 'good',
      trend: 'rising',
      tags: ['alarm', 'fault', 'protection']
    },
    {
      id: 'DI-008',
      name: 'TRANSFER SWITCH POSITION',
      description: 'Automatic transfer switch position',
      address: 'DI0301',
      group: 'control',
      type: 'switch_position',
      status: false,
      alarm: false,
      timestamp: '2024-03-15T14:23:45.123Z',
      location: 'ATS Panel',
      module: 'RTU-03',
      channel: 'CH-01',
      normalState: 1,
      currentState: 0,
      quality: 'good',
      trend: 'stable',
      tags: ['control', 'ats']
    },
    {
      id: 'DI-009',
      name: 'GENERATOR RUNNING STATUS',
      description: 'Generator running status contact',
      address: 'DI0302',
      group: 'status',
      type: 'generator_status',
      status: true,
      alarm: false,
      timestamp: '2024-03-15T14:23:45.123Z',
      location: 'Generator G-3',
      module: 'RTU-03',
      channel: 'CH-02',
      normalState: 0,
      currentState: 1,
      quality: 'good',
      trend: 'stable',
      tags: ['generator', 'status']
    },
    {
      id: 'DI-010',
      name: 'FIRE ALARM SYSTEM',
      description: 'Fire detection system activation',
      address: 'DI0401',
      group: 'safety',
      type: 'fire_alarm',
      status: false,
      alarm: false,
      timestamp: '2024-03-15T14:23:45.123Z',
      location: 'Control Room',
      module: 'RTU-04',
      channel: 'CH-01',
      normalState: 0,
      currentState: 0,
      quality: 'good',
      trend: 'stable',
      tags: ['safety', 'fire']
    },
    {
      id: 'DI-011',
      name: 'DOOR ACCESS STATUS',
      description: 'Control room door access contact',
      address: 'DI0402',
      group: 'safety',
      type: 'door_status',
      status: true,
      alarm: false,
      timestamp: '2024-03-15T14:23:45.123Z',
      location: 'Main Entrance',
      module: 'RTU-04',
      channel: 'CH-02',
      normalState: 1,
      currentState: 1,
      quality: 'good',
      trend: 'stable',
      tags: ['safety', 'access']
    },
    {
      id: 'DI-012',
      name: 'COMMUNICATION FAILURE',
      description: 'RTU communication failure indication',
      address: 'DI0501',
      group: 'status',
      type: 'comm_failure',
      status: true,
      alarm: true,
      timestamp: '2024-03-15T14:05:22.321Z',
      location: 'RTU-05',
      module: 'RTU-05',
      channel: 'CH-01',
      normalState: 0,
      currentState: 1,
      quality: 'poor',
      trend: 'rising',
      tags: ['alarm', 'communication']
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setDigitalInputs(mockDigitalInputs);
      setSelectedInput(mockDigitalInputs[0]);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        // Simulate random status changes for demo
        setDigitalInputs(prev => prev.map(di => ({
          ...di,
          status: Math.random() > 0.95 ? !di.status : di.status,
          timestamp: new Date().toISOString()
        })));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status) => {
    return status ? 'bg-emerald-500' : 'bg-red-500';
  };

  const getStatusText = (status) => {
    return status ? 'ACTIVE' : 'INACTIVE';
  };

  const getAlarmColor = (alarm) => {
    return alarm ? 'bg-red-500' : 'bg-emerald-500';
  };

  const getAlarmText = (alarm) => {
    return alarm ? 'ALARM' : 'NORMAL';
  };

  const getGroupColor = (group) => {
    switch (group) {
      case 'protection': return 'bg-red-500/20 text-red-400';
      case 'status': return 'bg-amber-500/20 text-amber-400';
      case 'control': return 'bg-yellow-500/20 text-yellow-400';
      case 'safety': return 'bg-emerald-500/20 text-emerald-400';
      default: return 'bg-slate-800 text-slate-400';
    }
  };

  const getGroupText = (group) => {
    return group.toUpperCase();
  };

  const getTypeText = (type) => {
    return type.replace('_', ' ').toUpperCase();
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'good': return 'bg-emerald-500/20 text-emerald-400';
      case 'fair': return 'bg-yellow-500/20 text-yellow-400';
      case 'poor': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-800 text-slate-400';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'rising': return 'text-red-400';
      case 'falling': return 'text-amber-400';
      case 'stable': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getFilteredInputs = () => {
    return digitalInputs.filter(di => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!(
          di.id.toLowerCase().includes(query) ||
          di.name.toLowerCase().includes(query) ||
          di.description.toLowerCase().includes(query) ||
          di.address.toLowerCase().includes(query) ||
          di.location.toLowerCase().includes(query)
        )) return false;
      }

      // Group filter
      if (groupFilter !== 'all' && di.group !== groupFilter) return false;

      // Alarm filter
      if (alarmFilter === 'alarm' && !di.alarm) return false;
      if (alarmFilter === 'normal' && di.alarm) return false;

      // Type filter
      if (filterType !== 'all' && di.type !== filterType) return false;

      // Status filter
      if (filterStatus === 'active' && !di.status) return false;
      if (filterStatus === 'inactive' && di.status) return false;

      return true;
    });
  };

  const getStatistics = () => {
    const total = digitalInputs.length;
    const active = digitalInputs.filter(di => di.status).length;
    const alarms = digitalInputs.filter(di => di.alarm).length;
    
    const protection = digitalInputs.filter(di => di.group === 'protection').length;
    const status = digitalInputs.filter(di => di.group === 'status').length;
    const control = digitalInputs.filter(di => di.group === 'control').length;
    const safety = digitalInputs.filter(di => di.group === 'safety').length;

    return { total, active, alarms, protection, status, control, safety };
  };

  const statistics = getStatistics();
  const filteredInputs = getFilteredInputs();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-slate-950 font-bold text-lg">DI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">DIGITAL INPUT MONITORING</h1>
              <p className="text-sm text-slate-400">Real-time Status Monitoring & Alarm Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-slate-800 rounded-lg px-3 py-2">
              <span className="text-sm text-slate-400 mr-2">TIME:</span>
              <span className="text-sm font-mono text-slate-200">{new Date().toLocaleTimeString()}</span>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${autoRefresh ? 'bg-emerald-900/30 border-emerald-600/60 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
              {autoRefresh ? 'AUTO REFRESH ON' : 'AUTO REFRESH OFF'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Filters and Statistics */}
        <aside className="w-80 border-r border-slate-800 bg-slate-900/50 h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-lg font-bold mb-4 text-white">FILTERS & CONTROLS</h2>

            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="SEARCH DIGITAL INPUTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase tracking-wider"
              />
            </div>

            {/* Group Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">GROUP FILTER</h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'protection', 'status', 'control', 'safety'].map((group) => (
                  <button
                    key={group}
                    onClick={() => setGroupFilter(group)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors ${groupFilter === group ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  >
                    {group === 'all' ? 'ALL GROUPS' : group}
                  </button>
                ))}
              </div>
            </div>

            {/* Alarm Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">ALARM FILTER</h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'alarm', 'normal'].map((alarm) => (
                  <button
                    key={alarm}
                    onClick={() => setAlarmFilter(alarm)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors ${alarmFilter === alarm ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  >
                    {alarm === 'all' ? 'ALL STATUS' : alarm === 'alarm' ? 'ALARMS ONLY' : 'NORMAL ONLY'}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">STATUS FILTER</h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'active', 'inactive'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors ${filterStatus === status ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  >
                    {status === 'all' ? 'ALL STATUS' : status.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">VIEW MODE</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  GRID VIEW
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors ${viewMode === 'list' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  LIST VIEW
                </button>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-white">SYSTEM STATISTICS</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">TOTAL INPUTS</span>
                  <span className="font-bold font-mono text-slate-200">{statistics.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">ACTIVE INPUTS</span>
                  <span className="font-bold font-mono text-emerald-400">{statistics.active}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">ALARM INPUTS</span>
                  <span className="font-bold font-mono text-red-400">{statistics.alarms}</span>
                </div>
                <div className="pt-2 border-t border-slate-700">
                  <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">GROUP DISTRIBUTION</div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-red-400">PROTECTION</span>
                      <span className="text-xs font-bold text-slate-200">{statistics.protection}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-amber-400">STATUS</span>
                      <span className="text-xs font-bold text-slate-200">{statistics.status}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-yellow-400">CONTROL</span>
                      <span className="text-xs font-bold text-slate-200">{statistics.control}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-emerald-400">SAFETY</span>
                      <span className="text-xs font-bold text-slate-200">{statistics.safety}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Input Details */}
          {selectedInput && (
            <div className="p-4">
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-white">SELECTED INPUT DETAILS</h3>
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 space-y-3">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">INPUT NAME</div>
                  <div className="font-bold text-sm truncate text-slate-200">{selectedInput.name}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">STATUS</div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(selectedInput.status)}`}></div>
                    <span className="text-sm font-bold text-slate-200">{getStatusText(selectedInput.status)}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">ALARM STATUS</div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getAlarmColor(selectedInput.alarm)}`}></div>
                    <span className={`text-sm font-bold ${selectedInput.alarm ? 'text-red-400' : 'text-emerald-400'}`}>
                      {getAlarmText(selectedInput.alarm)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">LAST UPDATE</div>
                  <div className="text-xs font-mono text-slate-300">{formatDate(selectedInput.timestamp)}</div>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content - Digital Inputs Display */}
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-73px)]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">DIGITAL INPUT STATUS</h2>
                <p className="text-sm text-slate-400">
                  Showing {filteredInputs.length} of {digitalInputs.length} inputs
                  {searchQuery && ` • Searching: "${searchQuery}"`}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-sm font-medium uppercase tracking-wider text-slate-200 transition-colors">
                  EXPORT DATA
                </button>
                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors">
                  PRINT REPORT
                </button>
              </div>
            </div>

            {/* Status Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-sm text-slate-400 mb-1 uppercase tracking-wider">TOTAL INPUTS</div>
                <div className="text-2xl font-bold font-mono text-white">{statistics.total}</div>
                <div className="text-xs text-slate-500 mt-1">MONITORED POINTS</div>
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-sm text-slate-400 mb-1 uppercase tracking-wider">ACTIVE INPUTS</div>
                <div className="text-2xl font-bold font-mono text-emerald-400">{statistics.active}</div>
                <div className="text-xs text-emerald-500 mt-1">{(statistics.active / statistics.total * 100).toFixed(1)}% OF TOTAL</div>
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-sm text-slate-400 mb-1 uppercase tracking-wider">ALARM INPUTS</div>
                <div className="text-2xl font-bold font-mono text-red-400">{statistics.alarms}</div>
                <div className="text-xs text-red-500 mt-1">REQUIRE ATTENTION</div>
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-sm text-slate-400 mb-1 uppercase tracking-wider">LAST UPDATE</div>
                <div className="text-xl font-bold font-mono text-white">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                <div className="text-xs text-slate-500 mt-1">REAL-TIME MONITORING</div>
              </div>
            </div>

            {/* Digital Inputs Grid/List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse bg-slate-800 rounded-lg p-6">
                    <div className="h-4 bg-slate-700 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-slate-700 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                {filteredInputs.map((di) => (
                  <div
                    key={di.id}
                    onClick={() => setSelectedInput(di)}
                    className={`bg-slate-900 rounded-xl border ${selectedInput?.id === di.id ? 'border-amber-500 border-2' : 'border-slate-800'} p-4 cursor-pointer transition-colors hover:bg-slate-800/50 ${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}
                  >
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-mono text-sm font-bold text-slate-200">{di.id}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${getGroupColor(di.group)}`}>
                              {getGroupText(di.group)}
                            </span>
                          </div>
                          <h3 className="font-bold text-sm truncate text-white">{di.name}</h3>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className={`px-2 py-1 rounded text-xs font-bold ${di.alarm ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                            {getAlarmText(di.alarm)}
                          </div>
                          <div className="text-xs text-slate-500 mt-1 font-mono">{di.address}</div>
                        </div>
                      </div>

                      {/* Status Indicators */}
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(di.status)}`}></div>
                          <span className="text-xs font-bold text-slate-200">{getStatusText(di.status)}</span>
                        </div>
                        <div className="text-xs text-slate-500">|</div>
                        <div className={`text-xs px-2 py-1 rounded ${getQualityColor(di.quality)}`}>
                          {di.quality.toUpperCase()}
                        </div>
                        <div className="text-xs text-slate-500">|</div>
                        <div className={`text-xs ${getTrendColor(di.trend)}`}>
                          {di.trend.toUpperCase()}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2">
                        <div className="text-xs text-slate-400 line-clamp-2">{di.description}</div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <div className="text-slate-500 uppercase tracking-wider">LOCATION</div>
                            <div className="font-medium truncate text-slate-300">{di.location}</div>
                          </div>
                          <div>
                            <div className="text-slate-500 uppercase tracking-wider">MODULE</div>
                            <div className="font-medium font-mono text-slate-300">{di.module}</div>
                          </div>
                          <div>
                            <div className="text-slate-500 uppercase tracking-wider">CHANNEL</div>
                            <div className="font-medium font-mono text-slate-300">{di.channel}</div>
                          </div>
                          <div>
                            <div className="text-slate-500 uppercase tracking-wider">STATE</div>
                            <div className="font-medium font-mono text-slate-300">
                              {di.currentState} ({di.normalState === di.currentState ? 'NORMAL' : 'ABNORMAL'})
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {di.tags.map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Timestamp */}
                        <div className="text-xs text-slate-500 mt-2">
                          UPDATED: {formatDate(di.timestamp)}
                        </div>
                      </div>
                    </div>

                    {/* List View Additional Info */}
                    {viewMode === 'list' && (
                      <div className="ml-6 flex flex-col items-end">
                        <div className="text-right">
                          <div className="text-xs text-slate-500 uppercase tracking-wider">TYPE</div>
                          <div className="text-sm font-bold text-slate-200">{getTypeText(di.type)}</div>
                        </div>
                        <div className="mt-4">
                          <div className="text-xs text-slate-500 uppercase tracking-wider">STATUS</div>
                          <div className="flex items-center justify-end">
                            <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(di.status)}`}></div>
                            <span className="text-sm font-bold text-slate-200">{getStatusText(di.status)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredInputs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <span className="text-slate-600 text-2xl font-bold">0</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">NO DIGITAL INPUTS FOUND</h3>
                <p className="text-slate-400 text-center max-w-md">
                  No digital inputs match your current filters. Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>


    </div>
  );
};

export default DIDigitalInput;