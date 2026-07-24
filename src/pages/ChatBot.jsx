// import React, { useState, useEffect, useRef } from "react";

// // Your websiteData array remains the same...
// const websiteData =[
// {
//   "question": "What is the maximum current rating for BTS-2000?",
//   "answer": "BTS-2000 supports current ratings up to 4000A, with various models available for different load requirements."
// },

// {
//   "question": "What is the operating temperature range for BTS-2000?",
//   "answer": "BTS-2000 operates reliably in temperatures from -10°C to 55°C (14°F to 131°F)."
// },
// {
//   "question": "How does BTS-2000 handle power quality issues?",
//   "answer": "It continuously monitors power quality parameters including voltage sag, swell, harmonics, and frequency variations, triggering transfers when thresholds are exceeded."
// },
// {
//   "question": "What is the mechanical life expectancy of the relays?",
//   "answer": "The relays are rated for over 1,000,000 mechanical operations ensuring long-term reliability."
// },
// {
//   "question": "Can BTS-2000 be used in parallel redundant configurations?",
//   "answer": "Yes, BTS-2000 supports N+1 redundant configurations for critical applications requiring maximum availability."
// },
// {
//   "question": "What communication interfaces are available?",
//   "answer": "Ethernet, RS-485, USB, and optional fiber optic connections for remote monitoring and control."
// },
// {
//   "question": "How is BTS-2000 mounted?",
//   "answer": "It can be wall-mounted or installed in standard 19-inch racks with appropriate mounting kits."
// },

