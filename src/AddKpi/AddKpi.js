import React, { Component } from 'react';
import { Link } from 'react-router';
import { TextInput } from './FormComponents/TextInput.js';
import { List } from './FormComponents/List.js';
import axios from 'axios';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import './AddKpi.css';

export class AddKpi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldsState: {},
      fieldsValue: {
        direction: 'up',
        threshold: '1000000',
        type: 'absolute',
        fake: true,
        user: {  
          label:"jpiquet@xiti.com",
          id:258945
        },
        periodLabel: 'wip'
      }
    };

    this.onSendData = this.onSendData.bind(this);
  }

  handleFieldChange(type, empty, value, option, inputType) {    
    console.log(type+': '+empty);
    if(inputType === 'list') {
      option = option || {};
    }
    if(inputType === 'text') {
      option = value || '';
    }
    
    if(type === 'period') {
      option = option.id || '';
    }
    this.setState((prevState, props) => {
      prevState.fieldsState[type] = {
        empty: empty,
        value: value
      },
      prevState.fieldsValue[type] = option
      return prevState;
    }, console.log(this.state));
  }

  onSendData(event) {
    event.preventDefault();
    if(_.findKey(this.state.fieldsState, { 'empty': false })) {
      console.log('c\'est pas vide');
      axios.post('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/alerts', this.state.fieldsValue).then((r)=> {
        console.log('c\'est envoyé');
        browserHistory.push('/');
      });
    } else {
      console.log('c\'est vide');
    }
    
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
        <form onSubmit={this.onSendData}>
          <div>
            <TextInput label="Alert label" type="label" value="" empty={true} {... commonProps}/>
          </div>
          <div>
            <List label="Site" type="site" value="" empty={true} {... commonProps}/>
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
