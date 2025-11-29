import React, { useEffect, useState } from 'react';

const AsteroidEffect: React.FC = () => {
  const [start, setStart] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Delay start slightly to ensure page load
    const timer = setTimeout(() => {
      setStart(true);
    }, 1000);

    // Calculate when the asteroid hits the bottom right to trigger shake
    // Animation duration is set to 1500ms in CSS style below
    const impactTimer = setTimeout(() => {
      document.body.classList.add('animate-shake');
      
      // Hide asteroid after it passes screen
      setTimeout(() => {
        setVisible(false);
      }, 100);

      // Remove shake class after animation completes
      setTimeout(() => {
        document.body.classList.remove('animate-shake');
      }, 700); // 1500 + 600ms buffer
    }, 2500); // 1000 delay + 1500 flight time

    return () => {
      clearTimeout(timer);
      clearTimeout(impactTimer);
      document.body.classList.remove('animate-shake');
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      className="fixed z-[100] top-0 left-0 w-24 h-24 pointer-events-none transition-transform ease-in"
      style={{
        transform: start 
          ? 'translate(120vw, 120vh)' // End position (bottom right offscreen)
          : 'translate(-150px, -150px)', // Start position (top left offscreen)
        transitionDuration: '1.5s',
        opacity: start ? 1 : 0
      }}
    >
      {/* The Fireball Visual */}
      <div className="relative w-full h-full rotate-45">
        {/* Core */}
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_10px_rgba(255,200,0,0.8)] z-10"></div>
        {/* Trail */}
        <div className="absolute bottom-4 right-4 w-40 h-16 bg-gradient-to-r from-transparent via-orange-500 to-yellow-200 rounded-full blur-md origin-bottom-right transform -rotate-12 scale-x-150"></div>
        <div className="absolute bottom-2 right-2 w-32 h-10 bg-gradient-to-r from-transparent via-red-600 to-orange-400 rounded-full blur-sm origin-bottom-right transform -rotate-6"></div>
      </div>
    </div>
  );
};

export default AsteroidEffect;
