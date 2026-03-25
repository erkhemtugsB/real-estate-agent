import React from 'react';
import { Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="bg-surface border-t border-outline/10 pt-20 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div>
          <div className="text-4xl font-normal font-signature mb-8">Solongo Batbold</div>
          <p className="text-on-surface-variant max-w-sm leading-relaxed mb-10">
            Founded on the principles of architectural integrity and bespoke service. We represent the world's most significant homes with the reverence they deserve.
          </p>
          <div className="flex gap-6">
            <Facebook className="w-5 h-5 text-outline hover:text-primary cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 text-outline hover:text-primary cursor-pointer transition-colors" />
            <Mail className="w-5 h-5 text-outline hover:text-primary cursor-pointer transition-colors" />
            <MapPin className="w-5 h-5 text-outline hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-8">Experience</h4>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary transition-colors">Properties</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">The Journal</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Private Search</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Art & Design</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-12 border-t border-outline/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-outline">
        <p>© 2026 Solongo Batbold. Architectural Integrity in Real Estate.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
