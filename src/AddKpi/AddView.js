import React, { Component } from 'react';
import { Link } from 'react-router';

import './AddView.css';

export class AddView extends Component {
  render() {
    return (
      <div className="content">
        <div className="w-back-kpi">
          <Link to="/">
            <i className="icon-arrow-left" aria-hidden="true"></i>
            Back
          </Link>
        </div>
        {this.props.children}
      </div>
    )
  }
}
