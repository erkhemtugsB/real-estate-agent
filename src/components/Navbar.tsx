import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass-nav border-b border-outline/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <Link to="/" className="text-3xl font-normal font-signature">Solongo Batbold</Link>

      <div className="hidden md:flex items-center gap-10" />

      <div className="flex items-center gap-6">
        <Link
          to="/signin"
          className="p-2 rounded-full text-outline hover:text-primary hover:bg-surface-container transition-colors"
          aria-label="User account"
        >
          <User className="w-5 h-5" />
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
