// components/ReelsCarousel.jsx

import React, { useState, useRef, useEffect } from 'react';

const ReelsCarousel = ({ reels }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const hideTimeout = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Touch-события для свайпа
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping) return;
    setIsSwiping(false);

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevReel();
      } else {
        nextReel();
      }
    }
  };

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Обработчик окончания видео
  const handleVideoEnded = () => {
    if (isVisible && isPlaying && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % reels.length);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Управление воспроизведением
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.currentTime = 0;
        video.onended = handleVideoEnded;
        if (isVisible && isPlaying) {
          setTimeout(() => {
            video.play().catch(() => {});
          }, 100);
        }
      } else {
        video.pause();
        video.currentTime = 0;
        video.onended = null;
      }
    });
    return () => {
      if (videoRefs.current[activeIndex]) {
        videoRefs.current[activeIndex].onended = null;
      }
    };
  }, [activeIndex, isVisible, isPlaying, reels.length]);

  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (video) {
      if (isVisible && isPlaying) {
        setTimeout(() => {
          video.play().catch(() => {});
        }, 100);
      } else {
        video.pause();
      }
    }
  }, [isVisible, isPlaying, activeIndex]);

  // Синхронизация состояния звука
  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (video) {
      video.muted = isMuted;
    }
  }, [activeIndex, isMuted]);

  // Функции для показа/скрытия контролов
  const showControls = () => {
    setControlsVisible(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
  };

  const hideControlsWithDelay = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      setControlsVisible(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  // Навигация
  const changeReel = (newIndex) => {
    if (isTransitioning || newIndex === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const prevReel = () => changeReel((activeIndex - 1 + reels.length) % reels.length);
  const nextReel = () => changeReel((activeIndex + 1) % reels.length);
  const handleSideClick = (index) => changeReel(index);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRefs.current[activeIndex];
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const prevIndex = (activeIndex - 1 + reels.length) % reels.length;
  const nextIndex = (activeIndex + 1) % reels.length;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full flex items-center justify-center overflow-hidden py-8 touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center px-4 sm:px-2">
        {/* Предыдущее видео (слева) */}
        <div
          className={`flex-shrink-0 w-1/5 sm:w-1/6 md:w-1/5 lg:w-1/6 xl:w-1/5 transition-all duration-500 ease-in-out cursor-pointer z-0 ${
            isTransitioning ? 'opacity-0 scale-75' : 'opacity-40 blur-sm scale-90 hover:opacity-70'
          }`}
          onClick={() => handleSideClick(prevIndex)}
        >
          <div className="relative" style={{ aspectRatio: '9/16', maxHeight: '70vh' }}>
            <video
              ref={(el) => (videoRefs.current[prevIndex] = el)}
              src={reels[prevIndex].video_url}
              className="w-full h-full object-cover rounded-xl"
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
          </div>
        </div>

        {/* Центральное видео (активное) */}
        <div
          className={`flex-shrink-0 w-3/5 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 z-10 transition-all duration-500 ease-in-out ${
            isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
          }`}
          onMouseEnter={showControls}
          onMouseLeave={hideControlsWithDelay}
        >
          <div className="relative shadow-2xl shadow-purple-500/50 rounded-2xl overflow-hidden ring-2 ring-purple-500/30 bg-black transition-shadow duration-300 hover:shadow-purple-500/70" style={{ aspectRatio: '9/16', maxHeight: '80vh' }}>
            <video
              ref={(el) => (videoRefs.current[activeIndex] = el)}
              src={reels[activeIndex].video_url}
              className="w-full h-full object-cover transition-opacity duration-300"
              muted={isMuted}
              playsInline
            />

            {/* Центральная кнопка Play/Pause */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                controlsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
              }`}
            >
              <button
                onClick={togglePlay}
                className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>

            {/* Информация внизу */}
            <div className={`absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-sm bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg transition-all duration-500 ${
              isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}>
              <span className="font-medium truncate">{reels[activeIndex].title}</span>
              <span className="text-gray-300 whitespace-nowrap">{reels[activeIndex].duration}</span>
            </div>

            {/* Кнопки управления */}
            <div className={`absolute top-3 right-3 flex gap-2 transition-all duration-500 ${
              isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
            }`}>
              <button
                onClick={toggleMute}
                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
              >
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 5.343a1 1 0 011.414 0A8 8 0 0118 10a8 8 0 01-2.343 5.657 1 1 0 11-1.414-1.414A6 6 0 0016 10a6 6 0 00-1.757-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Следующее видео (справа) */}
        <div
          className={`flex-shrink-0 w-1/5 sm:w-1/6 md:w-1/5 lg:w-1/6 xl:w-1/5 transition-all duration-500 ease-in-out cursor-pointer z-0 ${
            isTransitioning ? 'opacity-0 scale-75' : 'opacity-40 blur-sm scale-90 hover:opacity-70'
          }`}
          onClick={() => handleSideClick(nextIndex)}
        >
          <div className="relative" style={{ aspectRatio: '9/16', maxHeight: '70vh' }}>
            <video
              ref={(el) => (videoRefs.current[nextIndex] = el)}
              src={reels[nextIndex].video_url}
              className="w-full h-full object-cover rounded-xl"
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
          </div>
        </div>

        {/* Стрелки навигации - только для десктопа */}
        <button
          onClick={prevReel}
          className={`absolute left-1 sm:left-4 z-20 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 hidden sm:flex ${
            isTransitioning ? 'opacity-30' : 'opacity-100'
          }`}
          aria-label="Предыдущий"
        >
          ‹
        </button>
        <button
          onClick={nextReel}
          className={`absolute right-1 sm:right-4 z-20 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 hidden sm:flex ${
            isTransitioning ? 'opacity-30' : 'opacity-100'
          }`}
          aria-label="Следующий"
        >
          ›
        </button>

        {/* Индикаторы */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {reels.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-500 ease-in-out ${
                index === activeIndex ? 'w-6 bg-purple-500 h-2.5' : 'w-2 h-2 bg-gray-500 hover:bg-gray-400'
              } rounded-full`}
              onClick={() => handleSideClick(index)}
              aria-label={`Переключить на ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReelsCarousel;