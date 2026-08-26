import React, { useState, useEffect } from 'react';
import './Terminal.css';

function Terminal() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1200);
    const timer2 = setTimeout(() => setStep(2), 2200);
    const timer3 = setTimeout(() => setStep(3), 3200);
    
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <div className="terminal-wrapper">
      {/* Fedora/GNOME Linux Header */}
      <div className="terminal-header">
        <div className="terminal-title">guest@alina.dev:~</div>
        <div className="fedora-controls">
          <span className="control minimize">−</span>
          <span className="control maximize">□</span>
          <span className="control close">×</span>
        </div>
      </div>
      
      {/* Original Lily Pad Text Body */}
      <div className="terminal-body">
        <p className="term-line command">
          <span className="prompt">$</span> npm run start-career
        </p>
        
        {step >= 1 && (
          <p className="term-line output">
            Compiling skills... <span className="status-ok">[OK]</span>
          </p>
        )}
        
        {step >= 2 && (
          <p className="term-line output">
            Target acquired: <span className="highlight">Software Engineering Stage</span>
          </p>
        )}
        
        {step >= 3 && (
          <p className="term-line command">
            <span className="prompt">$</span> <span className="term-cursor">_</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Terminal;