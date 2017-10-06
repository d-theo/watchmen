import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import './AddAlert.css';
import { AddAlert } from './AddAlert.js';
import { AddKpi } from './AddKpi.js';

export class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      kpi: null,
      alert: null
    };
  }

  render() {
    switch(this.state.step) {
      case 1: 
      return <AddKpi submitKpi={this.submitKpi.bind(this)} restoredState={this.state.kpi} nextStep={this.nextStep.bind(this)} />
      case 2: 
      return <AddAlert submitAlert={this.submitAlert.bind(this)} restoredState={this.state.alert} previousStep={this.previousStep.bind(this)}/>
      default:
      return <div>error :)</div>;
    }
  }

  nextStep(kpiState) {
    this.setState({kpi: kpiState, step: this.state.step+1});
  }

  previousStep(alertState) {
    this.setState({alert: alertState, step: this.state.step-1});
  }

  submitKpi(kpi) {
    let mockSend = {...kpi.fieldsValue};
    mockSend.period = kpi.fieldsValue.period.id;
    mockSend.periodLabel = kpi.fieldsValue.period.label;
    axios.post('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/prod/alerts', mockSend).then((r)=> {
      console.log(r);
      browserHistory.push('/');
    });
  }

  submitAlert(alert) {
    let mockSend = {...this.state.kpi.fieldsValue};
    mockSend.period = this.state.kpi.fieldsValue.period.id;
    mockSend.periodLabel = this.state.kpi.fieldsValue.period.label;

    let _alert = {...alert};
    mockSend.threshold = _alert.threshold;
    mockSend.type = _alert.type.id.split('_')[0];
    mockSend.direction = _alert.type.id.split('_')[1];

    axios.post('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/prod/alerts', mockSend).then((r)=> {
      console.log(r);
      browserHistory.push('/');
    });
  }
}