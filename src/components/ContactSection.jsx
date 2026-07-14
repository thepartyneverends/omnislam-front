// components/ContactSection.jsx

import React from 'react';
import { FaTelegram, FaInstagram, FaEnvelope } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <div className="w-full bg-black py-16">
      <div className="container mx-auto px-4 text-center">
        {/* Заголовок с подчёркиванием */}
        <h2 className="text-4xl md:text-5xl font-bold text-white inline-block relative mb-4">
          Свяжитесь со мной
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-purple-500 rounded-full"></span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          Обсудим вашу идею, сроки и бюджет
        </p>

        {/* Карточки-ссылки */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
          <a
            href="https://t.me/ваш_логин"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-gray-800 hover:bg-gray-700 text-white px-8 py-5 rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 hover:-translate-y-1 w-full md:w-auto"
          >
            <FaTelegram size={34} className="text-purple-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-lg font-semibold">Telegram</div>
              <div className="text-sm text-gray-400">@omnislam</div>
            </div>
          </a>

          <a
            href="https://instagram.com/ваш_логин"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-gray-800 hover:bg-gray-700 text-white px-8 py-5 rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 hover:-translate-y-1 w-full md:w-auto"
          >
            <FaInstagram size={34} className="text-purple-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-lg font-semibold">Instagram</div>
              <div className="text-sm text-gray-400">@omnislam</div>
            </div>
          </a>

          <a
            href="mailto:ваш_email@example.com"
            className="group flex items-center gap-4 bg-gray-800 hover:bg-gray-700 text-white px-8 py-5 rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 hover:-translate-y-1 w-full md:w-auto"
          >
            <FaEnvelope size={34} className="text-purple-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-lg font-semibold">Email</div>
              <div className="text-sm text-gray-400">omnislam@yandex.ru</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;