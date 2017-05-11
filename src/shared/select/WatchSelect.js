import React, { Component } from 'react';
import './WatchSelect.css';

export class WatchSelect extends Component {
  render() {
    const values = this.props.values.map( val => <option value="audi">{val}</option> );
    return (
      <select className="watch-select">
        {values}
      </select>
    );
  }
}