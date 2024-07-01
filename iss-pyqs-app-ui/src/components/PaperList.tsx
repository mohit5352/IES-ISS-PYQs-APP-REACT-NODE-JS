// PaperList.tsx
import React from 'react';
import PaperItem from './PaperItem';

interface Paper {
  year: number;
  subject: string;
  downloadLink: string;
}

interface Props {
    papers: Paper[];
    onPaperClick: (paper: Paper) => void; // Add onPaperClick prop
}

const PaperList: React.FC<Props> = ({ papers, onPaperClick }) => {
  
  const handlePaperClick = (paper: Paper) => {
    onPaperClick(paper); // Call the onPaperClick function with the clicked paper
  };

  return (
    <ul className='paper-list'>
      {papers.map((paper, index) => (
        <PaperItem key={index} paper={paper} onClick={() => handlePaperClick(paper)}  />
      ))}
    </ul>
  );
};

export default PaperList;


