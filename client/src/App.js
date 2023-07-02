// src/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Search from './components/Search';
import Results from './components/Results';
import AuthContext from './AuthContext'; // Import AuthContext
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  const [token, setToken] = useState("");
  const [appResults, setAppResults] = useState("");

  //console.log('Token', token);

  useEffect(() => {
    let token = window.localStorage.getItem("token");

    if (!token) {
      fetch('http://localhost:5001/login')
        .then(response => response.json())
        .then(data => {
          token = data;
          window.localStorage.setItem("token", token);
          setToken(token);
        })
        .catch(error => console.log('Error:', error));
    } else {
      setToken(token);
    }
  }, []);

  return (
    <div className="app">
      <AuthContext.Provider value={token}> {/* Provide the token value to all children */}
        <Router>
          <Switch>
            <Route exact path="/">
              {token ? <Redirect to="/search" /> : <Login />}
            </Route>
            <Route path="/search">
              {token ? <Search setAppResults={setAppResults} /> : <Redirect to="/" />}
            </Route>
            <Route path="/results">
              {token ? <Results results={appResults} /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;