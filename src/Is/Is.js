import React, { Component } from 'react';
import './Is.css';

export class Is extends Component {
  constructor(){
    super();
    this.values = [
      {key:"relative_up", val:"increased by"},
      {key:"relative_down", val:"decreased by"},
      {key:"absolute_up", val:" higher than"},
      {key:"absolute_dow", val:"lower than"},
    ];
    this.state = {
      selectioned: this.values[0].key,
      text: ""
    };
  }

  selectChanged(event) {
    this.setState({selectioned: event.target.value});
    let e = event.target.value.split('_');
    this.props.onUpdate({
      id: 'type',
      data: {
        direction: e[1],
        type: e[0]
      }
    });
  }
  onInputChange(e) {
    let threshold = e.target.value.replace('%','');
    this.props.onUpdate({
      id: 'threshold',
      data: {
        threshold: e.target.value
      }
    });
    
    this.setState({text:threshold});
  }
  isRelative(){
    return this.state.selectioned.split('_')[0] === 'relative' ? '%' : '';
  }

  render() {
    const values = this.values.map( item => <option key={item.key} value={item.key}>{item.val}</option> );
    return (
      <div className="w-is">
        <select className="w-is-select" onChange={(e) => this.selectChanged(e)}>
          {values}
        </select>
        <input value={this.state.text} onChange={(e) => this.onInputChange(e)} className="w-is-text" type="text"/>
        <span className="w-is-text">{this.isRelative()}</span>
      </div>
    )
  }
}