import React, { useState, useMemo } from 'react';
import { PROPERTIES, INTERIORS } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { Interior } from '../types';

type CatalogView = 'selection' | 'properties' | 'interiors';

const InteriorCard: React.FC<{ interior: Interior }> = ({ interior }) => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [interior.imageUrl, ...(interior.gallery || [])];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="group block relative overflow-hidden bg-neutral-900 rounded-2xl shadow-2xl border border-white/5 hover:border-brand-yellow-border transition-colors cursor-pointer">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl relative">
        <img 
          src={images[activeImage]} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          alt={interior.title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
        
        {/* Gallery Badge */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-10">
            <span className="text-[9px] text-white font-black tracking-widest uppercase">{images.length} PHOTOS</span>
          </div>
        )}

        {/* Quick Nav for gallery */}
        {images.length > 1 && (
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-yellow-bg hover:text-black"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6">
        <span className="brand-yellow-text text-[10px] tracking-widest uppercase mb-1 block font-bold">{interior.style}</span>
        <h3 className="font-serif text-xl text-white mb-2">{interior.title}</h3>
        
        <div className="flex items-center space-x-2 bg-brand-green-bg/20 border border-brand-green-border/30 w-fit px-3 py-1 rounded-md mb-4 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full brand-green-bg animate-pulse"></span>
          <p className="brand-green-text font-serif text-sm font-black uppercase tracking-widest">
            Prestation Offerte
          </p>
        </div>

        <p className="text-white/40 text-[10px] mt-2 uppercase tracking-widest leading-relaxed line-clamp-2">{interior.description}</p>
        
        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="flex space-x-1.5 mt-4">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === activeImage ? 'w-4 brand-yellow-bg' : 'w-1 bg-white/20'}`}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Catalog: React.FC = () => {
  const [view, setView] = useState<CatalogView>('selection');
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [locationFilter, setLocationFilter] = useState('Tous');
  const [styleFilter, setStyleFilter] = useState<'Tous' | 'Meublé' | 'Non Meublé'>('Tous');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'default'>('default');
  
  const types = [
    'Tous', 
    'Villa', 
    'Manoir', 
    'Appartement', 
    'Mobile-home', 
    'Petite maison', 
    'Ferme', 
    'Maison de ville', 
    'Appartements de Luxe', 
    'Entrepôt', 
    'Appartement Bord de Mer', 
    'Maison Bord de Mer'
  ];

  const locations = [
    'Tous',
    'Sandy Shores',
    'Grapeseed',
    'Paleto Bay',
    'Mirror Park',
    'Vespucci',
    'Little Seoul',
    'Del Perro Beach',
    'Downtown',
    'Pillbox Hill',
    'West Vinewood',
    'Rockford Hills',
    'Vinewood Hills',
    'Richman',
    'Tongva Hills',
    'Rancho / Jamestown - Vagos',
    'Davis / Covenant Avenue - Ballas',
    'Carson Avenue / Brouge Avenue - Bloods',
    'La Mesa - Hoover',
    'Little Seoul - Triades',
    'Strawberry - Families'
  ];

  const filteredProperties = useMemo(() => {
    let result = PROPERTIES.filter(p => {
      const matchesType = typeFilter === 'Tous' || p.type === typeFilter;
      const matchesLocation = locationFilter === 'Tous' || p.location === locationFilter;
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                            p.location.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesLocation && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [typeFilter, locationFilter, search, sortBy]);

  const filteredInteriors = useMemo(() => {
    let result = INTERIORS.filter(i => {
      const matchesStyle = styleFilter === 'Tous' || i.style === styleFilter;
      const matchesSearch = i.title.toLowerCase().includes(search.toLowerCase());
      return matchesStyle && matchesSearch;
    });
    // Tri par prix supprimé pour les intérieurs car prix = 0 ou null
    return result;
  }, [styleFilter, search]);

  if (view === 'selection') {
    return (
      <div className="pt-32 pb-24 bg-neutral-950 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center mb-16 animate-page-transition-enter-active">
          <span className="brand-green-text tracking-[0.3em] uppercase text-xs mb-2 block font-bold">Votre Voyage Commence Ici</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">Que recherchez-vous ?</h1>
          <div className="w-24 h-1 brand-yellow-bg mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          <button 
            onClick={() => setView('properties')}
            className="group relative h-[500px] overflow-hidden rounded-3xl border border-white/5 transition-all duration-1000 hover:border-brand-green-border"
          >
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Maisons"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <h2 className="font-serif text-4xl text-white mb-4 transform translate-y-4 transition-transform group-hover:translate-y-0">Maisons & Appartements</h2>
              <p className="text-white/60 text-sm tracking-widest uppercase opacity-0 transform translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0">Explorer nos domaines exclusifs</p>
            </div>
          </button>

          <button 
            onClick={() => setView('interiors')}
            className="group relative h-[500px] overflow-hidden rounded-3xl border border-white/5 transition-all duration-1000 hover:border-brand-yellow-border"
          >
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Intérieurs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <h2 className="font-serif text-4xl text-white mb-4 transform translate-y-4 transition-transform group-hover:translate-y-0">Aménagements</h2>
              <p className="text-white/60 text-sm tracking-widest uppercase opacity-0 transform translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0">Inclus avec votre acquisition</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <button 
          onClick={() => setView('selection')}
          className="group flex items-center space-x-3 brand-yellow-text text-xs uppercase tracking-widest mb-12 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Retour à la sélection</span>
        </button>

        <div className="mb-16">
          <span className="brand-green-text tracking-[0.3em] uppercase text-xs mb-2 block font-bold">
            {view === 'properties' ? 'Maisons & Appartements' : 'Catalogue Aménagements'}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
            {view === 'properties' ? 'Explorez notre Portfolio' : 'Configurations Offertes'}
          </h1>
          {view === 'interiors' && (
            <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-bold italic border-l-2 brand-green-border pl-4">
              Chez Dynasty 8, l'excellence n'a pas de prix. <br />Tous les aménagements présentés sont inclus sans frais supplémentaires lors de votre achat.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-10 mb-12 pb-10 border-b border-white/10">
          {view === 'properties' ? (
            <>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-4 block font-bold">Type de bien</span>
                <div className="flex flex-wrap items-center gap-y-4 gap-x-6">
                  {types.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setTypeFilter(cat)}
                      className={`text-[10px] uppercase tracking-[0.2em] py-2 transition-all duration-300 relative font-bold whitespace-nowrap ${
                        typeFilter === cat ? 'brand-yellow-text' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {cat}
                      {typeFilter === cat && <span className="absolute bottom-0 left-0 w-full h-[2px] brand-yellow-bg"></span>}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-4 block font-bold">Secteurs Géographiques</span>
                <div className="flex items-center gap-x-6 overflow-x-auto pb-4 scrollbar-hide no-scrollbar -mx-4 px-4">
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setLocationFilter(loc)}
                      className={`text-[10px] uppercase tracking-[0.2em] py-2 px-4 transition-all duration-300 rounded-full border whitespace-nowrap font-bold ${
                        locationFilter === loc 
                        ? 'brand-yellow-text brand-yellow-border bg-brand-yellow-bg/5' 
                        : 'text-white/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-4 block font-bold">État de l'Intérieur</span>
              <div className="flex flex-wrap items-center gap-x-8">
                {['Tous', 'Meublé', 'Non Meublé'].map(style => (
                  <button
                    key={style}
                    onClick={() => setStyleFilter(style as any)}
                    className={`text-[10px] uppercase tracking-[0.2em] py-2 transition-all duration-300 relative font-bold ${
                      styleFilter === style ? 'brand-yellow-text' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {style}
                    {styleFilter === style && <span className="absolute bottom-0 left-0 w-full h-[2px] brand-yellow-bg"></span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
            <div className="relative flex-grow max-w-md">
              <input 
                type="text" 
                placeholder="Rechercher..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-neutral-900 border border-white/10 px-4 py-3 text-xs tracking-widest text-white w-full focus:outline-none focus:brand-green-border rounded-lg"
              />
            </div>
            {view === 'properties' && (
              <div className="flex items-center space-x-4">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-neutral-900 border border-white/10 px-6 py-3 text-xs tracking-widest text-white focus:outline-none rounded-lg uppercase"
                >
                  <option value="default">Trier par</option>
                  <option value="price-asc">Prix Croissant</option>
                  <option value="price-desc">Prix Décroissant</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {view === 'properties' ? (
            filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            filteredInteriors.map(interior => (
              <InteriorCard key={interior.id} interior={interior} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;