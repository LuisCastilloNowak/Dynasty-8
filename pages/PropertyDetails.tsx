
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROPERTIES } from '../constants';
import { getPropertyEnhancement } from '../services/geminiService';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const property = PROPERTIES.find(p => p.id === id);
  const allImages = property ? [property.imageUrl, ...(property.gallery || [])] : [];

  useEffect(() => {
    if (property) {
      setLoadingAi(true);
      getPropertyEnhancement(property.title, property.location).then(desc => {
        setAiDescription(desc);
        setLoadingAi(false);
      });
    }
  }, [property]);

  if (!property) return <div className="pt-32 text-center text-white">Propriété non trouvée.</div>;

  return (
    <div className="bg-neutral-950 min-h-screen text-white pt-24">
      {/* Header Image */}
      <div className="relative h-[70vh] w-full px-6 md:px-12 mt-6">
        <div className="w-full h-full overflow-hidden rounded-3xl shadow-2xl relative">
          <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-0 w-full px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <span className="brand-green-text tracking-[0.3em] uppercase text-xs mb-2 block font-bold">{property.type}</span>
                <h1 className="font-serif text-5xl md:text-7xl mb-4">{property.title}</h1>
                <p className="text-white/60 tracking-widest uppercase">{property.location}</p>
              </div>
              <div className="mt-8 md:mt-0">
                <p className="brand-yellow-text font-serif text-4xl font-bold">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <div className="prose prose-invert max-w-none">
            <h2 className="font-serif text-3xl mb-6">Présentation du Bien</h2>
            <p className="text-white/70 leading-relaxed text-lg mb-8">
              {property.description}
            </p>
            
            {/* AI Enhanced Section */}
            <div className="bg-neutral-900/50 p-8 border-l-4 brand-green-border mb-12 rounded-xl">
              <span className="text-[10px] brand-yellow-text uppercase tracking-widest mb-4 block font-bold">Note de notre expert IA</span>
              {loadingAi ? (
                <div className="flex items-center space-x-2 animate-pulse">
                  <div className="w-2 h-2 brand-green-bg rounded-full"></div>
                  <div className="w-2 h-2 brand-green-bg rounded-full delay-75"></div>
                  <div className="w-2 h-2 brand-green-bg rounded-full delay-150"></div>
                </div>
              ) : (
                <p className="italic font-serif text-xl leading-relaxed text-white/90">
                  {aiDescription || "Une adresse rare où chaque détail a été conçu pour satisfaire les exigences les plus élevées en matière de confort et de prestige."}
                </p>
              )}
            </div>

            {/* Gallery Section */}
            {allImages.length > 1 && (
              <div className="mb-16">
                <h3 className="font-serif text-2xl mb-8">Galerie de Prestige</h3>
                <div className="grid grid-cols-2 gap-4">
                  {allImages.slice(1).map((img, idx) => (
                    <div key={idx} className="aspect-video rounded-2xl overflow-hidden border border-white/5 hover:border-brand-yellow-border transition-colors">
                      <img src={img} className="w-full h-full object-cover" alt={`${property.title} view ${idx + 2}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-neutral-900 p-8 border border-white/5 rounded-2xl shadow-xl">
            <h3 className="font-serif text-2xl mb-6">Demande de Renseignements</h3>
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="NOM COMPLET" 
                  className="w-full bg-neutral-950 border border-white/10 px-4 py-3 text-xs tracking-widest focus:outline-none focus:brand-green-border rounded-lg"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="ADRESSE E-MAIL" 
                  className="w-full bg-neutral-950 border border-white/10 px-4 py-3 text-xs tracking-widest focus:outline-none focus:brand-green-border rounded-lg"
                />
              </div>
              <div>
                <textarea 
                  rows={4}
                  placeholder="VOTRE MESSAGE" 
                  className="w-full bg-neutral-950 border border-white/10 px-4 py-3 text-xs tracking-widest focus:outline-none focus:brand-green-border rounded-lg"
                ></textarea>
              </div>
              <button 
                type="button"
                className="w-full brand-yellow-bg text-black py-4 uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors rounded-lg"
              >
                Planifier une Visite
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;