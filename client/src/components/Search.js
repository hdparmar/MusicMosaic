import React, { useState, useEffect } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Extract the access token from the URL
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substr(1)).get('access_token');

    console.log('Access token:', token);

    setAccessToken(token);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={searchQuery} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
