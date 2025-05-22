import { FaUserCircle, FaWallet, FaHome } from "react-icons/fa";
import { IoLogOut, IoBarChart } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import logo from '../assets/images/logo2.png';

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthStore } from '../store/useAuthStore';

export default function NavBar() {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Klasa za zajednički stil dugmadi
  const buttonStyle = "flex items-center gap-2 px-4 py-2 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-white/10 active:scale-95";

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-7 py-3 bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg flex justify-between">
      <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="w-[60px] h-[60px]" />
        <h1 className="text-2xl font-bold text-white">RAVEN</h1>
      </div>

      <div className="flex gap-4">
        <div className={buttonStyle} onClick={() => navigate("/")}>
          <FaHome className='text-white text-xl' />
          <span className="text-white">Home</span>
        </div>

        <div className={buttonStyle} onClick={() => navigate("/markets")}>
          <IoBarChart className='text-white text-xl' />
          <span className="text-white">Markets</span>
        </div>

        {authUser ? (
          <>
         

            <div className={buttonStyle} onClick={() => navigate("/profile")}>
              <FaUserCircle className='text-white text-xl' />
              <span className="text-white">Profile</span>
            </div>

            <div className={buttonStyle} onClick={() => navigate("/markets/wallet")}>
              <FaWallet className='text-white text-xl' />
              <span className="text-white">Wallet</span>
            </div>

            <div className={buttonStyle} onClick={handleLogout}>
              <IoLogOut className='text-white text-xl' />
              <span className="text-white">LogOut</span>
            </div>
          </>
        ) : (
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-2xl cursor-pointer bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] transition-all hover:scale-105 hover:shadow-md"
            onClick={() => navigate("/auth")}
          >
            <FaUserCircle className="text-white text-xl" />
            <span className="text-white">Login / Register</span>
          </div>

        )}
      </div>
    </header>
  );
}