// {
//   "question": "Does BTS-2000 support manual override?",
//   "answer": "Yes, it includes manual override capability for maintenance and emergency situations."
// },
// {
//   "question": "What is the typical power consumption of BTS-2000?",
//   "answer": "Standby power consumption is typically less than 50W, varying by model and configuration."
// },
// {
//   "question": "Can BTS-2000 handle motor starting currents?",
//   "answer": "Yes, it's designed to handle high inrush currents associated with motor starting applications."
// },
// {
//   "question": "What certifications does BTS-2000 hold?",
//   "answer": "UL 508, IEC 60947, CE, RoHS, and other international standards compliance."
// },
// {
//   "question": "How does BTS-2000 detect source availability?",
//   "answer": "It uses advanced voltage and frequency sensing algorithms to determine source viability."
// },
// {
//   "question": "What is the maximum cable size supported?",
//   "answer": "Supports cable sizes up to 500 MCM depending on the specific model and current rating."
// },
// {
//   "question": "Can BTS-2000 be used with UPS systems?",
//   "answer": "Yes, it seamlessly integrates with UPS systems for comprehensive power protection."
// },
// {
//   "question": "What is the enclosure protection rating?",
//   "answer": "Standard IP20 protection, with optional IP54 and IP65 enclosures for harsh environments."
// },
// {
//   "question": "How are firmware updates performed?",
//   "answer": "Updates can be done remotely via network or locally using USB, with rollback capability."
// },
// {
//   "question": "What is the mean time between failures (MTBF)?",
//   "answer": "MTBF exceeds 100,000 hours based on rigorous testing and component selection."
// },
// {
//   "question": "Does BTS-2000 support load shedding?",
//   "answer": "Yes, advanced load shedding capabilities with priority-based load management."
// },
// {
//   "question": "What is the response time for voltage detection?",
//   "answer": "Voltage detection and response occurs within 1-2 cycles (16-33ms)."
// },
// {
//   "question": "Can BTS-2000 be used with renewable energy sources?",
//   "answer": "Yes, specifically designed to manage transitions between grid, generator, and renewable sources."
// },
// {
//   "question": "What is the maximum altitude for operation?",
//   "answer": "Rated for operation up to 2000 meters above sea level without derating."
// },
// {
//   "question": "How does BTS-2000 handle phase loss?",
//   "answer": "Automatically detects phase loss and can transfer to alternative sources if configured."
// },
// {
//   "question": "What is the contact resistance of the relays?",
//   "answer": "Typical contact resistance is less than 0.5 milliohms for efficient power transfer."
// },
// {
//   "question": "Can BTS-2000 be used in mission-critical applications?",
//   "answer": "Yes, designed specifically for data centers, healthcare, and other mission-critical facilities."
// },
// {
//   "question": "What is the maximum short-circuit withstand rating?",
//   "answer": "Withstand rating of 65kA for 3 seconds in accordance with industry standards."
// },
// {
//   "question": "How is BTS-2000 tested before shipment?",
//   "answer": "Each unit undergoes rigorous testing including functional, dielectric, and temperature cycling tests."
// },
// {
//   "question": "What maintenance scheduling features are available?",
//   "answer": "Built-in maintenance scheduler with reminders for relay testing, inspection, and component replacement."
// },
// {
//   "question": "Can BTS-2000 interface with building management systems?",
//   "answer": "Yes, supports BACnet, LonWorks, and other BMS protocols for integrated facility management."
// },
// {
//   "question": "What is the humidity range for operation?",
//   "answer": "Operates reliably at 5% to 95% relative humidity, non-condensing."
// },
// {
//   "question": "How does BTS-2000 handle harmonic distortion?",
//   "answer": "Designed to operate reliably in environments with THD up to 15%."
// },
// {
//   "question": "What is the maximum number of sources supported?",
//   "answer": "Standard configurations support 2-3 sources, with custom solutions available for more complex requirements."
// },
// {
//   "question": "Can BTS-2000 be used in hazardous locations?",
//   "answer": "Standard models are for non-hazardous locations; explosion-proof versions available on request."
// },
// {
//   "question": "what is bts ?",
//   "answer": "BTS stands for Battery Transfer Switch, a device used to manage and switch between multiple power sources."
// },
// {
//   "question": "What is the weight of a typical BTS-2000 unit?",
//   "answer": "Weight varies from 50kg to 200kg depending on the model and configuration."
// },
// {
//   "question": "How are control power requirements handled?",
//   "answer": "Can be powered from any available source with wide input voltage range (100-240V AC/DC)."
// },
// {
//   "question": "What is the expected contact life under rated load?",
//   "answer": "Contact life exceeds 100,000 operations at rated current under normal operating conditions."
// },
// {
//   "question": "Can BTS-2000 be used with energy storage systems?",
//   "answer": "Yes, integrates with battery storage systems for optimal energy management."
// },
// {
//   "question": "who develop this website ?",
//   "answer": "Frontend by AMAN TIWARY and backend by JITU KUMAR."
// },
// {
//   "question": "company name ?",
//   "answer": "AARTECH SOLONIC LIMITED ."
// },
// {
//   "question": "What is the maximum frequency deviation tolerated?",
//   "answer": "Operates within frequency range of 45-65Hz with configurable tolerance settings."
// },
// {
//   "question": "How does BTS-2000 ensure arc flash protection?",
//   "answer": "Incorporates arc flash detection and prevention mechanisms including quick-make, quick-break operation."
// },
// {
//   "question": "What is the typical installation time?",
//   "answer": "Professional installation typically takes 4-8 hours depending on site conditions and complexity."
// },
// {
//   "question": "Can BTS-2000 be remotely operated?",
//   "answer": "Yes, full remote operation capability through secure web interface and mobile apps."
// },
// {
//   "question": "What is the price range for BTS-2000 systems?",
//   "answer": "Prices range from $5,000 to $50,000 depending on configuration, rating, and features."
// },
// {
//   "question": "How does BTS-2000 handle unbalanced loads?",
//   "answer": "Designed to handle unbalanced three-phase loads within standard tolerance limits."
// },
// {
//   "question": "What is the maximum voltage dip during transfer?",
//   "answer": "Closed transition transfer ensures less than 5% voltage dip during source switching."
// },
// {
//   "question": "Can BTS-2000 be used with cogeneration systems?",
//   "answer": "Yes, ideal for cogeneration applications with multiple power sources."
// },
// {
//   "question": "What is the warranty coverage?",
//   "answer": "Standard 3-year warranty covering parts and labor, extendable to 5 or 10 years."
// },
// {
//   "question": "How does BTS-2000 handle power factor correction?",
//   "answer": "Monitors power factor but does not include correction; integrates with external PFC systems."
// },
// {
//   "question": "What is the maximum distance for remote monitoring?",
//   "answer": "No practical distance limitation when using network connectivity; local I/O supports up to 1000m."
// },
// {
//   "question": "Can BTS-2000 be used in marine applications?",
//   "answer": "Marine-grade versions available with appropriate certifications for shipboard use."
// },
// {
//   "question": "What is the typical delivery lead time?",
//   "answer": "Standard delivery: 4-6 weeks; expedited options available for urgent requirements."
// },
// {
//   "question": "How does BTS-2000 handle voltage transients?",
//   "answer": "Built-in surge protection and robust design handles transients up to 6kV."
// },
// {
//   "question": "What training is provided for maintenance personnel?",
//   "answer": "Comprehensive training programs including online modules, on-site sessions, and certification courses."
// },
// {
//   "question": "Can BTS-2000 be used with microgrid controllers?",
//   "answer": "Yes, acts as a key component in microgrid systems with advanced control capabilities."
// },
// {
//   "question": "What is the maximum altitude for proper operation?",
//   "answer": "Rated for operation up to 2000 meters above sea level without performance degradation."
// },
// {
//   "question": "How does BTS-2000 ensure cyber security?",
//   "answer": "Multiple security layers including encrypted communications, role-based access, and regular security updates."
// },
// {
//   "question": "What is the expected maintenance interval?",
//   "answer": "Routine inspection every 6 months, comprehensive maintenance annually under normal conditions."
// },
// {
//   "question": "Can BTS-2000 be used in educational institutions?",
//   "answer": "Yes, suitable for universities, research facilities, and educational campuses with robust safety features."
// },
// {
//   "question": "What is the maximum operational altitude?",
//   "answer": "Designed for operation up to 2000 meters above sea level without derating."
// },
// {
//   "question": "How does BTS-2000 handle frequency variations?",
//   "answer": "Monitors frequency and can be configured to transfer based on frequency stability requirements."
// },
// {
//   "question": "What is the maximum ambient temperature for storage?",
//   "answer": "Can be stored in temperatures from -40°C to 70°C when not in operation."
// },
// {
//   "question": "Can BTS-2000 be used with existing switchgear?",
//   "answer": "Yes, designed to integrate with most standard switchgear and distribution equipment."
// },
// {
//   "question": "What is the typical efficiency of BTS-2000?",
//   "answer": "Operational efficiency exceeds 99% with minimal power loss during normal operation."
// },
// {
//   "question": "How does BTS-2000 handle ground fault conditions?",
//   "answer": "Monitors for ground faults but relies on upstream protection devices for clearance."
// },
// {
//   "question": "What is the maximum number of operations per day?",
//   "answer": "Rated for unlimited operations with no daily limit under normal operating conditions."
// },
// {
//   "question": "Can BTS-2000 be used in telecommunications facilities?",
//   "answer": "Yes, ideal for telecom shelters, data centers, and communication infrastructure."
// },
// {
//   "question": "What is the vibration tolerance?",
//   "answer": "Withstands vibration levels up to 1G in accordance with IEC 60068-2-6 standards."
// },
// {
//   "question": "How does BTS-2000 handle voltage unbalance?",
//   "answer": "Monitors phase voltage unbalance and can trigger transfers if unbalance exceeds set limits."
// },
// {
//   "question": "What is the maximum number of control inputs/outputs?",
//   "answer": "Standard configuration includes 8 digital inputs and 6 relay outputs, expandable as needed."
// },
// {
//   "question": "Can BTS-2000 be used in wastewater treatment plants?",
//   "answer": "Yes, suitable for industrial environments with appropriate enclosure ratings."
// },
// {
//   "question": "What is the expected service life?",
//   "answer": "Designed for 20+ years of service with proper maintenance and operating conditions."
// },
// {
//   "question": "How does BTS-2000 handle reverse power flow?",
//   "answer": "Can be configured to detect and respond to reverse power conditions when used with generation sources."
// },
// {
//   "question": "What is the maximum rate of rise of recovery voltage?",
//   "answer": "Designed to handle RRdV up to 1000 V/μs for reliable interruption performance."
// },
// {
//   "question": "What is TransSync?",
//   "answer": "TransSync is an advanced cloud-enabled BTS Remote Control and Data Monitoring System that provides comprehensive remote access, control, and monitoring capabilities for BTS relay systems through a secure, intuitive web-based interface."
// },
// {
//   "question": "What relay monitoring parameters does TransSync track?",
//   "answer": "TransSync monitors real-time relay status, disturbance records, coil parameters, events, temperature, operation count, contact position, coil energization state, health metrics, and power quality parameters including voltage, current, frequency, and harmonics."
// },
// {
//   "question": "What types of events does TransSync log?",
//   "answer": "TransSync logs relay operations (trip/close commands), alarm events (overcurrent, undervoltage), power quality events (voltage sag/swell), system events (communication loss), disturbance records, and maintenance events with full timestamping and analysis."
// },
// {
//   "question": "What is the data refresh rate for real-time monitoring in TransSync?",
//   "answer": "TransSync provides ultra-fast 100ms refresh rates for critical parameters, 1-second updates for non-critical data, and instant capture for disturbance records, ensuring real-time monitoring accuracy."
// },
// {
//   "question": "What alert and notification systems are implemented in TransSync?",
//   "answer": "TransSync features color-coded popup alerts, audible notifications, mobile vibration alerts, multi-channel notifications (email/SMS/push), and escalation matrices based on severity levels."
// },
// {
//   "question": "How does TransSync compare to traditional SCADA systems for BTS-2000?",
//   "answer": "TransSync offers cloud-enabled rapid deployment, multi-network accessibility, 100ms refresh rates (vs 1-5 seconds in SCADA), lower TCO, mobile-first design, and specialized BTS-2000 integration unlike generic SCADA systems."
// },
// {
//   "question": "What is the main dashboard layout of TransSync?",
//   "answer": "The dashboard includes System Overview Panel (health status), Relay Control Center (visual indicators), Power Quality Dashboard (waveforms/analysis), Event Management (chronological logs), and Historical Analytics with customizable trend graphs."
// },
// {
//   "question": "Can TransSync operate across different networks?",
//   "answer": "Yes, TransSync features multi-network architecture with seamless operation across different infrastructures, automatic failover between communication paths, and secure tunneling for cross-network connectivity."
// },
// {
//   "question": "What security features does TransSync implement?",
//   "answer": "TransSync uses TLS 1.3 encryption, multi-factor authentication, role-based access control, audit trails, regular security updates, and secure communication protocols for comprehensive cybersecurity."
// },
// {
//   "question": "What communication protocols does TransSync support?",
//   "answer": "TransSync supports Modbus TCP/RTU, IEC 61850, DNP3 at device level; MQTT, WebSockets, HTTPS at cloud level; and REST API, GraphQL for client applications."
// },
// {
//   "question": "Can TransSync be accessed from mobile devices?",
//   "answer": "Yes, TransSync offers native mobile apps for iOS and Android with vibration alerts, full dashboard functionality, and offline capability for limited connectivity scenarios."
// },
// {
//   "question": "What are the system requirements for TransSync?",
//   "answer": "TransSync requires modern web browsers (Chrome 90+, Firefox 85+), mobile OS (Android 10+, iOS 14+), minimum 1Mbps bandwidth per device, and supports cloud or on-premise deployment."
// },
// {
//   "question": "How does TransSync handle disturbance records?",
//   "answer": "TransSync captures complete waveform data including pre-fault and post-fault information, provides playback functionality, automated analysis, and stores records for compliance and troubleshooting."
// },
// {
//   "question": "What predictive maintenance features does TransSync offer?",
//   "answer": "TransSync includes machine learning-based predictive analytics, equipment health scoring, maintenance scheduling, wear prediction, and automated maintenance reminders based on operational data."
// },
// {
//   "question": "Can multiple users access TransSync simultaneously?",
//   "answer": "Yes, TransSync supports unlimited concurrent users with role-based permissions, ensuring secure multi-user access from different locations with configurable access levels."
// },
// {
//   "question": "How does TransSync ensure data reliability during network outages?",
//   "answer": "TransSync features local data buffering, automatic synchronization upon reconnection, offline operation capability, and redundant communication paths to maintain data integrity."
// },
// {
//   "question": "What reporting capabilities does TransSync provide?",
//   "answer": "TransSync offers customizable reports, automated scheduling, PDF/Excel exports, compliance reporting, performance analytics, and trend analysis with visualization tools."
// },
// {
//   "question": "How quickly can TransSync be deployed?",
//   "answer": "TransSync can be deployed in hours to days compared to weeks/months for traditional SCADA, with cloud setup taking 1-2 days and on-premise installation 3-5 days."
// },
// {
//   "question": "What training and support is available for TransSync?",
//   "answer": "We provide online training modules, documentation, live sessions, 24/7 technical support, and certification programs for comprehensive user enablement."
// },
// {
//   "question": "Can TransSync integrate with existing BMS or ERP systems?",
//   "answer": "Yes, TransSync offers API integration, supports BACnet, LonWorks protocols, and can seamlessly integrate with Building Management Systems and enterprise software."
// },
// {
//   "question": "What is the cost structure for TransSync?",
//   "answer": "TransSync offers subscription-based pricing with 60% lower TCO than SCADA, including Basic, Professional, and Enterprise tiers with flexible payment options."
// },
// {
//   "question": "How does TransSync handle historical data storage?",
//   "answer": "TransSync provides cloud-based historical data storage with configurable retention periods, fast retrieval, and advanced analytics capabilities for long-term trend analysis."
// },
// {
//   "question": "What makes TransSync better for BTS-2000 specifically?",
//   "answer": "TransSync is purpose-built for BTS-2000 with deep hardware integration, specialized analytics for relay monitoring, industry-specific features, and optimized performance for power switching applications."
// },
// {
//   "question": "Can TransSync control relays remotely?",
//   "answer": "Yes, TransSync provides secure remote control capabilities with safety interlocks, operation logging, permission-based access, and real-time status feedback for all relay operations."
// },
// {
//   "question": "What type of analytics does TransSync provide?",
//   "answer": "TransSync offers power quality analytics, operational efficiency metrics, energy consumption trends, predictive maintenance insights, and performance benchmarking with visualization tools."
// },
// {
//   "question": "How does TransSync ensure compliance with industry standards?",
//   "answer": "TransSync maintains audit trails, generates compliance reports, follows industry protocols, and provides documentation for regulatory requirements including IEC standards and cybersecurity norms."
// },
// {
//   "question": "What backup and recovery features does TransSync have?",
//   "answer": "TransSync includes automated backups, disaster recovery protocols, configuration versioning, and rapid restoration capabilities to ensure business continuity."
// },
// {
//   "question": "Can TransSync be customized for specific customer needs?",
//   "answer": "Yes, TransSync offers custom dashboard layouts, specialized reports, unique alert rules, and tailored integrations to meet specific operational requirements."
// },
// {
//   "question": "What is the scalability of TransSync?",
//   "answer": "TransSync scales from single devices to enterprise-wide deployments supporting thousands of devices across multiple locations with consistent performance."
// },
// {
//   "question": "How does TransSync handle firmware updates for connected devices?",
//   "answer": "TransSync manages firmware updates remotely with version control, rollback capability, scheduled deployments, and update tracking for all connected BTS-2000 devices."
// }
// ];

