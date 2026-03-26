import React from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthed, setIsAuthed] = React.useState(false);

  React.useEffect(() => {
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user) {
        setIsAuthed(true);
        setIsLoading(false);
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      setIsAuthed(Boolean(userData.user));
      setIsLoading(false);
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(Boolean(session?.user));
      setIsLoading(false);
    });

    return () => {
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
