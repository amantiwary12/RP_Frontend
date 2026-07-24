import React, { useState } from "react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme !== 'light';
  });

  const themeClasses = {
    container: isDarkMode
      ? "text-slate-300 bg-slate-950 min-h-screen"
      : "text-slate-300 bg-slate-950 min-h-screen",
    header: isDarkMode ? "bg-slate-950" : "bg-slate-950",
    title: isDarkMode ? "text-white" : "text-white",
    subtitle: isDarkMode ? "text-slate-300" : "text-slate-300",
    section: isDarkMode ? "bg-slate-900" : "bg-slate-900",
    border: isDarkMode ? "border-slate-800" : "border-slate-800",
    text: isDarkMode ? "text-slate-300" : "text-slate-300",
    highlight: isDarkMode ? "text-amber-400" : "text-amber-400",
  };

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing and using the BTS-2000 website and any related services, products, or applications (collectively, the "Services"), you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use our Services.

These Terms constitute a legally binding agreement between you ("User" or "you") and Aartech Solonics Ltd. ("Company," "we," "us," or "our").`
    },
    {
      id: "services-description",
      title: "2. Description of Services",
      content: `The BTS-2000 Industrial Bus Transfer System is an advanced power management platform designed for industrial applications. Our Services include:

• **Website Access:** Informational content, product specifications, and contact forms
• **Technical Documentation:** Product manuals, specifications, and technical resources
• **Contact Services:** Communication channels for inquiries and support
• **Industrial Solutions:** Customized power management systems and related services

We reserve the right to modify, suspend, or discontinue any part of our Services at any time without prior notice.`
    },
    {
      id: "user-accounts",
      title: "3. User Accounts and Registration",
      content: `Certain features of our Services may require registration and the creation of an account. When you create an account, you agree to:

• Provide accurate, current, and complete information
• Maintain and promptly update your account information
• Maintain the security of your password and accept all risks of unauthorized access
• Notify us immediately of any unauthorized use of your account
• Not create accounts for the purpose of violating these Terms

We reserve the right to suspend or terminate accounts that violate these Terms or are used for fraudulent purposes.`
    },
    {
      id: "intellectual-property",
      title: "4. Intellectual Property Rights",
      content: `All content, features, and functionality available through our Services, including but not limited to text, graphics, logos, images, software, and the compilation thereof (the "Content") are the exclusive property of Aartech Solonics Ltd. and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.

**You May:**
• View and display Content for personal, non-commercial use
• Download and print Content for personal reference

**You May Not:**
• Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any Content
• Use any meta tags or other "hidden text" utilizing our name or trademarks
• Use our Content for commercial purposes without our express written consent`
    },
    {
      id: "industrial-data",
      title: "5. Industrial Data and Confidentiality",
      content: `When using our industrial automation services, you may provide operational data, configuration settings, and performance metrics ("Industrial Data").

**Our Rights Regarding Industrial Data:**
• We may collect and analyze Industrial Data to improve our services
• We may use anonymized, aggregated Industrial Data for research and development
• We maintain strict confidentiality of your specific Industrial Data

**Your Responsibilities:**
• Ensure you have the right to share Industrial Data with us
• Maintain backups of your Industrial Data
• Comply with all applicable laws and regulations regarding data collection and processing`
    },
    {
      id: "prohibited-uses",
      title: "6. Prohibited Uses",
      content: `You agree not to use our Services to:

• Violate any applicable law or regulation
• Infringe upon or violate our intellectual property rights or the intellectual property rights of others
• Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services
• Attempt to gain unauthorized access to any portion of the Services
• Introduce viruses, Trojan horses, worms, logic bombs, or other malicious material
• Attempt to interfere with the proper working of the Services
• Use any robot, spider, or other automatic device to access the Services for any purpose

Violation of these prohibitions may result in termination of your access to the Services and legal action.`
    },
    {
      id: "disclaimers",
      title: "7. Disclaimers and Limitations of Liability",
      content: `**Disclaimer of Warranties:**
THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

**Limitation of Liability:**
TO THE MAXIMUM EXTENT PERMITTED BY LAW, AARTECH SOLONICS LTD. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
• YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES
• ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES
• UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT

IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING OUR SERVICES DURING THE TWELVE (12) MONTHS PRIOR TO THE CLAIM.`
    },
    {
      id: "indemnification",
      title: "8. Indemnification",
      content: `You agree to defend, indemnify, and hold harmless Aartech Solonics Ltd., its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services, including, but not limited to, your User Contributions, any use of the Services' content, services, and products other than as expressly authorized in these Terms.`
    },
    {
      id: "termination",
      title: "9. Termination",
      content: `We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.

Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services.

All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`
    },
    {
      id: "governing-law",
      title: "10. Governing Law and Dispute Resolution",
      content: `These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.

**Dispute Resolution:**
• **Negotiation:** Parties agree to attempt to resolve any dispute through good faith negotiations
• **Mediation:** If negotiation fails, parties agree to submit the dispute to mediation
• **Arbitration:** If mediation fails, disputes shall be resolved by binding arbitration in Bhopal, India
• **Court Proceedings:** Either party may seek injunctive relief in any court of competent jurisdiction

You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.`
    },
    {
      id: "changes-to-terms",
      title: "11. Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services.`
    },
    {
      id: "contact-information",
      title: "12. Contact Information",
      content: `If you have any questions about these Terms, please contact us:

**Legal Department**
Aartech Solonics Ltd.
Industrial Area, Bhopal Mandideep
Madhya Pradesh, India 462046
Email: legal@bts2000.com
Phone: +91 755 123 4567

**Effective Date:** January 1, 2024`
    }
  ];

  return (
    <div className={themeClasses.container}>
      {/* Header */}
      <header className={`py-6 border-b ${themeClasses.border} ${themeClasses.header}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className={`w-10 h-10 flex items-center justify-center rounded-md ${isDarkMode ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-amber-500/10 border border-amber-500/30'}`}>
                <span className={`text-xl font-bold ${themeClasses.highlight}`}>BTS</span>
              </div>
              <span className="text-xl font-bold text-white">BTS-2000 Industrial System</span>
            </Link>
            <div className="flex space-x-6">
              <Link to="/" className={`text-sm font-medium ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-white'}`}>
                Home
              </Link>
              <Link to="/contact" className={`text-sm font-medium ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-white'}`}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${themeClasses.title}`}>
            Terms & Conditions
          </h1>
          <p className={`text-xl ${themeClasses.subtitle} max-w-4xl mx-auto`}>
            Legal agreement governing your use of BTS-2000 services
          </p>
          <div className={`h-1 w-24 mx-auto mt-6 ${isDarkMode ? 'bg-amber-500' : 'bg-amber-500'}`}></div>
        </div>

        {/* Important Notice */}
        <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-amber-500/10' : 'bg-amber-500/10'} border ${isDarkMode ? 'border-amber-500/30' : 'border-amber-500/30'}`}>
          <div className="flex items-start">
            <svg className={`w-6 h-6 mr-4 mt-1 flex-shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-amber-400'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className={`text-lg font-bold mb-2 ${themeClasses.title}`}>Important Legal Notice</h3>
              <p className={themeClasses.text}>
                These Terms & Conditions constitute a legally binding agreement. Please read them carefully before using our services. By accessing or using BTS-2000 services, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className={`mb-12 p-6 rounded-lg ${themeClasses.section} border ${themeClasses.border}`}>
          <h3 className={`text-lg font-bold mb-4 ${themeClasses.title}`}>Table of Contents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`text-sm p-3 rounded-md hover:underline ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-800'} text-slate-300`}
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={section.id} id={section.id} className={`p-8 rounded-lg ${themeClasses.section} border ${themeClasses.border}`}>
              <div className="flex items-start mb-6">
                <div className={`w-12 h-12 flex items-center justify-center rounded-md mr-4 ${isDarkMode ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-amber-500/10 border border-amber-500/30'}`}>
                  <span className={`font-bold ${themeClasses.highlight}`}>{index + 1}</span>
                </div>
                <div>
                  <h2 className={`text-2xl font-bold mb-3 ${themeClasses.title}`}>
                    {section.title}
                  </h2>
                  <p className={`whitespace-pre-line ${themeClasses.text}`}>
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Acceptance Section */}
        <div className={`mt-12 p-8 rounded-lg ${isDarkMode ? 'bg-slate-900' : 'bg-slate-900'} border ${themeClasses.border}`}>
          <h3 className={`text-xl font-bold mb-4 ${themeClasses.title}`}>Acceptance of Terms</h3>
          <p className={`mb-6 ${themeClasses.text}`}>
            By continuing to use our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must discontinue use of our Services immediately.
          </p>

          <div className={`p-4 rounded-md ${isDarkMode ? 'bg-slate-800' : 'bg-slate-800'} border ${themeClasses.border}`}>
            <div className="flex items-center">
              <svg className={`w-5 h-5 mr-3 ${themeClasses.highlight}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className={themeClasses.text}>
                I have read and agree to the Terms & Conditions
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-8 border-t ${themeClasses.border} ${isDarkMode ? 'bg-slate-950' : 'bg-slate-950'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-md ${isDarkMode ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-amber-500/10 border border-amber-500/30'}`}>
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className={`text-lg font-bold ${themeClasses.highlight}`}>BTS</span>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">BTS-2000 Industrial System</div>
                  <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                    Enterprise Power Management Solutions
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-8">
              <Link to="/privacypolicy" className={`text-sm font-medium ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-white'}`}>
                Privacy Policy
              </Link>

              <Link to="/contact" className={`text-sm font-medium ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-white'}`}>
                Contact Us
              </Link>
            </div>
          </div>

          <div className={`mt-8 pt-6 border-t ${themeClasses.border} text-center text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} Aartech Solonics Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsConditions;