// // ✅ CORRECTED matching function with better accuracy
// const findBestAnswer = (userInput) => {
//   const lowerInput = userInput.toLowerCase().trim();
  
//   // Remove common question words and punctuation for better matching
//   const cleanInput = lowerInput.replace(/[^\w\s]/g, '')
//     .replace(/\b(what|how|when|where|why|can|does|is|are|the|a|an)\b/g, '')
//     .trim();
 
//   // Exact match check
//   const exactMatch = websiteData.find(item =>
//     item.question.toLowerCase().trim() === lowerInput
//   );
//   if (exactMatch) return exactMatch.answer;

//   // Check if input contains key phrases from questions
//   const phraseMatch = websiteData.find(item => {
//     const questionKey = item.question.toLowerCase()
//       .replace(/[^\w\s]/g, '')
//       .replace(/\b(what|how|when|where|why|can|does|is|are|the|a|an)\b/g, '')
//       .trim();
    
//     const keyPhrases = questionKey.split(' ').filter(word => word.length > 3);
//     return keyPhrases.some(phrase => cleanInput.includes(phrase)) || 
//            cleanInput.split(' ').some(word => questionKey.includes(word) && word.length > 3);
//   });
  
//   if (phraseMatch) return phraseMatch.answer;

//   // Enhanced keyword scoring with priority
//   const keywords = cleanInput.split(/\s+/).filter(word => word.length > 2);
  
