import React, { Component } from 'react';
import { Link } from 'react-router';
import { TextInput } from './FormComponents/TextInput.js';
import { List } from './FormComponents/List.js';
import axios from 'axios';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import './AddAlert.css';
import dotProp from 'dot-prop-immutable';
import { AddAlert } from './AddAlert.js';
import { AddKpi } from './AddKpi.js';

export class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      add: null,
      alert: null
    };
  }

  render() {
    switch(this.state.step) {
      case 1: 
        return <AddKpi restoredState={this.state.add} nextStep={this.nextStep.bind(this)} />
      case 2: 
      return <AddAlert restoredState={this.state.alert} previousStep={this.previousStep.bind(this)}/>
    }
  }

  nextStep(addState) {
    this.setState({add: addState, step: this.state.step+1});
  }

  previousStep(alertState) {
    this.setState({alert: alertState, step: this.state.step-1});
  }

  validateForm() {
    // send everything !
  }
}