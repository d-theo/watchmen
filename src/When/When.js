import React, { Component } from 'react';
import './When.css';
import { WatchSelect } from './../shared/select/WatchSelect.js';

export class When extends Component {
  render() {
    return (
      <div className="w-when">
        <div className="w-when-row">
          <span>Site </span>
          <WatchSelect values={[410501, 410501]}/>
        </div>
        <div className="w-when-row">
          <span>Metric </span>
          <WatchSelect values={['visits']}/>
        </div>
        <div className="w-when-row">
          <span>Of </span>
          <WatchSelect values={['current day', 'current week', 'current month']}/>
        </div>
      </div>
    );
  }
}