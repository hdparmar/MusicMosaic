// src/components/Login.js

import React from 'react';

function Login() {
  const handleLogin = () => {
    // Redirect the user to the Spotify login page
    window.location.href = 'http://localhost:5001/login';
  };

  return (
    <div>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
}

export default Login;
