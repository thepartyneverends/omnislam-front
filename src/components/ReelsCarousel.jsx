// components/ReelsCarousel.jsx

import React, { useState, useRef, useEffect } from 'react';

const ReelsCarousel = ({ reels }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

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
    if (isVisible && isPlaying) {
      setActiveIndex((prev) => (prev + 1) % reels.length);
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
          video.play().catch(() => {});
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
      if (isVisible && isPlaying) video.play().catch(() => {});
      else video.pause();
    }
  }, [isVisible, isPlaying, activeIndex]);

  const prevReel = () => setActiveIndex((prev) => (prev - 1 + reels.length) % reels.length);
  const nextReel = () => setActiveIndex((prev) => (prev + 1) % reels.length);
  const handleSideClick = (index) => { if (index !== activeIndex) setActiveIndex(index); };
  const togglePlay = () => setIsPlaying(!isPlaying);

  const prevIndex = (activeIndex - 1 + reels.length) % reels.length;
  const nextIndex = (activeIndex + 1) % reels.length;

  return (
    <div ref={containerRef} className="relative w-full flex items-center justify-center overflow-hidden py-8">
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">
        {/* Предыдущее видео (слева) */}
        <div
          className="flex-shrink-0 w-1/5 sm:w-1/6 md:w-1/5 lg:w-1/6 xl:w-1/5 opacity-40 blur-sm scale-90 transition-all duration-500 cursor-pointer hover:opacity-70 z-0"
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
        <div className="flex-shrink-0 w-3/5 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 z-10 transition-all duration-500 px-2">
          <div className="relative shadow-2xl shadow-purple-500/50 rounded-2xl overflow-hidden ring-2 ring-purple-500/30 bg-black" style={{ aspectRatio: '9/16', maxHeight: '80vh' }}>
            <video
              ref={(el) => (videoRefs.current[activeIndex] = el)}
              src={reels[activeIndex].video_url}
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-sm bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg">
              <span className="font-medium truncate">{reels[activeIndex].title}</span>
              <span className="text-gray-300 whitespace-nowrap">{reels[activeIndex].duration}</span>
            </div>
            <div className="absolute top-40 justify-center items-center flex gap-2">
              <button
                onClick={togglePlay}
                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition"
                aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              
            </div>
          </div>
        </div>

        {/* Следующее видео (справа) */}
        <div
          className="flex-shrink-0 w-1/5 sm:w-1/6 md:w-1/5 lg:w-1/6 xl:w-1/5 opacity-40 blur-sm scale-90 transition-all duration-500 cursor-pointer hover:opacity-70 z-0"
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

        {/* Стрелки навигации */}
        <button
          onClick={prevReel}
          className="absolute left-1 sm:left-4 z-20 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition"
          aria-label="Предыдущий"
        >
          ‹
        </button>
        <button
          onClick={nextReel}
          className="absolute right-1 sm:right-4 z-20 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition"
          aria-label="Следующий"
        >
          ›
        </button>

        {/* Индикаторы */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {reels.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex ? 'w-6 bg-purple-500' : 'bg-gray-500 hover:bg-gray-400'
              }`}
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