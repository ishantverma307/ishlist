import React from 'react';

const NoteCard = ({ note, onDelete }) => {
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
    
    window.alert("Button clicked for ID: " + note.id);

    if (!note.id) {
      console.error("No ID found on this note object:", note);
      return;
    }
    
    onDelete(note.id);
  };

  return (
    <div className="group relative bg-white border border-sky-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between h-full">
      
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-sky-300 group-hover:scale-150 transition-transform duration-300" />

      <div>
        <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest uppercase bg-sky-50 text-sky-600 rounded-full border border-sky-100">
          {note.category || "Task-ish"}
        </span>

        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">
          {note.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
          {note.content}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-sky-50 flex items-center justify-between">
        <span className="text-[11px] font-medium text-slate-400">
          Added {formatDate(note.created_at)}
        </span>
        
        <button 
          onClick={handleDelete}
          className="text-slate-300 hover:text-red-500 hover:scale-110 active:scale-90 transition-all text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
