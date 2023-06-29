// src/components/Login.js

import React from 'react';

const Login = () => {
  return (
    <button onClick={() => window.location = '/login'}>
      Log in with Spotify
    </button>
  );
};

export default Login;
