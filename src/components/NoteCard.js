import React from 'react';

const NoteCard = ({ note, onDelete }) => {
  // Supabase provides a 'created_at' string.
  const formatDate = (dateString) => {
    if (!dateString) return "Just now-ish";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleDelete = () => {
    // Safety Log: This helps you debug on Netlify if the ID is missing
    if (!note.id) {
      console.error("Ishlist Error: This note has no ID and cannot be deleted-ish.", note);
      alert("This note is missing an ID. Try refreshing the page!");
      return;
    }
    onDelete(note.id);
  };

  return (
    <div className="group relative bg-white border border-sky-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between h-full">
      
      {/* Decorative Light Blue-ish accent */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-sky-300 group-hover:scale-150 transition-transform duration-300" />

      <div>
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest uppercase bg-sky-50 text-sky-600 rounded-full border border-sky-100">
          {note.category || "Task-ish"}
        </span>

        {/* Note Content */}
        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">
          {note.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
          {note.content}
        </p>
      </div>

      {/* Footer Area */}
      <div className="mt-6 pt-4 border-t border-sky-50 flex items-center justify-between">
        <span className="text-[11px] font-medium text-slate-400">
          Added {formatDate(note.created_at)}
        </span>
        
        {/* Updated Delete Button */}
        <button 
          onClick={handleDelete}
          className="text-slate-300 hover:text-red-400 text-xs font-semibold uppercase tracking-tighter transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default NoteCard;