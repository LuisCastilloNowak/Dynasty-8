
import React from 'react';
import { Link } from 'react-router-dom';
import { PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';

const Home: React.FC = () => {
  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom" 
          alt="Luxury Home" 
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            Redéfinir le <br /> <span className="brand-yellow-text italic">Prestige</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light tracking-widest uppercase mb-10 max-w-2xl mx-auto">
            Dynasty 8 : L'art de vivre l'exceptionnel au cœur de Los Santos.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link 
              to="/catalog" 
              className="w-full md:w-auto px-12 py-4 brand-yellow-bg text-black font-bold tracking-widest uppercase hover:bg-white transition-colors rounded-lg shadow-lg hover:shadow-brand-yellow-bg/20"
            >
              Découvrir nos offres
            </Link>
            <Link 
              to="/contact" 
              className="w-full md:w-auto px-12 py-4 border-2 brand-green-border text-white font-bold tracking-widest uppercase hover:bg-[#1E5935] transition-all rounded-lg"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[2px] h-12 brand-green-bg"></div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="mb-6 md:mb-0">
            <span className="brand-green-text tracking-[0.3em] uppercase text-xs mb-2 block font-bold">Exclusivités</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Nos Propriétés Phares</h2>
          </div>
          <Link to="/catalog" className="group flex items-center brand-yellow-text space-x-2 text-sm uppercase tracking-widest hover:text-white transition-colors">
            <span>Explorer tout le catalogue</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROPERTIES.slice(0, 3).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 text-center bg-neutral-900 px-6 border-t border-white/5">
        <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">Votre futur commence ici.</h2>
        <Link 
          to="/contact" 
          className="inline-block px-12 py-5 border-2 brand-yellow-border brand-yellow-text uppercase tracking-widest font-bold hover:brand-yellow-bg hover:text-black transition-all duration-300 rounded-lg"
        >
          Planifier une visite privée
        </Link>
      </section>
    </div>
  );
};

export default Home;
