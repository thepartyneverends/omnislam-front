// components/VideosSection.jsx

import React, { useState, useEffect } from 'react';
import ReelsCarousel from './ReelsCarousel';

const VideosSection = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Базовый URL бэкенда (из переменной окружения или явно)
  const API_BASE = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${API_BASE}/api/reels`)
      .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки рилсов');
        return response.json();
      })
      .then(data => {
        // Если бэкенд возвращает относительные пути, добавляем базовый URL
        const reelsWithFullUrl = data.map(reel => ({
          ...reel,
          video_url: `${API_BASE}${reel.video_url}`
        }));
        setReels(reelsWithFullUrl);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [API_BASE]);

  if (loading) return <div className="text-center text-gray-400 py-10">Загрузка рилсов...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Ошибка: {error}</div>;

  return (
    <div className="w-full bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white inline-block relative">
            Примеры моих работ
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-purple-500 rounded-full"></span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Reels-формат
          </p>
        </div>
        <ReelsCarousel reels={reels} />
      </div>
    </div>
  );
};

export default VideosSection;