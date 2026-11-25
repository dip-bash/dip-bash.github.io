
import React from 'react';
import DOMPurify from 'dompurify';

interface BioProps {
  bio: string;
}

const Bio: React.FC<BioProps> = ({ bio }) => {
  const cleanBio = DOMPurify.sanitize(bio);

  return (
    <section className="max-w-[680px] space-y-4">
      <h2 className="text-xl font-medium tracking-tight text-text-main">About</h2>
      <div
        className="text-base leading-7 text-text-muted"
        dangerouslySetInnerHTML={{ __html: cleanBio }}
      />
    </section>
  );
};

export default Bio;
