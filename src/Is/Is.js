import React, { Component } from 'react';
import './Is.css';

export class Is extends Component {
  constructor(){
    super();
    this.values = [
      {key:"relative_up", val:"increased by"},
      {key:"relative_down", val:"decreased by"},
      {key:"absolute_up", val:" higher than"},
      {key:"absolute_down", val:"lower than"},
      {key:"smart_smart", val:"smart alert"},
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
    if (event.target.value === 'smart_smart') {
      this.setState({text:''});
      this.props.onUpdate({
        id: 'threshold',
        data: {
          threshold: ''
        }
      });
    }
  }
  onInputChange(e) {
    let threshold = e.target.value;
    if (this.state.selectioned === "smart_smart") {
      threshold = '';
    }
    this.props.onUpdate({
      id: 'threshold',
      data: {
        threshold: threshold
      }
    });
    
    this.setState({text:threshold});
  }
  isRelative(){
    return this.state.selectioned.split('_')[0] === 'relative' ? '%' : '';
  }

  render() {
    const values = this.values.map( item => <option key={item.key} value={item.key}>{item.val}</option> );
    let evo = 0;
    if (this.props.evo && this.props.evo.nb) {
      evo = this.props.evo.nb;
    }
    return (
      <div className="w-i">
        <div className="w-is">
          <select className="w-is-select" onChange={(e) => this.selectChanged(e)}>
            {values}
          </select>
          <input value={this.state.text} onChange={(e) => this.onInputChange(e)} className="w-flex-1 w-is-text" type="number"/>
          <span className="w-is-text">{this.isRelative()}</span>
        </div>
        <span className="w-is-alert">{`this alert would have triggered ${evo} times this last period`}</span>
      </div>
    )
  }
}