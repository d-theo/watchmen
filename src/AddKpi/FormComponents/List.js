import React, {Component} from 'react';
import {api, sites} from '../../Services/Api.js';
import './List.css';

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: props.empty,
      options: [],
      value: this.props.value.id
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    switch(this.props.type) {
      case 'metric':
        this.getMetrics();
        break;
      case 'period':
        this.getPeriods();
        break;
      case 'type':
        this.getTypes();
        break;
      case 'site':
      default:
        this.getSites();
    }
  }

  getMetrics() {
    api.get('/metrics').then(response => {
      this.setState({
        options: response.data
      });
    }).catch(err => console.log('error code > 400 : '+err));
  }
  getTypes() {
    this.setState({
      options: [
        {id:"relative_up", label:"increased by"},
        {id:"relative_down", label:"decreased by"},
        {id:"absolute_up", label:" higher than"},
        {id:"absolute_down", label:"lower than"},
        {id:"smart_smart", label:"smart alert"},
      ]
    });
  }
  getSites() {
    sites().then(response => {
      this.setState({
        options: response.data.map(site => ({id: site.Id, label: site.Label}))
      });
    });
  }
  getPeriods() {
    api.get('/periods').then(response => {
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
    const value = event.target.value;
    const newState = value === '' ? true : false;
    this.setState({empty: newState, value: value});
    var option = this.state.options.find(option => option.id == value);
    this.props.onChange(this.props.type, newState, value, option, 'list');
  }

  render() {
    const isEmpty = this.state.empty;
    const values = this.state.options.map( item => <option key={item.id} value={item.id} data-label={item.label}>{item.label}</option> );
    return (
      <div className="w-input-container">
        <h3 className={"w-input-label " + (isEmpty ? 'w-is-empty' : 'w-is-not-empty')}>{this.props.label}</h3>
        <div className="w-select">
          <i className="icon-arrow-down"></i>
          <select className="w-list-input" onChange={this.handleChange} value={this.state.value}>
            <option value="" data-label="">Choose one</option>
            {values}
          </select>
        </div>
      </div>
    )
  }
}