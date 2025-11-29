import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { ChartDataPoint } from '../types';

const craterData: ChartDataPoint[] = [
  { name: 'Meteor Crater (AZ)', value: 1.2, unit: 'km', description: 'Small simple crater' },
  { name: 'Ries Crater', value: 24, unit: 'km', description: 'Impact in Germany' },
  { name: 'Popigai', value: 100, unit: 'km', description: 'Diamonds found here' },
  { name: 'Chicxulub', value: 180, unit: 'km', description: 'The Dino Killer' },
  { name: 'Vredefort', value: 300, unit: 'km', description: 'Oldest & Largest' },
];

const energyData: ChartDataPoint[] = [
  { name: 'Hiroshima Bomb', value: 0.015, unit: 'MT', description: '15 Kilotons' },
  { name: 'Tsar Bomba', value: 50, unit: 'MT', description: 'Largest Nuke' },
  { name: 'Krakatoa', value: 200, unit: 'MT', description: 'Volcanic Eruption' },
  { name: 'Chicxulub', value: 100000000, unit: 'MT', description: 'Impact Energy' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-space-800 border border-slate-600 p-4 rounded-lg shadow-xl">
        <p className="font-bold text-white mb-1">{label}</p>
        <p className="text-impact-500 font-mono text-lg">{data.value.toLocaleString()} {data.unit}</p>
        <p className="text-slate-400 text-xs mt-1">{data.description}</p>
      </div>
    );
  }
  return null;
};

const DataViz: React.FC = () => {
  return (
    <section id="science" className="py-24 bg-space-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Comparative Scale</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            It is hard to comprehend the scale of the event without comparing it to other known geological and human-made phenomena.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Crater Size Chart */}
          <div className="bg-space-800/50 p-6 rounded-2xl border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Crater Diameter (km)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={craterData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="name" type="category" width={100} stroke="#f8fafc" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#334155', opacity: 0.4}} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {craterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'Chicxulub' ? '#ef4444' : '#64748b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Energy Output Chart (Log Scale Conceptually handled by simple relative bars for visual impact, not literal log scale here to avoid confusing non-scientists, but demonstrating magnitude) */}
          <div className="bg-space-800/50 p-6 rounded-2xl border border-slate-700/50">
             <h3 className="text-xl font-semibold text-white mb-2 text-center">Energy Release (Megatons TNT)</h3>
             <p className="text-xs text-center text-slate-500 mb-6">Note: Scale is logarithmic for visualization</p>
             <div className="space-y-6">
                {energyData.map((item, idx) => {
                   // Calculate a width percentage based on a log-like scale for visualization
                   const logVal = Math.log10(item.value);
                   const maxLog = Math.log10(100000000);
                   const minLog = Math.log10(0.01); 
                   // normalize roughly
                   let width = ((logVal - minLog) / (maxLog - minLog)) * 100;
                   if (width < 5) width = 5;

                   return (
                     <div key={idx} className="relative">
                        <div className="flex justify-between text-sm text-slate-300 mb-1">
                          <span>{item.name}</span>
                          <span className="font-mono text-slate-400">{item.value.toLocaleString()} {item.unit}</span>
                        </div>
                        <div className="h-4 w-full bg-slate-700 rounded-full overflow-hidden">
                           <div 
                              className={`h-full rounded-full ${item.name === 'Chicxulub' ? 'bg-gradient-to-r from-orange-500 to-red-600 animate-pulse' : 'bg-blue-500'}`}
                              style={{ width: `${width}%` }}
                           ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                     </div>
                   )
                })}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataViz;