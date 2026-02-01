
import React, { useState, useEffect } from 'react';
import { Identity } from '../types';

interface HeaderProps {
  identity: Identity | null;
  roles: string[];
}

const Header: React.FC<HeaderProps> = ({ identity, roles }) => {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [localTime, setLocalTime] = useState('--:-- --');

  useEffect(() => {
    if (!roles || roles.length === 0) return;
    
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 120;
    
    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!identity) return null;

  const githubUser = identity.socials.github?.split('/').filter(Boolean).pop() || 'user';

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fade-in space-y-6 md:space-y-10">
      {/* Top Row: Avatar & Status */}
      <div className="flex flex-row items-center justify-between">
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-purple rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
           <img 
            src={`https://github.com/${githubUser}.png`} 
            alt={identity.name} 
            className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-border bg-surface"
            onError={(e) => { (e.target as any).src = "https://picsum.photos/seed/dev/160/160" }}
          />
        </div>
        <div className="bg-[#22c55e0d] px-4 py-1.5 rounded-full border border-[#22c55e33] flex items-center gap-2 text-[10px] md:text-xs text-[#4ade80] font-medium transition-all hover:bg-[#22c55e1a]">
          <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)] animate-pulse"></span>
          {identity.status}
        </div>
      </div>

      {/* Name & Typewriter */}
      <div className="space-y-2 md:space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-main">
          {identity.name}
        </h1>
        <p className="min-h-[1.8rem] text-accent font-mono text-base md:text-lg font-medium">
          <span>{displayText}</span>
          <span className="cursor">_</span>
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 md:gap-y-3 gap-x-8 font-mono text-[0.85rem] md:text-[0.9rem]">
        {[
          { icon: 'fas fa-code', text: roles[0] || 'Developer', color: 'text-blue-400' },
          { icon: 'fas fa-map-marker-alt', text: identity.location, color: 'text-red-400' },
          { icon: 'fas fa-envelope', text: identity.email, color: 'text-orange-400', link: `mailto:${identity.email}` },
          { icon: 'far fa-clock', text: `${localTime} // local`, color: 'text-green-400' },
          { icon: 'fas fa-globe', text: `${githubUser}.github.io`, color: 'text-purple-400', link: `https://${githubUser}.github.io` },
          { icon: 'fas fa-user', text: identity.pronouns, color: 'text-pink-400' }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-text-muted group">
            <div className={`w-7 h-7 shrink-0 flex items-center justify-center border border-border rounded-lg bg-surface ${item.color} text-[0.8rem] group-hover:border-accent/30 transition-all`}>
              <i className={item.icon}></i>
            </div>
            {item.link ? (
              <a href={item.link} target={item.link.startsWith('http') ? "_blank" : "_self"} className="hover:text-text-main transition-colors decoration-accent/30 underline-offset-4 truncate">
                {item.text}
              </a>
            ) : (
              <span className="truncate">{item.text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Action Area: 2x2 Grid on Mobile, 4x1 on Desktop */}
      <div className="pt-4 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          <a 
            href="./saumyadip_resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl bg-white text-black font-bold text-[13px] inline-flex items-center justify-center gap-2.5 hover:bg-opacity-90 transition-all shadow-lg shadow-white/5 active:scale-95"
          >
            <i className="far fa-file-alt"></i> Resume
          </a>
          
          <button 
            onClick={handleContactClick}
            className="px-4 py-3 rounded-xl border border-border bg-surface text-text-muted font-bold text-[13px] inline-flex items-center justify-center gap-2.5 hover:text-text-main hover:border-accent/30 transition-all active:scale-95"
          >
            <i className="far fa-envelope"></i> Contact
          </button>

          {identity.socials.github && (
            <a 
              href={identity.socials.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl border border-border bg-surface text-text-muted font-bold text-[13px] inline-flex items-center justify-center gap-2.5 hover:text-text-main hover:border-accent/30 transition-all active:scale-95"
            >
              <i className="fab fa-github text-base"></i> GitHub
            </a>
          )}

          {identity.socials.linkedin && (
            <a 
              href={identity.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl border border-border bg-surface text-text-muted font-bold text-[13px] inline-flex items-center justify-center gap-2.5 hover:text-text-main hover:border-accent/30 transition-all active:scale-95"
            >
              <i className="fab fa-linkedin text-base"></i> LinkedIn
            </a>
          )}
        </div>

        {/* Twitter/X Link */}
        {identity.socials.twitter && (
          <div className="flex justify-center sm:justify-start px-1">
            <a 
              href={identity.socials.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-text-muted hover:text-[#1DA1F2] transition-colors flex items-center gap-2.5 font-mono"
            >
              <i className="fab fa-x-twitter"></i> Follow for updates
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
