import React from 'react';
import { browserHistory } from 'react-router';

import './Header.css';

export const Header = (props) => (
  <div className="watcher-header">
    <img className="watcher-logo" alt="Back" src="logo_W.png" onClick={browserHistory.goBack}/>
    <h1 className="watcher-header-title">Watcher</h1>
    <i className="watcher-ico-menu icon-menu" aria-hidden="true"></i>
  </div>
);
