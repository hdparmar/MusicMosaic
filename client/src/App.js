// src/App.js

import React, { useState } from 'react';
import Login from './components/Login';
import Search from './components/Search';
import Results from './components/Results';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [results, setResults] = useState([]);

 // Detect when the user is logged in
  // This is a very basic check and may need to be updated depending on your authentication setup
  if (window.location.href.indexOf('access_token') !== -1 && !loggedIn) {
    setLoggedIn(true);
  }

  return (
    <div className="App">
      {loggedIn ? (
        <div>
          <Search setResults={setResults} />
          <Results results={results} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
