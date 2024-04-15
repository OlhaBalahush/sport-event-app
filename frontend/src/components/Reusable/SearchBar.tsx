import React, { useState } from 'react';

interface Props {
    onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: any) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search..."
      className='w-full rounded-lg px-5 py-2 border border-custom-dark'
    />
  );
};

export default SearchBar;
