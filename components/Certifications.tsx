import React from 'react';
import { Certification } from '../types';
import Icon from './Icon';

interface CertificationsProps {
  certifications: Certification[];
}

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-medium tracking-tight text-text-main">Certifications</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {certifications.map((certification, idx) => (
          <a
            key={idx}
            href={certification.link}
            target={certification.link === '#' ? undefined : '_blank'}
            rel={certification.link === '#' ? undefined : 'noopener noreferrer'}
            className="flex min-h-16 items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3 transition-colors duration-150 hover:border-text-subtle"
          >
            <Icon name="award" className="h-5 w-5 shrink-0 text-accent" />
            <span className="min-w-0 flex-1 text-sm font-medium text-text-main">{certification.title}</span>
            <Icon name="arrow-up-right" className="h-4 w-4 shrink-0 text-text-subtle" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
