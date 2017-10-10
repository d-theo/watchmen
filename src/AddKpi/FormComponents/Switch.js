import React, {Component} from 'react';

import './Switch.css';
import './../AddKpi.css';

export class Switch extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(isActive) {
    return () => {
      const status = isActive ? 'on':'off';
      this.props.onChange(this.props.name, status);
    };
  }

  render() {
    const id1 = this.props.label + "1";
    const id2 = this.props.label + "2";
    return (
      <div className="w-input-container">
        <h3 className='w-input-label w-is-not-empty'>{this.props.label}</h3>
        <div className="w-checkboxes">
        <div className="w-checkbox">
            <input checked={this.props.value === 'on'} onChange={this.handleChange(true)} type="radio" name={this.props.label} id={id1}/>
            <label htmlFor={id1}>
                ON
            </label>
        </div>

        <div>
            <input checked={this.props.value === 'off'} onChange={this.handleChange(false)} type="radio" name={this.props.label} id={id2}/>
            <label htmlFor={id2}>
                OFF
            </label>
        </div>
      </div>
      </div>
    )
  }
}