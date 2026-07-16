// components/Header.jsx

import React, { useState, useEffect } from 'react';
import { FaTelegram, FaInstagram, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [navPosition, setNavPosition] = useState('left');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Хэдер становится непрозрачным после 20px скролла
      setIsScrolled(scrollY > 20);
      
      // Логотип появляется после прокрутки на 80% высоты экрана
      const heroHeight = window.innerHeight * 0.8;
      setShowLogo(scrollY > heroHeight);
      
      // Навигация плавно смещается в центр после 50% высоты экрана
      const centerThreshold = window.innerHeight * 0.3;
      setNavPosition(scrollY > centerThreshold ? 'center' : 'left');
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Логотип появляется при скролле */}
          <div className={`flex-shrink-0 transition-all duration-700 transform ${
            showLogo ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'
          }`}>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              OMNISLAM
            </span>
          </div>

          {/* Навигация с плавным смещением */}
          <nav className={`hidden md:flex items-center justify-start space-x-1 lg:space-x-2 transition-all duration-700 ease-in-out ${
            navPosition === 'center' ? 'absolute left-1/2 transform -translate-x-1/2' : 'flex-1 justify-start'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-5 py-2.5 rounded-lg transition-all duration-200 font-medium text-xl lg:text-2xl ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' 
                    : 'text-white hover:text-purple-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Десктопные соцсети */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://t.me/ваш_логин" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-blue-600 hover:text-purple-600 hover:bg-purple-50' 
                  : 'text-sky-400 hover:text-purple-300 hover:bg-white/10'
              }`}
            >
              <FaTelegram size={32} />
            </a>
            <a 
              href="https://instagram.com/ваш_логин" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-orange-600 hover:text-purple-600 hover:bg-purple-50' 
                  : 'text-orange-400 hover:text-purple-300 hover:bg-white/10'
              }`}
            >
              <FaInstagram size={32} />
            </a>
            <a 
              href="mailto:ваш_email@example.com" 
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-gray-600 hover:text-purple-600 hover:bg-purple-50' 
                  : 'text-amber-200 hover:text-purple-300 hover:bg-white/10'
              }`}
            >
              <FaEnvelope size={32} />
            </a>
          </div>

          {/* Бургер-меню */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled 
                ? 'text-gray-700 hover:bg-purple-50' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* Мобильное меню */}
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
                className={`block w-full text-left px-4 py-4 rounded-lg transition-colors font-medium text-xl ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' 
                    : 'text-white hover:text-purple-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex justify-center space-x-8 pt-4">
              <a 
                href="https://t.me/ваш_логин" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-purple-600' : 'text-white hover:text-purple-300'
                }`}
              >
                <FaTelegram size={28} />
              </a>
              <a 
                href="https://instagram.com/ваш_логин" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-purple-600' : 'text-white hover:text-purple-300'
                }`}
              >
                <FaInstagram size={28} />
              </a>
              <a 
                href="mailto:ваш_email@example.com" 
                className={`transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-purple-600' : 'text-white hover:text-purple-300'
                }`}
              >
                <FaEnvelope size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;