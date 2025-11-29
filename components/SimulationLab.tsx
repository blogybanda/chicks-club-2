import React, { useState } from 'react';
import { SimulationStatus, SimulationResult } from '../types';
import { FlaskConical, PlayCircle, Info } from 'lucide-react';

// Static Data Definitions based on scientific models
const SCENARIOS = [
  {
    id: 'actual',
    title: "Actual Event (Yucatan)",
    description: "The historic impact in shallow water rich in sulfur and gypsum.",
    result: {
      scenario: "Standard Model: 10km asteroid hitting the Yucatan sulfur-rich shelf.",
      outcome: "Catastrophic release of sulfur aerosols caused rapid global cooling (Impact Winter). Photosynthesis halted for years, collapsing the food chain from the bottom up.",
      survivalProbability: 0,
      environmentalEffects: ["Global Cooling (-20°C)", "Acid Rain", "Mega-Tsunamis", "Food Web Collapse"]
    }
  },
  {
    id: 'ocean',
    title: "Deep Ocean Impact",
    description: "What if it hit the deep Pacific Ocean instead?",
    result: {
      scenario: "Deep water impact scenario (5km depth).",
      outcome: "Massive tsunamis would devastate global coastlines, but significantly less rock would be vaporized. Without the sulfur from the Yucatan bedrock, the 'Impact Winter' would be shorter and less severe.",
      survivalProbability: 35,
      environmentalEffects: ["Extreme Tsunamis", "Water Vapor Greenhouse", "Less Acid Rain", "Partial Extinction"]
    }
  },
  {
    id: 'small',
    title: "Smaller Asteroid (1km)",
    description: "What if the asteroid was 1/10th the size?",
    result: {
      scenario: "Impact by a 1km diameter asteroid.",
      outcome: "Significant regional devastation and global cooling (approx 1-2°C). Civilizational collapse level event for humans, but not an extinction-level event for dinosaurs.",
      survivalProbability: 90,
      environmentalEffects: ["Regional Destruction", "Short-term Cooling", "Ozone Depletion", "Harvest Failure"]
    }
  }
];

const SimulationLab: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [simStatus, setSimStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);

  const handleSimulate = (scenarioId: string) => {
    setSimStatus(SimulationStatus.LOADING);
    setSelectedScenario(scenarioId);
    setSimResult(null);

    // Fake loading delay for better UX
    setTimeout(() => {
      const scenario = SCENARIOS.find(s => s.id === scenarioId);
      if (scenario) {
        setSimResult(scenario.result);
        setSimStatus(SimulationStatus.SUCCESS);
      } else {
        setSimStatus(SimulationStatus.ERROR);
      }
    }, 800);
  };

  return (
    <section id="simulator" className="py-24 bg-gradient-to-b from-space-800 to-space-900">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 mb-4 text-indigo-400">
            <FlaskConical size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Impact Scenario Lab</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore scientific models of the Chicxulub impact. Select a scenario to see how different conditions could have changed the fate of the dinosaurs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Scenario Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleSimulate(scenario.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                  selectedScenario === scenario.id 
                    ? 'bg-impact-600 border-impact-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                    : 'bg-space-800 border-slate-700 hover:border-slate-500 hover:bg-space-700'
                }`}
              >
                <h3 className="font-bold text-white mb-2">{scenario.title}</h3>
                <p className="text-xs text-slate-300">{scenario.description}</p>
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 md:p-8 min-h-[300px] relative overflow-hidden">
            
            {simStatus === SimulationStatus.IDLE && (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                 <PlayCircle size={48} className="mb-4 opacity-50" />
                 <p>Select a scenario above to run the simulation model.</p>
               </div>
            )}

            {simStatus === SimulationStatus.LOADING && (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-slate-900/80 z-10">
                 <div className="w-12 h-12 border-4 border-impact-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p className="animate-pulse">Retrieving geological records...</p>
               </div>
            )}

            {simResult && (
              <div className="animate-fadeIn">
                <div className="flex items-start gap-4 mb-6 border-b border-slate-700 pb-6">
                  <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                    <Info size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Scientific Analysis</h3>
                    <p className="text-slate-400 text-sm">{simResult.scenario}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-2">Outcome</span>
                    <p className="text-slate-200 leading-relaxed text-lg">{simResult.outcome}</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-2">Survival Probability (Large Fauna)</span>
                      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                        <div 
                          className={`h-full transition-all duration-1000 ease-out ${simResult.survivalProbability > 50 ? 'bg-life-500' : 'bg-impact-500'}`} 
                          style={{ width: `${simResult.survivalProbability}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                         <span className="text-xs text-slate-500">Extinction</span>
                         <span className="text-sm font-mono font-bold text-white">{simResult.survivalProbability}%</span>
                         <span className="text-xs text-slate-500">Survival</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-2">Key Environmental Effects</span>
                      <div className="flex flex-wrap gap-2">
                        {simResult.environmentalEffects.map((effect, idx) => (
                          <span key={idx} className="px-3 py-1 bg-space-800 text-blue-200 text-sm rounded-full border border-slate-600 shadow-sm">
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulationLab;