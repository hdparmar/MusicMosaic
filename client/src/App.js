import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';  // <-- Don't forget to import the Login component
import Search from './components/Search';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/search' component={Search} />
        {/* Your other routes go here... */}
      </Switch>
    </Router>
  );
}

export default App;
