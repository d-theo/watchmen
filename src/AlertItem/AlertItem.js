import React, { Component } from 'react';
import './AlertItem.css';
import {ProgressBar} from '../ProgressBar/ProgressBar.js';
import {ComparisonBar} from '../ComparisonBar/ComparisonBar.js';
import axios from 'axios';

export class AlertItem extends Component {

  deleteAlert() {
    const alertId = this.props.alert.id;
    console.log(alertId);
    axios.delete(`https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/alerts/${alertId}`)
      /*.then(response => {
        console.log(response);
        this.setState({'alertItems': response.data })
      }).catch(e => {
        console.log(e)
        this.setState({'alertItems': [{"id":"9aeb9f07-d964-4904-a067-a35ddde1e8df","name":"MOCKMOCKMOCJK"},{"last-value":50,"user":{"name":"jpiquet@xiti.com","id":258945},"period":"R:{D:0}","site":{"name":"Hit-Parade","id":1},"name":"Alerte 1","state":"ok","value":100,"notifications":{"ifttt":[{}],"mails":["jpiquet@xiti.com"],"slack":[{}]},"direction":"up","description":"alerte alerte alerte !","id":"alerte1","last-value-date":"timestamp","metric":{"name":"Loads","id":"m_page_loads"},"type":"absolute"}] })
    })*/
  }

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
        <div className="w-alert-item-header">
          <h2>{this.props.alert.label}</h2>
          <a className="w-delete-alert" onClick={() => this.deleteAlert()}><i className="icon-minus w-delete-alert-icon" aria-hidden="true"></i></a>
        </div>
        <h4>{this.props.alert.description}</h4>
        {progressBarComp}
        <small>Checked on the {date.getFullYear()}/{date.getMonth()+1}/{date.getDate()}, {date.getHours()}h{date.getMinutes()}m{date.getSeconds()}s: {this.props.alert.lastValue}/{this.props.alert.threshold}</small>
        
      </div>
    );
  }
}
