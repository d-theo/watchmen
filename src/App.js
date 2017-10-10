import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import {poller} from './Services/Poller.js';
import {Home} from './Home/Home.js';
import {Header} from './Header/Header.js';
import {Login} from './Login/Login.js';
import {AddForm} from './AddKpi/AddForm.js';
import {IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';
import {authSvc} from './Services/AuthSvc.js';

addLocaleData([...en, ...fr]);

// call onFinish() to trigger redirection/page loading
let checkAuth = (nextState, replace) => {
  if (!authSvc.isAuthed()) {
    replace({
      pathname: '/login'
    });
  }
};

const Routes = [
  {path:'/login', component:Login},
  {path:'/', component:Home, onEnter:checkAuth},
  {path:'/add', component:AddForm, onEnter:checkAuth},
];

class App extends Component {
  constructor(){
    super();
    this.state = {
      logged: false
    };

    if(authSvc.isAuthed()) poller.start();
  }

  componentDidMount() {
    authSvc.on('login', () => {
      this.setState({logged:true});
    },{fireImmediate: true});
    authSvc.on('logout', () => {
      this.setState({logged:false});
    },{fireImmediate: true});
  }

  render() {
    return (
      <IntlProvider locale="en">
        <div className="w-root">
          <Header logged={this.state.logged}/>
          <Router history={browserHistory} routes={Routes}>
          </Router>
        </div>
      </IntlProvider>
    );
  }
}

export default App;
