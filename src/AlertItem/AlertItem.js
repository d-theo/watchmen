import React, { Component } from 'react';
import './AlertItem.css';

export class AlertItem extends Component {
  render() {
    return (<div className="w-alert-item">{this.props.label}</div>);
  }
}