//   if (keywords.length === 0) {
//     return "Could you please provide more details about your question regarding BTS-2000?";
//   }

//   let bestMatch = null;
//   let highestScore = 0;

//   websiteData.forEach(item => {
//     const questionText = item.question.toLowerCase();
//     let score = 0;

//     keywords.forEach(keyword => {
//       // Exact word match
//       if (questionText.includes(' ' + keyword + ' ') || 
//           questionText.startsWith(keyword + ' ') || 
//           questionText.endsWith(' ' + keyword)) {
//         score += 3;
//       }
//       // Partial word match
//       else if (questionText.includes(keyword)) {
//         score += 1;
//       }
//     });

//     // Bonus for matching technical terms
//     const technicalTerms = ['bts-2000', 'voltage', 'current', 'power', 'transfer', 'relay', 'temperature', 'rating', 'specification'];
//     technicalTerms.forEach(term => {
//       if (cleanInput.includes(term) && questionText.includes(term)) {
//         score += 2;
//       }
//     });

//     if (score > highestScore) {
//       highestScore = score;
//       bestMatch = item;
//     }
//   });

//   // Only return if we have a reasonably good match
//   if (bestMatch && highestScore >= 2) {
//     return bestMatch.answer;
//   }

//   // Contextual fallback responses
//   const greetings = ["hello", "hi", "hey", "good morning", "good afternoon"];
//   const thanks = ["thank", "thanks", "thank you"];

