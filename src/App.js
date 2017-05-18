import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import {poller} from './Poller.js';
import { Configuration } from './Configuration/Configuration.js';
import {Home} from './Home/Home.js';
import {Header} from './Header/Header.js';

class App extends Component {
  constructor(){
    super()
    poller.start()
  }
  render() {
    return (
      <div>
        <Header />
        <Router history={browserHistory}>
          <Route path="/" component={Home}/>
          <Route path="/configuration" component={Configuration}/>
        </Router>
      </div>
    );
  }
}

export default App;
