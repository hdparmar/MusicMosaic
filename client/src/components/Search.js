// src/components/Search.js

import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ setResults }) => {
  const [query, setQuery] = useState('');

  const search = async (e) => {
    e.preventDefault();

    const res = await axios.get(`/search?query=${query}`);
    setResults(res.data);
  };

  return (
    <form onSubmit={search}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
