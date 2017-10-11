import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {authSvc} from '../Services/AuthSvc.js'
import Modal from 'react-modal';
import './Header.css';
import dotProp from 'dot-prop-immutable';
import UserConfig from '../Services/UserConfiguration.js';
import {api} from '../Services/Api.js';

const customStyles = {
  overlay: {
    backgroundColor       : 'rgba(0, 0, 0, 0.5)',
    zIndex                : '10000'
  },
  content : {
    top                   : '20px',
    left                  : '20px',
    right                 : '20px',
    bottom                : '20px',
    padding               : '10px 20px'
  }
};

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modal: {
        email: '',
        ifttt: '',
        slack: '',
        userId: -1
      }
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submit = this.submit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(function(oldState, props) {
      return dotProp.set(oldState, `modal.${name}`, value);
    });
  }

  logout() {
    authSvc.logout();
    browserHistory.push('/login');
  }

  openModal() {
    this.setState({modalIsOpen: true});

    authSvc.fetchProfile().then(() => {
      return api.get('/configs');
    })
    .then(userConfig => {
      const conf = userConfig.data;

      const config = {
        email: conf.email ? conf.email.join(';') : '',
        ifttt: conf.ifttt || '',
        slack: conf.slack || '',
        userId: userConfig.data.userId
      };
      this.setState({modal:config});
    });
  }

  afterOpenModal() {
    
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  submit(event) {
    event.preventDefault();
    const configuration = {...this.state.modal};
    configuration.email = configuration.email !== '' ? configuration.email.split(';') : undefined;
    configuration.ifttt = configuration.ifttt !== '' ? configuration.ifttt : undefined;
    configuration.slack = configuration.slack !== '' ? configuration.slack : undefined;
    api.post('/configs/add', configuration).then((r)=> {
      console.log('config sauvée');
      UserConfig.set(configuration);
      //browserHistory.push('/');
      this.closeModal();
    }).catch(err => console.log(err));
  }

  render() {
    const existingConfig =  this.state.modal;
    let email = {value: existingConfig.email};
    let slack = {value: existingConfig.slack};
    let ifttt = {value: existingConfig.ifttt};

    const isLogged = this.props.logged ? '1' : '0';

    return(
      <div className="watcher-header">
        <img className="watcher-logo" alt="Back" src="logo_W.png" onClick={browserHistory.goBack}/>
        <h1 className="watcher-header-title">Watcher</h1>
        <div>
          <i style={{opacity:isLogged}} className="watcher-ico-menu icon-settings" onClick={this.openModal} aria-hidden="true"></i>
          <i style={{opacity:isLogged}} className="watcher-ico-menu icon-logout" onClick={this.logout} aria-hidden="true"></i>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Configuration"
        >

          <div className="w-config-header">
            <h2 ref={subtitle => this.subtitle = subtitle}>Configuration</h2>
            <i className="watcher-ico-close icon-close" onClick={this.closeModal} aria-hidden="true"></i>
          </div>
          <form className="w-config-form" onSubmit={this.submit}>
            <div className="w-config-email-field">
              <label>Email (separated with ;)</label>
              <input {...email} onChange={this.handleFormChange} type="text" name="email" id="email" placeholder="mail@domain.com" />
            </div>
            <div className="w-config-ifttt-field">
              <label>IFTTT token</label>
              <input {...ifttt} onChange={this.handleFormChange} type="text" name="ifttt" id="ifttt" placeholder="123456" />
            </div>
            <div className="w-config-slack-field">
              <label>Slack token</label>
              <input {...slack} onChange={this.handleFormChange} type="text" name="slack" id="slack" placeholder="123456" />
            </div>
            <div>
              <input className="w-submit-button" type="submit" id="submit" value="SAVE" />
            </div>
          </form>
        </Modal>
      </div>
    )
  }
};
