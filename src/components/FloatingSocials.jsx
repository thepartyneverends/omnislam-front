// components/FloatingSocials.jsx (версия с FAB)

import React, { useState, useEffect } from 'react';
import { FaTelegram, FaInstagram, FaEnvelope, FaShareAlt, FaTimes } from 'react-icons/fa';

const FloatingSocials = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const socials = [
    { href: 'https://t.me/ваш_логин', icon: <FaTelegram size={24} />, label: 'Telegram', color: 'hover:text-blue-400' },
    { href: 'https://instagram.com/ваш_логин', icon: <FaInstagram size={24} />, label: 'Instagram', color: 'hover:text-pink-400' },
    { href: 'mailto:ваш_email@example.com', icon: <FaEnvelope size={24} />, label: 'Email', color: 'hover:text-amber-400' },
  ];

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
      }`}
    >
      {/* Выпадающие иконки */}
      <div
        className={`flex flex-col items-center gap-3 mb-3 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
      >
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 ${social.color}`}
            style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Главная кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Контакты"
      >
        {isOpen ? <FaTimes size={28} /> : <FaShareAlt size={28} />}
      </button>
    </div>
  );
};

export default FloatingSocials;