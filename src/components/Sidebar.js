import React, { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import { HiOutlineCollection, HiOutlineLightBulb, HiOutlineBriefcase, HiOutlineUser } from 'react-icons/hi'; 

const Sidebar = () => {
  const { filter, setFilter } = useContext(NoteContext);

  const menuItems = [
    { id: 'All', label: 'All Notes', icon: HiOutlineCollection },
    { id: 'Idea-ish', label: 'Idea-ish', icon: HiOutlineLightBulb },
    { id: 'Work-ish', label: 'Work-ish', icon: HiOutlineBriefcase },
    { id: 'Personal-ish', label: 'Personal-ish', icon: HiOutlineUser },
  ];

  return (
    <aside className="w-64 hidden md:flex flex-col p-6 border-r border-sky-100 bg-white/30 backdrop-blur-sm sticky top-16 h-[calc(100vh-64px)]">
      <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        Categories-ish
      </p>
      
      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
              filter === item.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
              : 'text-slate-500 hover:bg-white hover:text-blue-600'
            }`}
          >
            <item.icon className="text-xl" />
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;