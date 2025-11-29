import React from 'react';
import { Clock, AlertTriangle, Zap, Skull, Sprout } from 'lucide-react';
import { TimelineEvent } from '../types';

const events: TimelineEvent[] = [
  {
    id: 1,
    time: "T-Minus 10 Seconds",
    title: "Atmospheric Entry",
    description: "The asteroid enters Earth's atmosphere at 20 kilometers per second (45,000 mph). It compresses the air in front of it so violently that it glows brighter than the sun.",
    icon: "alert"
  },
  {
    id: 2,
    time: "T-Zero (Impact)",
    title: "The Impact",
    description: "Contact with the shallow waters of the Yucatan Peninsula. The energy released is equivalent to 100 million megatons of TNT. A transient crater 100km wide and 30km deep forms in seconds.",
    icon: "zap"
  },
  {
    id: 3,
    time: "T-Plus 1 Minute",
    title: "The Ejecta Curtain",
    description: "Vaporized rock and water are blasted into orbit. A wall of debris spreads outward. Thermal radiation from the re-entering ejecta will soon ignite wildfires globally.",
    icon: "clock"
  },
  {
    id: 4,
    time: "T-Plus 10 Hours",
    title: "Tsunami & Earthquakes",
    description: "Mega-tsunamis over 100 meters tall hit coastlines worldwide. Magnitude 10+ earthquakes rock the planet, triggering secondary landslides and volcanic eruptions.",
    icon: "alert"
  },
  {
    id: 5,
    time: "T-Plus 1 Year",
    title: "The Impact Winter",
    description: "Dust and sulfur aerosols block sunlight, dropping global temperatures by 20°C (36°F). Photosynthesis halts. The food web collapses from the bottom up.",
    icon: "skull"
  },
  {
    id: 6,
    time: "T-Plus 1 Million Years",
    title: "Recovery",
    description: "The ecosystems begin to stabilize. With dinosaurs gone, mammals—previously small and nocturnal—begin to diversify and grow larger to fill empty niches.",
    icon: "sprout"
  }
];

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-24 bg-space-800 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Timeline of Destruction</h2>
          <div className="h-1 w-24 bg-impact-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400">From seconds to millennia</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-600 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={event.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content Box */}
                <div className="w-full md:w-5/12 p-6 bg-space-700/50 backdrop-blur-sm border border-slate-600 rounded-xl hover:border-impact-500/50 transition-colors duration-300 ml-12 md:ml-0 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-impact-500 bg-impact-500/10 px-2 py-1 rounded">
                      {event.time}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {event.description}
                  </p>
                </div>

                {/* Icon Marker */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-space-900 border-4 border-impact-500 flex items-center justify-center z-10">
                   {event.icon === 'zap' && <Zap size={12} className="text-white" />}
                   {event.icon === 'alert' && <AlertTriangle size={12} className="text-white" />}
                   {event.icon === 'clock' && <Clock size={12} className="text-white" />}
                   {event.icon === 'skull' && <Skull size={12} className="text-white" />}
                   {event.icon === 'sprout' && <Sprout size={12} className="text-white" />}
                </div>

                {/* Empty Space for alignment */}
                <div className="w-full md:w-5/12 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;