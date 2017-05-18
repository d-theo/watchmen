import React, { Component } from 'react';
import { Router, browserHistory, Route, Link, IndexRoute } from 'react-router';
import logo from './logo.svg';
import './App.css';
import { Configuration } from './Configuration/Configuration.js';
import {Home} from './Home/Home.js';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
      </Router>
    );
  }
}

export default App;
