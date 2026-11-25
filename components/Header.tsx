import React, { useEffect, useState } from 'react';
import { Identity } from '../types';
import Icon from './Icon';

interface HeaderProps {
  identity: Identity | null;
  roles: string[];
}

const Header: React.FC<HeaderProps> = ({ identity, roles }) => {
  const [localTime, setLocalTime] = useState('--:-- --');

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(new Date().toLocaleTimeString('en-US', {
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
  const details = [
    { icon: 'map', text: identity.location },
    { icon: 'clock', text: `${localTime} local time` },
    { icon: 'user', text: identity.pronouns },
  ];

  return (
    <header className="space-y-8">
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 items-center gap-4">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface text-lg font-medium text-text-muted">
            {identity.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
            <img
              src={`https://github.com/${githubUser}.png`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              onError={(event) => { event.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="min-w-0">
            <p className="mb-2 flex items-center gap-2 text-sm text-text-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {identity.status}
            </p>
            <h1 className="text-3xl font-medium tracking-[-0.03em] text-text-main sm:text-4xl">
              {identity.name}
            </h1>
          </div>
        </div>
      </div>

      {roles.length > 0 && (
        <p className="max-w-2xl text-base leading-7 text-accent">
          {roles.join(' · ')}
        </p>
      )}

      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-muted">
        {details.map((item) => (
          <div key={item.icon} className="inline-flex items-center gap-2">
            <Icon name={item.icon} className="h-4 w-4 text-text-subtle" />
            <span>{item.text}</span>
          </div>
        ))}
        {identity.email && (
          <a className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-text-main" href={`mailto:${identity.email}`}>
            <Icon name="mail" className="h-4 w-4 text-text-subtle" />
            <span>{identity.email}</span>
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="./saumyadip_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-bg transition-colors duration-150 hover:bg-[#a9c5ff]"
        >
          <Icon name="file" className="h-4 w-4" />
          Résumé
        </a>
        <a
          href="#contact"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-text-main transition-colors duration-150 hover:border-text-subtle"
        >
          <Icon name="mail" className="h-4 w-4" />
          Contact
        </a>
        {identity.socials.github && (
          <a
            href={identity.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-text-main transition-colors duration-150 hover:border-text-subtle"
          >
            <Icon name="github" className="h-4 w-4" />
            GitHub
          </a>
        )}
        {identity.socials.linkedin && (
          <a
            href={identity.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-text-main transition-colors duration-150 hover:border-text-subtle"
          >
            <Icon name="linkedin" className="h-4 w-4" />
            LinkedIn
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
