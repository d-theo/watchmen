import React from 'react';
import { Link, browserHistory } from 'react-router';

import './Header.css';

export const Header = (props) => (
  <div className="watcher-header">
    <img className="watcher-logo" src="logo_W.png" style={{height:"50px"}} onClick={browserHistory.goBack}/>
    <h1 className="watcher-header-title">Watcher</h1>
    <i className="fa fa-bars burger" aria-hidden="true"></i>
  </div>
);
