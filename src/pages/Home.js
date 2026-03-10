import React, { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import NoteCard from '../components/NoteCard';

const Home = () => {
  const context = useContext(NoteContext);
  
  if (!context) return (
    <div className="flex items-center justify-center min-h-[50vh] text-sky-600 font-medium">
      Loading Ishlist...
    </div>
  );

  // 1. Destructure 'filter' from your context
  const { notes, deleteNote, filter } = context;

  // 2. Logic to filter notes based on sidebar selection
  const filteredNotes = filter === 'All' 
    ? notes 
    : notes.filter(note => note.category === filter);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {filter === 'All' ? 'Your Notes' : filter}<span className="text-sky-500">-ish</span>
          </h2>
          <p className="text-slate-500 mt-1">
            {filter === 'All' 
              ? 'Capture your thoughts, perfectly imperfect.' 
              : `Viewing all your ${filter} thoughts.`}
          </p>
        </div>
        
        {/* Note Counter - updated to show filtered count */}
        <div className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full uppercase tracking-widest">
          {filteredNotes.length} {filteredNotes.length === 1 ? 'Note' : 'Notes'}
        </div>
      </div>

      {/* The Responsive Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-24 bg-white/50 border-2 border-dashed border-sky-200 rounded-[2rem]">
          <p className="text-slate-400 font-medium">
            {filter === 'All' 
              ? 'No notes yet. Click the "New Note-ish" button to start!' 
              : `No notes found in ${filter}.`}
          </p>
        </div>
      ) : (
        /* 3. Updated grid for better wide-screen support */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredNotes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDelete={deleteNote} 
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;