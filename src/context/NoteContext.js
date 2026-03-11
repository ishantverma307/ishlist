import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // 1. Listen for Auth changes and fetch notes accordingly
  useEffect(() => {
    const checkUserAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await fetchNotes();
      } else {
        setNotes([]); // Clear notes if logged out
      }
      setLoading(false);
    };

    checkUserAndFetch();

    // Listen for sign-in/sign-out to refresh the notes list
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) fetchNotes();
      else setNotes([]);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching-ish:", error.message);
    } else {
      setNotes(data || []);
    }
  };

  // 2. Add Note (Improved with data check)
  const addNote = async (title, content, category) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Please sign in to save notes-ish!");
      return;
    }

    const { data, error } = await supabase
      .from('notes')
      .insert([
        { 
          title, 
          content, 
          category, 
          user_id: user.id 
        }
      ])
      .select();

    if (error) {
      alert("Error saving-ish: " + error.message);
    } else if (data) {
      setNotes((prev) => [data[0], ...prev]);
    }
  };

  // 3. Delete Note
  const deleteNote = async (id) => {
    if (!id) return; // Prevent 'undefined' calls

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Error deleting-ish: " + error.message);
    } else {
      setNotes((prev) => prev.filter(note => note.id !== id));
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, filter, setFilter, loading }}>
      {children}
    </NoteContext.Provider>
  );
};