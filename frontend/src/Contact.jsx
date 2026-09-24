import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = 'byalina.dev@gmail.com';
const GITHUB_URL = 'https://github.com/lirriya';
const LINKEDIN_URL = 'https://www.linkedin.com/in/byalina-dev';
const CV_URL = '/cv eng censored.pdf';
const Headline = 'where to find me :';
const MAIL_SUBJECT = 'Stage opportunity — found you via byalina.dev';
const MAIL_TEMPLATE = [
  'Hello Alina,',
  '',
  'I came across your portfolio at byalina.dev and I would love to talk about a Software Engineering stage opportunity with you.',
  '',
  'Best regards,',
  '[your name]',
].join('\n');

const GitHubIcon = () => (
  <svg viewBox="0 0 19 19" aria-hidden="true">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844"
    />
  </svg>
);

const CvIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M14 2.5H7A1.5 1.5 0 0 0 5.5 4v16A1.5 1.5 0 0 0 7 21.5h10a1.5 1.5 0 0 0 1.5-1.5V7.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M14 2.5V7h4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M8.5 12.5h7M8.5 16h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M3.5 6.5 12 13l8.5-6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8h4.5v15H.25zM8 8h4.31v2.05h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-7.42c0-1.77-.03-4.05-2.47-4.05-2.47 0-2.85 1.93-2.85 3.92V23H8z"
    />
  </svg>
);

const channels = [
  { id: 'ch_01', type: 'link', href: GITHUB_URL, external: true, name: 'github', sub: '/lirriya', action: '[open]', Icon: GitHubIcon },
  { id: 'ch_02', type: 'link', href: CV_URL, download: 'byalina-cv.pdf', name: 'cv.pdf', sub: 'download resume', action: '[download]', Icon: CvIcon },
  { id: 'ch_03', type: 'mail', name: 'mail', sub: CONTACT_EMAIL, action: '[compose]', Icon: MailIcon },
  { id: 'ch_04', type: 'link', href: LINKEDIN_URL, external: true, name: 'linkedin', sub: '/in/byalina-dev', action: '[connect]', Icon: LinkedinIcon },
];

function ChannelCard({ channel, onCompose }) {
  const inner = (
    <>
      <div className="card-head">
        <span className="card-channel">{channel.id}</span>
        <span className="card-ping"></span>
      </div>
      <div className="card-icon">
        <channel.Icon />
      </div>
      <div className="card-name">{channel.name}</div>
      <div className="card-sub">{channel.sub}</div>
      <div className="card-action">{channel.action}</div>
    </>
  );

  if (channel.type === 'mail') {
    return (
      <button className="channel-card" onClick={onCompose}>
        {inner}
      </button>
    );
  }

  return (
    <a
      className="channel-card"
      href={channel.href}
      target={channel.external ? '_blank' : undefined}
      rel={channel.external ? 'noreferrer' : undefined}
      download={channel.download}
    >
      {inner}
    </a>
  );
}

