import React, { Component } from 'react';
import { Link } from 'react-router';
import { TextInput } from './FormComponents/TextInput.js';
import { List } from './FormComponents/List.js';
import axios from 'axios';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import './AddKpi.css';
import dotProp from 'dot-prop-immutable';

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

    this.submit = this.submit.bind(this);
  }

  // type: site|label|period
  // empty: bool
  // value: str | undefined
  // option: {option}
  // inputType
  handleFieldChange(type, empty, value, option, inputType) {    
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
      const fieldState = {empty: empty,value: value};
      const newFieldsState = dotProp.set(prevState, `fieldsState.${type}`, fieldState);
      return dotProp.set(newFieldsState, `fieldsValue.${type}`, option);
    });
  }

  formNotEmpty() {
    return _.keys(this.state.fieldsState).length === 4 && !_.findKey(this.state.fieldsState, { 'empty': true });
  }

  submit(event) {
    event.preventDefault();
    if(this.formNotEmpty()) {
      console.log('send form');
      /*axios.post('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/prod/alerts', this.state.fieldsValue).then((r)=> {
        browserHistory.push('/');
      });*/
    } else {
      console.log('c\'est vide');
    }
  }

  render() {
    const commonProps = {
      onChange: this.handleFieldChange.bind(this)
    };
    return (
      <div className="w-content">
        <div className="w-back-kpi">
          <Link to="/">
            <i className="icon-arrow-left" aria-hidden="true"></i>
            Back
          </Link>
        </div>
        <form onSubmit={this.submit}>
          <div>
            <TextInput label="Label" type="label" value="" empty={true} {... commonProps}/>
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
