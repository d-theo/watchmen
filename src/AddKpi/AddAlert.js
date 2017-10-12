import React, { Component } from 'react';
import { TextInput } from './FormComponents/TextInput.js';
import { List } from './FormComponents/List.js';
import './AddAlert.css';
import immutable from 'dot-prop-immutable';
import { Switch } from './FormComponents/Switch.js';

export class AddAlert extends Component {
  constructor(props) {
    super(props);
    const defaultState = {
      type: {
        value: ''
      },
      threshold: {
        value: '',
      },
      email: {
        value: this.props.userConfig.email,
      },
      ifttt: {
        value: 'off',
      },
      slack: {
        value: 'off',
      }
    };

    let state = this.props.restoredState || defaultState;
    this.state = state;
    this.onSendData = this.onSendData.bind(this);
  }

  handleFieldChange(name, value) {
    const newState = immutable.set(this.state, `${name}.value`, value);
    this.setState(newState);
  }

  formNotEmpty() {
    const isEmpty = (val) => val == null || val == '';
    return [this.state.type.value, this.state.threshold.value].findIndex(isEmpty) === -1;
  }

  onSendData(event) {
    event.preventDefault();
    if(this.formNotEmpty()) {
      this.props.submitAlert(this.state);
    } else {
      console.log('c\'est vide');
    }
  }

  render() {
    const commonProps = {
      onChange: this.handleFieldChange.bind(this)
    };

    let email = this.state.email.value;
    console.log(this.props.userConfig.slack);
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
            <List name="type" label="Type" type="type" value={this.state.type.value} empty={this.state.type.value === ''} {... commonProps}/>
          </div>
          <div>
            <TextInput name="threshold" inputType="number" label="Value" type="threshold" value={this.state.threshold.value} empty={this.state.threshold.value === ''} {... commonProps}/>
          </div>
          <div>
            <TextInput name="email" label="Mail" type="mail" value={this.state.email.value} empty={false} {... commonProps}/>
          </div>
          <div>
            <Switch deactivated={this.props.userConfig.slack === ''} name="slack" label="Slack" type="slack" value={this.state.slack.value} empty={false} {... commonProps}/>
          </div>
          <div>
            <Switch name="ifttt" label="IFTTT" type="ifttt" value={this.state.ifttt.value} empty={false} {... commonProps}/>
          </div>
          <input type="submit" className="w-save-button" value="Save" />
        </form>
      </div>
    )
  }
}
