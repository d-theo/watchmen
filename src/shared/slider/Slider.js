import React, { Component } from 'react';
import './Slider.css';
export class Slider extends Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
  }
  onChange() {
    this.setState({
      active: !this.state.active
    });
    this.props.onSwitched({
      active: !this.state.active,
    });
  }
  render() {
    return (
        <label className="switch">
          <input onChange={() => this.onChange()} type="checkbox"/>
          <div className="slider round"></div>
        </label>
    );
  }
}