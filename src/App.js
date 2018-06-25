import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// ui组件引用
import Login from './pages/auth';
import Dashboard from './pages/dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Redirect to="/dashboard" />
        </Switch>
      </Router>
    );
  }
}

export default App;
