import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

function Terminal() {
  // --- 1. STATE VARIABLES ---
  const [step, setStep] = useState(0); 
  const [input, setInput] = useState(''); 
  const [history, setHistory] = useState([ 
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  
  // FIXED: Renamed this to match what we use in the HTML below!
  const terminalBodyRef = useRef(null);

  // --- 2. BOOT SEQUENCE TIMERS ---
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1200);
    const timer2 = setTimeout(() => setStep(2), 2200);
    const timer3 = setTimeout(() => setStep(3), 3200);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  // --- 3. AUTO-SCROLL LOGIC ---
  useEffect(() => {
    if (terminalBodyRef.current) {
      // This safely scrolls ONLY the inside of the terminal to the very bottom
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, step]);

  // --- 4. COMMAND LOGIC ---
  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'command', text: cmd }];

      if (cmd === 'help') {
        newHistory.push({ type: 'output', text: 'Available commands: about, skills, stage, clear' });
      } else if (cmd === 'about') {
        newHistory.push({ type: 'output', text: "Hi! I'm Alina, currently finishing my licence in Computer Science. In love with coding in Java, cozy video games and homemade cinnamonrolls in autumn. One cool thing about me: I can make myself be interested in and passionate about almost anything :) " });
      } else if (cmd === 'skills') {
        newHistory.push({ type: 'output', text: 'Java, C, Python, C++. React, Vite. html/css. Canva, SceneBuilder. Working with DataBases. Git.' });
      } else if (cmd === 'stage') {
        newHistory.push({ type: 'output', text: 'Status: Actively looking for a Stage! Please please please hire me!' });
      } else if (cmd === 'clear') {
        setHistory([]); 
        setInput('');
        return;
      } else if (cmd !== '') {
        newHistory.push({ type: 'error', text: `Command not found: ${cmd}. Type "help" for a list of commands :)` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  const focusInput = () => {
    const inputEl = document.getElementById('terminal-input');
    if (inputEl) inputEl.focus();
  };

  // --- 5. WHAT ACTUALLY RENDERS (JSX) ---
  return (
    <div className="terminal-wrapper" onClick={focusInput}>
      
      {/* Fedora-style Header */}
      <div className="terminal-header">
        <div className="terminal-title">guest@alina.dev:~</div>
        <div className="fedora-controls">
          <span className="control minimize">−</span>
          <span className="control maximize">□</span>
          <span className="control close">×</span>
        </div>
      </div>
      
      {/* Attached the correct ref here! */}
      <div className="terminal-body" ref={terminalBodyRef}>
        
        {/* PART A: The Static Boot Sequence */}
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

        {/* PART B: The Interactive Section */}
        {step >= 3 && (
          <>
            <br/>
            
            {/* Prints command history */}
            {history.map((line, index) => (
              <div key={index} className="term-line">
                {line.type === 'command' && <span className="prompt">guest@alina:~$ </span>}
                <span className={line.type === 'error' ? 'text-error' : 'text-output'}>
                  {line.text}
                </span>
              </div>
            ))}
            
            {/* The Input Box */}
            <div className="input-line">
              <span className="prompt">guest@alina:~$ </span>
              <input 
                id="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                autoComplete="off"
                spellCheck="false"
                autoFocus
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Terminal;