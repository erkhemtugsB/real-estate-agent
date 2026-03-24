import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-8 py-12 md:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <Link to="/" className="text-4xl font-normal font-signature mb-2 block">The Curated Estate</Link>
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

          <div className="mt-12 text-[10px] font-bold uppercase tracking-widest text-outline">
            <p>© 2024 The Curated Estate</p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Interior"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        <div className="absolute bottom-12 left-12 text-white">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Featured Listing</p>
          <h2 className="text-3xl font-medium tracking-tight">The Zenith Pavilion, Oslo</h2>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
