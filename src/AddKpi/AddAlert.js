import React, { Component } from 'react';
import { TextInput } from './FormComponents/TextInput.js';
import { List } from './FormComponents/List.js';
import _ from 'lodash';
import './AddAlert.css';
import dotProp from 'dot-prop-immutable';

export class AddAlert extends Component {
  constructor(props) {
    super(props);
    let defaultState = {
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

    let state = this.props.restoredState || defaultState;
    this.state = state;
    this.onSendData = this.onSendData.bind(this);
  }

  handleSwitch(elem, state) {
    console.log('handleSwitch. elem:', elem);
    console.log('name:', elem.props.name);
    console.log('new state:', state);
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

    this.setState((prevState, props) => {
      const fieldState = {empty: empty,value: value};
      const newFieldsState = dotProp.set(prevState, `fieldsState.${type}`, fieldState);
      return dotProp.set(newFieldsState, `fieldsValue.${type}`, option);
    });
  }

  formNotEmpty() {
    return (this.state.fieldsState.type && !this.state.fieldsState.type.empty) 
    && (this.state.fieldsState.threshold && !this.state.fieldsState.threshold.empty);
  }

  onSendData(event) {
    event.preventDefault();
    if(this.formNotEmpty()) {
      this.props.submitAlert(this.state.fieldsValue);
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
        <div onClick={() => this.props.previousStep(this.state)} className="w-back-kpi">
          <a role="button" tabIndex="0" className="w-no-outine">
            <i className="icon-arrow-left" aria-hidden="true"></i>
            <span>Back</span>
          </a>
        </div>
        <form className="w-alert-form" onSubmit={this.onSendData}>
          <div>
            <List label="Type" type="type" value="" empty={true} {... commonProps}/>
          </div>
          <div>
            <TextInput inputType="number" label="Value" type="threshold" value="" empty={true} {... commonProps}/>
          </div>
          <div>
            <TextInput label="Mail" type="mail" value="" empty={true} {... commonProps}/>
          </div>
          <div>
            <TextInput label="Slack" type="slack" value="" empty={true} {... commonProps}/>
          </div>
          <div>
            <TextInput label="IFTTT" type="ifttt" value="" empty={true} {... commonProps}/>
          </div>
          <input type="submit" className="w-save-button" value="Save" />
        </form>
      </div>
    )
  }
}
