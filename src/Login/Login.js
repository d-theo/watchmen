import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {authSvc} from '../Services/AuthSvc.js';
import './Login.css';

export class Login extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      'email': '',
      'password': '',
      'error': false,
      'errorMessage': '',
      'success': false
    };
    /*this.email = '';
    this.password = '';*/
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.email && this.state.password){
      authSvc.authenticateUser({email:this.state.email,password:this.state.password})
        .then((result) => {
          this.handleSuccess(result);
        }).catch((reason) => {
          this.handleError(reason.message);
          console.error(reason);
        })
    } else {
      this.handleError('input empty');
      console.error('input empty');
    }
  }

  handleError(e) {
    this.setState({'error': true, 'errorMessage': e, 'success': false});
  }

  handleSuccess(e) {
    this.setState({'error': false, 'success': true});
    // TODO is it the responsability of the login form to save the token ?
    authSvc.saveToken(e.ExpiringToken, true);
    browserHistory.push('/');
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    let isError = this.state.error,
        isSuccess = this.state.success,
        errorMessage = this.state.errorMessage;
    return (
      <div className="w-login-view">
        <h1>Watcher</h1>
        <form className="w-login-form" onSubmit={this.handleSubmit}>
          {isError &&
            <div className="w-login-error">
              {errorMessage}
            </div>
          }
          {isSuccess &&
            <div className="w-login-success">
              Access granted
            </div>
          }
          <div className="w-login-field">
            <label className={'w-input-label-login '+ (this.state.email === '' ? 'w-is-empty' : 'w-is-not-empty')}>Email</label>
            <input type="email" name="email" id="email" placeholder="mail@domain.com" value={this.state.email} onChange={this.handleInputChange}/>
          </div>
          <div className="w-pwd-field">
          <label className={'w-input-label-login '+ (this.state.password === '' ? 'w-is-empty' : 'w-is-not-empty')}>Password</label>
            <input type="password" name="password" id="password" placeholder="123456" value={this.state.password} onChange={this.handleInputChange}/>
          </div>
          <div>
            <input className="w-submit-button" type="submit" id="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}
