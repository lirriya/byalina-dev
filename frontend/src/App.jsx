import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import './App.css';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';

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

    let target = 0;

    if (id === 'about' || id === 'projects') {
      const st = ScrollTrigger.getAll().find((t) => t.trigger === stageRef.current);
      if (st) target = id === 'projects' ? st.end : st.start;
    } else {
      const element = document.getElementById(id);
      if (element) {
        target = element.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
      }
    }

    gsap.to(container, {
      scrollTop: target,
      duration: 0.9,
      ease: 'power2.inOut',
      overwrite: true,
    });
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
          pinType: 'fixed',
          scrub: 0.35,
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
        <Contact />
      </section>
    </div>
  );
}

export default App;