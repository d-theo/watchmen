import React, {Component} from 'react';
import { Link } from 'react-router';

import './SiteList.css';

export class SiteList extends Component {
  render() {
    return (
      <div className="content">
        <Link to="/add/sites">
          <div>
            <h1>Hello World</h1>
          </div>
          {this.props.children}
        </Link>
      </div>
    )
  }
}