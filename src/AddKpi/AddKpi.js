import React, { Component } from 'react';
import { Link } from 'react-router';
import { TextInput } from './FormComponents/TextInput.js';
import { List } from './FormComponents/List.js';

import './AddKpi.css';

export class AddKpi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldsState: {}
    };
  }

  handleFieldChange(type, empty, value) {    
    console.log(type+': '+empty);
    this.setState((prevState, props) => {
      prevState.fieldsState[type] = {
        empty: empty,
        value: value
      }
      return prevState;
    }, console.log(this.state));
  }

  render() {
    const commonProps = {
      onChange: this.handleFieldChange.bind(this)
    };
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
            <TextInput label="Alert label" type="name" value="" empty={true} {... commonProps}/>
          </div>
          <div>
            <List label="Site" type="site" value="1" empty={false} {... commonProps}/>
          </div>
          <div>
            <List label="Metric" type="metric" value="" empty={true} {... commonProps}/>
          </div>
          <div>
            <List label="On" type="period" value="" empty={true} {... commonProps}/>
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
