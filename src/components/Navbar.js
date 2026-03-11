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
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) alert(signOutError.message);
    } else {
      // LOGIN / SIGNUP LOGIC
      const email = window.prompt("Enter your email-ish:");
      if (!email) return;

      const password = window.prompt("Enter your password (6+ chars):");
      if (!password) return;

      // 1. Try to Login (We only grab 'error' here to avoid the 'data' underline)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      // 2. If login fails, check if we should Sign Up instead
      if (signInError) {
        if (signInError.message.includes("Invalid login credentials") || 
            signInError.message.includes("Email not confirmed")) {
          
          const shouldSignUp = window.confirm("Account not found. Create a new account-ish?");
          
          if (shouldSignUp) {
            const { error: signUpError } = await supabase.auth.signUp({
              email: email,
              password: password,
            });

            if (signUpError) {
              alert("Signup failed: " + signUpError.message);
            } else {
              alert("Signup successful! Welcome to Ishlist.");
            }
          }
        } else {
          alert("Login failed: " + signInError.message);
        }
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
          {user && (
            <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {user.email.split('@')[0]}
            </span>
          )}

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