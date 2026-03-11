import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // 1. Fetch notes immediately on load (No Auth checks)
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Fetch error-ish:", error.message);
    } else {
      setNotes(data || []);
    }
    setLoading(false);
  };

  // 2. Add Note (Renamed 'data' to 'insertedData' to stop underlines)
  const addNote = async (title, content, category) => {
    const { data: insertedData, error } = await supabase
      .from('notes')
      .insert([{ title, content, category }])
      .select();

    if (error) {
      console.error("Save error-ish:", error.message);
      alert("Failed to save: " + error.message);
    } else if (insertedData && insertedData.length > 0) {
      setNotes((prev) => [insertedData[0], ...prev]);
    }
  };

  // 3. Delete Note (Removed unused variables to stop underlines)
  const deleteNote = async (id) => {
    if (!id) return;

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Delete error-ish:", error.message);
      alert("Delete failed: " + error.message);
    } else {
      // If no error, we assume it worked and update UI
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, filter, setFilter, loading }}>
      {children}
    </NoteContext.Provider>
  );
};