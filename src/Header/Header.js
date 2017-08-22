import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {authSvc} from '../Auth/AuthSvc.js'
import Modal from 'react-modal';
import './Header.css';

const customStyles = {
  content : {
    top                   : '100px',
    left                  : '10px',
    right                 : '10px',
    bottom                : '100px',
    padding               : '10px 20px'
  }
};

export class Header extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
    console.log(authSvc.profile);
  }

  afterOpenModal() {
    
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return(
      <div className="watcher-header">
        <img className="watcher-logo" alt="Back" src="logo_W.png" onClick={browserHistory.goBack}/>
        <h1 className="watcher-header-title">Watcher</h1>
        <i className="watcher-ico-menu icon-settings" onClick={this.openModal} aria-hidden="true"></i>

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
          <form className="w-config-form">
            <div className="w-config-email-field">
              <label>Email (separated with ;)</label>
              <input type="text" name="email" id="email" placeholder="mail@domain.com" />
            </div>
            <div className="w-config-ifttt-field">
              <label>IFTTT token</label>
              <input type="text" name="ifttt" id="ifttt" placeholder="123456" />
            </div>
            <div className="w-config-slack-field">
              <label>Slack token</label>
              <input type="text" name="slack" id="slack" placeholder="123456" />
            </div>
            <div className="w-submit-button">
              <input type="submit" id="submit" value="Save" />
            </div>
          </form>
        </Modal>
      </div>
    )
  }
};
