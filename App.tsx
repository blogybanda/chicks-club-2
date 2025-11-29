
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import DataViz from './components/DataViz';
import SimulationLab from './components/SimulationLab';
import Footer from './components/Footer';
import CraterViewer from './components/CraterViewer';
import DidYouMean from './components/DidYouMean';
import FAQ from './components/FAQ';
import AsteroidEffect from './components/AsteroidEffect';

function App() {
  return (
    <div className="min-h-screen bg-space-900 text-slate-200 selection:bg-impact-500 selection:text-white overflow-hidden">
      <AsteroidEffect />
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <CraterViewer />
        <DidYouMean />
        <DataViz />
        <SimulationLab />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;