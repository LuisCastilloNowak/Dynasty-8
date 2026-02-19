
import React, { useState } from 'react';
import { ContactMessage } from '../types';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    discord: '',
    subject: "Acquisition d'un bien",
    message: ''
  });

  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1473314727227818119/rvi6GL8MjSIT6ls0wjq8Iuwan7Qt1L9DDq3We0dwHu0-Yc1PJ-wE4SVGMIxRsDHJ2lJU";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const dateStr = new Date().toLocaleString('fr-FR');

    // 1. Enregistrement local pour l'espace employé (Persistance via localStorage)
    const newMessage: ContactMessage = {
      id: Math.random().toString(36).substr(2, 9),
      name: fullName,
      discord: formData.discord,
      subject: formData.subject,
      message: formData.message,
      date: dateStr,
      status: 'nouveau'
    };

    const existingMessages = JSON.parse(localStorage.getItem('d8_contact_messages') || '[]');
    localStorage.setItem('d8_contact_messages', JSON.stringify([newMessage, ...existingMessages]));

    // 2. Envoi vers le Webhook Discord
    try {
      const discordPayload = {
        username: "Dynasty 8 Conciergerie",
        avatar_url: "https://www.darkworld.fr/storage/img/website-logo.png",
        embeds: [{
          title: "🏛️ Nouvelle Demande de Contact",
          color: 15911244, // #F2C94C
          fields: [
            { name: "👤 Client", value: fullName, inline: true },
            { name: "🎮 Discord", value: formData.discord, inline: true },
            { name: "📋 Sujet", value: formData.subject, inline: false },
            { name: "💬 Message", value: formData.message || "Aucun message", inline: false }
          ],
          footer: { text: `Dynasty 8 • ${dateStr}` },
          timestamp: new Date().toISOString()
        }]
      };

      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload)
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi Discord:", error);
    } finally {
      setIsSending(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <span className="brand-green-text tracking-[0.3em] uppercase text-xs mb-2 block font-bold">Liaison Privée</span>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-8">Contactez <br />Dynasty 8</h1>
            <p className="text-white/60 text-lg leading-relaxed mb-12">
              Que vous souhaitiez acquérir une résidence d'exception ou faire estimer votre bien par nos experts, notre équipe est à votre entière disposition.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="brand-yellow-text text-xs tracking-widest uppercase mb-2 font-bold">Siège Social</h3>
                <p className="text-white text-lg font-serif">882 West Rockford Drive, <br />Rockford Hills, Los Santos</p>
              </div>
              <div>
                <h3 className="brand-yellow-text text-xs tracking-widest uppercase mb-2 font-bold">Communications</h3>
                <a href="https://discord.gg/mQjRWArs" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-serif block hover:text-[#F2C94C] transition-colors">https://discord.gg/mQjRWArs</a>
                <p className="text-white text-lg font-serif">(602)570-1373</p>
              </div>
              <div>
                <h3 className="brand-yellow-text text-xs tracking-widest uppercase mb-2 font-bold">Heures de Réception</h3>
                <p className="text-white/60 text-sm">Disponibilité selon présence en ville ou via système de tickets.</p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 p-8 md:p-12 border border-brand-green-border border-2 relative rounded-2xl shadow-2xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-2 brand-yellow-border rounded-full flex items-center justify-center mb-6">
                  <span className="brand-yellow-text text-2xl">✓</span>
                </div>
                <h3 className="font-serif text-3xl text-white mb-4">Message Transmis</h3>
                <p className="text-white/60 tracking-widest uppercase text-xs">Un conseiller vous contactera dans les plus brefs délais via Discord.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs brand-yellow-text uppercase tracking-widest border-b brand-yellow-border pb-1"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-3xl text-white mb-8">Formulaire de Contact</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] text-white/30 tracking-widest uppercase mb-2 block font-bold">Prénom</label>
                      <input 
                        required
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-neutral-950 border-b-2 brand-green-border px-2 py-3 text-white focus:outline-none focus:brand-yellow-border transition-colors rounded-t-lg"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/30 tracking-widest uppercase mb-2 block font-bold">Nom</label>
                      <input 
                        required
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full bg-neutral-950 border-b-2 brand-green-border px-2 py-3 text-white focus:outline-none focus:brand-yellow-border transition-colors rounded-t-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 tracking-widest uppercase mb-2 block font-bold">Discord (Identifiant)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="exemple#0000"
                      value={formData.discord}
                      onChange={(e) => setFormData({...formData, discord: e.target.value})}
                      className="w-full bg-neutral-950 border-b-2 brand-green-border px-2 py-3 text-white focus:outline-none focus:brand-yellow-border transition-colors rounded-t-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 tracking-widest uppercase mb-2 block font-bold">Sujet de votre demande</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-neutral-950 border-b-2 brand-green-border px-2 py-3 text-white focus:outline-none focus:brand-yellow-border appearance-none rounded-t-lg"
                    >
                      <option>Acquisition d'un bien</option>
                      <option>Estimation de propriété</option>
                      <option>Demande de location</option>
                      <option>Demande d'information diverses</option>
                      <option>Demande d'information sur un garage</option>
                      <option>Presse et partenariats</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 tracking-widest uppercase mb-2 block font-bold">Votre Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-neutral-950 border border-white/10 p-4 text-white focus:outline-none focus:brand-green-border mt-2 transition-colors rounded-lg"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSending}
                    className={`w-full brand-yellow-bg text-black py-5 uppercase tracking-widest text-sm font-bold hover:bg-white transition-all transform hover:-translate-y-1 rounded-lg flex items-center justify-center space-x-3 ${isSending ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {isSending ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <span>Envoyer ma Demande</span>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