//   if (greetings.some(greet => lowerInput.includes(greet))) {
//     return "Hello! I'm your BTS-2000 AI Assistant. How can I help you with our power switching solutions today?";
//   }

//   if (thanks.some(thank => lowerInput.includes(thank))) {
//     return "You're welcome! Is there anything else you'd like to know about BTS-2000?";
//   }

//   if (lowerInput.includes("bye") || lowerInput.includes("goodbye")) {
//     return "Thank you for chatting! Feel free to reach out if you have more questions about BTS-2000.";
//   }

//   // Improved fallback response
//   return `I want to make sure I give you the right information about BTS-2000. Could you please rephrase your question or ask about:
  
// • Technical specifications
// • Installation and configuration  
// • Operation and maintenance
// • Pricing and licensing
// • Safety features
// • Or any specific feature you're interested in?`;
// };

// // Your ChatBot component remains exactly the same...
// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { 
//       text: "Hello! I'm your BTS-2000 AI Assistant. I can help you with product specifications, features, technical support, and troubleshooting.", 
//       sender: "bot",
//       timestamp: new Date(),
//       id: Date.now()
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   // Scroll to latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { 
//       text: input, 
//       sender: "user", 
//       timestamp: new Date(),
//       id: Date.now()
//     };
//     setMessages(prev => [...prev, userMessage]);
//     setInput("");
//     setIsTyping(true);

