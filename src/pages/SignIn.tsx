import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <Link to="/" className="text-2xl font-bold tracking-tighter mb-2 block">The Curated Estate</Link>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-outline">Architectural Integrity in Real Estate</p>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-sm border border-outline/5">
          <h1 className="text-3xl font-medium tracking-tight mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant text-sm mb-10">Sign in to manage your portfolio.</p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full px-6 py-4 rounded-xl bg-surface-low border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-outline">Password</label>
                <a href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-xl bg-surface-low border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-outline/20 text-primary focus:ring-primary" />
              <label htmlFor="remember" className="text-sm text-on-surface-variant">Remember me</label>
            </div>

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

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-outline">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-on-surface-variant/10" />
            <div>
              <p className="text-on-surface">Featured Listing</p>
              <p>The Zenith Pavilion, Oslo</p>
            </div>
          </div>
          <p>© 2024 The Curated Estate</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
