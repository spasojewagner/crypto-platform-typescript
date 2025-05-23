import React from 'react';
import { Shield, Users, Zap, Globe, Lock, TrendingUp, AlertTriangle, FileText } from 'lucide-react';

const TeamsAndServices = () => {
  const services = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Digital Asset Trading",
      description: "Comprehensive platform for trading digital assets with real-time market data and advanced trading tools."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security & Compliance",
      description: "Bank-grade security measures with KYC/AML compliance and multi-layer protection systems."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Professional Support",
      description: "Dedicated team of experts providing 24/7 customer support and technical assistance."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Access",
      description: "Worldwide accessibility with localized support for different jurisdictions and regulations."
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "High-Speed Trading",
      description: "Lightning-fast execution with minimal latency"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure Wallet",
      description: "Multi-signature cold storage protection"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Real-time charts and market analysis tools"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Risk Management",
      description: "Comprehensive risk assessment and monitoring"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Raven Teams & Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional digital asset trading platform providing secure, reliable, and innovative financial services worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
              <button className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Core Services</h2>
          <p className="text-xl text-gray-300">Comprehensive solutions for digital asset management and trading</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-2xl"
            >
              <div className="text-green-400 mb-6 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">{service.title}</h3>
              <p className="text-gray-300 text-center leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-gray-300">Advanced tools and capabilities for professional traders</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-green-400/50 transition-all duration-300"
              >
                <div className="text-green-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Agreement Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Service Agreement Overview</h2>
            <p className="text-xl text-gray-300">Understanding our platform terms and user responsibilities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-green-400">Platform Services</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Digital Asset Trading</h4>
                  <p className="text-gray-300 text-sm">Secure platform for digital asset transactions with real-time market access and professional trading tools.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Account Management</h4>
                  <p className="text-gray-300 text-sm">Comprehensive account services including portfolio tracking, transaction history, and security settings.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-blue-400">Security & Compliance</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">KYC/AML Policies</h4>
                  <p className="text-gray-300 text-sm">Strict Know Your Customer and Anti-Money Laundering compliance to ensure platform security and regulatory adherence.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Risk Management</h4>
                  <p className="text-gray-300 text-sm">Advanced risk assessment and monitoring systems to protect users and maintain market integrity.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-purple-400">User Responsibilities</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Account Security</h4>
                  <p className="text-gray-300 text-sm">Users must maintain account security, use strong passwords, and protect login credentials from unauthorized access.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Regulatory Compliance</h4>
                  <p className="text-gray-300 text-sm">Users must comply with applicable laws and regulations in their jurisdiction regarding digital asset trading.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-yellow-900/30 to-red-900/30 rounded-xl border border-yellow-500/30">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Important Risk Notice</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Digital asset trading carries extremely high risks and is not suitable for most people. Prices can fluctuate significantly, 
                  and you may lose some or all of your investment. Only trade with funds you can afford to lose. Please read our full 
                  service agreement and risk disclosures before using the platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who trust Raven for their digital asset trading needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Create Account
            </button>
            <button className="border-2 border-white/30 hover:border-white/50 hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsAndServices;