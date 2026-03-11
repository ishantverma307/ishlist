import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await fetchNotes();
      }
      setLoading(false);
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        await fetchNotes();
      } else {
        setNotes([]); // Clear UI on logout
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Fetch error:", error.message);
    } else {
      setNotes(data || []);
    }
  };

  const addNote = async (title, content, category) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('notes')
      .insert([{ title, content, category, user_id: user.id }])
      .select();

    if (error) {
      console.error("Save error:", error.message);
    } else if (data) {
      setNotes((prev) => [data[0], ...prev]);
    }
  };

  const deleteNote = async (id) => {
    console.log("Deleting ID:", id);
    if (!id) return;

    const { data, error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      alert("Delete rejected: " + error.message);
    } else if (!data || data.length === 0) {
      alert("Delete failed-ish. Check your RLS policies in Supabase!");
    } else {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, filter, setFilter, loading }}>
      {children}
    </NoteContext.Provider>
  );
};