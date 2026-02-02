
import React from 'react';
import { TechCategory, TechItem } from '../types';

interface TechStackProps {
  stack: TechCategory[];
}

const getTechStyle = (name: string): { short: string, color: string } => {
  const styles: Record<string, { short: string, color: string }> = {
    'Python': { short: 'Py', color: 'text-blue-400 group-hover:bg-blue-400/10 group-hover:border-blue-400/30' },
    'Bash': { short: 'Sh', color: 'text-green-400 group-hover:bg-green-400/10 group-hover:border-green-400/30' },
    'Linux': { short: 'Lx', color: 'text-yellow-400 group-hover:bg-yellow-400/10 group-hover:border-yellow-400/30' },
    'Docker': { short: 'Dk', color: 'text-sky-400 group-hover:bg-sky-400/10 group-hover:border-sky-400/30' },
    'Git': { short: 'Gt', color: 'text-orange-400 group-hover:bg-orange-400/10 group-hover:border-orange-400/30' },
    'SQL': { short: 'Sq', color: 'text-indigo-400 group-hover:bg-indigo-400/10 group-hover:border-indigo-400/30' },
    'Pandas': { short: 'Pd', color: 'text-purple-400 group-hover:bg-purple-400/10 group-hover:border-purple-400/30' },
    'NumPy': { short: 'Np', color: 'text-blue-500 group-hover:bg-blue-500/10 group-hover:border-blue-500/30' },
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
