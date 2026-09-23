import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import './App.css';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const projectsEnteredRef = useRef(false);

  const scrollToSection = (id) => {
    const container = containerRef.current;
    if (!container) return;

    if (id === 'about' || id === 'projects') {
      const st = ScrollTrigger.getAll().find((t) => t.trigger === stageRef.current);
      if (st) {
        container.scrollTo({ top: id === 'projects' ? st.end : st.start, behavior: 'smooth' });
        return;
      }
    }

    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('section');

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

  useEffect(() => {
    if (!stageRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const dist = () => trackRef.current.scrollWidth - stageRef.current.clientWidth;

      gsap.to(trackRef.current, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: stageRef.current,
          scroller: containerRef.current,
          start: 'top top',
          end: () => '+=' + dist(),
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress > 0.45 && !projectsEnteredRef.current) {
              projectsEnteredRef.current = true;
              window.dispatchEvent(new CustomEvent('projects:enter'));
            }
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Snap-to-section: after scrolling pauses, commit to the NEXT section in the
  // scroll direction (hero / about = pin start / projects = pin end / contact).
  // Direction-aware so it never yanks you back with a rubber-band effect.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let snapTimer = null;
    let lastScrollTop = container.scrollTop;
    let direction = 0;

    const getSnapPositions = () => {
      const st = ScrollTrigger.getAll().find((t) => t.trigger === stageRef.current);
      if (!st) return null;
      return [0, st.start, st.end, container.scrollHeight - container.clientHeight];
    };

    const applySnap = () => {
      snapTimer = null;
      const positions = getSnapPositions();
      if (!positions) return;
      const current = container.scrollTop;

      const settled = positions.some((p) => Math.abs(p - current) < 4);
      if (settled) return;

      let target;
      if (direction >= 0) {
        target = positions.find((p) => p > current + 1) || positions[positions.length - 1];
      } else {
        const previous = positions.filter((p) => p < current - 1);
        target = previous.length ? previous[previous.length - 1] : positions[0];
      }

      if (Math.abs(target - current) > 2) {
        container.scrollTo({ top: target, behavior: 'smooth' });
      }
    };

    const handleScroll = () => {
      const current = container.scrollTop;
      const delta = current - lastScrollTop;
      if (delta > 0) direction = 1;
      else if (delta < 0) direction = -1;
      lastScrollTop = current;

      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(applySnap, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (snapTimer) clearTimeout(snapTimer);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="main-scroller" className="portfolio-container" ref={containerRef}>
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <section id="hero" className="section hero-section">
        <Hero scrollToSection={scrollToSection} />
      </section>

      <div className="horizontal-stage" ref={stageRef}>
        <div className="horizontal-track" ref={trackRef}>
          <div className="panel about-panel">
            <About />
          </div>
          <div className="panel projects-panel">
            <Projects />
          </div>
        </div>
      </div>

      <section id="contact" className="section contact-section">
        <h2>For contact info</h2>
      </section>
    </div>
  );
}

export default App;