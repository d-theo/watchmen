import React, { Component } from 'react';
import './AlertItem.css';

export class AlertItem extends Component {
  render() {
    return (<li key={this.props.id} class="w-alert-item">{this.props.name}</li>);
  }
}
