import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

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

    // Connecting to MQTT Broker
    const mqtt = require('mqtt');
    const client = mqtt.connect('ws://localhost:9001');

    client.on('connect', () => {
      // When connected, publish the user's search request and the access token
      client.publish('spotify/search', JSON.stringify({ searchQuery, accessToken }));
      //client.end(); // Close the connection when you're done
    });
    client.on('message', (topic, message) => {
      if (topic === 'spotify/search/results') {
        const results = JSON.parse(message.toString());
        console.log(results); // Log the results
        // Update your state with the results...
      }
    });
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
