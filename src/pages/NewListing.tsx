import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NewListing = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-3">New Listing</h1>
            <p className="text-on-surface-variant">Curate a new residence for your portfolio.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">
                  Property Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Glass Pavilion at Ridgeview"
                  className="w-full h-12 rounded-xl border border-outline/20 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">
                  Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Describe the architectural intent and lifestyle experience..."
                  className="w-full rounded-xl border border-outline/20 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">
                  Images
                </label>
                <div className="border border-dashed border-outline/30 rounded-2xl p-10 text-center bg-surface-low">
                  <div className="w-12 h-12 mx-auto rounded-full bg-white border border-outline/10 flex items-center justify-center mb-4">
                    <span className="text-lg">+</span>
                  </div>
                  <p className="text-sm font-medium">Drag and drop high-resolution imagery</p>
                  <p className="text-xs text-on-surface-variant mt-2">RAW or TIFF preferred. Max 50MB per file.</p>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-outline/10">
                    <img
                      src="https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&q=80&w=400"
                      alt="Preview 1"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-outline/10">
                    <img
                      src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=400"
                      alt="Preview 2"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-20 h-20 rounded-xl border border-dashed border-outline/30 flex items-center justify-center text-outline/60">
                    +
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">Price (USD)</label>
                  <input
                    type="text"
                    placeholder="$ 4,500,000"
                    className="w-full h-12 rounded-xl border border-outline/20 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">Location</label>
                  <input
                    type="text"
                    placeholder="Aspen, Colorado"
                    className="w-full h-12 rounded-xl border border-outline/20 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">Bedrooms</label>
                  <input
                    type="text"
                    placeholder="4"
                    className="w-full h-12 rounded-xl border border-outline/20 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">Bathrooms</label>
                  <input
                    type="text"
                    placeholder="5.5"
                    className="w-full h-12 rounded-xl border border-outline/20 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">Area (sq ft)</label>
                  <input
                    type="text"
                    placeholder="6250"
                    className="w-full h-12 rounded-xl border border-outline/20 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-outline/10 rounded-2xl p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-outline/70 mb-4">Listing Details</h3>
                <div className="space-y-3 text-sm text-on-surface-variant">
                  <div className="flex items-center justify-between">
                    <span>Category</span>
                    <span className="text-on-surface">Modern Residence</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Visibility</span>
                    <span className="text-on-surface">Public</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Agent</span>
                    <span className="text-on-surface">Solongo Batbold</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-outline/10 rounded-2xl p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-outline/70 mb-4">Publish Listing</h3>
                <p className="text-sm text-on-surface-variant mb-6">
                  Confirm details before publishing to the public catalog.
                </p>
                <button className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-container transition-all">
                  Publish Listing
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewListing;
