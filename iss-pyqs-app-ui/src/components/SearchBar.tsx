// SearchBar.tsx
import React from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch(query);
  };

  return (
    <div className='search-input'>
      <input type="text" placeholder="Search papers..." onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;
