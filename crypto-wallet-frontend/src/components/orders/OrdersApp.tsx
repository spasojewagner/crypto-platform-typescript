import React, { useState } from 'react';

// Define the type for a tab
interface Tab {
  key: string;
  label: string;
}

const tabs: Tab[] = [
  { key: 'current', label: 'Current order' },
  { key: 'history', label: 'Historical orders' },
  { key: 'invited', label: 'Invited me' },
  { key: 'copy', label: 'Copy trading' },
];

const OrdersApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('invited');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [codeInput, setCodeInput] = useState<string>('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    console.log('Confirm code:', codeInput);
    // TODO: add confirm logic here
    closeModal();
  };

  return (
    <>
      <div className="w-full bg-gray-700 mt-5 py-6 px-8 rounded-2xl">
        {/* Tab navigation */}
        <div className="flex space-x-8 mb-4">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={
                `pb-2 border-b-2 transition-colors duration-150 text-base font-medium ` +
                (activeTab === tab.key
                  ? 'border-green-400 text-white'
                  : 'border-transparent text-gray-300 hover:text-gray-200 hover:border-gray-600')
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content for "Invited me" tab */}
        {activeTab === 'invited' && (
          <div className="flex flex-col items-start space-y-4">
            <button
              onClick={openModal}
              className="   px-4 py-2
     bg-indigo-700 hover:bg-indigo-600
     text-indigo-100
     font-semibold
     rounded-lg
     shadow-md
     transition-colors duration-150
     text-lg
     cursor-pointer
   "
            >
              Initiate a follow-up order
            </button>
            <button className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-gray-200 font-semibold rounded-lg transition-colors duration-150 text-base">
              Copying history
            </button>
            <div className="mt-4 text-gray-300 text-base">No data</div>
          </div>
        )}

        {/* Add other tab contents similarly based on activeTab */}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
          <div className="bg-gray-800 rounded-xl w-11/12 max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">Enter Code</h2>
            <input
              type="text"
              value={codeInput}
              onChange={e => setCodeInput(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:border-green-400"
              placeholder="Enter code here"
            />
            <div className="flex justify-end">
              <button
                onClick={handleConfirm}
                className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors duration-150"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersApp;
