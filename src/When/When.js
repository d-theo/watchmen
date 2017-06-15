import React, { Component } from 'react';
import './When.css';
import { WatchSelect } from './../shared/select/WatchSelect.js';
import axios from 'axios';

export class When extends Component {
  constructor() {
    super();
    this.state = {
      sites: [],
      metrics:[],
      periods:[]
    }
    axios.get('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/metrics').then(response => {
      this.setState({
        metrics: response.data
      });
    });
    axios.get('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/periods').then(response => {
      let periods = [];

      for (var key in response.data) {
        switch(key) {
          case 'day':
            periods.push({id: response.data[key]["yesterday"], label: 'current '+key});
            break;
          case 'minute':
            periods.push({id: response.data[key]["previous"], label: 'current '+key});
            break;
          case 'hour':
            periods.push({id: response.data[key]["previous"], label: 'current '+key});
            break;
          case 'week':
            periods.push({id: response.data[key]["lastWeek"], label: 'current '+key});
            break;
          case 'month':
          default:
            periods.push({id: response.data[key]["lastMonth"], label: 'current '+key});
            break;        
        }
      }
      this.setState({
        periods: periods
      });
    });
    axios.get('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/sites').then(response => {
      this.setState({
        sites: response.data
      });
    });
  }
  render() {
    return (
      <div className='w-when'>
        <div className='w-when-row'>
          <span>Site </span>
          <WatchSelect identifier='site' onUpdate={this.props.onUpdate} values={this.state.sites}/>
        </div>
        <div className='w-when-row'>
          <span>Metric </span>
          <WatchSelect identifier='metric' onUpdate={this.props.onUpdate} values={this.state.metrics}/>
        </div>
        <div className='w-when-row'>
          <span>Of </span>
          <WatchSelect identifier='period' onUpdate={this.props.onUpdate} values={this.state.periods}/>
        </div>
      </div>
    );
  }
}