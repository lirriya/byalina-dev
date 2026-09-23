import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ProjectModal from './ProjectModal';
import './Projects.css';

const projectList = [
    {
        id: 1,
        title: 'Portfolio',
        tech: 'React // CSS',
        desc: 'You are going through it right now!!',
        year: 2026,
        role: 'Design & Frontend',
        stack: ['React', 'Vite', 'GSAP'],
        features: ['Cinematic scroll entrance', 'Interactive booster pack reveal', 'GSAP card stack driving the background'],
        link: 'https://byalina.dev'
    },
    {
        id: 2,
        title: 'Cluedo',
        tech: 'Java',
        desc: 'Multiplayer game made in Java with Database',
        year: 2025,
        role: 'Game Logic & Persistence',
        stack: ['Java', 'JDBC', 'SQL'],
        features: ['Turn-based multiplayer', 'Persistent scoreboard database', 'Custom game state engine'],
        link: 'https://github.com'
    },
    {
        id: 3,
        title: 'MythiFox',
        tech: 'Full stack',
        desc: 'The Blog website inspired by Tumblr.',
        year: 2025,
        role: 'Full Stack',
        stack: ['Node.js', 'Express', 'MongoDB'],
        features: ['Tumblr-inspired feed', 'User accounts', 'Rich text publishing'],
        link: 'https://github.com'
    }
];

