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
      alert: null,
      userConfig: {}
    };
  }

  componentDidMount() {
    this.getUserConfig().then(config => {
      this.setState({userConfig: config});
    });
  }

  getUserConfig() {
    return new Promise( (resolve, reject) => {
      api.get('/configs').then(userConfig => {
        const conf = userConfig.data;
        resolve({
          email: conf.email ? conf.email.join(';') : '',
          ifttt: conf.ifttt || '',
          slack: conf.slack || '',
          userId: userConfig.data.userId
        });
      });
    });
  }

  render() {
    switch(this.state.step) {
      case 1: 
      return <AddKpi submitKpi={this.submitKpi.bind(this)} restoredState={this.state.kpi} nextStep={this.nextStep.bind(this)} />
      case 2: 
      return <AddAlert userConfig={this.state.userConfig} submitAlert={this.submitAlert.bind(this)} restoredState={this.state.alert} previousStep={this.previousStep.bind(this)}/>
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
    let monitor = new Monitor({
      label: kpi.label.value,
      period: kpi.period.value.id,
      periodLabel: kpi.period.value.label,
      metricId: kpi.metric.value.id,
      metricName: kpi.metric.value.label,
      siteId: kpi.site.value.id,
      siteName: kpi.site.value.label,
      userId: authSvc.profile.userId,
      userName: authSvc.profile.email,
    });

    if (monitor.isValid()) {
      api.post('/monitors/add', monitor).then((r)=> {
        browserHistory.push('/');
      });
    } else {
      console.log('not sent : ', monitor.debug());
    }
  }

  submitAlert(alert) {
    const kpi = this.state.kpi;
    let monitor = new Monitor({
      label: kpi.label.value,
      period: kpi.period.value.id,
      periodLabel: kpi.period.value.label,
      metricId: kpi.metric.value.id,
      metricName: kpi.metric.value.label,
      siteId: kpi.site.value.id,
      siteName: kpi.site.value.label,
      userId: authSvc.profile.userId,
      userName: authSvc.profile.email,
      threshold: Math.floor(alert.threshold.value),
      type: alert.type.value.id.split('_')[0],
      direction: alert.type.value.id.split('_')[1]
    });

    if (alert.email.value !== '') {
      monitor.addNotification('mails', alert.email.value.split(';'));
    }

    // to refacto: case where the user changes his token during alert creation
    // by : inject a service
    this.getUserConfig().then(config => {
      if (alert.ifttt.value === 'on') {
        monitor.addNotification('ifttt', config.ifttt);
      }
      if (alert.slack.value === 'on') {
        monitor.addNotification('slack', config.slack);
      }
      if (monitor.isValid()) {
        api.post('/monitors/add', monitor).then((r)=> {
          console.log('sent',r);
          browserHistory.push('/');
        });
      } else {
        console.log('not sent', monitor.debug());
      }
    });
  }
}