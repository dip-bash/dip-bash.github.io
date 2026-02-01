
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Tech', id: 'tech' },
    { name: 'Certifications', id: 'certs' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust for sticky navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'home' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
    closeMenu();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
          scrolled ? 'py-3 bg-bg/60 backdrop-blur-md' : 'py-6'
        }`}
      >
        <div className="max-w-[850px] mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={(e) => handleNavClick(e, 'home')} 
            className="text-xl font-bold font-mono tracking-tighter hover:text-accent transition-colors z-[110]"
          >
            SJ<span className="text-accent">.</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-surface/60 backdrop-blur-xl border border-border/50 rounded-full shadow-2xl">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.id)}
                className="px-5 py-2 rounded-full text-[13px] font-medium text-text-muted hover:text-text-main hover:bg-white/5 transition-all"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-[110] focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-[2px] bg-text-main transition-all duration-300 transform origin-center ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
            <span className={`w-6 h-[2px] bg-text-main transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
            <span className={`w-6 h-[2px] bg-text-main transition-all duration-300 transform origin-center ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[105] md:hidden transition-all duration-500 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-bg/90 backdrop-blur-2xl" onClick={closeMenu}></div>
        <div className="relative flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, idx) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`text-3xl font-bold tracking-tight transition-all duration-500 transform ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } hover:text-accent`}
              style={{ transitionDelay: `${idx * 75}ms` }}
            >
              <span className="text-accent/30 font-mono text-sm mr-4">0{idx + 1}.</span>
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
