import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft, Shield, Eye, Users, Globe, Lock, FileText, AlertCircle, Scale, Settings } from 'lucide-react';

const PrivacyNotice = () => {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

  const toggleSection = (index: number) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const privacySections = [
    {
      title: "What personal information of users is collected?",
      icon: <Users className="w-5 h-5" />,
      content: `Personal information is collected to provide products and services and to continuously improve them.

The following are the types of personal information we collect:

Information provided to us: We receive and store any information provided in connection with this platform. You can choose not to provide certain information, however, you may not be able to use certain platform services as a result. Examples include:
• Name
• Address  
• Country of Citizenship
• ID photo
• Phone number
• Other information that helps us verify your identity

Automatically collected information: We automatically collect and store certain information about platform service usage. Like many websites, we use cookies and other unique identifiers. Examples include:
• The Internet Protocol (IP) address
• Login information, email address, password and location
• Device version and time zone
• Transaction history

Information from Other Sources: We may collect relevant information from other sources (such as credit history records from credit bureaus) to prevent and detect fraud.`
    },
    {
      title: "Can children use it?",
      icon: <Shield className="w-5 h-5" />,
      content: `This platform does not allow any individual under the age of 18 to use the "Service".

We are committed to protecting children's privacy and comply with applicable laws regarding minors. If we discover that we have collected personal information from someone under 18, we will take steps to delete such information promptly.`
    },
    {
      title: "What are cookies and other identifiers used for?",
      icon: <Eye className="w-5 h-5" />,
      content: `We use cookies to optimize user experience, provide our services and understand how customers use our services in order to make targeted improvements. We use cookies to ensure that our system can recognize your browser and provide you with services.

We use operational cookies and similar tools (collectively, "Cookies") to provide services, such as:
• To identify you when you sign in and use our services
• Provide customized features and services  
• Protect against fraudulent activity
• Improve security
• Tracking features (such as currency and language)

We also use cookies to understand how users use our services so that we can make targeted improvements.`
    },
    {
      title: "Will my personal information be shared?",
      icon: <Globe className="w-5 h-5" />,
      content: `User information is an important part of our business. We will not sell users' personal information to others. This platform will only share users' personal information with its subsidiaries and affiliated parties in the following circumstances:

Third-Party Service Providers: We employ other companies and individuals to perform functions on our behalf, such as analyzing data, providing assistance, processing payments, transmitting content, and assessing credit risk. These providers may access personal information to perform their functions but may not use it for any other purpose.

Business Transfers: As our business continues to grow, we may launch or purchase other businesses or services. In such transactions, user information is usually a transferred business asset, but is still subject to existing privacy commitments.

Protection of yourself and others: When we believe that releasing user information is necessary to comply with the law, enforce our terms of use, or protect the rights and property of users or others. This includes exchanging information with other companies to protect against fraud and reduce credit risk.`
    },
    {
      title: "International transfer of personal data",
      icon: <Globe className="w-5 h-5" />,
      content: `This site may transfer data to areas outside the European Economic Area ("EEA"). The company will take appropriate safeguards to ensure that such transfer complies with current data protection laws, unless the European Commission confirms that the country or region receiving the transferred data can provide an adequate level of protection.

We ensure that appropriate safeguards are in place when transferring personal data internationally, including:
• Standard contractual clauses approved by the European Commission
• Adequacy decisions by the European Commission
• Other legally recognized transfer mechanisms`
    },
    {
      title: "Is my personal information safe?",
      icon: <Lock className="w-5 h-5" />,
      content: `We design our systems with user security and privacy in mind. We use encryption protocols and software to protect the security of personal information during transmission. In terms of collecting, storing and accessing personal information, we always adopt physical protection, electronic safeguards and procedural protection systems.

Our security procedures mean that we may need to verify identity before disclosing personal information. The most important thing for you is to protect your personal account password from unauthorized access. We recommend:
• Setting a unique password different from other online accounts
• Always logging out after using a public computer
• Enabling two-factor authentication when available
• Regularly reviewing your account activity`
    },
    {
      title: "How should I protect my personal information?",
      icon: <Settings className="w-5 h-5" />,
      content: `If you have any questions or objections about our collection and handling of personal information, please contact customer service. You can withdraw your consent at any time after we process personal information for a specific purpose, and we will stop processing for that purpose.

Subject to applicable laws, you also have the right to:
• Request access to your personal data
• Request correction of inaccurate data
• Request deletion of your personal data
• Request data portability
• Object to our processing of your personal data
• Request restrictions on processing in certain circumstances

To exercise these rights, please contact our customer service team with detailed instructions.`
    },
    {
      title: "EU GDPR and UK Data Protection Law – Legal Basis",
      icon: <Scale className="w-5 h-5" />,
      content: `EU GDPR and UK data protection law require us to have a legal basis when using personal information. Our systems depend on the specific purposes for which personal information is used. These bases include:

Performance of the contract: Providing products or services to you and communicating about them, including processing orders and payments.

Legitimate interests: We detect and prevent fraud and abuse, and provide protection for the safety of our users. We balance our legitimate interests with your rights, and we do not process your personal information where our interests are overridden.

Your Consent: We require user consent to process personal information for specific purposes communicated to you. You can withdraw consent at any time.

Compliance with legal obligations: We use your personal information as required by law, such as collecting information for identity verification purposes.`
    },
    {
      title: "Conditions of Use, Notices and Revisions",
      icon: <FileText className="w-5 h-5" />,
      content: `Use of this site and any dispute over privacy is subject to this Statement and our Terms of Use. If you have any concerns about the privacy of this platform, please contact us with detailed instructions, and we will resolve the issue as soon as possible. You also have the right to contact your local data protection authority.

Our business is constantly changing, and so will our privacy statement. You should visit our website frequently to learn about the latest changes. If you do not agree with the revised content, you should stop accessing immediately.

After the updated version of the Privacy Policy is released, continuing to access means that you agree with the updated content and agree to abide by the updated privacy policy. Unless otherwise stated, the current Privacy Statement applies to all information we have about you and your account.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        {/* <div className="flex items-center mb-8">
          <button className="flex items-center text-gray-300 hover:text-white transition-colors mr-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK
          </button>
        </div> */}

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            {/* Title */}
            <div className="px-6 py-8 border-b border-gray-700/50">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 p-3 rounded-full mr-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Privacy Notice</h1>
                  <p className="text-gray-300 text-lg">Last updated: May 2025</p>
                </div>
              </div>
              <div className="bg-blue-900/30 border border-blue-700/30 rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-blue-200 text-sm leading-relaxed">
                  This Privacy Notice explains how we collect, use, and protect your personal information when you use our platform. 
                  Please read this notice carefully to understand our privacy practices.
                </p>
              </div>
            </div>

            {/* Privacy Sections */}
            <div className="divide-y divide-gray-700/30">
              {privacySections.map((section, index) => (
                <div key={index} className="group">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold mr-4 group-hover:bg-green-600 transition-colors">
                        {index + 1}
                      </div>
                      <div className="flex items-center">
                        <div className="text-green-400 mr-3 group-hover:text-green-300 transition-colors">
                          {section.icon}
                        </div>
                        <span className="text-white font-semibold text-lg pr-4">
                          {section.title}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-400 group-hover:text-green-400 transition-colors">
                      {openSections[index] ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </div>
                  </button>
                  
                  {/* Content */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openSections[index] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 ml-14">
                      <div className="bg-gray-800/40 rounded-xl p-6 border-l-4 border-green-500">
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
{/* 
          Contact Information
          <div className="mt-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                If you have any questions, concerns, or requests regarding this Privacy Notice or our data practices, 
                please don't hesitate to contact us. We're here to help and ensure your privacy is protected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Contact Privacy Team
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Download Privacy Policy
                </button>
              </div>
            </div>
          </div> */}

          {/* Last Updated Notice */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              This Privacy Notice was last updated on May 2025. We may update this notice from time to time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;