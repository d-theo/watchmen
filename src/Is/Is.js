import React, { Component } from 'react';
import './Is.css';

export class Is extends Component {
  constructor(){
    super();
    this.values = [
      {key:"variation_up", val:"increased by"},
      {key:"variation_down", val:"decreased by"},
      {key:"absolute_up", val:" higher than"},
      {key:"absolute_dow", val:"lower than"},
      {key:"auto", val:"smart"}
    ];
    this.state = {
      selectioned: this.values[0].key
    };
  }

  selectChanged(event) {
    this.setState({selectioned: event.target.value});
  }

  render() {
    const values = this.values.map( item => <option value={item.key}>{item.val}</option> );
    return (
      <div className="w-is">
        <select className="w-is-select" onChange={(e) => this.selectChanged(e)}>
          {values}
        </select>
        <input className="w-is-text" type="text"/>
      </div>
    )
  }
}