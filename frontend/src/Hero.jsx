import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';
import Terminal from './Terminal';

const TITLE = 'Made byalina.dev';
const SUBTITLE = 'L3 CS Student • Looking for CS Stage';
const MARQUEE_ITEMS = ['Java', 'C', 'Python', 'React', 'SQL', 'Git', 'TypeScript', 'Vite', 'Figma'];

function Hero({ scrollToSection }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const caretRef = useRef(null);
  const pillRef = useRef(null);
  const dotRef = useRef(null);
  const introRef = useRef(null);
  const chipsRef = useRef(null);
  const ctaRef = useRef(null);
  const roseRef = useRef(null);
  const tealRef = useRef(null);
  const visualRef = useRef(null);
  const indicatorRef = useRef(null);
  const lineRef = useRef(null);
  const marqueeRef = useRef(null);

  const popLetter = (e) => {
    gsap.to(e.currentTarget, { y: -18, color: '#D3968C', duration: 0.25, ease: 'power2.out' });
  };

  const restLetter = (e) => {
    gsap.to(e.currentTarget, { y: 0, color: '#0A3323', duration: 0.45, ease: 'power3.out' });
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const titleChars = titleRef.current ? Array.from(titleRef.current.querySelectorAll('.char')) : [];
    const subtitleChars = subtitleRef.current ? Array.from(subtitleRef.current.querySelectorAll('.char')) : [];
    const roseEl = roseRef.current;
    const tealEl = tealRef.current;

    const roseX = gsap.quickTo(roseEl, 'x', { duration: 0.9, ease: 'power3.out' });
    const roseY = gsap.quickTo(roseEl, 'y', { duration: 0.9, ease: 'power3.out' });
    const tealX = gsap.quickTo(tealEl, 'x', { duration: 0.9, ease: 'power3.out' });
    const tealY = gsap.quickTo(tealEl, 'y', { duration: 0.9, ease: 'power3.out' });

    const onMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;
      roseX(nx * -34);
      roseY(ny * -34);
      tealX(nx * 26);
      tealY(ny * 26);
    };

    window.addEventListener('mousemove', onMove);

    const ctx = gsap.context(() => {
      gsap.to(dotRef.current, { scale: 0.55, duration: 0.7, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      gsap.to(marqueeRef.current, {
        x: () => -marqueeRef.current.offsetWidth / 2,
        duration: 26,
        ease: 'none',
        repeat: -1,
      });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(titleChars, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.04 }, 0)
        .fromTo(subtitleChars, { opacity: 0 }, { opacity: 1, duration: 0.05, stagger: 0.045 }, 1.05)
        .set(caretRef.current, { opacity: 1 }, 1.0)
        .to(caretRef.current, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: 'none' }, 1.05)
        .fromTo(pillRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.6 }, 1.45)
        .fromTo(introRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.6 }, 1.95)
        .fromTo(chipsRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.6 }, 2.4)
        .fromTo(ctaRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.6 }, 2.8)
        .fromTo(
          visualRef.current,
          { opacity: 0, rotationY: 90, transformPerspective: 1000 },
          { opacity: 1, rotationY: 0, duration: 1.1, ease: 'power2.out' },
          0.9
        )
        .fromTo(indicatorRef.current, { opacity: 0 }, { opacity: 0.9, duration: 0.7 }, 3.5)
        .fromTo(lineRef.current, { y: 0 }, { y: 12, duration: 0.6, repeat: -1, yoyo: true, ease: 'sine.inOut' }, 3.6);
    }, hero);

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.set([roseEl, tealEl], { x: 0, y: 0 });
      ctx.revert();
    };
  }, []);

  return (
    <div className="hero-wrapper" ref={heroRef}>
      <div className="glow-blob blob-rose" ref={roseRef}></div>
      <div className="glow-blob blob-teal" ref={tealRef}></div>

      <div className="hero-content">
        <div className="hero-status" ref={pillRef}>
          <span className="status-dot" ref={dotRef}></span>
          open to stage
        </div>

        <h1 className="hero-title" ref={titleRef}>
          {TITLE.split('').map((ch, i) => (
            <span key={i} className="char" onMouseEnter={popLetter} onMouseLeave={restLetter}>
              {ch}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle" ref={subtitleRef}>
          {SUBTITLE.split('').map((ch, i) => (
            <span key={i} className={ch === '•' ? 'char char-dot' : 'char'}>
              {ch}
            </span>
          ))}
          <span className="hero-caret" ref={caretRef}></span>
        </p>

        <p className="hero-intro" ref={introRef}>
          Third-year CS student with a soft spot for Java, cozy games and autumn cinnamon rolls — currently hunting for a
          Software Engineering stage.
        </p>

        <div className="hero-chips" ref={chipsRef}>
          {['Java', 'C', 'Python', 'React', 'SQL', 'Git'].map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>

        <div className="hero-ctas" ref={ctaRef}>
          <button className="hero-btn hero-btn-primary" onClick={() => scrollToSection('projects')}>
            view projects
          </button>
          <button className="hero-btn hero-btn-secondary" onClick={() => scrollToSection('contact')}>
            get in touch
          </button>
        </div>
      </div>

      <div className="hero-visual" ref={visualRef}>
        <Terminal />
      </div>

      <div className="scroll-indicator" ref={indicatorRef}>
        <p>scroll</p>
        <div className="scroll-line" ref={lineRef}></div>
      </div>

      <div className="hero-marquee">
        <div className="hero-marquee-track" ref={marqueeRef}>
          <div className="hero-marquee-set">
            {MARQUEE_ITEMS.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="hero-marquee-set">
            {MARQUEE_ITEMS.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;