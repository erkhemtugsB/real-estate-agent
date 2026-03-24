import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Home, MessageSquare, BarChart3, Settings, Plus, Search, Filter, Edit3, Eye, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROPERTIES } from '../constants';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-outline/10 flex flex-col fixed h-full z-50">
        <div className="p-10 border-b border-outline/5">
          <Link to="/" className="text-3xl font-normal font-signature block">The Curated Estate</Link>
        </div>

        <div className="p-8 border-b border-outline/5 flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" 
            alt="Julian Montgomery"
            className="w-12 h-12 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-bold text-sm">Julian Montgomery</p>
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Senior Associate</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: false },
            { icon: Home, label: 'Listings', active: true },
            { icon: MessageSquare, label: 'Inquiries', active: false },
            { icon: BarChart3, label: 'Analytics', active: false },
            { icon: Settings, label: 'Settings', active: false },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-medium transition-all ${
                item.active ? 'bg-surface-low text-primary shadow-sm' : 'text-outline hover:bg-surface-low hover:text-primary'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-2 group">
            <Plus className="w-5 h-5" />
            New Listing
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-16">
        <header className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-5xl font-medium tracking-tighter mb-4">Property Portfolio</h1>
            <p className="text-on-surface-variant">Curating architectural excellence in the modern landscape.</p>
          </div>
          <button className="bg-white px-6 py-3 rounded-xl border border-outline/10 text-sm font-bold flex items-center gap-3 hover:bg-surface-low transition-all">
            <Calendar className="w-4 h-4" />
            Oct 2023 - Present
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-10 rounded-3xl border border-outline/5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-8 right-8 text-outline/20 group-hover:text-primary/20 transition-colors">
              <Home className="w-10 h-10" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-4">Total Listings</p>
            <div className="text-6xl font-light mb-4">24</div>
            <p className="text-xs text-on-surface-variant flex items-center gap-2">
              <span className="text-primary font-bold">+2</span> from last month
            </p>
          </div>

          <div className="bg-primary text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-8 right-8 text-white/10">
              <MessageSquare className="w-10 h-10" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-4">Active Inquiries</p>
            <div className="text-6xl font-light mb-4 text-white">142</div>
            <p className="text-xs text-white/60">Currently responding</p>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-outline/5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-8 right-8 text-outline/20 group-hover:text-primary/20 transition-colors">
              <TrendingUp className="w-10 h-10" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-4">Recent Sales</p>
            <div className="text-6xl font-light mb-4">$12.4M</div>
            <p className="text-xs text-on-surface-variant">Q3 Total Volume</p>
          </div>
        </div>

        {/* Listings Section */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-medium tracking-tight">Current Listings</h2>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input 
                type="text" 
                placeholder="Search properties..."
                className="pl-12 pr-6 py-3 rounded-xl bg-white border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm w-72"
              />
            </div>
            <button className="bg-surface-container px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-3 hover:bg-surface-highest transition-all">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

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
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                    i === 1 ? 'bg-amber-500/90 text-white' : 'bg-primary/90 text-white'
                  }`}>
                    {i === 1 ? 'Pending' : 'Active'}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-medium mb-1">{property.title}</h3>
                <p className="text-sm text-on-surface-variant">{property.location}</p>
              </div>

              <div className="text-right px-10 border-x border-outline/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Asking Price</p>
                <p className="text-2xl font-medium">{property.price}</p>
              </div>

              <div className="flex gap-3">
                <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-container transition-all flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
                <Link to={`/property/${property.id}`} className="p-3 rounded-xl bg-surface-low border border-outline/10 hover:bg-surface-container transition-all">
                  <Eye className="w-5 h-5 text-outline" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-32 pt-12 border-t border-outline/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-outline">
          <div className="flex gap-10">
            <span className="text-on-surface">The Curated Estate</span>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p>© 2024 The Curated Estate. Architectural Integrity in Real Estate.</p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
