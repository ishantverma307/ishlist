import React, { useState, useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const AddNoteModal = ({ isOpen, onClose }) => {
  const { addNote } = useContext(NoteContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Idea-ish');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    addNote(title, content, category);
    setTitle('');
    setContent('');
    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Card */}
      <form onSubmit={handleSubmit} className="relative bg-white w-full max-w-lg rounded-[2rem] p-8 shadow-2xl border border-sky-100 animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Create New Note-ish</h2>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Title-ish" 
            className="w-full px-4 py-3 rounded-xl bg-sky-50 border-none focus:ring-2 focus:ring-blue-400 outline-none font-semibold text-slate-700 placeholder:text-slate-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          <select 
            className="w-full px-4 py-3 rounded-xl bg-sky-50 border-none focus:ring-2 focus:ring-blue-400 outline-none text-slate-600 font-medium"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Idea-ish">Idea-ish</option>
            <option value="Work-ish">Work-ish</option>
            <option value="Personal-ish">Personal-ish</option>
          </select>

          <textarea 
            placeholder="What's on your mind?" 
            rows="5"
            className="w-full px-4 py-3 rounded-xl bg-sky-50 border-none focus:ring-2 focus:ring-blue-400 outline-none text-slate-600 placeholder:text-slate-400 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="mt-8 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNoteModal;