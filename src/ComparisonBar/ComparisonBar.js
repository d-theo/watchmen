import React, { Component } from 'react';
import './ComparisonBar.css';

export class ComparisonBar extends Component {

  render() {

    let completePercentage = this.props.alert.lastValue / this.props.alert.threshold;
    let isComplete = (this.props.alert.lastValue > this.props.alert.threshold);
    if(isComplete) {
      completePercentage = 1;
    }

    return (
      <div className="w-progress-container">
        <div className="w-progress">
          <div className="w-progress-bar" style={{width:completePercentage * 100 + "%"}}>{completePercentage * 100}%</div>
        </div>
      </div>
    );
  }
}
