import React, { FC } from 'react';

interface UserProfile {
  displayName: string;
  email: string;
  phone: string;
  legalName: string;
  dateOfBirth: string;
  address: string;
}

const mockUser: UserProfile = {
  displayName: 'Marko Spaosojevic',
  email: 'ethereum@hotmail.com',
  phone: 'xxxxxx95',
  legalName: 'Marko Spaosojevic',
  dateOfBirth: 'xx/xx/xx/03',
  address: 'Cacak, Serbia',
};

const tabs = ['General', 'Crypto Addresses', 'Preferences', 'Close account'];

export const Profile: FC = () => {
    const [activeTab, setActiveTab] = React.useState(tabs[0]);
  
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 font-sans text-gray-200">
        <h1 className="text-3xl font-bold mb-8 text-white">Profile</h1>
  
        <nav className="flex gap-6 border-b border-gray-700 pb-3 mb-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-green-400 border-b-2 border-green-400 font-semibold'
                  : 'text-gray-400 hover:text-green-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
  
        {activeTab === 'General' && (
          <section className="space-y-10">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-300">Contact info</h2>
              <div className="space-y-4">
                {/* Display Name */}
                <div className="bg-[#1f2937] rounded-xl px-5 py-4 flex justify-between items-center hover:bg-[#2a3444] transition-colors">
                  <div>
                    <p className="text-sm text-gray-500">Display name</p>
                    <p className="text-white font-medium">{mockUser.displayName}</p>
                  </div>
                  <button className="text-sm text-green-400 border border-green-500 px-4 py-1.5 rounded-md hover:bg-green-500 hover:text-black transition-colors">
                    Edit
                  </button>
                </div>
  
                {/* Email */}
                <div className="bg-[#1f2937] rounded-xl px-5 py-4 flex justify-between items-center hover:bg-[#2a3444] transition-colors">
                  <div>
                    <p className="text-sm text-gray-500">Email address</p>
                    <p className="text-white font-medium">{mockUser.email}</p>
                  </div>
                  <button className="text-sm text-green-400 border border-green-500 px-4 py-1.5 rounded-md hover:bg-green-500 hover:text-black transition-colors">
                    Edit
                  </button>
                </div>
  
                {/* Phone */}
                <div className="bg-[#1f2937] rounded-xl px-5 py-4 flex justify-between items-center hover:bg-[#2a3444] transition-colors">
                  <div>
                    <p className="text-sm text-gray-500">Phone number</p>
                    <p className="text-white font-medium">{mockUser.phone}</p>
                  </div>
                  <button className="text-sm text-green-400 border border-green-500 px-4 py-1.5 rounded-md hover:bg-green-500 hover:text-black transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
  
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-300">Personal info</h2>
              <div className="space-y-4">
                {/* Legal name */}
                <div className="bg-[#1f2937] rounded-xl px-5 py-4 flex justify-between items-center hover:bg-[#2a3444] transition-colors">
                  <div>
                    <p className="text-sm text-gray-500">Legal name</p>
                    <p className="text-white font-medium">{mockUser.legalName}</p>
                  </div>
                  <button className="text-sm text-green-400 border border-green-500 px-4 py-1.5 rounded-md hover:bg-green-500 hover:text-black transition-colors">
                    Edit
                  </button>
                </div>
  
                {/* DOB */}
                <div className="bg-[#1f2937] rounded-xl px-5 py-4 flex justify-between items-center hover:bg-[#2a3444] transition-colors">
                  <div>
                    <p className="text-sm text-gray-500">Date of birth</p>
                    <p className="text-white font-medium">{mockUser.dateOfBirth}</p>
                  </div>
                  <button className="text-sm text-green-400 border border-green-500 px-4 py-1.5 rounded-md hover:bg-green-500 hover:text-black transition-colors">
                    Edit
                  </button>
                </div>
  
                {/* Address */}
                <div className="bg-[#1f2937] rounded-xl px-5 py-4 flex justify-between items-center hover:bg-[#2a3444] transition-colors">
                  <div>
                    <p className="text-sm text-gray-500">Residential address</p>
                    <p className="text-white font-medium">{mockUser.address}</p>
                  </div>
                  <button className="text-sm text-green-400 border border-green-500 px-4 py-1.5 rounded-md hover:bg-green-500 hover:text-black transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
  
        <footer className="mt-12 text-xs text-gray-500 text-center">
          <a href="/privacy" className="hover:text-green-400 transition-colors">
            Privacy Policy
          </a>
        </footer>
      </div>
    );
  };
  