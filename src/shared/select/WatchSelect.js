import React, { Component } from 'react';
import './WatchSelect.css';

const findValueFromId = (array, id) => {
  return array.find( item => item.id === id ).label;
};

export class WatchSelect extends Component {
  constructor(){
    super();
    this.state = {
      init: false
    }
  }
  selectChanged(e) {
    const data = {id: e.target.value, label: findValueFromId(this.props.values, e.target.value)};
    this.props.onUpdate({
      id: this.props.identifier,
      data: data
    });
  }
  componentWillReceiveProps(){
    if (this.props.values.length > 0 && !this.state.init) {
      this.props.onUpdate({
        id: this.props.identifier,
        data: {id: this.props.values[0].id, label: this.props.values[0].label}
      });
      this.setState({init: true});
    }
  }
  render() {
    const values = this.props.values.map( item => <option key={item.id} value={item.id}>{item.label}</option> );
    return (
      <select onChange={(e) => this.selectChanged(e)} className="watch-select">
        {values}
      </select>
    );
  }
}