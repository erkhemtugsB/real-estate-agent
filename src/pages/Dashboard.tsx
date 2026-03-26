import React from 'react';
import { motion } from 'motion/react';
import { Plus, Eye, TrendingUp, Home, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { formatMNTCompact } from '../lib/format';
import { Estate } from '../types';

const Dashboard = () => {
  const navigate = useNavigate();
  const [estates, setEstates] = React.useState<Estate[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const totalRevenue = estates.reduce((sum, estate) => sum + (estate.price ?? 0), 0);

  const [isDeletingId, setIsDeletingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      const { data, error: fetchError } = await supabase
        .from('estate')
        .select('*')
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

  const handleDelete = async (estateId: string) => {
    if (!confirm('Delete this listing?')) return;
    setIsDeletingId(estateId);
    const { error: deleteError } = await supabase.from('estate').delete().eq('id', estateId);
    if (deleteError) {
      setError(deleteError.message);
      setIsDeletingId(null);
      return;
    }
    setEstates((prev) => prev.filter((estate) => estate.id !== estateId));
    setIsDeletingId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Main Content */}
      <main className="p-6 sm:p-10 md:p-16">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-10 md:mb-16">
          <Link to="/" className="text-3xl font-normal font-signature">Solongo Batbold</Link>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3">
            <Link to="/new-listing" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-container transition-all inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              <Plus className="w-5 h-5" />
              New Listing
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl border border-outline/20 text-sm font-semibold hover:bg-surface-low transition-all w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-outline/5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-6 right-6 md:top-8 md:right-8 text-outline/20 group-hover:text-primary/20 transition-colors">
              <Home className="w-10 h-10" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-4">Total Listings</p>
            <div className="text-4xl sm:text-5xl md:text-6xl font-light mb-4">{isLoading ? '—' : estates.length}</div>
          </div>

          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-outline/5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-6 right-6 md:top-8 md:right-8 text-outline/20 group-hover:text-primary/20 transition-colors">
              <TrendingUp className="w-10 h-10" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-4">Recent Sales</p>
            <div className="text-4xl sm:text-5xl md:text-6xl font-light mb-4">
              {isLoading ? '—' : formatMNTCompact(totalRevenue)}
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="space-y-6">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {estates.map((property, i) => (
            <motion.div 
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-outline/5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6 md:gap-10 group"
            >
              <div className="w-full md:w-64 aspect-[16/10] rounded-2xl overflow-hidden relative">
                <img 
                  src={property.images?.[0] ?? '/person-shot.png'} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 w-full">
                <h3 className="text-2xl font-medium mb-1">{property.title}</h3>
                <p className="text-sm text-on-surface-variant">
                  {property.area ? `${Number(property.area).toLocaleString()} м²` : '—'}
                </p>
              </div>

              <div className="w-full md:w-auto text-left md:text-right md:px-10 md:border-x md:border-outline/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Asking Price</p>
                <p className="text-2xl font-medium">{formatMNTCompact(property.price)}</p>
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <button
                  className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold border border-red-200 hover:bg-red-50 transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => handleDelete(property.id)}
                  disabled={isDeletingId === property.id}
                >
                  <Trash2 className="w-4 h-4" />
                  {isDeletingId === property.id ? 'Deleting...' : 'Delete'}
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
