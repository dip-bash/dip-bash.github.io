
import React from 'react';
import DOMPurify from 'dompurify';

interface BioProps {
  bio: string;
}

const Bio: React.FC<BioProps> = ({ bio }) => {
  const cleanBio = DOMPurify.sanitize(bio);

  return (
    <section className="fade-in max-w-[650px]">
      <div 
        className="text-text-muted text-[1rem] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: cleanBio }}
      />
    </section>
  );
};

export default Bio;
