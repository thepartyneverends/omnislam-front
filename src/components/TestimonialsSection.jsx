// components/TestimonialsSection.jsx

import React, { useState, useRef, useEffect } from 'react';

const TestimonialsSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const videoRefs = useRef({});
  const [playingStates, setPlayingStates] = useState({});

  // Базовый URL бэкенда из переменной окружения
  const API_BASE = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${API_BASE}/api/testimonials`)
      .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки отзывов');
        return response.json();
      })
      .then(data => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [API_BASE]);

  const togglePlay = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;
    if (playingStates[id]) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setPlayingStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <div className="w-full bg-black py-16 text-center text-gray-400">Загрузка отзывов...</div>;
  if (error) return <div className="w-full bg-black py-16 text-center text-red-500">Ошибка: {error}</div>;

  return (
    <div className="w-full bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white inline-block relative">
            Отзывы
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-purple-500 rounded-full"></span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Что говорят мои клиенты</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="flex flex-col items-center group">
              <div
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/60 transition-shadow duration-300 cursor-pointer bg-black"
                onClick={() => togglePlay(fb.id)}
              >
                <video
                  ref={(el) => (videoRefs.current[fb.id] = el)}
                  src={`${API_BASE}${fb.video_url}`} // ← добавляем базовый URL
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {playingStates[fb.id] ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full ring-2 ring-purple-500/0 group-hover:ring-purple-500/50 transition-all duration-300 pointer-events-none"></div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-white font-semibold text-lg">{fb.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;