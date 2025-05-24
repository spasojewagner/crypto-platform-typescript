import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Logo from '../assets/logo.svg'; // Update the path as needed

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navigate= useNavigate()



  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding & Contact */}
        <div>
          <div className="flex items-center mb-4">
            {/* <img src={Logo} alt="Logo" className="h-8 w-auto" /> */}
            <span className="ml-2 text-xl font-semibold text-yellow-500">RAVEN</span>
          </div>
          <p className="text-sm">© {currentYear} Raven. All rights reserved.</p>
          <a href="mailto:support-lwex@proton.me" className="mt-2 block text-sm text-blue-400 hover:underline">
            raven-support@gmail.com
          </a>
          {/* <select className="mt-4 bg-gray-800 text-gray-300 px-3 py-1 rounded">
            <option>English</option>
            <option>Русский</option>
            <option>中文</option>
            {/* Add more languages here */}
          {/* </select> */} 
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">About Us</h3>
          <ul className="space-y-2 text-sm"> 
            <li onClick={()=>navigate( "/announcement")}><a href="#" className="hover:underline">Announcement Center</a></li>
            <li onClick={()=>navigate("/teams-services")}><a href="#" className="hover:underline">Teams and Services</a></li>
          </ul>
        </div>

        {/* Products & Services */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Products & Services</h3>
          <ul className="space-y-2 text-sm">
            <li onClick={()=>navigate("/markets")}><a href="#" className="hover:underline">Markets</a></li>
            <li onClick={()=>navigate("/markets/wallet")}><a href="#" className="hover:underline">Wallet</a></li>
            <li onClick={()=>navigate("/markets/trade")}><a href="#" className="hover:underline">Trade</a></li>
            <li onClick={()=>navigate("/markets//analytics")}><a href="#" className="hover:underline">Analytics</a></li>
            <li onClick={()=>navigate("/markets/community")}><a href="#" className="hover:underline">Community</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li onClick={()=>navigate("/help-center")}><a href="#" className="hover:underline">Help Center</a></li>
            <li onClick={()=>navigate("/agreement")}><a href="#" className="hover:underline">Service Agreement</a></li>
            <li onClick={()=>navigate("/pravicy-notice")}><a href="#" className="hover:underline">Privacy Notice</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;