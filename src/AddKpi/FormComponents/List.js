import React, {Component} from 'react';
import axios from 'axios';

import './List.css';

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: true,
      options: []
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
    this.props.onChange(this.props.type, this.state.empty);
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

  handleChange(event) {
    let newState;
    if(event.target.value !== 'empty') {
      newState = false;
    } else {
      newState = true;
    }

    this.setState({empty: newState});

    this.props.onChange(this.props.type, newState);
  }

  render() {
    const isEmpty = this.state.empty;
    const values = this.state.options.map( item => <option key={item.id} value={item.id}>{item.label}</option> );
    return (
      <div className="w-input-container">
        <h3 className={"w-input-label " + (isEmpty ? 'w-is-empty' : 'w-is-not-empty')}>{this.props.label}</h3>
        <select className="w-list-input" onChange={this.handleChange}>
          <option value="empty">Choose one</option>
          {values}
        </select>
      </div>
    )
  }
}