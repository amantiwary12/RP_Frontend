import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Services() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.service-card, .cta-section');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const servicesData = [
    {
      id: 1,
      path: "analog-data",
      title: "Analog Measurements",
      description: "Monitor and analyze real-time analog signals with precision and advanced visualization tools.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      id: 2,
      path: "disturbance",
      title: "Disturbance Records (DR)",
      description: "Access detailed disturbance records with comprehensive analysis tools and reporting.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      id: 3,
      path: "events",
      title: "Event Tracking",
      description: "Track and analyze system events with reliable time-stamped logs and notifications.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
      ),
    },
    {
      id: 4,
      path: "relay",
      title: "Control Panel",
      description: "Direct access to device controls with real-time monitoring and command execution.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
      ),
    },
    {
      id: 5,
      path: "binary-io",
      title: "Binary input/Output",
      description: "Direct access to device controls with real-time monitoring and command execution.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
      ),
    }
  ];

  const handleClick = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">
            Our Solutions
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
            Advanced Analytical Services
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Professional solutions for monitoring, analysis, and reporting of critical system data with enterprise-grade reliability
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              onClick={() => handleClick(service.path)}
              className="service-card cursor-pointer group relative bg-slate-900 rounded-lg transition-colors duration-300 p-8 flex flex-col items-center text-center border border-slate-800 hover:border-amber-500/40 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>

              {/* Icon Container */}
              <div className="relative mb-8 z-10">
                <div className="p-4 rounded-md bg-amber-500/10 border border-amber-500/30">
                  <div className="text-amber-400">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300 mb-4">
                  {service.title}
                </h3>

                <p className="text-slate-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center justify-center text-amber-400 font-semibold uppercase tracking-wide text-sm">
                  <span>
                    Explore service
                  </span>
                  <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta-section text-center relative">
          <div className="relative bg-slate-900 rounded-lg p-12 border border-slate-800">
            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">
              Quick Access
            </span>

            <h3 className="text-3xl font-bold text-white mt-4 mb-4">Need direct control access?</h3>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
              Access the advanced control panel for real-time device monitoring, command execution, and comprehensive system management.
            </p>

            <button
              onClick={() => navigate("/relay")}
              className="px-10 py-4 bg-amber-500 text-slate-950 font-bold uppercase tracking-wide rounded-md hover:bg-amber-400 transition-colors duration-200"
            >
              Open Control Panel
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        .service-card {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .service-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-section {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .cta-section.animate-in {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </div>
  );
}
