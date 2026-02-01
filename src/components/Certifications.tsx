
import React from 'react';
import { Certification } from '../types';

interface CertificationsProps {
  certifications: Certification[];
}

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  return (
    <section className="fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
        <div className="h-[1px] flex-1 bg-border mx-6 opacity-50"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert, idx) => {
          const colors = [
            'text-blue-400', 'text-purple-400', 'text-pink-400', 'text-green-400', 'text-orange-400'
          ];
          const color = colors[idx % colors.length];
          
          return (
            <a 
              key={idx} 
              href={cert.link} 
              className="flex items-center gap-4 p-5 border border-border rounded-2xl bg-surface hover:border-accent/20 hover:bg-surface-hover transition-all group"
            >
              <div className={`w-12 h-12 flex items-center justify-center border border-border rounded-xl bg-bg ${color} group-hover:border-accent/30 transition-colors shadow-sm`}>
                <i className="fas fa-award text-xl"></i>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[0.95rem] font-semibold text-text-main truncate group-hover:text-accent transition-colors">{cert.title}</h3>
                <p className="text-xs text-[#525252] font-mono mt-0.5">Verified</p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-border opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1">
                <i className="fas fa-chevron-right text-[0.6rem] text-accent"></i>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Certifications;
