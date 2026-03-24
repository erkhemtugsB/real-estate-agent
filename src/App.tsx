/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Search, Menu, ArrowRight, Globe, Mail, MapPin, Instagram, Twitter, Linkedin, Star } from 'lucide-react';
import { PROPERTIES, AGENTS } from './constants';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass-nav border-b border-outline/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="text-xl font-semibold tracking-tighter">The Curated Estate</div>
      
      <div className="hidden md:flex items-center gap-10">
        <a href="#" className="text-sm font-medium border-b-2 border-primary pb-1">Properties</a>
        <a href="#" className="text-sm font-medium text-outline hover:text-primary transition-colors">Agents</a>
        <a href="#" className="text-sm font-medium text-outline hover:text-primary transition-colors">Journal</a>
        <a href="#" className="text-sm font-medium text-outline hover:text-primary transition-colors">About</a>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-sm font-medium text-outline hover:text-primary transition-colors">Sign In</button>
        <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-container transition-all active:scale-95">
          List Property
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden bg-surface-low min-h-[90vh] flex items-center">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-6 z-10"
      >
        <span className="inline-block px-3 py-1 bg-primary-fixed text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-8">
          Redefining Excellence
        </span>
        <h1 className="text-6xl md:text-8xl font-medium leading-[1.05] tracking-tighter mb-8">
          The art of <br />
          <span className="text-primary italic">living</span> well.
        </h1>
        <p className="text-lg text-on-surface-variant max-w-md mb-12 leading-relaxed">
          Curating architectural legacies and exclusive estates through a lens of sophistication, trust, and unparalleled personal service.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-container transition-all flex items-center gap-2 group">
            Explore Collections
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border border-outline/20 px-8 py-4 rounded-lg font-medium hover:bg-surface-container transition-all">
            Private Consultation
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="lg:col-span-6 relative h-[600px] lg:h-[750px]"
      >
        <div className="absolute inset-0 right-0 left-12 top-12 bottom-0 rounded-tl-[120px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600607687940-467f5b637a51?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern Architecture"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
        </div>
        
        <div className="relative z-20 h-full w-full flex items-end justify-center">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
            alt="Julian Montgomery"
            className="h-[90%] w-auto object-contain drop-shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-12 -left-4 z-30 bg-white p-8 rounded-xl shadow-2xl max-w-[300px]"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Lead Associate</p>
          <h3 className="text-2xl font-semibold mb-2">Julian Montgomery</h3>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            "We don't just sell homes; we facilitate the next chapter of your legacy."
          </p>
          <div className="flex items-center gap-2 text-primary">
            <Star className="w-4 h-4 fill-primary" />
            <span className="text-[10px] font-bold tracking-widest">TOP 1% GLOBAL LUXURY</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const PropertyCard = ({ property }: { property: typeof PROPERTIES[0] }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className={`group cursor-pointer ${
      property.size === 'large' ? 'md:col-span-8' : 
      property.size === 'wide' ? 'md:col-span-8' : 'md:col-span-4'
    }`}
  >
    <div className={`relative overflow-hidden rounded-xl mb-6 ${
      property.size === 'large' ? 'aspect-[16/9]' : 
      property.size === 'medium' ? 'aspect-[4/5]' : 
      property.size === 'small' ? 'aspect-square' : 'aspect-[21/9]'
    }`}>
      <img 
        src={property.image} 
        alt={property.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      {property.tags && (
        <div className="absolute top-6 left-6 flex gap-2">
          {property.tags.map(tag => (
            <span key={tag} className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
              tag === 'Exclusive' ? 'bg-primary/90 text-white' : 'bg-white/90 text-on-surface'
            }`}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-2xl font-medium mb-1">{property.title}</h3>
        <p className="text-on-surface-variant text-sm">{property.location}</p>
      </div>
      <span className="text-2xl font-light">{property.price}</span>
    </div>
  </motion.div>
);

const AgentCard = ({ agent }: { agent: typeof AGENTS[0] }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="bg-white p-10 rounded-xl text-center shadow-sm border border-outline/5"
  >
    <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-2 border-primary-fixed p-1">
      <img 
        src={agent.image} 
        alt={agent.name}
        className="w-full h-full object-cover rounded-full"
        referrerPolicy="no-referrer"
      />
    </div>
    <h4 className="text-2xl font-bold mb-1">{agent.name}</h4>
    <p className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-6">{agent.specialty}</p>
    <p className="text-sm text-on-surface-variant leading-relaxed mb-8 px-4">
      {agent.description}
    </p>
    <button className="text-sm font-bold text-primary hover:underline underline-offset-8">
      View Portfolio
    </button>
  </motion.div>
);

const Newsletter = () => (
  <section className="py-24 max-w-7xl mx-auto px-6">
    <div className="hero-gradient rounded-3xl p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      <div className="relative z-10 max-w-2xl">
        <span className="text-primary-fixed text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block">The Weekly Journal</span>
        <h2 className="text-4xl md:text-6xl font-medium text-white mb-8 tracking-tighter leading-tight">
          Insight into the world's most distinguished spaces.
        </h2>
        <p className="text-primary-fixed/70 text-lg mb-12 leading-relaxed">
          Join 24,000+ collectors and investors who receive our curated architectural reports and early access to off-market listings.
        </p>
        <form className="flex flex-col md:flex-row gap-4 w-full max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Your email address"
            className="flex-1 px-8 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary-fixed transition-all"
          />
          <button className="bg-primary-fixed text-primary px-10 py-4 rounded-lg font-bold hover:bg-white transition-all active:scale-95">
            Subscribe
          </button>
        </form>
        <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
          Your privacy is our utmost priority. No spam, only architectural inspiration.
        </p>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-surface border-t border-outline/10 pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
        <div className="md:col-span-5">
          <div className="text-2xl font-bold mb-8 tracking-tighter">The Curated Estate</div>
          <p className="text-on-surface-variant max-w-sm leading-relaxed mb-10">
            Founded on the principles of architectural integrity and bespoke service. We represent the world's most significant homes with the reverence they deserve.
          </p>
          <div className="flex gap-6">
            <Globe className="w-5 h-5 text-outline hover:text-primary cursor-pointer transition-colors" />
            <Mail className="w-5 h-5 text-outline hover:text-primary cursor-pointer transition-colors" />
            <MapPin className="w-5 h-5 text-outline hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-8">Experience</h4>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary transition-colors">Properties</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">The Journal</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Private Search</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Art & Design</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-8">Company</h4>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Our Agents</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Press Room</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-12 border-t border-outline/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-outline">
        <p>© 2024 The Curated Estate. Architectural Integrity in Real Estate.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />

        <section className="py-32 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6">The Winter Collection</h2>
              <p className="text-on-surface-variant leading-relaxed">
                A hand-picked selection of properties that define architectural excellence and offer a sanctuary from the ordinary.
              </p>
            </div>
            <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary border-b border-primary pb-1">
              View All Properties
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {PROPERTIES.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        <section className="bg-surface-container py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6">Meet Our Curators</h2>
              <p className="text-on-surface-variant">
                Our agents are more than facilitators—they are architectural historians, lifestyle designers, and your dedicated partners in real estate.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {AGENTS.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
