
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import PropertyDetails from './pages/PropertyDetails';
import Contact from './pages/Contact';
import About from './pages/About';
import DarkWorld from './pages/DarkWorld';
import Employee from './pages/Employee';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-950 selection:bg-[#1E5935] selection:text-white">
      <Navbar />
      
      <main className="transition-all duration-500">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<PropertyDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/darkworld" element={<DarkWorld />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </main>

      <footer className="bg-neutral-950 border-t border-white/5 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-2xl tracking-widest text-white font-bold">DYNASTY</span>
              <span className="font-serif text-2xl tracking-widest brand-yellow-text font-bold">8</span>
            </div>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mt-2">© 2024 Dynasty 8 Real Estate. All rights reserved.</p>
          </div>
          <div className="flex space-x-12">
            <div className="flex flex-col space-y-3">
              <span className="text-[10px] brand-green-text uppercase tracking-widest mb-2">Navigation</span>
              <span className="text-white/50 text-xs uppercase tracking-widest hover:text-[#F2C94C] cursor-pointer">Instagram</span>
              <span className="text-white/50 text-xs uppercase tracking-widest hover:text-[#F2C94C] cursor-pointer">LinkedIn</span>
              <span className="text-white/50 text-xs uppercase tracking-widest hover:text-[#F2C94C] cursor-pointer">YouTube</span>
            </div>
            <div className="flex flex-col space-y-3">
              <span className="text-[10px] brand-green-text uppercase tracking-widest mb-2">Juridique</span>
              <span className="text-white/50 text-xs uppercase tracking-widest hover:text-[#F2C94C] cursor-pointer">Confidentialité</span>
              <span className="text-white/50 text-xs uppercase tracking-widest hover:text-[#F2C94C] cursor-pointer">Mentions Légales</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
