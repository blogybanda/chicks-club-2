import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-space-900 border-t border-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-xl font-bold text-white mb-4">Chicxulub Interactive</h3>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto text-sm">
          A scientific visualization project powered by React. 
          Data sources include studies on the K-Pg extinction event.
        </p>
        <div className="text-xs text-slate-600 flex flex-col gap-2">
          <span>&copy; {new Date().getFullYear()} Geological Education Project.</span>
          <span className="opacity-50">Often searched as "Chicks Club" or "Chick Club".</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;