function Contact() {
  const sceneRef = useRef(null);
  const ambientRef = useRef(null);
  const effectsRef = useRef(null);
  const waterlineRef = useRef(null);
  const hintRef = useRef(null);
  const hintRainRef = useRef(null);
  const hintChannelRef = useRef(null);
  const cardsRef = useRef(null);
  const closingRef = useRef(null);
  const composeRef = useRef(null);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  const [composeOpen, setComposeOpen] = useState(false);
  const [subject, setSubject] = useState(MAIL_SUBJECT);
  const [body, setBody] = useState(MAIL_TEMPLATE);

  const composeOpenRef = useRef(false);
  const drizzleTimerRef = useRef(null);
  const liveDropsRef = useRef(0);
  const hintSwappedRef = useRef(false);

  const openCompose = () => setComposeOpen(true);

  const closeCompose = () => {
    if (!panelRef.current) {
      setComposeOpen(false);
      return;
    }
    gsap.to([backdropRef.current, panelRef.current], {
      opacity: 0,
      y: 12,
      scale: 0.96,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => setComposeOpen(false),
    });
  };

  const sendMail = () => {
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject.trim() || MAIL_SUBJECT)}&body=${encodeURIComponent(body.trim())}`;
    window.location.href = mailto;
  };

  const spawnRing = (x, y, to) => {
    const el = document.createElement('span');
    el.className = 'pointer-ring';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    effectsRef.current.appendChild(el);
    gsap.fromTo(
      el,
      { scale: 0.12, opacity: 0.7 },
      { scale: to, opacity: 0, duration: 0.85, ease: 'power2.out', onComplete: () => el.remove() }
    );
  };

  const spawnDrip = () => {
    if (!effectsRef.current || liveDropsRef.current > 45) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const floorY = rect.height - 36;
    liveDropsRef.current += 1;

    const drop = document.createElement('span');
    drop.className = 'drizzle-drop';
    drop.style.left = `${x}px`;
    effectsRef.current.appendChild(drop);

    gsap.fromTo(
      drop,
      { y: -16, opacity: 0.85 },
      {
        y: floorY,
        opacity: 0.5,
        duration: 0.75 + Math.random() * 0.5,
        ease: 'none',
        onComplete: () => {
          drop.remove();
          liveDropsRef.current -= 1;

          const ring = document.createElement('span');
          ring.className = 'drizzle-ring';
          ring.style.left = `${x}px`;
          ring.style.top = `${floorY}px`;
          effectsRef.current.appendChild(ring);

          gsap.fromTo(
            ring,
            { scale: 0.3, opacity: 0.5 },
            { scale: 1.5, opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => ring.remove() }
          );
        },
      }
    );
  };

  const startDrizzle = () => {
    if (drizzleTimerRef.current) clearInterval(drizzleTimerRef.current);
    let spawned = 0;
    const total = 30;

    for (let i = 0; i < 6; i++) spawnDrip();
    spawned += 6;

    drizzleTimerRef.current = setInterval(() => {
      if (spawned >= total) {
        clearInterval(drizzleTimerRef.current);
        drizzleTimerRef.current = null;
        return;
      }
      const n = Math.min(4, total - spawned);
      for (let i = 0; i < n; i++) spawnDrip();
      spawned += n;
    }, 150);
  };

  const wobbleHeadline = () => {
    gsap.fromTo(
      waterlineRef.current,
      { skewY: 0.8, scaleY: 1.02, filter: 'blur(0.5px)' },
      { skewY: 0, scaleY: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out', overwrite: 'auto' }
    );
  };

  const setHintToChannel = () => {
    if (hintSwappedRef.current) return;
    hintSwappedRef.current = true;
    gsap.to(hintRainRef.current, { y: -10, opacity: 0, duration: 0.35, ease: 'power2.in' });
    gsap.fromTo(
      hintChannelRef.current,
      { y: 10, opacity: 0, visibility: 'visible' },
      { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', delay: 0.2 }
    );
  };

  const handleSceneClick = (e) => {
    if (composeOpenRef.current) return;
    if (e.target.closest('.channel-card') || e.target.closest('.compose-overlay')) return;

    const rect = sceneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spawnRing(x, y, 0.6);
    spawnRing(x, y, 1.2);
    spawnRing(x, y, 2);
    wobbleHeadline();
    setHintToChannel();
    startDrizzle();
  };

  useEffect(() => {
    composeOpenRef.current = composeOpen;
  }, [composeOpen]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const ctx = gsap.context(() => {
      const scroller = document.getElementById('main-scroller');

      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        waterlineRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }
      )
        .fromTo(ambientRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.8')
        .fromTo(hintRef.current, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.7')
        .fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 56, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)' },
          '-=0.3'
        )
        .fromTo(closingRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');

      const trigger = ScrollTrigger.create({
        trigger: scene,
        scroller,
        start: 'top 55%',
        once: true,
        onEnter: () => tl.play(),
      });

      if (scene.getBoundingClientRect().top < window.innerHeight * 0.55) {
        tl.progress(1);
      }

      return () => trigger.kill();
    }, scene);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!composeOpen) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.out' });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 26, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.2)' }
      );
    }, composeRef.current);

    return () => ctx.revert();
  }, [composeOpen]);

  useEffect(() => {
    if (!composeOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeCompose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [composeOpen]);

  useEffect(
    () => () => {
      if (drizzleTimerRef.current) clearInterval(drizzleTimerRef.current);
    },
    []
  );

  return (
    <div className="contact-scene" ref={sceneRef} onClick={handleSceneClick}>
      <div className="contact-glow glow-rose"></div>
      <div className="contact-glow glow-gold"></div>

      <div className="ambient-layer" ref={ambientRef}>
        <div className="water-ripple ripple-1"></div>
        <div className="water-ripple ripple-2"></div>
        <div className="water-ripple ripple-3"></div>
      </div>

      <div className="waterline" ref={waterlineRef}>
        <div className="waterline-core">
          <div className="waterline-top">{Headline}</div>
          <div className="waterline-reflection" aria-hidden="true">
            {Headline}
          </div>
        </div>
      </div>

      <p className="contact-hint" ref={hintRef}>
        <span className="hint-line hint-rain" ref={hintRainRef}>
          <span className="blink">˖</span> ⊹ ࣪ ˖  tap the water ⋆˚࿔ <span className="blink">˖</span>
        </span>
        <span className="hint-line hint-channel" ref={hintChannelRef} aria-hidden="true">
          <span className="blink">˖</span> ⋆˚࿔ pick a channel ⊹ ࣪ ˖ ໒꒱ <span className="blink">˖</span>
        </span>
      </p>

      <div className="contact-cards" ref={cardsRef}>
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} onCompose={openCompose} />
        ))}
      </div>

      <p className="contact-closing" ref={closingRef}>
        ₊˚⊹♡ Thanks for scrolling so far. All rights reserved © ⋆𐙚
      </p>

      <div className="rain-layer" ref={effectsRef}></div>

      {composeOpen && (
        <div className="compose-overlay" ref={composeRef}>
          <div className="compose-backdrop" ref={backdropRef} onClick={closeCompose}></div>
          <div className="compose-panel" ref={panelRef} role="dialog" aria-modal="true" aria-label="Compose email">
            <div className="compose-head">
              <span className="compose-title">✉ new_transmission</span>
              <button className="compose-close" onClick={closeCompose} aria-label="Close">
                ×
              </button>
            </div>
            <p className="compose-to">to: {CONTACT_EMAIL}</p>
            <label className="compose-field">
              <span>subject</span>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={120} />
            </label>
            <label className="compose-field">
              <span>body</span>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={7} autoFocus spellCheck="true" />
            </label>
            <div className="compose-actions">
              <button className="compose-btn ghost" onClick={closeCompose}>
                [cancel]
              </button>
              <button className="compose-btn send" onClick={sendMail}>
                [send transmission]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;