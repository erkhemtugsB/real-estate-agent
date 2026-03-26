import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Bath, BedDouble, Square, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatMNTCompact } from '../lib/format';
import { Estate } from '../types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = React.useState<Estate | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      if (!id) {
        setError('Listing not found.');
        setIsLoading(false);
        return;
      }
      const { data, error: fetchError } = await supabase
        .from('estate')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (fetchError) {
        setError(fetchError.message);
        setIsLoading(false);
        return;
      }
      if (!data) {
        setError('Listing not found.');
        setIsLoading(false);
        return;
      }
      setProperty(data as Estate);
      setIsLoading(false);
    };
    load();
  }, [id]);

  const galleryImages = property?.images?.length
    ? property.images
    : [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1600607687940-467f5b637a51?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
      ];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const totalImages = galleryImages.length;
  const showPrev = () => setActiveIndex((prev) => (prev - 1 + totalImages) % totalImages);
  const showNext = () => setActiveIndex((prev) => (prev + 1) % totalImages);

  const formatArea = (value?: number | null) => {
    if (value === null || value === undefined || Number.isNaN(value)) return '—';
    return `${Number(value).toLocaleString()} м²`;
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-24">
        {isLoading && (
          <section className="max-w-7xl mx-auto px-6 pb-12">
            <div className="h-6 w-48 bg-surface-low rounded mb-4" />
            <div className="h-10 w-2/3 bg-surface-low rounded mb-3" />
            <div className="h-4 w-1/3 bg-surface-low rounded" />
          </section>
        )}
        <section className="max-w-7xl mx-auto px-6 pb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-outline/70 mb-4">Featured Residence</p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">{property?.title ?? 'Loading...'}</h1>
          <div className="flex items-center gap-2 text-on-surface-variant text-sm">
            <MapPin className="w-4 h-4" />
            <span>{property?.location ?? '—'}</span>
          </div>
        </section>

        {error && (
          <section className="max-w-7xl mx-auto px-6 pb-6">
            <p className="text-sm text-red-600">{error}</p>
          </section>
        )}

        <section className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl overflow-hidden bg-surface-low aspect-[16/11]">
              <img
                src={galleryImages[activeIndex]}
                alt={`${property?.title ?? 'Property'} ${activeIndex + 1}`}
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
                  alt={`${property?.title ?? 'Property'} detail ${i + 1}`}
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
                <p className="text-lg font-semibold">{formatMNTCompact(property?.price)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline/70 mb-2">Bedrooms</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <BedDouble className="w-4 h-4" /> {property?.bed ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline/70 mb-2">Bathrooms</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <Bath className="w-4 h-4" /> {property?.bath ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline/70 mb-2">Area</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <Square className="w-4 h-4" /> {formatArea(property?.area)}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Information</h2>
              <div className="space-y-4 text-on-surface-variant text-sm leading-relaxed">
                <p>
                  {property?.description ??
                    'Clean lines, sunlit interiors, and a calm palette define this residence. Thoughtful proportions create an easy flow between living, dining, and outdoor spaces.'}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Address</h2>
              <div className="text-sm text-on-surface-variant leading-relaxed">
                <p>{property?.location ?? '—'}</p>
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
                  <span>5555-1234</span>
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
