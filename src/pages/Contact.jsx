import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "normal",
    team: "technical", // technical or marketing
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("technical");

  // Theme color: #0AC4E0
  const themeColor = "#0AC4E0";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (team) => {
    setActiveTab(team);
    setFormData({ ...formData, team: team });
  };

  const generateWhatsAppMessage = () => {
    const currentDate = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const teamName =
      activeTab === "technical" ? "TECHNICAL SUPPORT" : "MARKETING TEAM";
    const priority = formData.priority === "urgent" ? " URGENT" : " NORMAL";

    const message = `
 *TRANSYNC - CONTACT FORM*
━━━━━━━━━━━━━━━━━━━━━━━━━━━

 *TEAM: ${teamName}*
━━━━━━━━━━━━━━━━━━━━━━━━━━━

 *CONTACT DETAILS*
──────────────────
 *Name:* ${formData.name || "Not provided"}
 *Email:* ${formData.email || "Not provided"}
 *Phone:* ${formData.phone || "Not provided"}
 *Subject:* ${formData.subject || "Not provided"}
 *Priority:* ${priority}

 *MESSAGE*
──────────────────
${formData.message || "No message provided"}

 *SUBMITTED ON*
──────────────────
${currentDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
 This is an automated message from TransSync Contact Form
    `;

    return encodeURIComponent(message).replace(/%0A/g, "%0A");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Log to console
    console.log("Contact Form Submitted:", formData);

    // Different WhatsApp numbers for different teams
    const whatsappNumbers = {
      technical: "916201063766", // Technical team number
      marketing: "916201063767", // Marketing team number (replace with actual)
    };

    // Generate WhatsApp message
    const whatsappMessage = generateWhatsAppMessage();
    const whatsappNumber = whatsappNumbers[activeTab];

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Show success message
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        priority: "normal",
        team: activeTab,
      });
      setIsSubmitted(false);
    }, 5000);
  };

  // Team information
  const teamInfo = {
    technical: {
      title: "Technical Support Team",
      description:
        "Get help with installation, troubleshooting, and technical queries about BTS-2000 monitoring.",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      phone: "+91 9835383246",
      email: "tech.support@transsync.in",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      responseTime: "Within 30 minutes",
      expertise: [
        "Installation Support",
        "Troubleshooting",
        "System Configuration",
        "Hardware Issues",
      ],
    },
    marketing: {
      title: "Marketing & Sales Team",
      description:
        "Get information about pricing, demos, partnerships, and business inquiries.",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>
      ),
      phone: "+91 9835383246",
      email: "sales@transsync.in",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      responseTime: "Within 2 hours",
      expertise: [
        "Product Demos",
        "Pricing Plans",
        "Partnerships",
        "Enterprise Solutions",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Main Contact Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Team Selection Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 sm:mb-12">
            <button
              onClick={() => handleTabChange("technical")}
              className={`px-6 sm:px-8 py-4 sm:py-5 rounded-md font-bold uppercase tracking-wide text-base sm:text-lg transition-colors duration-200 ${
                activeTab === "technical"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                </svg>
                Technical Support
              </div>
            </button>

            <button
              onClick={() => handleTabChange("marketing")}
              className={`px-6 sm:px-8 py-4 sm:py-5 rounded-md font-bold uppercase tracking-wide text-base sm:text-lg transition-colors duration-200 ${
                activeTab === "marketing"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
                Marketing & Sales
              </div>
            </button>
          </div>

          {/* Team Info Cards */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Team Details Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 sm:p-8 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500 rounded-md flex items-center justify-center text-slate-950 mr-4">
                    {teamInfo[activeTab].icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {teamInfo[activeTab].title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-400 text-sm sm:text-base mb-6">
                  {teamInfo[activeTab].description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-slate-950 border border-slate-800 rounded-md">
                    <svg
                      className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-sm sm:text-base text-slate-300">
                      {teamInfo[activeTab].phone}
                    </span>
                  </div>

                  <div className="flex items-center p-3 bg-slate-950 border border-slate-800 rounded-md">
                    <svg
                      className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm sm:text-base text-slate-300">
                      {teamInfo[activeTab].email}
                    </span>
                  </div>

                  <div className="flex items-center p-3 bg-slate-950 border border-slate-800 rounded-md">
                    <svg
                      className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm sm:text-base text-slate-300">
                      {teamInfo[activeTab].hours}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h4 className="text-sm font-semibold text-white mb-3">
                    Expertise:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {teamInfo[activeTab].expertise.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-md text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-3 bg-slate-950 border border-slate-800 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">
                      Response Time:
                    </span>
                    <span className="text-sm font-bold text-amber-400">
                      {teamInfo[activeTab].responseTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 sm:p-8">
                {/* Success Message */}
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/30 flex items-center">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span className="text-sm sm:text-base">
                      Thank you! Your message has been sent via WhatsApp. Our{" "}
                      {teamInfo[activeTab].title} will respond{" "}
                      {teamInfo[activeTab].responseTime}.
                    </span>
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  Send a Message to{" "}
                  {activeTab === "technical"
                    ? "Technical Support"
                    : "Marketing Team"}
                </h3>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.com"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Phone & Priority */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Priority
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors text-sm sm:text-base"
                      >
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder={`${activeTab === "technical" ? "Technical issue with..." : "Inquiry about..."}`}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors text-sm sm:text-base"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder={
                        activeTab === "technical"
                          ? "Please describe your technical issue in detail..."
                          : "Tell us about your requirements or inquiry..."
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors text-sm sm:text-base resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 sm:py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wide rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        Send Message via WhatsApp
                      </>
                    )}
                  </button>

                  {/* WhatsApp Info */}
                  <div className="text-center mt-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs sm:text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.072.043.418-.101.823z" />
                      </svg>
                      Messages sent directly to{" "}
                      {activeTab === "technical"
                        ? "Technical Support"
                        : "Marketing Team"}{" "}
                      via WhatsApp
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-8 sm:mt-12">
            <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                Our Location
              </h3>
              <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden border border-slate-800 bg-slate-950">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.8982250578956!2d77.52276937527084!3d23.100821213403645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c464a3eb34b4b%3A0x1ede16b9c3d8848b!2sAartech%20Solonics%20Limited!5e0!3m2!1sen!2sin!4v1771058829309!5m2!1sen!2sin"
                   className="w-full h-full min-h-[300px] sm:min-h-[400px] grayscale-[30%] contrast-[1.1] brightness-[0.9]"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                  title="Office Location"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
