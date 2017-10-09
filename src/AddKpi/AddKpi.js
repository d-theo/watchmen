import React, { Component } from 'react';
import { Link } from 'react-router';
import { TextInput } from './FormComponents/TextInput.js';
import { List } from './FormComponents/List.js';
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
        threshold: 0, // TODO
        type: 'absolute', // TODO
        fake: false,
        period: '',
        metric: '',
        userName: 'jpiquet@xiti.com',
        userId: 258945,
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
      this.props.submitKpi({...this.state});
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
            <span>Back</span>
          </Link>
        </div>
        <form className="w-kpi-form" onSubmit={this.submit}>
          <div>
            <TextInput label="Label" type="label" value={this.state.fieldsValue.label} empty={this.state.fieldsValue.label === ''} {... commonProps}/>
          </div>
          <div>
            <List label="Site" type="site" value={this.state.fieldsValue.site} empty={this.state.fieldsValue.site === ''} {... commonProps}/>
          </div>
          <div>
            <List label="Metric" type="metric" value={this.state.fieldsValue.metric} empty={this.state.fieldsValue.metric === ''} {... commonProps}/>
          </div>
          <div>
            <List label="On" type="period" value={this.state.fieldsValue.period} empty={this.state.fieldsValue.period === ''} {... commonProps}/>
          </div>
          <div onClick={()=> this.formNotEmpty() && this.props.nextStep({...this.state})} className="w-add-alert-link">
            <i className="icon-plus"></i> <span>Add an alert</span>
          </div>
          <input type="submit" className="w-save-button" value="Save" />
        </form>
      </div>
    );
  }
}
