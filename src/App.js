import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import {poller} from './Poller.js';
import { Configuration } from './Configuration/Configuration.js';
import {Home} from './Home/Home.js';
import {Header} from './Header/Header.js';
import {Login} from './Login/Login.js';
import {IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';

addLocaleData([...en, ...fr]);

class App extends Component {
  constructor(){
    super()
    poller.start()
  }
  render() {
    return (
      <IntlProvider locale="en">
        <div className="w-root">
          <Header />
          <Router history={browserHistory}>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Home}/>
            <Route path="/configuration" component={Configuration}/>
          </Router>
        </div>
      </IntlProvider>
    );
  }
}

export default App;
