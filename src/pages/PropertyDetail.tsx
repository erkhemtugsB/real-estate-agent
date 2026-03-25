import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Bath, BedDouble, Square, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';
import { PROPERTIES } from '../constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PropertyDetail = () => {
  const { id } = useParams();
  const property = PROPERTIES.find(p => p.id === id) || PROPERTIES[0];
  const galleryImages = [
    property.image,
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600607687940-467f5b637a51?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
  ];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const totalImages = galleryImages.length;
  const showPrev = () => setActiveIndex((prev) => (prev - 1 + totalImages) % totalImages);
  const showNext = () => setActiveIndex((prev) => (prev + 1) % totalImages);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-24">
        <section className="max-w-7xl mx-auto px-6 pb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-outline/70 mb-4">Featured Residence</p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">{property.title}</h1>
          <div className="flex items-center gap-2 text-on-surface-variant text-sm">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl overflow-hidden bg-surface-low aspect-[16/11]">
              <img
                src={galleryImages[activeIndex]}
                alt={`${property.title} ${activeIndex + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center"
                onClick={showPrev}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center"
                onClick={showNext}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {galleryImages.slice(1, 5).map((img, i) => (
              <div key={img} className="rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={img}
                  alt={`${property.title} detail ${i + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-outline/10 rounded-2xl p-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline/70 mb-2">Monthly Rent</p>
                <p className="text-lg font-semibold">{property.price}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline/70 mb-2">Bedrooms</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <BedDouble className="w-4 h-4" /> 3
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline/70 mb-2">Bathrooms</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <Bath className="w-4 h-4" /> 2
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline/70 mb-2">Square Feet</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <Square className="w-4 h-4" /> 1,400 sq ft
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Information</h2>
              <div className="space-y-4 text-on-surface-variant text-sm leading-relaxed">
                <p>
                  Clean lines, sunlit interiors, and a calm palette define this residence. Thoughtful proportions create
                  an easy flow between living, dining, and outdoor spaces.
                </p>
                <p>
                  Finishes include wide-plank flooring, custom cabinetry, and floor-to-ceiling glazing positioned to frame
                  the surrounding landscape.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Address</h2>
              <div className="text-sm text-on-surface-variant leading-relaxed">
                <p>{property.location}</p>
                <p>5678 PointView Plaza, Los Angeles, CA 91000</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white border border-outline/10 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Contact property</h3>
                <p className="text-sm text-on-surface-variant">Reach out directly for availability and private tours.</p>
              </div>
              <div className="space-y-3 text-sm text-on-surface-variant">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-outline" />
                  <span>+1 (555) 555 1234</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-outline" />
                  <span>hello@solongobatbold.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-outline" />
                  <span>Open House: 9am - 5pm</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