//     const typingDelay = 500 + Math.random() * 300;

//     setTimeout(() => {
//       const answer = findBestAnswer(userMessage.text);
//       const botMessage = { 
//         text: answer, 
//         sender: "bot", 
//         timestamp: new Date(),
//         id: Date.now() + 1
//       };
//       setMessages(prev => [...prev, botMessage]);
//       setIsTyping(false);
//     }, typingDelay);
//   };

//   const formatTime = (date) => {
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   const suggestedQuestions = [
//     "What is the maximum current rating for BTS-2000?",
//     "What is the operating temperature range?",
//     "How does BTS-2000 handle power quality issues?",
//     "What communication interfaces are available?",
//     "What is the typical delivery lead time?",
//     "What certifications does BTS-2000 hold?"
//   ];

//   const handleSuggestionClick = (question) => {
//     setInput(question);
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 50);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     setIsMinimized(false);
//     localStorage.setItem('chatbotLastInteraction', new Date().toISOString());
//   };

//   const handleToggleMinimize = () => {
//     setIsMinimized(!isMinimized);
//   };

//   const clearChat = () => {
//     setMessages([
//       { 
//         text: "Hello! I'm your BTS-2000 AI Assistant. How can I help you today?", 
//         sender: "bot",
//         timestamp: new Date(),
//         id: Date.now()
//       },
//     ]);
//   };

