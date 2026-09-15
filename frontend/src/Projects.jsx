import React, { useState } from 'react';
import './Projects.css';

// The data we will eventually pull from your Java backend!
const projectList = [
    { id: 1, title: 'Portfolio', tech: 'React // CSS', desc: 'You are going through it right now!! ' },
    { id: 2, title: 'Cluedo', tech: 'Java', desc: 'Multiplayer game made in Java with Database' },
    { id: 3, title: 'MythiFox', tech: 'Full stack', desc: 'The Blog website inspired by Tumblr.' }
];

function Projects() {
    const [tearAmount, setTearAmount] = useState(0);
    const [isOpened, setIsOpened] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState(0);

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
        <section id="projects" className="projects-container">
            
            {/* 📦 THE BOOSTER PACK */}
            <div className={`booster-wrapper ${isOpened ? 'burst' : ''}`}>
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
                                <span className="card-dot red"></span>
                                <span className="card-dot yellow"></span>
                                <span className="card-dot green"></span>
                            </div>
                            <h3 className="card-title"><span className="prompt">~/$</span> {proj.title}</h3>
                            <div className="card-tech">[{proj.tech}]</div>
                            <p className="card-desc">{proj.desc}</p>
                            
                            <div className="card-hint">
                                <span className="blink">_</span> click to cycle
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
    );
}

export default Projects;