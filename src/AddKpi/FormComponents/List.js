import React, {Component} from 'react';
import axios from 'axios';

import './List.css';

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: props.empty,
      options: [],
      value: this.props.value
    };

    this.handleChange = this.handleChange.bind(this);
    console.log(this.props.type);
    switch(this.props.type) {
      case 'metric':
        this.getMetrics();
        break;
      case 'period':
        this.getPeriods();
        break;
      case 'site':
      default:
        this.getSites();
    }
  }

  componentDidMount() {
    this.props.onChange(this.props.type, this.state.empty, this.props.value);
  }

  getMetrics() {
    axios.get('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/metrics').then(response => {
      this.setState({
        options: response.data
      });
    });
  }
  getSites() {
    axios.get('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/sites').then(response => {
      this.setState({
        options: response.data
      });
    });
  }
  getPeriods() {
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
        options: periods
      });
    });
  }

  handleChange(event, index, value) {
    let newState;
    if(value !== '') {
      newState = false;
    } else {
      newState = true;
    }

    this.setState({empty: newState, value: value});

    var option = this.state.options.find(option => option.slug === value);

    this.props.onChange(this.props.type, newState, value, option, 'list');
  }

  render() {
    const isEmpty = this.state.empty;
    const values = this.state.options.map( item => <option key={item.id} value={item.id} data-label={item.label}>{item.label}</option> );
    return (
      <div className="w-input-container">
        <h3 className={"w-input-label " + (isEmpty ? 'w-is-empty' : 'w-is-not-empty')}>{this.props.label}</h3>
        <select className="w-list-input" onChange={this.handleChange} value={this.state.value}>
          <option value="" data-label="">Choose one</option>
          {values}
        </select>
      </div>
    )
  }
}