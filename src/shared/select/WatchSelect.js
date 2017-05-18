import React, { Component } from 'react';
import './WatchSelect.css';

export class WatchSelect extends Component {
  selectChanged(e) {
    this.props.onUpdate({
      key: this.props.identifier,
      value: e.target.value
    });
  }
  render() {
    const values = this.props.values.map( item => <option value={item.key}>{item.val}</option> );
    return (
      <select onChange={(e) => this.selectChanged(e)} className="watch-select">
        {values}
      </select>
    );
  }
}