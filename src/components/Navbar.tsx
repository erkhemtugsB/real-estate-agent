import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      setUserEmail(data.session?.user?.email ?? null);
      setIsLoading(false);
    };
    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      setUserEmail(session?.user?.email ?? null);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isAuthed = Boolean(userEmail);
  const onDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/new-listing');
  const toggleLabel = onDashboard ? 'Home' : 'Dashboard';
  const toggleHref = onDashboard ? '/' : '/dashboard';

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-outline/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-3xl font-normal font-signature">Solongo Batbold</Link>

        <div className="hidden md:flex items-center gap-10" />

        <div className="flex items-center gap-4">
          {!isLoading && isAuthed && (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-outline/80">
              {userEmail}
            </span>
          )}
          {!isLoading && isAuthed && (
            <Link
              to={toggleHref}
              className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-outline/20 hover:bg-surface-container transition-colors"
            >
              {toggleLabel}
            </Link>
          )}
          {!isLoading && isAuthed ? (
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-outline/20 hover:bg-surface-container transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="p-2 rounded-full text-outline hover:text-primary hover:bg-surface-container transition-colors"
              aria-label="User account"
            >
              <User className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
