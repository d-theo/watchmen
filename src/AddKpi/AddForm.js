import React, { Component } from 'react';
import {api} from '../Services/Api.js';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import './AddAlert.css';
import { AddAlert } from './AddAlert.js';
import { AddKpi } from './AddKpi.js';
import { Monitor } from '../Models/Monitor.js';
import {authSvc} from '../Services/AuthSvc.js';

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
    let monitor = new Monitor({...kpi.fieldsValue});
    monitor.period = kpi.fieldsValue.period.id;
    monitor.periodLabel = kpi.fieldsValue.period.label;
    monitor.metricId =  kpi.fieldsValue.metric.id;
    monitor.metricName =  kpi.fieldsValue.metric.label;
    monitor.siteId = kpi.fieldsValue.site.id;
    monitor.siteName = kpi.fieldsValue.site.label;
    monitor.userId = authSvc.profile.userId;
    monitor.userName = authSvc.profile.email;

    if (monitor.isValid()) {
      api.post('/monitors/add', monitor).then((r)=> {
        console.log(r);
        browserHistory.push('/');
      });
    } else {
      console.log('not sent : ', monitor.debug());
    }
  }

  submitAlert(alert) {
    let monitor = new Monitor({...this.state.kpi.fieldsValue});
    monitor.period = this.state.kpi.fieldsValue.period.id;
    monitor.periodLabel = this.state.kpi.fieldsValue.period.label;
    monitor.metricId =  this.state.kpi.fieldsValue.metric.id;
    monitor.metricName =  this.state.kpi.fieldsValue.metric.label;
    monitor.siteId = this.state.kpi.fieldsValue.site.id;
    monitor.siteName = this.state.kpi.fieldsValue.site.label;
    monitor.userId = authSvc.profile.userId;
    monitor.userName = authSvc.profile.email;

    let _alert = {...alert};
    monitor.threshold = Math.floor(_alert.threshold);
    monitor.type = _alert.type.id.split('_')[0];
    monitor.direction = _alert.type.id.split('_')[1];

    if (monitor.isValid()) {
      api.post('/monitors/add', monitor).then((r)=> {
        console.log('sent',r);
        browserHistory.push('/');
      });
    } else {
      console.log('not sent', monitor.debug());
    }
  }
}