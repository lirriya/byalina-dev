import React, { useRef, useState, useEffect } from 'react';
import './About.css';

const lilyPads = [
    {
        id: 1,
        title: 'Study Background',
        content: 'L3 CS Student currently diving deep into software engineering, algorithms, and system architecture.',
        triggerPoint: 0.2,
        leftPosition: '25%'
    },
    {
        id: 2,
        title: 'My Skills',
        content: 'React, JavaScript, Vite, Linux Ricing, and building aesthetic, highly interactive web experiences.',
        triggerPoint: 0.5,
        leftPosition: '75%'
    },
    {
        id: 3,
        title: 'Who I Am',
        content: 'A creative developer who believes code should be as beautiful on the screen as it is under the hood.',
        triggerPoint: 0.8,
        leftPosition: '25%'
    },
];

function About() {
    const containerRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const scrollContainer = document.getElementById('main-scroller');
        if (!scrollContainer) return;

        const handleScroll = () => {
            if (!containerRef.current) return;

            const { top, height } = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const scrollDistance = -top;
            const totalScrollableDistance = height - windowHeight;

            let currentProgress = scrollDistance / totalScrollableDistance;
            currentProgress = Math.max(0, Math.min(1, currentProgress));

            setProgress(currentProgress);
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="about" className="about-container" ref={containerRef}>
            <div className="sticky-viewport">
                
                {/* 🌊 THE VERTICAL WAVY WATER STREAM */}
                <div className="water-stream-wrapper">
                    <div 
                        className="water-surface"
                        style={{
                            // Scrolls the SVG pattern vertically toward you!
                            backgroundPositionY: `${progress * 1500}px` 
                        }}
                    ></div>
                </div>

                {/* THE LILY PADS */}
                {lilyPads.map((pad) => {
                    const diff = progress - pad.triggerPoint;
                    const isLeftSide = pad.leftPosition === '25%';
                    const directionMultiplier = isLeftSide ? -1 : 1;

                    let scale = 1;
                    if (diff < 0) {
                        scale = Math.min(1, Math.max(0.5, 0.5 + (diff + 0.3) * 1.66));
                    }

                    let translateX = 0;
                    if (diff > 0) {
                        translateX = diff * 600 * directionMultiplier;
                    }

                    let opacity = 1 - Math.abs(diff * 3);
                    opacity = Math.max(0, Math.min(1, opacity));

                    const isVisible = opacity > 0.05;

                    return (
                        <div
                            key={pad.id}
                            className="lily-pad-card"
                            style={{
                                left: pad.leftPosition,
                                transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
                                opacity: opacity,
                                zIndex: Math.round(opacity * 100),
                                pointerEvents: isVisible ? 'auto' : 'none'
                            }}
                        >
                            <svg className="lily-flower" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <path className="sepal" d="M50,85 Q20,90 15,70 Q35,80 50,85 Z" fill="#2E5C47" />
                                <path className="sepal" d="M50,85 Q80,90 85,70 Q65,80 50,85 Z" fill="#2E5C47" />
                                <path className="petal outer-left" d="M50,85 C20,65 10,40 25,25 C40,40 45,65 50,85 Z" fill="#A35D53" />
                                <path className="petal outer-right" d="M50,85 C80,65 90,40 75,25 C60,40 55,65 50,85 Z" fill="#A35D53" />
                                <path className="petal mid-left" d="M50,85 C30,60 20,35 35,20 C45,40 48,65 50,85 Z" fill="#B57368" />
                                <path className="petal mid-right" d="M50,85 C70,60 80,35 65,20 C55,40 52,65 50,85 Z" fill="#B57368" />
                                <path className="petal inner-left" d="M50,85 C35,65 30,40 45,25 C48,45 49,65 50,85 Z" fill="#D3968C" />
                                <path className="petal inner-right" d="M50,85 C65,65 70,40 55,25 C52,45 51,65 50,85 Z" fill="#D3968C" />
                                <path className="petal center-petal" d="M50,85 C45,60 40,30 50,15 C60,30 55,60 50,85 Z" fill="#E8B2A9" />
                            </svg>
                            <h3 className="pad-title">{pad.title}</h3>
                            <p className="pad-content">{pad.content}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default About;