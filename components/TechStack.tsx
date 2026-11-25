import React from 'react';
import { TechCategory } from '../types';

interface TechStackProps {
  stack: TechCategory[];
}

const formatLabel = (label: string) => label.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());

const TechStack: React.FC<TechStackProps> = ({ stack }) => {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-medium tracking-tight text-text-main">Technologies</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stack.map((category) => (
          <div key={category.label} className="rounded-xl border border-border bg-surface p-6">
            <h3 className="mb-4 text-sm font-medium text-text-muted">
              {formatLabel(category.label)}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="rounded-md border border-border bg-bg px-3 py-2 text-sm text-text-main"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