//   return (
//     <>
//       {/* Floating Chat Button */}
//       {!isOpen && (
//         <div className="fixed bottom-14 right-12 z-50">
//           <button
//             onClick={() => {
//               setIsOpen(true);
//               setIsMinimized(false);
//             }}
//             className="group relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center 
//               text-white transition-all duration-300 hover:scale-110
//               bg-gradient-to-br from-blue-700 to-blue-900
//               hover:from-blue-800 hover:to-blue-950
//               active:scale-95 border border-blue-500/30"
//             aria-label="Open chat assistant"
//           >
//             <span className="text-xl transition-transform group-hover:scale-110">💬</span>
//             <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full text-[10px] flex items-center justify-center border-2 border-white">
//               ●
//             </span>
//           </button>
//         </div>
//       )}

//       {/* Chat Window */}
//       {isOpen && (
//         <div 
//           className="fixed z-50 
//           w-[95vw] max-w-[380px] h-[480px] 
//           bottom-4 right-4
//           sm:bottom-5 sm:right-5
//           md:max-w-[400px]
//           bg-white dark:bg-gray-900 
//           rounded-2xl shadow-2xl flex flex-col 
//           border border-gray-300/80 dark:border-gray-600/80
//           backdrop-blur-sm
//           transition-all duration-300 ease-out"
//           style={{
//             transform: isMinimized ? 'translateY(calc(100% - 52px))' : 'translateY(0)',
//             height: isMinimized ? '52px' : '480px',
//             maxHeight: isMinimized ? '52px' : 'min(480px, 85vh)',
//           }}
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-4 py-3 rounded-t-2xl flex justify-between items-center min-h-[52px] border-b border-blue-600/30">
//             <div className="flex items-center space-x-2.5">
//               <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
//                 <span className="text-white text-sm">⚡</span>
//               </div>
//               <div>
//                 <h2 className="text-white font-semibold text-[13px] leading-tight">BTS-2000 Assistant</h2>
//                 <p className="text-blue-200/90 text-[11px]">Online • Ready to help</p>
//               </div>
//             </div>
//             <div className="flex space-x-0.5">
//               <button 
//                 onClick={clearChat}
//                 className="p-1.5 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
//                 aria-label="Clear conversation"
//                 title="Clear chat"
//               >
//                 <span className="text-[12px]">🔄</span>
//               </button>
//               <button 
//                 onClick={handleToggleMinimize}
//                 className="p-1.5 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
//                 aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
//                 title={isMinimized ? "Expand" : "Minimize"}
//               >
//                 <span className="text-[12px]">{isMinimized ? '⤢' : '–'}</span>
//               </button>
//               <button 
//                 onClick={handleClose}
//                 className="p-1.5 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
//                 aria-label="Close chat"
//                 title="Close"
//               >
//                 <span className="text-[12px]">×</span>
//               </button>
//             </div>
//           </div>

