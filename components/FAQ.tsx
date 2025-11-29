
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Why is everyone searching for 'Chicks Club'?",
    answer: "It is a common phonetic misspelling of 'Chicxulub'. Since the Mayan name is difficult to spell and pronounce ('Cheek-shoo-loob'), many people, especially in India, type 'Chicks Club' into search engines. This website is designed to help those users find the correct scientific information about the asteroid."
  },
  {
    question: "Where is the crater located?",
    answer: "The crater is buried beneath the Yucatán Peninsula in Mexico. Its center is located approximately underneath the town of Chicxulub Puerto. The structure is about 150 kilometers (93 miles) wide and 20 kilometers (12 miles) deep."
  },
  {
    question: "How big was the asteroid?",
    answer: "The asteroid (impactor) is estimated to have been between 10 and 15 kilometers (6 to 9 miles) in diameter. Traveling at 20 kilometers per second, it released energy equivalent to 100 million megatons of TNT upon impact."
  },
  {
    question: "Did any dinosaurs survive the impact?",
    answer: "Technically, yes. While all non-avian dinosaurs (like T-Rex and Triceratops) went extinct, small theropod dinosaurs—which we know today as birds—survived and evolved into the species we see today."
  },
  {
    question: "Is there a risk of another impact like this?",
    answer: "Impacts of this magnitude are extremely rare, occurring roughly once every 100 million years. NASA's Planetary Defense Coordination Office actively monitors Near-Earth Objects (NEOs) to identify and deflect potential threats."
  },
  {
    question: "What happened immediately after the impact?",
    answer: "The impact triggered a chain reaction: a massive shockwave, global wildfires from falling debris, mega-tsunamis, and an 'impact winter' caused by dust blocking the sun. This halted photosynthesis and collapsed the food chain."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-space-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-700/50 mb-4 text-blue-400">
             <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Common questions about the Chicxulub asteroid and the extinction event.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-space-700/30 ring-1 ring-blue-500/50' : 'bg-space-900/50 hover:border-slate-600'}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-semibold text-lg ${openIndex === index ? 'text-blue-300' : 'text-slate-200'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-blue-400 flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-slate-500 flex-shrink-0" size={20} />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
