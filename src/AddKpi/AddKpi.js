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
    let defaultState = {
      fieldsState: {},
      fieldsValue: {
        label: '',
        site: '',
        direction: 'up',
        threshold: '',
        type: '',
        fake: true,
        period: '',
        metric: '',
        user: {  
          label:"jpiquet@xiti.com",
          id:258945
        },
        periodLabel: ''
      }
    };

    let state = this.props.restoredState || defaultState;
    this.state = state;
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
      option = option || '';
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
      axios.post('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/prod/alerts', this.state.fieldsValue).then((r)=> {
        browserHistory.push('/');
      });
    } else {
      console.log("c'est vide");
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
        <form className="w-kpi-form" onSubmit={this.onSendData}>
          <div>
            <TextInput label="Label" type="label" value={this.state.fieldsValue.label} empty={this.state.fieldsValue.label == ''} {... commonProps}/>
          </div>
          <div>
            <List label="Site" type="site" value={this.state.fieldsValue.site} empty={this.state.fieldsValue.site == ''} {... commonProps}/>
          </div>
          <div>
            <List label="Metric" type="metric" value={this.state.fieldsValue.metric} empty={this.state.fieldsValue.metric == ''} {... commonProps}/>
          </div>
          <div>
            <List label="On" type="period" value={this.state.fieldsValue.period} empty={this.state.fieldsValue.period == ''} {... commonProps}/>
          </div>
          <div className="w-add-alert-link">
            <i onClick={()=>this.props.nextStep({...this.state})} className="icon-plus"></i> Add an alert
          </div>
          <input type="submit" className="w-save-button" value="Save" />
        </form>
      </div>
    )
  }
}
