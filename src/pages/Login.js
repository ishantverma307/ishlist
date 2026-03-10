import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the magic link-ish!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl w-full max-w-md border border-sky-100">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Ishlist Login</h1>
        <p className="text-slate-500 mb-8">Sign in to keep your notes synced across devices.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Enter your email..." 
            className="w-full px-5 py-4 rounded-2xl bg-sky-50 outline-none focus:ring-2 focus:ring-blue-400 text-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button 
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm font-medium text-blue-600">{message}</p>}
      </div>
    </div>
  );
};

export default Login;