import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import {poller} from './Poller.js';
import {Home} from './Home/Home.js';
import {Header} from './Header/Header.js';
import {AddKpi} from './AddKpi/AddKpi.js';
<<<<<<< HEAD
import {Login} from './Login/Login.js';
=======
import {AddAlert} from './AddKpi/AddAlert.js';
>>>>>>> Init addAlert
import {IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';
import {authSvc} from './Auth/AuthSvc.js'

addLocaleData([...en, ...fr]);

let checkAuth = (nextState, replace) => {
  if(!authSvc.isAuthed()){
    replace({
      pathname: '/login'
    })
    return;
  } 
  if(!authSvc.profile){
    authSvc.fetchProfile();
  }
}

class App extends Component {
  constructor(){
    super()
    if(authSvc.isAuthed()) poller.start();
  }

  render() {
    return (
      <IntlProvider locale="en">
        <div className="w-root">
          <Header />
          <Router history={browserHistory}>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Home} onEnter={checkAuth}/>
            <Route path="/add" component={AddKpi} onEnter={checkAuth}/>
            <Route path="/add/alert" component={AddAlert} onEnter={checkAuth}/>
          </Router>
        </div>
      </IntlProvider>
    );
  }
}

export default App;
