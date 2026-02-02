
import React from 'react';

interface GitHubCalendarProps {
  username: string;
}

const GitHubCalendar: React.FC<GitHubCalendarProps> = ({ username }) => {
  // Creating a mock grid for the contribution graph since we can't fetch external lib easily
  const levels = [0, 1, 2, 3, 4];
  const grid = Array.from({ length: 52 }, () => Array.from({ length: 7 }, () => levels[Math.floor(Math.random() * 5)]));

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-[#161616]';
      case 1: return 'bg-[#333333]';
      case 2: return 'bg-[#555555]';
      case 3: return 'bg-[#999999]';
      case 4: return 'bg-[#ffffff]';
      default: return 'bg-[#161616]';
    }
  };

  return (
    <section className="fade-in space-y-6">
      <h2 className="text-xl font-semibold">Contributions</h2>
      <div className="border border-border rounded-xl p-4 bg-black overflow-hidden">
        <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-hide">
          {grid.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3px] shrink-0">
              {week.map((day, dIdx) => (
                <div 
                  key={dIdx} 
                  className={`w-[10px] h-[10px] rounded-[1px] ${getLevelColor(day)}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center text-[10px] text-[#525252] font-mono">
          <span>Learn more about {username}'s contributions on GitHub.</span>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="flex gap-[3px]">
              <div className="w-[10px] h-[10px] rounded-[1px] bg-[#161616]" />
              <div className="w-[10px] h-[10px] rounded-[1px] bg-[#333333]" />
              <div className="w-[10px] h-[10px] rounded-[1px] bg-[#555555]" />
              <div className="w-[10px] h-[10px] rounded-[1px] bg-[#999999]" />
              <div className="w-[10px] h-[10px] rounded-[1px] bg-[#ffffff]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubCalendar;
