// PaperItem.tsx
import React from 'react';

interface Paper {
  year: number;
  subject: string;
  downloadLink: string;
}

interface Props {
  paper: Paper;
  onClick: () => void; // Add onClick prop
}

const PaperItem: React.FC<Props> = ({ paper,onClick }) => {

  const handleItemClick = () => {
    onClick(); // Call the onClick function when the item is clicked
  };

  return (
    <div className="paper-item" onClick={handleItemClick}>
      <p>{paper.year}</p>
      <p>{paper.subject}</p>
      {/* <a href={paper.downloadLink} target="_blank" rel="noopener noreferrer">Download</a> */}
      <a href='#'>Download</a>
    </div>
  );
};

export default PaperItem;
