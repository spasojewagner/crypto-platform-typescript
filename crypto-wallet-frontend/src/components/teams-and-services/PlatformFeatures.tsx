import React from 'react';
import { 
  Zap, 
  Lock, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Clock, 
  Globe, 
  BarChart3, 
  Smartphone, 
  Headphones, 
  Database,
  Eye,
  Settings,
  CreditCard,
  Users
} from 'lucide-react';

const PlatformFeatures = () => {
  const mainFeatures = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "High-Speed Trading",
      description: "Lightning-fast execution with minimal latency for optimal trading performance",
      details: ["Sub-millisecond execution", "Advanced order matching", "Real-time price feeds"]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Secure Wallet",
      description: "Multi-signature cold storage protection with bank-grade security",
      details: ["Cold storage protection", "Multi-signature technology", "Insurance coverage"]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Real-time charts and comprehensive market analysis tools",
      details: ["Technical indicators", "Custom chart types", "Market depth analysis"]
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Risk Management",
      description: "Comprehensive risk assessment and monitoring systems",
      details: ["Portfolio monitoring", "Risk alerts", "Stop-loss automation"]
    }
  ];

  const additionalFeatures = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Market Analysis",
      description: "Advanced market trend analysis and predictions"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "KYC/AML Compliance",
      description: "Full regulatory compliance and verification"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Trading",
      description: "Round-the-clock trading capabilities"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Access",
      description: "Worldwide platform accessibility"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Portfolio Tracking",
      description: "Comprehensive portfolio management tools"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Trading",
      description: "Full-featured mobile application"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Professional customer support team"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Export",
      description: "Export trading data and reports"
    }
  ];

  const tradingTools = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Market Surveillance",
      description: "Real-time market monitoring and alerts",
      color: "text-blue-400"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Custom Orders",
      description: "Advanced order types and automation",
      color: "text-purple-400"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payment Gateway",
      description: "Multiple payment methods support",
      color: "text-green-400"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social Trading",
      description: "Copy trading and social features",
      color: "text-yellow-400"
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
              Platform Features
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover the advanced tools and capabilities that make Raven the preferred choice for professional traders
            </p>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Core Features</h2>
          <p className="text-xl text-gray-300">Essential tools for professional digital asset trading</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-2xl"
            >
              <div className="text-green-400 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="bg-black/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Additional Capabilities</h2>
            <p className="text-xl text-gray-300">Comprehensive suite of trading and management tools</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-green-400/50 transition-all duration-300 group"
              >
                <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trading Tools Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Professional Trading Tools</h2>
          <p className="text-xl text-gray-300">Advanced features for experienced traders</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tradingTools.map((tool, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 text-center group"
            >
              <div className={`${tool.color} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{tool.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      {/* <div className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Raven?</h2>
            <p className="text-xl text-gray-300">Industry-leading features that set us apart</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Performance</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  99.9% uptime guarantee
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Sub-millisecond latency
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Scalable infrastructure
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Security</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Military-grade encryption
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Cold storage protection
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Regular security audits
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Support</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  24/7 customer support
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Dedicated account managers
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Multi-language support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold mb-4">Experience the Power of Raven</h2>
        <p className="text-xl text-gray-300 mb-8">
          Start trading with professional-grade tools and features today
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Start Trading Now
          </button>
          <button className="border-2 border-white/30 hover:border-white/50 hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlatformFeatures;