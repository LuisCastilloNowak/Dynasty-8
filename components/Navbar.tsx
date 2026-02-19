
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Catalogue', path: '/catalog' },
    { name: 'DARKWORLD', path: '/darkworld' },
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Employé', path: '/employee' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 ${
        isScrolled ? 'bg-neutral-950/90 backdrop-blur-md border-b brand-green-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex flex-col group">
          <div className="flex items-baseline space-x-1">
            <span className="font-serif text-2xl tracking-widest text-white font-bold group-hover:text-white transition-colors">DYNASTY</span>
            <span className="font-serif text-3xl tracking-widest brand-yellow-text font-bold">8</span>
          </div>
          <span className="text-[10px] tracking-[0.3em] brand-green-text uppercase -mt-1 font-semibold">Real Estate Excellence</span>
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`text-sm tracking-widest uppercase transition-colors duration-300 hover:text-[#F2C94C] ${
                location.pathname === link.path ? 'brand-yellow-text font-bold' : 'text-white'
              } ${link.name === 'Employé' ? 'opacity-30 hover:opacity-100 text-[10px]' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="px-6 py-2 border brand-green-border brand-green-text text-sm tracking-widest uppercase hover:brand-yellow-bg hover:brand-yellow-border hover:text-black transition-all duration-300 rounded-lg font-bold"
          >
            Estimation
          </Link>
        </div>

        <button className="md:hidden text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
