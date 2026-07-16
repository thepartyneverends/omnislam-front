// components/FloatingSocials.jsx

import React, { useState, useEffect } from 'react';
import { FaTelegram, FaInstagram, FaEnvelope } from 'react-icons/fa';

const FloatingSocials = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const socials = [
    { 
      href: 'https://t.me/ваш_логин', 
      icon: <FaTelegram size={28} />, 
      label: 'Telegram',
      color: 'hover:text-blue-400'
    },
    { 
      href: 'https://instagram.com/ваш_логин', 
      icon: <FaInstagram size={28} />, 
      label: 'Instagram',
      color: 'hover:text-pink-400'
    },
    { 
      href: 'mailto:ваш_email@example.com', 
      icon: <FaEnvelope size={28} />, 
      label: 'Email',
      color: 'hover:text-amber-400'
    },
  ];

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center text-white ${social.color}`}
          aria-label={social.label}
        >
          {social.icon}
          {/* Подсказка при наведении */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            {social.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default FloatingSocials;