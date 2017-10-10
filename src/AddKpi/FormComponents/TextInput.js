import React, {Component} from 'react';

import './TextInput.css';

export class TextInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.props.onChange(this.props.name, value);
  }

  render() {
    const isEmpty = this.props.empty;
    let type = {type: 'text'};
    if (this.props.inputType === 'number') {
      type = {
        pattern:'[0-9]*',
        inputMode:'numeric',
        type: 'number'
      };
    }

    return (
      <div className="w-input-container">
        <h3 className={"w-input-label " + (isEmpty ? 'w-is-empty' : 'w-is-not-empty')}>{this.props.label}</h3>
        <input className="w-text-input" value={this.props.value} {...type} onChange={this.handleChange} placeholder="Enter text"/>
      </div>
    )
  }
}