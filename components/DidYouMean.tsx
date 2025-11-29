import React from 'react';
import { Search, Globe2 } from 'lucide-react';

const DidYouMean: React.FC = () => {
  return (
    <section className="py-16 bg-space-800 border-t border-slate-700 border-b border-slate-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-space-700/50 rounded-2xl p-8 border border-slate-600 flex flex-col md:flex-row gap-8 items-center">
          
          <div className="flex-shrink-0 bg-impact-600/20 p-6 rounded-full border border-impact-600/50">
             <Search size={48} className="text-impact-500" />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-3">Looking for "Chicks Club"?</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              You are not alone! Thousands of people (especially in India) search for <strong>Chicks Club</strong> when they actually mean <em>Chicxulub</em>, the massive asteroid crater.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              The name <strong>Chicxulub</strong> (pronounced <em>Cheek-shoo-loob</em>) is Mayan for "Tail of the Devil". While we aren't a club, we are the definitive guide to the <strong>Chicxulub Impactor</strong>—the city-sized asteroid that caused the dinosaur extinction.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-3 py-1 bg-space-900 rounded-full text-xs text-slate-500 border border-slate-700">#ChicksClub</span>
              <span className="px-3 py-1 bg-space-900 rounded-full text-xs text-slate-500 border border-slate-700">#Chicxulub</span>
              <span className="px-3 py-1 bg-space-900 rounded-full text-xs text-slate-500 border border-slate-700">#ChicksClubAsteroid</span>
              <span className="px-3 py-1 bg-space-900 rounded-full text-xs text-slate-500 border border-slate-700">#DinosaurExtinction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DidYouMean;