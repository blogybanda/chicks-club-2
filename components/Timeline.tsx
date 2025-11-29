import React, { useEffect, useRef, useState } from 'react';
import { Clock, AlertTriangle, Zap, Skull, Sprout, Flame, Waves } from 'lucide-react';
import { TimelineEvent } from '../types';

// Simplified, storytelling-focused data for better accessibility
const events: TimelineEvent[] = [
  {
    id: 1,
    time: "Seconds Before",
    title: "The Fire in the Sky",
    description: "A rock the size of a city (10km wide) slams into the atmosphere at 45,000 mph. It compresses the air so violently that the sky glows brighter than the sun.",
    icon: "fire"
  },
  {
    id: 2,
    time: "The Impact",
    title: "The Global Killshot",
    description: "It hits Mexico with the force of 100 million nuclear bombs. In a split second, it punches a hole 18 miles deep into the Earth's crust.",
    icon: "zap"
  },
  {
    id: 3,
    time: "Minutes Later",
    title: "The Rain of Liquid Glass",
    description: "Molten rock is blasted into space, cools into glass beads, and rains back down. This turns the atmosphere into a pizza oven, igniting forests all over the world.",
    icon: "flame"
  },
  {
    id: 4,
    time: "Hours Later",
    title: "Megatsunamis",
    description: "Waves over 300 feet tall—the height of a 30-story building—radiate outward, smashing into coastlines across the globe.",
    icon: "waves"
  },
  {
    id: 5,
    time: "Months Later",
    title: "The Long Dark",
    description: "Soot and dust block out the sun completely. Temperatures crash. Without sunlight, plants die, then the plant-eaters, then the meat-eaters.",
    icon: "skull"
  },
  {
    id: 6,
    time: "1 Million Years Later",
    title: "The Rise of Mammals",
    description: "With the dinosaurs gone, small furry creatures (our ancestors) crawl out of their burrows to reclaim a green, recovering Earth.",
    icon: "sprout"
  }
];

const TimelineItem: React.FC<{ event: TimelineEvent; index: number }> = ({ event, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 } // Trigger when 15% visible
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    const isEven = index % 2 === 0;

    // Dynamic Icon Selection
    const getIcon = (type: string | undefined) => {
        switch(type) {
            case 'fire': return <Flame className="w-5 h-5 text-orange-500" />;
            case 'flame': return <AlertTriangle className="w-5 h-5 text-red-500" />; 
            case 'zap': return <Zap className="w-5 h-5 text-yellow-400" />;
            case 'waves': return <Waves className="w-5 h-5 text-blue-400" />;
            case 'skull': return <Skull className="w-5 h-5 text-gray-400" />;
            case 'sprout': return <Sprout className="w-5 h-5 text-green-400" />;
            default: return <Clock className="w-5 h-5 text-white" />;
        }
    };

    return (
        <div 
            ref={ref}
            className={`flex flex-col md:flex-row items-center justify-between w-full mb-16 relative transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
            } ${isEven ? 'md:flex-row-reverse' : ''}`}
        >
             {/* Center Line Dot */}
            <div className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 z-10 transform -translate-x-1/2 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-500 ${isVisible ? 'bg-space-900 border-impact-500' : 'bg-space-800 border-slate-600'}`}>
                <div className={`w-2 h-2 rounded-full ${isVisible ? 'bg-white animate-pulse' : 'bg-slate-600'}`}></div>
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className={`group relative p-6 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-space-800/90 to-space-900/90 backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-impact-500/30 transition-all duration-500 ${
                    isVisible ? 'scale-100' : 'scale-95'
                }`}>
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-impact-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-space-950 border border-slate-800 shadow-inner">
                                {getIcon(event.icon)}
                            </div>
                            <span className="text-xs font-bold tracking-widest text-impact-500 uppercase bg-impact-500/10 px-2 py-1 rounded">
                                {event.time}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">
                            {event.title}
                        </h3>
                        
                        <p className="text-slate-300 leading-relaxed text-base font-light">
                            {event.description}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Empty space for the other side on desktop to maintain alignment */}
            <div className="hidden md:block w-[45%]"></div>
        </div>
    );
};

// Main Component
const Timeline: React.FC = () => {
    return (
        <section id="timeline" className="py-24 bg-space-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-800/20 via-space-900 to-space-900 pointer-events-none"></div>
            
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                 {/* Header */}
                 <div className="text-center mb-24">
                     <div className="inline-block mb-3 px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest">
                        History of Earth
                     </div>
                     <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-white to-blue-200 mb-6 drop-shadow-sm">
                         The Day Earth Burned
                     </h2>
                     <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                         66 million years ago, the world changed in a single day. <br className="hidden md:block"/>Here is the play-by-play of the extinction event.
                     </p>
                 </div>

                 <div className="relative">
                     {/* The Vertical Connecting Line */}
                     {/* Gradient runs from Hot (Start) to Cold (End) */}
                     <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-red-600 to-slate-700 transform md:-translate-x-1/2 opacity-40 rounded-full"></div>

                     {/* Events Loop */}
                     <div className="space-y-4">
                         {events.map((event, index) => (
                             <TimelineItem key={event.id} event={event} index={index} />
                         ))}
                     </div>
                 </div>
            </div>
        </section>
    );
}

export default Timeline;