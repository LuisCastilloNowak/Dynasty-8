
import React, { useState, useEffect, useCallback } from 'react';
import { ContactMessage } from '../types';

type EmployeeView = 'dashboard' | 'accounting' | 'appointments' | 'statistics';

interface Agent {
  name: string;
  grade: string;
  phone: string;
}

interface CompanyStats {
  profits: number;
  housesSold: number;
  housesRented: number;
  agents: Agent[];
  lastUpdate: string;
}

const Employee: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeView, setActiveView] = useState<EmployeeView>('dashboard');
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  
  // Statistiques de l'entreprise
  const [stats, setStats] = useState<CompanyStats>({
    profits: 0,
    housesSold: 0,
    housesRented: 0,
    agents: [{ 
      name: "Luis Castillo Nowak", 
      grade: "Patron",
      phone: "(602)570-1373"
    }],
    lastUpdate: 'Jamais synchronisé'
  });
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const CORRECT_PIN = '2209';
  const SHEET_ID = "1sOOq-Ou7xas2Thq1Sr5oY_jdWlYb38PMXyNXNb14sx0";
  const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?usp=sharing`;

  // Fonction pour transformer une feuille Google Sheet en tableau 2D (CSV parse simplifié)
  const fetchSheetData = async (sheetName: string) => {
    try {
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
      const response = await fetch(url);
      const csvText = await response.text();
      // Parsing basique CSV (gestion simplifiée des guillemets)
      return csvText.split('\n').map(row => 
        row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(cell => cell.replace(/^"|"$/g, '').trim())
      );
    } catch (err) {
      console.error(`Erreur lors de la récupération de la feuille ${sheetName}:`, err);
      return [];
    }
  };

  const syncStats = useCallback(async () => {
    setIsLoadingStats(true);
    
    // Récupération de la feuille "Général" pour toutes les statistiques centrales
    const generalData = await fetchSheetData("Général");

    // 1. Bénéfices (Feuille "Général", Case C3 -> index [2][2])
    const profits = generalData.length > 2 ? parseFloat(generalData[2][2]?.replace(/[^0-9.-]+/g, "")) || 0 : 0;

    // 2. Ventes (Feuille "Général", Case B11 -> index [10][1])
    const housesSold = generalData.length > 10 ? parseInt(generalData[10][1]?.replace(/[^0-9]/g, "")) || 0 : 0;

    // 3. Locations (Feuille "Général", Case C11 -> index [10][2])
    const housesRented = generalData.length > 10 ? parseInt(generalData[10][2]?.replace(/[^0-9]/g, "")) || 0 : 0;

    setStats(prev => ({
      ...prev,
      profits,
      housesSold,
      housesRented,
      lastUpdate: new Date().toLocaleString('fr-FR')
    }));
    setIsLoadingStats(false);
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      const storedMessages = localStorage.getItem('d8_contact_messages');
      if (storedMessages) setMessages(JSON.parse(storedMessages));
      syncStats();
    }
  }, [isAuthorized, syncStats]);

  const handleKeyPress = (num: string) => {
    setError(false);
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          setIsAuthorized(true);
        } else {
          setTimeout(() => {
            setError(true);
            setPin('');
          }, 200);
        }
      }
    }
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setPin('');
    setActiveView('dashboard');
  };

  const updateMessageStatus = (id: string, status: 'nouveau' | 'traité') => {
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    setMessages(updated);
    localStorage.setItem('d8_contact_messages', JSON.stringify(updated));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('d8_contact_messages', JSON.stringify(updated));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const pendingMessages = messages.filter(m => m.status !== 'traité');
  const processedMessages = messages.filter(m => m.status === 'traité');

  if (isAuthorized) {
    return (
      <div className="bg-neutral-950 min-h-screen pt-24 text-white font-sans">
        <div className="max-w-[1600px] mx-auto px-6 pb-12">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-12 bg-neutral-900 p-6 rounded-2xl border border-white/5 shadow-2xl">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setActiveView('dashboard')}
                className="flex items-baseline space-x-1 group"
              >
                <span className="font-serif text-2xl tracking-widest text-white font-bold group-hover:brand-yellow-text transition-colors uppercase">DYNASTY</span>
                <span className="font-serif text-3xl tracking-widest brand-yellow-text font-bold group-hover:text-white transition-colors">8</span>
              </button>
              <div className="h-8 w-[1px] bg-white/10"></div>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setActiveView('statistics')}
                  className={`text-[10px] uppercase tracking-widest font-black py-2.5 px-5 rounded-xl transition-all ${activeView === 'statistics' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                >
                  Indicateurs
                </button>
                <button 
                  onClick={() => setActiveView('accounting')}
                  className={`text-[10px] uppercase tracking-widest font-black py-2.5 px-5 rounded-xl transition-all ${activeView === 'accounting' ? 'brand-green-bg text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                >
                  Comptabilité
                </button>
                <button 
                  onClick={() => setActiveView('appointments')}
                  className={`text-[10px] uppercase tracking-widest font-black py-2.5 px-5 rounded-xl transition-all ${activeView === 'appointments' ? 'brand-yellow-bg text-black shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                >
                  Rendez-vous ({pendingMessages.length})
                </button>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-2.5 border border-red-500/50 text-red-500 text-[10px] tracking-widest uppercase font-black hover:bg-red-500 hover:text-white transition-all rounded-xl"
            >
              Déconnexion
            </button>
          </div>

          {activeView === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-page-transition-enter-active">
               <button 
                onClick={() => setActiveView('statistics')}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-white transition-all duration-500 shadow-xl"
              >
                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-20 h-20 bg-neutral-900 rounded-3xl flex items-center justify-center mb-8 border border-white/10 group-hover:border-white transition-colors">
                    <svg className="w-10 h-10 text-white transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-4xl mb-4 text-white">Indicateurs de Performance</h2>
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-black">Bénéfices & Statistiques</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveView('accounting')}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-brand-green-border transition-all duration-500 shadow-xl"
              >
                <div className="absolute inset-0 bg-brand-green-bg/20 group-hover:bg-brand-green-bg/40 transition-colors"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-20 h-20 bg-neutral-900 rounded-3xl flex items-center justify-center mb-8 border border-white/10 group-hover:brand-green-border transition-colors">
                    <svg className="w-10 h-10 brand-green-text transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-4xl mb-4">Comptabilité Générale</h2>
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-black">Gestion des flux financiers et bilans</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveView('appointments')}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-brand-yellow-border transition-all duration-500 shadow-xl"
              >
                <div className="absolute inset-0 bg-brand-yellow-bg/5 group-hover:bg-brand-yellow-bg/10 transition-colors"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-neutral-900 rounded-3xl flex items-center justify-center border border-white/10 group-hover:brand-yellow-border transition-colors">
                      <svg className="w-10 h-10 brand-yellow-text transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {pendingMessages.length > 0 && (
                      <span className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-black animate-pulse shadow-lg ring-4 ring-neutral-950">
                        {pendingMessages.length}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-4xl mb-4">Gestion des Rendez-vous</h2>
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-black">Consultation des demandes clients</p>
                </div>
              </button>
            </div>
          )}

          {activeView === 'statistics' && (
            <div className="animate-page-transition-enter-active space-y-12">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] brand-yellow-text uppercase tracking-[0.4em] font-black mb-1 block">Tableau de bord financier (Direct Sync)</span>
                  <h2 className="font-serif text-5xl text-white">Business Intelligence</h2>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button 
                    onClick={syncStats}
                    disabled={isLoadingStats}
                    className={`flex items-center space-x-3 px-8 py-3 bg-white text-black text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-brand-yellow-bg transition-all ${isLoadingStats ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {isLoadingStats && (
                      <svg className="animate-spin h-3 w-3 text-black" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    <span>{isLoadingStats ? "Synchronisation..." : "Actualiser depuis le Registre"}</span>
                  </button>
                  <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Dernière MaJ : {stats.lastUpdate}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Bénéfices */}
                <div className="bg-neutral-900 p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow-bg opacity-[0.03] -mr-8 -mt-8 rounded-full"></div>
                  <span className="text-[10px] text-white/30 uppercase tracking-widest mb-4 block font-black italic">Bénéfices de l'entreprise</span>
                  <p className="font-serif text-4xl brand-yellow-text font-bold">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(stats.profits)}
                  </p>
                  <div className="mt-6 flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full brand-green-bg"></div>
                    <span className="text-[9px] text-white/20 uppercase font-black tracking-widest">Extrait Général Cellule C3</span>
                  </div>
                </div>

                {/* Ventes */}
                <div className="bg-neutral-900 p-8 rounded-[2rem] border border-white/5">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest mb-4 block font-black italic">Propriétés Vendues</span>
                  <p className="font-serif text-4xl text-white font-bold">{stats.housesSold}</p>
                   <p className="text-[9px] text-brand-green-text uppercase font-black tracking-widest mt-6">Extrait Général Cellule B11</p>
                </div>

                {/* Locations */}
                <div className="bg-neutral-900 p-8 rounded-[2rem] border border-white/5">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest mb-4 block font-black italic">Maisons en Location</span>
                  <p className="font-serif text-4xl text-white font-bold">{stats.housesRented}</p>
                  <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mt-6">Extrait Général Cellule C11</p>
                </div>
              </div>

              {/* RH Section Full Width */}
              <div className="bg-neutral-900/50 p-10 rounded-[2.5rem] border border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-serif text-3xl">Ressources Humaines</h3>
                    <p className="text-white/40 text-sm">Organigramme de direction Dynasty 8.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 mb-1">Direction</p>
                    <p className="text-3xl font-serif text-white font-bold">Actif</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                  {stats.agents.map((agent, i) => (
                    <div key={i} className="flex flex-col md:flex-row items-center justify-between p-8 bg-neutral-950 rounded-[2rem] border border-white/5 hover:border-brand-yellow-border/20 transition-all group">
                      <div className="flex items-center space-x-8 mb-6 md:mb-0">
                        <div className="w-20 h-20 rounded-2xl brand-yellow-bg text-black flex items-center justify-center text-2xl font-black shadow-lg">
                          {agent.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white group-hover:brand-yellow-text transition-colors">{agent.name}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className="text-xs text-brand-green-text uppercase font-black tracking-widest px-3 py-1 bg-brand-green-bg/10 rounded-md border border-brand-green-border/20">{agent.grade}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center md:text-right bg-white/5 p-6 rounded-2xl border border-white/5 w-full md:w-auto">
                        <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-2 italic">Ligne Directe Sécurisée</p>
                        <div className="flex items-center space-x-3 justify-center md:justify-end text-brand-yellow-text font-serif text-2xl">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="tracking-tighter font-bold">{agent.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'accounting' && (
            <div className="w-full bg-white rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(30,89,53,0.2)] border border-brand-green-border h-[80vh] animate-page-transition-enter-active">
              <iframe 
                src={SHEET_URL} 
                className="w-full h-full"
                title="Google Sheets Accounting"
                frameBorder="0"
              />
            </div>
          )}

          {activeView === 'appointments' && (
            <div className="animate-page-transition-enter-active grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              {/* Main List - 3/4 Width */}
              <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xs uppercase tracking-[0.4em] font-black text-white/40">Demandes en attente</h3>
                  <div className="h-[1px] flex-grow mx-8 bg-white/5"></div>
                  <span className="text-[10px] bg-brand-yellow-bg/10 brand-yellow-text px-4 py-1.5 rounded-full font-black border border-brand-yellow-border/20">
                    {pendingMessages.length} DOSSIERS
                  </span>
                </div>
                
                <div className="bg-neutral-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                  <table className="w-full text-left">
                    <thead className="bg-neutral-950/50 border-b border-white/10">
                      <tr>
                        <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-white/30">Date d'émission</th>
                        <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-white/30">Identité Client</th>
                        <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-white/30">Sujet / Motif</th>
                        <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-white/30 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {pendingMessages.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-8 py-24 text-center">
                            <p className="font-serif text-3xl text-white/10 italic mb-2">Le bureau est vide</p>
                            <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Toutes les demandes ont été traitées.</p>
                          </td>
                        </tr>
                      ) : (
                        pendingMessages.map((msg) => (
                          <tr 
                            key={msg.id} 
                            onClick={() => setSelectedMessage(msg)}
                            className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                          >
                            <td className="px-8 py-6 whitespace-nowrap text-[11px] text-white/50 font-medium">{msg.date}</td>
                            <td className="px-8 py-6">
                              <div className="text-sm font-bold text-white group-hover:brand-yellow-text transition-colors">{msg.name}</div>
                              <div className="text-[10px] text-brand-green-text font-black tracking-wider">@{msg.discord}</div>
                            </td>
                            <td className="px-8 py-6">
                              <span className="text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 group-hover:text-white transition-colors">
                                {msg.subject}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex justify-end space-x-6">
                                <button 
                                  onClick={() => updateMessageStatus(msg.id, 'traité')}
                                  className="text-[10px] uppercase font-black brand-green-text hover:text-white transition-all hover:scale-105"
                                >
                                  Traiter
                                </button>
                                <button 
                                  onClick={() => deleteMessage(msg.id)}
                                  className="text-[10px] uppercase font-black text-red-500/60 hover:text-red-500 transition-all hover:scale-105"
                                >
                                  Supprimer
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sidebar - Processed Messages - 1/4 Width */}
              <div className="lg:col-span-1 space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xs uppercase tracking-[0.4em] font-black text-white/40">Archives</h3>
                  <span className="text-[10px] text-white/20 font-black">{processedMessages.length} TRAITÉS</span>
                </div>
                
                <div className="bg-neutral-900/40 border border-white/5 rounded-3xl p-4 min-h-[500px] shadow-inner backdrop-blur-sm">
                  {processedMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-20">
                      <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <p className="text-[10px] uppercase tracking-widest font-black">Historique vide</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {processedMessages.map((msg) => (
                        <div 
                          key={msg.id} 
                          onClick={() => setSelectedMessage(msg)}
                          className="bg-neutral-900 p-5 rounded-2xl border border-white/5 hover:border-brand-green-border/40 transition-all cursor-pointer group relative overflow-hidden"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-[9px] text-white/30 font-bold uppercase">{msg.date}</span>
                            <div className="flex items-center space-x-2">
                               <button 
                                onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
                                title="Supprimer définitivement"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                              <span className="w-2 h-2 rounded-full brand-green-bg shadow-[0_0_8px_rgba(30,89,53,1)]"></span>
                            </div>
                          </div>
                          <p className="text-sm font-bold text-white group-hover:brand-green-text transition-colors mb-1">{msg.name}</p>
                          <p className="text-[9px] text-white/40 uppercase tracking-widest font-black truncate">{msg.subject}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-12 flex items-center justify-between text-white/10 text-[9px] uppercase tracking-[0.5em] font-black border-t border-white/5 pt-8">
            <p>STAFF TERMINAL V.2.5 • DYNASTY 8</p>
            <p>SÉCURITÉ BIOMÉTRIQUE ACTIVÉE</p>
          </div>
        </div>

        {/* Message Detail Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-page-transition-enter-active">
            <div className="bg-neutral-900 w-full max-w-2xl rounded-[2.5rem] border border-brand-yellow-border/20 shadow-[0_0_150px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-neutral-950 px-10 py-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] brand-yellow-text uppercase tracking-[0.4em] font-black mb-1.5 block">Consultation du dossier</span>
                  <h4 className="font-serif text-3xl text-white tracking-tight">{selectedMessage.name}</h4>
                </div>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all hover:rotate-90"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-10 space-y-10">
                <div className="grid grid-cols-2 gap-10">
                  <div className="p-5 bg-neutral-950 rounded-2xl border border-white/5">
                    <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] block mb-3 font-black">Liaison Réseau</span>
                    <p className="brand-green-text font-black text-sm tracking-widest">@{selectedMessage.discord}</p>
                  </div>
                  <div className="p-5 bg-neutral-950 rounded-2xl border border-white/5">
                    <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] block mb-3 font-black">Horodatage</span>
                    <p className="text-white text-sm font-serif italic">{selectedMessage.date}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] block mb-4 font-black">Motif de la sollicitation</span>
                  <p className="text-white font-black text-xs uppercase tracking-[0.2em] bg-brand-yellow-bg/10 brand-yellow-text inline-block px-4 py-2 rounded-xl border border-brand-yellow-border/20 shadow-lg">
                    {selectedMessage.subject}
                  </p>
                </div>

                <div className="bg-neutral-950 p-8 rounded-3xl border border-white/5 relative group">
                  <div className="absolute -top-3 left-8 px-4 bg-neutral-950 text-[9px] text-white/20 uppercase tracking-widest font-black border border-white/5 rounded-full">Message Client</div>
                  <p className="text-white/80 leading-relaxed font-serif text-xl italic whitespace-pre-wrap pt-2">
                    "{selectedMessage.message}"
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-10 py-8 bg-neutral-950 border-t border-white/5 flex justify-between items-center">
                <div className="flex space-x-4">
                  {selectedMessage.status !== 'traité' ? (
                    <button 
                      onClick={() => updateMessageStatus(selectedMessage.id, 'traité')}
                      className="brand-green-bg text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-125 transition-all shadow-[0_10px_30px_rgba(30,89,53,0.3)] hover:-translate-y-1 active:translate-y-0"
                    >
                      Classer comme traité
                    </button>
                  ) : (
                    <div className="flex items-center space-x-3 text-brand-green-text bg-brand-green-bg/10 px-6 py-4 rounded-2xl border border-brand-green-border/20 shadow-inner">
                      <span className="w-2.5 h-2.5 rounded-full brand-green-bg shadow-[0_0_10px_rgba(30,89,53,1)]"></span>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Demande Traitée</span>
                    </div>
                  )}
                  <button 
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="border border-red-500/20 text-red-500/60 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
                  >
                    Supprimer le dossier
                  </button>
                </div>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="text-white/20 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
                >
                  Quitter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green-bg blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm text-center">
        <div className="mb-12 flex flex-col items-center">
          <div className="w-16 h-16 border-2 brand-yellow-border flex items-center justify-center mb-6 rotate-45 group transition-transform hover:rotate-0">
            <svg className="w-8 h-8 brand-yellow-text -rotate-45 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl text-white mb-2 tracking-tight">Accès Restreint</h2>
          <p className="text-[10px] brand-green-text uppercase tracking-[0.3em] font-black">Staff Dynasty 8 Uniquement</p>
        </div>

        {/* PIN Indicators */}
        <div className="flex justify-center space-x-6 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                error ? 'border-red-500 animate-bounce' : 
                pin.length > i ? 'brand-yellow-bg border-brand-yellow-border scale-125' : 'border-white/10'
              }`}
            ></div>
          ))}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              className="w-full aspect-square flex items-center justify-center text-xl font-serif text-white/80 border border-white/5 bg-white/5 rounded-2xl hover:brand-yellow-border hover:brand-yellow-text hover:bg-brand-yellow-bg/10 transition-all active:scale-90"
            >
              {num}
            </button>
          ))}
          <button 
            onClick={handleClear}
            className="w-full aspect-square flex items-center justify-center text-[10px] tracking-widest uppercase text-white/30 hover:text-white transition-colors"
          >
            CLR
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="w-full aspect-square flex items-center justify-center text-xl font-serif text-white/80 border border-white/5 bg-white/5 rounded-2xl hover:brand-yellow-border hover:brand-yellow-text hover:bg-brand-yellow-bg/10 transition-all active:scale-90"
          >
            0
          </button>
          <div className="w-full aspect-square flex items-center justify-center">
            {/* Empty space for grid alignment */}
          </div>
        </div>

        {error && (
          <p className="mt-8 text-red-500 text-[10px] uppercase tracking-widest font-black animate-pulse">
            Code Incorrect. Accès Refusé.
          </p>
        )}
      </div>
    </div>
  );
};

export default Employee;
