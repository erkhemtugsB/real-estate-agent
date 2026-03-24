import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Maximize2, Bath, BedDouble, Star, ArrowRight, Share2, Heart, Globe, Mail } from 'lucide-react';
import { PROPERTIES } from '../constants';

const PropertyDetail = () => {
  const { id } = useParams();
  const property = PROPERTIES.find(p => p.id === id) || PROPERTIES[0];

  return (
    <div className="min-h-screen bg-surface">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav border-b border-outline/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Collection
          </Link>
          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><Share2 className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><Heart className="w-5 h-5" /></button>
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-container transition-all active:scale-95">
              Get in Touch
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Gallery Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 aspect-[16/10] rounded-3xl overflow-hidden relative group">
            <img 
              src={property.image} 
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-8 left-8 flex gap-4">
              <button className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all">
                <Maximize2 className="w-4 h-4" />
                View All Images
              </button>
              <button className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all">
                <Globe className="w-4 h-4" />
                Virtual Tour
              </button>
            </div>
          </div>
          <div className="lg:col-span-4 grid grid-rows-2 gap-6">
            <div className="rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1000" 
                alt="Interior"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1000" 
                alt="Kitchen"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8">
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4">{property.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <div className="text-3xl font-light text-primary">{property.price}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-outline/10 mb-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Bedrooms</p>
                <div className="flex items-center gap-2 text-xl font-medium">
                  <BedDouble className="w-5 h-5 text-primary" />
                  06
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Bathrooms</p>
                <div className="flex items-center gap-2 text-xl font-medium">
                  <Bath className="w-5 h-5 text-primary" />
                  08
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Total Area</p>
                <div className="flex items-center gap-2 text-xl font-medium">
                  <Maximize2 className="w-5 h-5 text-primary" />
                  8,400 <span className="text-sm font-normal text-outline ml-1">sq.ft</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Lot Size</p>
                <div className="flex items-center gap-2 text-xl font-medium">
                  <Globe className="w-5 h-5 text-primary" />
                  2.4 <span className="text-sm font-normal text-outline ml-1">acres</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-outline mb-8">The Architecture</h3>
              <p className="text-2xl font-light italic leading-relaxed text-on-surface mb-10">
                "A poetic dialogue between structural permanence and the ephemeral shifting of coastal light."
              </p>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Rising from the natural contours of Vista Ridge, the Obsidian Horizon Estate represents a masterclass in modern minimalism. Designed by the visionary atelier of Blackwood & Sons, the residence features cantilevered glass volumes that appear to float above the Pacific mist.
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                Every material has been selected for its sensory resonance: hand-hewn basalt, reclaimed cedar from the surrounding canyons, and floor-to-ceiling structural glazing that erases the boundary between interior sanctuary and the raw coastal landscape.
              </p>
            </div>

            <div className="mt-20">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-outline mb-12">Property Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Chef's Kitchen", desc: "Gaggenau appliances, custom walnut cabinetry and a full prep scullery." },
                  { title: "Infinity Pool", desc: "A 75-foot heated saltwater pool that merges with the horizon line." },
                  { title: "Panoramic Views", desc: "Uninterrupted 270-degree views of the Pacific Ocean and Santa Ynez." },
                  { title: "Private Cinema", desc: "Acoustically optimized 12-seat theater with 4K laser projection." },
                  { title: "Vintage Cellar", desc: "Temperature-controlled storage for 2,500 bottles with tasting lounge." },
                  { title: "Smart Automation", desc: "Full Savant integration for lighting, climate, and security." }
                ].map((item, i) => (
                  <div key={i} className="bg-surface-low p-8 rounded-2xl border border-outline/5">
                    <h4 className="font-bold text-sm mb-3">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-white p-10 rounded-3xl shadow-sm border border-outline/5">
              <h3 className="text-2xl font-medium mb-2">Request an Invite</h3>
              <p className="text-sm text-on-surface-variant mb-10">Schedule a private showing for this estate.</p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Evelyn Thorne"
                    className="w-full px-6 py-4 rounded-xl bg-surface-low border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="e.thorne@curated.com"
                    className="w-full px-6 py-4 rounded-xl bg-surface-low border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Personal Message</label>
                  <textarea 
                    rows={4}
                    placeholder="I am interested in scheduling a viewing for next Tuesday..."
                    className="w-full px-6 py-4 rounded-xl bg-surface-low border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>
                <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-container transition-all">
                  Inquire Now
                </button>
              </form>

              <div className="mt-10 pt-10 border-t border-outline/5 flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" 
                  alt="Agent"
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-outline">Exclusive Agent</p>
                  <p className="font-bold text-sm">Marcus Vane</p>
                  <p className="text-xs text-on-surface-variant">+1 (805) 922 4030</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Estates */}
        <section className="bg-surface-low py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-20">
              <div>
                <h2 className="text-4xl font-medium tracking-tighter mb-4">Similar Estates</h2>
                <p className="text-on-surface-variant">Hand-curated selections with similar architectural DNA.</p>
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full border border-outline/20 flex items-center justify-center hover:bg-white transition-all"><ArrowLeft className="w-4 h-4" /></button>
                <button className="w-12 h-12 rounded-full border border-outline/20 flex items-center justify-center hover:bg-white transition-all"><ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {PROPERTIES.slice(1, 4).map(property => (
                <div key={property.id} className="group cursor-pointer">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-1">{property.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-4">{property.location}</p>
                  <p className="text-xl font-light">{property.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface border-t border-outline/10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-5">
              <div className="text-2xl font-bold mb-8 tracking-tighter">The Curated Estate</div>
              <p className="text-on-surface-variant max-w-sm leading-relaxed mb-10">
                Defining the new standard for luxury real estate through architectural narrative and curated living experiences.
              </p>
            </div>
            <div className="md:col-span-3">
              <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-8">Navigation</h4>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li>Portfolio</li>
                <li>Architects</li>
                <li>Press</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-8">Legal</h4>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-outline/10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-outline">
            <p>© 2024 The Curated Estate. All rights reserved.</p>
            <div className="flex gap-6">
              <Globe className="w-4 h-4" />
              <Share2 className="w-4 h-4" />
              <Mail className="w-4 h-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetail;
