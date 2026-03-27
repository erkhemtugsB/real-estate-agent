/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BedDouble, Bath, Square } from 'lucide-react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Estate } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { supabase } from './lib/supabase';
import { formatMNTCompact } from './lib/format';
import { PUBLIC_AGENT_ID } from './lib/config';

// Pages
import SignIn from './pages/SignIn';
import PropertyDetail from './pages/PropertyDetail';
import Dashboard from './pages/Dashboard';
import NewListing from './pages/NewListing';
import ProtectedRoute from './components/ProtectedRoute';

const Hero = () => (
  <section className="relative pt-0 pb-0 overflow-hidden bg-[#f5f5f2] min-h-[80vh] flex items-center">
    <div className="max-w-7xl mx-auto px-6 relative">
      <div className="hidden lg:flex absolute left-0 top-28 flex-col items-center gap-20 text-[10px] uppercase tracking-[0.45em] text-outline/70">
        <span className="rotate-180 [writing-mode:vertical-rl]">Real estate agent</span>
        <div className="h-24 w-px bg-outline/20" />
        <span className="rotate-180 [writing-mode:vertical-rl]">2026</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 z-10 order-2 lg:order-1 relative lg:pl-16"
        >
          <div className="hidden lg:block absolute left-0 top-6 bottom-6 w-px bg-outline/20" />

          <div className="flex gap-12 text-sm text-on-surface-variant mb-12">
            <div>
              <div className="text-4xl text-on-surface font-light">+200</div>
              <div className="text-[11px] uppercase tracking-[0.2em]">Projects completed</div>
            </div>
            <div>
              <div className="text-4xl text-on-surface font-light">+50</div>
              <div className="text-[11px] uppercase tracking-[0.2em]">Properties sold</div>
            </div>
          </div>

          <div className="text-[64px] sm:text-[88px] md:text-[110px] lg:text-[128px] leading-[0.95] text-on-surface font-light tracking-tight">
            Сайн уу
          </div>
          <div className="mt-6 text-sm text-on-surface-variant tracking-wide">
            — I’m Solongo Batbold, a real estate curator.
          </div>

          <div className="mt-12 text-[12px] uppercase tracking-[0.35em] text-outline/70 flex items-center gap-3">
            <span>Scroll down</span>
            <span className="inline-block w-10 h-px bg-outline/40" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-7 relative h-[520px] sm:h-[620px] lg:h-[740px] order-1 lg:order-2"
        >
          <div className="relative z-10 h-full w-full flex items-end justify-center">
            <img 
              src="/person-shot.png" 
              alt="Solongo Batbold"
              className=" max-w-none w-[520px] sm:w-[580px] lg:w-[1000px] object-contain grayscale contrast-110 drop-shadow-[0_45px_60px_rgba(27,28,26,0.2)]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const formatArea = (value?: number | null) => {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return `${Number(value).toLocaleString()} м²`;
};

function PropertyCard({ property }: { property: Estate }) {
  const navigate = useNavigate();
  const imageUrl = property.images?.[0];
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/property/${property.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/3]">
        <img 
          src={imageUrl ?? '/person-shot.png'} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
          <p className="text-on-surface-variant text-sm">{property.location ?? '—'}</p>
        </div>
        <span className="text-lg font-semibold">{formatMNTCompact(property.price)}</span>
      </div>
      <div className="mt-3 flex items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-outline/70">
        <span className="flex items-center gap-1">
          <BedDouble className="w-3.5 h-3.5" /> {property.bed ?? '—'}
        </span>
        <span className="flex items-center gap-1">
          <Bath className="w-3.5 h-3.5" /> {property.bath ?? '—'}
        </span>
        <span className="flex items-center gap-1">
          <Square className="w-3.5 h-3.5" /> {formatArea(property.area)}
        </span>
      </div>
    </motion.div>
  );
}

const Home = () => {
  const [estates, setEstates] = React.useState<Estate[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      const { data, error: fetchError } = await supabase
        .from('estate')
        .select('*')
        .eq('user_id', PUBLIC_AGENT_ID)
        .order('created_at', { ascending: false });
      if (fetchError) {
        setError(fetchError.message);
        setIsLoading(false);
        return;
      }
      setEstates((data as Estate[]) ?? []);
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />

        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">Location</h2>
              <p className="text-on-surface-variant text-sm">
                {isLoading ? 'Loading properties...' : `We found ${estates.length} properties`}
              </p>
            </div>
          </div>
          
          {error && <p className="text-sm text-red-600 mb-6">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {estates.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/property/:id" element={<PropertyDetail />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-listing"
        element={
          <ProtectedRoute>
            <NewListing />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
