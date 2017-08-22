import React, { Component } from 'react';
import './Login.css';

export class Login extends Component {
  constructor(){
    super();
    this.state = {
      'login': '',
      'pwd': ''
    };
  }

  render() {
    return (
      <div className="w-login-view">
        <h1>Watcher</h1>
        <form className="w-login-form">
          <div className="w-login-field">
            <label>Email</label>
            <input type="text" name="login" id="login" placeholder="mail@domain.com" />
          </div>
          <div className="w-pwd-field">
          <label>Password</label>
            <input type="password" name="pwd" id="pwd" placeholder="123456" />
          </div>
          <div className="w-submit-button">
            <input type="submit" id="submit" value="Login" />
          </div>
        </form>
      </div>
    )
  }
}
