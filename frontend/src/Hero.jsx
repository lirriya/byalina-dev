import React from 'react';
import './Hero.css';
import Terminal from './Terminal';

function Hero() {
  return (
    <div className="hero-wrapper">
      {/* Background Glow Blobs */}
      <div className="glow-blob blob-rose"></div>
      <div className="glow-blob blob-teal"></div>

      {/* Left side: Your text content */}
      <div className="hero-content">
        <h1 className="hero-title">Made byalina.dev</h1>
        
        <div className="typewriter-container">
          <p className="hero-subtitle">
            L3 CS Student <span>•</span> Seeking Software Engineering Stage
          </p>
        </div>
      </div>

      {/* Right side: The new Interactive Terminal */}
      <Terminal />

      {/* Bouncing Scroll Indicator */}
      <div className="scroll-indicator">
        <p>scroll</p>
        <div className="scroll-line"></div>
      </div>
    </div>
  );
}

export default Hero;