import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

const AnnouncementCenter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Announcement Center</h1>
          {/* <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span>BACK</span>
          </button> */}
        </div>

        {/* Main Content Card */}
        <div className="bg-slate-800 bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          {/* Announcement Item */}
          <div className="flex items-center justify-between p-6 bg-slate-700 bg-opacity-50 rounded-xl hover:bg-opacity-70 transition-all cursor-pointer group">
            <div className="flex-1">
              <h2 className="text-lg font-medium text-white mb-2 group-hover:text-blue-300 transition-colors">
                Raven demonstrates commitment to legal and transparent operations through MSB registration
              </h2>
              <p className="text-gray-400 text-sm">
                1/1/2024, 5:00:00 PM
              </p>
            </div>
            <ChevronRight className="text-gray-400 group-hover:text-white transition-colors" size={20} />
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 bg-yellow-500 text-black font-medium rounded-md flex items-center justify-center">
                1
              </button>
            </div>
            
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCenter;