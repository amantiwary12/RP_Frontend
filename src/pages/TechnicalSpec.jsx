import React, { useState } from "react";

export default function TechnicalSpec() {
  const [activeCategory, setActiveCategory] = useState("all");

  const specs = [
    {
      title: "Supported Devices",
      details: "Bus Transfer System 2000 (BTS-2000) developed by Aartech Solonics Limited. Future-ready for integration with other intelligent switchgear and power management devices.",
      category: "hardware"
    },
    {
      title: "Connectivity",
      details: "Ethernet (TCP/IP), Modbus TCP, and optional serial gateway support. Secure HTTPS-based API endpoints for integration with third-party dashboards.",
      category: "connectivity"
    },
    {
      title: "Data Acquisition Rate",
      details: "Live updates at intervals as low as 1 second, configurable depending on network and system requirements.",
      category: "performance"
    },
    {
      title: "Platform",
      details: "Web-based application accessible via modern browsers (Chrome, Edge, Firefox). Optimized for desktop, tablet, and mobile use.",
      category: "software"
    },
    {
      title: "Security",
      details: "Role-based authentication, SSL/TLS encryption, audit logging, and optional VPN-based secure access.",
      category: "security"
    },
    {
      title: "Scalability",
      details: "Supports multiple BTS-2000 units across distributed locations. Centralized monitoring with hierarchical grouping of devices.",
      category: "performance"
    },
    {
      title: "User Interface",
      details: "Modern dashboard with live charts, switch status indicators, alarm notifications, and historical trend analysis.",
      category: "software"
    },
    {
      title: "Deployment Options",
      details: "On-premise installation for critical infrastructure OR cloud-hosted SaaS model for remote access.",
      category: "deployment"
    },
    {
      title: "Integration",
      details: "REST APIs available for integration with ERP, analytics platforms, and other enterprise monitoring solutions.",
      category: "connectivity"
    },
    {
      title: "System Requirements",
      details: "Minimum: Dual-core CPU, 4 GB RAM, 2 GB storage. Recommended: Quad-core CPU, 8 GB RAM, 10 GB storage. Compatible with Windows Server & Linux environments.",
      category: "hardware"
    },
  ];

  const categories = [
    { id: "all", name: "All Specifications" },
    { id: "hardware", name: "Hardware" },
    { id: "software", name: "Software" },
    { id: "connectivity", name: "Connectivity" },
    { id: "security", name: "Security" },
    { id: "performance", name: "Performance" },
    { id: "deployment", name: "Deployment" }
  ];

  const filteredSpecs = activeCategory === "all"
    ? specs
    : specs.filter(spec => spec.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">
            Technical Reference
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold mt-4 mb-4 text-white">
            Technical Specifications
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Comprehensive technical details of the TransSync monitoring system for the BTS-2000
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${activeCategory === category.id
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-amber-500/40 hover:text-white'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Specs Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSpecs.map((spec, index) => (
            <div
              key={index}
              className="group bg-slate-900 rounded-lg p-6 border border-slate-800 hover:border-amber-500/40 transition-colors duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="bg-amber-500/10 p-2 rounded-md mr-4 border border-amber-500/30">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {spec.title}
                </h2>
              </div>
              <p className="text-slate-400 leading-relaxed pl-10">{spec.details}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-slate-900 rounded-lg p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to experience TransSync?</h2>
          <p className="text-slate-400 max-w-3xl mx-auto mb-6">
            Contact our team to schedule a demonstration or request detailed technical documentation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wide rounded-md transition-colors duration-200">
              Request Demo
            </button>
            <button className="px-6 py-3 bg-transparent border border-slate-700 hover:border-amber-500 text-white hover:text-amber-400 font-medium rounded-md transition-colors duration-200">
              Download Technical Brochure
            </button>
          </div>
        </div>

        {/* Closing Note */}
        <div className="mt-16 text-center">
          <div className="inline-block p-3 bg-slate-900 rounded-md border border-amber-500/30 mb-6">
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Engineered for Excellence</h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            TransSync is engineered to deliver high performance, secure operations, and scalable monitoring for the BTS-2000.
            With its future-ready architecture, it ensures long-term reliability in mission-critical environments.
          </p>
        </div>
      </div>
    </div>
  );
}
