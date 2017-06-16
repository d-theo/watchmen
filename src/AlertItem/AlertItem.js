import React, { Component } from 'react';
import './AlertItem.css';
import {ProgressBar} from '../ProgressBar/ProgressBar.js';
import {ComparisonBar} from '../ComparisonBar/ComparisonBar.js';
import axios from 'axios';
import {poller} from '../Poller.js';

export class AlertItem extends Component {

  constructor() {
    super();
    this.state = { alertDeleted : false };
  }

  deleteAlert() {
    const alertId = this.props.alert.id;
    console.log(alertId);
    this.setState({alertDeleted : true});
    axios.delete(`https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/alerts/${alertId}`)
      .then(response => {
        poller.fetch();
        console.log(response);
      })
  }

  render() {
    let progressBarComp = '';
    let deleted = this.state.alertDeleted ? 'w-alert-deleted' : '';
    let smallRow = 'This alert has not been checked yet.';

    if(this.props.alert.lastExec) {
      let date = new Date(this.props.alert.lastExec);
      smallRow = (<small>Checked on the {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}, {date.getHours()}h{date.getMinutes()}m{date.getSeconds()}s: {this.props.alert.lastValue}/{this.props.alert.threshold} {this.props.alert.metric.label}</small>);

      if (this.props.alert.type === 'relative') {
        progressBarComp = <ComparisonBar alert={this.props.alert}/>;
      }
      if (this.props.alert.type === 'absolute' || this.props.alert.type === 'smart') {
        progressBarComp = <ProgressBar alert={this.props.alert}/>;
      }
    }

    return (
      <div className={`w-alert-item ${deleted}`}>
        <div className="w-alert-item-header">
          <h2>{this.props.alert.label}</h2>
          <p className="w-website"><i className="icon-globe" aria-hidden="true"></i> {this.props.alert.site.label}</p>
        </div>
        <div className="w-kpi">
          <h3 className="w-kpi-value">{this.props.alert.lastValue}</h3>
          <p className="w-kpi-metric">{this.props.alert.metric.label}</p>
        </div>
        <div className="w-alert-item-graph">
          <h4>{this.props.alert.description}</h4>
          <div className="w-alert-item-graph-header">
            <div className="w-alert-progress-description">
              More than {this.props.alert.threshold} {this.props.alert.metric.label}
            </div>
            <div className="w-progress-value">
              <span className="w-progress-val">{this.props.alert.lastValue} {this.props.alert.metric.label} - </span>
              <span className="w-progress-percentage">{(this.props.alert.lastValue / this.props.alert.threshold).toFixed(4) * 100}%</span>
            </div>
          </div>
          {progressBarComp}
          {smallRow}
        </div>
        <div className="w-alert-item-footer">
          <a className="w-delete-alert" onClick={() => this.deleteAlert()}><i className="icon-trash w-delete-alert-icon" aria-hidden="true"></i> Delete this alert</a>
        </div>
      </div>
    );
  }
}
