import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {authSvc} from '../Auth/AuthSvc.js'
import Modal from 'react-modal';
import './Header.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '10px',
    bottom                : '10px',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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

          <h2 ref={subtitle => this.subtitle = subtitle}>Configuration</h2>
          <i className="watcher-ico-close icon-close" onClick={this.closeModal} aria-hidden="true"></i>
          <form>
            
          </form>
        </Modal>
      </div>
    )
  }
};
