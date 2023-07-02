// src/components/Search.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';

function Search({ setAppResults }) {
  const token = useContext(AuthContext); // Get the token from context

  useEffect(() => {
    console.log(token); // Log the token
  }, [token]); // Depend on the token

  const [query, setQuery] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    
    const response = await axios.get(`/search?query=${query}`);
    setAppResults(response.data);
  };

  return (
    <form onSubmit={handleSearch}>
      <input 
        type="text" 
        value={query} 
        onChange={(event) => setQuery(event.target.value)} 
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
