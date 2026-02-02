
import React from 'react';

interface BioProps {
  bio: string;
}

const Bio: React.FC<BioProps> = ({ bio }) => {
  return (
    <section className="fade-in max-w-[650px]">
      <div 
        className="text-text-muted text-[1rem] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: bio }}
      />
    </section>
  );
};

export default Bio;
