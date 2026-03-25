import React from 'react';
import { motion } from 'motion/react';
import { Plus, Eye, TrendingUp, Home, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROPERTIES } from '../constants';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* Main Content */}
      <main className="p-10 md:p-16">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <Link to="/" className="text-3xl font-normal font-signature">Solongo Batbold</Link>
          <Link to="/new-listing" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-container transition-all inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Listing
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-10 rounded-3xl border border-outline/5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-8 right-8 text-outline/20 group-hover:text-primary/20 transition-colors">
              <Home className="w-10 h-10" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-4">Total Listings</p>
            <div className="text-6xl font-light mb-4">24</div>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-outline/5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-8 right-8 text-outline/20 group-hover:text-primary/20 transition-colors">
              <TrendingUp className="w-10 h-10" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-4">Recent Sales</p>
            <div className="text-6xl font-light mb-4">$12.4M</div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="space-y-6">
          {PROPERTIES.map((property, i) => (
            <motion.div 
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-outline/5 shadow-sm hover:shadow-md transition-all flex items-center gap-10 group"
            >
              <div className="w-64 aspect-[16/10] rounded-2xl overflow-hidden relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-medium mb-1">{property.title}</h3>
                <p className="text-sm text-on-surface-variant">1,400 sq ft</p>
              </div>

              <div className="text-right px-10 border-x border-outline/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Asking Price</p>
                <p className="text-2xl font-medium">{property.price}</p>
              </div>

              <div className="flex gap-3">
                <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold border border-red-200 hover:bg-red-50 transition-all flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <Link to={`/property/${property.id}`} className="p-3 rounded-xl bg-surface-low border border-outline/10 hover:bg-surface-container transition-all">
                  <Eye className="w-5 h-5 text-outline" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-32 pt-12 border-t border-outline/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-outline">
          <span className="text-on-surface">Solongo Batbold</span>
          <p>© 2026 Solongo Batbold. Architectural Integrity in Real Estate.</p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
