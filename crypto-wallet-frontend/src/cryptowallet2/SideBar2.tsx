import React from 'react';
import { FaChartBar, FaShoppingCart, FaWallet, FaChartLine, FaUsers, FaEnvelope, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar2: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#111827] w-64 h-full flex flex-col justify-between p-6">
      <div>
        <h1 className="text-2xl font-bold mb-8 text-white">Markets</h1>
        <ul className="space-y-4 text-gray-300">
          <li
            className="flex items-center space-x-3 hover:text-green-400 cursor-pointer"
            onClick={() => navigate('/markets')}           // apsolutno
          >
            <FaChartBar />
            <span>Overview</span>
          </li>
          <li
            className="flex items-center space-x-3 hover:text-green-400 cursor-pointer"
            onClick={() => navigate('/markets/wallet')}    // apsolutno
          >
            <FaWallet />
            <span>Wallet</span>
          </li>
          <li
            className="flex items-center space-x-3 hover:text-green-400 cursor-pointer"
            onClick={() => navigate('/markets/trade')}
          >
            <FaShoppingCart />
            <span>Trade</span>
          </li>
          <li
            className="flex items-center space-x-3 hover:text-green-400 cursor-pointer"
            onClick={() => navigate('/markets/analytics')}
          >
            <FaChartLine />
            <span>Analytics</span>
          </li>
          <li
            className="flex items-center space-x-3 hover:text-green-400 cursor-pointer"
            onClick={() => navigate('/markets/community')}
          >
            <FaUsers />
            <span>Community</span>
          </li>
          <li
            className="flex items-center space-x-3 hover:text-green-400 cursor-pointer"
            onClick={() => navigate('/markets/chat-bot')}
          >
            <FaEnvelope />
            <span>Messages</span>
          </li>
        </ul>
      </div>

      <div className="text-gray-300">
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 hover:text-gray-400 cursor-pointer">
            <FaCog /> <span>Settings</span>
          </li>
          <li className="flex items-center space-x-3 hover:text-gray-400 cursor-pointer">
            <FaSignOutAlt /> <span>Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar2;
