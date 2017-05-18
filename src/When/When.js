import React, { Component } from 'react';
import './When.css';
import { WatchSelect } from './../shared/select/WatchSelect.js';

export class When extends Component {
  constructor() {
    super();
    this.sites = [
      {key:410501, val:410501},
    ];
    this.periods = [
      {key:"minute", val:"current minute"},
      {key:"day", val:"current day"},
      {key:"week", val:"current week"},
      {key:"month", val:"current month"},
    ];
    this.metrics = [
      {key:"visits", val:"visits by"},
    ];
  }
  render() {
    return (
      <div className="w-when">
        <div className="w-when-row">
          <span>Site </span>
          <WatchSelect identifier="site" onUpdate={this.props.onUpdate} values={this.sites}/>
        </div>
        <div className="w-when-row">
          <span>Metric </span>
          <WatchSelect identifier="metric" onUpdate={this.props.onUpdate} values={this.metrics}/>
        </div>
        <div className="w-when-row">
          <span>Of </span>
          <WatchSelect identifier="period" onUpdate={this.props.onUpdate} values={this.periods}/>
        </div>
      </div>
    );
  }
}