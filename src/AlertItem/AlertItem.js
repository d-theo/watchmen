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

    if(this.props.alert.type == 'relative') {
      progressBarComp = <ProgressBar alert={this.props.alert} />;
    }
    if(this.props.alert.type == 'absolute') {
      progressBarComp = <ComparisonBar alert={this.props.alert} />;
    }

    let date = new Date(this.props.alert.lastValueDate);

    return (
      <div className={`w-alert-item ${deleted}`}>
        <div className="w-alert-item-header">
          <h2>{this.props.alert.label} <br /><span className="w-alert-site">{this.props.alert.site.label}</span></h2>
          <a className="w-delete-alert" onClick={() => this.deleteAlert()}><i className="icon-minus w-delete-alert-icon" aria-hidden="true"></i></a>
        </div>
        <h4>{this.props.alert.description}</h4>
        {progressBarComp}
        <small>Checked on the {date.getFullYear()}/{date.getMonth()+1}/{date.getDate()}, {date.getHours()}h{date.getMinutes()}m{date.getSeconds()}s: {this.props.alert.lastValue}/{this.props.alert.threshold} {this.props.alert.metric.label}</small>
      </div>
    );
  }
}
