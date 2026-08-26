import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import './App.css';
import Hero from './Hero';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef(null);

  // Function to smoothly scroll to a section when a nav button is clicked
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track which section is currently in view using IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('.section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: container,
        threshold: 0.5, 
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="portfolio-container" ref={containerRef}>
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <section id="hero" className="section hero-section">
        <Hero />
      </section>

      <section id="about" className="section about-section">
        <h2>About Me</h2>
        <p>buttons to show info: study background, skills, me as a person</p>
      </section>

      <section id="projects" className="section projects-section">
        <h2>Projects</h2>
        <p>Cluedo, Mythifox, Tvoria, ghost train, tic tac toe</p>
      </section>

      <section id="contact" className="section contact-section">
        <h2>For contact info</h2>
      </section>
    </div>
  );
}

export default App;