function Projects() {
    const sectionRef = useRef(null);
    const boosterRef = useRef(null);
    const textTopRef = useRef(null);
    const textBottomRef = useRef(null);
    const textTopSpanRef = useRef(null);
    const textBottomSpanRef = useRef(null);
    const flashRef = useRef(null);
    const starRef = useRef(null);
    const sectionFlashRef = useRef(null);
    
    const [tearAmount, setTearAmount] = useState(0);
    const [isOpened, setIsOpened] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);

    const prevCardIndexRef = useRef(activeCardIndex);

    // 1. Entrance (mid-pan) + always-on mouse parallax for the bg titles
    useEffect(() => {
        let ctx = null;

        const xToTop = gsap.quickTo(textTopRef.current, "x", { duration: 0.8, ease: "power3.out" });
        const yToTop = gsap.quickTo(textTopRef.current, "y", { duration: 0.8, ease: "power3.out" });
        const xToBot = gsap.quickTo(textBottomRef.current, "x", { duration: 0.8, ease: "power3.out" });
        const yToBot = gsap.quickTo(textBottomRef.current, "y", { duration: 0.8, ease: "power3.out" });

        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) * 2 - 1;
            const y = (e.clientY / innerHeight) * 2 - 1;

            xToTop(x * -40);
            yToTop(y * -40);
            xToBot(x * 40);
            yToBot(y * 40);
        };

        window.addEventListener("mousemove", handleMouseMove);

        const runEntrance = () => {
            if (ctx || !sectionRef.current) return;
            ctx = gsap.context(() => {
                const tl = gsap.timeline();
                tl.fromTo(textTopRef.current, { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" })
                .fromTo(textBottomRef.current, { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=1")
                .fromTo(boosterRef.current,
                    { y: -400, opacity: 0, rotationX: 35 },
                    { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "bounce.out" },
                    "-=0.9"
                );
            }, sectionRef);
        };

        window.addEventListener("projects:enter", runEntrance);
        return () => {
            window.removeEventListener("projects:enter", runEntrance);
            window.removeEventListener("mousemove", handleMouseMove);
            if (ctx) ctx.revert();
        };
    }, []);

    // 2. The Pokémon-Style Burst
    useEffect(() => {
        if (isOpened && boosterRef.current) {
            const booster = boosterRef.current;
            const pack = booster.querySelector('.booster-pack');

            pack.style.transition = 'none';

            const sparks = [];
            const sparkCount = 8;
            for (let i = 0; i < sparkCount; i++) {
                const s = document.createElement('span');
                s.className = 'spark';
                booster.appendChild(s);
                sparks.push(s);
            }

            let ctx = gsap.context(() => {
                const tl = gsap.timeline();
                tl.to(pack, {
                    scale: 0.9,
                    rotation: -2,
                    duration: 0.1,
                    ease: "power2.in"
                })
                .to(pack, {
                    x: () => Math.random() * 12 - 6,
                    y: () => Math.random() * 12 - 6,
                    rotation: () => Math.random() * 6 - 3,
                    duration: 0.04,
                    repeat: 6,
                    yoyo: true,
                    ease: "none"
                })
                .to(pack, {
                    filter: "brightness(2.2) saturate(1.4)",
                    duration: 0.06,
                    repeat: 2,
                    yoyo: true,
                    ease: "none"
                }, "<")
                .fromTo(flashRef.current,
                    { scale: 0, opacity: 1 },
                    { scale: 1, opacity: 0, duration: 0.35, ease: "power2.out" },
                    "-=0.12"
                )
                .fromTo(sectionFlashRef.current,
                    { opacity: 0 },
                    { opacity: 0.6, duration: 0.1, ease: "power1.out" },
                    "-=0.28"
                )
                .to(sectionFlashRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" }, "+=0.02")
                .fromTo(starRef.current,
                    { scale: 0, opacity: 1, rotation: -20 },
                    { scale: 1.2, opacity: 0, rotation: 20, duration: 0.35, ease: "power2.out" },
                    "-=0.25"
                )
                .to(pack, {
                    scale: 1.25,
                    opacity: 0,
                    filter: "blur(8px)",
                    y: -50,
                    rotation: 6,
                    duration: 0.4,
                    ease: "power3.out",
                    onStart: () => {
                        sparks.forEach((s, i) => {
                            const angle = (i / sparkCount) * Math.PI * 2;
                            const dist = 90 + Math.random() * 90;
                            gsap.fromTo(s,
                                { x: 0, y: 0, scale: 0.5, opacity: 1 },
                                {
                                    x: Math.cos(angle) * dist,
                                    y: Math.sin(angle) * dist - 30,
                                    scale: 0.8 + Math.random() * 0.4,
                                    opacity: 0,
                                    duration: 0.4 + Math.random() * 0.2,
                                    ease: "power2.out"
                                }
                            );
                        });
                    }
                }, "-=0.15");
            }, sectionRef);

            ctx.add(() => sparks.forEach((s) => s.remove()));

            return () => ctx.revert();
        }
    }, [isOpened]);

    useEffect(() => {
        if (prevCardIndexRef.current === activeCardIndex) return;
        prevCardIndexRef.current = activeCardIndex;

        const topSpan = textTopSpanRef.current;
        const bottomSpan = textBottomSpanRef.current;
        const title = projectList[activeCardIndex].title;

        const tl = gsap.timeline();
        tl.to([topSpan, bottomSpan], {
            y: 40,
            opacity: 0,
            duration: 0.25,
            ease: "power2.in"
        })
        .add(() => {
            if (topSpan) topSpan.textContent = title;
            if (bottomSpan) bottomSpan.textContent = title;
        })
        .fromTo([topSpan, bottomSpan],
            { y: -40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                onComplete: () => gsap.set([topSpan, bottomSpan], { clearProps: "y,opacity" })
            }
        );

        return () => tl.kill();
    }, [activeCardIndex]);

    const handleTear = (e) => {
        if (isOpened) return;
        const value = parseInt(e.target.value);
        setTearAmount(value);

        if (value > 85) {
            setIsOpened(true);
            setTearAmount(100);
        }
    };

    const nextCard = () => {
        setActiveCardIndex((prev) => (prev + 1) % projectList.length);
    };

   return (
        <section id="projects" className="projects-container" ref={sectionRef}>
            
            {/* 🌟 CINEMATIC BACKGROUND TYPOGRAPHY */}
            <div className="bg-typography-wrapper">
                <h1 className="bg-text bg-text-top" ref={textTopRef}>
                    <span className="bg-text-inner" ref={textTopSpanRef}>{isOpened ? projectList[activeCardIndex].title : 'MY OWN COLLECTION'}</span>
                </h1>
                <h1 className="bg-text bg-text-bottom" ref={textBottomRef}>
                    <span className="bg-text-inner" ref={textBottomSpanRef}>{isOpened ? projectList[activeCardIndex].title : 'MY OWN COLLECTION'}</span>
                </h1>
            </div>

            {/* 💥 SECTION-WIDE BURST FLASH */}
            <div className="section-flash" ref={sectionFlashRef}></div>

            {/* 🖥️ NEW: TERMINAL HUD SIDE ACCENTS TO FILL EMPTY SPACE */}
            <div className="terminal-hud hud-left">
                <div className="hud-line"></div>
                <span className="hud-text">SYS.INIT // V_1.0</span>
                <div className="hud-line"></div>
            </div>
            
            <div className="terminal-hud hud-right">
                <div className="hud-line"></div>
                <span className="hud-text">MEM: 0x8F2A // OK</span>
                <div className="hud-line"></div>
            </div>

            {/* 📦 THE BOOSTER PACK */}
            <div className="booster-wrapper" ref={boosterRef} style={{ pointerEvents: isOpened ? 'none' : 'auto' }}>
                <div className="booster-pack" style={{ '--tear-progress': `${tearAmount}%` }}>
                    
                    <div className="pack-art">
                        <h2 className="pack-title">PROJECTS</h2>
                        <p className="pack-subtitle">Terminal Edition</p>
                        <div className="pack-graphic">v1.0.0-stable</div>
                    </div>

                    <div className="tear-strip">
                        <div className="tear-instructions">
                            <span>◀</span> HOLD & SLIDE TO UNLOCK
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={tearAmount} 
                            onChange={handleTear}
                            className="tear-slider"
                            style={{ direction: 'rtl' }} 
                        />
                        <div className="rip-overlay"></div>
                    </div>
                </div>

                {/* ✨ BURST FX: WHITE FLASH + STARBURST */}
                <div className="booster-flash" ref={flashRef}></div>
                <div className="booster-starburst" ref={starRef}></div>
            </div>

            {/* 🃏 THE 3D CARD STACK */}
            <div className={`card-stack-wrapper ${isOpened ? 'revealed' : ''}`}>
                {projectList.map((proj, index) => {
                    const positionOffset = (index - activeCardIndex + projectList.length) % projectList.length;
                    const isFront = positionOffset === 0;
                    
                    return (
                        <div 
                            key={proj.id}
                            className="project-card"
                            onClick={isFront ? nextCard : undefined}
                            style={{
                                transform: `translateY(${positionOffset * 20}px) translateZ(-${positionOffset * 50}px)`,
                                zIndex: projectList.length - positionOffset,
                                opacity: positionOffset > 2 ? 0 : 1 - (positionOffset * 0.25),
                                cursor: isFront ? 'pointer' : 'default'
                            }}
                        >
                            <div className="card-header">
                                <span className="terminal-mode">zsh // project_view</span>
                                {/* FIX: Now uses 'index + 1' so it actually says 1/3, 2/3, 3/3! */}
                                <span className="terminal-id">[{index + 1}/{projectList.length}]</span>
                            </div>
                            <h3 className="card-title"><span className="prompt">~/$</span> {proj.title}</h3>
                            <div className="card-tech">[{proj.tech}]</div>
                            <p className="card-desc">{proj.desc}</p>
                            
                            <div className="card-footer">
                                <button
                                    className="execute-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProject(proj);
                                    }}
                                >
                                    [./execute]
                                </button>
                                <div className="card-hint">
                                    <span className="blink">_</span> click to cycle
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}

        </section>
    );
}

export default Projects;