
import React from 'react';
import { TechCategory, TechItem } from '../types';

interface TechStackProps {
  stack: TechCategory[];
}

const getTechStyle = (name: string): { short: string, color: string } => {
  const styles: Record<string, { short: string, color: string }> = {
  };
  
  return styles[name] || { 
    short: name.substring(0, 2), 
    color: 'text-accent group-hover:bg-accent/10 group-hover:border-accent/30' 
  };
};

const TechStack: React.FC<TechStackProps> = ({ stack }) => {
  // Flatten all items from all categories into a single array
  const allItems = stack.reduce((acc, cat) => [...acc, ...cat.items], [] as TechItem[]);

  return (
    <section className="fade-in space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Technologies</h2>
        <div className="h-[1px] flex-1 bg-border mx-6 opacity-50"></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {allItems.map((item, idx) => {
          const style = getTechStyle(item.name);
          return (
            <div 
              key={`${item.name}-${idx}`} 
              className="group flex items-center gap-3 cursor-default"
            >
              <div className={`w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-surface text-[11px] font-bold font-mono transition-all shadow-sm ${style.color}`}>
                {style.short}
              </div>
              <span className="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors font-main">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStack;
