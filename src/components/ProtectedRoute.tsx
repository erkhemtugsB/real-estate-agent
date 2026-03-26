import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_STORAGE_KEY, supabase } from '../lib/supabase';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthed, setIsAuthed] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (cancelled) return;
      if (sessionData.session?.user) {
        setIsAuthed(true);
        setIsLoading(false);
        return;
      }

      const stored = typeof window !== 'undefined' ? window.localStorage.getItem(AUTH_STORAGE_KEY) : null;
      if (stored) {
        // Allow a short delay for session rehydration before redirecting.
        setTimeout(async () => {
          const { data: retrySession } = await supabase.auth.getSession();
          if (cancelled) return;
          setIsAuthed(Boolean(retrySession.session?.user));
          setIsLoading(false);
        }, 300);
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      if (cancelled) return;
      setIsAuthed(Boolean(userData.user));
      setIsLoading(false);
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(Boolean(session?.user));
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-surface" />;
  }

  if (!isAuthed) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
