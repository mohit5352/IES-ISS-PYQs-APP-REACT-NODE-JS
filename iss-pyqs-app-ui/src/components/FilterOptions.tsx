// FilterOptions.tsx
import React, { useState } from 'react';

interface Props {
  papers: { year: number; subject: string; downloadLink: string }[];
  onFilter: (selectedYear: number | null) => void;
}

const FilterOptions: React.FC<Props> = ({ papers, onFilter }) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    onFilter(year);
  };

  // Extract unique years from papers
  const years = Array.from(new Set(papers.map((paper) => paper.year)));

  return (
    <div className="filter-options paper-form-group">
      <label htmlFor="year-select">Filter by Year</label>
      <select id="year-select" value={selectedYear || ''} onChange={handleChange}>
        <option value="00">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOptions;
