import React from 'react';
import './Navbar.css';

function Navbar({ activeSection, scrollToSection }) {
  const navItems = [
    { id: 'hero', label: 'home' },
    { id: 'about', label: 'about' },
    { id: 'projects', label: 'projects' },
    { id: 'contact', label: 'contact' },
  ];

  
  const isHero = activeSection === 'hero';

  return (
    <nav className="navbar">
      <ul className={`nav-list ${isHero ? 'hero-nav-list' : ''}`}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id} className="nav-item">
              <button
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;