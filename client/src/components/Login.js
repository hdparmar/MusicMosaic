import React from 'react';

const Login = () => {
  const handleLogin = () => {
    // Redirect to the Express server's /login route
    window.location.href = 'http://localhost:5001/login';
  };

  return (
    <div>
      <h1>Welcome to our Spotify app!</h1>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
};

export default Login;
