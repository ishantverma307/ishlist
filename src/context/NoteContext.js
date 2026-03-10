import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('All');

  // 1. Fetch notes from Supabase when the app starts
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error("Error fetching:", error);
    else setNotes(data);
  };

  // 2. Save a new note to Supabase
  const addNote = async (title, content, category) => {
  // 1. Get the current logged-in user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert("Please sign in to save notes-ish!");
    return;
  }

  // 2. Include the user_id in the insert
  const { data, error } = await supabase
    .from('notes')
    .insert([
      { 
        title, 
        content, 
        category, 
        user_id: user.id // This links the note to your account
      }
    ])
    .select();

  if (error) {
    alert("Error saving-ish: " + error.message);
  } else {
    setNotes([data[0], ...notes]);
  }
};
  // 3. Delete from Supabase
  const deleteNote = async (id) => {
  // 1. Tell Supabase to delete the note with this specific ID
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    alert("Error deleting-ish: " + error.message);
  } else {
    // 2. If successful, remove it from the local state so the UI updates
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
  }
};
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, filter, setFilter }}>
      {children}
    </NoteContext.Provider>
  );
};