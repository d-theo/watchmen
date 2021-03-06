import React, { Component } from 'react';
import './AlertItem.css';
import {ProgressBar} from '../ProgressBar/ProgressBar.js';
import {ComparisonBar} from '../ComparisonBar/ComparisonBar.js';
import {api} from '../Services/Api.js';
import {poller} from '../Services/Poller.js';
import { FormattedNumber, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

export class AlertItem extends Component {

  constructor() {
    super();
    this.state = { alertDeleted : false };
  }

  deleteAlert() {
    const alertId = this.props.alert.id;
    //console.log(alertId);
    this.setState({alertDeleted : true});
    api.delete(`/monitors/${alertId}`)
      .then(response => {
        poller.fetch();
        //console.log(response);
      });
  }

  render() {
    //console.log(this.props.alert);
    let progressBarComp = '';
    let deleted = this.state.alertDeleted ? 'w-alert-deleted' : '';
    let smallRow = 'This alert has not been checked yet.';
    let dataLastCheck = '';
    let dataUpTo = '';
    this.props.alert.lastValue = (typeof this.props.alert.lastValue === 'undefined') ? 0 : this.props.alert.lastValue;

    if(this.props.alert.lastExec) {
      let date = new Date(this.props.alert.lastExec);
      let dateUpTo = new Date(this.props.alert.dateMaxValue);
      //smallRow = ( <small><i className="fa fa-clock-o" aria-hidden="true"></i> {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}, {date.getHours()}h{date.getMinutes()}m{date.getSeconds()}s</small>);
      dataLastCheck = <FormattedRelative value={date}/>
      dataUpTo = <FormattedTime value={dateUpTo}/>
      smallRow = dataLastCheck + ' - Data up to ' + dataUpTo;

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
      alertDescription += this.props.alert.threshold + ' ' + this.props.alert.metricName;
    }
    if(this.props.alert.type === 'relative') {
      alertDescription += this.props.alert.metricName;
      alertDescription += (this.props.alert.direction === 'up') ? ' > ' : ' < ';
      alertDescription += this.props.alert.threshold + '%';
    }


    return (
      <div className={`w-alert-item ${deleted}`}>
        <div className="w-alert-item-header">
          <h2>{this.props.alert.label}</h2>
          {<p className="w-website"><i className="icon-globe" aria-hidden="true"></i> {this.props.alert.siteName}</p>}
        </div>
        <div className="w-kpi">
          <h3 className="w-kpi-value">
              <FormattedNumber
                value={this.props.alert.lastValue}
                />
          </h3>
          <p className="w-kpi-metric">{this.props.alert.metricName}</p>
        </div>
        <div className="w-alert-item-graph">
          <div className="w-alert-item-meta">
            <p>
              <label className="w-alert-label"><i className="icon-calendar" aria-hidden="true"></i> {this.props.alert.periodLabel}</label>
            </p>
          </div>
          {this.props.alert.type !== undefined &&
          <div>
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
                  &nbsp;{this.props.alert.metricName} -&nbsp;
                </span>
                {/*  <span className="w-progress-percentage">{((this.props.alert.lastValue / this.props.alert.threshold) * 100).toFixed(2)}%</span> */}
                <span className="w-progress-percentage"><FormattedNumber style="percent" value={this.props.alert.progressValue}/></span>
              </div>
            </div>
            {progressBarComp}
            {/* <i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;<FormattedDate value={new Date(this.props.alert.date)}/>&nbsp;<FormattedTime value={new Date(this.props.alert.date)}/>*/}
          </div>
          }
        </div>
        <div className="w-alert-item-footer">
          <div className="w-alert-item-footer-meta">
              <p><i className="icon-hourglass" aria-hidden="true"></i> Last check: {dataLastCheck}</p>
              <p><i className="icon-clock" aria-hidden="true"></i> Data up to: {dataUpTo}</p>
            </div>
          <p><a className="w-delete-alert" onClick={() => this.deleteAlert()}><i className="icon-trash" aria-hidden="true"></i> Delete this alert</a></p>
        </div>
      </div>
    );
  }
}
