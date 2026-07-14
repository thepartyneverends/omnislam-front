// components/Header.jsx

import React, { useState, useEffect } from 'react';
import { FaTelegram, FaInstagram, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'videos', label: 'Видео' },
    { id: 'testimonials', label: 'Отзывы' },
    { id: 'contact', label: 'Контакты' },
  ];

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-purple-500 transition-colors duration-300">
              Omnislam
            </span>
          </div>

          {/* Десктопная навигация – цвет текста меняется */}
          <nav className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-l lg:text-base ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' 
                    : 'text-white hover:text-purple-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Десктопные соцсети – иконки меняют цвет */}
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="https://t.me/ваш_логин" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-blue-600 hover:bg-purple-50' 
                  : 'text-sky-500 hover:bg-white/10'
              }`}
            >
              <FaTelegram size={30} />
            </a>
            <a 
              href="https://instagram.com/ваш_логин" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-orange-600 hover:text-purple-600 hover:bg-purple-50' 
                  : 'text-orange-400 hover:text-purple-400 hover:bg-white/10'
              }`}
            >
              <FaInstagram size={30} />
            </a>
            <a 
              href="mailto:ваш_email@example.com" 
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-gray-600 hover:text-amber-600 hover:bg-purple-50' 
                  : 'text-amber-200 hover:text-amber-400 hover:bg-white/10'
              }`}
            >
              <FaEnvelope size={30} />
            </a>
          </div>

          {/* Бургер-меню – меняет цвет */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled 
                ? 'text-gray-700 hover:bg-purple-50' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Мобильное меню – фон и цвет текста */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`py-4 space-y-2 border-t ${
            isScrolled ? 'border-gray-200' : 'border-white/20'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' 
                    : 'text-white hover:text-purple-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* Соцсети в мобильном меню */}
            <div className="flex justify-center space-x-6 pt-4">
              <a 
                href="https://t.me/ваш_логин" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-purple-600' : 'text-white hover:text-purple-300'
                }`}
              >
                <FaTelegram size={24} />
              </a>
              <a 
                href="https://instagram.com/ваш_логин" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-purple-600' : 'text-white hover:text-purple-300'
                }`}
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="mailto:ваш_email@example.com" 
                className={`transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-purple-600' : 'text-white hover:text-purple-300'
                }`}
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;