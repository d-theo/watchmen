import React, { Component } from 'react';
import { Link } from 'react-router';
import { TextInput } from './FormComponents/TextInput.js';
import { List } from './FormComponents/List.js';

import './AddKpi.css';

export class AddKpi extends Component {
  render() {
    return (
      <div className="content">
        <div className="w-back-kpi">
          <Link to="/">
            <i className="icon-arrow-left" aria-hidden="true"></i>
            Back
          </Link>
        </div>
        <form>
          <div>
            <TextInput label="Name"/>
          </div>
          <div>
            <List label="Metric"/>
          </div>
          <div className="w-add-alert-link">
            <Link to="/add/alert">
              <i className="icon-plus"></i> Add an alert
            </Link>
          </div>
          <input type="submit" className="w-save-button" value="Save" />
        </form>
      </div>
    )
  }
}
