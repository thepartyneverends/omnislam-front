// components/Hero.jsx

import React from 'react';

const Hero = () => {
  // Функция для плавной прокрутки к секции Videos
  const scrollToVideos = () => {
    const videosSection = document.getElementById('videos');
    if (videosSection) {
      videosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-start overflow-hidden"
      style={{ backgroundImage: `url('/images/background-hero.jpg')` }}
    >
      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Летающие логотипы */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="floating-logo float-ae">
          <img 
            src="/images/adobe-ae-logo.png" 
            alt="After Effects" 
            className="w-20 h-20 md:w-28 md:h-28 object-contain"
          />
        </div>
        <div className="floating-logo float-pr">
          <img 
            src="/images/adobe-pr-logo.png" 
            alt="Premiere Pro" 
            className="w-20 h-20 md:w-28 md:h-28 object-contain"
          />
        </div>
        <div className="floating-logo float-cap">
          <img 
            src="/images/capcut-logo.png" 
            alt="CapCut" 
            className="w-20 h-20 md:w-28 md:h-28 object-contain"
          />
        </div>
      </div>

      {/* Контент Hero — теперь прижат к верху */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl w-full pt-20 md:pt-24 lg:pt-28">
        <h1 className="text-5xl font-serif sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wider select-none bg-gradient-to-r from-purple-600 via-violet-800 to-purple-700 bg-clip-text text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.5)] drop-shadow-[0_0_40px_rgba(168,85,247,0.8)] animate-gradient bg-[length:300%_auto]">
  OMNISLAM
</h1>
        
        {/* <p className="text-xl md:text-3xl mt-8 text-gray-300 font-light tracking-wide">
          Какой-то крутой заголовок-девиз
        </p>
        
        <p className="text-base md:text-xl opacity-90 mt-6 text-gray-400">
          3 года опыта • 100+ довольных клиентов • Индивидуальный подход
        </p> */}
      </div>
      
      {/* Кнопка-стрелка вниз */}
      <button
        onClick={scrollToVideos}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 group cursor-pointer transition-all duration-300 hover:scale-110 hover:translate-y-1"
        aria-label="Прокрутить вниз"
      >
        <div className="flex flex-col items-center">
          <svg 
            className="w-8 h-8 text-white/70 group-hover:text-white transition-colors duration-300 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default Hero;