import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VideosSection from './components/VideosSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // App.jsx (фрагмент)
<div className="min-h-screen bg-black text-white">
  <Header scrollToSection={scrollToSection} />
  <section id="home"><Hero /></section>
  <section id="videos"><VideosSection /></section>
  <section id="testimonials" className="bg-black py-16"><TestimonialsSection /></section>
  <section id="contact" className="bg-black py-16"><ContactSection /></section>
  <Footer />
</div>
  );
}

export default App;