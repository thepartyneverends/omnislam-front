// components/Hero.jsx

import React from 'react';

const Hero = () => {
  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      // Путь к картинке: если она лежит в public/images/background-hero.jpg
      style={{ backgroundImage: `url('/images/background-hero.jpg')` }}
    >
      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* After Effects */}
        <div className="floating-logo float-ae">
          <img 
            src="/images/adobe-ae-logo.png" 
            alt="After Effects" 
            className="w-20 h-20 md:w-28 md:h-28 object-contain"
          />
        </div>

        {/* Premiere Pro */}
        <div className="floating-logo float-pr">
          <img 
            src="/images/adobe-pr-logo.png" 
            alt="Premiere Pro" 
            className="w-20 h-20 md:w-28 md:h-28 object-contain"
          />
        </div>

        {/* CapCut */}
        <div className="floating-logo float-cap">
          <img 
            src="/images/capcut-logo.png" 
            alt="CapCut" 
            className="w-20 h-20 md:w-28 md:h-28 object-contain"
          />
        </div>
      </div>

      {/* Контент Hero (без mt-96) */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl pt-16 md:pt-20 mt-96 hidden sm:block">
        <p className="text-xl md:text-2xl mb-6 text-gray-200">
          Какой-то крутой заголовок-девиз
        </p>
        <p className="text-lg opacity-90 mb-8">
          3 года опыта • 100+ довольных клиентов • Индивидуальный подход
        </p>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;