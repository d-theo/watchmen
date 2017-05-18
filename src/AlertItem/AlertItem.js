import React, { Component } from 'react';
import './AlertItem.css';
import {ProgressBar} from '../ProgressBar/ProgressBar.js';
import {ComparisonBar} from '../ComparisonBar/ComparisonBar.js';

export class AlertItem extends Component {

  render() {
    let progressBarComp = '';

    if(this.props.alert.type == 'relative') {
      progressBarComp = <ProgressBar alert={this.props.alert} />;
    }
    if(this.props.alert.type == 'absolute') {
      progressBarComp = <ComparisonBar alert={this.props.alert} />;
    }

    let date = new Date(this.props.alert.lastValueDate);

    return (
      <div className="w-alert-item">
        <h2>{this.props.alert.label}</h2>
        <h4>{this.props.alert.description}</h4>
        {progressBarComp}
        <small>Checked on the {date.getFullYear()}/{date.getMonth()+1}/{date.getDate()}, {date.getHours()}h{date.getMinutes()}m{date.getSeconds()}s: {this.props.alert.lastValue}/{this.props.alert.threshold}</small>
        
      </div>
    );
  }
}
