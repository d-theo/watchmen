import React, { Component } from 'react';
import {browserHistory} from 'react-router'
import {authSvc} from '../Auth/AuthSvc.js'
import './Login.css';

export class Login extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      'email': '',
      'password': ''
    };
    this.email = '';
    this.password = '';
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.email.value && this.password.value){
      authSvc.authenticateUser({email:this.email.value,password:this.password.value})
        .then((result) => {
          console.log(result);
          authSvc.setCookie(result.token, true)
          browserHistory.push('/')
        }).catch((reason) => {
          console.error(reason);
        })
    } else {
      console.error("input empty");
    }
    
  }

  render() {
    return (
      <div className="w-login-view">
        <h1>Watcher</h1>
        <form className="w-login-form" onSubmit={this.handleSubmit}>
          <div className="w-login-field">
            <label>Email</label>
            <input type="text" name="email" id="email" placeholder="mail@domain.com" ref={(input) => this.email = input}/>
          </div>
          <div className="w-pwd-field">
          <label>Password</label>
            <input type="password" name="password" id="password" placeholder="123456" ref={(input) => this.password = input}/>
          </div>
          <div className="w-submit-button">
            <input type="submit" id="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}
