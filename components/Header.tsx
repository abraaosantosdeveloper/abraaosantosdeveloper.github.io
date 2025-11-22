'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Scroll handler
    const handleScroll = () => {
      setScrolled(window.scrollY >= 80);

      // Active section detection
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollY = window.pageYOffset;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionHeight = section.offsetHeight;
          const sectionTop = section.offsetTop - 100;

          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
      <nav className="nav">
        <Link href="#home" className="nav__logo">
          <i className='bx bx-code-alt'></i>
          <span>Abraão.dev</span>
        </Link>

        <ul className={`nav__menu ${menuOpen ? 'show' : ''}`} id="navMenu">
          <li><Link href="#home" className={`nav__link ${activeSection === 'home' ? 'active' : ''}`} onClick={closeMenu}>Início</Link></li>
          <li><Link href="#about" className={`nav__link ${activeSection === 'about' ? 'active' : ''}`} onClick={closeMenu}>Sobre</Link></li>
          <li><Link href="#projects" className={`nav__link ${activeSection === 'projects' ? 'active' : ''}`} onClick={closeMenu}>Projetos</Link></li>
          <li><Link href="#contact" className={`nav__link ${activeSection === 'contact' ? 'active' : ''}`} onClick={closeMenu}>Contato</Link></li>
          <li>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
              <i className={`bx ${theme === 'dark' ? 'bx-sun' : 'bx-moon'}`}></i>
            </button>
          </li>
        </ul>

        <button className="nav__toggle" onClick={toggleMenu} aria-label="Abrir menu">
          <i className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`}></i>
        </button>
      </nav>
    </header>
  );
}
