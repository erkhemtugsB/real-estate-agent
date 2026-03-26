import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (signInError) {
      setError(signInError.message);
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <Link to="/" className="text-4xl font-normal font-signature mb-2 block">Solongo Batbold</Link>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-outline">Architectural Integrity in Real Estate</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm border border-outline/5">
            <h1 className="text-3xl font-medium tracking-tight mb-2">Welcome Back</h1>
            <p className="text-on-surface-variant text-sm mb-10">Sign in to manage your portfolio.</p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-surface-low border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-outline">Password</label>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-surface-low border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-2 group">
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-outline/5 text-center">
              <p className="text-sm text-on-surface-variant">
                Interested in joining our collective? <a href="#" className="font-bold text-primary hover:underline">Apply for membership</a>
              </p>
            </div>
          </div>

          <div className="mt-12 text-[10px] font-bold uppercase tracking-widest text-outline">
            <p>© 2026 Solongo Batbold</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
