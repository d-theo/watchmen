import React, { Component } from 'react';
import './AlertItem.css';
import {ProgressBar} from '../ProgressBar/ProgressBar.js';
import {ComparisonBar} from '../ComparisonBar/ComparisonBar.js';
import axios from 'axios';
import {poller} from '../Poller.js';
import { FormattedNumber, FormattedRelative } from 'react-intl';

export class AlertItem extends Component {

  constructor() {
    super();
    this.state = { alertDeleted : false };
  }

  deleteAlert() {
    const alertId = this.props.alert.id;
    //console.log(alertId);
    this.setState({alertDeleted : true});
    axios.delete(`https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/alerts/${alertId}`)
      .then(response => {
        poller.fetch();
        //console.log(response);
      })
  }

  render() {
    //console.log(this.props.alert);
    let progressBarComp = '';
    let deleted = this.state.alertDeleted ? 'w-alert-deleted' : '';
    let smallRow = 'This alert has not been checked yet.';
    this.props.alert.lastValue = (typeof this.props.alert.lastValue === 'undefined') ? 0 : this.props.alert.lastValue;

    if(this.props.alert.lastExec) {
      let date = new Date(this.props.alert.lastExec);
      //smallRow = ( <small><i className="fa fa-clock-o" aria-hidden="true"></i> {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}, {date.getHours()}h{date.getMinutes()}m{date.getSeconds()}s</small>);
      smallRow = <FormattedRelative value={new Date(date)}/>

      if (this.props.alert.type === 'relative') {
        progressBarComp = <ComparisonBar alert={this.props.alert}/>;
      }
      if (this.props.alert.type === 'absolute' || this.props.alert.type === 'smart') {
        progressBarComp = <ProgressBar alert={this.props.alert}/>;
      }
    }

    let alertDescription = '';
    if(this.props.alert.type === 'absolute') {
      alertDescription += (this.props.alert.direction === 'up') ? 'More than ' : 'Less than ';
      alertDescription += this.props.alert.threshold + ' ' + this.props.alert.metric.label;
    }
    if(this.props.alert.type === 'relative') {
      alertDescription += this.props.alert.metric.label;
      alertDescription += (this.props.alert.direction === 'up') ? ' > ' : ' < ';
      alertDescription += this.props.alert.threshold + '%';
    }


    return (
      <div className={`w-alert-item ${deleted}`}>
        <div className="w-alert-item-header">
          <h2>{this.props.alert.label}</h2>
          {<p className="w-website"><i className="icon-globe" aria-hidden="true"></i> {this.props.alert.site.label}</p>}
        </div>
        <div className="w-kpi">
          <h3 className="w-kpi-value">
              <FormattedNumber
                value={this.props.alert.lastValue}
                />
          </h3>
          <p className="w-kpi-metric">{this.props.alert.metric.label}</p>
        </div>
        {this.props.alert.fake !== true &&
        <div className="w-alert-item-graph">
          <label className="w-alert-label">{this.props.alert.periodLabel}</label>
          <h4>{this.props.alert.description}</h4>
          <div className="w-alert-item-graph-header">
            <div className="w-alert-progress-description">
              {alertDescription}
            </div>
            <div className="w-progress-value">
              <span className="w-progress-val">
                <FormattedNumber
                  value={this.props.alert.lastValue }
                  />
                &nbsp;{this.props.alert.metric.label} -&nbsp;
              </span>
              {/*  <span className="w-progress-percentage">{((this.props.alert.lastValue / this.props.alert.threshold) * 100).toFixed(2)}%</span> */}
              <span className="w-progress-percentage"><FormattedNumber style="percent" value={(this.props.alert.lastValue / this.props.alert.threshold)}/></span>
            </div>
          </div>
          {progressBarComp}
          {/* <i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;<FormattedDate value={new Date(this.props.alert.date)}/>&nbsp;<FormattedTime value={new Date(this.props.alert.date)}/>*/}
          {smallRow}

        </div>
        } {this.props.alert.fake === true &&
        <div className="w-alert-item-graph">
          <label className="w-alert-label">{this.props.alert.periodLabel}</label>
        </div>
        }
        <div className="w-alert-item-footer">
          <a className="w-delete-alert" onClick={() => this.deleteAlert()}><i className="icon-trash" aria-hidden="true"></i> Delete this alert</a>
        </div>
      </div>
    );
  }
}
