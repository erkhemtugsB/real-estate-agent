import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase, STORAGE_BUCKET } from '../lib/supabase';
import { formatMNTCompact, formatNumberWithCommas, parseNumber } from '../lib/format';
import { useNavigate } from 'react-router-dom';

const NewListing = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [area, setArea] = React.useState('');
  const [bed, setBed] = React.useState('');
  const [bath, setBath] = React.useState('');
  const [images, setImages] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (images.length === 0) {
      setPreviews([]);
      return;
    }
    const nextPreviews = images.map((file) => URL.createObjectURL(file));
    setPreviews(nextPreviews);
    return () => {
      nextPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setImages(files);
  };

  const uploadImages = async () => {
    if (images.length === 0) return [];
    const uploadedUrls: string[] = [];
    for (const file of images) {
      const filePath = `${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, { upsert: false });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
      if (data?.publicUrl) {
        uploadedUrls.push(data.publicUrl);
      }
    }
    return uploadedUrls;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    try {
      const imageUrls = await uploadImages();
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        setError('Please sign in to publish a listing.');
        return;
      }
      const toNumber = (value: string) => (value.trim() ? Number(value) : null);
      const priceNumber = parseNumber(price);
      const { error: insertError } = await supabase.from('estate').insert({
        title,
        description,
        location,
        price: priceNumber,
        area: toNumber(area),
        bed: toNumber(bed),
        bath: toNumber(bath),
        images: imageUrls,
        user_id: userData.user.id
      });
      if (insertError) throw insertError;
      setSuccess('Listing created.');
      setTitle('');
      setDescription('');
      setLocation('');
      setPrice('');
      setArea('');
      setBed('');
      setBath('');
      setImages([]);
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Unable to create listing.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="max-w-6xl mx-auto px-6">
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-3">New Listing</h1>
              <p className="text-on-surface-variant">Curate a new residence for your portfolio.</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl border border-outline/20 text-sm font-semibold hover:bg-surface-low transition-all"
            >
              Logout
            </button>
          </div>

          <form className="grid grid-cols-1 lg:grid-cols-12 gap-10" onSubmit={handleSubmit}>
            <div className="lg:col-span-8 space-y-8">
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">
                  Property Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Glass Pavilion at Ridgeview"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
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
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
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
                  <label className="inline-flex mt-4 px-4 py-2 rounded-lg border border-outline/20 text-xs font-semibold cursor-pointer">
                    Select Files
                    <input type="file" multiple className="hidden" onChange={handleFiles} />
                  </label>
                </div>
                {previews.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {previews.map((src, index) => (
                      <div key={src} className="w-20 h-20 rounded-xl overflow-hidden border border-outline/10">
                        <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">Price (USD)</label>
                  <input
                    type="text"
                    placeholder="₮ 4,500,000"
                    value={formatNumberWithCommas(price)}
                    onChange={(event) => setPrice(event.target.value)}
                    className="w-full h-12 rounded-xl border border-outline/20 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {price && (
                    <p className="text-xs text-on-surface-variant mt-2">
                      {formatMNTCompact(parseNumber(price))}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">Location</label>
                  <input
                    type="text"
                    placeholder="Aspen, Colorado"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
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
                    value={bed}
                    onChange={(event) => setBed(event.target.value)}
                    className="w-full h-12 rounded-xl border border-outline/20 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">Bathrooms</label>
                  <input
                    type="text"
                    placeholder="5.5"
                    value={bath}
                    onChange={(event) => setBath(event.target.value)}
                    className="w-full h-12 rounded-xl border border-outline/20 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-outline/70 block mb-3">Area (м²)</label>
                  <input
                    type="text"
                    placeholder="62.5"
                    value={area}
                    onChange={(event) => setArea(event.target.value)}
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
                    <span className="text-on-surface">Bayarmaa Chuluut</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-outline/10 rounded-2xl p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-outline/70 mb-4">Publish Listing</h3>
                <p className="text-sm text-on-surface-variant mb-6">
                  Confirm details before publishing to the public catalog.
                </p>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-container transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                </button>
                {error && <p className="text-xs text-red-600 mt-4">{error}</p>}
                {success && <p className="text-xs text-primary mt-4">{success}</p>}
              </div>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewListing;
