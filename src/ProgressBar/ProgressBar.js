import React, { Component } from 'react';
import './ProgressBar.css';

export class ProgressBar extends Component {

  render() {

    let completePercentage = (this.props.alert.lastValue / this.props.alert.threshold).toFixed(4);
    let isComplete = (this.props.alert.lastValue > this.props.alert.threshold);
    if(isComplete) {
      completePercentage = 1;
    }

    return (
      <div className="w-progress-container">
        <div className="w-progress">
          <div className="w-progress-bar" style={{width:completePercentage * 100 + '%'}}></div>
        </div>
      </div>
    );
  }
}
