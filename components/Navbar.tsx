import React from 'react';

const Navbar: React.FC = () => {
  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Technologies', id: 'tech' },
    { name: 'Certifications', id: 'certs' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm" aria-label="Main navigation">
      <div className="mx-auto flex h-16 max-w-[900px] items-center gap-8 px-4 sm:px-8">
        <a href="#home" className="shrink-0 font-mono text-lg font-medium tracking-tight text-text-main" aria-label="Saumyadip Jana, home">
          SJ<span className="text-accent">.</span>
        </a>
        <div className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto py-2 text-sm text-text-muted">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="shrink-0 transition-colors duration-150 hover:text-text-main"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
