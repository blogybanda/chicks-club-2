import React from 'react';
import { ArrowDown, Volume2, Search } from 'lucide-react';

const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-space-900">
      {/* Background Stars - simulated with radial gradients for performance */}
      <div className="absolute inset-0 z-0 opacity-80" 
           style={{
             backgroundImage: 'radial-gradient(white 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
             backgroundSize: '50px 50px, 20px 20px',
             backgroundPosition: '0 0, 25px 25px'
           }}>
      </div>

      {/* The Asteroid */}
      <div className="absolute z-10 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-stone-400 to-stone-800 shadow-[0_0_100px_rgba(255,100,0,0.3)] animate-float flex items-center justify-center">
        <div className="w-full h-full rounded-full opacity-80 bg-[url('https://picsum.photos/400/400?grayscale&blur=2')] bg-cover mix-blend-overlay"></div>
        <div className="absolute -inset-4 bg-gradient-to-t from-orange-500/30 to-transparent rounded-full blur-xl animate-pulse-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 mb-2 drop-shadow-lg">
          CHICXULUB
        </h1>
        
        {/* Phonetic Helper & SEO Helper */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-6 text-slate-400">
          <div className="bg-space-800/50 inline-flex px-4 py-1 rounded-full backdrop-blur-sm border border-slate-700/50 items-center gap-2">
            <Volume2 size={16} />
            <span className="text-sm font-mono uppercase tracking-widest">Pronounced: cheek-shoo-loob</span>
          </div>
          <div className="bg-space-800/50 inline-flex px-4 py-1 rounded-full backdrop-blur-sm border border-slate-700/50 items-center gap-2">
             <Search size={14} />
             <span className="text-xs text-slate-500">Searching for "Chicks Club"? You found it.</span>
          </div>
        </div>

        <p className="text-xl md:text-2xl text-blue-200 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
          66 million years ago, a rock 10 kilometers wide slammed into Earth, ending the reign of the dinosaurs and paving the way for the rise of mammals.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="#timeline" onClick={(e) => handleScrollTo(e, '#timeline')} className="cursor-pointer px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-full transition-all text-white font-semibold tracking-wide">
              Explore the Event
            </a>
            <a href="#simulator" onClick={(e) => handleScrollTo(e, '#simulator')} className="cursor-pointer px-8 py-3 bg-impact-600 hover:bg-impact-500 text-white rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.7)] transition-all font-semibold tracking-wide">
              Run Simulation
            </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20 text-white/50 cursor-pointer hover:text-white transition-colors"
        onClick={(e) => handleScrollTo(e, '#timeline')}
      >
        <ArrowDown size={32} />
      </div>
      
      {/* Decorative Atmosphere Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-900/40 to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default Hero;