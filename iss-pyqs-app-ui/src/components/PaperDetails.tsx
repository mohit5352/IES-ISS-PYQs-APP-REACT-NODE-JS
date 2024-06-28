// PaperDetails.tsx
import React from 'react';

interface Paper {
  year: number;
  subject: string;
  downloadLink: string;
}

interface Props {
  paper: Paper;
}

const PaperDetails: React.FC<Props> = ({ paper }) => {
  return (
    <div className="paper-details">
      <p>Year: {paper.year}</p>
      <p>Subject: {paper.subject}</p>
      <a href={paper.downloadLink} target="_blank" rel="noopener noreferrer">Download</a>
    </div>
  );
};

export default PaperDetails;
