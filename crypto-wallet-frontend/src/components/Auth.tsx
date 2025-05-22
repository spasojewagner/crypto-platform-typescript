/* src/pages/Auth.tsx */
import React, { useState, FC, useEffect } from 'react';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/images/pozadina.png'
const Auth: FC = () => {
  const [isRegister, setRegister] = useState(false);
  const { authUser, checkAuth } = useAuthStore();
  const navigate = useNavigate();



  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  return (
    <div className='flex min-h-screen mb:flex-col '>
      <div className='w-1/2 relative hidden md:flex items-center justify-center bg-cover'>
         <img className='w-full h-full object-cover' src={img1} alt='pozadina' /> 
        <div className='absolute inset-0 bg-opacity-80'>
          <blockquote className='absolute bottom-5 px-5 text-2xl italic text-white bg-[#3938389b] py-2 rounded-2xl'>
          Bitcoin is more than money – it's a movement against the centralization of power.
            <br />
            <span className='block mt-4 text-yellow-400'>- Founder of Raven</span>
          </blockquote>
        </div>
      </div>

      <div className='w-full md:w-1/2 min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] p-10'>
        <div className='flex flex-col items-center'>
          {/* <img src='' alt='logo' className='h-25 border-2 rounded-full p-1' /> */}
        </div>
        <h2 className='text-4xl text-center mt-10 font-semibold text-yellow-400 mb-10'>
          {isRegister ? 'Registration' : 'Login'}
        </h2>
        {isRegister ? <Register setRegister={setRegister} /> : <Login />}
        <div className='flex justify-center mt-6 gap-1'>
          <p className='text-sm text-gray-200'>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <button
            onClick={() => setRegister(!isRegister)}
            className='text-yellow-400 font-semibold hover:underline'
          >
            {isRegister ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Auth;