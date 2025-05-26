import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar2 from '../cryptowallet2/SideBar2';
import Wallet from './market-pages/Wallet';
import Overview from './market-pages/Overview';
import Community from './market-pages/Community';
import { Analytics } from './market-pages/Analytics';
import ChatBot from './chatbot/ChatBot';
import TradeApp from './trade2/TradeApp';


const Markets: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar2 />
      <div className="flex-1 p-8">
        <Routes> 
           <Route path="/" element={<Overview />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/community" element={<Community />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/trade" element={<TradeApp />} />
          <Route path='/chat-bot' element={<ChatBot/>}/>
          
        </Routes>
      </div>
    </div>
  );
};

export default Markets;