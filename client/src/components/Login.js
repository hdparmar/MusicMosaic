// src/components/Login.js
import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

function Login() {
  const setToken = useContext(AuthContext);

  const handleLogin = () => {
    // fetch the token from your server when the login button is clicked
    fetch('http://localhost:5001/login', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        console.log(response);
        return response.json();
      }) // get the response as json
      .then(data => {
        // set the token in state
        setToken(data.access_token);
      });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
