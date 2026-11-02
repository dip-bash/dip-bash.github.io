import React from 'react';
import { TechCategory } from '../types';
import { iconColor } from '../services/iconColor';

interface TechStackProps {
  stack: TechCategory[];
}

const TechStack: React.FC<TechStackProps> = ({ stack }) => {
  return (
    <section className="fade-in space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Technologies</h2>
        <div className="h-[1px] flex-1 bg-border mx-6 opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {stack.map((cat) => (
          <div key={cat.label} className="bg-surface border border-border rounded-2xl p-5 space-y-4">
            <h3 className="text-[11px] font-mono font-bold tracking-[0.15em] text-text-muted">
              {cat.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => {
                const c = iconColor(item.name);
                return (
                  <div
                    key={item.name}
                    className="group flex items-center gap-2 rounded-lg border border-border bg-bg pl-1 pr-3 py-1 cursor-default transition-colors"
                  >
                    <span
                      className="w-7 h-7 flex items-center justify-center rounded-md text-[10px] font-bold font-mono"
                      style={{ color: c.color, backgroundColor: c.soft, border: `1px solid ${c.border}` }}
                    >
                      {item.name.substring(0, 2)}
                    </span>
                    <span className="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
