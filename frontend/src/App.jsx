import React from 'react';
import './App.css';

function App() {
  return (
    <div className="portfolio-container">
      <section className="section hero-section">
        <h1 style={{ color: "#0A3323" }}>Made byalina.dev</h1>
        <p style={{ color: "#0A3323" }}>aspiring swe</p>
      </section>

      <section className="section about-section">
        <h2>About Me</h2>
        <p>buttons to show info: study background, skills, me as a person</p>
      </section>

      
      <section className="section projects-section">
        <h2>Projects</h2>
        <p>Cluedo, Mythifox, Tvoria, ghost train, tic tac toe</p>
      </section>

      <section className="section contact-section">
        <h2>For contact info</h2>
      </section>
    </div>
  );
}

export default App;