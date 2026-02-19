
import React from 'react';

const About: React.FC = () => {
  const pillars = [
    {
      title: "L'Excellence",
      description: "Nous ne sélectionnons que les propriétés les plus exceptionnelles de Los Santos, répondant aux standards les plus élevés du luxe international."
    },
    {
      title: "La Discrétion",
      description: "La confidentialité de nos clients est notre priorité absolue. Nous opérons avec une élégance et une retenue qui font notre renommée."
    },
    {
      title: "L'Expertise",
      description: "Une connaissance approfondie du marché de Rockford Hills à Vinewood Hills pour garantir la pérennité de vos investissements."
    },
    {
      title: "Le Service",
      description: "Un accompagnement sur-mesure et une disponibilité totale pour transformer chaque projet immobilier en une expérience sereine."
    }
  ];

  return (
    <div className="bg-neutral-950 min-h-screen pt-32 pb-24 text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="text-center max-w-4xl mx-auto">
          <span className="brand-green-text tracking-[0.3em] uppercase text-xs mb-4 block font-bold">Notre Histoire</span>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Dynasty 8 <span className="italic brand-yellow-text">Legacy</span></h1>
          <div className="w-24 h-[2px] brand-green-bg mx-auto mb-12"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
              alt="Architecture de prestige" 
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-neutral-900 p-8 border brand-green-border border-2 rounded-2xl hidden md:block">
              <p className="font-serif text-3xl brand-yellow-text font-bold">20+ Ans</p>
              <p className="text-[10px] uppercase tracking-widest text-white/50">D'expertise à Los Santos</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="brand-yellow-text text-lg leading-relaxed font-serif text-2xl mb-4 italic">L'Art de Vivre l'Exceptionnel.</p>
            <p className="text-white/80 text-lg leading-relaxed">
              Depuis plus de deux décennies, Dynasty 8 s'est imposé comme le leader incontesté de l'immobilier de prestige à Los Santos. Notre agence est née d'une vision simple : offrir l'accès aux lieux les plus exclusifs de la ville avec un niveau de service inégalé.
            </p>
            <p className="text-white/60 leading-relaxed border-l-2 brand-green-border pl-6">
              Spécialisés dans les résidences de luxe, les penthouses vertigineux et les domaines historiques, nous conseillons une clientèle internationale exigeante. Notre héritage repose sur une confiance mutuelle et une quête perpétuelle de la perfection architecturale.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-neutral-900 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-4">Nos Engagements</h2>
            <p className="text-white/40 uppercase tracking-widest text-[10px]">L'ADN de Dynasty 8</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="p-8 bg-neutral-950 border border-white/5 rounded-2xl hover:border-brand-green-border transition-all group">
                <span className="brand-yellow-text font-serif text-3xl mb-4 block opacity-50 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                <h3 className="font-serif text-xl mb-4 group-hover:brand-yellow-text transition-colors">{pillar.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-4xl mb-8">Une Vision Sans Compromis</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Nous croyons que l'immobilier ne se limite pas à des mètres carrés, mais à la création d'un cadre de vie qui reflète vos ambitions.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              Chaque quartier de Los Santos possède sa propre âme, de l'effervescence de Del Perro au calme majestueux de Vinewood Hills. Notre rôle est de trouver l'écrin qui correspondra parfaitement à votre identité.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-[2px] brand-yellow-bg"></div>
              <p className="font-serif italic text-white/90">L'Excellence comme unique horizon.</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200" 
              alt="Intérieur de luxe" 
              className="rounded-3xl shadow-2xl w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;