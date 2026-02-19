
import React, { useEffect, useRef, useState } from 'react';

// Extension globale pour l'API YouTube
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const DarkWorld: React.FC = () => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showVolume, setShowVolume] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ID Officiel : OGF7UzaZEbI (Dark World - Gangstrait)
  const VIDEO_ID = "OGF7UzaZEbI";
  const YOUTUBE_URL = "https://www.youtube.com/watch?v=OGF7UzaZEbI";
  const DARKWORLD_LOGO = "https://www.darkworld.fr/storage/img/website-logo.png";

  useEffect(() => {
    let checkInterval: any;

    const createPlayer = () => {
      if (playerRef.current || !window.YT || !window.YT.Player) return;
      
      try {
        playerRef.current = new window.YT.Player('youtube-audio-engine', {
          height: '1',
          width: '1',
          videoId: VIDEO_ID,
          host: 'https://www.youtube-nocookie.com', // Domaine plus flexible pour l'intégration
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            origin: window.location.origin,
            enablejsapi: 1,
            widget_referrer: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              setIsApiReady(true);
              event.target.setVolume(volume);
              console.log("YouTube Engine: Ready");
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setError(null);
              }
              if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
              if (event.data === window.YT.PlayerState.ENDED) event.target.playVideo();
            },
            onError: (e: any) => {
              console.error("YouTube Player Error:", e.data);
              // 150/101 = L'auteur interdit l'intégration. On essaie de bypass ou on prévient.
              if (e.data === 150 || e.data === 101) {
                setError("RESTRICTION YOUTUBE DÉTECTÉE.");
              } else {
                setError("ERREUR DE FLUX AUDIO.");
              }
            }
          },
        });
      } catch (err) {
        console.error("Failed to initialize YT Player:", err);
        setError("ÉCHEC DU MOTEUR AUDIO.");
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }

    // Sécurité supplémentaire pour l'initialisation
    checkInterval = setInterval(() => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        createPlayer();
        if (playerRef.current) clearInterval(checkInterval);
      }
    }, 500);

    return () => {
      clearInterval(checkInterval);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  const handleStartImmersion = () => {
    if (!playerRef.current || !isApiReady) {
      // Si pas encore prêt, on attend un peu
      setError("MOTEUR EN COURS DE CHARGEMENT...");
      setTimeout(handleStartImmersion, 1000);
      return;
    }

    try {
      setError(null);
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
      playerRef.current.playVideo();
      setHasInteracted(true);
      setIsPlaying(true);
    } catch (err) {
      console.error("Échec activation sonore:", err);
      setError("ERREUR D'INTERACTION.");
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current || !isApiReady) return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (playerRef.current && isApiReady) {
      playerRef.current.setVolume(newVolume);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-32 pb-24 text-white overflow-hidden relative">
      {/* Moteur Audio Technique - Taille réduite au minimum */}
      <div 
        className="fixed pointer-events-none" 
        style={{ 
          left: '-10px', 
          top: '-10px', 
          width: '1px', 
          height: '1px',
          opacity: 0.001 
        }}
      >
        <div id="youtube-audio-engine"></div>
      </div>

      {/* Message d'erreur élégant */}
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[80] bg-red-600/80 backdrop-blur-md border border-red-500/50 px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-black animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.4)]">
          {error}
        </div>
      )}

      {/* Interface de contrôle flottante */}
      <div className="fixed bottom-10 right-10 z-[70] flex flex-col items-center space-y-6">
        <div className={`relative transition-all duration-700 flex flex-col items-center bg-neutral-900/95 backdrop-blur-3xl p-5 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] ${showVolume ? 'h-52 opacity-100 translate-y-0' : 'h-0 opacity-0 translate-y-10 pointer-events-none'}`}>
          <input type="range" min="0" max="100" orient="vertical" value={volume} onChange={handleVolumeChange} className="appearance-none w-1.5 h-36 bg-neutral-800 rounded-full cursor-pointer accent-[#F2C94C]" style={{ WebkitAppearance: 'slider-vertical' } as any} />
          <span className="text-[10px] brand-yellow-text mt-4 font-black tracking-tighter">{volume}%</span>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button onClick={(e) => { e.stopPropagation(); setShowVolume(!showVolume); }} className={`w-14 h-14 rounded-full bg-neutral-900/90 border border-white/10 flex items-center justify-center transition-all duration-300 shadow-xl ${showVolume ? 'brand-yellow-text scale-110 border-brand-yellow-border' : 'text-white/40 hover:text-white'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          </button>
          
          <button onClick={toggleAudio} className={`relative flex items-center justify-center w-24 h-24 rounded-full border-2 transition-all duration-700 ${isPlaying ? 'brand-green-border brand-green-bg shadow-[0_0_60px_rgba(30,89,53,0.7)]' : 'brand-yellow-border bg-transparent shadow-[0_0_40px_rgba(242,201,76,0.4)]'} hover:scale-110 active:scale-90`}>
            {isPlaying ? <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> : <svg className="w-10 h-10 brand-yellow-text translate-x-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>}
            {isPlaying && <div className="absolute -top-20 flex items-end space-x-1.5 h-16 pointer-events-none">{[1, 2, 3, 4, 5, 6, 7].map((i) => (<div key={i} className="w-1.5 brand-yellow-bg animate-bounce rounded-full shadow-[0_0_10px_rgba(242,201,76,0.5)]" style={{ height: `${30 + Math.random() * 70}%`, animationDuration: `${0.2 + Math.random() * 0.5}s`, animationDelay: `${i * 0.08}s` }}></div>))}</div>}
          </button>
        </div>
      </div>

      {/* Overlay de collaboration Dynasty 8 x Darkworld */}
      {!hasInteracted && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#1E5935]/40 blur-[180px] animate-pulse"></div>
          </div>
          
          <div className="text-center max-w-2xl relative z-10 animate-page-transition-enter-active">
            <div className="mb-14 flex items-center justify-center space-x-8 md:space-x-16">
              <div className="w-28 h-28 md:w-36 md:h-36 border-4 brand-green-border rotate-45 flex items-center justify-center shadow-[0_0_100px_rgba(30,89,53,0.6)]">
                <span className="brand-yellow-text font-serif text-6xl md:text-8xl -rotate-45 font-bold tracking-tighter drop-shadow-2xl">D8</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-white/20 font-serif italic text-2xl md:text-4xl mb-2">feat</span>
                <div className="w-12 md:w-16 h-[1px] bg-white/20"></div>
              </div>
              <img 
                src={DARKWORLD_LOGO} 
                className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] animate-pulse" 
                alt="Darkworld Logo" 
              />
            </div>

            <h2 className="font-serif text-5xl md:text-7xl mb-6 brand-yellow-text uppercase tracking-[0.2em] leading-tight font-black">Dynasty 8 <br /><span className="text-white">x</span> DarkWorld</h2>
            <div className="h-[4px] w-32 brand-green-bg mx-auto mb-12 shadow-[0_0_25px_#1E5935]"></div>
            
            <button 
              onClick={handleStartImmersion}
              disabled={!isApiReady && !error}
              className={`w-full py-9 brand-green-bg text-white rounded-3xl font-black tracking-[0.8em] uppercase transition-all duration-700 shadow-[0_0_70px_rgba(30,89,53,0.6)] border border-white/5 text-sm ${(!isApiReady && !error) ? 'opacity-20 cursor-wait' : 'hover:brand-yellow-bg hover:text-black hover:scale-[1.05]'}`}
            >
              {isApiReady ? "Lancer l'Immersion Sonore" : error ? "Réessayer l'Initialisation" : "Initialisation Audio..."}
            </button>
            <p className="mt-8 text-white/40 text-[10px] uppercase tracking-widest font-bold">Le son sera activé à 100% lors du clic.</p>
          </div>
        </div>
      )}

      {/* Ambiance Visuelle */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] bg-[#1E5935]/15 blur-[220px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[1000px] h-[1000px] bg-[#F2C94C]/10 blur-[220px] rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-32">
          <div className="flex items-center justify-center space-x-12 mb-16">
            <div className="relative">
              <div className="w-24 h-24 border-t-8 border-l-8 brand-green-border rotate-45 transform origin-bottom-right shadow-2xl"></div>
              <div className="absolute -top-10 -right-14 w-16 h-16 brand-yellow-bg rounded-full opacity-80 blur-2xl animate-pulse"></div>
            </div>
            <span className="text-white/10 font-serif italic text-3xl">x</span>
            <img 
              src={DARKWORLD_LOGO} 
              className="w-24 h-24 object-contain opacity-70 hover:opacity-100 transition-opacity drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
              alt="Darkworld Logo" 
            />
          </div>

          <span className="brand-yellow-text tracking-[1em] uppercase text-xs mb-10 block font-black animate-pulse">Exclusivité Mondiale : Dynasty 8 x Darkworld</span>
          <h1 className="font-serif text-8xl md:text-11xl mb-10 text-white leading-none font-black tracking-tighter">
            DarkWorld <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E5935] via-[#F2C94C] to-white italic">la ville en feu</span>
          </h1>
          <div className="w-64 h-[5px] bg-gradient-to-r from-transparent via-[#F2C94C] to-transparent mx-auto shadow-[0_0_30px_rgba(242,201,76,0.5)]"></div>
        </div>

        {/* Paroles / Texte d'ambiance */}
        <div className="space-y-24 font-serif text-3xl md:text-5xl leading-relaxed text-white/95 italic font-medium">
          <section className="border-l-[12px] brand-green-border pl-14 py-12 bg-white/5 backdrop-blur-2xl rounded-r-[50px] shadow-2xl transition-all hover:bg-white/10 group cursor-default border-t border-r border-white/5">
            <p className="group-hover:text-white transition-all duration-700">
              Dark World, la ville est en feu. La police patrouille, mais les gangs sont nerveux. 
              Trafic en bas des blocs, ça brasse des euros. Les sirènes résonnent, mais personne ne fait le héros. 
              La LSPD fait tout son possible, mais ici, les balles pleuvent, la guerre est terrible. 
              L'organisation gangstrait a tout niqué. La rue décide, faut pas te faire choper.
            </p>
          </section>

          <section className="border-l-[12px] brand-yellow-border pl-14 py-12 bg-white/5 backdrop-blur-2xl rounded-r-[50px] shadow-2xl transition-all hover:bg-white/10 group cursor-default border-t border-r border-white/5">
            <p className="group-hover:text-white transition-all duration-700">
              C'est Dark World, la nuit est folle. Course-poursuite, les moteurs hurlent. 
              Des faits du sale, l'ambiance carnage, le staff actif, jamais en panne. 
              À toute vitesse dans la ville on roule, les sirènes hurlent, mais personne ne s'écroule. 
              Des alliances se font, des trahisons tombent. Un faux pas, et c'est toi qui plonges.
            </p>
          </section>

          <section className="border-l-[12px] brand-green-border pl-14 py-12 bg-[#1E5935]/10 backdrop-blur-2xl rounded-r-[50px] shadow-2xl transition-all hover:bg-[#1E5935]/20 group cursor-default border border-white/10">
            <p className="group-hover:text-white transition-all duration-700">
              Ici, tout peut arriver. T'as les flics aux trousses ou un plan pour briller. 
              Prends ton rôle, impose ton style. Dark World, c'est la jungle, bienvenue en ville. 
              C'est Dark World, la nuit est folle. Course-poursuite, les moteurs hurlent. 
              Des faits du sale, ambiance carnage. Le staff actif, jamais en panne.
            </p>
          </section>

          <section className="border-l-[12px] brand-yellow-border pl-14 py-12 bg-white/5 backdrop-blur-3xl rounded-r-[50px] shadow-2xl transition-all hover:bg-white/10 group cursor-default border border-white/10">
            <p className="brand-yellow-text group-hover:brightness-150 transition-all duration-700 font-black drop-shadow-[0_0_15px_rgba(242,201,76,0.5)]">
              C'est Dark World, la nuit est folle. Course-poursuite, les moteurs hurlent. 
              Des loups, j'ai fait du sale, l'ambiance carnage. Le staff actif, jamais en panne. 
              C'est Dark World, la nuit est folle. Course-poursuite, les moteurs hurlent. 
              Des loups, j'ai fait du sale, l'ambiance carnage. Le staff actif, jamais en panne.
            </p>
          </section>
        </div>

        <div className="mt-56 text-center pb-40">
          <a 
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 md:px-24 py-10 rounded-[2.5rem] text-black font-black tracking-[0.4em] uppercase bg-gradient-to-r from-[#1E5935] via-[#F2C94C] to-[#1E5935] transition-all duration-700 text-lg md:text-xl shadow-[0_0_80px_rgba(242,201,76,0.3)] hover:shadow-[0_0_120px_rgba(242,201,76,0.5)] hover:scale-105 active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10 drop-shadow-md">REJOINDRE L'ÉLITE FEAT. DARKWORLD</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]"></div>
          </a>
          
          <div className="mt-20">
            <p className="text-[14px] text-white/30 uppercase tracking-[1em] font-black leading-loose">
              SÉCURISÉ PAR DYNASTY 8 GLOBAL<br />
              NETWORKS & DARKWORLD<br />
              INFRASTRUCTURE
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default DarkWorld;