//           {/* Chat Body */}
//           <div className="flex-1 flex flex-col overflow-hidden">
//             {/* Messages Container */}
//             <div className="flex-1 overflow-y-auto p-3 bg-gray-50/80 dark:bg-gray-800/80">
//               <div className="space-y-2.5">
//                 {messages.map((msg) => (
//                   <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//                     <div className={`max-w-[88%] ${msg.sender === "user" ? "ml-3" : "mr-3"}`}>
//                       <div className={`inline-block px-3.5 py-2.5 rounded-2xl text-[13px] leading-snug ${
//                         msg.sender === "user" 
//                           ? "bg-blue-600 text-white rounded-br-sm shadow-sm" 
//                           : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm border border-gray-200/80 dark:border-gray-600/80 shadow-sm"
//                       }`}>
//                         {msg.text}
//                       </div>
//                       <div className={`text-[11px] mt-1 text-gray-500/90 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
//                         {formatTime(msg.timestamp)}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 {isTyping && (
//                   <div className="flex justify-start">
//                     <div className="max-w-[88%] mr-3">
//                       <div className="inline-block px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white dark:bg-gray-700 border border-gray-200/80 dark:border-gray-600/80 shadow-sm">
//                         <div className="flex space-x-1.5 items-center">
//                           <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"></div>
//                           <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
//                           <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
//                           <span className="text-[11px] text-gray-600 dark:text-gray-400 ml-1">Thinking...</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>
//             </div>

//             {/* Suggested Questions */}
//             {messages.length <= 2 && !isTyping && (
//               <div className="px-3 py-2.5 border-t border-gray-200/60 dark:border-gray-700/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
//                 <p className="text-[11px] font-medium mb-1.5 text-gray-600 dark:text-gray-400 uppercase tracking-wide">Suggested questions:</p>
//                 <div className="flex flex-wrap gap-1.5">
//                   {suggestedQuestions.map((q, idx) => (
//                     <button 
//                       key={idx} 
//                       onClick={() => handleSuggestionClick(q)}
//                       className="text-[11px] px-2.5 py-1 bg-blue-50/80 dark:bg-gray-800/80 text-blue-800 dark:text-blue-300 rounded-full 
//                                hover:bg-blue-100 dark:hover:bg-gray-700/90 transition-all duration-200
//                                border border-blue-200/50 dark:border-gray-700/50
//                                hover:scale-105 active:scale-95"
//                     >
//                       {q}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Input Area */}
//             <div className="p-3 border-t border-gray-200/60 dark:border-gray-700/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
//               <div className="flex space-x-2">
//                 <div className="flex-1 relative">
//                   <input
//                     ref={inputRef}
//                     type="text"
//                     className="w-full px-3.5 py-2.5 border border-gray-300/80 dark:border-gray-600/80 rounded-xl 
//                              text-[13px] dark:bg-gray-800/50 dark:text-white placeholder-gray-500/70
//                              focus:outline-none focus:ring-1.5 focus:ring-blue-500/80 focus:border-transparent
//                              transition-all duration-200 backdrop-blur-sm"
//                     placeholder="Type your question about BTS-2000..."
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     disabled={isTyping}
//                   />
//                   {input.length > 0 && (
//                     <button 
//                       onClick={() => setInput('')}
//                       className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[12px]"
//                     >
//                       ×
//                     </button>
//                   )}
//                 </div>
//                 <button
//                   onClick={handleSend}
//                   disabled={isTyping || !input.trim()}
//                   className="px-3.5 py-2.5 bg-blue-600 text-white rounded-xl text-[13px] font-medium
//                            hover:bg-blue-700 disabled:bg-gray-400/60 disabled:cursor-not-allowed
//                            transition-all duration-200 flex items-center justify-center
//                            min-w-[50px] shadow-sm hover:shadow-md"
//                   aria-label="Send message"
//                 >
//                   {isTyping ? (
//                     <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   ) : (
//                     'Send'
//                   )}
//                 </button>
//               </div>
//               <p className="text-[11px] text-gray-500/80 mt-1.5 text-center">
//                 Ask about specifications, pricing, or technical support
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Backdrop for mobile */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 z-40 bg-black/10 lg:bg-transparent"
//           onClick={() => setIsMinimized(true)}
//         />
//       )}
//     </>
//   );
// };

// export default ChatBot;





import React from 'react'

const ChatBot = () => {
  return (
    <div>
      <div className="fixed bottom-8 right-8 z-50">
          <a
            href="https://wa.me/919835383246?text=Hello! I'd like to inquire about your services."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 text-white p-4 rounded-full shadow-xl border-2 border-slate-950 flex items-center justify-center hover:bg-emerald-500 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
            </svg>
          </a>
        </div>
    </div>
  )
}

export default ChatBot
