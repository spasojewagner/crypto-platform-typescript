import React from 'react';
// import Logo from '../assets/logo.svg'; // Update the path as needed

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding & Contact */}
        <div>
          <div className="flex items-center mb-4">
            {/* <img src={Logo} alt="Logo" className="h-8 w-auto" /> */}
            <span className="ml-2 text-xl font-semibold text-yellow-500">LWEX</span>
          </div>
          <p className="text-sm">© {currentYear} LWEX Exchange. All rights reserved.</p>
          <a href="mailto:support-lwex@proton.me" className="mt-2 block text-sm text-blue-400 hover:underline">
            support-lwex@proton.me
          </a>
          <select className="mt-4 bg-gray-800 text-gray-300 px-3 py-1 rounded">
            <option>English</option>
            <option>Русский</option>
            <option>中文</option>
            {/* Add more languages here */}
          </select>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">About Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Announcement Center</a></li>
            <li><a href="#" className="hover:underline">Online Customer Service</a></li>
          </ul>
        </div>

        {/* Products & Services */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Products & Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Perpetual</a></li>
            <li><a href="#" className="hover:underline">Futures</a></li>
            <li><a href="#" className="hover:underline">Exchange</a></li>
            <li><a href="#" className="hover:underline">Market</a></li>
            <li><a href="#" className="hover:underline">Financial Management</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Service Agreement</a></li>
            <li><a href="#" className="hover:underline">Privacy Statement</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;