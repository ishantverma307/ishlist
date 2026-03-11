import React from 'react';

const Navbar = ({ onOpenModal }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
            i
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Ish<span className="text-blue-600">list</span>
          </span>
        </div>
        
        {/* Actions - Only the New Note button remains */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenModal}
            className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-95"
          >
            + New Note-ish
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;