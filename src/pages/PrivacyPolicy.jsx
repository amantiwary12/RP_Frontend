import React, { useState } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
      id: "introduction",
      title: "1. Introduction",
      content: `Aartech Solonics Ltd. ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website https://bts2000.com (the "Site") and use our BTS-2000 Industrial Bus Transfer System services. Please read this policy carefully to understand our views and practices regarding your personal data.`
    },
    {
      id: "data-collection",
      title: "2. Information We Collect",
      content: `We may collect and process the following data about you:

• **Personal Identification Information:** Name, email address, phone number, company name, job title
• **Business Information:** Company address, industry type, project requirements
• **Technical Data:** IP address, browser type and version, time zone setting, browser plug-in types, operating system
• **Usage Data:** Information about how you use our website, products, and services
• **Marketing and Communications Data:** Your preferences in receiving marketing from us
• **Industrial Data:** When using our BTS-2000 system, we may collect operational data, performance metrics, and system diagnostics (subject to specific service agreements)`
    },
    {
      id: "data-usage",
      title: "3. How We Use Your Information",
      content: `We use your information for the following purposes:

• To provide and maintain our services
• To notify you about changes to our services
• To allow you to participate in interactive features of our service
• To provide customer support
• To gather analysis or valuable information to improve our services
• To monitor the usage of our services
• To detect, prevent, and address technical issues
• To provide you with news, special offers, and general information about other goods, services, and events we offer
• For compliance with legal obligations`
    },
    {
      id: "data-sharing",
      title: "4. Data Sharing and Disclosure",
      content: `We may share your information with:

• **Service Providers:** Third-party vendors who perform services on our behalf (cloud hosting, analytics, customer service)
• **Business Partners:** Authorized distributors and implementation partners
• **Legal Requirements:** When required by law or to respond to legal process
• **Business Transfers:** In connection with any merger, sale of company assets, or acquisition
• **With Your Consent:** For any other purpose disclosed by us when you provide the information

We require all third parties to respect the security of your personal data and to treat it in accordance with the law.`
    },
    {
      id: "data-security",
      title: "5. Data Security",
      content: `We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our security measures include:

• Encryption of data in transit and at rest
• Regular security assessments and penetration testing
• Access controls and authentication mechanisms
• Network security and firewall protection
• Regular security training for employees
• Incident response and recovery procedures

Despite our efforts, no security measures are completely secure, and we cannot guarantee absolute security.`
    },
    {
      id: "data-retention",
      title: "6. Data Retention",
      content: `We retain personal data only for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.

• **Customer Data:** Retained for the duration of the business relationship and for 7 years thereafter for legal compliance
• **Prospect Data:** Retained for 3 years from last contact
• **Technical Data:** Retained for 2 years for analytics and improvement purposes
• **Industrial Operational Data:** Retention period specified in service level agreements

Upon expiration of the retention period, data is securely deleted or anonymized.`
    },
    {
      id: "your-rights",
      title: "7. Your Data Protection Rights",
      content: `Depending on your location, you may have the following rights:

• **Right to Access:** Request copies of your personal data
• **Right to Rectification:** Request correction of inaccurate or incomplete data
• **Right to Erasure:** Request deletion of your personal data
• **Right to Restrict Processing:** Request restriction of processing of your personal data
• **Right to Data Portability:** Request transfer of your data to another organization
• **Right to Object:** Object to processing of your personal data
• **Right to Withdraw Consent:** Withdraw consent at any time where we rely on consent to process your personal data

To exercise these rights, please contact us at privacy@bts2000.com.`
    },
    {
      id: "cookies",
      title: "8. Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to track activity on our Site and hold certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier.

**Types of Cookies We Use:**
• **Essential Cookies:** Required for the website to function properly
• **Analytics Cookies:** Help us understand how visitors interact with our website
• **Marketing Cookies:** Used to track visitors across websites for marketing purposes

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.`
    },
    {
      id: "international-transfer",
      title: "9. International Data Transfers",
      content: `Your information, including personal data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ.

We ensure that appropriate safeguards are in place for international data transfers, including:
• Standard contractual clauses approved by the European Commission
• Adequacy decisions for countries with adequate data protection
• Binding corporate rules for intra-company transfers`
    },
    {
      id: "children-privacy",
      title: "10. Children's Privacy",
      content: `Our services are not intended for individuals under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us. If we become aware that we have collected personal data from children without verification of parental consent, we take steps to remove that information from our servers.`
    },
    {
      id: "changes",
      title: "11. Changes to This Privacy Policy",
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.

We will let you know via email and/or a prominent notice on our Site prior to the change becoming effective. You are advised to review this Privacy Policy periodically for any changes.`
    },
    {
      id: "contact",
      title: "12. Contact Us",
      content: `If you have any questions about this Privacy Policy, please contact us:

**Data Protection Officer**
Aartech Solonics Ltd.
Industrial Area, Bhopal Mandideep
Madhya Pradesh, India 462046
Email: privacy@bts2000.com
Phone: +91 755 123 4567

**Last Updated:** January 1, 2024`
    }
  ];

  return (
    <div className={themeClasses.container}>


      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${themeClasses.title}`}>
            Privacy Policy
          </h1>
          <p className={`text-xl ${themeClasses.subtitle} max-w-4xl mx-auto`}>
            Protecting your data and maintaining your trust is our top priority
          </p>
          <div className={`h-1 w-24 mx-auto mt-6 ${isDarkMode ? 'bg-amber-500' : 'bg-amber-500'}`}></div>
        </div>

        {/* Last Updated */}
        <div className={`mb-8 p-4 rounded-md ${isDarkMode ? 'bg-amber-500/10' : 'bg-amber-500/10'} border ${isDarkMode ? 'border-amber-500/30' : 'border-amber-500/30'}`}>
          <div className="flex items-center">
            <svg className={`w-5 h-5 mr-3 ${themeClasses.highlight}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className={themeClasses.text}>
              <strong>Last Updated:</strong> 11th February, 2026
            </span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className={`mb-12 p-6 rounded-lg ${themeClasses.section} border ${themeClasses.border}`}>
          <h3 className={`text-lg font-bold mb-4 ${themeClasses.title}`}>Quick Navigation</h3>
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

        {/* Policy Sections */}
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

        {/* Summary Box */}
        <div className={`mt-12 p-8 rounded-lg ${isDarkMode ? 'bg-slate-900' : 'bg-slate-900'} border ${themeClasses.border}`}>
          <h3 className={`text-xl font-bold mb-4 ${themeClasses.title}`}>Key Points Summary</h3>
          <ul className={`space-y-3 ${themeClasses.text}`}>
            <li className="flex items-start">
              <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${isDarkMode ? 'bg-amber-500' : 'bg-amber-500'}`}></div>
              <span>We only collect necessary data for providing our services</span>
            </li>
            <li className="flex items-start">
              <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${isDarkMode ? 'bg-amber-500' : 'bg-amber-500'}`}></div>
              <span>Your data is protected with enterprise-grade security measures</span>
            </li>
            <li className="flex items-start">
              <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${isDarkMode ? 'bg-amber-500' : 'bg-amber-500'}`}></div>
              <span>We never sell your personal information to third parties</span>
            </li>
            <li className="flex items-start">
              <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${isDarkMode ? 'bg-amber-500' : 'bg-amber-500'}`}></div>
              <span>You have control over your data and can exercise your rights at any time</span>
            </li>
          </ul>
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

              <Link to="/terms" className={`text-sm font-medium ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-white'}`}>
                Terms of Service
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

export default PrivacyPolicy;
