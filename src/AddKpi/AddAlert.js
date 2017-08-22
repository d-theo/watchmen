import React, { Component } from 'react';
import { Link } from 'react-router';
import { TextInput } from './FormComponents/TextInput.js';
import { List } from './FormComponents/List.js';
import axios from 'axios';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import './AddAlert.css';
import dotProp from 'dot-prop-immutable';

export class AddAlert extends Component {
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
    console.log(type+': '+empty + ":"+ value + ":" + option + ":"+inputType);
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
    }, console.log(this.state));
  }

  onSendData(event) {
    event.preventDefault();
    /*if(_.findKey(this.state.fieldsState, { 'empty': false })) {
      console.log('c\'est pas vide');
      axios.post('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/alerts', this.state.fieldsValue).then((r)=> {
        console.log('c\'est envoyé');
        browserHistory.push('/');
      });
    } else {
      console.log('c\'est vide');
    }*/

    console.log("Ok");
    
  }

  render() {
    const commonProps = {
      onChange: this.handleFieldChange.bind(this)
    };
    return (
      <div className="w-content">
        <div className="w-back-kpi">
          <Link to="/add">
            <i className="icon-arrow-left" aria-hidden="true"></i>
            Back
          </Link>
        </div>
        <form className="w-alert-form" onSubmit={this.onSendData}>
          <div>
            <List label="Type" type="type" value="" empty={true} {... commonProps}/>
          </div>
          <div>
            <TextInput label="Value" type="value" value="" empty={true} {... commonProps}/>
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
