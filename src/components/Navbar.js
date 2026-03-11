import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Navbar = ({ onOpenModal }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!supabase) return;

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleAuth = async () => {
    if (!supabase) {
      alert("Database not connected-ish. Check your .env!");
      return;
    }

    if (user) {
      // LOGOUT LOGIC
      const { error } = await supabase.auth.signOut();
      if (error) alert(error.message);
    } else {
      // LOGIN LOGIC (Using Password)
      const email = window.prompt("Enter your email-ish:");
      if (!email) return;

      const password = window.prompt("Enter your password:");
      if (!password) return;

      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert("Login failed: " + error.message);
      }
    }
  };

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
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* User Email Display (Optional but nice-ish) */}
          {user && (
            <span className="hidden md:block text-xs font-medium text-slate-400">
              {user.email}
            </span>
          )}

          {/* Login/Logout Button */}
          {supabase && (
            <button 
              onClick={handleAuth}
              className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors px-2"
            >
              {user ? 'Sign Out' : 'Sign In'}
            </button>
          )}

          <button 
            onClick={onOpenModal}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-95"
          >
            + New Note-ish
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;