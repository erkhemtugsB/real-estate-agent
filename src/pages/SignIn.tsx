import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SignIn = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    const redirectIfAuthed = async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session?.user) {
        navigate('/dashboard', { replace: true });
      }
    };
    redirectIfAuthed();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      if (session?.user) {
        navigate('/dashboard', { replace: true });
      }
    });

    return () => {
      cancelled = true;
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (isSignUp) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber
          }
        }
      });
      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      const userId = data.user?.id;
      if (data.session && userId) {
        const { error: insertError } = await supabase.from('agent').insert({
          id: userId,
          email,
          full_name: `${firstName} ${lastName}`.trim(),
          phone_number: phoneNumber
        });
        if (insertError) {
          setError(insertError.message);
          return;
        }
        navigate('/dashboard');
        return;
      }

      setNotice('Sign-up submitted. Please check your email to confirm, then sign in.');
      return;
    }

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
            <Link to="/" className="text-4xl font-normal font-signature mb-2 block">Bayarmaa Chuluut</Link>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-outline">Architectural Integrity in Real Estate</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm border border-outline/5">
            <div className="flex items-center gap-3 mb-8">
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className={`text-sm font-semibold ${!isSignUp ? 'text-primary' : 'text-outline/60'}`}
              >
                Sign In
              </button>
              <span className="text-outline/40">/</span>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className={`text-sm font-semibold ${isSignUp ? 'text-primary' : 'text-outline/60'}`}
              >
                Sign Up
              </button>
            </div>

            <h1 className="text-3xl font-medium tracking-tight mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-on-surface-variant text-sm mb-10">
              {isSignUp ? 'Join as an agent to manage your listings.' : 'Sign in to manage your portfolio.'}
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">First Name</label>
                    <input
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      className="w-full px-6 py-4 rounded-xl bg-surface-low border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      className="w-full px-6 py-4 rounded-xl bg-surface-low border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
              )}

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

              {isSignUp && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="5555-1234"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="w-full px-6 py-4 rounded-xl bg-surface-low border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              )}

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
              {notice && <p className="text-xs text-primary">{notice}</p>}

              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-2 group">
                {isSignUp ? 'Sign Up' : 'Sign In'}
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
            <p>© 2026 Bayarmaa Chuluut</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
