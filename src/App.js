import React, { Component } from 'react';
import { Router, browserHistory, Route, Link, IndexRoute } from 'react-router';
import logo from './logo.svg';
import {Add} from './Add/Add';
import './App.css';

class Home extends Component {
  render() {
    //const bodyComponent = <WatchSelect values={['test', 'test2']}></WatchSelect>;
    const bodyComponent = <Add/>;
    return (
      <div><Add /></div>
      //<Wit name="When" renderComponent={bodyComponent}></Wit>
    );
  }
}

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
